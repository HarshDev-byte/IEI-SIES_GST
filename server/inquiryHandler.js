import { sendInquiryEmail } from './mailService.js';

export async function handleInquiryRequest(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed. Use POST.' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const data = JSON.parse(body || '{}');
      const { name, email, query, category } = data;

      if (!name || !email || !query) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          error: 'Missing required fields: name, email, and query are mandatory.' 
        }));
        return;
      }

      // Basic email validation
      if (!email.includes('@')) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          error: 'Invalid institutional email address format.' 
        }));
        return;
      }

      // Dispatch inquiry via Mail service
      const result = await sendInquiryEmail({
        name: name.trim(),
        email: email.trim(),
        category: category || 'General Inquiry',
        query: query.trim()
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        message: `Inquiry successfully transmitted to Council Desk (${result.receiver}).`,
        timestamp: new Date().toISOString(),
        details: result
      }));
    } catch (err) {
      console.error('[Inquiry Handler Error]:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: 'Internal server error while processing council inquiry dispatch.' 
      }));
    }
  });
}
