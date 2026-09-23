-- Run in Supabase SQL Editor on the same project as server/.env.
-- Never put the secret/service key in the React website.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
grant usage on schema public to authenticated;
grant select on public.admin_users to authenticated;
drop policy if exists "Read own admin membership" on public.admin_users;
create policy "Read own admin membership" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

-- SECURITY DEFINER checks membership without exposing the roster or bypassing RLS for the browser.
create or replace function public.is_concierge_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admin_users where user_id = (select auth.uid())); $$;
revoke all on function public.is_concierge_admin() from public, anon;
grant execute on function public.is_concierge_admin() to authenticated;

-- Keep RLS enabled: the guest backend uses its service role; only approved staff uses browser access.
do $$
declare t text;
begin
  foreach t in array array['conversations','messages','faqs','escalations'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('drop policy if exists "Concierge admins select" on public.%I', t);
    execute format('drop policy if exists "Concierge admins insert" on public.%I', t);
    execute format('drop policy if exists "Concierge admins update" on public.%I', t);
    execute format('drop policy if exists "Concierge admins delete" on public.%I', t);
    execute format('create policy "Concierge admins select" on public.%I for select to authenticated using ((select public.is_concierge_admin()))', t);
    execute format('create policy "Concierge admins insert" on public.%I for insert to authenticated with check ((select public.is_concierge_admin()))', t);
    execute format('create policy "Concierge admins update" on public.%I for update to authenticated using ((select public.is_concierge_admin())) with check ((select public.is_concierge_admin()))', t);
    execute format('create policy "Concierge admins delete" on public.%I for delete to authenticated using ((select public.is_concierge_admin()))', t);
  end loop;
end $$;

-- AFTER creating an email/password account under Supabase Authentication > Users,
-- run this separately with YOUR OWN email (replace the placeholder):
-- insert into public.admin_users(user_id)
-- select id from auth.users where email = 'YOUR_EMAIL@example.com'
-- on conflict (user_id) do nothing;
