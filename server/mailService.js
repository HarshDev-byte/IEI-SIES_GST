import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

try {
  process.loadEnvFile();
} catch (_) {}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Destination email for membership requests, student queries & council messages
export function getReceiverEmail() {
  return (
    process.env.COUNCIL_RECEIVER_EMAIL ||
    process.env.MEMBERSHIP_INQUIRY_EMAIL ||
    'iei@siesgst.ac.in'
  );
}

/**
 * Generate formatted HTML and Plaintext email bodies
 */
export function formatInquiryEmail({ name, email, category, query, refId }) {
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
<body style="margin: 0; padding: 0; background-color: #F4F5F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #18181B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F4F5F8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E4E4E7; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <!-- Top Header Brand Bar -->
          <tr>
            <td style="background-color: #0A0A0C; padding: 24px 32px; border-bottom: 2px solid #0062FF;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-family: monospace; font-size: 11px; font-weight: 700; color: #00D6FF; letter-spacing: 0.1em; text-transform: uppercase;">
                      THE INSTITUTION OF ENGINEERS (INDIA)
                    </span>
                    <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
                      SIES Graduate School of Technology
                    </h1>
                    <span style="font-size: 12px; color: #A1A1AA; font-family: monospace;">
                      Student Chapter Secretariat · Communication Desk
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notification Pill -->
          <tr>
            <td style="padding: 24px 32px 12px 32px;">
              <div style="display: inline-block; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 9999px; padding: 4px 12px; font-family: monospace; font-size: 11px; font-weight: 700; color: #0062FF;">
                ✦ INCOMING DISPATCH: ${category.toUpperCase()}
              </div>
              <h2 style="margin: 12px 0 0 0; font-size: 18px; font-weight: 700; color: #09090B;">
                New Inquiry Received for Council Review
              </h2>
            </td>
          </tr>

          <!-- Metadata Summary Box -->
          <tr>
            <td style="padding: 12px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAFAFC; border: 1px solid #E4E4E7; border-radius: 12px; padding: 16px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #71717A; width: 140px; font-family: monospace;">Reference ID:</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #0062FF; font-family: monospace;">${refId}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #71717A; font-family: monospace;">Full Name:</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #09090B;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #71717A; font-family: monospace;">Institutional Email:</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #09090B;">
                    <a href="mailto:${email}" style="color: #0062FF; text-decoration: underline;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #71717A; font-family: monospace;">Category:</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #09090B;">${category}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #71717A; font-family: monospace;">Timestamp:</td>
                  <td style="padding: 6px 0; font-size: 12px; color: #52525B;">${timestamp} IST</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 12px 32px 24px 32px;">
              <span style="display: block; font-family: monospace; font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase; margin-bottom: 8px;">
                Message / Inscribed Query:
              </span>
              <div style="background-color: #FFFFFF; border: 1px solid #D4D4D8; border-left: 4px solid #0062FF; border-radius: 8px; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #27272A; white-space: pre-wrap;">${query}</div>
            </td>
          </tr>

          <!-- Quick Action Reply Button -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display: inline-block; background-color: #0062FF; color: #FFFFFF; font-weight: 600; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
                      Reply Directly to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAFAFC; padding: 20px 32px; border-top: 1px solid #E4E4E7; font-size: 11px; color: #71717A; line-height: 1.5;">
              <div style="font-weight: 600; color: #09090B; margin-bottom: 2px;">
                The Institution of Engineers (India) · SIES GST Collegiate Chapter
              </div>
              <div>Sector-V, Nerul, Navi Mumbai - 400706, Maharashtra, India</div>
              <div style="margin-top: 6px; font-family: monospace; font-size: 10px; color: #A1A1AA;">
                Automated Council Ingestion Dispatch System · Reference: ${refId}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

/**
 * Primary mail sending pipeline
 */
export async function sendInquiryEmail({ name, email, category, query }) {
  const refId = `IEI-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const receiverEmail = getReceiverEmail();
  const { subject, text, html } = formatInquiryEmail({ name, email, category, query, refId });

  // 1. Archive to local JSON database
  try {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const logFile = path.join(dataDir, 'inquiries.json');
    const existing = fs.existsSync(logFile) ? JSON.parse(fs.readFileSync(logFile, 'utf8')) : [];
    existing.push({
      id: refId,
      name,
      email,
      category,
      query,
      targetEmail: receiverEmail,
      timestamp: new Date().toISOString(),
      channel: 'email'
    });
    fs.writeFileSync(logFile, JSON.stringify(existing, null, 2), 'utf8');

    // Also spool recent email HTML for local inspection
    const spoolDir = path.join(dataDir, 'spool');
    if (!fs.existsSync(spoolDir)) {
      fs.mkdirSync(spoolDir, { recursive: true });
    }
    fs.writeFileSync(path.join(spoolDir, `${refId}.html`), html, 'utf8');
  } catch (err) {
    console.error('[Mail Service] Local archive write error:', err.message);
  }

  // 2. Check for configured SMTP server
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"IEI SIES GST Council" <${process.env.SMTP_USER}>`,
        to: receiverEmail,
        replyTo: email,
        subject,
        text,
        html
      });

      console.log(`[Mail Service] Dispatched live email to ${receiverEmail} (MessageId: ${info.messageId})`);
      return { success: true, provider: 'smtp', messageId: info.messageId, receiver: receiverEmail, refId };
    } catch (err) {
      console.error('[Mail Service] SMTP transmission error:', err.message);
    }
  }

  // 3. Check for Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'IEI SIES GST <onboarding@resend.dev>',
          to: [receiverEmail],
          reply_to: email,
          subject,
          html,
          text
        })
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true, provider: 'resend', id: data.id, receiver: receiverEmail, refId };
      }
    } catch (err) {
      console.error('[Mail Service] Resend error:', err.message);
    }
  }

  // 4. Default / Dev Logging Dispatch
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('[MAIL SERVICE — IEI SIES GST COUNCIL INGESTION]');
  console.log(`Ref ID:      ${refId}`);
  console.log(`Target Mail: ${receiverEmail}`);
  console.log(`Subject:     ${subject}`);
  console.log(`Applicant:   ${name} <${email}>`);
  console.log(`Category:    ${category}`);
  console.log(`Query Body:\n${query}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return {
    success: true,
    provider: 'local_spool_and_archive',
    receiver: receiverEmail,
    refId,
    message: `Inquiry successfully recorded and prepared for email delivery to ${receiverEmail}.`
  };
}
