-- -----------------------------------------------------------------------------
-- Reviews: store the reviewer's display name at submission time.
-- `profiles` is not publicly readable (RLS restricts SELECT to the owner or
-- staff/admin), so the public homepage cannot join reviews -> profiles to show
-- a name. Snapshotting the name on the review avoids widening profile access.
-- -----------------------------------------------------------------------------

ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS customer_name TEXT;
