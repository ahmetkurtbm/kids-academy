alter table public.events
  add column if not exists share_scope text not null default 'site',
  add column if not exists parent_id uuid references public.parent_accounts(id) on delete cascade;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'events_share_scope_check'
  ) then
    alter table public.events
      add constraint events_share_scope_check check (share_scope in ('site', 'parent'));
  end if;
end $$;

update public.events set share_scope = 'site' where share_scope is null;
create index if not exists events_parent_idx on public.events(parent_id, event_date desc);
create index if not exists events_scope_date_idx on public.events(share_scope, event_date desc, created_at desc);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_path text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;
revoke all on public.announcements from anon, authenticated;
create index if not exists announcements_created_idx on public.announcements(created_at desc);
