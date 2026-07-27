-- Public unsubscribe helper (used by /api/unsubscribe)
-- Run in Supabase SQL Editor

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

-- Safer subscribe insert: no public SELECT needed
-- (keep insert policy; drop any public select policy if you added one for testing)
drop policy if exists "Anyone can read own subscribe result" on public.subscribers;

grant usage on schema public to anon, authenticated;
grant insert on public.subscribers to anon, authenticated;
grant select, delete on public.subscribers to authenticated;
