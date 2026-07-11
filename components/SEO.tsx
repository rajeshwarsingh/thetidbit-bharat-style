import React from 'react';

/**
 * In the Next.js App Router, page <title>/<meta>/OpenGraph are emitted by each
 * route's `generateMetadata` (see lib/seo.ts). This component now only renders
 * JSON-LD structured data, so existing `<SEO schema={...}>` calls keep working.
 * Title/description/canonical props are accepted for backwards-compat and ignored.
 */
interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
  schema?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({ schema }) => {
  const schemaList = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  if (schemaList.length === 0) return null;
  return (
    <>
      {schemaList.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
};

export default SEO;
