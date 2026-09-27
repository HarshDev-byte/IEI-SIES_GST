import React, { useState, useEffect, useRef } from 'react';
import { Compass, RotateCw, Layers, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ArchitecturalEmblemDrafting() {
  const [activeLayer, setActiveLayer] = useState('all'); // 'all' | 'gears' | 'rings' | 'telemetry'
  const [mouseCoord, setMouseCoord] = useState({ x: 200, y: 200, angle: 45 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Track mouse coordinates across the drafting canvas
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 400);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 400);
    const dx = x - 200;
    const dy = y - 200;
    const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI + 180);
    setMouseCoord({ x, y, angle });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[460px] aspect-square rounded-3xl border border-black/10 bg-white p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.04)] group hover:shadow-[0_25px_60px_rgba(0,98,255,0.12)] transition-all duration-500 select-none"
    >
      {/* Precision Drafting Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Top Drafting Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-zinc-500 pb-2.5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-zinc-950 tracking-wider">FIG.01 · EMBLEM SCHEMATIC</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#0062FF] font-semibold bg-[#0062FF]/8 px-2 py-0.5 rounded-full border border-[#0062FF]/15">
          <span>X:{mouseCoord.x}mm</span>
          <span>·</span>
          <span>Y:{mouseCoord.y}mm</span>
          <span>·</span>
          <span>θ:{mouseCoord.angle}°</span>
        </div>
      </div>

      {/* Center Drafting SVG Viewport */}
      <div className="relative my-auto w-full aspect-square flex items-center justify-center">
        
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Crosshair Graticule Lines */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(0,0,0,0.08)" strokeDasharray="3 4" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(0,0,0,0.08)" strokeDasharray="3 4" strokeWidth="1" />

          {/* Coordinate Diagonal Tangents */}
          <line x1="72" y1="72" x2="328" y2="328" stroke="rgba(0,0,0,0.04)" strokeDasharray="2 4" strokeWidth="0.75" />
          <line x1="328" y1="72" x2="72" y2="328" stroke="rgba(0,0,0,0.04)" strokeDasharray="2 4" strokeWidth="0.75" />

          {/* LAYER: BLUEPRINT RINGS */}
          {(activeLayer === 'all' || activeLayer === 'rings') && (
            <g className="origin-[200px_200px] animate-[spin_32s_linear_infinite]">
              {/* Outer Calibration Compass Ring */}
              <circle cx="200" cy="200" r="185" stroke="rgba(0,0,0,0.08)" strokeWidth="0.75" strokeDasharray="4 6" />
              <circle cx="200" cy="200" r="172" stroke="#0062FF" strokeWidth="1" strokeDasharray="2 8" opacity="0.4" />
              
              {/* Metric Cardinal Markers */}
              <circle cx="200" cy="15" r="3" fill="#0062FF" />
              <circle cx="200" cy="385" r="3" fill="#0062FF" />
              <circle cx="15" cy="200" r="3" fill="#0062FF" />
              <circle cx="385" cy="200" r="3" fill="#0062FF" />

              <text x="204" y="24" fill="#0062FF" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">000°</text>
              <text x="365" y="204" fill="#0062FF" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">090°</text>
              <text x="204" y="380" fill="#0062FF" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">180°</text>
              <text x="20" y="204" fill="#0062FF" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">270°</text>
            </g>
          )}

          {/* LAYER: GEAR TRAIN (16 Precision Gear Teeth of the Official IEI Emblem) */}
          {(activeLayer === 'all' || activeLayer === 'gears') && (
            <g className="origin-[200px_200px] animate-[spin_24s_linear_infinite_reverse]">
              {/* Gear Circle Track */}
              <circle cx="200" cy="200" r="132" stroke="#0062FF" strokeWidth="1.25" strokeDasharray="6 4" opacity="0.75" />
              
              {/* 16 Precision Radial Spoke Teeth */}
              {[...Array(16)].map((_, idx) => {
                const angle = (idx * 360) / 16;
                return (
                  <g key={idx} transform={`rotate(${angle} 200 200)`}>
                    <line x1="200" y1="68" x2="200" y2="82" stroke="#0062FF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
                    <circle cx="200" cy="85" r="1.5" fill="#0062FF" />
                  </g>
                );
              })}

              <circle cx="200" cy="200" r="115" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            </g>
          )}

          {/* Rotating Precision Caliper Arm */}
          <g className="origin-[200px_200px] animate-[spin_12s_linear_infinite]">
            <line x1="200" y1="200" x2="330" y2="100" stroke="#0062FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="330" cy="100" r="4" fill="#0062FF" className="animate-ping origin-[330px_100px]" />
            <circle cx="330" cy="100" r="2.5" fill="#0062FF" />
          </g>

          {/* LAYER: TELEMETRY CALLOUT NODES */}
          {(activeLayer === 'all' || activeLayer === 'telemetry') && (
            <g>
              {/* Node A: AI / Computing */}
              <circle cx="110" cy="130" r="3" fill="#0062FF" />
              <line x1="110" y1="130" x2="80" y2="105" stroke="#0062FF" strokeWidth="0.75" opacity="0.7" />
              <text x="50" y="100" fill="#0062FF" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">ECS·ALGO</text>

              {/* Node B: Hardware / VLSI */}
              <circle cx="290" cy="130" r="3" fill="#10B981" />
              <line x1="290" y1="130" x2="320" y2="105" stroke="#10B981" strokeWidth="0.75" opacity="0.7" />
              <text x="300" y="100" fill="#047857" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">SILICON·VLSI</text>

              {/* Node C: Robotics / CleanTech */}
              <circle cx="270" cy="285" r="3" fill="#F59E0B" />
              <line x1="270" y1="285" x2="300" y2="305" stroke="#F59E0B" strokeWidth="0.75" opacity="0.7" />
              <text x="305" y="310" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">ROBOTICS·IoT</text>
            </g>
          )}

          {/* Central Precision Hexagon Inscription */}
          <polygon 
            points="200,145 248,172 248,228 200,255 152,228 152,172" 
            stroke="#0062FF" 
            strokeWidth="1.25" 
            fill="rgba(0,98,255,0.03)" 
          />
        </svg>

        {/* Central Official Emblem Shield with Drop Shadow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-black/10 bg-white shadow-[0_12px_35px_rgba(0,98,255,0.12)] flex items-center justify-center p-2 transition-transform group-hover:scale-108 duration-300">
            <img 
              src="/iei-official-logo.png" 
              alt="Official Emblem" 
              className="w-full h-full object-contain filter drop-shadow-sm" 
            />
          </div>
        </div>

      </div>

      {/* Bottom Layer Controller Strip */}
      <div className="relative z-10 pt-2.5 border-t border-black/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 font-mono text-[9px]">
          {['all', 'gears', 'rings', 'telemetry'].map((lyr) => (
            <button
              key={lyr}
              onClick={() => {
                setActiveLayer(lyr);
                audioEngine.playClick();
              }}
              className={`px-2 py-1 rounded-md transition-all uppercase font-semibold cursor-pointer ${
                activeLayer === lyr 
                  ? 'bg-zinc-950 text-white shadow-xs' 
                  : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
              }`}
            >
              {lyr}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400">
          <Compass size={11} className="text-[#0062FF]" />
          <span>ROYAL CHARTER 1935</span>
        </div>
      </div>

    </div>
  );
}
