import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const PREFILLED_MESSAGE = "Hi TheTidbit! I'm browsing your jute bag collection and would love some help.";

const WhatsAppFloatingButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 4000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 12000);
    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible]);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'whatsapp_fab_click', { placement: 'floating_button' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50 flex items-end gap-3">
      {showTooltip && (
        <div className="animate-fade-in hidden sm:flex items-center bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 max-w-[200px]">
          <span>Need help? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="ml-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}
      <button
        onClick={handleClick}
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4">
          <MessageCircle size={22} className="fill-white" />
          <span className="font-bold text-sm sm:text-base whitespace-nowrap">Chat With Us</span>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppFloatingButton;
