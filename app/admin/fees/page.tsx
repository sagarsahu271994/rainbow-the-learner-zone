"use client";

import { useState } from "react";
export default function FeesPage() {
return (

<div className="p-10">

<div className="max-w-4xl mx-auto border rounded-xl p-10">

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
S. No. ______
</p>

<p>
Date: __________
</p>

</div>

<div className="mt-8 space-y-6">

<div>

<p>Received From</p>

<input
className="border-b w-full p-2"
/>

</div>

<div>

<p>Class</p>

<input
className="border-b w-full p-2"
/>

</div>

<div>

<p>Fees for the month of Rs.</p>

<input
className="border-b w-full p-2"
/>

</div>

<div>

<p>Amount Rs.</p>

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
