import React, { useState, useEffect, useRef } from 'react';
import { Layers, ArrowRight, Eye, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function HeroVisualBlueprint() {
  const [currentStage, setCurrentStage] = useState(0); // 0: BLUEPRINT, 1: STRUCTURE, 2: FORM, 3: REALITY
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  const containerRef = useRef(null);

  const stages = [
    { 
      id: 'blueprint', 
      label: 'BLUEPRINT', 
      desc: 'Precision 2D graticule & schematic tolerances', 
      tag: 'TOLERANCE ±0.002mm' 
    },
    { 
      id: 'structure', 
      label: 'STRUCTURE', 
      desc: 'Isometric wireframe lattice & node kinematics', 
      tag: 'NODES: 7 ACTIVE' 
    },
    { 
      id: 'form', 
      label: 'FORM', 
      desc: 'Translucent volumetric surfaces & refraction', 
      tag: 'SURFACE: POLARIZED' 
    },
    { 
      id: 'reality', 
      label: 'REALITY', 
      desc: 'Physical solid architecture & live hardware telemetry', 
      tag: 'STATUS: NOMINAL' 
    }
  ];

  // Auto-cycle through the 4 stages every 3.8s unless user manually clicks
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  // Subtle interactive 3D tilt tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    // Tilt between -5deg and +5deg
    const tiltY = (px - 0.5) * 8;
    const tiltX = (0.5 - py) * 8;
    setMousePos({ x: Math.round(px * 540), y: Math.round(py * 540), tiltX, tiltY });
  };

  const handleStageSelect = (idx) => {
    setIsAutoCycling(false);
    setCurrentStage(idx);
    audioEngine.playClick();
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[540px] aspect-square rounded-3xl border border-black/10 bg-white/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06),_0_1px_3px_rgba(0,0,0,0.03)] group hover:shadow-[0_25px_70px_rgba(0,102,204,0.14)] transition-all duration-500 select-none"
      style={{
        perspective: '1000px'
      }}
    >
      {/* Top Precision Status Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-black/[0.06] font-mono text-[10px] text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0066CC] animate-pulse" />
          <span className="font-bold text-zinc-950 tracking-wider">IEI.SYS / ARCH-01 · SCHEMATIC</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 hidden sm:inline">X:{mousePos.x || 270} Y:{mousePos.y || 270}</span>
          <span className="text-[#0066CC] font-semibold bg-[#0066CC]/8 px-2 py-0.5 rounded-full border border-[#0066CC]/15">
            {stages[currentStage].tag}
          </span>
        </div>
      </div>

      {/* Center 3D Morphing SVG Viewport */}
      <div 
        className="relative my-auto w-full aspect-square flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${mousePos.tiltX}deg) rotateY(${mousePos.tiltY}deg) scale(1.02)`
        }}
      >
        <svg 
          viewBox="0 0 540 540" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
        >
          <defs>
            {/* Precision Technical Engineering Pattern Grid */}
            <pattern id="blueprintGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0066CC" strokeWidth="0.5" strokeOpacity="0.08" />
            </pattern>
            
            {/* Blueprint Gradient */}
            <linearGradient id="blueprintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
            </linearGradient>

            {/* Reality Volumetric Surface Gradient */}
            <linearGradient id="realitySurface" x1="20%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#0066CC" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.03" />
            </linearGradient>

            {/* Signal Facet Gradient */}
            <linearGradient id="signalFacet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Blueprint Grid Overlay */}
          <rect width="100%" height="100%" fill="url(#blueprintGrid)" opacity="0.6" />

          {/* ========================================================
              STAGE 0: BLUEPRINT (Schematic Graticule & Drafting Arcs)
              ======================================================== */}
          <g 
            className="transition-all duration-700 ease-in-out"
            style={{ 
              opacity: currentStage === 0 ? 1 : 0.08,
              transform: currentStage === 0 ? 'scale(1)' : 'scale(0.98)',
              transformOrigin: '270px 270px'
            }}
          >
            {/* Center Crosshairs */}
            <line x1="40" y1="270" x2="500" y2="270" stroke="rgba(0,0,0,0.15)" strokeDasharray="3 4" strokeWidth="1" />
            <line x1="270" y1="40" x2="270" y2="500" stroke="rgba(0,0,0,0.15)" strokeDasharray="3 4" strokeWidth="1" />

            {/* Concentric Calibration Rings */}
            <circle cx="270" cy="270" r="180" stroke="#0066CC" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.4" />
            <circle cx="270" cy="270" r="110" stroke="#0066CC" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="270" cy="270" r="40" stroke="#0066CC" strokeWidth="1.2" />

            {/* Precision Metric L-Brackets on Corners */}
            <path d="M 90 90 L 110 90 M 90 90 L 90 110" stroke="#0066CC" strokeWidth="1.5" />
            <path d="M 450 90 L 430 90 M 450 90 L 450 110" stroke="#0066CC" strokeWidth="1.5" />
            <path d="M 90 450 L 110 450 M 90 450 L 90 430" stroke="#0066CC" strokeWidth="1.5" />
            <path d="M 450 450 L 430 450 M 450 450 L 450 430" stroke="#0066CC" strokeWidth="1.5" />

            {/* Rotating Caliper Radar Sweep */}
            <g className="origin-[270px_270px] animate-[spin_16s_linear_infinite]">
              <line x1="270" y1="270" x2="450" y2="180" stroke="#0066CC" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <circle cx="450" cy="180" r="4" fill="#0066CC" className="animate-ping" />
              <circle cx="450" cy="180" r="2.5" fill="#0066CC" />
            </g>

            <text x="50" y="80" fill="#71717A" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
              IEI.SYS / ARCH-01 · SCHEMATIC
            </text>
            <text x="360" y="475" fill="#0066CC" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em" fontWeight="600">
              TOLERANCE ±0.002mm
            </text>
          </g>

          {/* ========================================================
              STAGE 1: STRUCTURE (Isometric Polyhedron Lattice)
              ======================================================== */}
          <g 
            className="transition-all duration-700 ease-in-out"
            style={{ 
              opacity: currentStage === 1 ? 1 : 0.05,
              transform: currentStage === 1 ? 'scale(1)' : 'scale(0.96)',
              transformOrigin: '270px 270px'
            }}
          >
            {/* Top Isometric Diamond Face */}
            <polygon points="270,120 380,180 270,240 160,180" stroke="#0066CC" strokeWidth="1.75" fill="none" />
            
            {/* Left Isometric Face */}
            <polygon points="160,180 270,240 270,370 160,310" stroke="#0066CC" strokeWidth="1.75" fill="none" />
            
            {/* Right Isometric Face */}
            <polygon points="270,240 380,180 380,310 270,370" stroke="#0066CC" strokeWidth="1.75" fill="none" />

            {/* Internal Geometric Support Trusses */}
            <line x1="270" y1="180" x2="270" y2="310" stroke="rgba(0,0,0,0.18)" strokeDasharray="2 3" strokeWidth="1" />
            <line x1="215" y1="210" x2="325" y2="275" stroke="rgba(0,0,0,0.18)" strokeDasharray="2 3" strokeWidth="1" />
            <line x1="325" y1="210" x2="215" y2="275" stroke="rgba(0,0,0,0.18)" strokeDasharray="2 3" strokeWidth="1" />

            {/* Glowing Coordinate Node Vertices */}
            <circle cx="270" cy="120" r="4" fill="#0066CC" />
            <circle cx="380" cy="180" r="4" fill="#0066CC" />
            <circle cx="160" cy="180" r="4" fill="#0066CC" />
            <circle cx="270" cy="240" r="6" fill="#FF6B00" className="animate-pulse" />
            <circle cx="270" cy="370" r="4" fill="#0066CC" />
            <circle cx="160" cy="310" r="4" fill="#0066CC" />
            <circle cx="380" cy="310" r="4" fill="#0066CC" />
          </g>

          {/* ========================================================
              STAGE 2: FORM (Translucent Volumetric Shaded Facets)
              ======================================================== */}
          <g 
            className="transition-all duration-700 ease-in-out"
            style={{ 
              opacity: currentStage === 2 ? 1 : 0.05,
              transform: currentStage === 2 ? 'scale(1)' : 'scale(0.96)',
              transformOrigin: '270px 270px'
            }}
          >
            {/* Top Light Catching Facet */}
            <polygon 
              points="270,120 380,180 270,240 160,180" 
              fill="url(#realitySurface)" 
              stroke="#0066CC" 
              strokeWidth="1.2" 
            />
            
            {/* Left Shaded Volumetric Body */}
            <polygon 
              points="160,180 270,240 270,370 160,310" 
              fill="#0A0A0A" 
              fillOpacity="0.05" 
              stroke="#0052A3" 
              strokeWidth="1.2" 
            />
            
            {/* Right Ambient Facet */}
            <polygon 
              points="270,240 380,180 380,310 270,370" 
              fill="#0A0A0A" 
              fillOpacity="0.09" 
              stroke="#0052A3" 
              strokeWidth="1.2" 
            />
            
            {/* Center Core Floating Amber Crystal */}
            <polygon 
              points="270,210 325,240 270,270 215,240" 
              fill="url(#signalFacet)" 
              stroke="#FF6B00" 
              strokeWidth="1.2" 
            />
          </g>

          {/* ========================================================
              STAGE 3: REALITY (Solid Tangible Architectural Solid)
              ======================================================== */}
          <g 
            className="transition-all duration-700 ease-in-out"
            style={{ 
              opacity: currentStage === 3 ? 1 : 0.05,
              transform: currentStage === 3 ? 'scale(1)' : 'scale(0.96)',
              transformOrigin: '270px 270px'
            }}
          >
            {/* Top Chamfered Surface */}
            <polygon 
              points="270,105 400,175 270,245 140,175" 
              fill="#FFFFFF" 
              stroke="#0A0A0A" 
              strokeWidth="2" 
              filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))"
            />
            
            {/* Left Physical Body Face */}
            <polygon 
              points="140,175 270,245 270,390 140,320" 
              fill="#F4F4F6" 
              stroke="#0A0A0A" 
              strokeWidth="2" 
            />
            
            {/* Right Physical Body Face */}
            <polygon 
              points="270,245 400,175 400,320 270,390" 
              fill="#EAEAF0" 
              stroke="#0A0A0A" 
              strokeWidth="2" 
            />

            {/* Center Signal Power Core */}
            <circle cx="270" cy="245" r="9" fill="#FF6B00" />
            <circle cx="270" cy="245" r="16" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin origin-[270px_270px]" />

            {/* High-Tech Telemetry Accent Rails */}
            <path d="M 210 140 L 330 210" stroke="#0066CC" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 270 270 L 270 360" stroke="#0066CC" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 330 280 L 370 260" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Bottom Interactive Evolution Stage Tracker */}
      <div className="relative z-10 pt-4 border-t border-black/[0.06] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">
            ENGINEERING EVOLUTION
          </span>
          <span className="font-mono text-[9px] text-[#0066CC] font-bold">
            STAGE 0{currentStage + 1} / 04
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-zinc-100/80 border border-black/5">
          {stages.map((st, idx) => {
            const isActive = currentStage === idx;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleStageSelect(idx)}
                className={`py-1.5 px-1 sm:px-2 rounded-lg font-mono text-[9px] sm:text-[10px] font-bold tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  isActive 
                    ? 'bg-white text-zinc-950 shadow-sm border border-black/5' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-white/50'
                }`}
              >
                <span 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isActive ? 'bg-[#0066CC] scale-125' : 'bg-zinc-300'
                  }`} 
                />
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        <div className="font-sans text-[11px] text-zinc-600 truncate text-center">
          {stages[currentStage].desc}
        </div>
      </div>
    </div>
  );
}
