import { NextResponse } from 'next/server';

// Clerk removed — preview build. Webhook endpoint is a no-op.
export async function POST() {
  return NextResponse.json({ ok: true });
}
