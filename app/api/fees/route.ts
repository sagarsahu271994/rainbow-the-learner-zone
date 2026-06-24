import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {

```
const body =
  await req.json();

const SCRIPT_URL =
  process.env
    .NEXT_PUBLIC_FEES_SCRIPT_URL;

if (!SCRIPT_URL) {
  return NextResponse.json(
    {
      success:false,
      error:
        "Fees webhook missing",
    },
    {
      status:500,
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
          "application/json",
      },

      body:
        JSON.stringify(
          body
        ),
    }
  );

const result =
  await response.json();

return NextResponse.json({
  success:true,

  pdfUrl:
    result.pdfUrl || "",

  data:
    result,
});
```

} catch (error) {

```
console.error(
  error
);

return NextResponse.json(
  {
    success:false,

    error:
      "Fees Save Failed",
  },
  {
    status:500,
  }
);
```

}
}
