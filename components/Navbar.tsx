import React, { useState } from 'react';
import { Menu, Snowflake, X } from 'lucide-react';
import { HEADER_BADGE, LOGO_URL } from '../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';
import ThemeToggle from './ThemeToggle';

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
  const location = useLocation();
  const navigate = useNavigate();

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
        {/* Trust bar */}
        <div className="bg-stone-900 dark:bg-stone-950 text-white dark:text-stone-200 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[12px] font-semibold tracking-wide">
              <span>Free Delivery</span>
              <span className="opacity-40">•</span>
              <span>100% Genuine Brand</span>
              <span className="opacity-40">•</span>
              <span>Handmade in India</span>
            </div>
          </div>
        </div>

        <nav className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 p-2 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex-1 flex justify-center sm:justify-start">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group focus:outline-none">
              <img
                src={cloudinaryTransform(LOGO_URL, { w: 160 })}
                srcSet={cloudinarySrcSet(LOGO_URL, [80, 120, 160, 240])}
                sizes="40px"
                alt="TheTidbit Logo"
                className="h-10 w-auto"
                width="40"
                height="40"
                decoding="async"
              />
              <div className="flex flex-col items-start">
                 <span className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-none group-hover:text-brand-green transition-colors">
                    TheTidbit
                 </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links - SEO Friendly Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname === '/' ? 'text-stone-900 dark:text-stone-100 border-brand-green' : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100'}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname === '/products' || location.pathname.startsWith('/products/') ? 'text-stone-900 dark:text-stone-100 border-brand-green' : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100'}`}
            >
              Products
            </Link>
            <Link
              to="/track"
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname === '/track' ? 'text-stone-900 dark:text-stone-100 border-brand-green' : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100'}`}
            >
              Track Order
            </Link>
            <Link 
              to="/stories"
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname.startsWith('/stories') ? 'text-stone-900 dark:text-stone-100 border-brand-green' : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100'}`}
            >
              Stories
            </Link>
            <Link 
              to="/about"
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname === '/about' ? 'text-stone-900 dark:text-stone-100 border-brand-green' : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100'}`}
            >
              About TheTidbit
            </Link>
          </div>

          {/* Right-side: Theme Toggle + Badge */}
          <div className="flex items-center justify-end gap-3">
            <ThemeToggle />
            {HEADER_BADGE?.enabled ? (
              <div
                className="relative inline-flex items-center gap-2 select-none"
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
                  className="text-4xl leading-none drop-shadow-sm"
                >
                  {HEADER_BADGE.variant === 'svg_india_flag' ? (
                    <span aria-hidden="true">
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
        <div className="sm:hidden bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700 absolute w-full left-0 shadow-lg transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                location.pathname === '/' 
                  ? 'text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800' 
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={closeMenu}
              className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                location.pathname === '/products' || location.pathname.startsWith('/products/')
                  ? 'text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800' 
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Products
            </Link>
            <Link
              to="/track"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 rounded-md transition-colors"
            >
              Track Order
            </Link>
            <Link 
              to="/stories"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 rounded-md transition-colors"
            >
              Stories
            </Link>
            <Link 
              to="/about"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 rounded-md transition-colors"
            >
              About TheTidbit
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