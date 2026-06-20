"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Download, Loader2, MessageCircle, Upload } from "lucide-react";
import { admissionSchema } from "@/lib/validation";
import { downloadAdmissionPdf } from "@/lib/pdf";

type FormValues = z.infer<typeof admissionSchema>;
type Result = FormValues & { admissionId: string; createdAt: string };

export function AdmissionForm() {
  const [result, setResult] = useState<Result | null>(null);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(admissionSchema) });

  async function onSubmit(values: FormValues, event?: React.BaseSyntheticEvent) {
    setServerError("");
    const form = new FormData(event?.target);
    Object.entries(values).forEach(([key, value]) => form.set(key, value));
    const response = await fetch("/api/admissions", { method: "POST", body: form });
    const json = await response.json();
    if (!response.ok) { setServerError(json.error || "Could not submit admission. Please try again."); return; }
    setResult({ ...values, admissionId: json.admissionId, createdAt: new Date(json.createdAt).toLocaleDateString("en-IN") });
  }

  if (result) {
    const message = `Admission submitted successfully for ${result.studentName}. Admission ID: ${result.admissionId} — Rainbow The Learner Zone`;
    return <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf/10 text-leaf"><CheckCircle2 size={34}/></div>
      <p className="eyebrow mt-7">Application received</p><h2 className="mt-3 text-3xl font-black">Welcome to the Rainbow family.</h2>
      <p className="mt-4 text-slate-600">Save your Admission ID to check fee details later.</p>
      <div className="mx-auto mt-7 max-w-sm rounded-2xl bg-cream p-5"><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admission ID</p><p className="mt-2 text-2xl font-black">{result.admissionId}</p></div>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a className="btn-primary bg-[#25D366] hover:bg-[#1fb95a]" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Share on WhatsApp</a>
        <button className="btn-light" onClick={()=>downloadAdmissionPdf(result)}><Download size={18}/> Download PDF</button>
      </div>
    </div>;
  }

  const fields: { name: keyof FormValues; label: string; placeholder: string }[] = [
    { name:"studentName", label:"Student name", placeholder:"Full name" },
    { name:"fatherName", label:"Father name", placeholder:"Father’s full name" },
    { name:"motherName", label:"Mother name", placeholder:"Mother’s full name" },
    { name:"mobile", label:"Mobile number", placeholder:"10-digit mobile number" },
    { name:"schoolName", label:"School name", placeholder:"Current school" }
  ];

  return <form onSubmit={handleSubmit(onSubmit)} className="card mx-auto max-w-4xl p-6 sm:p-10">
    <div className="grid gap-6 sm:grid-cols-2">
      {fields.map(f=><label key={f.name}><span className="label">{f.label}</span><input {...register(f.name)} className="field" placeholder={f.placeholder} inputMode={f.name==="mobile"?"numeric":undefined}/>{errors[f.name]&&<span className="mt-1 block text-xs text-red-600">{errors[f.name]?.message}</span>}</label>)}
      <label><span className="label">Class</span><select {...register("className")} className="field"><option value="">Select class</option>{Array.from({length:10},(_,i)=><option key={i+1} value={`Class ${i+1}`}>Class {i+1}</option>)}</select>{errors.className&&<span className="mt-1 block text-xs text-red-600">{errors.className.message}</span>}</label>
      <label><span className="label">Preferred batch</span><select {...register("preferredBatch")} className="field"><option value="">Select timing</option><option>Morning (7:00–9:00)</option><option>Afternoon (2:00–4:00)</option><option>Evening (4:00–7:00)</option></select>{errors.preferredBatch&&<span className="mt-1 block text-xs text-red-600">{errors.preferredBatch.message}</span>}</label>
      <label className="sm:col-span-2"><span className="label">Address</span><textarea {...register("address")} className="field min-h-28" placeholder="Complete residential address"/>{errors.address&&<span className="mt-1 block text-xs text-red-600">{errors.address.message}</span>}</label>
      <FileField name="studentPhoto" label="Student photo" accept="image/jpeg,image/png,image/webp" required />
      <FileField name="previousReport" label="Previous report" accept="image/jpeg,image/png,image/webp,application/pdf" />
    </div>
    {serverError&&<p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{serverError}</p>}
    <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row"><p className="text-xs leading-5 text-slate-500">By submitting, you allow our admissions team to contact you.</p><button disabled={isSubmitting} className="btn-primary w-full sm:w-auto">{isSubmitting?<><Loader2 className="animate-spin" size={18}/>Submitting…</>:<>Submit admission <CheckCircle2 size={18}/></>}</button></div>
  </form>;
}

function FileField({ name, label, accept, required=false }: { name:string; label:string; accept:string; required?:boolean }) {
  return <label><span className="label">{label}</span><span className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm text-slate-500 hover:border-violet"><Upload size={22} className="mb-2 text-violet"/>Tap to choose file<input name={name} type="file" accept={accept} required={required} className="sr-only"/></span></label>;
}
