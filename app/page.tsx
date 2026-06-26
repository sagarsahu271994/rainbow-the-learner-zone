import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap, HeartHandshake, MapPin, Phone, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const courses = [
  { title: "Primary Foundation", detail: "Classes 1–5", text: "Joyful, concept-led support for English, Maths, EVS and Hindi.", color: "bg-coral/10 text-coral" },
  { title: "Middle School", detail: "Classes 6–8", text: "Strong fundamentals, regular practice and exam-ready confidence.", color: "bg-sky/10 text-sky" },
  { title: "Secondary Support", detail: "Classes 9–10", text: "Focused subject guidance, revision plans and test preparation.", color: "bg-violet/10 text-violet" }
];
const facilities = ["Small, focused batches", "Regular tests & feedback", "Safe learning environment", "Doubt-clearing support", "Progress updates for parents", "Experienced guidance"];
const testimonials = [
  ["The personal attention made a visible difference in my daughter’s confidence and marks.", "Parent of Class 7 student"],
  ["Teachers explain patiently and keep us informed about progress. A very positive place.", "Parent of Class 5 student"],
  ["The regular tests and doubt sessions helped my son become much more consistent.", "Parent of Class 9 student"]
];
const faqs = [
  ["Which classes do you teach?", "We currently accept students from Classes 1 to 10, with batches arranged by class and learning needs."],
  ["Can I submit admission details online?", "Yes. The mobile-friendly admission form lets you submit details, upload documents and share the acknowledgement on WhatsApp."],
  ["How will I know the batch timing?", "Select a preferred batch in the form. Our team will call you to confirm availability and the most suitable timing."],
  ["Can I check fee status online?", "Yes. Use the Fee Slip page with your registered mobile number or Admission ID."]
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Rainbow The Learner Zone",
  url: "https://rainbow-the-learner-zone.vercel.app",
  logo: "https://rainbow-the-learner-zone.vercel.app/logo.png",
  image: "https://rainbow-the-learner-zone.vercel.app/hero-classroom.png",

  description:
    "Rainbow The Learner Zone is one of the best tuition classes in Nehru Nagar, Indore offering coaching from Nursery to Class 12 with experienced teachers and personalized learning.",

  telephone: "+91-6263549413",

  address: {
    "@type": "PostalAddress",
    streetAddress: "110/2, Nehru Nagar",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452001",
    addressCountry: "IN",
  },

  areaServed: "Indore",

  sameAs: [
    "https://www.facebook.com/",
    "https://www.instagram.com/",
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify(jsonLd),
}}
/>
      <main>
        <section className="relative overflow-hidden bg-cream">
          <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-sunshine/20 blur-3xl" />
          <div className="shell grid min-h-[720px] items-center gap-10 py-16 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-sunshine/40 bg-white px-4 py-2 text-xs font-bold"><Sparkles size={15} className="text-coral" /> Admissions open for 2026–27</div>
              <h1 className="mt-7 text-5xl font-black leading-[1.04] tracking-[-.05em] sm:text-7xl">Learning that brings out <span className="rainbow-text">every colour.</span></h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Rainbow The Learner Zone provides quality tuition classes in Nehru Nagar, Indore for Nursery to Class 12. We focus on concept-based learning, experienced teachers, regular tests, homework support and overall academic excellence.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/admission" className="btn-primary">Apply for Admission 2026-27 <ArrowRight size={18} /></Link><a href="tel:+916263549413" className="btn-light"><Phone size={18} /> Talk to us</a></div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-slate-600"><span className="flex items-center gap-2"><CheckCircle2 className="text-leaf" size={18}/> Classes 1–10</span><span className="flex items-center gap-2"><CheckCircle2 className="text-leaf" size={18}/> Small batches</span><span className="flex items-center gap-2"><CheckCircle2 className="text-leaf" size={18}/> Parent updates</span></div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rotate-2 rounded-[2.5rem] bg-gradient-to-br from-coral via-sunshine to-sky opacity-25" />
              <Image src="/hero-classroom.png" alt="Students learning together at Rainbow The Learner Zone" width={1536} height={1024} priority className="relative h-[420px] w-full rounded-[2rem] object-cover object-right shadow-soft sm:h-[560px]" />
              <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-4 shadow-soft"><p className="text-2xl font-black">2026–27</p><p className="text-xs font-bold text-slate-500">Seats now open</p></div>
            </div>
          </div>
        </section>

        <section id="about" className="section"><div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="eyebrow">About Rainbow</p><h2 className="title">A learning space where children feel seen.</h2><p className="mt-6 text-lg leading-8 text-slate-600">We help students build clear concepts, steady study habits and genuine self-belief. Every lesson is designed to meet learners where they are and move them forward with patience.</p></div>
          <div className="grid grid-cols-2 gap-4">{[[Users,"Personal attention"],[BookOpen,"Concept clarity"],[HeartHandshake,"Parent partnership"],[GraduationCap,"Confident progress"]].map(([Icon,t])=><div className="card" key={String(t)}><Icon className="text-violet" /><p className="mt-8 font-black">{String(t)}</p></div>)}</div>
        </div></section>

        <section className="section bg-ink text-white"><div className="shell"><p className="eyebrow text-sunshine">Why choose us</p><h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-5xl">Structure, care and momentum—together.</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{[[ShieldCheck,"A safe, encouraging space"],[Clock3,"Consistent routines that work"],[Star,"Progress worth celebrating"]].map(([Icon,t],i)=><div className="rounded-3xl border border-white/10 bg-white/5 p-7" key={String(t)}><span className="text-xs font-bold text-white/40">0{i+1}</span><Icon className="mt-10 text-sunshine"/><h3 className="mt-4 text-xl font-bold">{String(t)}</h3><p className="mt-3 text-sm leading-6 text-white/60">Thoughtful teaching, regular practice and open communication keep every learner moving forward.</p></div>)}</div></div></section>

        <section id="courses" className="section bg-slate-50"><div className="shell"><div className="text-center"><p className="eyebrow">Courses</p><h2 className="title">The right support at every stage.</h2></div><div className="mt-12 grid gap-6 md:grid-cols-3">{courses.map(c=><div className="card" key={c.title}><span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${c.color}`}>{c.detail}</span><h3 className="mt-8 text-2xl font-black">{c.title}</h3><p className="mt-3 leading-7 text-slate-600">{c.text}</p><Link href="/admission" className="mt-8 inline-flex items-center gap-2 text-sm font-bold">Apply for a seat <ArrowRight size={16}/></Link></div>)}</div></div></section>

        <section className="section"><div className="shell grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">Facilities</p><h2 className="title">Everything needed for focused learning.</h2></div><div className="grid gap-3 sm:grid-cols-2">{facilities.map(x=><div key={x} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 font-bold"><CheckCircle2 size={20} className="text-leaf"/>{x}</div>)}</div></div></section>

        <section id="gallery" className="section bg-cream"><div className="shell"><p className="eyebrow">Inside Rainbow</p><h2 className="title">A bright place to learn and belong.</h2><div className="mt-10 grid h-[620px] gap-4 sm:grid-cols-2 lg:h-[500px] lg:grid-cols-3">{["classroom-1.png","classroom-2.png","classroom-3.png"].map((x,i)=><div key={x} className="relative overflow-hidden rounded-3xl"><Image src={`/gallery/${x}`} alt={`Learning environment ${i+1}`} fill className={`object-cover ${i===0?"object-right":i===1?"object-center":"object-[70%_center]"}`} sizes="(max-width: 768px) 100vw, 33vw" /></div>)}</div></div></section>

        <section className="section"><div className="shell"><div className="text-center"><p className="eyebrow">Parent stories</p><h2 className="title">Trust built one learner at a time.</h2></div><div className="mt-12 grid gap-6 md:grid-cols-3">{testimonials.map(([q,a])=><figure className="card" key={a}><div className="flex gap-1 text-sunshine">{[1,2,3,4,5].map(x=><Star key={x} size={17} fill="currentColor"/>)}</div><blockquote className="mt-7 text-lg font-semibold leading-8">“{q}”</blockquote><figcaption className="mt-6 text-sm text-slate-500">{a}</figcaption></figure>)}</div></div></section>

        <section className="section bg-slate-50"><div className="shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">FAQ</p><h2 className="title">Good questions, clear answers.</h2></div><div className="space-y-3">{faqs.map(([q,a])=><details className="group rounded-2xl border border-slate-200 bg-white p-5" key={q}><summary className="cursor-pointer list-none font-bold">{q}<span className="float-right text-violet group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">{a}</p></details>)}</div></div></section>

        <section id="contact" className="section"><div className="shell"><div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet to-ink p-8 text-white sm:p-14"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-sunshine">Come say hello</p><h2 className="mt-4 text-4xl font-black sm:text-6xl">Your child’s next bright chapter starts here.</h2><Link href="/admission" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 font-bold text-ink">Apply for admission <ArrowRight className="ml-2" size={18}/></Link></div><div className="flex flex-col justify-end gap-5 text-white/75"><p className="flex gap-3"><MapPin className="shrink-0 text-sunshine"/>110/2, Nehru Nagar, Indore</p><a href="tel:+916263549413" className="flex gap-3"><Phone className="text-sunshine"/>+91 6263549413</a></div></div></div></div></section>
      </main>
      <Footer /><WhatsAppButton />
    </>
  );
}
