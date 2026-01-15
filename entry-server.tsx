import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { AppFrame } from './AppFrame';

export function render(url: string) {
  const helmetContext: any = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppFrame enableAnalytics={false} />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const head = [
    helmet?.title?.toString?.() ?? '',
    helmet?.meta?.toString?.() ?? '',
    helmet?.link?.toString?.() ?? '',
    helmet?.script?.toString?.() ?? '',
  ].join('\n');

  return { appHtml, head };
}


