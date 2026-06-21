import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (
    body.email === process.env.ADMIN_EMAIL &&
    body.password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({
      ok: true,
    });
  }

  return NextResponse.json(
    {
      error: "Invalid login",
    },
    {
      status: 401,
    }
  );
}
