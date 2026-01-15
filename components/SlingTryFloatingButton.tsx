import React from 'react';
import { Sparkles } from 'lucide-react';

const SlingTryFloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-6 z-50">
      <button
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
            window.gtag('event', 'slingtry_open_modal', { placement: 'floating_button' });
          }
          onClick();
        }}
        className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-white font-bold shadow-lg shadow-indigo-200/60 border border-white/20 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition"
        aria-label="See how it looks on you (virtual try-on)"
      >
        <Sparkles size={18} className="text-white/95" />
        <span className="text-sm">See how it looks on you</span>
      </button>
    </div>
  );
};

export default SlingTryFloatingButton;


