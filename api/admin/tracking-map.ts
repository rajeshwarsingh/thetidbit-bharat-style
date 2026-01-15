import { readTrackingMap, upsertTrackingMapEntry } from '../_trackingMapStore.js';

function getHeader(req: any, name: string): string {
  const headers = req?.headers ?? {};
  const target = name.toLowerCase();
  for (const [k, v] of Object.entries(headers)) {
    if (String(k).toLowerCase() !== target) continue;
    if (typeof v === 'string') return v;
    if (Array.isArray(v) && typeof v[0] === 'string') return v[0];
  }
  return '';
}

function getPassword(req: any): string {
  const fromHeader = getHeader(req, 'x-admin-password').trim();
  const fromQuery = (typeof req.query?.password === 'string' ? req.query.password : '').trim();
  const fromBody = (typeof req.body?.password === 'string' ? req.body.password : '').trim();

  const auth = getHeader(req, 'authorization');
  const fromBearer = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7).trim() : '';

  return fromHeader || fromBearer || fromQuery || fromBody || '';
}

function isAuthed(req: any): boolean {
  const expected = (process.env.TRACKING_ADMIN_PASSWORD || 'thetidbit2026').trim();
  return getPassword(req) === expected;
}

export async function processAdminTrackingMapRequest(req: {
  method?: string;
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, any>;
}): Promise<{ status: number; headers: Record<string, string>; json: any }> {
  const method = req.method ?? 'GET';

  const pw = getPassword(req);
  if (!pw) {
    return { status: 401, headers: { 'cache-control': 'no-store' }, json: { error: 'Missing password' } };
  }
  if (!isAuthed(req)) {
    return { status: 401, headers: { 'cache-control': 'no-store' }, json: { error: 'Unauthorized' } };
  }

  if (method === 'GET') {
    const map = await readTrackingMap();
    return { status: 200, headers: { 'cache-control': 'no-store' }, json: { map } };
  }

  if (method === 'POST') {
    const mobile = String(req.body?.mobile ?? '');
    const docIds = req.body?.docIds ?? req.body?.docId ?? '';
    const updated = await upsertTrackingMapEntry({ mobile, docIds });
    return { status: 200, headers: { 'cache-control': 'no-store' }, json: { ok: true, updated } };
  }

  return { status: 405, headers: { 'cache-control': 'no-store' }, json: { error: 'Method not allowed' } };
}

export default async function handler(req: any, res: any) {
  try {
    const out = await processAdminTrackingMapRequest({
      method: req?.method,
      query: req?.query,
      body: req?.body,
      headers: req?.headers,
    });
    for (const [k, v] of Object.entries(out.headers)) res.setHeader(k, v);
    res.status(out.status).json(out.json);
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message ?? e) });
  }
}


