# Rainbow The Learner Zone

Production-ready admission and fee management website for **Rainbow The Learner Zone**, 110/2, Nehru Nagar, Indore.

## Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS
- Supabase Database, Auth and private Storage
- Vercel-ready server routes
- React Hook Form + Zod validation
- jsPDF admission acknowledgement and fee slips

## Project structure

```text
app/
  admin/                 Admin login, admissions and fee management
  admission/             Mobile-first admission form
  fees/                  Fee search, PDF and payment upload
  thank-you/             Confirmation page
  api/
    admissions/          Saves validated admission details
    fees/search/         Secure fee lookup
    payments/            Uploads payment screenshots
    admin/               Protected dashboard APIs and CSV export
  layout.tsx             Metadata and analytics
  page.tsx               Full marketing homepage
  robots.ts
  sitemap.ts
components/              Site UI and interactive client components
lib/                     Supabase clients, validation and PDF helpers
public/
  logo.png                Official tuition logo
  hero-classroom.png
  gallery/
supabase/schema.sql      Database, indexes, RLS and storage buckets
```

## 1. Supabase setup

1. Create a project at Supabase.
2. Open **SQL Editor**, paste `supabase/schema.sql`, and run it.
3. In **Authentication → Users**, create an admin user with email and password.
4. Copy the project URL, anon key and service-role key from **Project Settings → API**.
5. Keep the service-role key server-only. Never prefix it with `NEXT_PUBLIC_`.
6. Put the admin email in `ADMIN_EMAILS`. Multiple emails are comma-separated.

The SQL creates a private `payment-screenshots` bucket. Public clients have no direct table access; all sensitive operations are performed by validated server routes.

## 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_EMAILS=owner@example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PAYMENT_UPI_ID=yourname@bank
```

`NEXT_PUBLIC_GA_ID` is optional. Analytics scripts are omitted when it is blank.

## 3. Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Before release, run:

```bash
npm run typecheck
npm run build
```

## 4. Admin workflow

Visit `/admin` and sign in using the Supabase Auth user whose email is listed in `ADMIN_EMAILS`. The dashboard can search admissions, export CSV, and create fee records. Payment proofs are stored privately for verification in Supabase.

## 5. GitHub upload

```bash
git init
git add .
git commit -m "Launch Rainbow The Learner Zone website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rainbow-learner-zone.git
git push -u origin main
```

Do not commit `.env.local`; it is already ignored.

## 6. Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Keep the detected framework as **Next.js**.
3. Add every environment variable above under **Project Settings → Environment Variables**.
4. Change `NEXT_PUBLIC_SITE_URL` to the final `https://...vercel.app` or custom domain.
5. Deploy. After the first deployment, redeploy once if you changed the public site URL.
6. In Supabase **Authentication → URL Configuration**, set the Site URL to the production domain.

## Production checklist

- Replace the generated gallery placeholders with real classroom images when available.
- Replace the UPI ID and verify a real small payment.
- Submit a test admission, create a fee, upload a payment screenshot, and test lookup.
- Add the final domain to `NEXT_PUBLIC_SITE_URL`.
- Confirm the admin email allowlist and rotate any key exposed outside Vercel.
- Add privacy/terms pages if collecting admissions at scale.

## Brand assets

The official Rainbow The Learner Zone logo is included as `public/logo.png`. The classroom image was generated specifically for this project.
