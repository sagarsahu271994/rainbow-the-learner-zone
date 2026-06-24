import { NextResponse } from "next/server";

export async function POST(
req: Request
){

try{

const body =
await req.json();

const SCRIPT_URL =
process.env
.NEXT_PUBLIC_FEES_SCRIPT_URL;

if(
!SCRIPT_URL
){

return NextResponse.json(
{
success:false,
error:
"Missing URL"
},
{
status:500
}
);

}

const response =
await fetch(
SCRIPT_URL,
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
body
)
}
);

const result =
await response.text();

return NextResponse.json(
{
success:true,
pdfUrl:result
}
);

}

catch(error){

console.log(
error
);

return NextResponse.json(
{
success:false,
error:
"Server Error"
},
{
status:500
}
);

}

}
