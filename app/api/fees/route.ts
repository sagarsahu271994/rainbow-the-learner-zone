import { NextResponse } from "next/server";

const SCRIPT_URL =
process.env.NEXT_PUBLIC_FEES_SCRIPT_URL!;

export async function POST(req: Request) {
  try {

    const body = await req.json();

    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }
}
