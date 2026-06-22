async function getStudents() {
const res = await fetch(
`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/students`,
{
cache: "no-store"
}
);

return res.json();
}

export default async function Dashboard() {

const students = await getStudents();

return (

<div className="p-10">

<h1 className="text-5xl font-bold mb-8">
Admin Dashboard
</h1>

<div className="border rounded-xl p-6">

<h2 className="text-2xl font-bold mb-6">
Admissions
</h2>

<table className="w-full">

<thead>

<tr>

<th align="left">
Admission ID
</th>

<th align="left">
Student
</th>

<th align="left">
Class
</th>

</tr>

</thead>

<tbody>

{students?.map((s:any,index:number)=>(

<tr key={index}>

<td>
{s["Admission ID"]}
</td>

<td>
{s["Student Name"]}
</td>

<td>
{s["Class"]}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}
