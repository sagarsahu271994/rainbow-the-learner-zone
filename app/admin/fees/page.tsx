"use client";

import { useState } from "react";

export default function FeesPage() {

const [loading,setLoading]=useState(false);

async function submitForm(){

setLoading(true);

try{

const res=await fetch("/api/fees",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
receiptNo:"1234",
date:new Date().toISOString(),
studentName:"Sagar",
className:"9",
feeMonth:"June",
amount:"700"
})
});

const data=await res.json();

alert(data.success?"Fees Saved":"Failed");

}catch(e){

alert("Error");

}

setLoading(false);

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-5">
Fees Receipt
</h1>

<button
onClick={submitForm}
className="bg-black text-white px-6 py-3 rounded"
>

{loading?"Saving...":"Generate Receipt"}

</button>

</div>

);

}
