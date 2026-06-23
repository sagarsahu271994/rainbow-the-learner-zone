"use client";

import { useState } from "react";

export default function FeesPage() {

const [loading,setLoading]=useState(false);

async function submitForm(){

try{

setLoading(true);

const res=await fetch("/api/fees",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
receiptNo:"123",
date:new Date(),
studentName:"Sagar",
className:"9",
feeMonth:"June",
amount:"700"
})
});

alert("Fees Saved");

}catch(e){

alert("Error");

}finally{

setLoading(false);

}

}

return(

<div className="p-10">

<h1>Fees Receipt</h1>

<button
onClick={submitForm}
className="bg-black text-white p-3 rounded"
>

{loading?"Saving...":"Generate Receipt"}

</button>

</div>

);

}
