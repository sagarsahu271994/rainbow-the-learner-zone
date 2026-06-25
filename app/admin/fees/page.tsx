"use client";

import React, {
useMemo,
useState,
} from "react";

type FormData={
receiptNo:string;
date:string;
studentName:string;
className:string;
feeMonth:string;
amount:string;
receivedBy:string;
};

type FieldProps={
label:string;
value:string;
set:(v:string)=>void;
};

function Field({
label,
value,
set,
}:FieldProps){

return(

<div style={{marginBottom:20}}>

<div
style={{
fontWeight:600,
marginBottom:8,
color:"#374151"
}}
>
{label}
</div>

<input
value={value}
onChange={(e)=>
set(
e.target.value
)
}
style={{
width:"100%",
padding:"14px",
border:"1px solid #d8dbe0",
borderRadius:10,
boxSizing:"border-box",
fontSize:16
}}
/>

</div>

);

}

export default function FeesPage(){

const today=
new Date()
.toISOString()
.split("T")[0];

const receipt =
useMemo(
()=>
"RTL-0001",
[]
);

const [form,setForm]=
useState<FormData>({
receiptNo:receipt,
date:today,
studentName:"",
className:"",
feeMonth:"",
amount:"",
receivedBy:"",
});

function update(
key:keyof FormData,
value:string
){

setForm(
prev=>({
...prev,
[key]:value
})
);

}

async function buildPdf(){

const html2canvas=
(
await import(
"html2canvas"
)
).default;

const {
default:jsPDF
}=
await import(
"jspdf"
);

const el=
document.getElementById(
"receipt"
);

if(!el)
return null;

const canvas=
await html2canvas(
el,
{
scale:2,
backgroundColor:"#fff",
useCORS:true,
}
);

const img=
canvas.toDataURL(
"image/png"
);

const pdf=
new jsPDF(
"p",
"mm",
"a4"
);

const pageWidth=
pdf.internal
.pageSize
.getWidth();

const pageHeight=
pdf.internal
.pageSize
.getHeight();

const imgWidth=
pageWidth-20;

const imgHeight=
(
canvas.height*
imgWidth
)
/
canvas.width;

pdf.addImage(
img,
"PNG",
10,
10,
imgWidth,
Math.min(
imgHeight,
pageHeight-20
)
);

return{
pdf,
base64:
pdf.output(
"datauristring"
)
};

}

async function submit(){

try{

const pdfData=
await buildPdf();

if(
!pdfData
){

alert(
"PDF Failed"
);

return;

}

const response=
await fetch(
"/api/fees",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
...form,
receiptPdf:
pdfData.base64
})
}
);

const data=
await response.json();

if(
data.success
){

pdfData.pdf.save(
`${form.receiptNo}.pdf`
);

if(
data.pdfUrl
){

window.open(
`https://wa.me/?text=${encodeURIComponent(data.pdfUrl)}`,
"_blank"
);

}

alert(
"Receipt Saved"
);

}

else{

alert(
"Save Failed"
);

}

}

catch{

alert(
"Server Error"
);

}

}

async function downloadPdf(){

const pdf=
await buildPdf();

pdf?.pdf.save(
`${form.receiptNo}.pdf`
);

}

function whatsapp(){

window.open(

`https://wa.me/?text=${encodeURIComponent(

`Receipt
${form.receiptNo}

Student:
${form.studentName}

Amount:
₹${form.amount}`

)}`,

"_blank"

);

}

return(

<div
style={{
background:"#eef3fa",
minHeight:"100vh",
padding:"40px"
}}
>

<div
style={{
maxWidth:"900px",
margin:"auto"
}}
>

<div
style={{
display:"flex",
gap:10,
marginBottom:20
}}
>

<button
style={blue}
onClick={
submit
}

>

Submit </button>

<button
style={black}
onClick={
downloadPdf
}

>

Download PDF </button>

<button
style={green}
onClick={
whatsapp
}

>

WhatsApp </button>

</div>

<div
id="receipt"
style={{
background:"#fff",
padding:"30px",
borderRadius:"16px",
maxWidth:"800px",
margin:"auto",
boxShadow:
"0 10px 40px rgba(0,0,0,.08)"
}}
>

<div
style={{
display:"flex",
gap:20,
alignItems:"center",
paddingBottom:20,
borderBottom:
"2px solid #eee"
}}
>

<img
src="/logo.png"
width="80"
alt=""
/>

<div>

<h1>
Rainbow
</h1>

<div>
The Learner Zone
</div>

<div>
Fees Receipt
</div>

</div>

</div>

<div
style={{
display:"flex",
justifyContent:
"space-between",
marginTop:20
}}
>

<div>
Receipt:
{form.receiptNo}
</div>

<div>
Date:
{form.date}
</div>

</div>

<div
style={{
marginTop:30
}}
>

<Field
label="Student"
value={form.studentName}
set={(v)=>
update(
"studentName",
v
)}
/>

<Field
label="Class"
value={form.className}
set={(v)=>
update(
"className",
v
)}
/>

<Field
label="Month"
value={form.feeMonth}
set={(v)=>
update(
"feeMonth",
v
)}
/>

<Field
label="Amount"
value={form.amount}
set={(v)=>
update(
"amount",
v
)}
/>

<Field
label="Received By"
value={form.receivedBy}
set={(v)=>
update(
"receivedBy",
v
)}
/>

</div>

<div
style={{
display:"flex",
justifyContent:
"space-between",
marginTop:60
}}
>

<div>
Student Signature
</div>

<div>

<img
src="/signature.jpeg"
height="70"
alt=""
/>

<div>
Authorized
Signature
</div>

</div>

</div>

</div>

</div>

</div>

);

}

const blue={
background:"#4f46e5",
color:"#fff",
padding:"14px 24px",
border:"none",
borderRadius:8
};

const black={
background:"#111",
color:"#fff",
padding:"14px 24px",
border:"none",
borderRadius:8
};

const green={
background:"#16a34a",
color:"#fff",
padding:"14px 24px",
border:"none",
borderRadius:8
};
