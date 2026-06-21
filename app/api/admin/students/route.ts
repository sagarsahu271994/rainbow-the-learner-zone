import { NextResponse } from "next/server";

export async function GET() {

return NextResponse.json([
{
id:"RTLZ-001",
name:"Demo Student",
class:"6"
}
]);

}
