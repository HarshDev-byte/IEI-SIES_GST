import React, { useState } from 'react';
import { 
  Camera, 
  Aperture, 
  Sparkles, 
  Zap,
  Layers,
  Terminal,
  Cpu,
  Flame
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function SmoothChapterGallery() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [snapCount, setSnapCount] = useState(0);
  const [isoIndex, setIsoIndex] = useState(1);

  const isoSettings = ['ISO 200 · 1/1000s', 'ISO 400 · 1/500s', 'ISO 800 · 1/250s', 'ISO 1600 · 1/125s'];

  // Trigger Shutter Snap with Sound & Screen Flash
  const handleSnapShutter = () => {
    audioEngine.playPlotterTick();
    setIsFlashing(true);
    setSnapCount(prev => prev + 1);

    setTimeout(() => {
      audioEngine.playClick();
      setIsFlashing(false);
    }, 180);
  };

  // Cycle Exposure
  const handleCycleISO = () => {
    audioEngine.playClick();
    setIsoIndex((prev) => (prev + 1) % isoSettings.length);
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-20 z-10" aria-label="Chapter Photographic Archive">
      
      {/* CAMERA SHUTTER RADIAL FLASH EFFECT */}
      {isFlashing && (
        <div 
          className="fixed inset-0 z-50 bg-white/90 pointer-events-none transition-opacity duration-150 animate-out fade-out"
          style={{ backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="badge-minimal badge-blue">
              CHAPTER VISUAL ARCHIVE
            </span>
            <span className="badge-minimal badge-gold">
              TENURE 1 · 2026–2027
            </span>
          </div>

          <h3 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
            Chapter Photographic Archive
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
            Visual documentation of hands-on laboratory testbenches, technical symposiums, hackathons, and collegiate investitures at SIES GST.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 font-mono text-xs font-semibold border border-black/[0.06] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0062FF] animate-pulse" />
            <span>ARCHIVE UNDER PREPARATION</span>
          </div>

          <button
            type="button"
            onClick={handleSnapShutter}
            title="Snap preview frame"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-700 font-mono text-xs font-medium border border-black/10 hover:border-black/20 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Camera size={13} className="text-[#0062FF]" />
            <span>Snap Shutter {snapCount > 0 && `(${snapCount})`}</span>
          </button>
        </div>
      </div>

      {/* MASTER ARCHITECTURAL VIEWFINDER COMING SOON CARD */}
      <div className="relative rounded-3xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* CAD CORNER CROSSHAIRS */}
        <span className="absolute top-3.5 left-3.5 text-zinc-400 font-mono text-xs select-none pointer-events-none z-20">┌</span>
        <span className="absolute top-3.5 right-3.5 text-zinc-400 font-mono text-xs select-none pointer-events-none z-20">┐</span>
        <span className="absolute bottom-3.5 left-3.5 text-zinc-400 font-mono text-xs select-none pointer-events-none z-20">└</span>
        <span className="absolute bottom-3.5 right-3.5 text-zinc-400 font-mono text-xs select-none pointer-events-none z-20">┘</span>

        {/* TOP CAMERA VIEWFINDER HUD BAR */}
        <div className="bg-zinc-50/80 backdrop-blur-sm border-b border-black/[0.06] px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-red-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>REC [LIVE]</span>
            </div>
            <span className="text-zinc-300">|</span>
            <button 
              type="button"
              onClick={handleCycleISO}
              className="hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer"
              title="Click to cycle exposure settings"
            >
              <Aperture size={12} className="text-[#0062FF]" />
              <span>{isoSettings[isoIndex]} · ƒ/1.8 RAW</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline text-zinc-400">COLOR: DCI-P3 · 61MP HDR</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 border border-blue-200/60 text-[#0062FF] font-semibold">
              <Zap size={10} />
              <span>CURATION PROTOCOL: 84% SYNCED</span>
            </div>
          </div>
        </div>

        {/* SHOWCASE BODY */}
        <div className="p-8 sm:p-14 lg:p-16 text-center relative">
          
          {/* AMBIENT RADIAL LIGHTING */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/[0.035] blur-[90px] pointer-events-none" />

          {/* ICON & STATUS DISPLAY */}
          <div className="flex flex-col items-center max-w-3xl mx-auto">
            
            {/* Pulsing Interactive Lens Shutter Badge */}
            <div 
              onClick={handleSnapShutter}
              className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center cursor-pointer group"
              title="Click to trigger camera flash"
            >
              {/* Outer Dashed Orbit */}
              <div className="absolute inset-0 rounded-3xl border border-dashed border-[#0062FF]/40 animate-[spin_25s_linear_infinite]" />
              
              {/* Pulse Wave */}
              <div className="absolute inset-1 rounded-2xl bg-[#0062FF]/10 animate-ping opacity-25" />
              
              {/* Core Badge */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white to-blue-50/80 border border-[#0062FF]/30 flex items-center justify-center text-[#0062FF] shadow-[0_8px_30px_rgba(0,98,255,0.15)] group-hover:scale-105 group-hover:border-[#0062FF] group-active:scale-95 transition-all">
                <Camera size={34} strokeWidth={1.8} className="transition-transform group-hover:rotate-6" />
              </div>

              {/* Viewfinder corner ticks */}
              <span className="absolute -top-1 -right-1 text-[#0062FF] font-mono text-[9px] font-bold">4K</span>
            </div>

            {/* Micro Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50/80 border border-blue-200/60 font-mono text-[11px] text-[#0062FF] font-bold mb-4 shadow-2xs">
              <Sparkles size={11} className="text-[#0062FF] animate-pulse" />
              <span>TENURE 1 · 2026–2027 ARCHIVE PIPELINE</span>
            </div>

            {/* Core Heading */}
            <h4 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight mb-4">
              Interesting events coming soon
              <span className="inline-flex ml-1 text-[#0062FF]">
                <span className="animate-[pulse_1.2s_infinite]">.</span>
                <span className="animate-[pulse_1.2s_infinite_200ms]">.</span>
                <span className="animate-[pulse_1.2s_infinite_400ms]">.</span>
                <span className="animate-[pulse_1.2s_infinite_600ms]">.</span>
              </span>
            </h4>

            {/* Description */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal mb-8">
              Our upcoming lineup of hands-on laboratory testbenches, inter-collegiate hackathons, expert industry keynotes, and technical symposia is currently being finalized with faculty patrons and mentors. Full photographic documentation, session highlights, and event galleries will be archived live right here as each event unfolds.
            </p>

            {/* 4 PILLAR CHIPS (COMPACT INLINE TAGS) */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-mono text-xs font-medium border border-black/5">
                <Cpu size={12} className="text-[#0062FF]" />
                <span>Hands-on Testbenches</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-mono text-xs font-medium border border-black/5">
                <Terminal size={12} className="text-[#0062FF]" />
                <span>Collegiate Hackathons</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-mono text-xs font-medium border border-black/5">
                <Flame size={12} className="text-[#0062FF]" />
                <span>Industry Keynotes</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-mono text-xs font-medium border border-black/5">
                <Layers size={12} className="text-[#0062FF]" />
                <span>Technical Symposia</span>
              </span>
            </div>

            {/* DYNAMIC PROGRESS METER */}
            <div className="w-full max-w-md pt-6 border-t border-black/[0.06]">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-500">Archival Curation Progress</span>
                <span className="font-bold text-[#0062FF]">84% Synced</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-black/5">
                <div 
                  className="h-full bg-gradient-to-r from-[#0062FF] via-cyan-400 to-[#0062FF] rounded-full relative"
                  style={{ width: '84%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
                <span>Faculty Patron Review [APPROVED]</span>
                <span>Asset Pipeline [ACTIVE]</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
