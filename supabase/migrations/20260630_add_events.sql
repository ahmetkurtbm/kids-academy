create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  summary text not null,
  details text,
  image_path text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
revoke all on public.events from anon, authenticated;
create index if not exists events_date_idx on public.events(event_date desc, created_at desc);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-images', 'event-images', true, 4194304, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 4194304, allowed_mime_types = array['image/jpeg','image/png','image/webp'];
