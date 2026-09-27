import { sendInquiryEmail } from '../server/mailService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { name, email, query, category } = req.body || {};

    if (!name || !email || !query) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and query are mandatory.' 
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ 
        error: 'Invalid institutional email address format.' 
      });
    }

    const result = await sendInquiryEmail({
      name: name.trim(),
      email: email.trim(),
      category: category || 'General Inquiry',
      query: query.trim()
    });

    return res.status(200).json({
      success: true,
      message: `Inquiry successfully transmitted to Council Desk (${result.receiver}).`,
      timestamp: new Date().toISOString(),
      details: result
    });
  } catch (err) {
    console.error('[API Serverless Error]:', err);
    return res.status(500).json({ 
      error: 'Failed to dispatch council inquiry.' 
    });
  }
}
