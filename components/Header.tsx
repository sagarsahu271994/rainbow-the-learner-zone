import Image from "next/image";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <div className="rainbow-line h-1" />
      <div className="shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Rainbow The Learner Zone home">
          <Image src="/logo.png" width={220} height={144} alt="Rainbow The Learner Zone" className="h-14 w-28 object-contain sm:w-40" priority />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          <Link href="/#about">About</Link><Link href="/#courses">Courses</Link><Link href="/#gallery">Gallery</Link>
          <Link href="/fees">Fee slip</Link><Link href="/#contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+916263549413" className="hidden rounded-full p-3 text-ink hover:bg-slate-100 sm:block" aria-label="Call us"><Phone size={20} /></a>
          <Link href="/admission" className="btn-primary px-5">Apply now</Link>
          <details className="relative lg:hidden">
            <summary className="list-none rounded-full p-3 hover:bg-slate-100"><Menu size={20} /></summary>
            <div className="absolute right-0 top-14 w-48 rounded-2xl border bg-white p-3 shadow-soft">
              {["about","courses","gallery","contact"].map((x)=><Link key={x} href={`/#${x}`} className="block rounded-xl px-4 py-3 capitalize hover:bg-slate-50">{x}</Link>)}
              <Link href="/fees" className="block rounded-xl px-4 py-3 hover:bg-slate-50">Fee slip</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
