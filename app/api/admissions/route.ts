import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const admissionId =
      "RTLZ-" +
      Date.now();

    const response = await fetch(
      process.env.GOOGLE_SHEET_WEBHOOK_URL!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          admissionId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Google Sheet save failed");
    }

    return NextResponse.json({
      success: true,
      admissionId,
      createdAt: new Date(),
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Admission could not be saved",
      },
      {
        status: 500,
      }
    );
  }
}
