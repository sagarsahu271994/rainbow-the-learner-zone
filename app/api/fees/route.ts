import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
const body =
await req.json();
  const receiptNumber =
body.receiptNo
||
`RTL-${1250}`;
const SCRIPT_URL =
  process.env
    .NEXT_PUBLIC_FEES_SCRIPT_URL;

if (!SCRIPT_URL) {
  return NextResponse.json(
    {
      success: false,
      error: "Missing Script URL",
    },
    {
      status: 500,
    }
  );
}

const response =
  await fetch(
    SCRIPT_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

    body:
JSON.stringify({
...body,
receiptNo:
receiptNumber
})
        ),
  );

const result =
  await response.text();

return NextResponse.json({
  success: true,
  pdfUrl: result,
});

} catch (error) {

console.error(
  error
);

return NextResponse.json(
  {
    success: false,
    error:
      "Save Failed",
  },
  {
    status: 500,
  }
);

}
}
