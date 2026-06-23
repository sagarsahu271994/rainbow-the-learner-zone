import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const SCRIPT_URL =
      process.env.GOOGLE_ADMISSION_WEBHOOK_URL;

    if (!SCRIPT_URL) {
      throw new Error("Missing GOOGLE_ADMISSION_WEBHOOK_URL");
    }

    const cleanBody = {
      admissionId: body.admissionId || "",
      studentName: body.studentName || "",
      fatherName: body.fatherName || "",
      motherName: body.motherName || "",
      mobile: body.mobile || "",
      schoolName: body.schoolName || "",
      className: body.className || "",
      preferredBatch: body.preferredBatch || "",
      address: body.address || "",
    };

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanBody),
    });

    const data = await response.text();

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
