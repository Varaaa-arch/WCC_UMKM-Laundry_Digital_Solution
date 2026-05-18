-- 009_fix_order_number_race.sql
-- Fix race condition in generate_order_number by using advisory lock

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
  -- Acquire session-level advisory lock to prevent race condition
  perform pg_advisory_xact_lock(hashtext('generate_order_number'));

  loop
    select coalesce(max(substring(o.order_number from '([0-9]{4})$')::int), 0) + 1
    into v_seq
    from public.orders o
    where o.order_number like v_prefix || '%';

    v_candidate := v_prefix || lpad(v_seq::text, 4, '0');

    exit when not exists (
      select 1 from public.orders where order_number = v_candidate
    );

    v_seq := v_seq + 1;
  end loop;

  return v_candidate;
end;
$$;
