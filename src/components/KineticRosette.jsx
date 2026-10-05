import React from 'react';

/**
 * ============================================================================
 * IEI SIES GST — KINETIC MATHEMATICAL ROSETTE / FLOWER
 * 
 * Mathematical botanical geometry inspired by celestial orbits and harmonic
 * resonance. Rendered with 12 radial petals, secondary harmonic rings,
 * apex nodes, and slow orbital rotation.
 * 
 * Bright Mode Only: Thin cobalt & charcoal technical strokes on clean white.
 * ============================================================================
 */
export default function KineticRosette({ className = '' }) {
  const cx = 300;
  const cy = 300;
  const petalCount = 12;
  const rx = 210;
  const ry = 82;

  // Generate 12 radial petals
  const petals = Array.from({ length: petalCount }).map((_, i) => {
    const angle = (i * 360) / petalCount;
    const rad = (angle * Math.PI) / 180;
    // Apex coordinate of the petal tip
    const apexX = cx + rx * Math.cos(rad);
    const apexY = cy + rx * Math.sin(rad);

    return {
      angle,
      apexX,
      apexY,
      index: i
    };
  });

  return (
    <div 
      className={`kinetic-rosette-container pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 600 600" 
        className="w-full h-full overflow-visible"
      >
        <defs>
          <filter id="rosetteGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#0062FF" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ROTATING ROSETTE GEOMETRY */}
        <g className="kinetic-rosette-spin origin-center">
          {/* Outer Thin Guide Circle */}
          <circle 
            cx={cx} 
            cy={cy} 
            r={245} 
            fill="none" 
            stroke="rgba(15, 23, 42, 0.08)" 
            strokeWidth="0.8" 
          />

          {/* Secondary Dashed Harmonic Ring */}
          <circle 
            cx={cx} 
            cy={cy} 
            r={185} 
            fill="none" 
            stroke="rgba(0, 98, 255, 0.18)" 
            strokeWidth="0.9" 
            strokeDasharray="3 6" 
          />

          {/* Tertiary Mid Guide Ring */}
          <circle 
            cx={cx} 
            cy={cy} 
            r={130} 
            fill="none" 
            stroke="rgba(15, 23, 42, 0.06)" 
            strokeWidth="0.75" 
          />

          {/* 12 Intersecting Radial Petal Ellipses */}
          {petals.map(({ angle, index }) => (
            <ellipse
              key={`petal-${index}`}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              transform={`rotate(${angle} ${cx} ${cy})`}
              fill="none"
              stroke={index % 2 === 0 ? "rgba(0, 98, 255, 0.24)" : "rgba(15, 23, 42, 0.12)"}
              strokeWidth="0.95"
            />
          ))}

          {/* 6 Secondary Interleaved Petals (Slightly Wider, Fainter) */}
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={`secondary-petal-${i}`}
              cx={cx}
              cy={cy}
              rx={230}
              ry={110}
              transform={`rotate(${i * 60 + 15} ${cx} ${cy})`}
              fill="none"
              stroke="rgba(0, 98, 255, 0.10)"
              strokeWidth="0.7"
            />
          ))}

          {/* Apex Nodes at Petal Tips */}
          {petals.map(({ apexX, apexY, index }) => (
            <circle
              key={`apex-${index}`}
              cx={apexX}
              cy={apexY}
              r={index % 3 === 0 ? 2.5 : 1.75}
              fill={index % 3 === 0 ? "#0062FF" : "rgba(0, 98, 255, 0.6)"}
              filter={index % 3 === 0 ? "url(#rosetteGlow)" : undefined}
            />
          ))}

          {/* Cardinal Ticks on Outer Orbit */}
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = cx + 240 * Math.cos(rad);
            const y1 = cy + 240 * Math.sin(rad);
            const x2 = cx + 250 * Math.cos(rad);
            const y2 = cy + 250 * Math.sin(rad);
            return (
              <line
                key={`cardinal-${deg}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#0062FF"
                strokeWidth="1.2"
                strokeOpacity="0.7"
              />
            );
          })}
        </g>

        {/* STATIC CENTER APERTURE RING (frames the IEI emblem) */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={78} 
          fill="none" 
          stroke="rgba(0, 98, 255, 0.28)" 
          strokeWidth="1" 
        />
        <circle 
          cx={cx} 
          cy={cy} 
          r={82} 
          fill="none" 
          stroke="rgba(15, 23, 42, 0.08)" 
          strokeWidth="0.75" 
          strokeDasharray="2 4" 
        />
      </svg>
    </div>
  );
}
