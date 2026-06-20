import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase";
import { admissionSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const values = Object.fromEntries(["studentName","fatherName","motherName","mobile","className","schoolName","address","preferredBatch"].map(k=>[k,String(form.get(k)||"")]));
    const parsed = admissionSchema.safeParse(values);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    const supabase = adminSupabase();
    const seed = crypto.randomUUID();
    const admissionId = `RLZ-${new Date().getFullYear()}-${seed.slice(0, 6).toUpperCase()}`;
    const { data, error } = await supabase.from("admissions").insert({
      admission_id: admissionId, student_name: parsed.data.studentName, father_name: parsed.data.fatherName,
      mother_name: parsed.data.motherName, mobile: parsed.data.mobile, class_name: parsed.data.className,
      school_name: parsed.data.schoolName, address: parsed.data.address, preferred_batch: parsed.data.preferredBatch,
    }).select("admission_id,created_at").single();
    if (error) throw error;
    return NextResponse.json({ admissionId: data.admission_id, createdAt: data.created_at }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Admission could not be saved. Please verify the Supabase setup and try again." }, { status: 500 });
  }
}
