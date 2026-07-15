/**
 * Semantic SEO content for TheTidbit.
 * Use for humans first — these strings weave entity language naturally.
 * Do NOT dump keyword lists into the UI.
 */
import { SITE_NAME, SITE_URL } from './seo';

/** Core brand entities Google / AI systems should associate with the site. */
export const BRAND_ENTITIES = {
  brand: SITE_NAME,
  brandAliases: ['The Tidbit Bags', 'TheTidbit India', 'TheTidbit Handmade Bags'],
  products: [
    'Handmade Jute Bags',
    'Round Sling Bags',
    "Women's Handbags",
    "Women's Sling Bags",
    'Premium Handbags',
    'Eco Friendly Bags',
    'Made in India Bags',
  ],
  business: [
    'Fashion Accessories Brand',
    'Handmade Bags Manufacturer',
    'Indian D2C Brand',
    'Corporate Gift Supplier',
  ],
} as const;

export const DEFAULT_META_DESCRIPTION =
  'Shop premium handmade jute bags for women from TheTidbit — eco-friendly sling bags, crossbody handbags and totes made in India. Stylish everyday bags with free shipping across India.';

export const HOME_META = {
  title: 'TheTidbit — Premium Handmade Jute Bags for Women | Made in India',
  description: DEFAULT_META_DESCRIPTION,
};

export const COLLECTIONS_META = {
  title: 'Handmade Bag Collections — Office, College, Travel & Gift',
  description:
    'Browse TheTidbit handmade collections: office bags for women, college sling bags, travel handbags, daily essentials and gift-ready jute bags. Premium made-in-India craft, free shipping.',
};

export const BULK_META = {
  title: 'Bulk Orders & Corporate Gifting — Handmade Bags',
  description:
    'Order handmade jute bags in bulk for corporate gifting, weddings and brand merchandise. Made in India, customisable colours, premium finish.',
};

export const ABOUT_META = {
  title: 'About TheTidbit — Handmade Bags Made in India',
  description:
    'TheTidbit is an Indian D2C brand crafting premium handmade jute handbags and eco-friendly sling bags with artisans across India.',
};

export const STORIES_META = {
  title: 'Stories — Handmade Bags, Jute Craft & Sustainable Fashion',
  description:
    'Read guides on handmade bags for women, jute handbags, eco-friendly fashion in India, styling tips and thoughtful gifting from TheTidbit.',
};

/** Org + brand graph for root layout (AI / Google entity recognition). */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: [...BRAND_ENTITIES.brandAliases],
    url: SITE_URL,
    logo: 'https://res.cloudinary.com/thetidbit23024/image/upload/v1765969614/canva-_logo-_bykbip.png',
    description: DEFAULT_META_DESCRIPTION,
    foundingLocation: {
      '@type': 'Country',
      name: 'India',
    },
    areaServed: 'IN',
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    knowsAbout: [
      ...BRAND_ENTITIES.products,
      'Sustainable Fashion',
      'Corporate Gifting',
      'Jute Handicrafts',
    ],
    sameAs: [
      'https://www.instagram.com/thetidbit.in/',
      'https://www.facebook.com/thetidbitin',
      'https://www.youtube.com/@Thetidbit.',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+91-9226740297',
      email: 'support@thetidbit.in',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_META_DESCRIPTION,
    publisher: { '@type': 'Organization', name: SITE_NAME },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/collections?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Product page description builder — prefers unique product copy. */
export function productMetaDescription(input: {
  name: string;
  displayName?: string;
  tagline?: string;
  description?: string;
  price: number;
  collection?: string;
}): string {
  if (input.description) {
    const trimmed = input.description.replace(/\s+/g, ' ').trim();
    const short = trimmed.length > 155 ? `${trimmed.slice(0, 152).trim()}…` : trimmed;
    return `${short} ₹${input.price}. Free shipping across India.`;
  }
  const bits = [
    input.displayName || input.name,
    input.tagline,
    'Premium handmade jute bag for women, made in India.',
    input.collection ? `Ideal for ${input.collection}.` : 'For daily use, office or gifting.',
    `₹${input.price}. Free shipping across India.`,
  ].filter(Boolean);
  return bits.join(' ').replace(/\s+/g, ' ').trim();
}

/** Collection chip copy — semantic labels from the strategy. */
export const COLLECTION_SEO: Record<
  string,
  { label: string; description: string; h1Hint: string }
> = {
  office: {
    label: 'Office Collection',
    description: 'Structured office bags for women — lightweight handmade handbags for workdays.',
    h1Hint: 'Office bags for women',
  },
  travel: {
    label: 'Travel Collection',
    description: 'Travel bags for women — crossbody and sling styles for easy journeys.',
    h1Hint: 'Travel handbags',
  },
  college: {
    label: 'College Collection',
    description: 'College bags for women — cute, trendy sling bags for campus life.',
    h1Hint: 'College handbags',
  },
  daily: {
    label: 'Daily Essentials',
    description: 'Everyday handbags and lightweight jute bags for daily use.',
    h1Hint: 'Everyday handbags',
  },
  gift: {
    label: 'Gift Collection',
    description: 'Gift bags for women — premium handmade handbags ready for gifting.',
    h1Hint: 'Gift handbags for women',
  },
};

export function collectionPageJsonLd(input: {
  name: string;
  description: string;
  url: string;
  products: { name: string; url: string; image?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: p.url.startsWith('http') ? p.url : `${SITE_URL}${p.url}`,
        name: p.name,
        ...(p.image ? { image: p.image } : {}),
      })),
    },
  };
}

/** Internal-link friendly FAQ answers for footer / about / homepage. */
export const SEO_FAQS: { q: string; a: string }[] = [
  {
    q: 'What kinds of bags does TheTidbit make?',
    a: 'TheTidbit designs premium handmade jute bags for women — including round sling bags, crossbody handbags, shoulder bags and tote styles. Every piece is made in India with eco-friendly materials.',
  },
  {
    q: 'Are TheTidbit bags good for office and college?',
    a: 'Yes. Lightweight handmade handbags work well as office bags for women and college bags for girls. Choose quieter classics for work and embroidered slings for campus or weekends.',
  },
  {
    q: 'Why choose handmade jute bags over synthetic handbags?',
    a: 'Handmade jute bags are breathable, durable and biodegradable. You get sustainable handbags with artisan craftsmanship — an affordable luxury alternative to disposable fashion bags.',
  },
  {
    q: 'Do you ship handmade bags across India?',
    a: 'Yes. We offer free shipping across India on TheTidbit handmade bags. Shop online and pay securely; WhatsApp support is available if you need help choosing a style.',
  },
  {
    q: 'Can I order bags for corporate gifting or bulk?',
    a: 'Yes. TheTidbit supplies handmade bags for corporate gifting, weddings and brand merchandise. Visit Bulk Orders to share quantity, colours and timeline.',
  },
  {
    q: 'What price range are TheTidbit handbags in?',
    a: 'Most TheTidbit handbags are thoughtfully priced under ₹1000 — premium handmade bags that feel special without luxury markups. Check Collections for current styles.',
  },
];

/** FAQPage JSON-LD — emit only on pages that show these FAQs visibly. */
export function faqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SEO_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
