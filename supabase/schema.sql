create extension if not exists pgcrypto;

create table if not exists public.studio_content (
  key text primary key check (key in ('projects', 'services', 'packages', 'faqs', 'website')),
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved'))
);

alter table public.studio_content enable row level security;
alter table public.contact_enquiries enable row level security;

drop policy if exists "Public can read published studio content" on public.studio_content;
create policy "Public can read published studio content"
  on public.studio_content for select to anon, authenticated using (true);

drop policy if exists "Studio admins manage studio content" on public.studio_content;
create policy "Studio admins manage studio content"
  on public.studio_content for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'studio_admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'studio_admin');

drop policy if exists "Visitors can submit enquiries" on public.contact_enquiries;
create policy "Visitors can submit enquiries"
  on public.contact_enquiries for insert to anon, authenticated
  with check (status = 'new');

drop policy if exists "Studio admins read enquiries" on public.contact_enquiries;
create policy "Studio admins read enquiries"
  on public.contact_enquiries for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'studio_admin');

drop policy if exists "Studio admins update enquiries" on public.contact_enquiries;
create policy "Studio admins update enquiries"
  on public.contact_enquiries for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'studio_admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'studio_admin');

grant select on public.studio_content to anon, authenticated;
grant insert, update, delete on public.studio_content to authenticated;
grant insert on public.contact_enquiries to anon, authenticated;
grant select, update on public.contact_enquiries to authenticated;
