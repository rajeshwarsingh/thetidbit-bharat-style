import { NextRequest, NextResponse } from 'next/server';
import { processAdminTrackingMapRequest } from '../../../../api/admin/tracking-map';

export const dynamic = 'force-dynamic';

async function handle(req: NextRequest) {
  const query: Record<string, string> = {};
  req.nextUrl.searchParams.forEach((v, k) => (query[k] = v));
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => (headers[k] = v));
  let body: any = undefined;
  if (req.method === 'POST') {
    try { body = await req.json(); } catch { body = undefined; }
  }
  const out = await processAdminTrackingMapRequest({ method: req.method, query, body, headers });
  return NextResponse.json(out.json, { status: out.status, headers: out.headers });
}

export const GET = handle;
export const POST = handle;
