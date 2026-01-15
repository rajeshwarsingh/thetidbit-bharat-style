import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  /**
   * Delay in ms (for staggered reveals)
   */
  delayMs?: number;
  /**
   * Reveal only once (default true)
   */
  once?: boolean;
};

const Reveal: React.FC<Props> = ({ children, className, delayMs = 0, once = true }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const style = useMemo(() => {
    return delayMs ? ({ transitionDelay: `${delayMs}ms` } as React.CSSProperties) : undefined;
  }, [delayMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={style}
      className={[
        // Base animation: fade-up
        'transition-all duration-700 ease-out will-change-transform will-change-opacity',
        'motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default Reveal;


