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

If your project already had the articles table, also run **`subscribers.sql`** (or re-run the subscribers section at the bottom of `schema.sql`).

## 4. Newsletter email (Resend)
Add to `.env.local`:

```env
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=The Hedge Collective <onboarding@resend.dev>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- Free Resend key: https://resend.com
- For production, verify your domain in Resend and set `EMAIL_FROM` to that domain
- Testing: `onboarding@resend.dev` can only send to your Resend account email

## 5. Create admin user
Authentication → Users → Add user (email + password).

## 6. Restart
```bash
npm run dev
```
Open http://localhost:3000/admin/login

## What gets stored
- title, slug, subtitle, number, category
- reading_time_minutes
- cover_image_url (upload)
- body blocks: heading | paragraph | quote | list | image
- status: draft | published
- subscribers emails (Perspectives briefing list)

## Admin
- Articles: `/admin`
- Subscribers: `/admin/subscribers`

## Public URLs
- List: `/perspectives`
- Article: `/perspectives/your-slug`
