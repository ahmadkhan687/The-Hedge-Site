# Connect Supabase (required for admin save/publish)

## 1. Create project
https://supabase.com → New project

## 2. Add keys to `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
Copy from Supabase → Project Settings → API.

## 3. Create tables + storage
Supabase → SQL Editor → New query → paste and run **`schema.sql`**.

## 4. If table already exists — drop unused columns
Run **`drop-unused-columns.sql`**:

```sql
alter table public.articles drop column if exists category;
alter table public.articles drop column if exists author_name;
alter table public.articles drop column if exists author_image_url;
```

## 5. Create admin user
Authentication → Users → Add user (email + password).

## 6. Restart
```bash
npm run dev
```
Open http://localhost:3000/admin/login

## What gets stored
- title, slug, subtitle, number
- reading_time_minutes
- cover_image_url (upload)
- body blocks: heading | paragraph | quote | list | image
- status: draft | published

## Public URLs
- List: `/perspectives`
- Article: `/perspectives/your-slug`
