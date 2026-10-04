import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Globe, Palette, Megaphone, BookOpen, Layers } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './DomainSpiderwebGraph.css';

/**
 * ============================================================================
 * IEI SIES GST — INTERACTIVE DOMAIN SPIDERWEB GRAPH
 * Multi-directional radial node network with spiderweb cord geometry
 * Interactive • Responsive • High-precision engineering UI
 * ============================================================================
 */

export default function DomainSpiderwebGraph({
  chapterCoreData = {},
  domainWings = [],
  selectedWingIndex = 0,
  onSelectWing = () => {}
}) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Geometry configuration: Responsive mobile vs desktop coordinates
  const cx = isMobile ? 200 : 480;
  const cy = isMobile ? 220 : 300;
  const radius = isMobile ? 120 : 200;
  const totalWings = domainWings.length || 5;

  // Calculate coordinates for the radial domain nodes
  const nodePositions = domainWings.map((w, idx) => {
    // Start at -90deg (top), step clockwise around 360deg
    const angleDeg = -90 + (idx * 360) / totalWings;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = cx + radius * Math.cos(angleRad);
    const y = cy + radius * Math.sin(angleRad);

    const cosVal = Math.cos(angleRad);
    const sinVal = Math.sin(angleRad);

    let labelAnchor = 'middle';
    let labelOffsetX = 0;
    let labelOffsetY = 0;

    if (isMobile) {
      if (Math.abs(cosVal) < 0.25) {
        labelAnchor = 'middle';
        labelOffsetY = sinVal < 0 ? -32 : 36;
      } else {
        labelAnchor = 'middle';
        labelOffsetY = 36;
      }
    } else {
      if (Math.abs(cosVal) < 0.25) {
        labelAnchor = 'middle';
        labelOffsetY = sinVal < 0 ? -40 : 44;
      } else if (cosVal > 0) {
        labelAnchor = 'start';
        labelOffsetX = 46;
        labelOffsetY = sinVal > 0.3 ? 8 : (sinVal < -0.3 ? -2 : 4);
      } else {
        labelAnchor = 'end';
        labelOffsetX = -46;
        labelOffsetY = sinVal > 0.3 ? 8 : (sinVal < -0.3 ? -2 : 4);
      }
    }

    return {
      ...w,
      indexKey: idx,
      angleDeg,
      x,
      y,
      labelX: x + labelOffsetX,
      labelY: y + labelOffsetY,
      labelAnchor
    };
  });

  // Calculate concentric spiderweb cords at 3 hierarchical tiers
  const cordTiers = [0.35, 0.65, 0.94];
  const webCordPaths = cordTiers.map((tier) => {
    const rTier = radius * tier;
    const points = [];

    for (let i = 0; i < totalWings; i++) {
      const angleRad = ((-90 + (i * 360) / totalWings) * Math.PI) / 180;
      const x = cx + rTier * Math.cos(angleRad);
      const y = cy + rTier * Math.sin(angleRad);
      points.push({ x, y });
    }

    // Connect in a closed polygon with slight organic curve towards center
    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < totalWings; i++) {
      const nextIdx = (i + 1) % totalWings;
      const p1 = points[i];
      const p2 = points[nextIdx];

      // Quadratic curve control point slightly bowed inward (spiderweb sag)
      const midAngleRad = ((-90 + ((i + 0.5) * 360) / totalWings) * Math.PI) / 180;
      const sagRadius = rTier * 0.94;
      const qx = cx + sagRadius * Math.cos(midAngleRad);
      const qy = cy + sagRadius * Math.sin(midAngleRad);

      pathData += ` Q ${qx} ${qy} ${p2.x} ${p2.y}`;
    }

    return pathData;
  });

  const handleSelect = (key) => {
    if (audioEngine?.playClick) audioEngine.playClick();
    onSelectWing(key);
  };

  const handleMouseEnter = (key) => {
    setHoveredNode(key);
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  const isCoreActive = selectedWingIndex === 'core';

  return (
    <div className="domain-spiderweb-root" role="region" aria-label="Interactive Domain Spiderweb Graph">
      {/* Main Spiderweb SVG Viewport */}
      <div className="spiderweb-svg-container">
        <svg 
          viewBox={isMobile ? "0 0 400 440" : "0 0 960 620"} 
          className="spiderweb-svg"
          aria-hidden="true"
        >
          <defs>
            {/* Filter for glowing node shadow */}
            <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.08" />
            </filter>
            <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0062FF" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* 01. Spiderweb Concentric Web Cords */}
          <g className="spiderweb-cords-group">
            {webCordPaths.map((d, idx) => (
              <path 
                key={`cord-${idx}`} 
                d={d} 
                className={`spiderweb-cord ${selectedWingIndex !== null ? 'is-active' : ''}`} 
              />
            ))}
          </g>

          {/* 02. Radial Spokes Connecting Center to All 7 Outer Nodes */}
          <g className="spiderweb-spokes-group">
            {nodePositions.map((node) => {
              const isActive = selectedWingIndex === node.indexKey;
              const isHovered = hoveredNode === node.indexKey;

              return (
                <g key={`spoke-${node.id}`}>
                  {/* Spoke Line */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={node.x}
                    y2={node.y}
                    className={`spiderweb-spoke ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  />

                  {/* Traveling Pulse Photon along Active Spoke */}
                  {isActive && (
                    <circle 
                      cx={cx + (node.x - cx) * 0.5} 
                      cy={cy + (node.y - cy) * 0.5} 
                      className="spiderweb-photon" 
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* 03. Center Hub Node: Chapter Core */}
          <g 
            className={`spiderweb-center-group ${isCoreActive ? 'is-active' : ''}`}
            onClick={() => handleSelect('core')}
            onMouseEnter={() => handleMouseEnter('core')}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            aria-label="Chapter Core Central Hub"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect('core');
              }
            }}
          >
            {/* Outer Aura Ring */}
            <circle
              cx={cx}
              cy={cy}
              r={isMobile ? 40 : 48}
              fill="none"
              stroke={isCoreActive ? 'rgba(0, 98, 255, 0.25)' : 'rgba(0, 0, 0, 0.05)'}
              strokeWidth={isCoreActive ? 4 : 1.5}
            />

            {/* Main Center Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={isMobile ? 32 : 36}
              fill={isCoreActive ? '#0062FF' : '#ffffff'}
              stroke={isCoreActive ? '#0062FF' : 'rgba(0, 0, 0, 0.14)'}
              strokeWidth={2.5}
              filter={isCoreActive ? 'url(#activeGlow)' : 'url(#nodeShadow)'}
              className="spiderweb-center-circle"
            />

            {/* Central Monogram */}
            <text
              x={cx}
              y={cy - (isMobile ? 3 : 4)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, monospace)"
              fontSize={isMobile ? "11" : "12"}
              fontWeight="800"
              fill={isCoreActive ? '#ffffff' : '#09090b'}
              letterSpacing="0.08em"
            >
              CORE
            </text>
            <text
              x={cx}
              y={cy + (isMobile ? 9 : 10)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, monospace)"
              fontSize={isMobile ? "7.5" : "8"}
              fontWeight="700"
              fill={isCoreActive ? 'rgba(255, 255, 255, 0.85)' : '#71717a'}
              letterSpacing="0.06em"
            >
              APEX
            </text>
          </g>

          {/* 04. Outer Domain Nodes */}
          {nodePositions.map((node) => {
            const isActive = selectedWingIndex === node.indexKey;
            const isHovered = hoveredNode === node.indexKey;

            return (
              <g
                key={`node-${node.id}`}
                className={`spiderweb-node-group ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelect(node.indexKey)}
                onMouseEnter={() => handleMouseEnter(node.indexKey)}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                role="button"
                aria-label={`${node.name} Wing. Click to inspect.`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(node.indexKey);
                  }
                }}
              >
                {/* Invisible large hit area */}
                <circle cx={node.x} cy={node.y} r={isMobile ? 36 : 38} fill="transparent" />

                {/* Outer Halo on Active */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isMobile ? 30 : 34}
                    fill="none"
                    stroke="rgba(0, 98, 255, 0.25)"
                    strokeWidth={4}
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isMobile ? 22 : 24}
                  fill={isActive ? '#0062FF' : '#ffffff'}
                  stroke={isActive ? '#0062FF' : isHovered ? '#0062FF' : 'rgba(0, 0, 0, 0.12)'}
                  strokeWidth={isActive ? 3 : 1.75}
                  filter={isActive ? 'url(#activeGlow)' : 'url(#nodeShadow)'}
                  className="spiderweb-node-circle"
                />

                {/* Node Code / Monogram */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize={isMobile ? "8.5" : "9.5"}
                  fontWeight="800"
                  fill={isActive ? '#ffffff' : '#09090b'}
                  letterSpacing="0.04em"
                >
                  {node.code}
                </text>

                {/* Radial Outer Text Label */}
                <g>
                  {isMobile && (node.name.includes('&') || node.name.length > 12) ? (
                    <text
                      x={node.labelX}
                      y={node.labelY}
                      textAnchor={node.labelAnchor}
                      className="spiderweb-node-title"
                    >
                      <tspan x={node.labelX} dy="-5">Outreach</tspan>
                      <tspan x={node.labelX} dy="13">& Admin</tspan>
                    </text>
                  ) : (
                    <text
                      x={node.labelX}
                      y={node.labelY}
                      textAnchor={node.labelAnchor}
                      className="spiderweb-node-title"
                    >
                      {node.name}
                    </text>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
