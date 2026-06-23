import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const SCRIPT_URL =
      process.env.GOOGLE_ADMISSION_WEBHOOK_URL;

    if (!SCRIPT_URL) {
      return NextResponse.json(
        {
          success: false,
          error: "Webhook URL missing",
        },
        {
          status: 500,
        }
      );
    }

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Admission Save Failed",
      },
      {
        status: 500,
      }
    );
  }
}
