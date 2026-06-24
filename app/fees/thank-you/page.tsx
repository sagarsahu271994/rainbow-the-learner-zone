"use client";

import { useSearchParams } from "next/navigation";

export default function ThankYou(){

const params=
useSearchParams();

const receipt=
params.get(
"receiptNo"
);

const student=
params.get(
"student"
);

const amount=
params.get(
"amount"
);

const cls=
params.get(
"class"
);

const month=
params.get(
"month"
);

function download(){

window.print();

}

function whatsapp(){

const msg=

`Fees Receipt

Receipt:
${receipt}

Student:
${student}

Class:
${cls}

Month:
${month}

Amount:
₹${amount}`;

window.open(

`https://wa.me/?text=${encodeURIComponent(msg)}`,

"_blank"

);

}

return(

<div
style={{
padding:60,
minHeight:
"100vh",
background:
"#f4f7fc"
}}
>

<div
style={{
maxWidth:700,
margin:"auto",
background:"#fff",
padding:50,
borderRadius:24
}}
>

<div
style={{
fontSize:70
}}
>

✅

</div>

<h1>

Receipt Saved

</h1>

<p>

Receipt No:
{receipt}

</p>

<p>

Student:
{student}

</p>

<p>

Class:
{cls}

</p>

<p>

Month:
{month}

</p>

<p>

Amount:
₹{amount}

</p>

<div
style={{
display:"flex",
gap:12,
marginTop:30
}}
>

<button
onClick={
download
}
style={{
padding:
"14px 22px"
}}

>

Download PDF

</button>

<button
onClick={
whatsapp
}
style={{
padding:
"14px 22px"
}}

>

Send WhatsApp

</button>

<button
onClick={()=>

window.location.href=
"/admin/fees"

}
style={{
padding:
"14px 22px"
}}

>

New Receipt

</button>

</div>

</div>

</div>

);

}
