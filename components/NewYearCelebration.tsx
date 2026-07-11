'use client';
import React, { useEffect, useState } from 'react';
import { X, Send } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';

const OFFER_BANNER_IMAGE =
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1771593669/ChatGPT_Image_Feb_20_2026_06_50_40_PM_vyalxg.png';

const NewYearCelebration: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const hasSeenOffer = localStorage.getItem('thetidbit-new-year-2026');

    if (!hasSeenOffer) {
      let closeTimer: NodeJS.Timeout;
      let markSeenTimer: NodeJS.Timeout;

      const initialDelay = setTimeout(() => {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 200);

        markSeenTimer = setTimeout(() => {
          localStorage.setItem('thetidbit-new-year-2026', 'true');
        }, 5300);

        closeTimer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setShouldRender(false), 400);
        }, 7600);
      }, 2500);

      return () => {
        clearTimeout(initialDelay);
        if (closeTimer) clearTimeout(closeTimer);
        if (markSeenTimer) clearTimeout(markSeenTimer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('thetidbit-new-year-2026', 'true');
    setTimeout(() => setShouldRender(false), 400);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi TheTidbit! I'd like to shop sling bags at ₹299."
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-400 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={handleClose}
        aria-hidden
      />

      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl bg-stone-200 dark:bg-stone-800 transform transition-all duration-400 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Banner image */}
        <div className="relative w-full max-h-[50vh] min-h-[200px] bg-stone-200 dark:bg-stone-800">
          <img
            src={cloudinaryTransform(OFFER_BANNER_IMAGE, { w: 800, q: 'auto:good' })}
            alt="Handcrafted bags at ₹299"
            className="w-full h-full object-contain object-center"
          />
        </div>

        {/* Footer: title + Shop on WhatsApp */}
        <footer className="bg-stone-800 dark:bg-stone-900 px-5 py-4 sm:px-6 sm:py-5">
          {/* <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
            Handcrafted Bags
          </h2> */}
          {/* <p className="mt-0.5 text-lg sm:text-xl font-semibold text-white/90">
            Now ₹299 — limited time
          </p> */}
          <button
            onClick={handleWhatsApp}
            className="mt-4 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Send size={18} />
            Shop on WhatsApp
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewYearCelebration;