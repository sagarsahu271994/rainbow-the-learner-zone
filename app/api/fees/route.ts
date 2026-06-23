import { NextResponse } from "next/server";

const SCRIPT_URL =
process.env.NEXT_PUBLIC_FEES_SCRIPT_URL!;

export async function POST(req: Request) {
try {

const body = await req.json();

const res = await fetch(SCRIPT_URL, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(body),
});

const data = await res.text();

return NextResponse.json({
success: true,
data,
});

} catch (error) {

return NextResponse.json(
{
success: false,
message: "Save failed",
},
{
status: 500,
}
);

}

}
