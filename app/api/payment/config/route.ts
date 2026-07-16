import { NextRequest, NextResponse } from 'next/server';
import { getPaymentMeta } from '../../../../lib/payments';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public payment UI hints (no secrets). */
export async function GET(_req: NextRequest) {
  const meta = getPaymentMeta();
  return NextResponse.json({
    provider: meta.provider,
    mode: meta.mode,
    label: meta.label,
  });
}
