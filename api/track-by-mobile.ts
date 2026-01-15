import { readTrackingMap } from './_trackingMapStore.js';
import { trackDocIds } from './trackcourier.js';

function normalizeMobile(mobile: string): string {
  const digits = mobile.replace(/[^\d]/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

export async function processTrackByMobileRequest(req: {
  method?: string;
  query?: Record<string, any>;
  body?: any;
}): Promise<{ status: number; headers: Record<string, string>; json: any }> {
  const method = req.method ?? 'GET';
  if (method !== 'POST' && method !== 'GET') {
    return { status: 405, headers: { 'cache-control': 'no-store' }, json: { error: 'Method not allowed' } };
  }

  const mobileRaw =
    method === 'GET' ? String(req.query?.mobile ?? '') : String(req.body?.mobile ?? req.body?.phone ?? '');
  const mobile = normalizeMobile(mobileRaw);
  if (!mobile || mobile.length < 10) {
    return { status: 400, headers: { 'cache-control': 'no-store' }, json: { error: 'Provide a valid mobile number' } };
  }

  const map = await readTrackingMap();
  const docIds = map[mobile] ?? [];
  if (docIds.length === 0) {
    return {
      status: 404,
      headers: { 'cache-control': 'no-store' },
      json: { error: 'No tracking found for this mobile number. Please contact support.' },
    };
  }

  const courierSlug =
    (typeof req.query?.courierSlug === 'string' && req.query.courierSlug) ||
    (typeof req.body?.courierSlug === 'string' && req.body.courierSlug) ||
    'anjani-courier';

  const results = await trackDocIds({ courierSlug, docIds });

  // Do not expose docIds mapping; just return results.
  return { status: 200, headers: { 'cache-control': 'no-store' }, json: { mobile, courierSlug, results } };
}

export default async function handler(req: any, res: any) {
  try {
    const out = await processTrackByMobileRequest({ method: req?.method, query: req?.query, body: req?.body });
    for (const [k, v] of Object.entries(out.headers)) res.setHeader(k, v);
    res.status(out.status).json(out.json);
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message ?? e) });
  }
}


