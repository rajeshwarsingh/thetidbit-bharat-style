export interface ProductColor {
  name: string;
  hex: string;
  id: string;
  images: string[]; // Index 0: Model/Lifestyle, Index 1: Product Shot, Index 2: Flat Lay
}

/** How an item is fulfilled. Signature items ship fast; the rest are produced on demand. */
export type Fulfillment = 'in-stock' | 'made-on-demand';

/** Marketing lifestyle collection a variant belongs to (for Featured Categories & filters). */
export type CollectionTag = 'office' | 'travel' | 'daily' | 'college' | 'gift';

/**
 * A resolved (product + specific colour) treated as a single sellable item.
 * The Signature Collection is a hand-picked set of these; everything else is Made on Demand.
 */
export interface CatalogItem {
  /** Stable identity `${productId}:${colorId}` */
  key: string;
  product: ProductDetails;
  color: ProductColor;
  productId: string;
  colorId: string;
  /** Display name, e.g. "Handmade Jute Round Sling — Ruby Red" */
  name: string;
  /** Base product name without the colour */
  shortName: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  image: string;
  images: string[];
  featured: boolean;
  fulfillment: Fulfillment;
  /** Minimum order quantity for made-on-demand / bulk items */
  moq?: number;
  /** Short marketing badges e.g. ["Best Seller", "Limited Stock"] or ["Made on Demand", "MOQ 5"] */
  badges: string[];
  category: string[];
  collection: CollectionTag;
  /** SEO-friendly product URL for this variant */
  url: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  tag?: string;
}

export interface ProductDetails {
  id: string;
  brand: string;
  name: string;
  /** Short H1-friendly title (optional; falls back to name). */
  displayName?: string;
  tagline: string;
  /** Unique natural-language product description for PDP + schema. */
  description?: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  category: string[];
  material: string;
  shape: string;
  dimensions: string;
  weight: string;
  origin: string;
  returnPolicy: string;
  delivery: string;
  features: string[];
  colors: ProductColor[];
}