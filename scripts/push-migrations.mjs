// Push pending Supabase migrations via the Management API.
// Usage: node scripts/push-migrations.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
if (!TOKEN) { console.error('Set SUPABASE_ACCESS_TOKEN env var first'); process.exit(1); }
const REF = process.env.SUPABASE_PROJECT_REF ?? 'nbeibgtspxchcsgplsxc';
const API_URL = `https://api.supabase.com/v1/projects/${REF}/database/query`;

const __dir  = dirname(fileURLToPath(import.meta.url));
const migsDir = join(__dir, '..', 'supabase', 'migrations');

const PENDING = [
  // 027 first: adds clerk_user_id + default_surface that 022/024/025/026/028 depend on
  '027_clerk_bridge.sql',
  '022_contribution_ledger.sql',
  '023_trust_graph.sql',
  '024_portable_identity.sql',
  '025_opportunity_matching.sql',
  '026_xil_agent_foundry.sql',
  '028_clerk_enterprise_auth.sql',
];

async function applyMigration(filename) {
  const sql  = readFileSync(join(migsDir, filename), 'utf8');
  const body = JSON.stringify({ query: sql });

  const res = await fetch(API_URL, {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type':  'application/json',
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

let passed = 0, failed = 0;

for (const f of PENDING) {
  process.stdout.write(`Applying ${f} ... `);
  try {
    await applyMigration(f);
    console.log('OK');
    passed++;
  } catch (err) {
    const msg = err.message ?? String(err);
    // NOTICE-level errors (duplicate table/policy/etc.) are non-fatal
    if (msg.includes('already exists') || msg.includes('42P07') || msg.includes('42710')) {
      console.log('SKIPPED (already applied)');
      passed++;
    } else {
      console.error(`FAILED: ${msg}`);
      failed++;
    }
  }
}

console.log(`\n${passed} applied, ${failed} failed.`);
if (failed > 0) process.exit(1);
