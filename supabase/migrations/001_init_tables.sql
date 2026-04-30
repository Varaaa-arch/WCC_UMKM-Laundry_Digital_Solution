-- 001_init_tables.sql
-- Core schema for Laundry Booking & Tracking System

create extension if not exists pgcrypto;

-- Enums
do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_type_enum') then
    create type public.order_type_enum as enum ('pickup', 'dropoff');
  end if;

  if not exists (select 1 from pg_type where typname = 'order_status_enum') then
    create type public.order_status_enum as enum (
      'pending',
      'picked_up',
      'washing',
      'finished',
      'ready_pickup',
      'delivered'
    );
  end if;
end $$;

-- 1) profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  phone text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2) services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price_per_kg numeric(12,2) not null check (price_per_kg >= 0),
  description text,
  duration text,
  created_at timestamptz not null default now()
);

-- 3) orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique, -- LND-YYYY-XXXX
  user_id uuid not null references public.profiles(id) on delete restrict,
  customer_name text not null,
  phone text not null,
  service_id uuid not null references public.services(id) on delete restrict,
  weight numeric(10,2) null check (weight is null or weight >= 0),
  order_type public.order_type_enum not null,
  address text,
  pickup_date date,
  total_price numeric(14,2) not null default 0 check (total_price >= 0),
  status public.order_status_enum not null default 'pending',
  is_paid boolean not null default false,
  created_at timestamptz not null default now()
);

-- 4) tracking_logs
create table if not exists public.tracking_logs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.order_status_enum not null,
  description text,
  created_at timestamptz not null default now()
);

-- 5) order_attachments
create table if not exists public.order_attachments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

-- Indexes (best practice)
create index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_service_id on public.orders(service_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_tracking_logs_order_id on public.tracking_logs(order_id);
create index if not exists idx_order_attachments_order_id on public.order_attachments(order_id);
