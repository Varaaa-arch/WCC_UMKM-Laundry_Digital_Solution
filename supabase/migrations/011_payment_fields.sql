-- 011_payment_fields.sql
-- Payment method & status for orders

alter table public.orders
  add column if not exists payment_method text,
  add column if not exists payment_status text not null default 'pending';

comment on column public.orders.payment_method is 'cod | qris';
comment on column public.orders.payment_status is 'pending | processing | success | failed';
