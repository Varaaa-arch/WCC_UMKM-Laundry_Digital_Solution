-- Fix: profiles table doesn't have email column but trigger tries to insert it.
-- Add email column if missing, then fix the trigger to not insert email.

alter table public.profiles
  add column if not exists email text not null default '';

-- Fix trigger to use the correct columns
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'User'),
    coalesce(new.email, ''),
    ''
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
