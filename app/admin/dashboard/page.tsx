async function getStudents() {
try {

const res = await fetch(
"https://rainbow-the-learner-zone.vercel.app/api/admin/students",
{
cache: "no-store"
}
);

if (!res.ok) {
return [];
}

return await res.json();

} catch {

return [];

}
}

export default async function Dashboard() {

const students = await getStudents();
const totalStudents = students?.length || 0;

return (

<div className="p-10">

<div className="flex justify-between items-center mb-8">

<div>
<h1 className="text-5xl font-bold">
Admin Dashboard
</h1>
</div>

<div className="flex gap-3">

<a
href="/admin/dashboard"
className="border px-4 py-2 rounded-lg"
>
Dashboard
</a>

<a
href="/admin/fees"
className="bg-black text-white px-4 py-2 rounded-lg"
>
Fee Slips
</a>

</div>

</div>
<div className="border rounded-xl p-6">

<h2 className="text-2xl font-bold mb-6">
Admissions
</h2>
<div className="mt-6">

<div className="grid grid-cols-3 font-bold mb-4">

<div>Admission ID</div>

<div>Student</div>

<div>Class</div>

</div>

{students?.map((student:any,index:number)=>(

<div
key={index}
className="grid grid-cols-3 py-2"
>

<div>{student[1]}</div>

<div>{student[2]}</div>

<div>{student[7]}</div>

</div>

))}

</div>
<table className="w-full">

<thead>
<tr>
<th>Admission ID</th>
<th>Student</th>
<th>Class</th>
</tr>
</thead>

<tbody>

{Array.isArray(students)
? students.map((s:any,i:number)=>(

<tr key={i}>

<td>
{s["Admission ID"] || "-"}
</td>

<td>
{s["Student Name"] || "-"}
</td>

<td>
{s["Class"] || "-"}

</td>

</tr>

))
: null}

</tbody>

</table>

</div>

</div>

);

}
