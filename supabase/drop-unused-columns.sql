-- Run this in Supabase → SQL Editor to remove unused columns
-- (safe if a column was never created)

alter table public.articles drop column if exists category;
alter table public.articles drop column if exists author_name;
alter table public.articles drop column if exists author_image_url;
