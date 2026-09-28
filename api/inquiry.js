// ============================================================
// Vercel Serverless Function: /api/inquiry
// Handles council inquiry form submissions & dispatches email
// ============================================================
import nodemailer from 'nodemailer';

function getReceiverEmail() {
  return (
    process.env.COUNCIL_RECEIVER_EMAIL ||
    process.env.MEMBERSHIP_INQUIRY_EMAIL ||
    'iei@siesgst.ac.in'
  );
}

function generateRefId() {
  return `IEI-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
}

function formatEmail({ name, email, category, query, refId }) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const subject = `[IEI SIES GST] New ${category || 'Membership'} Inquiry — ${name} (${refId})`;

  const text = [
    `==================================================`,
    `IEI SIES GST CHAPTER — INCOMING INQUIRY DISPATCH`,
    `==================================================`,
    `Reference ID: ${refId}`,
    `Received At:  ${timestamp} IST`,
    `Category:     ${category}`,
    ``,
    `APPLICANT DETAILS:`,
    `- Name:                ${name}`,
    `- Institutional Email: ${email}`,
    ``,
    `MESSAGE / INQUIRY BODY:`,
    `--------------------------------------------------`,
    query,
    `--------------------------------------------------`,
    ``,
    `Note: Replying to this email will reply directly to ${email}.`,
    `Institution of Engineers (India) — SIES GST Student Chapter`
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F4F5F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F5F8;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:620px;background:#FFFFFF;border-radius:16px;border:1px solid #E4E4E7;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
        <tr><td style="background:#0A0A0C;padding:24px 32px;border-bottom:2px solid #0062FF;">
          <span style="font-family:monospace;font-size:11px;font-weight:700;color:#00D6FF;letter-spacing:.1em;text-transform:uppercase;">THE INSTITUTION OF ENGINEERS (INDIA)</span>
          <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#FFF;letter-spacing:-.02em;">SIES Graduate School of Technology</h1>
          <span style="font-size:12px;color:#A1A1AA;font-family:monospace;">Student Chapter Secretariat · Communication Desk</span>
        </td></tr>
        <tr><td style="padding:24px 32px 12px;">
          <div style="display:inline-block;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:9999px;padding:4px 12px;font-family:monospace;font-size:11px;font-weight:700;color:#0062FF;">&#10022; INCOMING DISPATCH: ${category.toUpperCase()}</div>
          <h2 style="margin:12px 0 0;font-size:18px;font-weight:700;color:#09090B;">New Inquiry Received for Council Review</h2>
        </td></tr>
        <tr><td style="padding:12px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FAFAFC;border:1px solid #E4E4E7;border-radius:12px;padding:16px;">
            <tr><td style="padding:6px 0;font-size:13px;color:#71717A;width:140px;font-family:monospace;">Reference ID:</td><td style="padding:6px 0;font-size:13px;font-weight:700;color:#0062FF;font-family:monospace;">${refId}</td></tr>
            <tr><td style="padding:6px 0;font-size:13px;color:#71717A;font-family:monospace;">Full Name:</td><td style="padding:6px 0;font-size:13px;font-weight:700;color:#09090B;">${name}</td></tr>
            <tr><td style="padding:6px 0;font-size:13px;color:#71717A;font-family:monospace;">Institutional Email:</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#09090B;"><a href="mailto:${email}" style="color:#0062FF;">${email}</a></td></tr>
            <tr><td style="padding:6px 0;font-size:13px;color:#71717A;font-family:monospace;">Category:</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#09090B;">${category}</td></tr>
            <tr><td style="padding:6px 0;font-size:13px;color:#71717A;font-family:monospace;">Timestamp:</td><td style="padding:6px 0;font-size:12px;color:#52525B;">${timestamp} IST</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:12px 32px 24px;">
          <span style="display:block;font-family:monospace;font-size:11px;font-weight:700;color:#71717A;text-transform:uppercase;margin-bottom:8px;">Message / Inscribed Query:</span>
          <div style="background:#FFF;border:1px solid #D4D4D8;border-left:4px solid #0062FF;border-radius:8px;padding:16px 20px;font-size:14px;line-height:1.6;color:#27272A;white-space:pre-wrap;">${query}</div>
        </td></tr>
        <tr><td style="padding:0 32px 28px;">
          <a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;background:#0062FF;color:#FFF;font-weight:600;font-size:13px;padding:10px 20px;border-radius:8px;text-decoration:none;">Reply Directly to ${name} &rarr;</a>
        </td></tr>
        <tr><td style="background:#FAFAFC;padding:20px 32px;border-top:1px solid #E4E4E7;font-size:11px;color:#71717A;line-height:1.5;">
          <div style="font-weight:600;color:#09090B;margin-bottom:2px;">The Institution of Engineers (India) · SIES GST Collegiate Chapter</div>
          <div>Sector-V, Nerul, Navi Mumbai - 400706, Maharashtra, India</div>
          <div style="margin-top:6px;font-family:monospace;font-size:10px;color:#A1A1AA;">Automated Council Ingestion Dispatch · Reference: ${refId}</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  return { subject, text, html };
}

export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    const refId = generateRefId();
    const receiverEmail = getReceiverEmail();
    const { subject, text, html } = formatEmail({
      name: name.trim(),
      email: email.trim(),
      category: (category || 'General Inquiry').trim(),
      query: query.trim(),
      refId
    });

    // 1. Try SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"IEI SIES GST Council" <${process.env.SMTP_USER}>`,
        to: receiverEmail,
        replyTo: email.trim(),
        subject,
        text,
        html
      });

      return res.status(200).json({
        success: true,
        provider: 'smtp',
        messageId: info.messageId,
        receiver: receiverEmail,
        refId
      });
    }

    // 2. Try Resend
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'IEI SIES GST <onboarding@resend.dev>',
          to: [receiverEmail],
          reply_to: email.trim(),
          subject,
          html,
          text
        })
      });
      const data = await r.json();
      if (r.ok) {
        return res.status(200).json({
          success: true,
          provider: 'resend',
          id: data.id,
          receiver: receiverEmail,
          refId
        });
      }
    }

    // 3. Dev fallback — log only (no filesystem on Vercel)
    console.log('[IEI SIES GST] Inquiry (no mail provider configured):', { refId, name, email, category });
    return res.status(200).json({
      success: true,
      provider: 'log_only',
      receiver: receiverEmail,
      refId,
      message: `Inquiry recorded. Add SMTP_USER/SMTP_PASS or RESEND_API_KEY in Vercel env vars to enable email delivery.`
    });

  } catch (err) {
    console.error('[Inquiry API Error]:', err);
    return res.status(500).json({
      error: 'Internal server error while processing council inquiry.'
    });
  }
}
