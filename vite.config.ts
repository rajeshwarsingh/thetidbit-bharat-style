import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { processTrackCourierRequest } from './api/trackcourier';
import { processTrackByMobileRequest } from './api/track-by-mobile';
import { processAdminTrackingMapRequest } from './api/admin/tracking-map';

export default defineConfig(({ mode, isSsrBuild }) => {
    const env = loadEnv(mode, '.', '');
    const isSSR = Boolean(isSsrBuild);
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'bharat-style:trackcourier-dev-api',
          configureServer(server) {
            const register = (route: string, handler: (args: { method: string; query: any; body: any; headers: any }) => Promise<{ status: number; headers: Record<string, string>; json: any }>) => {
              server.middlewares.use(route, async (req, res) => {
                try {
                  const method = req.method ?? 'GET';

                  const url = new URL(req.url ?? route, 'http://localhost');
                  const query: Record<string, any> = {};
                  for (const [k, v] of url.searchParams.entries()) query[k] = v;

                  let body: any = undefined;
                  if (method === 'POST') {
                    const chunks: Buffer[] = [];
                    await new Promise<void>((resolve) => {
                      req.on('data', (c) => chunks.push(Buffer.from(c)));
                      req.on('end', () => resolve());
                    });
                    const raw = Buffer.concat(chunks).toString('utf8');
                    if (raw) {
                      try {
                        body = JSON.parse(raw);
                      } catch {
                        body = raw;
                      }
                    }
                  }

                  const out = await handler({ method, query, body, headers: req.headers });
                  res.statusCode = out.status;
                  res.setHeader('content-type', 'application/json; charset=utf-8');
                  for (const [k, v] of Object.entries(out.headers)) res.setHeader(k, v);
                  res.end(JSON.stringify(out.json));
                } catch (e: any) {
                  res.statusCode = 500;
                  res.setHeader('content-type', 'application/json; charset=utf-8');
                  res.end(JSON.stringify({ error: String(e?.message ?? e) }));
                }
              });
            };

            register('/api/trackcourier', async ({ method, query, body }) => processTrackCourierRequest({ method, query, body }));
            register('/api/track-by-mobile', async ({ method, query, body }) => processTrackByMobileRequest({ method, query, body }));
            register('/api/admin/tracking-map', async ({ method, query, body, headers }) =>
              processAdminTrackingMapRequest({ method, query, body, headers })
            );
          },
        },
      ],
      ssr: {
        // Fix Node ESM execution during prerendering (react-helmet-async is CJS in Node)
        noExternal: ['react-helmet-async'],
      },
      // Only chunk-split client bundles. SSR build treats many deps as external.
      ...(isSSR
        ? {}
        : {
            build: {
              rollupOptions: {
                output: {
                  manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    icons: ['lucide-react'],
                  },
                },
              },
            },
          }),
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
