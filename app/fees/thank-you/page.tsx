"use client";

import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {

const p =
useSearchParams();

const receipt =
p.get("receiptNo");

const student =
p.get("student");

const cls =
p.get("class");

const month =
p.get("month");

const amount =
p.get("amount");

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
padding:50,
minHeight:"100vh",
background:"#f4f7fc"
}}
>

<div
style={{
maxWidth:700,
margin:"auto",
background:"#fff",
padding:40,
borderRadius:20
}}
>

<h1>

✅ Receipt Saved

</h1>

<p>

Receipt:
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
marginTop:20
}}
>

<button
onClick={
download
}
>

Download

</button>

<button
onClick={
whatsapp
}
>

WhatsApp

</button>

<button
onClick={()=>

window.location.href=
"/admin/fees"

}
>

New Receipt

</button>

</div>

</div>

</div>

);

}
