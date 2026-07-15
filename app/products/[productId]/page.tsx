import type { Metadata } from 'next';
import ProductDetail from '../../../components/ProductDetail';
import { buildMetadata } from '../../../lib/seo';
import { productMetaDescription } from '../../../lib/seo-content';
import { CATALOGS, CATALOG_COLLECTION } from '../../../data/catalogs';

/** Only the catalog slugs are valid product routes — anything else 404s. */
export const dynamicParams = false;

/** Statically generate a route for every catalog (own SEO-friendly slug). */
export function generateStaticParams() {
  return CATALOGS.map((p) => ({ productId: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = CATALOGS.find((p) => p.id === productId);
  if (!product) {
    return buildMetadata({ title: 'Product', description: 'TheTidbit product', path: `/products/${productId}`, noindex: true });
  }
  const collection = CATALOG_COLLECTION[product.id];
  return buildMetadata({
    title: product.name,
    description: productMetaDescription({
      name: product.name,
      displayName: product.displayName,
      tagline: product.tagline,
      description: product.description,
      price: product.price,
      collection,
    }),
    path: `/products/${product.id}`,
    image: product.colors[0]?.images[0],
    type: 'product',
    keywords: [
      'handmade jute bags',
      'handmade bags for women',
      'made in India handbags',
      product.shape || 'sling bag',
    ],
  });
}

export default function Page() {
  return <ProductDetail />;
}
