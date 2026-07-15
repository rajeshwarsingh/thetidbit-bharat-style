import { NextRequest, NextResponse } from 'next/server';
import { processTrackByMobileRequest } from '../../../server/track-by-mobile';

export const dynamic = 'force-dynamic';

async function handle(req: NextRequest) {
  const query: Record<string, string> = {};
  req.nextUrl.searchParams.forEach((v, k) => (query[k] = v));
  let body: any = undefined;
  if (req.method === 'POST') {
    try { body = await req.json(); } catch { body = undefined; }
  }
  const out = await processTrackByMobileRequest({ method: req.method, query, body });
  return NextResponse.json(out.json, { status: out.status, headers: out.headers });
}

export const GET = handle;
export const POST = handle;
