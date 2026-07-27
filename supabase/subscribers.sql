-- Subscribers for Perspectives briefings newsletter
-- Run in Supabase SQL Editor after the main schema.sql

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create index if not exists subscribers_created_at_idx
  on public.subscribers (created_at desc);

alter table public.subscribers enable row level security;

-- Anyone can subscribe (insert only)
drop policy if exists "Anyone can subscribe" on public.subscribers;
create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated admins can read / delete
drop policy if exists "Authenticated can read subscribers" on public.subscribers;
create policy "Authenticated can read subscribers"
  on public.subscribers
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can delete subscribers" on public.subscribers;
create policy "Authenticated can delete subscribers"
  on public.subscribers
  for delete
  to authenticated
  using (true);

-- Track whether subscribers were notified for a published article
alter table public.articles
  add column if not exists subscribers_notified_at timestamptz;
