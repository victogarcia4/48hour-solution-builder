alter table if exists public.funnel_leads
  add column if not exists logo_status text,
  add column if not exists brand_colors text,
  add column if not exists images_availability text[],
  add column if not exists content_status text,
  add column if not exists domain_status text,
  add column if not exists launch_timeline text,
  add column if not exists budget_range text,
  add column if not exists add_ons text[],
  add column if not exists preferred_next_step text,
  add column if not exists phone text,
  add column if not exists current_website text;

comment on column public.funnel_leads.specific_details is
  'Structured full funnel payload. New dedicated columns can be backfilled from this JSON as needed.';
