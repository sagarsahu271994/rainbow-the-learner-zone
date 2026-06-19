import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FeeLookup } from "@/components/FeeLookup";

export const metadata: Metadata = { title: "Fee Slip", description: "Check and download your Rainbow The Learner Zone fee slip." };
export default function FeesPage(){return <main className="min-h-screen bg-cream py-8 sm:py-14"><div className="shell"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> Back home</Link><div className="mx-auto mb-10 mt-10 max-w-2xl text-center"><p className="eyebrow">Fee desk</p><h1 className="title">Your fee details, in a few taps.</h1><p className="mt-4 text-slate-600">Search with the registered mobile number or your Admission ID.</p></div><FeeLookup/></div></main>}
