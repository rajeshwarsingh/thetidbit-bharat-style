'use client';
import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  Sparkles,
  Truck,
  ShoppingBag,
  Star,
  Instagram,
  ExternalLink,
  ArrowRight,
  Share2,
  Users,
} from 'lucide-react';
import { Link } from '@/lib/router';
import SEO from './SEO';
import { WHATSAPP_NUMBER, PRODUCT, INSTAGRAM_HANDLE, REVIEWS, AMAZON_STORE_URL } from '../constants';
import { cloudinaryTransform, cloudinarySrcSet } from '../utils/cloudinary';

type TrackCourierCheckpoint = {
  Time?: string;
  Date?: string;
  Location?: string;
  Activity?: string;
  CourierName?: string;
  CheckpointState?: string;
};

type TrackCourierResponse = {
  Result?: string;
  TrackingNumber?: string;
  MostRecentStatus?: string;
  ShipmentState?: string;
  CourierSlug?: string;
  Checkpoints?: TrackCourierCheckpoint[];
  AdditionalInfo?: string;
};

type ApiResultItem =
  | { docId: string; ok: true; data: TrackCourierResponse }
  | { docId: string; ok: false; error: string };

function normalizeMobile(input: string): string {
  const digits = input.replace(/[^\d]/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

function statusTone(statusRaw?: string) {
  const s = (statusRaw || '').toLowerCase();
  if (!s) return { label: 'Update available', tone: 'neutral' as const };
  if (s.includes('deliver')) return { label: statusRaw!, tone: 'success' as const };
  if (s.includes('out for delivery')) return { label: statusRaw!, tone: 'success' as const };
  if (s.includes('in transit') || s.includes('dispatch') || s.includes('shipped')) return { label: statusRaw!, tone: 'progress' as const };
  if (s.includes('failed') || s.includes('return') || s.includes('rto') || s.includes('cancel')) return { label: statusRaw!, tone: 'danger' as const };
  return { label: statusRaw!, tone: 'neutral' as const };
}

function formatCheckpointTitle(c: TrackCourierCheckpoint) {
  const activity = (c.Activity || '').trim();
  const state = (c.CheckpointState || '').trim();
  if (activity && state && activity.toLowerCase() !== state.toLowerCase()) return `${activity} • ${state}`;
  return activity || state || 'Update';
}

const TrackPage: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ApiResultItem[] | null>(null);

  const heroImage = 'https://res.cloudinary.com/thetidbit23024/image/upload/v1766823240/ChatGPT_Image_Dec_27_2025_01_43_41_PM_ledlfa.png';
  const shareImage = 'https://res.cloudinary.com/thetidbit23024/image/upload/v1766824107/ChatGPT_Image_Dec_27_2025_01_58_14_PM_jlerff.png';
  const shopImage = 'https://res.cloudinary.com/thetidbit23024/image/upload/v1766825911/exicting_tidbi_girl_p7zicn.png';

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://thetidbit.in/';
    const shareText = `Check out this beautiful handmade jute sling bag from TheTidbit! ✨ Eco-friendly, artistic, and perfect for everyday use.`;
    const nav = typeof window !== 'undefined' ? window.navigator : undefined;

    try {
      if (nav && 'share' in nav) {
        await (nav as any).share({
          title: 'TheTidbit - Handmade Jute Sling Bag',
          text: shareText,
          url: shareUrl,
        });
        if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
          window.gtag('event', 'share', { method: 'web_share', placement: 'track_page' });
        }
        return;
      }

      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(shareUrl);
        if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
          window.gtag('event', 'share', { method: 'copy_link', placement: 'track_page' });
        }
        alert('Link copied! Share it with your family and friends.');
        return;
      }
    } catch {
      // fall through
    }

    try {
      window.prompt('Copy this link to share:', shareUrl);
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'share', { method: 'prompt_copy', placement: 'track_page' });
      }
    } catch {
      // ignore
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);

    const m = normalizeMobile(mobile);
    if (!m || m.length < 10) {
      setError('Please enter your 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const r = await fetch('/api/track-by-mobile', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ courierSlug: 'anjani-courier', mobile: m }),
      });
      const contentType = r.headers.get('content-type') || '';
      const raw = await r.text();
      let json: any = null;
      if (contentType.includes('application/json')) {
        try {
          json = raw ? JSON.parse(raw) : null;
        } catch {
          // fall through to error below
        }
      }
      if (!r.ok) {
        const extra = raw ? ` — ${raw.slice(0, 180)}` : '';
        throw new Error((json?.error as string) || `Request failed (${r.status})${extra}`);
      }
      if (!json) throw new Error('Unexpected response from server. Please try again.');
      setResults((json?.results ?? []) as ApiResultItem[]);
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-stone-50 via-white to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 min-h-screen transition-colors duration-300 relative">
      <SEO
        title="Track Order"
        description="Track your TheTidbit order using your courier tracking number (Doc ID)."
        canonicalUrl="https://thetidbit.in/track"
      />

      {/* Dark mode background pattern */}
      <div className="hidden dark:block absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Hero Section - Split Layout */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-indigo-950/50 dark:via-purple-950/40 dark:to-pink-950/30 dark:via-indigo-900/30" />
        {/* Dark mode glow effects */}
        <div className="hidden dark:block absolute -top-24 -right-28 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="hidden dark:block absolute -bottom-24 -left-28 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Tracking Form */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm border border-stone-200 dark:border-stone-700 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 mb-6">
                <Truck size={16} className="text-indigo-600 dark:text-indigo-400" />
                Real-time tracking
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                Track your order
              </h1>
              <p className="text-lg text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
                Enter your mobile number to see live courier updates for your TheTidbit order.
              </p>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    className="flex-1 rounded-2xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-5 py-4 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/30 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="sm:w-auto rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-8 py-4 text-base font-bold hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Truck size={20} className={loading ? 'bs-pulse-soft' : ''} />
                    {loading ? 'Tracking…' : 'Track'}
                  </button>
                </div>

                {error ? (
                  <div className="rounded-2xl border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-5 py-4 text-red-900 dark:text-red-200 flex gap-3 items-start">
                    <AlertTriangle size={20} className="mt-0.5 text-red-700 dark:text-red-400 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Couldn't fetch tracking</div>
                      <div className="text-red-800 dark:text-red-300">{error}</div>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 pt-2">
                  <Phone size={16} className="text-green-600 dark:text-green-500" />
                  <span>Need help?</span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline decoration-green-300 dark:decoration-green-600 underline-offset-2 transition-colors"
                  >
                    WhatsApp support
                  </a>
                </div>
              </form>
            </div>

            {/* Right: Product Video */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800">
                <video
                  src="https://res.cloudinary.com/thetidbit23024/video/upload/v1766855488/track_ic99vu.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="TheTidbit handmade jute sling bag tracking video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Loading State */}
        {loading ? (
          <div className="mt-12 space-y-6">
            {[0, 1].map((i) => (
              <div key={i} className="bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl border border-stone-100 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between gap-3">
                  <div className="w-40 h-4 rounded-full bs-skeleton" />
                  <div className="w-28 h-7 rounded-full bs-skeleton" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="h-20 rounded-2xl bs-skeleton" />
                    <div className="h-20 rounded-2xl bs-skeleton" />
                    <div className="h-20 rounded-2xl bs-skeleton" />
                  </div>
                  <div className="h-5 w-40 rounded-full bs-skeleton" />
                  <div className="space-y-3">
                    <div className="h-16 rounded-2xl bs-skeleton" />
                    <div className="h-16 rounded-2xl bs-skeleton" />
                    <div className="h-16 rounded-2xl bs-skeleton" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Tracking Results */}
        {results ? (
          <div className="mt-12 space-y-6">
            {results.length === 0 ? (
              <div className="bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl border border-stone-100 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 p-10 text-center">
                <Package size={48} className="text-stone-400 dark:text-stone-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">No shipments found</h3>
                <p className="text-stone-600 dark:text-stone-400">
                  If you placed an order recently, tracking may take a few hours to appear.
                </p>
              </div>
            ) : null}

            {results.map((r) => (
              <div key={r.docId} className="bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl border border-stone-100 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 overflow-hidden">
                <div className="px-6 py-5 bg-gradient-to-r from-stone-50 to-white dark:from-stone-800/80 dark:to-stone-700/80 border-b border-stone-100 dark:border-stone-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1">Tracking Number</div>
                    <div className="text-xl font-bold text-stone-900 dark:text-stone-100 font-mono">{r.docId}</div>
                  </div>
                  <div>
                    {r.ok ? (
                      (() => {
                        const st = statusTone(r.data?.MostRecentStatus || r.data?.ShipmentState);
                        const cls =
                          st.tone === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
                            : st.tone === 'progress'
                              ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50'
                              : st.tone === 'danger'
                                ? 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/50'
                                : 'bg-stone-50 dark:bg-stone-800/50 text-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700/50';
                        return (
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 border font-semibold transition-all ${cls} ${
                              st.tone === 'progress' ? 'bs-pulse-soft' : ''
                            }`}
                          >
                            {st.tone === 'success' ? <CheckCircle2 size={18} /> : <Truck size={18} />}
                            {st.label}
                          </span>
                        );
                      })()
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300 px-4 py-2 border border-red-200 dark:border-red-800/50 font-semibold">
                        <AlertTriangle size={18} />
                        Failed
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {r.ok ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-white dark:from-stone-700/50 dark:to-stone-800/50 border border-stone-100 dark:border-stone-700/50 p-4 transition-all hover:shadow-md dark:hover:shadow-stone-900/50">
                          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                            <Package size={14} />
                            Courier
                          </div>
                          <div className="font-bold text-stone-900 dark:text-stone-100">{r.data?.CourierSlug || 'anjani-courier'}</div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-white dark:from-stone-700/50 dark:to-stone-800/50 border border-stone-100 dark:border-stone-700/50 p-4 transition-all hover:shadow-md dark:hover:shadow-stone-900/50">
                          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                            <Truck size={14} />
                            Status
                          </div>
                          <div className="font-bold text-stone-900 dark:text-stone-100">{r.data?.ShipmentState || '—'}</div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-white dark:from-stone-700/50 dark:to-stone-800/50 border border-stone-100 dark:border-stone-700/50 p-4 transition-all hover:shadow-md dark:hover:shadow-stone-900/50">
                          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                            <Clock3 size={14} />
                            Latest Update
                          </div>
                          <div className="font-bold text-stone-900 dark:text-stone-100">{r.data?.MostRecentStatus || '—'}</div>
                        </div>
                      </div>

                      {r.data?.AdditionalInfo ? (
                        <div className="mb-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-sm text-blue-900 dark:text-blue-200">
                          {r.data.AdditionalInfo}
                        </div>
                      ) : null}

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Shipment Journey</h3>
                          <span className="text-xs text-stone-500 dark:text-stone-400">Newest first</span>
                        </div>

                        {(r.data?.Checkpoints ?? []).length === 0 ? (
                          <div className="rounded-2xl border border-stone-200 dark:border-stone-700/50 bg-stone-50 dark:bg-stone-800/30 px-5 py-6 text-center text-stone-700 dark:text-stone-300">
                            No checkpoints yet. Please check again in a few hours.
                          </div>
                        ) : (
                          <ol className="space-y-4">
                            {(r.data?.Checkpoints ?? []).map((c, idx) => (
                              <li
                                key={idx}
                                className="relative pl-12 bs-reveal-up"
                                style={{ animationDelay: `${Math.min(idx * 60, 420)}ms` }}
                              >
                                <span aria-hidden="true" className="absolute left-5 top-6 bottom-0 w-0.5 bg-stone-200 dark:bg-stone-700" />
                                <span
                                  aria-hidden="true"
                                  className={`absolute left-4 top-6 h-4 w-4 rounded-full border-2 border-white dark:border-stone-800 transition-all ${
                                    idx === 0
                                      ? 'bg-indigo-600 dark:bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.15)] dark:shadow-[0_0_0_4px_rgba(99,102,241,0.3)]'
                                      : 'bg-stone-400 dark:bg-stone-600'
                                  }`}
                                />

                                <div className="rounded-2xl border border-stone-100 dark:border-stone-700/50 bg-white dark:bg-stone-800/50 shadow-sm dark:shadow-stone-900/50 px-5 py-4 hover:shadow-md dark:hover:shadow-stone-900/70 transition-all">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                    <div className="font-bold text-stone-900 dark:text-stone-100">{formatCheckpointTitle(c)}</div>
                                    <div className="text-xs text-stone-500 dark:text-stone-400 inline-flex items-center gap-2">
                                      <Clock3 size={14} />
                                      <span>
                                        {c.Date || '—'} {c.Time ? `• ${c.Time}` : ''}
                                      </span>
                                    </div>
                                  </div>
                                  {c.Location ? (
                                    <div className="inline-flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300">
                                      <MapPin size={16} className="text-stone-500 dark:text-stone-400 mt-0.5 flex-shrink-0" />
                                      <span>{c.Location}</span>
                                    </div>
                                  ) : null}
                                </div>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-5 py-4 text-red-900 dark:text-red-200 flex gap-3 items-start">
                      <AlertTriangle size={20} className="mt-0.5 text-red-700 dark:text-red-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold mb-1">Couldn't fetch this shipment</div>
                        <div className="text-sm text-red-800 dark:text-red-300">{'error' in r ? r.error : ''}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Conversion Sections - Before Tracking */}
        {!loading && !results ? (
          <div className="mt-16 space-y-12">
            {/* Share Section */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/40 dark:via-purple-950/40 dark:to-indigo-950/40 rounded-3xl border-2 border-pink-200/50 dark:border-pink-800/30 shadow-xl dark:shadow-stone-900/50 overflow-hidden relative">
              {/* Dark mode glow */}
              <div className="hidden dark:block absolute -inset-1 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-50" />
              <div className="p-8 sm:p-10 lg:p-12 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm border border-pink-200 dark:border-pink-800/50 px-4 py-2 text-xs font-semibold text-pink-700 dark:text-pink-300 mb-6">
                      <Users size={16} className="text-pink-600 dark:text-pink-400" />
                      Spread the love
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                      Share with family & friends! 💝
                    </h2>
                    <p className="text-lg text-stone-700 dark:text-stone-300 mb-8 leading-relaxed">
                      Love our handmade jute bags? Share TheTidbit with your loved ones! They'll thank you for introducing them to sustainable, eco-friendly fashion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 font-bold hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-base"
                      >
                        <Share2 size={20} />
                        Share TheTidbit
                      </button>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent('Check out this beautiful handmade jute sling bag from TheTidbit! ✨ Eco-friendly and perfect for everyday use. https://thetidbit.in/')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 text-white px-8 py-4 font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-base"
                        onClick={() => {
                          if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                            window.gtag('event', 'whatsapp_share', { placement: 'track_page_before' });
                          }
                        }}
                      >
                        <Phone size={20} />
                        Share on WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden border-4 border-white dark:border-stone-800 shadow-2xl">
                      <img
                        src={cloudinaryTransform(shareImage, { w: 600 })}
                        alt="Family and friends sharing TheTidbit bags"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Conversion Sections - After Tracking */}
        {results && results.length > 0 && results.some((r) => r.ok) ? (
          <div className="mt-16 space-y-12">
            {/* Share Section */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/40 dark:via-purple-950/40 dark:to-indigo-950/40 rounded-3xl border-2 border-pink-200/50 dark:border-pink-800/30 shadow-xl dark:shadow-stone-900/50 overflow-hidden relative">
              {/* Dark mode glow */}
              <div className="hidden dark:block absolute -inset-1 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-50" />
              <div className="p-8 sm:p-10 lg:p-12 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm border border-pink-200 dark:border-pink-800/50 px-4 py-2 text-xs font-semibold text-pink-700 dark:text-pink-300 mb-6">
                      <Users size={16} className="text-pink-600 dark:text-pink-400" />
                      Spread the love
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                      Share with family & friends! 💝
                    </h2>
                    <p className="text-lg text-stone-700 dark:text-stone-300 mb-8 leading-relaxed">
                      Love your order? Share TheTidbit with your loved ones! They'll thank you for introducing them to sustainable, handmade fashion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 font-bold hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-base"
                      >
                        <Share2 size={20} />
                        Share TheTidbit
                      </button>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent('Check out this beautiful handmade jute sling bag from TheTidbit! ✨ Eco-friendly and perfect for everyday use. https://thetidbit.in/')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 text-white px-8 py-4 font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-base"
                        onClick={() => {
                          if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                            window.gtag('event', 'whatsapp_share', { placement: 'track_page_after' });
                          }
                        }}
                      >
                        <Phone size={20} />
                        Share on WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden border-4 border-white dark:border-stone-800 shadow-2xl">
                      <img
                        src={cloudinaryTransform(shareImage, { w: 600 })}
                        alt="Family and friends sharing TheTidbit bags"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram CTA */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/40 dark:via-purple-950/40 dark:to-indigo-950/40 rounded-3xl border border-stone-100 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 overflow-hidden relative">
              {/* Dark mode glow */}
              <div className="hidden dark:block absolute -inset-1 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-50" />
              <div className="p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white dark:bg-stone-800/50 rounded-full p-4 shadow-md">
                      <Instagram size={28} className="text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2 leading-tight">
                        Share your unboxing!
                      </h3>
                      <p className="text-stone-700 dark:text-stone-300 text-lg mb-1">
                        Tag us <span className="font-bold">@{INSTAGRAM_HANDLE}</span> when your bag arrives.
                      </p>
                      <p className="text-stone-600 dark:text-stone-400 text-sm">
                        Follow us for new arrivals, styling tips, and behind-the-scenes stories.
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                        window.gtag('event', 'instagram_click', { placement: 'track_page' });
                      }
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-base"
                  >
                    <Instagram size={20} />
                    Follow @{INSTAGRAM_HANDLE}
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Empty State */}
        {results && results.length === 0 ? (
          <div className="mt-16 bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl border border-stone-100 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 p-12 text-center">
            <Package size={64} className="text-stone-400 dark:text-stone-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">No tracking found yet?</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">
              While you wait, explore our collection of handmade jute bags. Each piece is unique and crafted with love.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 text-white px-8 py-4 font-bold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl text-base"
              >
                <ShoppingBag size={20} />
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 text-white px-8 py-4 font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl text-base"
              >
                <ExternalLink size={20} />
                Shop on Amazon
              </a>
            </div>
          </div>
        ) : null}

        {/* Available Products Showcase - Always Visible */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm border border-stone-200 dark:border-stone-700 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 mb-4">
              <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
              Shop our collection
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
              Available Colors
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Choose from 4 beautiful color variants of our handmade jute sling bag. Each piece is unique and crafted with love.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* All 4 Color Variants */}
            {PRODUCT.colors.map((color, index) => (
              <Link
                key={color.id}
                to="/"
                className="group relative bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl border-2 border-stone-200 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 hover:shadow-xl dark:hover:shadow-stone-900/70 overflow-hidden transition-all"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={cloudinaryTransform(color.images[0], { w: 400 })}
                    srcSet={cloudinarySrcSet(color.images[0], [300, 400, 500])}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    alt={`${PRODUCT.name} - ${color.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  {index === 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="h-5 w-5 rounded-full border-2 border-stone-300 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {color.name}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">{PRODUCT.name}</p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                      <span className="text-xs font-medium text-stone-600 dark:text-stone-400 mr-1">Only</span>₹{PRODUCT.price}
                    </span>
                    <span className="text-sm text-stone-500 dark:text-stone-500 line-through">₹{PRODUCT.mrp}</span>
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full">
                      {PRODUCT.discountPercentage}% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <Truck size={14} />
                    <span>Free Delivery</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 text-white px-8 py-4 font-bold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl text-base"
              >
                <ShoppingBag size={20} />
                View All Products
                <ArrowRight size={18} />
              </Link>
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 text-white px-8 py-4 font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl text-base"
                onClick={() => {
                  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                    window.gtag('event', 'amazon_store_click', { placement: 'track_page_products' });
                  }
                }}
              >
                <ExternalLink size={20} />
                Shop on Amazon
              </a>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-4">
              All products are handmade, eco-friendly, and come with free delivery across India
            </p>
          </div>
        </div>

        {/* Product & Shop Section - At the End */}
        <div className="mt-20 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800">
              <img
                src={cloudinaryTransform(shopImage, { w: 600 })}
                alt="Excited customer with TheTidbit bag"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Product Info & CTAs */}
            <div className="bg-white dark:bg-stone-800/50 dark:backdrop-blur-sm rounded-3xl border border-stone-100 dark:border-stone-700/50 shadow-lg dark:shadow-stone-900/50 p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 mb-6">
                <ShoppingBag size={16} className="text-indigo-600 dark:text-indigo-400" />
                Shop now
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                {PRODUCT.name}
              </h2>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                  <span className="text-sm font-medium text-stone-600 dark:text-stone-400 mr-1">Only</span>₹{PRODUCT.price}
                </span>
                <span className="text-xl text-stone-500 dark:text-stone-500 line-through">₹{PRODUCT.mrp}</span>
                <span className="text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full">Free Delivery</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 mb-8 text-lg leading-relaxed">
                Each bag is unique, crafted by skilled artisans. Choose from 4 beautiful colors, all eco-friendly and perfect for everyday use.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  to="/"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 text-white px-6 py-4 font-bold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl text-base"
                >
                  <ShoppingBag size={20} />
                  Shop on TheTidbit
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={AMAZON_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 text-white px-6 py-4 font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl text-base"
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                      window.gtag('event', 'amazon_store_click', { placement: 'track_page_end' });
                    }
                  }}
                >
                  <ExternalLink size={20} />
                  Shop on Amazon
                </a>
              </div>
              <div className="pt-6 border-t border-stone-200 dark:border-stone-700/50">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 dark:text-yellow-500 fill-current" />
                  ))}
                  <span className="text-base font-bold text-stone-900 dark:text-stone-100 ml-2">4.8</span>
                  <span className="text-base text-stone-500 dark:text-stone-400">(48 reviews)</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 italic text-base leading-relaxed">
                  "{REVIEWS[0]?.text || 'Love my sling bag! Perfect size and the embroidery is so beautiful.'}"
                </p>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-2">— {REVIEWS[0]?.author || 'Priya S.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;