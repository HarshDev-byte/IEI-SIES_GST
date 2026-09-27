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
          const { handleInquiryRequest } = await import('./server/inquiryHandler.js');
          handleInquiryRequest(req, res);
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/IEI-SIES_GST/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    watch: {
      ignored: ['**/data/**']
    }
  },
  plugins: [
    tailwindcss(),
    react(),
    inquiryApiPlugin()
  ],
});

