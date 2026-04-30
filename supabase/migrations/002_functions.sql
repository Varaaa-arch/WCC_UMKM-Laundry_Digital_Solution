-- 002_functions.sql
-- Business functions and helper functions

-- Admin checker used by RLS
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.is_admin = true
  );
$$;

-- Generate unique human-readable order number: LND-YYYY-XXXX
create or replace function public.generate_order_number()
returns text
language plpgsql
as $$
declare
  v_year text := to_char(now(), 'YYYY');
  v_prefix text := 'LND-' || v_year || '-';
  v_seq integer;
  v_candidate text;
begin
  loop
    -- sequential by current max suffix in same year (+1)
    select coalesce(max(substring(o.order_number from '([0-9]{4})$')::int), 0) + 1
    into v_seq
    from public.orders o
    where o.order_number like v_prefix || '%';

    v_candidate := v_prefix || lpad(v_seq::text, 4, '0');

    exit when not exists (
      select 1 from public.orders where order_number = v_candidate
    );

    -- fallback guard in rare race condition
    v_seq := v_seq + 1;
    v_candidate := v_prefix || lpad(v_seq::text, 4, '0');
    exit when not exists (
      select 1 from public.orders where order_number = v_candidate
    );
  end loop;

  return v_candidate;
end;
$$;

-- Recalculate total_price based on current service price and order weight
create or replace function public.recalculate_order_total_price(p_order_id uuid)
returns void
language plpgsql
as $$
declare
  v_weight numeric(10,2);
  v_service_id uuid;
  v_price_per_kg numeric(12,2);
begin
  select o.weight, o.service_id
    into v_weight, v_service_id
  from public.orders o
  where o.id = p_order_id;

  if v_weight is null then
    update public.orders
    set total_price = 0
    where id = p_order_id;
    return;
  end if;

  select s.price_per_kg
    into v_price_per_kg
  from public.services s
  where s.id = v_service_id;

  if v_price_per_kg is null then
    raise exception 'Service not found for order %', p_order_id;
  end if;

  update public.orders
  set total_price = round((v_weight * v_price_per_kg)::numeric, 2)
  where id = p_order_id;
end;
$$;
