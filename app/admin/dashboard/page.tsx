"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

const [rows,setRows]=useState<any[]>([]);

useEffect(()=>{

fetch(
"/api/admin/students"
)
.then(r=>r.json())
.then(setRows);

},[]);

return (

<div className="p-10">

<h1 className="text-4xl font-bold mb-8">

Admin Dashboard

</h1>

<div className="rounded-xl border p-6">

<h2 className="text-xl font-semibold mb-4">

Admissions

</h2>

<table className="w-full">

<thead>

<tr>

<th className="text-left">
Admission ID
</th>

<th className="text-left">
Student
</th>

<th className="text-left">
Class
</th>

</tr>

</thead>

<tbody>

{rows.map((r)=>(

<tr
key={r.id}
className="border-t"
>

<td className="py-4">
{r.id}
</td>

<td>
{r.name}
</td>

<td>
{r.class}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}
