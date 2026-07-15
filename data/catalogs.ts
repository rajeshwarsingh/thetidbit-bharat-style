/**
 * TheTidbit — Catalog (retail)
 * ------------------------------------------------------------------
 * A fixed set of standalone catalogs. NO colour variants — each entry is its
 * own product with its own URL, in stock and directly buyable (PhonePe or
 * WhatsApp). Bulk / all colour variations live on the /bulk page.
 *
 * ⭐ To edit: change CATALOG_DEFS below.
 *    - `slug`   → the SEO URL becomes /products/<slug>
 *    - `name`   → the full product title (shown everywhere)
 *    - `price`  → selling price (mrp defaults to price = no strike-through)
 *    - imagery is sourced from an existing base product's colour until you
 *      add real photos (swap `source`/`colorId`, or set explicit `images`).
 * ------------------------------------------------------------------
 */
import { ProductDetails, CollectionTag } from '../types';
import { PRODUCT, SLING_BAG_PRODUCT_1, SLING_BAG_PRODUCT_2, HANDBAG_PRODUCT } from '../constants';

interface CatalogDef {
  slug: string;
  name: string;
  price: number;
  mrp?: number;
  collection: CollectionTag;
  /** Reuse imagery from an existing base product's colour. */
  source: ProductDetails;
  colorId: string;
  /** Optional explicit image override (first is primary). */
  images?: string[];
  tagline?: string;
}

/** ⭐⭐⭐  THE CATALOG — edit freely  ⭐⭐⭐ */
const CATALOG_DEFS: CatalogDef[] = [
  {
    slug: 'round-sling-blue',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Blue',
    price: 474, collection: 'daily', source: PRODUCT, colorId: 'blue',
    tagline: 'Handmade jute crossbody • Embroidered',
  },
  {
    slug: 'round-sling-red',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Red',
    price: 474, collection: 'daily', source: PRODUCT, colorId: 'red',
    tagline: 'Handmade jute crossbody • Embroidered',
  },
  {
    slug: 'round-sling-pink',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Pink',
    price: 474, collection: 'gift', source: PRODUCT, colorId: 'pink',
    tagline: 'Handmade jute crossbody • Embroidered',
  },
  {
    slug: 'round-sling-sand',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Sand',
    price: 474, collection: 'daily', source: PRODUCT, colorId: 'skin-orange',
    tagline: 'Handmade jute crossbody • Embroidered',
    images: [
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702395/ChatGPT_Image_Jul_10_2026_08_32_15_PM_ppocqo.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702399/brown2_t8wp9b.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702397/ChatGPT_Image_Jul_10_2026_08_32_30_PM_twjlrl.png',
    ],
  },
  {
    slug: 'butterfly-sling-blue',
    name: 'TheTidbit Butterfly Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Blue',
    price: 474, collection: 'gift', source: SLING_BAG_PRODUCT_2, colorId: 'butterfly-blue',
    tagline: 'Hand-woven butterfly motif',
  },
  {
    slug: 'butterfly-sling-pink',
    name: 'TheTidbit Butterfly Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Pink',
    price: 474, collection: 'gift', source: SLING_BAG_PRODUCT_2, colorId: 'butterfly-pink',
    tagline: 'Hand-woven butterfly motif',
  },
  {
    slug: 'evil-eye-sling-blue',
    name: 'TheTidbit Evil Eye Sling Bag for Women | Handmade Jute Crossbody Bag | Blue',
    price: 474, collection: 'travel', source: HANDBAG_PRODUCT, colorId: 'evil-eye-blue',
    tagline: 'Evil-eye charm • Crossbody',
    images: [
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1784143710/136_utrspf.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1784143710/137_vfce90.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1784143709/135_vfq8ua.png',
    ],
  },
  {
    slug: 'evil-eye-sling-pink',
    name: 'TheTidbit Evil Eye Sling Bag for Women | Handmade Jute Crossbody Bag | Pink',
    price: 474, collection: 'travel', source: HANDBAG_PRODUCT, colorId: 'evil-eye-pink',
    tagline: 'Evil-eye charm • Crossbody',
    images: [
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1750772667/uzzcoikblxgtmoysvqok.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1750772541/oqvn4slgydof8kopfo6e.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1768463875/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/117_mwm6aw.png',
    ],
  },
  {
    slug: 'woven-sling-black',
    name: 'TheTidbit Woven Sling Bag for Women | Handmade Jute Crossbody Bag | Black',
    price: 514, collection: 'daily', source: SLING_BAG_PRODUCT_1, colorId: 'black-wave',
    tagline: 'Hand-woven jute • Crossbody',
  },
  {
    slug: 'classic-sling-blue-wave',
    name: 'TheTidbit Classic Sling Bag for Women | Handmade Jute Crossbody Bag | Blue Wave',
    price: 514, collection: 'daily', source: SLING_BAG_PRODUCT_1, colorId: 'blue-wave',
    tagline: 'Eco-Friendly • Handmade • Classic Crossbody Bag',
  },
  {
    slug: 'chain-sling-yellow',
    name: 'TheTidbit Chain Sling Bag for Women | Handmade Jute Shoulder Bag | Yellow',
    price: 569, collection: 'college', source: SLING_BAG_PRODUCT_1, colorId: 'yellow-mate',
    tagline: 'Chain strap • Shoulder bag',
  },
  {
    slug: 'jute-tote-purple',
    name: 'TheTidbit Jute Tote Bag for Women | Spacious Everyday Shoulder Bag | Purple',
    price: 569, collection: 'office', source: HANDBAG_PRODUCT, colorId: 'purple-white',
    tagline: 'Spacious everyday tote',
    images: [
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702395/purple_white1_yzbsl0.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702406/ChatGPT_Image_Jul_10_2026_08_33_29_PM_p5esor.png',
    ],
  },
];

const disc = (mrp: number, price: number) => (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

/** Per-catalog lifestyle collection, keyed by product id (slug). */
export const CATALOG_COLLECTION: Record<string, CollectionTag> = Object.fromEntries(
  CATALOG_DEFS.map((d) => [d.slug, d.collection])
);

/** The standalone catalog products (no colour variants). */
export const CATALOGS: ProductDetails[] = CATALOG_DEFS.map((d) => {
  const c = d.source.colors.find((x) => x.id === d.colorId) || d.source.colors[0];
  const images = d.images && d.images.length ? d.images : c.images;
  const mrp = d.mrp ?? d.price;
  return {
    id: d.slug,
    brand: 'TheTidbit',
    name: d.name,
    tagline: d.tagline ?? d.source.tagline,
    price: d.price,
    mrp,
    discountPercentage: disc(mrp, d.price),
    category: d.source.category,
    material: d.source.material,
    shape: d.source.shape,
    dimensions: d.source.dimensions,
    weight: d.source.weight,
    origin: d.source.origin,
    returnPolicy: d.source.returnPolicy,
    delivery: d.source.delivery,
    features: d.source.features,
    colors: [{ name: d.name, id: 'default', hex: c.hex, images }],
  };
});

export function getCatalogById(id: string): ProductDetails | undefined {
  return CATALOGS.find((p) => p.id === id);
}
