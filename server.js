import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleInquiryRequest } from './server/inquiryHandler.js';

try {
  process.loadEnvFile();
} catch (_) {}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Handle Backend API route
  if (req.url === '/api/inquiry' || req.url?.startsWith('/api/inquiry')) {
    handleInquiryRequest(req, res);
    return;
  }

  // Serve static files from dist in production
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA Fallback to index.html
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (indexErr, content) => {
        if (indexErr) {
          res.statusCode = 404;
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        }
      });
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.statusCode = 500;
        res.end('Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`[IEI SIES GST Server] Backend active on port ${PORT}`);
  console.log(`[Inquiry Endpoint] POST http://localhost:${PORT}/api/inquiry`);
});
