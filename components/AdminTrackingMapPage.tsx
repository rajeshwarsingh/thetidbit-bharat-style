import React, { useState } from 'react';
import SEO from './SEO';

const AdminTrackingMapPage: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [docIds, setDocIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setLoading(true);
    try {
      const password = typeof window !== 'undefined' ? window.sessionStorage.getItem('bs_admin_tracking_pw') : null;
      if (!password) throw new Error('Missing admin session. Please refresh and enter password again.');
      const r = await fetch('/api/admin/tracking-map', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-admin-password': password },
        // send password in body too (some environments strip custom headers)
        body: JSON.stringify({ password, mobile, docIds }),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json?.error || `Request failed (${r.status})`);
      setMsg(`Saved mapping for ${json?.updated?.mobile}`);
      setMobile('');
      setDocIds('');
    } catch (e: any) {
      setErr(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50">
      <SEO
        title="Admin - Tracking Map"
        description="Admin tool to map mobile numbers to tracking doc IDs."
        canonicalUrl="https://bharat.style/ops/tracking"
        noindex
        nofollow
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Admin: Tracking map</h1>
          <p className="mt-2 text-stone-600 text-sm">
            Map a customer mobile number to one or more courier tracking doc IDs.
          </p>

          <form onSubmit={onSave} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-900">Customer mobile</label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3"
                placeholder="10-digit mobile"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-900">Doc IDs / Tracking numbers</label>
              <textarea
                value={docIds}
                onChange={(e) => setDocIds(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3"
                placeholder="Example:\n1698979542\n1698979543"
              />
              <p className="mt-1 text-xs text-stone-500">Comma or newline separated.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto rounded-xl bg-stone-900 text-white px-5 py-3 font-bold hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Saving…' : 'Save mapping'}
            </button>

            {msg ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 text-sm">
                {msg}
              </div>
            ) : null}
            {err ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
                {err}
              </div>
            ) : null}
          </form>

          <div className="mt-6 text-xs text-stone-500">
            Note: updating the JSON file works in local/dev. On Vercel production, filesystem is read-only (use KV/DB, or
            commit the JSON to git).
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTrackingMapPage;


