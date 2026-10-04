import React from 'react';
import './ContactMap.css';

/**
 * ============================================================================
 * IEI SIES GST — GOOGLE MAPS EMBED
 * Official SIES Graduate School of Technology Campus Embed
 * Lightweight iframe embed approach matching CSI SIES GST (csi.siesgst.ac.in)
 * Zero external JavaScript mapping libraries or API keys required
 * ============================================================================
 */

// Verified SIES Graduate School of Technology Google Maps Embed URL
const DEFAULT_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4756649763167!2d73.02088931482145!3d19.04281298710694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3db5e2c85cd%3A0xef26c52d7d73816e!2sSIES%20Graduate%20School%20of%20Technology!5e0!3m2!1sen!2sin!4v1660030845146!5m2!1sen!2sin';

// Direct link to open SIES GST location in Google Maps (opens in new tab)
const DEFAULT_EXTERNAL_MAPS_URL =
  'https://www.google.com/maps/place/SIES+Graduate+School+of+Technology/@19.042813,73.023078,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3db5e2c85cd:0xef26c52d7d73816e!8m2!3d19.042813!4d73.023078!16s%2Fg%2F11b6y8z0b0';

export default function ContactMap({
  embedUrl = DEFAULT_EMBED_URL,
  externalUrl = DEFAULT_EXTERNAL_MAPS_URL,
  title = 'Map showing SIES Graduate School of Technology'
}) {
  return (
    <div 
      className="contact-map-wrapper"
      role="region"
      aria-label="Campus Location Map"
    >
      {/* Responsive Map Frame */}
      <div className="contact-map-container">
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Map Action: Direct Link to External Google Maps */}
      <div className="contact-map-action-row">
        <a 
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-map-action-link"
          aria-label="Open SIES Graduate School of Technology in Google Maps"
        >
          <span>OPEN IN GOOGLE MAPS →</span>
        </a>
      </div>
    </div>
  );
}
