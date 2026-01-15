import React, { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  iframeSrc: string;
};

const SlingTryModal: React.FC<Props> = ({ open, onClose, iframeSrc }) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="SlingTry Virtual Try-On"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-stone-100">
          <div>
            <p className="text-xs font-semibold text-stone-500">SlingTry</p>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
              Virtual Try‑On
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={iframeSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 hover:bg-stone-50 transition"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                  window.gtag('event', 'slingtry_open_new_tab', { placement: 'modal' });
                }
              }}
            >
              Open in new tab <ExternalLink size={16} />
            </a>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white p-2 text-stone-700 hover:bg-stone-50 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="bg-stone-50">
          <div className="h-[78vh] sm:h-[80vh]">
            <iframe
              title="SlingTry AI Virtual Try-On"
              src={iframeSrc}
              className="w-full h-full"
              allow="camera; clipboard-write; fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 border-t border-stone-100 bg-white">
          <p className="text-xs text-stone-500">
            If the embedded view doesn’t load, use <span className="font-semibold">“Open in new tab”</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlingTryModal;


