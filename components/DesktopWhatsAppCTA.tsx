import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const DesktopWhatsAppCTA: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="hidden sm:block fixed left-4 bottom-6 z-40">
      <button
        type="button"
        onClick={() => {
          document.getElementById('buy-now')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
            window.gtag('event', 'desktop_cta_click', { target: 'buy_now_scroll' });
          }
        }}
        className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-3 font-bold shadow-lg shadow-black/10 dark:shadow-stone-900/50 hover:bg-stone-800 dark:hover:bg-stone-200 transition active:scale-[0.99]"
      >
        <MessageCircle size={18} />
        Buy on WhatsApp
      </button>
    </div>
  );
};

export default DesktopWhatsAppCTA;


