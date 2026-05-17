-- 007_add_slug_and_extras.sql
-- Add slug + image_url to services, note + pickup_time to orders

-- services: slug (generated from name), image_url
alter table public.services
  add column if not exists slug text,
  add column if not exists image_url text;

-- Backfill slug from name: lowercase, spaces → hyphens, strip non-alphanumeric
update public.services
set slug = regexp_replace(lower(trim(name)), '[^a-z0-9]+', '-', 'g')
where slug is null;

-- Now enforce not null + unique
alter table public.services
  alter column slug set not null;

create unique index if not exists idx_services_slug on public.services(slug);

-- orders: note, pickup_time
alter table public.orders
  add column if not exists note text,
  add column if not exists pickup_time text;
