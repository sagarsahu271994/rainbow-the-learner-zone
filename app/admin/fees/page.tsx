"use client";

import { useMemo, useState } from "react";

export default function FeesPage() {

const today =
new Date()
.toISOString()
.split("T")[0];

const autoReceipt =
useMemo(
()=>`RTL-${Date.now()}`,
[]
);

const [form,setForm]=useState({

receiptNo:autoReceipt,

date:today,

studentName:"",

className:"",

feeMonth:"",

amount:"",

receivedBy:""

});

function update(
key:string,
value:string
){

setForm(
prev=>({
...prev,
[key]:value
})
);

}

return(

<div
style={{
background:"#f4f6fb",
minHeight:"100vh",
padding:"40px"
}}
>

<div
style={{
maxWidth:"1000px",
margin:"auto"
}}
>

<div
style={{
display:"flex",
gap:"20px",
marginBottom:"20px"
}}
>

<button
style={primaryBtn}
>
Submit
</button>

<button
style={darkBtn}
>
Download PDF
</button>

<button
style={whatsappBtn}
>
Send WhatsApp
</button>

</div>

<div
id="receipt"

style={{
background:"#fff",
padding:"40px",
borderRadius:"20px",
boxShadow:
"0 10px 40px rgba(0,0,0,.08)"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"20px",
borderBottom:
"2px solid #ddd",
paddingBottom:"20px"
}}
>

<img
src="/logo.png"
alt="logo"
style={{
width:"90px"
}}
/>

<div>

<h1
style={{
margin:0,
fontSize:"34px"
}}
>
Rainbow
</h1>

<p
style={{
margin:0
}}
>
The Learner Zone
</p>

<p
style={{
margin:"6px 0"
}}
>
110/2 Nehru Nagar, Indore
</p>

</div>

</div>

<div
style={{
display:"flex",
justifyContent:
"space-between",
marginTop:"20px"
}}
>

<div>

<b>
Receipt No:
</b>

{form.receiptNo}

</div>

<div>

<b>
Date:
</b>

{form.date}

</div>

</div>

<div
style={{
marginTop:"30px",
display:"grid",
gap:"18px"
}}
>

<Field
label="Received From"
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
label="Fees Month"
value={form.feeMonth}
set={(v)=>
update(
"feeMonth",
v
)}
/>

<Field
label="Amount Rs."
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
marginTop:"70px"
}}
>

<div>

<p>
Student Signature
</p>

</div>

<div>

<img
src="/signature.jpeg"
alt="signature"
style={{
height:"80px"
}}
/>

<p>
Authorized Signature
</p>

</div>

</div>

</div>

</div>

</div>

);

}

function Field({
label,
value,
set
}:any){

return(

<div>

<div
style={{
marginBottom:"8px",
fontWeight:600
}}
>
{label}
</div>

<input
value={value}
onChange={
e=>
set(
e.target.value
)
}
style={{
width:"100%",
padding:"12px",
border:
"1px solid #ccc",
borderRadius:"8px"
}}
/>

</div>

);

}

const primaryBtn={
background:"#4f46e5",
color:"#fff",
padding:"14px 24px",
border:"none",
borderRadius:"10px"
};

const darkBtn={
background:"#111",
color:"#fff",
padding:"14px 24px",
border:"none",
borderRadius:"10px"
};

const whatsappBtn={
background:"#22c55e",
color:"#fff",
padding:"14px 24px",
border:"none",
borderRadius:"10px"
};
