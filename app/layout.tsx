import type { Metadata, Viewport } from 'next';
import '../styles.css';
import Providers from './providers';
import { SITE_URL } from '../lib/seo';

const FAVICON = 'https://res.cloudinary.com/thetidbit23024/image/upload/f_auto,w_32,h_32,c_fill/v1765969614/canva-_logo-_bykbip.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TheTidbit — Handmade Jute Bags | Sustainable Indian Fashion',
    template: '%s | TheTidbit',
  },
  description:
    'Shop premium handmade jute bags from TheTidbit. Eco-friendly, stylish and affordable — designed for everyday Indian women. Free shipping & COD available.',
  applicationName: 'TheTidbit',
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        />
      </head>
      <body className="bg-stone-50 text-stone-800 font-sans antialiased selection:bg-jute-300 selection:text-jute-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
