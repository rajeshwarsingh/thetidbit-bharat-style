/**
 * Generate RSS 2.0 feed for TheTidbit stories / blog posts.
 * Uses shared story loader so canonical /blog paths stay in sync with sitemaps.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { rootDir, BASE_URL, loadStories } from './sitemap-data.mjs';

const SITE_NAME = 'TheTidbit';
const SITE_DESCRIPTION =
  'Eco-friendly, artistic, handmade jute bags by TheTidbit. Sustainable fashion for the modern boho soul.';

function formatRSSDate(dateString) {
  return new Date(dateString).toUTCString();
}

function escapeXML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateRSSFeed(stories) {
  const now = new Date();
  const buildDate = formatRSSDate(now.toISOString());
  const latestStories = [...stories]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 10);

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXML(SITE_NAME)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXML(SITE_DESCRIPTION)}</description>
    <language>en-IN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://res.cloudinary.com/thetidbit23024/image/upload/v1765969614/canva-_logo-_bykbip.png</url>
      <title>${escapeXML(SITE_NAME)}</title>
      <link>${BASE_URL}</link>
    </image>
`;

  for (const story of latestStories) {
    const storyUrl = story.url || `${BASE_URL}/stories/${story.slug}`;
    const pubDate = formatRSSDate(story.publishDate);

    rss += `    <item>
      <title>${escapeXML(story.title)}</title>
      <link>${storyUrl}</link>
      <guid isPermaLink="true">${storyUrl}</guid>
      <description>${escapeXML(story.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>TheTidbit</dc:creator>
      <media:content url="${story.heroImage}" type="image/jpeg" medium="image">
        <media:title>${escapeXML(story.title)}</media:title>
      </media:content>
      <content:encoded><![CDATA[
        <img src="${story.heroImage}" alt="${escapeXML(story.title)}" />
        <p>${escapeXML(story.excerpt)}</p>
        <p><a href="${storyUrl}">Read more...</a></p>
      ]]></content:encoded>
    </item>
`;
  }

  rss += `  </channel>
</rss>`;

  const publicDir = join(rootDir, 'public');
  await mkdir(publicDir, { recursive: true });
  await writeFile(join(rootDir, 'feed.xml'), rss, 'utf8');
  await writeFile(join(publicDir, 'feed.xml'), rss, 'utf8');
  console.log(`✓ Generated feed.xml with ${latestStories.length} items`);
}

async function main() {
  try {
    console.log('Generating RSS feed...\n');
    const stories = await loadStories();
    console.log(`✓ Loaded ${stories.length} stories\n`);
    await generateRSSFeed(stories);
    console.log('\n✓ RSS feed generated successfully!');
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  }
}

main();
