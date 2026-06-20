-- Run this entire file in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.admissions (
  id uuid primary key default gen_random_uuid(),
  admission_id text unique not null,
  student_name text not null,
  father_name text not null,
  mother_name text not null,
  mobile text not null check (mobile ~ '^[6-9][0-9]{9}$'),
  class_name text not null,
  school_name text not null,
  address text not null,
  preferred_batch text not null,
  status text not null default 'new' check (status in ('new','contacted','enrolled','closed')),
  created_at timestamptz not null default now()
);
create index if not exists admissions_mobile_idx on public.admissions(mobile);
create index if not exists admissions_created_at_idx on public.admissions(created_at desc);

-- Keeps an existing project compatible after removing admission document uploads.
alter table public.admissions drop column if exists student_photo_path;
alter table public.admissions drop column if exists previous_report_path;

create table if not exists public.fees (
  id uuid primary key default gen_random_uuid(),
  admission_ref uuid not null references public.admissions(id) on delete cascade,
  month text not null,
  amount numeric(10,2) not null check (amount > 0),
  due_date date not null,
  status text not null default 'pending' check (status in ('pending','paid','overdue','verification')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  unique(admission_ref, month)
);
create index if not exists fees_admission_idx on public.fees(admission_ref);

create table if not exists public.payment_submissions (
  id uuid primary key default gen_random_uuid(),
  fee_id uuid not null references public.fees(id) on delete cascade,
  screenshot_path text not null,
  status text not null default 'pending' check (status in ('pending','verified','rejected')),
  created_at timestamptz not null default now()
);

alter table public.admissions enable row level security;
alter table public.fees enable row level security;
alter table public.payment_submissions enable row level security;

-- Browser clients receive no table access. Server routes use the service role.
revoke all on public.admissions from anon, authenticated;
revoke all on public.fees from anon, authenticated;
revoke all on public.payment_submissions from anon, authenticated;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('payment-screenshots','payment-screenshots',false,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- Create the first admin in Authentication > Users, then add that email to ADMIN_EMAILS.
