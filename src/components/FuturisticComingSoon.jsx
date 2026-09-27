import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function FuturisticComingSoon({
  pageName = 'Module',
  moduleCode = 'SYS-01',
  domainIcon: DomainIcon = Sparkles
}) {
  const loadingPhrases = [
    'CALIBRATING CHAPTER TESTBENCHES...',
    'SYNCHRONIZING TELEMETRY NODES...',
    'INITIALIZING 7 ECS DOMAINS...',
    'DEPLOYING OFFICIAL FRAMEWORKS...',
    'ESTABLISHING SECURE PROTOCOLS...'
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [loadingPhrases.length]);

  return (
    <div className="relative min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-20 text-zinc-950 select-none">
      
      {/* Soft Ambient Background Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0062FF 1px, transparent 1px),
              linear-gradient(to bottom, #0062FF 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* TOP META NAVIGATION BAR */}
        <div className="w-full flex items-center justify-between mb-12 pb-3 border-b border-black/[0.06]">
          <a
            href="#/"
            onClick={() => audioEngine.playClick()}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-400 hover:text-zinc-950 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1 text-[#0062FF]" />
            <span>Return to About</span>
          </a>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#0062FF] animate-ping" />
            <span className="text-zinc-700 font-bold tracking-wider">{moduleCode}</span>
          </div>
        </div>

        {/* 1. FUTURISTIC GYROSCOPIC SCANNER */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer Dashed Orbit (Clockwise) */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-dashed border-[#0062FF]/40 animate-[spin_18s_linear_infinite] flex items-center justify-center p-2.5">
            {/* Middle Laser Reticle (Counter-clockwise) */}
            <div className="w-full h-full rounded-full border border-black/10 animate-[spin_10s_linear_infinite_reverse] flex items-center justify-center p-2">
              {/* Inner Glowing Core */}
              <div className="w-full h-full rounded-full bg-white border border-[#0062FF]/25 shadow-[0_8px_30px_rgba(0,98,255,0.18)] flex items-center justify-center">
                <DomainIcon size={24} className="text-[#0062FF] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sweeping 360° Laser Reticle */}
          <div className="absolute inset-0 pointer-events-none rounded-full flex items-center justify-center">
            <div className="w-24 sm:w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#0062FF] to-transparent animate-[spin_2.5s_linear_infinite]" />
          </div>

          {/* Holographic Degrees */}
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#0062FF] font-bold">
            000°
          </span>
          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[8px] text-zinc-400 font-bold">
            180°
          </span>
        </div>

        {/* 2. SECTION TITLE */}
        <h1 className="font-display text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-2">
          {pageName}
        </h1>

        {/* 3. COMING SOON LIKE IT'S LOADINGGGGGG */}
        <div className="flex items-center justify-center gap-1 font-display font-black text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-[#0062FF] to-cyan-500 tracking-tight my-3">
          <span>Coming Soon</span>
          <span className="inline-flex tracking-normal ml-0.5">
            <span className="animate-[pulse_1.2s_infinite] text-[#0062FF]">.</span>
            <span className="animate-[pulse_1.2s_infinite_200ms] text-[#0062FF]">.</span>
            <span className="animate-[pulse_1.2s_infinite_400ms] text-[#0062FF]">.</span>
          </span>
        </div>

        {/* 4. DYNAMIC INFINITE FUTURISTIC LOADING SCAN BAR */}
        <div className="w-64 sm:w-80 h-1.5 bg-zinc-100 rounded-full overflow-hidden my-4 relative border border-black/5">
          <div 
            className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-[#0062FF] to-transparent rounded-full animate-infinite-loader shadow-[0_0_10px_#0062FF]" 
          />
        </div>

        {/* 5. CYCLING TELEMETRY PHRASE */}
        <p className="font-mono text-xs text-zinc-500 tracking-wider mt-1 transition-opacity duration-300">
          {loadingPhrases[phraseIndex]}
        </p>

        {/* AI NEURAL TELEMETRY CHIP */}
        <div className="mt-4 px-3.5 py-1.2 rounded-full bg-blue-50/80 border border-blue-200/60 font-mono text-[10px] text-[#0062FF] flex items-center gap-1.5 shadow-2xs">
          <Sparkles size={11} className="text-[#0062FF] animate-pulse" />
          <span>AI NEURAL ENGINE: SYNCING ECS ASSETS</span>
        </div>

        {/* HUMAN CRAFTSMANSHIP FOOTNOTE */}
        <div className="mt-6 flex items-center justify-center gap-1.5 font-mono text-[11px] text-zinc-500">
          <span>Handcrafted with</span>
          <span className="text-red-500 animate-pulse text-xs">♥</span>
          <span>by SIES GST Students · Tenure 1</span>
        </div>

        {/* 6. CLEAN RETURN ANCHOR */}
        <div className="mt-6">
          <a
            href="#/"
            onClick={() => audioEngine.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 hover:border-black/25 bg-white hover:bg-zinc-50 text-xs font-mono font-semibold text-zinc-600 hover:text-black shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft size={12} className="text-[#0062FF]" />
            <span>Return to About</span>
          </a>
        </div>

      </div>
    </div>
  );
}
