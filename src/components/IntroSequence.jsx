import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowDown } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/**
 * Cinematic Identity Intro matching iei-eight.vercel.app
 * Features the large typography: IEI SIES GST / STUDENT CHAPTER
 * and the vector drafting rings and drawing vector emblem with Skip Intro option.
 */
export default function IntroSequence({ onSkip, onEnter, isCompleted }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 0.85)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isCompleted && scrollProgress >= 0.95) return null;

  return (
    <section 
      id="intro-stage"
      className="relative w-full h-[180vh] pointer-events-none"
      aria-label="IEI SIES GST — Cinematic Identity Intro"
    >
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-between py-12 px-4 sm:px-6 pointer-events-auto z-30">
        
        {/* Top Vignette Header */}
        <div className="flex items-center justify-between w-full max-w-6xl pt-6 text-xs font-mono text-white/40">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF] animate-ping" />
            <span className="text-white/70">SIES GST · STUDENT CHAPTER</span>
          </span>
          <span className="text-[#D6A85F]">CHARTER EST. 1920</span>
        </div>

        {/* Center: Monumental Intro Identity */}
        <div 
          className="my-auto text-center flex flex-col items-center transition-all duration-300"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            transform: `translateY(${-scrollProgress * 60}px) scale(${1 - scrollProgress * 0.1})`
          }}
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 mb-6 relative p-1.5 rounded-full bg-white/[0.04] border border-white/15 shadow-[0_0_60px_rgba(0,168,255,0.4)]">
            <img 
              src="/iei-official-logo.png" 
              alt="Official IEI Emblem" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,168,255,0.6)]"
            />
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-ultra-tight leading-none mb-3">
            IEI SIES GST
          </h1>

          <div className="font-mono text-sm sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#00D6FF] via-[#00A8FF] to-[#075BFF] tracking-[0.25em] uppercase font-bold">
            STUDENT CHAPTER
          </div>

          <p className="font-sans text-xs sm:text-sm text-white/50 max-w-md mt-4 leading-relaxed font-normal">
            Department of Electronics & Computer Science Engineering<br/>
            SIES Graduate School of Technology, Nerul, Navi Mumbai
          </p>
        </div>

        {/* Bottom Scroll Cue and Skip Intro */}
        <div className="flex items-center justify-between w-full max-w-6xl pb-4 border-t border-white/[0.06] pt-4 font-mono text-xs text-white/40">
          <div className="flex items-center gap-2 text-[#00D6FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF]" />
            <span className="tracking-widest uppercase text-[10px]">SCROLL TO ENTER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>

          <button
            type="button"
            onClick={() => {
              audioEngine.playClick();
              onSkip();
            }}
            className="text-[11px] font-mono text-white/50 hover:text-white transition-colors flex items-center gap-1.5 border border-white/10 px-3 py-1 rounded bg-white/[0.02]"
            data-cursor="SKIP"
          >
            <span>Skip Intro [↓]</span>
          </button>
        </div>

      </div>
    </section>
  );
}
