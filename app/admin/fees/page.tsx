"use client";

import { useState } from "react";

export default function FeesPage() {

const [studentName,setStudentName]=useState("");

const [studentClass,setStudentClass]=useState("");

const [feeMonth,setFeeMonth]=useState("");

const [amount,setAmount]=useState("");

const [receiptNo,setReceiptNo]=useState("");

const [date,setDate]=useState(
new Date()
.toISOString()
.split("T")[0]
);{
return (

<div className="p-10">

<div className="max-w-4xl mx-auto border rounded-xl p-10">
  <div className="mb-8 grid grid-cols-2 gap-4">

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
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="border p-3 rounded"
/>

<input
placeholder="Month"
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

<input
placeholder="Receipt No"
value={receiptNo}
onChange={(e)=>setReceiptNo(e.target.value)}
className="border p-3 rounded"
/>

</div>

<div className="text-center">

<h1 className="text-5xl font-bold">
Rainbow
</h1>

<p className="text-2xl">
The Learner Zone
</p>

<p>
110/2 Nehru Nagar, Indore
</p>

</div>

<div className="flex justify-between mt-10">

<p>
S. No.: {receiptNo}
</p>

<p>
Date: {date}
</p>

</div>

<div className="mt-8 space-y-6">

<div>

<p>Received From</p>
Received From: {studentName}
<input
className="border-b w-full p-2"
/>

</div>

<div>

<p>Class</p>
Class: {studentClass}
<input
className="border-b w-full p-2"
/>

</div>

<div>

Fees for month: {feeMonth}

<input
className="border-b w-full p-2"
/>

</div>

<div>

Amount Rs: {amount}

<input
className="border-b w-full p-2"
/>

</div>

</div>

<div className="mt-16 flex justify-between">

<div>

<p>
Received By
</p>

</div>

<div>

<img
src="/signature.png"
alt="signature"
className="h-16"
/>

</div>

</div>

</div>

</div>

);
}
