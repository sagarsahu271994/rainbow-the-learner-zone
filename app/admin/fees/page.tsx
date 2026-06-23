"use client";

import { useState } from "react";

export default function FeesPage() {

const [receiptNo,setReceiptNo]=useState("");
const [date,setDate]=useState("");
const [studentName,setStudentName]=useState("");
const [studentClass,setStudentClass]=useState("");
const [feeMonth,setFeeMonth]=useState("");
const [amount,setAmount]=useState("");
const [loading,setLoading]=useState(false);

async function submitForm(){

setLoading(true);

try{

await fetch("/api/fees",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
receiptNo,
date,
studentName,
studentClass,
feeMonth,
amount,
createdAt:new Date()
})
});

alert("Fees Saved");

setReceiptNo("");
setDate("");
setStudentName("");
setStudentClass("");
setFeeMonth("");
setAmount("");

}catch{

alert("Error");

}

setLoading(false);

}

return(

<div className="p-10">

<div className="max-w-4xl mx-auto border rounded-xl p-10">

<h1 className="text-4xl font-bold mb-8">
Fees Receipt
</h1>

<div className="grid grid-cols-2 gap-4">

<input
placeholder="Receipt No"
value={receiptNo}
onChange={(e)=>setReceiptNo(e.target.value)}
className="border p-3 rounded"
/>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="border p-3 rounded"
/>

<input
placeholder="Student Name"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
className="border p-3 rounded"
/>

<input
placeholder="Class"
value={studentClass}
onChange={(e)=>setStudentClass(e.target.value)}
className="border p-3 rounded"
/>

<input
placeholder="Fee Month"
value={feeMonth}
onChange={(e)=>setFeeMonth(e.target.value)}
className="border p-3 rounded"
/>

<input
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="border p-3 rounded"
/>

</div>

<button
onClick={submitForm}
className="mt-8 bg-black text-white px-6 py-3 rounded"
>

{loading ? "Saving..." : "Generate Receipt"}

</button>

</div>

</div>

);

}
