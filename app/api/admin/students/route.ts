import { NextResponse } from "next/server";

export async function GET() {
  try {

    const sheetId =
      "1V0E8PEWmTJrp2kPi26NbV2qvbM_bQm2BwYReJZrXW28";

    const url =
      `https://opensheet.elk.sh/${sheetId}/Rainbow_Admission_Form`;

    const response = await fetch(url);

    const rows = await response.json();

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json({
      error: "Unable to load students"
    });

  }
}
