import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink py-12 text-white">
      <div className="shell grid gap-8 md:grid-cols-3">
        <div><p className="text-xl font-black">Rainbow The Learner Zone</p><p className="mt-3 max-w-sm text-sm leading-6 text-white/65">Confident learners, stronger foundations, brighter futures.</p></div>
        <div><p className="font-bold">Visit us</p><p className="mt-3 text-sm text-white/65">110/2, Nehru Nagar, Indore</p><a href="tel:+916263549413" className="mt-2 block text-sm">+91 6263549413</a></div>
        <div className="md:text-right"><Link href="/admission" className="text-sm font-bold">Admissions 2026–27</Link><p className="mt-6 text-xs text-white/45">© {new Date().getFullYear()} Rainbow The Learner Zone</p></div>
      </div>
    </footer>
  );
}
