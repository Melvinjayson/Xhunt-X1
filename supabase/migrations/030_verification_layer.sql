-- 030_verification_layer.sql
-- Evidence & Verification-by-Design layer.
-- Extends outcome_validations (010) with integrity signals, derived risk/confidence,
-- and an append-only provenance trail. Adds design-time verification specs and a
-- cross-submission evidence fingerprint index for duplicate detection.

-- ── enums ──────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE routing_tier AS ENUM (
    'auto_approved',
    'human_review',
    'auto_rejected',
    'escalated'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── extend outcome_validations ─────────────────────────────────────────────────
ALTER TABLE public.outcome_validations
  ADD COLUMN IF NOT EXISTS risk_score           numeric(5,2) CHECK (risk_score >= 0 AND risk_score <= 100),
  ADD COLUMN IF NOT EXISTS evidence_source_tier int          CHECK (evidence_source_tier BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS routing_tier         routing_tier,
  ADD COLUMN IF NOT EXISTS integrity_signals    jsonb        NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS provenance           jsonb        NOT NULL DEFAULT '[]';

COMMENT ON COLUMN public.outcome_validations.risk_score           IS '0-100, inverse of confidence; emitted by the Fraud Prevention agent';
COMMENT ON COLUMN public.outcome_validations.evidence_source_tier IS '1=system-of-record ... 5=self-attestation (Evidence Source Hierarchy)';
COMMENT ON COLUMN public.outcome_validations.integrity_signals    IS 'array of {signal, value, weight, flag}';
COMMENT ON COLUMN public.outcome_validations.provenance           IS 'append-only audit log: signals fired, model versions, reviewer actions, timestamps';

-- ── design-time: one verification spec per mission ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.mission_verification_specs (
  id                      uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id               uuid         NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  mission_id              uuid         NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  required_evidence_types text[]       NOT NULL DEFAULT '{}',
  min_source_tier         int          NOT NULL DEFAULT 4 CHECK (min_source_tier BETWEEN 1 AND 5),
  requires_peer_quorum    int          NOT NULL DEFAULT 0 CHECK (requires_peer_quorum >= 0),
  auto_approve_threshold  numeric(5,2) NOT NULL DEFAULT 30 CHECK (auto_approve_threshold BETWEEN 0 AND 100),
  human_review_threshold  numeric(5,2) NOT NULL DEFAULT 70 CHECK (human_review_threshold BETWEEN 0 AND 100),
  friction_estimate       text         CHECK (friction_estimate IN ('low','medium','high')),
  residual_risk           text,
  rationale               text,
  created_at              timestamptz  NOT NULL DEFAULT now(),
  updated_at              timestamptz  NOT NULL DEFAULT now(),
  UNIQUE (mission_id)
);

CREATE INDEX IF NOT EXISTS idx_mvs_tenant  ON public.mission_verification_specs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mvs_mission ON public.mission_verification_specs(mission_id);

-- ── cross-submission duplicate detection ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.evidence_fingerprints (
  id                       uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id                uuid        NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  fingerprint              text        NOT NULL,
  evidence_type            text        NOT NULL,
  first_seen_validation_id uuid        REFERENCES public.outcome_validations(id) ON DELETE SET NULL,
  seen_count               int         NOT NULL DEFAULT 1,
  created_at               timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, fingerprint, evidence_type)
);

CREATE INDEX IF NOT EXISTS idx_evfp_tenant ON public.evidence_fingerprints(tenant_id);
CREATE INDEX IF NOT EXISTS idx_evfp_fp     ON public.evidence_fingerprints(fingerprint);

-- ── RLS ────────────────────────────────────────────────────────────────────────
ALTER TABLE public.mission_verification_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_fingerprints      ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "tenant_members_verification_specs"
    ON public.mission_verification_specs FOR ALL
    USING (tenant_id IN (SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "tenant_members_evidence_fingerprints"
    ON public.evidence_fingerprints FOR ALL
    USING (tenant_id IN (SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── updated_at triggers ────────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS mvs_updated_at ON public.mission_verification_specs;
CREATE TRIGGER mvs_updated_at
  BEFORE UPDATE ON public.mission_verification_specs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── comments ───────────────────────────────────────────────────────────────────
COMMENT ON TABLE public.mission_verification_specs IS 'Design-time output of the Verification Engine (DESIGN mode). One per mission.';
COMMENT ON TABLE public.evidence_fingerprints      IS 'Index for cross-submission duplicate detection (VALIDATE mode, dedup signal).';
