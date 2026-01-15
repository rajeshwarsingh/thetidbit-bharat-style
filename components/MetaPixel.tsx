import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FB_PIXEL_ID } from '../constants';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

const MetaPixel = () => {
  const location = useLocation();

  const loadPixel = () => {
    if (typeof window === 'undefined') return;
    if (!FB_PIXEL_ID) return;

    const w = window as any;
    const d = document as any;

    // Already loaded
    if (typeof w.fbq === 'function') return;

    // Base snippet (official pattern), but injected lazily
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(w, d, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    w.fbq?.('init', FB_PIXEL_ID);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!FB_PIXEL_ID) return;

    const w = window as any;

    // Delay Pixel load to reduce unused JS during initial paint.
    let loaded = false;
    const trigger = () => {
      if (loaded) return;
      loaded = true;
      loadPixel();
      w.fbq?.('track', 'PageView');
    };

    const onFirstInteraction = () => trigger();
    w.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    w.addEventListener('keydown', onFirstInteraction, { once: true });
    w.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });

    const idleId =
      'requestIdleCallback' in w
        ? w.requestIdleCallback(trigger, { timeout: 3000 })
        : w.setTimeout(trigger, 3000);

    return () => {
      w.removeEventListener('pointerdown', onFirstInteraction);
      w.removeEventListener('keydown', onFirstInteraction);
      w.removeEventListener('scroll', onFirstInteraction);
      if ('cancelIdleCallback' in w) w.cancelIdleCallback(idleId);
      else w.clearTimeout(idleId);
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    // Subsequent route changes (if pixel already loaded)
    if (typeof window === 'undefined') return;
    const w = window as any;
    if (typeof w.fbq !== 'function') return;
    w.fbq('track', 'PageView');
  }, [location.pathname, location.search]);

  return null;
};

export default MetaPixel;



