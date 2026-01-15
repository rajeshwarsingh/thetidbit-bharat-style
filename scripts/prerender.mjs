import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const routes = ['/', '/about', '/story', '/track'];

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');
const template = await readFile(templatePath, 'utf8');

const { render } = await import(path.join(distDir, 'server', 'entry-server.js'));

function inject(templateHtml, { appHtml, head }) {
  let out = templateHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  // Inject head tags produced by react-helmet-async (title/meta/link/script)
  out = out.replace('</head>', `${head}\n</head>`);
  return out;
}

for (const route of routes) {
  const { appHtml, head } = render(route);
  const html = inject(template, { appHtml, head });

  if (route === '/') {
    await writeFile(path.join(distDir, 'index.html'), html, 'utf8');
    continue;
  }

  const dir = path.join(distDir, route.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html, 'utf8');
}



