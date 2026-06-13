<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Consolidation Decisions — enforced from 2026-06-12

These decisions are locked. Do not regress them.

## Decision 1: Single B2B Surface

`/admin` is for **platform-level operations only**: tenant management and platform_admin user controls.
Everything else (missions, outcomes, revenue, escrow, agents, XIL, economy, governance, analytics, rewards, knowledge graph) lives **exclusively in `/workspace`** with role-gated visibility.
Do not add new admin pages for features that have workspace equivalents.

## Decision 2: Design Token Authority

**MUI theme (`src/theme/`) is the single source of truth** for color, typography, spacing, shadow, and radius.
- Use `t.*` tokens from `@/theme/colors` in components: `t.accent`, `t.ai`, `t.txt`, `t.surface`, etc.
- Tailwind is for **layout utilities only** (flex, grid, padding, margin, width, responsive breakpoints).
- **Never hardcode hex values** in `src/app/` or `src/components/`. CI blocks new violations.
- Token map: `#22FFAA` → `t.accent`, `#6D5DFD` → `t.ai`, `#050816` → `t.bg`, `#07101F` → `t.surface`, `#0A1226` → `t.card`, `#F0F4FF` → `t.txt`, `#8B9CC0` → `t.txtDim`, `#4A5578` → `t.txtFaint`, `#FF5C7A` → `t.error`, `#FFB84D` → `t.warning`

## Decision 3: Auth — OVERRIDDEN 2026-06-13

**Current state: preview build, no auth provider.**
- Clerk was removed. `src/proxy.ts` is a passthrough no-op. All routes are open.
- API routes use `clerkId = 'preview-user'` stub. `src/lib/auth/profile.ts` returns a mock user.
- `clerk_user_id` column remains in the DB schema — migrations were not dropped.
- Auth panels (`src/components/auth/auth-panels.tsx`) show bypass buttons.
- When reinstating auth: restore the files listed in `memory/project_clerk_removal.md`.

## Agent Rules

- Read `node_modules/next/dist/docs/` before using any Next.js API.
- Workspace sidebar max 8 visible items per tier (see `src/lib/features.ts` for tier definitions).
- Admin sidebar max 4 items: Overview, Tenants, Users, Settings.
- Consumer BottomNav: exactly 5 items in PRIMARY_NAV (Home, Explore, Missions, Messages, Profile). No secondary nav in mobile bar.
- All new API routes must validate env vars using `src/lib/env.ts`.
- All agent invocations in XIL must go through `src/lib/xil/orchestrator.ts`.
