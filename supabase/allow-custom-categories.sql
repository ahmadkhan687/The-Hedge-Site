-- Allow custom article categories (run once in Supabase SQL Editor).
-- Drops the fixed CHECK so new categories can be saved when publishing.

alter table public.articles
  drop constraint if exists articles_category_check;
