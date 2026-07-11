import { NextRequest, NextResponse } from 'next/server';
import { checkStatus } from '../../../../lib/phonepe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handle(req: NextRequest) {
  const txn = req.nextUrl.searchParams.get('txn');
  if (!txn) {
    return NextResponse.json({ state: 'UNKNOWN', error: 'Missing transaction id.' }, { status: 400 });
  }
  const result = await checkStatus(txn);
  return NextResponse.json({ txn, ...result });
}

export const GET = handle;
// PhonePe server-to-server callback also hits this endpoint.
export const POST = handle;
