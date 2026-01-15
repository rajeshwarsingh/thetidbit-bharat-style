import { solveTrackCourierPow } from '../utils/trackcourierPow.js';

const DEFAULT_TABLE_KEY = '99650a6b6645d880782ae9fd1d0d412a';

function normalizeDocIds(raw: unknown): string[] {
  const asString = typeof raw === 'string' ? raw : '';
  const asArray = Array.isArray(raw) ? raw : null;

  const fromArray =
    asArray?.map((v) => (typeof v === 'string' || typeof v === 'number' ? String(v) : '')).filter(Boolean) ?? [];

  const fromString = asString
    .split(/[\s,]+/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const merged = [...fromArray, ...fromString];
  const cleaned = merged.map((s) => s.replace(/[^\d]/g, '')).filter(Boolean);

  // de-dupe while keeping order
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of cleaned) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

function extractCookieHeader(setCookieHeader: string | null): string | undefined {
  if (!setCookieHeader) return undefined;

  // Vercel/Node fetch often collapses multiple Set-Cookie headers into one string.
  // We parse "name=value;" pairs and ignore attribute keys like Path/Expires/etc.
  const ignore = new Set([
    'path',
    'expires',
    'max-age',
    'domain',
    'samesite',
    'secure',
    'httponly',
    'priority',
  ]);

  const cookies = new Map<string, string>();
  const re = /(?:^|,)\s*([A-Za-z0-9_]+)=([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(setCookieHeader)) !== null) {
    const name = m[1];
    const value = m[2];
    if (ignore.has(name.toLowerCase())) continue;
    cookies.set(name, value);
  }

  if (cookies.size === 0) return undefined;
  return [...cookies.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}

async function getTableKey(params: {
  courierSlug: string;
  docId: string;
  cookieHeader?: string;
}): Promise<string> {
  const { courierSlug, docId, cookieHeader } = params;
  try {
    const url = `https://trackcourier.io/track-and-trace/${encodeURIComponent(courierSlug)}/${encodeURIComponent(
      docId
    )}`;
    const r = await fetch(url, {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
    });
    const html = await r.text();
    const match = html.match(/get_checkpoints_table\/([a-f0-9]{32})\//i);
    return match?.[1] ?? DEFAULT_TABLE_KEY;
  } catch {
    return DEFAULT_TABLE_KEY;
  }
}

async function fetchChallenge(): Promise<{ challenge: string; difficulty: number; cookieHeader?: string }> {
  const r = await fetch('https://trackcourier.io/get-challenge', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
    },
  });

  const cookieHeader = extractCookieHeader(r.headers.get('set-cookie'));
  const json = await r.json();

  return {
    challenge: String(json?.challenge ?? ''),
    difficulty: Number(json?.difficulty ?? 0),
    cookieHeader,
  };
}

async function fetchCheckpoints(params: {
  courierSlug: string;
  docId: string;
}): Promise<any> {
  const { courierSlug, docId } = params;

  const { challenge, difficulty, cookieHeader: cookieFromChallenge } = await fetchChallenge();
  if (!challenge || !Number.isFinite(difficulty) || difficulty <= 0) {
    throw new Error('Failed to obtain TrackCourier challenge');
  }

  const { nonce, hash } = await solveTrackCourierPow({ challenge, difficulty });
  const tableKey = await getTableKey({ courierSlug, docId, cookieHeader: cookieFromChallenge });

  const apiUrl = `https://trackcourier.io/api/v1/get_checkpoints_table/${tableKey}/${encodeURIComponent(
    courierSlug
  )}/${encodeURIComponent(docId)}`;

  const r = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json;charset=UTF-8',
      origin: 'https://trackcourier.io',
      referer: `https://trackcourier.io/track-and-trace/${encodeURIComponent(courierSlug)}/${encodeURIComponent(docId)}`,
      ...(cookieFromChallenge ? { cookie: cookieFromChallenge } : {}),
    },
    body: JSON.stringify({ challenge, nonce, hash }),
  });

  if (!r.ok) {
    const text = await r.text().catch(() => '');
    throw new Error(`TrackCourier API failed (${r.status}): ${text.slice(0, 300)}`);
  }

  return await r.json();
}

export async function trackDocIds(params: { courierSlug: string; docIds: string[] }) {
  const { courierSlug, docIds } = params;
  const results: Array<{ docId: string; ok: boolean; data?: any; error?: string }> = [];

  // Sequential to avoid excessive PoW + rate limits.
  for (const docId of docIds) {
    try {
      const data = await fetchCheckpoints({ courierSlug, docId });
      results.push({ docId, ok: true, data });
    } catch (e: any) {
      results.push({ docId, ok: false, error: String(e?.message ?? e) });
    }
  }

  return results;
}

export async function processTrackCourierRequest(req: {
  method?: string;
  query?: Record<string, any>;
  body?: any;
}): Promise<{ status: number; headers: Record<string, string>; json: any }> {
  const method = req.method ?? 'GET';

  if (method !== 'POST' && method !== 'GET') {
    return { status: 405, headers: {}, json: { error: 'Method not allowed' } };
  }

  const courierSlug =
    (typeof req.query?.courierSlug === 'string' && req.query.courierSlug) ||
    (typeof req.body?.courierSlug === 'string' && req.body.courierSlug) ||
    'anjani-courier';

  const docIds =
    method === 'GET'
      ? normalizeDocIds(req.query?.docId ?? req.query?.docIds ?? '')
      : normalizeDocIds(req.body?.docIds ?? req.body?.docId ?? '');

  if (docIds.length === 0) {
    return {
      status: 400,
      headers: {},
      json: { error: 'Provide docIds (string/array). Example: { "docIds": ["1698979542"] }' },
    };
  }

  if (docIds.length > 25) {
    return { status: 400, headers: {}, json: { error: 'Too many docIds. Limit is 25 per request.' } };
  }

  const results = await trackDocIds({ courierSlug, docIds });

  return {
    status: 200,
    headers: { 'cache-control': 'no-store' },
    json: { courierSlug, results },
  };
}

export default async function handler(req: any, res: any) {
  try {
    const out = await processTrackCourierRequest({
      method: req?.method,
      query: req?.query,
      body: req?.body,
    });
    for (const [k, v] of Object.entries(out.headers)) res.setHeader(k, v);
    res.status(out.status).json(out.json);
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message ?? e) });
  }
}