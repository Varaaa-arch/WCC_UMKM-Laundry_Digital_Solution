-- 003_rls.sql
-- RLS policies for user/admin access control

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.tracking_logs enable row level security;
alter table public.order_attachments enable row level security;

-- public.is_admin() is created in 002_functions.sql

-- =========================
-- PROFILES
-- =========================
drop policy if exists profiles_select_own_or_admin on public.profiles;
create policy profiles_select_own_or_admin
on public.profiles
for select
using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_insert_own_or_admin on public.profiles;
create policy profiles_insert_own_or_admin
on public.profiles
for insert
with check (id = auth.uid() or public.is_admin());

drop policy if exists profiles_update_own_or_admin on public.profiles;
create policy profiles_update_own_or_admin
on public.profiles
for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

-- =========================
-- SERVICES
-- =========================
drop policy if exists services_select_all_authenticated on public.services;
drop policy if exists services_select_public on public.services;
create policy services_select_public
on public.services
for select
using (true);

drop policy if exists services_insert_admin_only on public.services;
create policy services_insert_admin_only
on public.services
for insert
with check (public.is_admin());

drop policy if exists services_update_admin_only on public.services;
create policy services_update_admin_only
on public.services
for update
using (public.is_admin())
with check (public.is_admin());

-- =========================
-- ORDERS
-- User:
-- - SELECT own orders
-- - INSERT own orders
-- Admin:
-- - access all data
-- - UPDATE orders
-- =========================
drop policy if exists orders_select_own_or_admin on public.orders;
create policy orders_select_own_or_admin
on public.orders
for select
using (user_id = auth.uid() or public.is_admin());

drop policy if exists orders_insert_own_or_admin on public.orders;
create policy orders_insert_own_or_admin
on public.orders
for insert
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists orders_update_admin_only on public.orders;
create policy orders_update_admin_only
on public.orders
for update
using (public.is_admin())
with check (public.is_admin());

-- =========================
-- TRACKING LOGS
-- User can view logs for own orders, admin can view all.
-- Insert/update restricted to admin.
-- =========================
drop policy if exists tracking_logs_select_related_order_or_admin on public.tracking_logs;
create policy tracking_logs_select_related_order_or_admin
on public.tracking_logs
for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.orders o
    where o.id = tracking_logs.order_id
      and o.user_id = auth.uid()
  )
);

drop policy if exists tracking_logs_insert_admin_only on public.tracking_logs;
create policy tracking_logs_insert_admin_only
on public.tracking_logs
for insert
with check (public.is_admin());

drop policy if exists tracking_logs_update_admin_only on public.tracking_logs;
create policy tracking_logs_update_admin_only
on public.tracking_logs
for update
using (public.is_admin())
with check (public.is_admin());

-- =========================
-- ORDER ATTACHMENTS
-- User can view attachments for own orders, admin can manage all.
-- =========================
drop policy if exists order_attachments_select_related_order_or_admin on public.order_attachments;
create policy order_attachments_select_related_order_or_admin
on public.order_attachments
for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.orders o
    where o.id = order_attachments.order_id
      and o.user_id = auth.uid()
  )
);

drop policy if exists order_attachments_insert_admin_only on public.order_attachments;
create policy order_attachments_insert_admin_only
on public.order_attachments
for insert
with check (public.is_admin());

drop policy if exists order_attachments_update_admin_only on public.order_attachments;
create policy order_attachments_update_admin_only
on public.order_attachments
for update
using (public.is_admin())
with check (public.is_admin());
