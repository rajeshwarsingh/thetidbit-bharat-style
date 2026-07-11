import type { Metadata } from 'next';

export const SITE_URL = 'https://thetidbit.in';
export const SITE_NAME = 'TheTidbit';
export const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/thetidbit23024/image/upload/v1765954770/ChatGPT_Image_Dec_17_2025_12_27_11_PM_afaonp.png';

interface BuildMetaArgs {
  title: string;
  description: string;
  /** Absolute or root-relative canonical path. */
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

/** Shared builder so every route emits consistent title/description/OG/Twitter/canonical. */
export function buildMetadata({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
}: BuildMetaArgs): Metadata {
  const canonical = path.startsWith('http') ? path : `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    // `absolute` bypasses the layout's title template so the "| TheTidbit"
    // suffix (already handled here) isn't appended twice.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large' } as Metadata['robots'],
    openGraph: {
      type: type === 'product' ? 'website' : type,
      url: canonical,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
