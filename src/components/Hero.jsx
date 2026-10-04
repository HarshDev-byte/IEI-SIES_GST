import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/*
 * IEI SIES GST — HOMEPAGE HERO MOTION CHOREOGRAPHY
 * Sequential reveal sequence (0.00s – 2.20s). All entrance motions play once,
 * then everything settles into a completely calm, static editorial state.
 */

const HERO_MOTION_STYLES = `
  /* 01. Emblem entrance: scale 0.92 -> 1, opacity 0 -> 1 */
  @keyframes hero-emblem-in {
    0% {
      opacity: 0;
      transform: scale(0.92);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* 02. IEI SIES GST wordmark: translateY 10px -> 0, opacity 0 -> 1 */
  @keyframes hero-title-in {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 03. Single subtle blue light sweep across title */
  @keyframes hero-sweep-pass {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  /* 05. Main headline lines */
  @keyframes hero-line-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 06. Innovation blue word */
  @keyframes hero-innovation-reveal {
    0% {
      clip-path: inset(0 100% 0 0);
      opacity: 0;
    }
    1% {
      opacity: 1;
    }
    100% {
      clip-path: inset(0 0% 0 0);
      opacity: 1;
    }
  }

  /* 07. Department staggered reveal & live accent */
  @keyframes hero-block-up {
    0% {
      opacity: 0;
      transform: translateY(14px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes dept-accent-travel {
    0% {
      transform: translateX(-100%);
      opacity: 0.3;
    }
    50% {
      transform: translateX(100%);
      opacity: 1;
    }
    100% {
      transform: translateX(300%);
      opacity: 0.3;
    }
  }

  .hero-dept-live-accent-track {
    position: relative;
    height: 1.5px;
    width: 2.75rem;
    background: rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border-radius: 9999px;
  }

  .hero-dept-accent-traveler {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1.25rem;
    background: #0052D6;
    border-radius: 9999px;
    animation: dept-accent-travel 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  /* 08. Facts items staggered */
  @keyframes hero-fact-stagger {
    0% {
      opacity: 0;
      transform: translateY(8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Pre-animation resting state when waiting for startup loader */
  .hero-waiting .hero-anim-emblem,
  .hero-waiting .hero-anim-title,
  .hero-waiting .hero-anim-line-1,
  .hero-waiting .hero-anim-line-2,
  .hero-waiting .hero-anim-line-3,
  .hero-waiting .hero-anim-innovation,
  .hero-waiting .hero-anim-desc,
  .hero-waiting .hero-anim-cta,
  .hero-waiting .hero-anim-dept-label,
  .hero-waiting .hero-anim-dept-line-1,
  .hero-waiting .hero-anim-dept-line-2,
  .hero-waiting .hero-anim-dept-line-3,
  .hero-waiting .hero-anim-dept-school,
  .hero-waiting .hero-anim-dept-meta,
  .hero-waiting [class*="hero-anim-fact-"] {
    opacity: 0 !important;
  }

  /* Active sequence timing */
  .hero-active .hero-anim-emblem {
    animation: hero-emblem-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.00s both;
  }

  .hero-active .hero-anim-title {
    animation: hero-title-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
  }

  .hero-active .hero-anim-sweep {
    background: linear-gradient(
      90deg,
      #09090b 0%,
      #09090b 40%,
      #0052D6 48%,
      #70a6ff 50%,
      #0052D6 52%,
      #09090b 60%,
      #09090b 100%
    );
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation:
      hero-title-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both,
      hero-sweep-pass 0.45s cubic-bezier(0.2, 0, 0.4, 1) 0.60s both;
  }

  /* Post-sweep plain static text */
  .hero-anim-sweep[data-sweep-done="true"],
  .hero-settled .hero-anim-sweep {
    background: none !important;
    -webkit-background-clip: unset !important;
    background-clip: unset !important;
    -webkit-text-fill-color: unset !important;
    color: #09090b !important;
    animation: none !important;
  }

  .hero-active .hero-anim-line-1 {
    animation: hero-line-up 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.75s both;
  }

  .hero-active .hero-anim-line-2 {
    animation: hero-line-up 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both;
  }

  .hero-active .hero-anim-line-3 {
    animation: hero-line-up 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.95s both;
  }

  .hero-active .hero-anim-innovation {
    animation: hero-innovation-reveal 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.05s both;
  }

  .hero-active .hero-anim-desc {
    animation: hero-block-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.15s both;
  }

  .hero-active .hero-anim-cta {
    animation: hero-block-up 0.40s cubic-bezier(0.16, 1, 0.3, 1) 1.30s both;
  }

  /* Department Staggered Reveals */
  .hero-active .hero-anim-dept-label {
    animation: hero-block-up 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.82s both;
  }

  .hero-active .hero-anim-dept-line-1 {
    animation: hero-line-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.92s both;
  }

  .hero-active .hero-anim-dept-line-2 {
    animation: hero-line-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) 1.02s both;
  }

  .hero-active .hero-anim-dept-line-3 {
    animation: hero-line-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) 1.10s both;
  }

  .hero-active .hero-anim-dept-school {
    animation: hero-block-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.18s both;
  }

  .hero-active .hero-anim-dept-meta {
    animation: hero-block-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.25s both;
  }

  .hero-active .hero-anim-fact-1 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.40s both; }
  .hero-active .hero-anim-fact-2 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.48s both; }
  .hero-active .hero-anim-fact-3 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.56s both; }
  .hero-active .hero-anim-fact-4 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.64s both; }

  /* Final State: Stop, completely calm, static with no residual transforms */
  .hero-settled .hero-anim-emblem,
  .hero-settled .hero-anim-title,
  .hero-settled .hero-anim-line-1,
  .hero-settled .hero-anim-line-2,
  .hero-settled .hero-anim-line-3,
  .hero-settled .hero-anim-innovation,
  .hero-settled .hero-anim-desc,
  .hero-settled .hero-anim-cta,
  .hero-settled .hero-anim-dept-label,
  .hero-settled .hero-anim-dept-line-1,
  .hero-settled .hero-anim-dept-line-2,
  .hero-settled .hero-anim-dept-line-3,
  .hero-settled .hero-anim-dept-school,
  .hero-settled .hero-anim-dept-meta,
  .hero-settled [class*="hero-anim-fact-"] {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }

  /* Prefers-reduced-motion: instant static display */
  @media (prefers-reduced-motion: reduce) {
    .hero-anim-emblem,
    .hero-anim-title,
    .hero-anim-sweep,
    .hero-anim-line-1,
    .hero-anim-line-2,
    .hero-anim-line-3,
    .hero-anim-innovation,
    .hero-anim-desc,
    .hero-anim-cta,
    .hero-anim-dept-label,
    .hero-anim-dept-line-1,
    .hero-anim-dept-line-2,
    .hero-anim-dept-line-3,
    .hero-anim-dept-school,
    .hero-anim-dept-meta,
    [class*="hero-anim-fact-"] {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      clip-path: none !important;
      background: none !important;
      -webkit-background-clip: unset !important;
      background-clip: unset !important;
      -webkit-text-fill-color: unset !important;
      color: inherit !important;
    }
    .hero-dept-accent-traveler {
      animation: none !important;
      transform: none !important;
      opacity: 0.8 !important;
    }
  }
`;

export default function Hero({ 
  onExploreClick, 
  onOpenVerify,
  isReady = true
}) {
  const heroWrapperRef = useRef(null);
  const [sweepDone, setSweepDone] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setSweepDone(false);
      setSettled(false);
      return;
    }

    // Sweep finishes at 1.10s -> reset to plain static text at 1.15s
    const sweepTimer = setTimeout(() => {
      setSweepDone(true);
    }, 1150);

    // Full choreography finishes at 2.00s -> settle all motion to calm static at 2.10s
    const settleTimer = setTimeout(() => {
      setSettled(true);
    }, 2100);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(settleTimer);
    };
  }, [isReady]);

  const stateClass = isReady ? (settled ? 'hero-settled' : 'hero-active') : 'hero-waiting';

  return (
    <div ref={heroWrapperRef} className="relative w-full overflow-hidden hero-wrapper">
      <section className={`hero-root ${stateClass} relative min-h-[85vh] flex flex-col pt-8 sm:pt-12 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10`}>
        <style>{HERO_MOTION_STYLES}</style>

        {/* 01. TOP CHAPTER IDENTIFIER — High-impact Institutional Brand Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-14 pb-4 border-b border-black/[0.04]">
          <div className="flex items-center gap-3.5">
            <div className="hero-anim-emblem w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-black/[0.08] p-1.5 shadow-2xs flex items-center justify-center shrink-0">
              <img
                src="/iei-official-logo.png"
                alt="The Institution of Engineers (India) Official Seal"
                className="w-full h-full object-contain select-none"
                draggable={false}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span
                  className={`${sweepDone ? 'hero-anim-title' : 'hero-anim-sweep'} font-sans font-bold tracking-tight text-xl sm:text-2xl leading-none select-none text-zinc-950`}
                  data-sweep-done={sweepDone ? 'true' : 'false'}
                >
                  IEI SIES GST
                </span>
              </div>
              <span className="text-xs text-zinc-500 font-medium mt-1">
                Department of Electronics &amp; Computer Science Engineering
              </span>
            </div>
          </div>
        </div>

        {/* 02. EDITORIAL BALANCED GRID (Desktop: 2 Columns Aligned / Mobile: Natural Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center flex-1">
          
          {/* LEFT COLUMN: MONUMENTAL HEADLINE, STATEMENT & COMPACT CTA */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            
            {/* Monumental Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black text-zinc-950 tracking-tight leading-[1.12] mb-6">
              <span className="block overflow-hidden pb-1">
                <span className="inline-block hero-anim-line-1">
                  Advancing engineering
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="inline-block hero-anim-line-2">
                  excellence, research &amp;{' '}
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="inline-block hero-anim-line-3">
                  <span className="hero-anim-innovation text-[#0052D6] inline-block">
                    innovation.
                  </span>
                </span>
              </span>
            </h1>

            {/* Supporting Chapter Statement */}
            <p className="hero-anim-desc text-base sm:text-lg text-zinc-600 font-normal leading-relaxed mb-8 max-w-xl">
              The premier collegiate engineering society at <strong>SIES Graduate School of Technology</strong>, Nerul.
              Empowering student engineers through applied hardware testbenches, interdisciplinary research,
              and century-old Royal Chartered accreditation.
            </p>

            {/* Compact Primary CTA */}
            <div className="hero-anim-cta flex items-center">
              <a
                href="#chapter-overview"
                onClick={(e) => {
                  e.preventDefault();
                  audioEngine?.playClick && audioEngine.playClick();
                  if (onExploreClick) onExploreClick();
                  else {
                    const el = document.getElementById('chapter-overview');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 rounded-xl bg-zinc-950 hover:bg-[#0052D6] text-white font-sans text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 shadow-sm group cursor-pointer"
              >
                <span>EXPLORE INITIATIVES</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: HIGH-IMPACT DEPARTMENT IDENTITY (Institutional Editorial Counterpart) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center pt-8 sm:pt-10 lg:pt-0">
            <div className="flex flex-col select-none">
              
              {/* DEPARTMENT OF Label + Subtle Restrained Live Accent */}
              <div className="hero-anim-dept-label flex items-center gap-3 mb-3 sm:mb-4">
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  DEPARTMENT OF
                </span>
                <div className="hero-dept-live-accent-track" aria-hidden="true">
                  <div className="hero-dept-accent-traveler" />
                </div>
              </div>

              {/* Major Department Heading: Bold Helvetica with Responsive Clamp */}
              <h2 
                className="font-display font-black tracking-[-0.03em] text-zinc-950 leading-[1.06] mb-5 sm:mb-6"
                aria-label="Department of Electronics and Computer Science Engineering"
              >
                {/* Desktop & Tablet: 2-line balanced hierarchy */}
                <span className="hidden sm:block overflow-hidden pb-1">
                  <span className="inline-block hero-anim-dept-line-1 text-[clamp(2.15rem,3.6vw,3.55rem)]">
                    ELECTRONICS &amp; COMPUTER
                  </span>
                </span>
                <span className="hidden sm:block overflow-hidden pb-1">
                  <span className="inline-block hero-anim-dept-line-2 text-[clamp(2.15rem,3.6vw,3.55rem)]">
                    SCIENCE ENGINEERING
                  </span>
                </span>

                {/* Mobile: 3-line natural wrapping to prevent clipping & overflow */}
                <span className="block sm:hidden overflow-hidden pb-0.5">
                  <span className="inline-block hero-anim-dept-line-1 text-[clamp(1.75rem,7vw,2.35rem)]">
                    ELECTRONICS &amp;
                  </span>
                </span>
                <span className="block sm:hidden overflow-hidden pb-0.5">
                  <span className="inline-block hero-anim-dept-line-2 text-[clamp(1.75rem,7vw,2.35rem)]">
                    COMPUTER SCIENCE
                  </span>
                </span>
                <span className="block sm:hidden overflow-hidden pb-0.5">
                  <span className="inline-block hero-anim-dept-line-3 text-[clamp(1.75rem,7vw,2.35rem)]">
                    ENGINEERING
                  </span>
                </span>
              </h2>

              {/* Institutional Supporting Lines (Hierarchy) */}
              <div className="flex flex-col space-y-1.5">
                <div className="hero-anim-dept-school overflow-hidden">
                  <p className="font-sans font-semibold text-xs sm:text-sm tracking-wider text-zinc-700 uppercase">
                    SIES GRADUATE SCHOOL OF TECHNOLOGY
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 03. BOTTOM EDITORIAL FACT STRIP (No Grey Divider Line — Structured via Spacing & Typography) */}
        <div className="pt-16 sm:pt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col hero-anim-fact-1">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Royal Charter
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 tracking-tight mt-1 leading-tight break-words">
              1935
            </span>
            <span className="text-xs text-zinc-500 mt-1 font-normal">
              King George V Statutory Warrant
            </span>
          </div>

          <div className="flex flex-col hero-anim-fact-2">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Scientific Recognition
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 tracking-tight mt-1 leading-tight break-words">
              DSIR SIRO
            </span>
            <span className="text-xs text-zinc-500 mt-1 font-normal">
              Ministry of Science &amp; Technology
            </span>
          </div>

          <div className="flex flex-col hero-anim-fact-3">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Constitutional Standing
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 tracking-tight mt-1 leading-tight break-words">
              Article 372
            </span>
            <span className="text-xs text-zinc-500 mt-1 font-normal">
              Body Corporate of India
            </span>
          </div>

          <div className="flex flex-col hero-anim-fact-4">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Apex Footprint
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 tracking-tight mt-1 leading-tight break-words">
              1,000,000+
            </span>
            <span className="text-xs text-zinc-500 mt-1 font-normal">
              Global Alumni Across 15 Disciplines
            </span>
          </div>
        </div>

      </section>
    </div>
  );
}
