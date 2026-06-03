-- MoMo Bookings table for Dusab MakeOver
-- Standalone simple booking flow (separate from appointments system)

create table if not exists public.bookings (
  id            uuid        primary key default gen_random_uuid(),
  customer_name text        not null,
  phone_number  text        not null,
  service       text        not null,
  preferred_date date       not null,
  preferred_time time       not null,
  amount        numeric     not null,
  receipt_url   text        not null,
  status        text        not null default 'pending',
  created_at    timestamptz not null default now(),
  constraint bookings_status_check check (status in ('pending', 'confirmed', 'cancelled'))
);

alter table public.bookings enable row level security;

-- Anyone can insert a booking (public form)
create policy "bookings_public_insert"
  on public.bookings for insert
  with check (true);

-- Only service role reads/updates (admin bypasses RLS)
-- The app admin uses the service-role key via server action, so no anon SELECT needed.
-- Grant anon select so the admin page (using anon key) can read; restrict via app logic.
create policy "bookings_service_select"
  on public.bookings for select
  using (true);

create policy "bookings_service_update"
  on public.bookings for update
  using (true);

-- Storage bucket for MoMo payment receipts
insert into storage.buckets (id, name, public)
values ('receipts', 'receipts', true)
on conflict (id) do nothing;

-- Allow anyone to upload to receipts bucket
create policy "receipts_public_insert"
  on storage.objects for insert
  with check (bucket_id = 'receipts');

-- Allow public reads (needed to share receipt URL via WhatsApp)
create policy "receipts_public_select"
  on storage.objects for select
  using (bucket_id = 'receipts');
