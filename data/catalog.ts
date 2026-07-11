/**
 * TheTidbit Catalog Engine (bulk / made-to-order model)
 * ------------------------------------------------------------------
 * Every product is a standalone catalog (see data/catalogs.ts) with its own
 * URL and NO colour variants. All items are made-to-order / bulk — shown with
 * "Made on Demand" badges and a Request Quote flow (there is no in-stock
 * "Buy Now" / Signature focus in this model).
 * ------------------------------------------------------------------
 */
import { getProductDetailUrl, ALL_PRODUCTS as BASE_PRODUCTS } from '../constants';
import { CATALOGS, CATALOG_COLLECTION } from './catalogs';
import { CatalogItem, CollectionTag, ProductColor, ProductDetails } from '../types';

/** Default MOQ for made-on-demand / bulk items. */
export const DEFAULT_MOQ = 5;

/** Lifestyle collections shown as Featured Categories & filter chips. */
export const COLLECTIONS: { id: CollectionTag; label: string; description: string }[] = [
  { id: 'office',  label: 'Office Collection',   description: 'Structured bags for the workday.' },
  { id: 'travel',  label: 'Travel Collection',   description: 'Roomy companions for every journey.' },
  { id: 'college', label: 'College Collection',  description: 'Lightweight slings for campus days.' },
  { id: 'daily',   label: 'Everyday Collection', description: 'Effortless carry, morning to night.' },
  { id: 'gift',    label: 'Gift Collection',     description: 'Beautifully giftable, ready to gift.' },
];

function toCatalogItem(product: ProductDetails): CatalogItem {
  const color = product.colors[0];
  const image = color?.images[0] || color?.images[1] || '';
  return {
    key: product.id,
    product,
    color,
    productId: product.id,
    colorId: color?.id ?? 'default',
    name: product.name,
    shortName: product.name,
    price: product.price,
    mrp: product.mrp,
    discountPercentage: product.discountPercentage,
    image,
    images: color?.images ?? [],
    // The curated catalog is retail: in stock and directly buyable.
    featured: true,
    fulfillment: 'in-stock',
    moq: undefined,
    badges: ['Ready to Ship'],
    category: product.category,
    collection: CATALOG_COLLECTION[product.id] ?? 'daily',
    url: getProductDetailUrl(product.id),
  };
}

/** Every catalog item (all made-to-order). */
export function getAllCatalogItems(): CatalogItem[] {
  return CATALOGS.map(toCatalogItem);
}

/** Made-on-demand pool === the whole catalog in this model. */
export function getMadeOnDemandItems(): CatalogItem[] {
  return getAllCatalogItems();
}

/**
 * No in-stock "Signature" set in the bulk-only model. Kept for backwards
 * compatibility with components that still import it — returns [].
 */
export function getSignatureItems(): CatalogItem[] {
  return [];
}

/** Resolve a single catalog item by product id. */
export function getCatalogItem(productId: string, _colorId?: string | null): CatalogItem | null {
  const product = CATALOGS.find((p) => p.id === productId);
  return product ? toCatalogItem(product) : null;
}

/** Items filtered by lifestyle collection. */
export function getItemsByCollection(collection: CollectionTag): CatalogItem[] {
  return getAllCatalogItems().filter((i) => i.collection === collection);
}

/** Related items (exclude a given product). */
export function getRelatedItems(excludeId?: string, limit = 4): CatalogItem[] {
  return getAllCatalogItems()
    .filter((i) => i.productId !== excludeId)
    .slice(0, limit);
}

/* ------------------------------------------------------------------ *
 * Full bulk range — every original base product AND every colour
 * variation. These are browse-only, made-to-order items shown on the
 * Bulk Orders page (no individual product pages — Request Quote only).
 * ------------------------------------------------------------------ */

function variantItem(product: ProductDetails, color: ProductColor): CatalogItem {
  return {
    key: `${product.id}:${color.id}`,
    product,
    color,
    productId: product.id,
    colorId: color.id,
    name: `${product.name} - ${color.name}`,
    shortName: `${product.name} - ${color.name}`,
    price: product.price,
    mrp: product.mrp,
    discountPercentage: product.discountPercentage,
    image: color.images[0] || color.images[1] || '',
    images: color.images,
    featured: false,
    fulfillment: 'made-on-demand',
    moq: DEFAULT_MOQ,
    badges: ['Made on Demand', `MOQ ${DEFAULT_MOQ}`],
    category: product.category,
    collection: 'daily',
    url: '', // no individual page — bulk browse only
  };
}

/** The full range grouped by base product (all colour variations). */
export function getBulkGroups(): { product: ProductDetails; items: CatalogItem[] }[] {
  return BASE_PRODUCTS.map((product) => ({
    product,
    items: product.colors.map((color) => variantItem(product, color)),
  }));
}

/** Flat list of every base-product variant (for counts / search). */
export function getBulkVariantItems(): CatalogItem[] {
  return getBulkGroups().flatMap((g) => g.items);
}
