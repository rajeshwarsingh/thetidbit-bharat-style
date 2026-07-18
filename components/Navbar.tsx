'use client';
import React, { useEffect, useState } from 'react';
import { Menu, Snowflake, X, Heart, Search, Truck } from 'lucide-react';
import { HEADER_BADGE, LOGO_URL } from '../constants';
import { Link, useLocation, useNavigate } from '@/lib/router';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';
import ThemeToggle from './ThemeToggle';
import { useWishlist } from '../utils/wishlist';
import { useRandomShortSloka } from './SanskritSloka';

/** Primary navigation model — single source of truth for desktop + mobile. */
const NAV_LINKS: { label: string; to: string; match: (p: string) => boolean }[] = [
  { label: 'Home', to: '/', match: (p) => p === '/' || p === '/smart' },
  { label: 'Classic', to: '/classic', match: (p) => p === '/classic' },
  { label: 'Shop', to: '/collections', match: (p) => p === '/collections' },
  { label: 'Reviews', to: '/reviews', match: (p) => p === '/reviews' },
  { label: 'Bulk Orders', to: '/bulk', match: (p) => p === '/bulk' },
  { label: 'Stories', to: '/stories', match: (p) => p === '/stories' || p.startsWith('/stories/') },
  { label: 'About', to: '/about', match: (p) => p === '/about' },
  { label: 'Contact', to: '/contact', match: (p) => p === '/contact' },
];

const IndiaFlagIcon = () => {
  return (
    <div className="bs-flag-wave">
      <svg width="44" height="30" viewBox="0 0 44 30" aria-hidden="true">
        {/* Flag (3 stripes) */}
        <defs>
          <clipPath id="flagClip">
            <rect x="2" y="4" width="36" height="22" rx="4" ry="4" />
          </clipPath>
        </defs>
        {/* Pole */}
        <rect x="0" y="2" width="3" height="26" rx="1.5" fill="#8B5A2B" opacity="0.9" />
        <g clipPath="url(#flagClip)">
          <rect x="2" y="4" width="36" height="22" fill="#FFFFFF" />
          <rect x="2" y="4" width="36" height="7.333" fill="#FF9933" />
          <rect x="2" y="18.666" width="36" height="7.334" fill="#138808" />
          {/* Chakra */}
          <circle cx="20" cy="15" r="4.2" fill="none" stroke="#000080" strokeWidth="1.3" />
          <circle cx="20" cy="15" r="0.7" fill="#000080" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <line
                key={i}
                x1="20"
                y1="15"
                x2="20"
                y2="10.8"
                stroke="#000080"
                strokeWidth="0.7"
                transform={`rotate(${angle} 20 15)`}
              />
            );
          })}
        </g>
        <rect x="2" y="4" width="36" height="22" rx="4" ry="4" fill="none" stroke="rgba(0,0,0,0.08)" />
      </svg>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileSloka, setShowMobileSloka] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const wishlist = useWishlist();
  const shortSloka = useRandomShortSloka();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** Mobile trust bar gently alternates trust line ↔ shloka (same height, no hero clash). */
  useEffect(() => {
    const id = window.setInterval(() => setShowMobileSloka((v) => !v), 5500);
    return () => window.clearInterval(id);
  }, []);

  const handleScrollToCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header Container - Wraps both trust bar and nav */}
      <div className="sticky top-0 z-40">
        {/* Trust bar — desktop: trust line; mobile: soft swap with shloka (no extra page height) */}
        <div className="bg-stone-900 dark:bg-stone-950 text-white dark:text-stone-200 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
            <div className="hidden sm:flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[12px] font-semibold tracking-wide">
              <span>Free Delivery</span>
              <span className="opacity-40">•</span>
              <span>100% Genuine Brand</span>
              <span className="opacity-40">•</span>
              <span>Handmade in India</span>
            </div>

            <div className="sm:hidden relative h-5 overflow-hidden">
              <div
                className={`absolute inset-x-0 top-0 flex items-center justify-center gap-2 text-[10px] font-semibold tracking-wide transition-opacity duration-500 ${
                  showMobileSloka ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span>Free Delivery</span>
                <span className="opacity-40">•</span>
                <span>Genuine Brand</span>
                <span className="opacity-40">•</span>
                <span>Handmade in India</span>
              </div>
              {shortSloka && (
                <p
                  className={`absolute inset-x-0 top-0 text-center text-[10px] leading-5 tracking-wide px-1 truncate transition-opacity duration-500 ${
                    showMobileSloka ? 'opacity-100' : 'opacity-0'
                  }`}
                  title={`${shortSloka.sanskrit} — ${shortSloka.meaning}`}
                >
                  <span
                    lang="sa"
                    style={{
                      fontFamily:
                        'var(--font-devanagari), "Noto Serif Devanagari", "Devanagari MT", Georgia, serif',
                    }}
                  >
                    {shortSloka.sanskrit}
                  </span>
                  <span className="opacity-50 mx-1">—</span>
                  <span className="italic opacity-90 font-normal">{shortSloka.meaning}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <nav className={`bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-700 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Mobile + desktop: brand left, actions right (shop-standard). */}
        <div className="flex items-center gap-1 h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center shrink-0 md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 p-2 -ml-1 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Logo — left-aligned */}
          <div className="flex justify-start min-w-0 shrink">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-1.5 sm:gap-3 group focus:outline-none min-w-0"
            >
              <img
                src={cloudinaryTransform(LOGO_URL, { w: 160 })}
                srcSet={cloudinarySrcSet(LOGO_URL, [80, 120, 160, 240])}
                sizes="32px"
                alt="TheTidbit Logo"
                className="h-7 w-auto sm:h-10 shrink-0"
                width="40"
                height="40"
                decoding="async"
              />
              <span className="font-serif text-[15px] sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-none group-hover:text-brand-green transition-colors whitespace-nowrap truncate">
                TheTidbit
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links — sit toward the right actions, not glued to the logo */}
          <div className="hidden md:flex md:items-center md:justify-end md:gap-6 lg:gap-8 md:flex-1 md:min-w-0 md:ml-10 lg:ml-16 md:mr-4 lg:mr-6">
            {NAV_LINKS.map((link) => {
              const active = link.match(location.pathname);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-sm font-medium border-b-2 transition-colors px-1 py-2 whitespace-nowrap ${active ? 'text-stone-900 dark:text-stone-100 border-brand-green' : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right-side: Search + Track + Wishlist + Theme + Badge */}
          <div className="ml-auto md:ml-0 flex items-center justify-end gap-0 sm:gap-2 shrink-0">
            <Link
              to="/collections"
              aria-label="Search products"
              className="p-1.5 sm:p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Search className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
            </Link>
            <Link
              to="/track"
              aria-label="Track your order"
              className="hidden sm:inline-flex p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Truck size={20} />
            </Link>
            <Link
              to="/wishlist"
              aria-label={`Wishlist${wishlist.length ? ` (${wishlist.length} items)` : ''}`}
              className="relative p-1.5 sm:p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Heart className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <ThemeToggle />
            {HEADER_BADGE?.enabled ? (
              <div
                className="relative inline-flex items-center gap-1 sm:gap-2 select-none shrink-0"
                title={HEADER_BADGE.title ?? HEADER_BADGE.ariaLabel}
              >
                {/* Festive decorations */}
                {HEADER_BADGE.festive?.enabled && HEADER_BADGE.festive.effect === 'snow' ? (
                  <div aria-hidden="true" className="pointer-events-none absolute -inset-2">
                    <Snowflake
                      size={14}
                      className="absolute -top-2 -left-2 text-sky-500/80 animate-[spin_6s_linear_infinite]"
                      style={{ animationDelay: '0ms' }}
                    />
                    <Snowflake
                      size={12}
                      className="absolute -bottom-2 left-6 text-sky-500/70 animate-[spin_8s_linear_infinite]"
                      style={{ animationDelay: '400ms' }}
                    />
                    <Snowflake
                      size={10}
                      className="absolute top-0 -right-2 text-sky-500/60 animate-[spin_10s_linear_infinite]"
                      style={{ animationDelay: '800ms' }}
                    />
                  </div>
                ) : null}

                {/* Snowfall animation (badge-local) */}
                {HEADER_BADGE.festive?.enabled && HEADER_BADGE.festive.effect === 'snowfall' ? (
                  <div aria-hidden="true" className="bs-snowfall">
                    {[
                      { left: '10%', dur: '1.8s', delay: '0.0s', size: '4px', x: '0px', drift: '8px', spin: '2.2s' },
                      { left: '22%', dur: '2.4s', delay: '0.6s', size: '3px', x: '0px', drift: '-10px', spin: '2.8s' },
                      { left: '34%', dur: '2.0s', delay: '0.3s', size: '5px', x: '0px', drift: '6px', spin: '3.1s' },
                      { left: '48%', dur: '2.6s', delay: '1.1s', size: '3px', x: '0px', drift: '-6px', spin: '2.6s' },
                      { left: '60%', dur: '2.2s', delay: '0.9s', size: '4px', x: '0px', drift: '10px', spin: '3.4s' },
                      { left: '72%', dur: '2.8s', delay: '0.2s', size: '3px', x: '0px', drift: '-8px', spin: '2.9s' },
                      { left: '84%', dur: '2.1s', delay: '1.4s', size: '5px', x: '0px', drift: '7px', spin: '3.2s' },
                      { left: '92%', dur: '2.5s', delay: '0.7s', size: '3px', x: '0px', drift: '-7px', spin: '2.7s' },
                    ].map((s, i) => (
                      <span
                        key={i}
                        className="bs-snowflake"
                        style={{
                          left: s.left,
                          animationDelay: s.delay,
                          ['--dur' as any]: s.dur,
                          ['--size' as any]: s.size,
                          ['--x' as any]: s.x,
                          ['--drift' as any]: s.drift,
                          ['--spin' as any]: s.spin,
                        }}
                      />
                    ))}
                  </div>
                ) : null}

                <span
                  role="img"
                  aria-label={HEADER_BADGE.ariaLabel}
                  className="text-xl sm:text-4xl leading-none drop-shadow-sm scale-90 sm:scale-100 origin-center"
                >
                  {HEADER_BADGE.variant === 'svg_india_flag' ? (
                    <span aria-hidden="true" className="inline-block [&_svg]:w-8 [&_svg]:h-5 sm:[&_svg]:w-11 sm:[&_svg]:h-[30px]">
                      <IndiaFlagIcon />
                    </span>
                  ) : (
                    HEADER_BADGE.emoji
                  )}
                </span>
                {HEADER_BADGE.label ? (
                  <span className="hidden sm:inline text-xs font-semibold text-stone-600 dark:text-stone-400 leading-none">
                    {HEADER_BADGE.label}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Header-wide snowfall band (falls down from navbar) */}
      {HEADER_BADGE?.enabled &&
      HEADER_BADGE.festive?.enabled &&
      HEADER_BADGE.festive.effect === 'snowfall_banner' ? (
        <div
          aria-hidden="true"
          className="bs-snow-banner"
          style={{
            ['--bannerHeight' as any]: `${HEADER_BADGE.festive.bannerHeightPx ?? 260}px`,
            // Mobile: trust bar (~28px) + navbar (64px)
            ['--snowTop' as any]: '92px',
            // Desktop: trust bar (36px) + navbar (64px)
            ['--snowTopSm' as any]: '100px',
          }}
        >
          {[
            // Subtle, low-density snowfall
            { left: '6%', dur: '3.6s', delay: '0.0s', size: '3px', drift: '8px', spin: '3.2s' },
            { left: '18%', dur: '4.2s', delay: '0.7s', size: '2px', drift: '-10px', spin: '3.8s' },
            { left: '32%', dur: '3.9s', delay: '1.3s', size: '3px', drift: '6px', spin: '4.0s' },
            { left: '46%', dur: '4.6s', delay: '0.4s', size: '2px', drift: '-7px', spin: '3.6s' },
            { left: '60%', dur: '3.7s', delay: '1.6s', size: '3px', drift: '10px', spin: '4.2s' },
            { left: '74%', dur: '4.4s', delay: '0.9s', size: '2px', drift: '-8px', spin: '3.7s' },
            { left: '88%', dur: '4.0s', delay: '1.9s', size: '3px', drift: '7px', spin: '4.1s' },
          ].map((s, i) => (
            <span
              key={i}
              className="bs-snowflake"
              style={{
                left: s.left,
                animationDelay: s.delay,
                ['--dur' as any]: s.dur,
                ['--size' as any]: s.size,
                ['--x' as any]: '0px',
                ['--drift' as any]: s.drift,
                ['--spin' as any]: s.spin,
                ['--fallDistance' as any]: `${(HEADER_BADGE.festive.bannerHeightPx ?? 260) + 24}px`,
              }}
            />
          ))}
        </div>
      ) : null}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700 absolute w-full left-0 shadow-lg transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const active = link.match(location.pathname);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeMenu}
                  className={`block w-full text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                    active
                      ? 'text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="my-2 border-t border-stone-100 dark:border-stone-700" />
            <Link
              to="/track"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2.5 text-base font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 rounded-md transition-colors"
            >
              Track Order
            </Link>
            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2.5 text-base font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 rounded-md transition-colors"
            >
              Wishlist{wishlist.length > 0 ? ` (${wishlist.length})` : ''}
            </Link>
          </div>
        </div>
        )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;