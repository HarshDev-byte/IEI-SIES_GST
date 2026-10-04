import React from 'react';
import './SegmentedPerimeterDecoration.css';

/**
 * ============================================================================
 * IEI SIES GST — REUSABLE SEGMENTED PERIMETER DECORATION
 * 
 * Strict Guarantees:
 * 1. ONLY active in selected designated edge segments.
 * 2. Unused perimeter areas remain COMPLETELY EMPTY and CLEAN.
 * 3. NO continuous 360° orbit, NO full border marquee, NO complete loops.
 * 4. Micro-motions are strictly LOCAL to each respective segment.
 * 5. pointer-events: none — never interferes with photo, cards, or hit zones.
 * ============================================================================
 */

export default function SegmentedPerimeterDecoration({
  segments = ['top-left', 'left-middle', 'top-right', 'right-middle', 'bottom'],
  className = ''
}) {
  const isEnabled = (name) => segments.includes(name);

  return (
    <div 
      className={`segmented-perimeter-root ${className}`} 
      aria-hidden="true"
    >
      {/* 01. TOP-LEFT AREA: ── ◇ ── twisted stroke ── */}
      {isEnabled('top-left') && (
        <div className="perimeter-segment segment-top-left">
          <svg width="140" height="22" viewBox="0 0 140 22" fill="none" className="overflow-visible">
            {/* Base technical guide line with local traveling dash */}
            <line 
              x1="0" 
              y1="11" 
              x2="48" 
              y2="11" 
              stroke="#27272a" 
              strokeWidth="1" 
              strokeOpacity="0.45" 
              className="top-left-anim-line"
            />
            {/* Central geometric diamond */}
            <g transform="translate(56, 11)" className="top-left-diamond">
              <rect 
                x="-4" 
                y="-4" 
                width="8" 
                height="8" 
                transform="rotate(45)" 
                fill="#ffffff" 
                stroke="#0062FF" 
                strokeWidth="1.2" 
              />
              <circle cx="0" cy="0" r="1.2" fill="#0062FF" />
            </g>
            {/* Twisted organic stroke segment */}
            <path 
              d="M66 11 C 76 6, 84 16, 96 11 C 104 7, 112 14, 126 11 L 138 11" 
              stroke="#27272a" 
              strokeWidth="1" 
              strokeOpacity="0.5" 
              strokeLinecap="round" 
              fill="none" 
            />
            {/* Terminal micro-tick */}
            <line x1="138" y1="8" x2="138" y2="14" stroke="#27272a" strokeWidth="1" strokeOpacity="0.6" />
          </svg>
        </div>
      )}

      {/* 02. LEFT-MIDDLE AREA: ◌ │ small technical motif */}
      {isEnabled('left-middle') && (
        <div className="perimeter-segment segment-left-middle">
          <svg width="22" height="70" viewBox="0 0 22 70" fill="none" className="overflow-visible">
            {/* Small open technical circle ◌ */}
            <circle 
              cx="11" 
              cy="10" 
              r="5.5" 
              stroke="#27272a" 
              strokeWidth="1.2" 
              strokeOpacity="0.6" 
              strokeDasharray="2 2" 
              fill="none" 
              className="left-middle-circle"
            />
            <circle cx="11" cy="10" r="1.5" fill="#0062FF" />
            {/* Vertical technical stem with subtle breath */}
            <g className="left-middle-stem">
              <line x1="11" y1="20" x2="11" y2="52" stroke="#27272a" strokeWidth="1" strokeOpacity="0.35" />
              {/* Engineering coordinate ticks */}
              <line x1="8" y1="28" x2="14" y2="28" stroke="#27272a" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="9" y1="36" x2="13" y2="36" stroke="#27272a" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="7" y1="44" x2="15" y2="44" stroke="#27272a" strokeWidth="1" strokeOpacity="0.5" />
              <circle cx="11" cy="58" r="1.8" fill="#27272a" fillOpacity="0.5" />
            </g>
          </svg>
        </div>
      )}

      {/* 03. TOP-RIGHT AREA: IEI SIES GST + small curved stroke */}
      {isEnabled('top-right') && (
        <div className="perimeter-segment segment-top-right">
          <svg width="34" height="22" viewBox="0 0 34 22" fill="none" className="overflow-visible">
            {/* Small curved technical stroke */}
            <path 
              d="M4 17 C 12 7, 22 7, 30 17" 
              stroke="#0062FF" 
              strokeWidth="1.2" 
              strokeOpacity="0.75" 
              strokeLinecap="round" 
              strokeDasharray="16 32"
              fill="none" 
              className="top-right-arc"
            />
            <circle cx="17" cy="6" r="1.5" fill="#0062FF" />
          </svg>
          <span className="top-right-typography">
            IEI SIES GST
          </span>
        </div>
      )}

      {/* 04. RIGHT-MIDDLE AREA: small loop / geometric detail */}
      {isEnabled('right-middle') && (
        <div className="perimeter-segment segment-right-middle">
          <svg width="24" height="66" viewBox="0 0 24 66" fill="none" className="overflow-visible">
            {/* Small refined geometric loop */}
            <g className="right-middle-loop">
              <path 
                d="M12 8 C 4 16, 20 24, 12 32 C 4 40, 20 48, 12 56" 
                stroke="#27272a" 
                strokeWidth="1.1" 
                strokeOpacity="0.45" 
                strokeLinecap="round" 
                fill="none" 
              />
              <circle cx="12" cy="32" r="2.2" fill="#ffffff" stroke="#0062FF" strokeWidth="1" />
              <circle cx="12" cy="8" r="1.2" fill="#27272a" fillOpacity="0.6" />
              <circle cx="12" cy="56" r="1.2" fill="#27272a" fillOpacity="0.6" />
            </g>
          </svg>
        </div>
      )}

      {/* 05. BOTTOM AREA: ── twisted ribbon ── ◇ ── */}
      {isEnabled('bottom') && (
        <div className="perimeter-segment segment-bottom">
          <svg width="220" height="24" viewBox="0 0 220 24" fill="none" className="overflow-visible">
            {/* Left technical guide */}
            <line x1="8" y1="12" x2="48" y2="12" stroke="#27272a" strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="8" cy="12" r="1.5" fill="#27272a" fillOpacity="0.4" />

            {/* Signature twisted ribbon motif */}
            <g className="bottom-twisted-ribbon">
              <path 
                d="M48 12 C 60 4, 72 20, 86 12 C 100 4, 112 20, 126 12 C 140 4, 152 20, 164 12" 
                stroke="#27272a" 
                strokeWidth="1.2" 
                strokeOpacity="0.55" 
                strokeLinecap="round" 
                fill="none" 
              />
              {/* Parallel ribbon shadow stroke giving a 3D twisted ribbon feel */}
              <path 
                d="M52 14 C 64 6, 76 22, 90 14 C 104 6, 116 22, 130 14 C 144 6, 156 22, 168 14" 
                stroke="#0062FF" 
                strokeWidth="0.8" 
                strokeOpacity="0.35" 
                strokeLinecap="round" 
                fill="none" 
              />
            </g>

            {/* Central accent diamond */}
            <g transform="translate(180, 12)">
              <rect 
                x="-3.5" 
                y="-3.5" 
                width="7" 
                height="7" 
                transform="rotate(45)" 
                fill="#ffffff" 
                stroke="#0062FF" 
                strokeWidth="1.2" 
              />
              <circle cx="0" cy="0" r="1" fill="#0062FF" />
            </g>

            {/* Right technical guide */}
            <line x1="190" y1="12" x2="212" y2="12" stroke="#27272a" strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="212" cy="12" r="1.5" fill="#27272a" fillOpacity="0.4" />
          </svg>
        </div>
      )}
    </div>
  );
}
