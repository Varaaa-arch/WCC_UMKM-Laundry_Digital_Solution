-- 005_storage_policies.sql
-- Supabase Storage setup: laundry bucket + access policies

-- Create bucket (private bucket recommended)
insert into storage.buckets (id, name, public)
values ('laundry', 'laundry', false)
on conflict (id) do nothing;

-- Clean up old policies if re-running
drop policy if exists laundry_read_own_or_admin on storage.objects;
drop policy if exists laundry_upload_admin_only on storage.objects;
drop policy if exists laundry_update_admin_only on storage.objects;
drop policy if exists laundry_delete_admin_only on storage.objects;

-- READ: admin can read all, user can read files under their own order folder
create policy laundry_read_own_or_admin
on storage.objects
for select
to authenticated
using (
  bucket_id = 'laundry'
  and (
    public.is_admin()
    or exists (
      select 1
      from public.orders o
      where o.user_id = auth.uid()
        and name like ('orders/' || o.id::text || '/%')
    )
  )
);

-- INSERT: admin only (before/after proof uploaded by admin workflow)
create policy laundry_upload_admin_only
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'laundry'
  and public.is_admin()
);

-- UPDATE: admin only
create policy laundry_update_admin_only
on storage.objects
for update
to authenticated
using (
  bucket_id = 'laundry'
  and public.is_admin()
)
with check (
  bucket_id = 'laundry'
  and public.is_admin()
);

-- DELETE: admin only
create policy laundry_delete_admin_only
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'laundry'
  and public.is_admin()
);

-- Recommended path convention:
-- orders/{order_id}/before/{filename}
-- orders/{order_id}/after/{filename}
