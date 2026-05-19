alter table if exists public.funnel_leads enable row level security;

drop policy if exists "Enable update for everyone" on public.funnel_leads;
create policy "Enable update for everyone"
  on public.funnel_leads
  for update
  using (true)
  with check (true);

drop policy if exists "Enable delete for everyone" on public.funnel_leads;
create policy "Enable delete for everyone"
  on public.funnel_leads
  for delete
  using (true);
