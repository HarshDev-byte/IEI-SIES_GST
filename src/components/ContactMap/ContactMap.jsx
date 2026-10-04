import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ArrowUpRight } from 'lucide-react';
import './ContactMap.css';

/**
 * ============================================================================
 * IEI SIES GST — INTERACTIVE CONTACT MAP
 * Powered by Leaflet & OpenStreetMap (Free, open-source, zero API keys)
 * SIES GST Campus Location: 19.0428° N, 73.0233° E (Sector-V, Nerul)
 * ============================================================================
 */

// SIES Graduate School of Technology verified coordinates
const SIES_GST_COORDS = [19.0428, 73.0233];
const DEFAULT_ZOOM = 16;
const OSM_MAP_URL = `https://www.openstreetmap.org/?mlat=19.0428&mlon=73.0233#map=17/19.0428/73.0233`;

export default function ContactMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Ensure map container element exists and map is not already initialized
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // 01. Initialize Leaflet Map
    // scrollWheelZoom: false ensures normal page scrolling is never hijacked
    const map = L.map(mapContainerRef.current, {
      center: SIES_GST_COORDS,
      zoom: DEFAULT_ZOOM,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
      tap: true
    });

    mapInstanceRef.current = map;

    // Enable scroll zoom on single click if user intends to interact with map
    map.on('click', () => {
      map.scrollWheelZoom.enable();
    });

    // Disable again on mouse out so page scrolling returns to normal
    map.on('mouseout', () => {
      map.scrollWheelZoom.disable();
    });

    // 02. OpenStreetMap Tile Layer with Required Attribution
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 03. Custom IEI Blue Marker Icon
    const customIcon = L.divIcon({
      className: 'contact-custom-marker',
      html: `
        <div class="contact-marker-pulse"></div>
        <div class="contact-marker-pin" title="SIES Graduate School of Technology">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });

    // 04. Add Marker & Concise Popup
    const popupContent = `
      <div class="contact-map-popup-title">SIES Graduate School of Technology</div>
      <div class="contact-map-popup-sub">Sector-V, Nerul, Navi Mumbai</div>
    `;

    const marker = L.marker(SIES_GST_COORDS, {
      icon: customIcon,
      alt: "SIES Graduate School of Technology, Nerul"
    }).addTo(map);

    marker.bindPopup(popupContent, {
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      offset: [0, -10]
    }).openPopup();

    // Invalidate map size after mount to prevent grey tiles
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    // Cleanup Leaflet instance on unmount (Strict Mode & Navigation safe)
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      className="contact-map-wrapper"
      role="region"
      aria-label="Map showing the location of SIES Graduate School of Technology in Nerul, Navi Mumbai"
    >
      {/* Interactive Map Canvas Container */}
      <div 
        ref={mapContainerRef} 
        className="contact-map-container"
        tabIndex={0}
      />

      {/* Action Row Below Map */}
      <div className="contact-map-action-row">
        <a 
          href={OSM_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-map-action-link"
          title="Open location on OpenStreetMap"
        >
          <span>OPEN IN MAPS</span>
          <ArrowUpRight size={13} className="shrink-0" />
        </a>

        <span className="contact-map-coords-tag">
          19.0428° N, 73.0233° E
        </span>
      </div>
    </div>
  );
}
