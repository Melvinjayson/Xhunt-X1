-- Migration 028: Clerk-first profile provisioning and enterprise auth bridge.
-- Clerk is the canonical auth provider. user_profiles must be creatable from
-- Clerk webhooks without a matching Supabase Auth user row.

ALTER TABLE public.user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

ALTER TABLE public.user_profiles
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS email text;

CREATE INDEX IF NOT EXISTS user_profiles_tenant_role_idx
  ON public.user_profiles (tenant_id, role);

CREATE INDEX IF NOT EXISTS user_profiles_default_surface_idx
  ON public.user_profiles (default_surface);
