"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Download, Loader2, Search, Upload } from "lucide-react";
import { downloadFeePdf } from "@/lib/pdf";

type Fee = { id:string; studentName:string; admissionId:string; month:string; amount:number; status:string; mobile:string };

export function FeeLookup() {
  const [query,setQuery]=useState("");
  const [fees,setFees]=useState<Fee[]>([]);
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");
  const [uploading,setUploading]=useState("");

  async function search(e:FormEvent) {
    e.preventDefault(); setLoading(true); setMessage(""); setFees([]);
    const response=await fetch(`/api/fees/search?q=${encodeURIComponent(query)}`);
    const json=await response.json(); setLoading(false);
    if(!response.ok){setMessage(json.error||"No records found.");return;} setFees(json.fees);
    if(!json.fees.length)setMessage("No fee records found for these details.");
  }
  async function upload(feeId:string,file:File) {
    setUploading(feeId); setMessage("");
    const form=new FormData(); form.set("feeId",feeId); form.set("screenshot",file);
    const response=await fetch("/api/payments",{method:"POST",body:form}); const json=await response.json(); setUploading("");
    setMessage(response.ok?"Payment screenshot uploaded. We’ll verify it shortly.":json.error||"Upload failed.");
  }
  return <div className="mx-auto max-w-3xl">
    <form onSubmit={search} className="card flex flex-col gap-3 p-4 sm:flex-row"><input className="field flex-1" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Mobile number or Admission ID" required/><button className="btn-primary" disabled={loading}>{loading?<Loader2 className="animate-spin" size={18}/>:<Search size={18}/>} Find fee details</button></form>
    {message&&<p className="mt-5 rounded-2xl bg-white p-4 text-center text-sm text-slate-600">{message}</p>}
    <div className="mt-6 space-y-5">{fees.map(f=><div className="card p-6" key={f.id}><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{f.admissionId}</p><h2 className="mt-2 text-2xl font-black">{f.studentName}</h2><p className="mt-2 text-sm text-slate-500">{f.month}</p></div><div className="sm:text-right"><p className="text-3xl font-black">₹{f.amount.toLocaleString("en-IN")}</p><span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${f.status==="paid"?"bg-leaf/10 text-leaf":"bg-sunshine/20 text-amber-700"}`}>{f.status}</span></div></div>
      <div className="mt-6 border-t pt-6"><button className="btn-light w-full sm:w-auto" onClick={()=>downloadFeePdf({...f})}><Download size={18}/> Download fee slip</button></div>
      {f.status!=="paid"&&<div className="mt-6 rounded-2xl bg-cream p-5"><h3 className="font-black">Pay by UPI</h3><p className="mt-2 text-sm text-slate-600">Open any UPI app and pay ₹{f.amount.toLocaleString("en-IN")} to <strong>{process.env.NEXT_PUBLIC_PAYMENT_UPI_ID||"rainbow@upi"}</strong>. Add {f.admissionId} in the note.</p><label className="btn-primary mt-4 cursor-pointer bg-violet"><Upload size={18}/>{uploading===f.id?"Uploading…":"Upload payment screenshot"}<input type="file" className="sr-only" accept="image/*" disabled={uploading===f.id} onChange={e=>e.target.files?.[0]&&upload(f.id,e.target.files[0])}/></label></div>}
      {f.status==="paid"&&<p className="mt-5 flex items-center gap-2 text-sm font-bold text-leaf"><CheckCircle2 size={18}/> Payment received</p>}
    </div>)}</div>
  </div>;
}
