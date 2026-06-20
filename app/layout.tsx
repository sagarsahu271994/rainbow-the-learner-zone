import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Rainbow The Learner Zone | Tuition Classes in Indore", template: "%s | Rainbow The Learner Zone" },
  description: "Admissions open for 2026–27. Personal attention, strong fundamentals and supportive tuition classes in Nehru Nagar, Indore.",
  keywords: ["tuition classes Indore", "coaching Nehru Nagar", "school tuition Indore", "Rainbow The Learner Zone"],
  openGraph: { title: "Rainbow The Learner Zone", description: "Where confident learners grow.", type: "website", images: ["/hero-classroom.png"] },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={inter.className}>{children}<Analytics /></body></html>;
}
