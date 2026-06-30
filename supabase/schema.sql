create extension if not exists "pgcrypto";

create table if not exists public.parent_accounts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9-]{3,40}$'),
  parent_name text not null,
  student_name text not null,
  password_hash text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.parent_accounts(id) on delete cascade,
  title text not null,
  exam_date date not null,
  score numeric(5,2) not null check (score between 0 and 100),
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.exam_subjects (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  subject_name text not null,
  correct_count integer not null default 0 check (correct_count >= 0),
  wrong_count integer not null default 0 check (wrong_count >= 0),
  blank_count integer not null default 0 check (blank_count >= 0),
  review_topics text,
  created_at timestamptz not null default now()
);

alter table public.parent_accounts enable row level security;
alter table public.exams enable row level security;
alter table public.exam_subjects enable row level security;

-- Tarayıcıdan doğrudan erişim verilmez. Tüm işlemler Next.js sunucusundan yapılır.
revoke all on public.parent_accounts from anon, authenticated;
revoke all on public.exams from anon, authenticated;
revoke all on public.exam_subjects from anon, authenticated;

create index if not exists exams_parent_date_idx on public.exams(parent_id, exam_date desc);
create index if not exists exam_subjects_exam_idx on public.exam_subjects(exam_id);
