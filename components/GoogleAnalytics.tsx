import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_TRACKING_ID } from '../constants';

// Declare global window property for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();

  const loadGtag = () => {
    if (typeof window === 'undefined') return;
    if (!GA_TRACKING_ID || !GA_TRACKING_ID.startsWith('G-')) return;

    const scriptId = 'google-analytics-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      // Avoid blocking the initial render; this also improves Lighthouse.
      send_page_view: false,
      transport_type: 'beacon',
    });
  };

  useEffect(() => {
    // Delay GA load to reduce unused JS during initial paint.
    // Load on idle OR first user interaction (whichever comes first).
    if (typeof window === 'undefined') return;

    let loaded = false;
    const trigger = () => {
      if (loaded) return;
      loaded = true;
      loadGtag();
    };

    const onFirstInteraction = () => trigger();
    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });
    window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });

    const idleId =
      'requestIdleCallback' in window
        ? (window as any).requestIdleCallback(trigger, { timeout: 2500 })
        : window.setTimeout(trigger, 2500);

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
      if ('cancelIdleCallback' in window) (window as any).cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  useEffect(() => {
    // Send page view events on route change
    if (typeof window.gtag !== 'undefined' && GA_TRACKING_ID && GA_TRACKING_ID.startsWith('G-')) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
        send_page_view: true,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;