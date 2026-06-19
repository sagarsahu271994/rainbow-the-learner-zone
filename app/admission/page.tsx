import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdmissionForm } from "@/components/AdmissionForm";

export const metadata: Metadata = { title: "Online Admission 2026–27", description: "Apply online for admission at Rainbow The Learner Zone, Indore." };

export default function AdmissionPage() {
  return <main className="min-h-screen bg-cream py-8 sm:py-14"><div className="shell"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> Back home</Link><div className="mx-auto mb-10 mt-10 max-w-3xl text-center"><p className="eyebrow">Admissions 2026–27</p><h1 className="title">A simple first step toward brighter learning.</h1><p className="mt-4 text-slate-600">Complete the form below. It takes about three minutes.</p></div><AdmissionForm/></div></main>;
}
