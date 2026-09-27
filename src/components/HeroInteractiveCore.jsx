import React, { useState, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';

export default function HeroInteractiveCore({ onOpenVerify }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mouseCoord, setMouseCoord] = useState({ x: 260, y: 195, angle: 42 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Smooth 3D perspective tilt & coordinate tracking across the drafting canvas
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(yPct * 6), y: xPct * 6 });

    const x = Math.round(((e.clientX - rect.left) / rect.width) * 400);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 400);
    const dx = x - 200;
    const dy = y - 200;
    const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI + 180);
    setMouseCoord({ x, y, angle });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="w-full max-w-[500px] select-none">
      {/* Main Architectural Showcase Container */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          audioEngine.playClick();
          if (onOpenVerify) onOpenVerify();
        }}
        title="Click to view Official Royal Charter & Accreditations"
        className="w-full rounded-3xl border border-black/[0.08] bg-white p-7 sm:p-9 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.05),_0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(0,82,214,0.1)] transition-all duration-300 relative overflow-hidden group cursor-pointer"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
        }}
      >
        {/* Subtle Architectural Blueprint Millimeter Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0052D6 1px, transparent 1px),
              linear-gradient(to bottom, #0052D6 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Warm Ceramic Glow */}
        <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-blue-500/[0.04] blur-[80px] pointer-events-none" />

        {/* Top Minimal Telemetry HUD */}
        <div className="w-full relative z-10 flex items-center justify-between font-mono text-[10px] text-zinc-400 pb-3 border-b border-black/[0.05]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052D6] animate-pulse" />
            <span className="font-bold text-zinc-800 tracking-wider">ROYAL CHARTER 1935</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-400">SEAL #602</span>
          </div>

          <div className="text-[#0052D6] font-semibold bg-[#0052D6]/8 px-2 py-0.5 rounded-full text-[9px] border border-[#0052D6]/15">
            <span>X:{mouseCoord.x} · Y:{mouseCoord.y} · θ:{mouseCoord.angle}°</span>
          </div>
        </div>

        {/* Centerpiece: Hypnotic Vector Blueprint & Official Royal Seal */}
        <div className="relative my-6 flex items-center justify-center">
          
          <div className="w-60 h-60 sm:w-64 sm:h-64 relative flex items-center justify-center">
            
            <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none select-none">
              {/* Graticule Crosshairs */}
              <line x1="16" y1="160" x2="304" y2="160" stroke="#0052D6" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.35" />
              <line x1="160" y1="16" x2="160" y2="304" stroke="#0052D6" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.35" />

              {/* Outer 360° Azimuth Compass Ring */}
              <g className="origin-[160px_160px] animate-[spin_45s_linear_infinite]">
                <circle cx="160" cy="160" r="148" stroke="#0052D6" strokeWidth="1" strokeDasharray="2 6" opacity="0.45" />
                <circle cx="160" cy="160" r="140" stroke="rgba(0,0,0,0.1)" strokeWidth="0.75" />
                
                {/* Cardinal Nodes */}
                <circle cx="160" cy="12" r="2.5" fill="#0052D6" />
                <circle cx="308" cy="160" r="2.5" fill="#0052D6" />
                <circle cx="160" cy="308" r="2.5" fill="#0052D6" />
                <circle cx="12" cy="160" r="2.5" fill="#0052D6" />

                <text x="160" y="25" fill="#0052D6" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="800" textAnchor="middle">000°</text>
                <text x="295" y="163" fill="#0052D6" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="800" textAnchor="middle">090°</text>
                <text x="160" y="300" fill="#0052D6" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="800" textAnchor="middle">180°</text>
                <text x="25" y="163" fill="#0052D6" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="800" textAnchor="middle">270°</text>
              </g>

              {/* 16-Tooth Precision Epicyclic Gear Track (Iconic IEI Emblem Cogs) */}
              <g className="origin-[160px_160px] animate-[spin_30s_linear_infinite_reverse]">
                <circle cx="160" cy="160" r="112" stroke="#0052D6" strokeWidth="1.25" strokeDasharray="5 3" opacity="0.55" />
                {[...Array(16)].map((_, i) => {
                  const angle = (i * 360) / 16;
                  return (
                    <g key={i} transform={`rotate(${angle} 160 160)`}>
                      <line x1="160" y1="50" x2="160" y2="60" stroke="#0052D6" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <circle cx="160" cy="63" r="1" fill="#0052D6" />
                    </g>
                  );
                })}
              </g>

              {/* Vernier Dimension Leader Line */}
              <g className="origin-[160px_160px] animate-[spin_20s_linear_infinite]">
                <line x1="160" y1="160" x2="260" y2="75" stroke="#0062FF" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
                <circle cx="260" cy="75" r="3.5" fill="#0062FF" className="animate-pulse" />
                <text x="268" y="73" fill="#0052D6" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="700">Ø 120mm</text>
              </g>
            </svg>

            {/* Central Optical Lens with High-Resolution Royal Seal */}
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-black/10 bg-white p-3.5 shadow-[0_16px_45px_rgba(0,82,214,0.18)] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(0,82,214,0.25)] relative z-10">
              <img 
                src="/iei-official-logo.png" 
                alt="The Institution of Engineers (India) Official Royal Seal" 
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Inscription & Clean Typography Block */}
        <div className="w-full text-center relative z-10">
          <h3 className="font-display text-lg sm:text-xl font-black text-zinc-950 tracking-tight">
            THE INSTITUTION OF ENGINEERS (INDIA)
          </h3>
          <p className="font-sans text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
            SIES Graduate School of Technology Student Chapter
          </p>

          {/* Minimal 3-Metric Horizon (Clean Numbers, Zero Box Clutter) */}
          <div className="flex items-center justify-center gap-6 sm:gap-9 mt-5 pt-4 border-t border-black/[0.06]">
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-zinc-950">1920</div>
              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">Founding</div>
            </div>
            <div className="h-6 w-[1px] bg-black/[0.08]" />
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-[#0052D6]">1935</div>
              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">Royal Charter</div>
            </div>
            <div className="h-6 w-[1px] bg-black/[0.08]" />
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-emerald-700">SIRO</div>
              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">DSIR Govt.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


