import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';
import './DomainSpiderwebGraph.css';

/**
 * ============================================================================
 * IEI SIES GST — IEI ENGINEERING CONSTELLATION (DOMAIN UNIVERSE)
 * 
 * Recomposed Engineering Diagram + Mathematical Constellation + Orbital Geometry
 * Center: IEI SIES GST CHAPTER
 * Outer Radial Nodes: Technical, Industry Outreach & Admin, Design, Creative, Media, Editorial
 * 
 * Interaction:
 * Tap/click a domain -> expands slightly, glowing IEI blue, active spoke brightens,
 * traveling signal photon. Other nodes become quieter.
 * Zero cards. Zero modals. Zero popups.
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

  // Geometry coordinates
  const cx = isMobile ? 220 : 480;
  const cy = isMobile ? 245 : 310;
  const radius = isMobile ? 135 : 215;
  const totalWings = domainWings.length || 6;

  // 6 Domain nodes positioned radially around 360 degrees
  const nodePositions = domainWings.map((w, idx) => {
    // Start at -90deg (12 o'clock), step clockwise
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
      } else if (cosVal > 0) {
        labelAnchor = 'start';
        labelOffsetX = 32;
        labelOffsetY = sinVal > 0.3 ? 6 : (sinVal < -0.3 ? -2 : 4);
      } else {
        labelAnchor = 'end';
        labelOffsetX = -32;
        labelOffsetY = sinVal > 0.3 ? 6 : (sinVal < -0.3 ? -2 : 4);
      }
    } else {
      if (Math.abs(cosVal) < 0.25) {
        labelAnchor = 'middle';
        labelOffsetY = sinVal < 0 ? -38 : 42;
      } else if (cosVal > 0) {
        labelAnchor = 'start';
        labelOffsetX = 44;
        labelOffsetY = sinVal > 0.3 ? 8 : (sinVal < -0.3 ? -2 : 4);
      } else {
        labelAnchor = 'end';
        labelOffsetX = -44;
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
    <div className="domain-constellation-root" role="region" aria-label="IEI Engineering Constellation">
      <div className="constellation-svg-wrapper">
        <svg 
          viewBox={isMobile ? "0 0 440 500" : "0 0 960 620"} 
          className="constellation-svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.06" />
            </filter>
            <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0062FF" floodOpacity="0.38" />
            </filter>
          </defs>

          {/* 01. MATHEMATICAL ORBITAL ELLIPSES (Slow Celestial Movement) */}
          <g className="constellation-orbits-group">
            {/* Primary Orbital Ellipse */}
            <ellipse 
              cx={cx} 
              cy={cy} 
              rx={radius * 1.05} 
              ry={radius * 0.96} 
              fill="none" 
              stroke="rgba(0, 98, 255, 0.18)" 
              strokeWidth="0.9" 
            />

            {/* Secondary Dashed Ellipse */}
            <ellipse 
              cx={cx} 
              cy={cy} 
              rx={radius * 0.68} 
              ry={radius * 0.62} 
              fill="none" 
              stroke="rgba(15, 23, 42, 0.08)" 
              strokeWidth="0.75" 
              strokeDasharray="4 6" 
            />

            {/* Outer Constellation Boundary Ring */}
            <circle 
              cx={cx} 
              cy={cy} 
              r={radius * 1.25} 
              fill="none" 
              stroke="rgba(0, 98, 255, 0.08)" 
              strokeWidth="0.65" 
            />
          </g>

          {/* 02. SPOKES CONNECTING CENTER TO RADIAL NODES */}
          <g className="constellation-spokes-group">
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
                    className={`constellation-spoke ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  />

                  {/* Traveling Pulse Photon along Active Spoke */}
                  {isActive && (
                    <circle 
                      cx={cx + (node.x - cx) * 0.55} 
                      cy={cy + (node.y - cy) * 0.55} 
                      r={isMobile ? 3.5 : 4} 
                      className="constellation-photon" 
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* 03. CENTRAL HUB NODE: IEI SIES GST CHAPTER */}
          <g 
            className={`constellation-center-group ${isCoreActive ? 'is-active' : ''}`}
            onClick={() => handleSelect('core')}
            onMouseEnter={() => handleMouseEnter('core')}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            aria-label="IEI SIES GST Central Core Hub"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect('core');
              }
            }}
          >
            {/* Outer Guide Aura Ring */}
            <circle
              cx={cx}
              cy={cy}
              r={isMobile ? 48 : 58}
              fill="none"
              stroke={isCoreActive ? 'rgba(0, 98, 255, 0.35)' : 'rgba(0, 98, 255, 0.12)'}
              strokeWidth={isCoreActive ? 3 : 1}
              strokeDasharray={isCoreActive ? 'none' : '3 3'}
            />

            {/* Center Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={isMobile ? 38 : 46}
              fill={isCoreActive ? '#0062FF' : '#ffffff'}
              stroke={isCoreActive ? '#0062FF' : 'rgba(15, 23, 42, 0.14)'}
              strokeWidth={2}
              filter={isCoreActive ? 'url(#activeGlow)' : 'url(#nodeShadow)'}
              className="constellation-center-circle"
            />

            {/* Central Typography: IEI / SIES GST / CHAPTER */}
            <text
              x={cx}
              y={cy - (isMobile ? 12 : 14)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, monospace)"
              fontSize={isMobile ? "12" : "14"}
              fontWeight="900"
              fill={isCoreActive ? '#ffffff' : '#09090B'}
              letterSpacing="0.1em"
            >
              IEI
            </text>
            <text
              x={cx}
              y={cy + (isMobile ? 3 : 4)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, monospace)"
              fontSize={isMobile ? "8.5" : "9.5"}
              fontWeight="800"
              fill={isCoreActive ? 'rgba(255, 255, 255, 0.95)' : '#0062FF'}
              letterSpacing="0.08em"
            >
              SIES GST
            </text>
            <text
              x={cx}
              y={cy + (isMobile ? 16 : 19)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, monospace)"
              fontSize={isMobile ? "6.5" : "7.5"}
              fontWeight="700"
              fill={isCoreActive ? 'rgba(255, 255, 255, 0.75)' : '#71717A'}
              letterSpacing="0.14em"
            >
              CHAPTER
            </text>
          </g>

          {/* 04. 6 RADIAL DOMAIN NODES */}
          {nodePositions.map((node) => {
            const isActive = selectedWingIndex === node.indexKey;
            const isHovered = hoveredNode === node.indexKey;

            return (
              <g
                key={`node-${node.id}`}
                className={`constellation-node-group ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
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
                {/* Generous touch target */}
                <circle cx={node.x} cy={node.y} r={isMobile ? 34 : 38} fill="transparent" />

                {/* Outer Halo Ring when Active */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isMobile ? 28 : 32}
                    fill="none"
                    stroke="rgba(0, 98, 255, 0.25)"
                    strokeWidth={3}
                  />
                )}

                {/* Node Main Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isMobile ? 20 : 24}
                  fill={isActive ? '#0062FF' : '#ffffff'}
                  stroke={isActive ? '#0062FF' : isHovered ? '#0062FF' : 'rgba(15, 23, 42, 0.14)'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  filter={isActive ? 'url(#activeGlow)' : 'url(#nodeShadow)'}
                  className="constellation-node-circle"
                />

                {/* Node Code: TECH, DSGN, EDIT, etc. */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize={isMobile ? "8" : "9"}
                  fontWeight="800"
                  fill={isActive ? '#ffffff' : '#09090B'}
                  letterSpacing="0.04em"
                >
                  {node.code}
                </text>

                {/* Radial Outer Label (No Overlap, Completely Legible) */}
                <g>
                  {node.name.includes('&') ? (
                    <text
                      x={node.labelX}
                      y={node.labelY}
                      textAnchor={node.labelAnchor}
                      className={`constellation-node-label ${isActive ? 'is-active-label' : ''}`}
                    >
                      <tspan x={node.labelX} dy="-4">Outreach</tspan>
                      <tspan x={node.labelX} dy="12">& Admin</tspan>
                    </text>
                  ) : (
                    <text
                      x={node.labelX}
                      y={node.labelY}
                      textAnchor={node.labelAnchor}
                      className={`constellation-node-label ${isActive ? 'is-active-label' : ''}`}
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
