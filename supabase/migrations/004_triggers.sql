-- 004_triggers.sql
-- Trigger setup for order number generation and total_price calculation

-- 1) BEFORE INSERT: auto fill order_number
create or replace function public.trg_set_order_number()
returns trigger
language plpgsql
as $$
begin
  if new.order_number is null or btrim(new.order_number) = '' then
    new.order_number := public.generate_order_number();
  end if;
  return new;
end;
$$;

drop trigger if exists before_insert_set_order_number on public.orders;
create trigger before_insert_set_order_number
before insert on public.orders
for each row
execute function public.trg_set_order_number();

-- 2) AFTER UPDATE: when weight changes, recalculate total_price
create or replace function public.trg_after_update_recalculate_total_price()
returns trigger
language plpgsql
as $$
begin
  if new.weight is distinct from old.weight then
    perform public.recalculate_order_total_price(new.id);
  end if;

  return new;
end;
$$;

drop trigger if exists after_update_weight_recalculate_total on public.orders;
create trigger after_update_weight_recalculate_total
after update on public.orders
for each row
execute function public.trg_after_update_recalculate_total_price();

-- Optional: calculate total_price after insert too
create or replace function public.trg_after_insert_recalculate_total_price()
returns trigger
language plpgsql
as $$
begin
  perform public.recalculate_order_total_price(new.id);
  return new;
end;
$$;

drop trigger if exists after_insert_recalculate_total on public.orders;
create trigger after_insert_recalculate_total
after insert on public.orders
for each row
execute function public.trg_after_insert_recalculate_total_price();
