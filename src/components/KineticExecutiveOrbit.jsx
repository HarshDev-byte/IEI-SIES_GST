import React from 'react';

/**
 * ============================================================================
 * IEI SIES GST — KINETIC EXECUTIVE ORBIT
 * 
 * Intersecting elliptical orbits, planetary coordinates, and celestial guide
 * paths designed for the panoramic 4-person executive group portrait.
 * 
 * Rotates slowly in reverse direction for dynamic counterpoint.
 * ============================================================================
 */
export default function KineticExecutiveOrbit({ className = '' }) {
  const cx = 400;
  const cy = 250;

  return (
    <div 
      className={`kinetic-exec-container pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full overflow-visible"
      >
        <defs>
          <filter id="execOrbitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#0062FF" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ROTATING ELLIPTICAL ORBITS */}
        <g className="kinetic-exec-spin origin-center">
          {/* Main Major Horizontal Ellipse */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={340}
            ry={170}
            fill="none"
            stroke="rgba(0, 98, 255, 0.22)"
            strokeWidth="0.95"
          />

          {/* Angled Ellipse +20 deg */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={310}
            ry={150}
            transform={`rotate(20 ${cx} ${cy})`}
            fill="none"
            stroke="rgba(15, 23, 42, 0.10)"
            strokeWidth="0.85"
          />

          {/* Angled Ellipse -20 deg */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={310}
            ry={150}
            transform={`rotate(-20 ${cx} ${cy})`}
            fill="none"
            stroke="rgba(15, 23, 42, 0.10)"
            strokeWidth="0.85"
          />

          {/* Angled Ellipse +40 deg */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={280}
            ry={130}
            transform={`rotate(40 ${cx} ${cy})`}
            fill="none"
            stroke="rgba(0, 98, 255, 0.16)"
            strokeWidth="0.75"
          />

          {/* Angled Ellipse -40 deg */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={280}
            ry={130}
            transform={`rotate(-40 ${cx} ${cy})`}
            fill="none"
            stroke="rgba(0, 98, 255, 0.16)"
            strokeWidth="0.75"
          />

          {/* Outer Dashed Orbit */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={370}
            ry={190}
            fill="none"
            stroke="rgba(0, 98, 255, 0.18)"
            strokeWidth="0.9"
            strokeDasharray="4 8"
          />

          {/* Inner Harmonic Guide Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={130}
            fill="none"
            stroke="rgba(15, 23, 42, 0.08)"
            strokeWidth="0.75"
          />

          {/* Orbital Satellite Nodes */}
          {[-70, -35, 0, 35, 70, 110, 145, 180, 215, 250].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = cx + 340 * Math.cos(rad);
            const y = cy + 170 * Math.sin(rad);
            return (
              <circle
                key={`sat-${i}`}
                cx={x}
                cy={y}
                r={i % 2 === 0 ? 2.5 : 1.75}
                fill={i % 2 === 0 ? "#0062FF" : "rgba(15, 23, 42, 0.4)"}
                filter={i % 2 === 0 ? "url(#execOrbitGlow)" : undefined}
              />
            );
          })}
        </g>

        {/* STATIC CENTER RETICLE (Engineering Coordinates) */}
        <g stroke="rgba(0, 98, 255, 0.3)" strokeWidth="0.8">
          <line x1={cx - 15} y1={cy} x2={cx + 15} y2={cy} />
          <line x1={cx} y1={cy - 15} x2={cx} y2={cy + 15} />
        </g>
      </svg>
    </div>
  );
}
