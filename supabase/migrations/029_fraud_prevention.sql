-- Migration 029: Fraud Prevention Agent infrastructure
-- Adds fraud_assessments table for risk-scoring evidence submissions.
-- Every submission gets a risk assessment before reward release (Ubuntu C6).

create table if not exists public.fraud_assessments (
  id                  uuid        primary key default gen_random_uuid(),
  submission_id       text        not null,                   -- references outcome_validations or evidence ID
  mission_id          uuid        references public.missions(id) on delete set null,
  participant_id      uuid        references public.user_profiles(id) on delete set null,
  evidence_type       text        not null check (evidence_type in ('gps', 'image', 'video', 'knowledge', 'peer')),
  risk_score          integer     not null check (risk_score between 0 and 100),
  risk_level          text        not null check (risk_level in ('low', 'medium', 'high', 'critical')),
  fraud_signals       jsonb       not null default '[]',       -- Array<{signal, severity, evidence}>
  detection_types     text[]      not null default '{}',       -- gps_spoofing | synthetic_media | duplicate_submission | collusion | bot_behavior | velocity_attack
  recommendation      text        not null check (recommendation in ('approve', 'flag_for_review', 'reject', 'escalate')),
  reasoning           text        not null,
  collusion_suspects  text[]      not null default '{}',       -- specific participant IDs, not broad brush
  requires_human_review boolean   not null default false,
  attribution_protected boolean   not null default true,       -- C6: individual attribution always retained
  -- Human review tracking
  reviewed_by         uuid        references public.user_profiles(id) on delete set null,
  review_decision     text        check (review_decision in ('confirmed_fraud', 'cleared', 'escalated')),
  review_notes        text,
  reviewed_at         timestamptz,
  -- Provenance
  agent_version       text        not null default 'fraud-prevention-v1',
  created_at          timestamptz not null default now()
);

-- Indexes for query patterns used by escrow release logic and admin review
create index if not exists fraud_assessments_mission_id_idx    on public.fraud_assessments (mission_id);
create index if not exists fraud_assessments_participant_id_idx on public.fraud_assessments (participant_id);
create index if not exists fraud_assessments_risk_level_idx    on public.fraud_assessments (risk_level);
create index if not exists fraud_assessments_needs_review_idx  on public.fraud_assessments (requires_human_review) where requires_human_review = true;
create index if not exists fraud_assessments_recommendation_idx on public.fraud_assessments (recommendation);

-- RLS: tenant_admins can read assessments for their missions; platform_admin can read all
alter table public.fraud_assessments enable row level security;

create policy "platform_admin_all" on public.fraud_assessments
  for all
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'platform_admin'
    )
  );

create policy "tenant_admin_own_missions" on public.fraud_assessments
  for select
  using (
    exists (
      select 1 from public.missions m
      join public.user_profiles up on up.tenant_id = m.tenant_id
      where m.id = fraud_assessments.mission_id
        and up.id = auth.uid()
        and up.role in ('tenant_admin', 'mission_creator')
    )
  );

-- View: pending human reviews (used by Mission Control governance dashboard)
create or replace view public.fraud_pending_reviews as
  select
    fa.id,
    fa.submission_id,
    fa.mission_id,
    fa.participant_id,
    fa.evidence_type,
    fa.risk_score,
    fa.risk_level,
    fa.recommendation,
    fa.reasoning,
    fa.collusion_suspects,
    fa.attribution_protected,
    fa.created_at,
    m.title as mission_title,
    up.display_name as participant_name
  from public.fraud_assessments fa
  left join public.missions m on m.id = fa.mission_id
  left join public.user_profiles up on up.id = fa.participant_id
  where fa.requires_human_review = true
    and fa.review_decision is null
  order by fa.risk_score desc, fa.created_at asc;
