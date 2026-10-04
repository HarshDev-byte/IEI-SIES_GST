import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function inquiryApiPlugin() {
  return {
    name: 'inquiry-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/inquiry' || req.url?.startsWith('/api/inquiry')) {
          // Use the same handler as Vercel serverless (api/inquiry.js)
          // Adapt Node's IncomingMessage to Vercel-style req/res
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            // Build a minimal Vercel-style res wrapper
            const vercelRes = {
              _status: 200,
              _headers: {},
              status(code) { this._status = code; return this; },
              setHeader(k, v) { res.setHeader(k, v); return this; },
              json(data) {
                res.statusCode = this._status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              end() { res.statusCode = this._status; res.end(); }
            };
            const { default: handler } = await import('./api/inquiry.js');
            await handler(req, vercelRes);
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/gsap/')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
        }
      }
    }
  },
  plugins: [
    tailwindcss(),
    react(),
    inquiryApiPlugin()
  ],
});

