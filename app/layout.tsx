import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://rainbow-the-learner-zone.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Rainbow The Learner Zone | Best Tuition Classes in Indore",
    template: "%s | Rainbow The Learner Zone",
  },

  description:
    "Rainbow The Learner Zone offers quality tuition classes in Nehru Nagar, Indore. Admissions Open 2026–27 for Nursery to Class 12 with experienced teachers, personal attention, homework support, test series and concept-based learning.",

  keywords: [
    "Rainbow The Learner Zone",
    "Tuition Classes in Indore",
    "Best Coaching Classes Indore",
    "School Tuition Indore",
    "Coaching Near Nehru Nagar",
    "Nursery Admission",
    "Primary Tuition",
    "Secondary Tuition",
    "Higher Secondary Coaching",
    "CBSE Tuition",
    "ICSE Tuition",
    "MP Board Coaching",
    "Math Tuition",
    "Science Tuition",
    "English Tuition",
    "Hindi Tuition",
    "Commerce Coaching",
    "Best Tuition Near Me",
  ],

  authors: [
    {
      name: "Rainbow The Learner Zone",
      url: siteUrl,
    },
  ],

  creator: "Rainbow The Learner Zone",

  publisher: "Rainbow The Learner Zone",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  verification: {
    google: "x0YN-5dm2c7k_KaJXuEMB0E7-frnHUTWHYU4MdpFxOo",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Rainbow The Learner Zone | Best Tuition Classes in Indore",

    description:
      "Admissions Open 2026–27. Personal attention, experienced teachers, concept-based learning and excellent academic results.",

    url: siteUrl,

    siteName: "Rainbow The Learner Zone",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/hero-classroom.png",
        width: 1200,
        height: 630,
        alt: "Rainbow The Learner Zone",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Rainbow The Learner Zone",

    description:
      "Admissions Open 2026–27 | Best Tuition Classes in Indore",

    images: [
      "/hero-classroom.png",
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  applicationName:
    "Rainbow The Learner Zone",

  category: "Education",

};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  );

}
