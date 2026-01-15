import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SlingTryCTA: React.FC<{ onOpenModal?: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="bg-stone-50 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-200/50 blur-3xl" />
          </div>

          <div className="relative p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-xs font-semibold text-stone-700">
                <Sparkles size={14} className="text-indigo-600" />
                New: SlingTry (AI Virtual Try‑On)
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Try the sling bag on your photo
              </h3>
              <p className="mt-2 text-stone-600">
                Upload your photo + the bag photo and get a realistic cross‑body preview in seconds.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {onOpenModal ? (
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                      window.gtag('event', 'slingtry_open_modal', { placement: 'home_cta' });
                    }
                    onOpenModal();
                  }}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-white font-bold shadow-md transition bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Try it on (AI) <ArrowRight size={18} />
                </button>
              ) : (
                <Link
                  to="/try-on"
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                      window.gtag('event', 'slingtry_click', { placement: 'home_cta' });
                    }
                  }}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-white font-bold shadow-md transition bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Open SlingTry <ArrowRight size={18} />
                </Link>
              )}
              <p className="mt-2 text-xs text-stone-500 text-center md:text-left">
                Works best with clear, well‑lit photos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlingTryCTA;


