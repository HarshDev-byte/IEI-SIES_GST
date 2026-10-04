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
      <div className="sticky top-0 left-0 w-full min-h-[100svh] h-[100svh] flex flex-col items-center justify-between pt-[calc(env(safe-area-inset-top,0px)+1rem)] pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] px-4 sm:px-6 pointer-events-auto z-30">
        
        {/* Top Vignette Header */}
        <div className="flex items-center justify-between w-full max-w-6xl text-[10px] sm:text-xs font-mono text-white/40">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF] animate-ping" />
            <span className="text-white/70">SIES GST · STUDENT CHAPTER</span>
          </span>
          <span className="text-[#D6A85F]">CHARTER EST. 1920</span>
        </div>

        {/* Center: Monumental Intro Identity */}
        <div 
          className="my-auto text-center flex flex-col items-center transition-all duration-300 px-2"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            transform: `translateY(${-scrollProgress * 60}px) scale(${1 - scrollProgress * 0.1})`
          }}
        >
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 sm:mb-6 relative p-1.5 rounded-full bg-white/[0.04] border border-white/15 shadow-[0_0_60px_rgba(0,168,255,0.4)]">
            <img 
              src="/iei-official-logo.png" 
              alt="Official IEI Emblem" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,168,255,0.6)]"
            />
          </div>

          <h1 className="font-display font-black text-[clamp(2.2rem,8.5vw,7.5rem)] text-white tracking-ultra-tight leading-none mb-2.5 sm:mb-3">
            IEI SIES GST
          </h1>

          <div className="font-mono text-xs sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#00D6FF] via-[#00A8FF] to-[#075BFF] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold">
            STUDENT CHAPTER
          </div>

          <p className="font-sans text-[11px] sm:text-sm text-white/50 max-w-md mt-3 sm:mt-4 leading-relaxed font-normal">
            Department of Electronics & Computer Science Engineering<br/>
            SIES Graduate School of Technology, Nerul, Navi Mumbai
          </p>
        </div>

        {/* Bottom Scroll Cue and Skip Intro */}
        <div className="flex items-center justify-between w-full max-w-6xl pb-2 border-t border-white/[0.06] pt-3 font-mono text-[10px] sm:text-xs text-white/40 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[#00D6FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF]" />
            <span className="tracking-widest uppercase text-[9px] sm:text-[10px]">SCROLL TO ENTER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>

          <button
            type="button"
            onClick={() => {
              audioEngine.playClick();
              onSkip();
            }}
            className="text-[10px] sm:text-[11px] font-mono text-white/50 hover:text-white transition-colors flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded bg-white/[0.02]"
            data-cursor="SKIP"
          >
            <span>Skip Intro [↓]</span>
          </button>
        </div>

      </div>
    </section>
  );
}
