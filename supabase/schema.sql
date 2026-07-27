-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  number text,
  slug text unique not null,
  title text not null,
  subtitle text default '',
  reading_time_minutes integer,
  cover_image_url text,
  body jsonb not null default '[]'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  author_id uuid references auth.users (id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- If you created the older table with extra columns, drop them:
alter table public.articles drop column if exists author_name;
alter table public.articles drop column if exists author_image_url;

-- Category column (matches filter pills on the Perspectives page)
alter table public.articles add column if not exists category text default 'GEO-STRATEGY'
  check (category in ('GEO-STRATEGY', 'CYBER SIGNALS', 'TELEMETRY', 'CRYPTOGRAPHY', 'SUPPLY CHAINS'));

-- Ensure remaining optional columns exist
alter table public.articles add column if not exists reading_time_minutes integer;
alter table public.articles add column if not exists subtitle text default '';

create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_published_at_idx on public.articles (published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

alter table public.articles enable row level security;

drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
  on public.articles
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Authenticated can read all articles" on public.articles;
create policy "Authenticated can read all articles"
  on public.articles
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can insert articles" on public.articles;
create policy "Authenticated can insert articles"
  on public.articles
  for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Authenticated can update articles" on public.articles;
create policy "Authenticated can update articles"
  on public.articles
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete articles" on public.articles;
create policy "Authenticated can delete articles"
  on public.articles
  for delete
  to authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read article images" on storage.objects;
create policy "Public read article images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'article-images');

drop policy if exists "Authenticated upload article images" on storage.objects;
create policy "Authenticated upload article images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'article-images');

drop policy if exists "Authenticated update article images" on storage.objects;
create policy "Authenticated update article images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'article-images');

drop policy if exists "Authenticated delete article images" on storage.objects;
create policy "Authenticated delete article images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'article-images');

-- ---------------------------------------------------------------------------
-- Newsletter subscribers (Perspectives "Subscribe to Briefings")
-- ---------------------------------------------------------------------------

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create index if not exists subscribers_created_at_idx
  on public.subscribers (created_at desc);

alter table public.subscribers enable row level security;

drop policy if exists "Anyone can subscribe" on public.subscribers;
create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

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

alter table public.articles
  add column if not exists subscribers_notified_at timestamptz;

-- Public unsubscribe (email link → /api/unsubscribe)
create or replace function public.unsubscribe_email(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.subscribers
  where email = lower(trim(p_email));
end;
$$;

revoke all on function public.unsubscribe_email(text) from public;
grant execute on function public.unsubscribe_email(text) to anon, authenticated;

grant usage on schema public to anon, authenticated;
grant insert on public.subscribers to anon, authenticated;
grant select, delete on public.subscribers to authenticated;
