import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './ContactMap.css';

/**
 * ============================================================================
 * IEI SIES GST — GOOGLE MAPS EMBED
 * Lightweight iframe embed — no API key, no JavaScript SDK, no heavy library.
 * Identical approach to the CSI SIES GST website (csi.siesgst.ac.in).
 *
 * Embed URL targets SIES Graduate School of Technology, Nerul, Navi Mumbai.
 * Google Maps direct link opens the full maps experience in a new tab.
 * ============================================================================
 */

// Google Maps Embed URL — SIES Graduate School of Technology, Nerul
const GMAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8503297765924!2d73.02110447490374!3d19.042802782145744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24caf7ecdbb%3A0x2e8a2b7e8f24e3d9!2sSIES%20Graduate%20School%20of%20Technology!5e0!3m2!1sen!2sin!4v1696500000000!5m2!1sen!2sin';

// Google Maps link to open full Maps experience
const GMAPS_LINK =
  'https://maps.google.com/?q=SIES+Graduate+School+of+Technology,+Sector+5,+Nerul,+Navi+Mumbai,+Maharashtra+400706';

export default function ContactMap() {
  return (
    <div
      className="contact-map-wrapper"
      role="region"
      aria-label="Map showing the location of SIES Graduate School of Technology in Nerul, Navi Mumbai"
    >
      {/* Google Maps Embed iframe — zero API key requirement */}
      <iframe
        title="SIES Graduate School of Technology — Google Maps Location"
        src={GMAPS_EMBED_URL}
        className="contact-map-iframe"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Google Maps showing SIES Graduate School of Technology, Nerul, Navi Mumbai"
      />

      {/* Action Row Below Map */}
      <div className="contact-map-action-row justify-end">
        <span className="contact-map-coords-tag">
          19.0428° N, 73.0233° E
        </span>
      </div>
    </div>
  );
}
