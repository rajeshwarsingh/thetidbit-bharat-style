/**
 * TheTidbit — Catalog (retail)
 * ------------------------------------------------------------------
 * A fixed set of standalone catalogs. NO colour variants — each entry is its
 * own product with its own URL, in stock and directly buyable (online payment or
 * WhatsApp). Bulk / all colour variations live on the /bulk page.
 *
 * ⭐ To edit: change CATALOG_DEFS below.
 *    - `slug`   → the SEO URL becomes /products/<slug>
 *    - `name`   → metadata / schema title
 *    - `displayName` → scannable H1 on the product page
 *    - `description` → unique on-page + Product schema copy
 *    - `price`  → selling price (mrp defaults to price = no strike-through)
 * ------------------------------------------------------------------
 */
import { ProductDetails, CollectionTag } from '../types';
import { PRODUCT, SLING_BAG_PRODUCT_1, SLING_BAG_PRODUCT_2, HANDBAG_PRODUCT } from '../constants';

interface CatalogDef {
  slug: string;
  name: string;
  displayName: string;
  description: string;
  features: string[];
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

const ROUND_FEATURES_BASE = [
  'Round silhouette with colourful hand embroidery',
  'Natural jute body — breathable and biodegradable',
  'Adjustable strap for shoulder or crossbody wear',
  'Secure zip closure for daily essentials',
  'Lightweight enough for all-day Indian heat',
];

/** ⭐⭐⭐  THE CATALOG — edit freely  ⭐⭐⭐ */
const CATALOG_DEFS: CatalogDef[] = [
  {
    slug: 'round-sling-blue',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Blue',
    displayName: 'Round Sling Bag in Blue',
    price: 474, collection: 'daily', source: PRODUCT, colorId: 'blue',
    tagline: 'Everyday blue embroidered crossbody',
    description:
      'A blue handmade jute round sling for women who want colour without bulk. The compact circle holds phone, wallet, keys and lipstick, while the adjustable strap sits comfortably for office metros, evening walks and weekend markets. Embroidered detailing keeps it festive enough for casual outings yet practical for daily use — a classic TheTidbit everyday handbag made in India.',
    features: [
      ...ROUND_FEATURES_BASE,
      'Calm blue palette that pairs with denim, kurtas and workwear',
    ],
  },
  {
    slug: 'round-sling-red',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Red',
    displayName: 'Round Sling Bag in Red',
    price: 474, collection: 'daily', source: PRODUCT, colorId: 'red',
    tagline: 'Festive red embroidered crossbody',
    description:
      'This red round sling bag is for days when you want a handmade handbag that stands out. Natural jute keeps the piece lightweight, while bold embroidery adds celebration energy for family gatherings, temple visits and city evenings. Wear it crossbody hands-free, or shorten the strap for a shoulder carry — an affordable statement bag that still feels premium.',
    features: [
      ...ROUND_FEATURES_BASE,
      'Rich red that elevates plain neutrals and festive outfits',
    ],
  },
  {
    slug: 'round-sling-pink',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Pink',
    displayName: 'Round Sling Bag in Pink',
    price: 474, collection: 'gift', source: PRODUCT, colorId: 'pink',
    tagline: 'Gift-ready pink embroidered crossbody',
    description:
      'Soft pink embroidery on natural jute makes this round sling a favourite gift handbag for women. It feels thoughtful without being impractical — room for daily essentials, an adjustable strap, and eco-friendly materials. Ideal for birthdays, college farewells or a small self-treat when you want a cute handmade bag under ₹500.',
    features: [
      ...ROUND_FEATURES_BASE,
      'Soft pink finish that photographs beautifully for gifting',
    ],
  },
  {
    slug: 'round-sling-sand',
    name: 'TheTidbit Round Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Sand',
    displayName: 'Round Sling Bag in Sand',
    price: 474, collection: 'daily', source: PRODUCT, colorId: 'skin-orange',
    tagline: 'Neutral sand embroidered crossbody',
    description:
      'Sand is the quiet round sling — warm neutrals that slip into work-from-cafe days, travel days and light office looks. Handmade jute texture reads premium up close, while embroidery stays refined rather than loud. If you prefer minimal handbags that still feel crafted in India, this is the everyday carry to reach for.',
    features: [
      ...ROUND_FEATURES_BASE,
      'Sand-neutral colour that matches most wardrobes',
    ],
    images: [
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702395/ChatGPT_Image_Jul_10_2026_08_32_15_PM_ppocqo.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702399/brown2_t8wp9b.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1783702397/ChatGPT_Image_Jul_10_2026_08_32_30_PM_twjlrl.png',
    ],
  },
  {
    slug: 'butterfly-sling-blue',
    name: 'TheTidbit Butterfly Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Blue',
    displayName: 'Butterfly Sling Bag in Blue',
    price: 474, collection: 'gift', source: SLING_BAG_PRODUCT_2, colorId: 'butterfly-blue',
    tagline: 'Hand-woven butterfly motif in blue',
    description:
      'A blue butterfly sling bag for women who like a playful motif without plastic shine. Artisan weaving and embroidery turn natural jute into a gift-ready fashion accessory — light on the shoulder, roomy enough for daily carry, and distinctive enough that it does not look mass-produced. Made in India for everyday style and thoughtful gifting.',
    features: [
      'Signature butterfly motif woven and embroidered by hand',
      'Natural jute construction for eco-friendly everyday wear',
      'Crossbody-friendly adjustable strap',
      'Secure closure for phone, wallet and small essentials',
      'Blue pairing well with denim, white and summer cottons',
    ],
  },
  {
    slug: 'butterfly-sling-pink',
    name: 'TheTidbit Butterfly Sling Bag for Women | Handmade Jute Crossbody Bag | Embroidered Design | Pink',
    displayName: 'Butterfly Sling Bag in Pink',
    price: 474, collection: 'gift', source: SLING_BAG_PRODUCT_2, colorId: 'butterfly-pink',
    tagline: 'Hand-woven butterfly motif in pink',
    description:
      'Pink butterfly embroidery on jute makes this sling feel special for college days, brunches and gifts. It stays lightweight in heat, carries the essentials, and shows clear handmade character — the kind of women’s handbag friends notice. Choose it when you want eco-friendly style that still feels feminine and fun.',
    features: [
      'Hand-finished butterfly motif with pink detailing',
      'Biodegradable jute body and breathable feel',
      'Adjustable strap for crossbody or shoulder carry',
      'Compact interior sized for daily essentials',
      'Gift-friendly silhouette under ₹500',
    ],
  },
  {
    slug: 'evil-eye-sling-blue',
    name: 'TheTidbit Evil Eye Sling Bag for Women | Handmade Jute Crossbody Bag | Blue',
    displayName: 'Evil Eye Sling Bag in Blue',
    price: 474, collection: 'travel', source: HANDBAG_PRODUCT, colorId: 'evil-eye-blue',
    tagline: 'Evil-eye charm • Travel crossbody',
    description:
      'Designed as a travel-friendly blue sling, this evil-eye piece keeps hands free on station platforms and weekend city walks. The protective motif reads modern ethnic without heavy ornament; the jute body stays light while the zip keeps tickets and phone secure. A made-in-India crossbody for women who want character on the move.',
    features: [
      'Blue evil-eye charm motif with handmade detailing',
      'Hands-free crossbody strap for travel and commuting',
      'Natural jute — durable yet lightweight',
      'Zip security for documents, phone and wallet',
      'Compact profile that packs neatly into larger luggage',
    ],
    images: [
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1784143710/136_utrspf.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1784143710/137_vfce90.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1784143709/135_vfq8ua.png',
    ],
  },
  {
    slug: 'evil-eye-sling-pink',
    name: 'TheTidbit Evil Eye Sling Bag for Women | Handmade Jute Crossbody Bag | Pink',
    displayName: 'Evil Eye Sling Bag in Pink',
    price: 474, collection: 'travel', source: HANDBAG_PRODUCT, colorId: 'evil-eye-pink',
    tagline: 'Evil-eye charm • Soft pink crossbody',
    description:
      'The pink evil-eye sling blends soft colour with a protective motif — ideal when you want a travel bag that still feels styled. Handmade jute keeps it eco-friendly and breathable; the crossbody fit works for airports, day trips and leisurely shopping. An expressive women’s handbag that does not need a second bag underneath.',
    features: [
      'Pink evil-eye motif with artisan finishing',
      'Adjustable crossbody strap for active days',
      'Eco-friendly jute build made in India',
      'Secure zip for on-the-go essentials',
      'Soft palette that suits casual and festive layers',
    ],
    images: [
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1750772667/uzzcoikblxgtmoysvqok.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1750772541/oqvn4slgydof8kopfo6e.png',
      'https://res.cloudinary.com/thetidbit23024/image/upload/v1768463875/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/117_mwm6aw.png',
    ],
  },
  {
    slug: 'woven-sling-black',
    name: 'TheTidbit Woven Sling Bag for Women | Handmade Jute Crossbody Bag | Black',
    displayName: 'Woven Sling Bag in Black',
    price: 514, collection: 'daily', source: SLING_BAG_PRODUCT_1, colorId: 'black-wave',
    tagline: 'Hand-woven black jute crossbody',
    description:
      'Black woven jute is the daily uniform bag — understated, textured and easy to style with office wear or western casuals. The hand-woven surface catches light differently from flat printed bags, so it still feels premium up close. A reliable everyday handbag when you want handmade quality without loud colour.',
    features: [
      'Dark woven jute texture with a refined finish',
      'Crossbody strap suited to commuting and errands',
      'Room for phone, cards, keys and compact pouch',
      'Neutral black that works with most outfits',
      'Durable handmade construction made in India',
    ],
  },
  {
    slug: 'classic-sling-blue-wave',
    name: 'TheTidbit Classic Sling Bag for Women | Handmade Jute Crossbody Bag | Blue Wave',
    displayName: 'Classic Sling Bag — Blue Wave',
    price: 514, collection: 'daily', source: SLING_BAG_PRODUCT_1, colorId: 'blue-wave',
    tagline: 'Eco-friendly classic blue-wave crossbody',
    description:
      'The blue-wave classic sling is a clean silhouette for women who prefer modern handmade bags over trend pieces. Soft wave patterning on jute keeps it interesting while remaining versatile for daily wear. Lightweight, made in India, and priced for regular use — a dependable eco-friendly handbag for work-from-anywhere weeks.',
    features: [
      'Classic silhouette with blue-wave detailing',
      'Breathable natural jute for warm climates',
      'Adjustable strap for shoulder or crossbody',
      'Everyday capacity without bulk',
      'Sustainable alternative to synthetic fashion bags',
    ],
  },
  {
    slug: 'chain-sling-yellow',
    name: 'TheTidbit Chain Sling Bag for Women | Handmade Jute Shoulder Bag | Yellow',
    displayName: 'Chain Sling Bag in Yellow',
    price: 569, collection: 'college', source: SLING_BAG_PRODUCT_1, colorId: 'yellow-mate',
    tagline: 'Chain strap college shoulder bag',
    description:
      'Sunshine yellow with a chain strap gives this sling real campus energy. Carry it as a college bag for women who want something lighter than a backpack but more put-together than a pouch. Handmade jute keeps it grounded and eco-friendly; the chain detail adds a fashion edge for lectures, cafes and late-evening hangouts.',
    features: [
      'Statement chain strap with handmade jute body',
      'Yellow finish that brightens jeans and whites',
      'Shoulder or crossbody options for campus carry',
      'Sized for phone, wallet, small notebook and lip balm',
      'Distinctive college-friendly silhouette',
    ],
  },
  {
    slug: 'jute-tote-purple',
    name: 'TheTidbit Jute Tote Bag for Women | Spacious Everyday Shoulder Bag | Purple',
    displayName: 'Jute Tote Bag in Purple',
    price: 569, collection: 'office', source: HANDBAG_PRODUCT, colorId: 'purple-white',
    tagline: 'Spacious purple everyday office tote',
    description:
      'When a sling is too small, this purple jute tote opens up your day. It carries a slim laptop sleeve, diary, water bottle and lunch without looking oversized. Soft purple-and-white detailing stays office-appropriate while still feeling handmade. A structured everyday tote for women who want eco-friendly bags that work from desk to commute.',
    features: [
      'Open tote capacity for office and errand days',
      'Natural jute with purple accent detailing',
      'Comfortable shoulder carry for heavier loads',
      'No fringe — clean lines for professional settings',
      'Made in India for durable everyday use',
    ],
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

/** Short labels for footer / story deep links (Signature Collection). */
export const SIGNATURE_PRODUCT_LINKS = CATALOG_DEFS.map((d) => ({
  id: d.slug,
  label: d.displayName,
  href: `/products/${d.slug}`,
}));

/** The standalone catalog products (no colour variants). */
export const CATALOGS: ProductDetails[] = CATALOG_DEFS.map((d) => {
  const c = d.source.colors.find((x) => x.id === d.colorId) || d.source.colors[0];
  const images = d.images && d.images.length ? d.images : c.images;
  const mrp = d.mrp ?? d.price;
  return {
    id: d.slug,
    brand: 'TheTidbit',
    name: d.name,
    displayName: d.displayName,
    description: d.description,
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
    features: d.features,
    colors: [{ name: d.displayName, id: 'default', hex: c.hex, images }],
  };
});

export function getCatalogById(id: string): ProductDetails | undefined {
  return CATALOGS.find((p) => p.id === id);
}
