import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase";
import { admissionSchema } from "@/lib/validation";

export const runtime = "nodejs";

function safeName(name: string) { return name.toLowerCase().replace(/[^a-z0-9.-]/g, "-"); }

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const values = Object.fromEntries(["studentName","fatherName","motherName","mobile","className","schoolName","address","preferredBatch"].map(k=>[k,String(form.get(k)||"")]));
    const parsed = admissionSchema.safeParse(values);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    const report = form.get("previousReport");
    if (!(photo instanceof File) || photo.size === 0) return NextResponse.json({ error: "Student photo is required." }, { status: 400 });
    if (photo.size > 5_000_000 || (report instanceof File && report.size > 8_000_000)) return NextResponse.json({ error: "Photo must be under 5 MB and report under 8 MB." }, { status: 400 });

    const supabase = adminSupabase();
    const seed = crypto.randomUUID();
    const admissionId = `RLZ-${new Date().getFullYear()}-${seed.slice(0, 6).toUpperCase()}`;
    const folder = `${admissionId}`;
    const photoPath = `${folder}/photo-${safeName(photo.name)}`;
    const { error: photoError } = await supabase.storage.from("admission-documents").upload(photoPath, photo, { contentType: photo.type, upsert: false });
    if (photoError) throw photoError;
    let reportPath: string | null = null;
    if (report instanceof File && report.size) {
      reportPath = `${folder}/report-${safeName(report.name)}`;
      const { error } = await supabase.storage.from("admission-documents").upload(reportPath, report, { contentType: report.type, upsert: false });
      if (error) throw error;
    }
    const { data, error } = await supabase.from("admissions").insert({
      admission_id: admissionId, student_name: parsed.data.studentName, father_name: parsed.data.fatherName,
      mother_name: parsed.data.motherName, mobile: parsed.data.mobile, class_name: parsed.data.className,
      school_name: parsed.data.schoolName, address: parsed.data.address, preferred_batch: parsed.data.preferredBatch,
      student_photo_path: photoPath, previous_report_path: reportPath
    }).select("admission_id,created_at").single();
    if (error) throw error;
    return NextResponse.json({ admissionId: data.admission_id, createdAt: data.created_at }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Admission could not be saved. Please verify the Supabase setup and try again." }, { status: 500 });
  }
}
