import type { Metadata, Viewport } from 'next';
import { Lato, Playfair_Display, Noto_Serif_Devanagari } from 'next/font/google';
import '../styles.css';
import Providers from './providers';
import { SITE_URL, SITE_NAME } from '../lib/seo';
import {
  DEFAULT_META_DESCRIPTION,
  organizationJsonLd,
  websiteJsonLd,
} from '../lib/seo-content';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['500', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
});

const FAVICON = 'https://res.cloudinary.com/thetidbit23024/image/upload/f_auto,w_32,h_32,c_fill/v1765969614/canva-_logo-_bykbip.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Handmade Jute Sling Bags for Women | TheTidbit India',
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_META_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'handmade jute sling bag',
    'boho embroidered crossbody bag',
    'evil eye jute sling bag',
    'handmade jute bags',
    'eco friendly handbags',
    'made in India handbags',
    'affordable sling bags under 500',
    'TheTidbit',
  ],
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true, 'max-image-preview': 'large' } as Metadata['robots'],
  icons: {
    icon: [
      { url: 'https://res.cloudinary.com/thetidbit23024/image/upload/f_auto,w_32,h_32,c_fill/v1765969614/canva-_logo-_bykbip.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://res.cloudinary.com/thetidbit23024/image/upload/f_auto,w_192,h_192,c_fill/v1765969614/canva-_logo-_bykbip.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: 'https://res.cloudinary.com/thetidbit23024/image/upload/f_auto,w_180,h_180,c_fill/v1765969614/canva-_logo-_bykbip.png',
    shortcut: FAVICON,
  },
  alternates: {
    canonical: SITE_URL,
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
};

export const viewport: Viewport = {
  themeColor: '#4A5D44',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = organizationJsonLd();
  const site = websiteJsonLd();
  return (
    <html lang="en-IN" className={`${lato.variable} ${playfair.variable} ${notoDevanagari.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
        />
      </head>
      <body className="bg-stone-50 text-stone-800 font-sans antialiased selection:bg-jute-300 selection:text-jute-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-stone-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
