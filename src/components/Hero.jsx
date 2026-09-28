import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/*
 * IEI SIES GST — HOMEPAGE HERO MOTION CHOREOGRAPHY
 * Sequential reveal sequence (0.00s – 2.65s). All entrance motions play once,
 * then everything settles into a completely calm, static editorial state.
 */

const HERO_MOTION_STYLES = `
  /* 01. Emblem entrance: scale 0.92 -> 1, opacity 0 -> 1 (0.00s - 0.50s) */
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

  /* 02. IEI SIES GST wordmark: translateY 10px -> 0, opacity 0 -> 1 (0.35s - 0.80s) */
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

  /* 03. Single subtle blue light sweep across title (0.80s - 1.25s) */
  @keyframes hero-sweep-pass {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  /* 04. Institution line: horizontal clip-path left -> right (1.00s - 1.40s) */
  @keyframes hero-institution-clip {
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

  /* 05. Main headline lines inside overflow:hidden (1.15s, 1.23s, 1.31s) */
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

  /* 06. Innovation blue word: subtle clip-path reveal (1.35s - 1.75s) */
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

  /* 07. Department context line: translateY 10px -> 0 (1.55s - 1.95s) */
  @keyframes hero-dept-up {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 08. Description paragraph block: translateY 12px -> 0 (1.70s - 2.15s) */
  @keyframes hero-desc-up {
    0% {
      opacity: 0;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 09. CTA button: translateY 12px -> 0, scale 0.98 -> 1 (1.95s - 2.35s) */
  @keyframes hero-cta-up {
    0% {
      opacity: 0;
      transform: translateY(12px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* 10. Bottom facts divider: scaleX 0 -> 1 from center (2.15s - 2.55s) */
  @keyframes hero-divider-scale {
    0% {
      opacity: 0;
      transform: scaleX(0);
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  /* 10b. Bottom facts items staggered: translateY 6px -> 0 (2.25s - 2.65s) */
  @keyframes hero-fact-stagger {
    0% {
      opacity: 0;
      transform: translateY(6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Pre-animation resting state when waiting for startup loader */
  .hero-waiting .hero-anim-emblem,
  .hero-waiting .hero-anim-title,
  .hero-waiting .hero-anim-institution,
  .hero-waiting .hero-anim-line-1,
  .hero-waiting .hero-anim-line-2,
  .hero-waiting .hero-anim-line-3,
  .hero-waiting .hero-anim-innovation,
  .hero-waiting .hero-anim-dept,
  .hero-waiting .hero-anim-desc,
  .hero-waiting .hero-anim-cta,
  .hero-waiting .hero-anim-divider,
  .hero-waiting [class*="hero-anim-fact-"],
  .hero-waiting [class*="hero-anim-dot-"] {
    opacity: 0 !important;
  }

  /* Active sequence timing */
  .hero-active .hero-anim-emblem {
    animation: hero-emblem-in 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.00s both;
  }

  .hero-active .hero-anim-title {
    animation: hero-title-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
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
      hero-title-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both,
      hero-sweep-pass 0.45s cubic-bezier(0.2, 0, 0.4, 1) 0.80s both;
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

  .hero-active .hero-anim-institution {
    animation: hero-institution-clip 0.40s cubic-bezier(0.16, 1, 0.3, 1) 1.00s both;
  }

  .hero-active .hero-anim-line-1 {
    animation: hero-line-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) 1.15s both;
  }

  .hero-active .hero-anim-line-2 {
    animation: hero-line-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) 1.23s both;
  }

  .hero-active .hero-anim-line-3 {
    animation: hero-line-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) 1.31s both;
  }

  .hero-active .hero-anim-innovation {
    animation: hero-innovation-reveal 0.40s cubic-bezier(0.16, 1, 0.3, 1) 1.35s both;
  }

  .hero-active .hero-anim-dept {
    animation: hero-dept-up 0.40s cubic-bezier(0.16, 1, 0.3, 1) 1.55s both;
  }

  .hero-active .hero-anim-desc {
    animation: hero-desc-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.70s both;
  }

  .hero-active .hero-anim-cta {
    animation: hero-cta-up 0.40s cubic-bezier(0.16, 1, 0.3, 1) 1.95s both;
  }

  .hero-active .hero-anim-divider {
    transform-origin: center;
    animation: hero-divider-scale 0.40s cubic-bezier(0.16, 1, 0.3, 1) 2.15s both;
  }

  .hero-active .hero-anim-fact-1 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.25s both; }
  .hero-active .hero-anim-dot-1  { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.30s both; }
  .hero-active .hero-anim-fact-2 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.35s both; }
  .hero-active .hero-anim-dot-2  { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.40s both; }
  .hero-active .hero-anim-fact-3 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.45s both; }
  .hero-active .hero-anim-dot-3  { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.50s both; }
  .hero-active .hero-anim-fact-4 { animation: hero-fact-stagger 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.55s both; }

  /* 11. Final State: Stop, completely calm, static */
  .hero-settled .hero-anim-emblem,
  .hero-settled .hero-anim-title,
  .hero-settled .hero-anim-institution,
  .hero-settled .hero-anim-line-1,
  .hero-settled .hero-anim-line-2,
  .hero-settled .hero-anim-line-3,
  .hero-settled .hero-anim-innovation,
  .hero-settled .hero-anim-dept,
  .hero-settled .hero-anim-desc,
  .hero-settled .hero-anim-cta,
  .hero-settled .hero-anim-divider,
  .hero-settled [class*="hero-anim-fact-"],
  .hero-settled [class*="hero-anim-dot-"] {
    animation: none !important;
    opacity: 1 !important;
    clip-path: none !important;
  }

  /* 16. Prefers-reduced-motion: instant static display */
  @media (prefers-reduced-motion: reduce) {
    .hero-anim-emblem,
    .hero-anim-title,
    .hero-anim-sweep,
    .hero-anim-institution,
    .hero-anim-line-1,
    .hero-anim-line-2,
    .hero-anim-line-3,
    .hero-anim-innovation,
    .hero-anim-dept,
    .hero-anim-desc,
    .hero-anim-cta,
    .hero-anim-divider,
    [class*="hero-anim-fact-"],
    [class*="hero-anim-dot-"] {
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
  }
`;

export default function Hero({ 
  onExploreClick, 
  onOpenVerify,
  isReady = true
}) {
  const [sweepDone, setSweepDone] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setSweepDone(false);
      setSettled(false);
      return;
    }

    // Sweep finishes at 1.25s -> reset to plain static text at 1.30s
    const sweepTimer = setTimeout(() => {
      setSweepDone(true);
    }, 1300);

    // Full choreography finishes at 2.65s -> settle all motion to calm static at 2.70s
    const settleTimer = setTimeout(() => {
      setSettled(true);
    }, 2700);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(settleTimer);
    };
  }, [isReady]);

  const stateClass = isReady ? (settled ? 'hero-settled' : 'hero-active') : 'hero-waiting';

  return (
    <section className={`hero-root ${stateClass} relative min-h-[85vh] flex flex-col pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10`}>
      <style>{HERO_MOTION_STYLES}</style>

      {/* 01. CHAPTER IDENTITY — emblem + wordmark */}
      <div className="flex flex-col items-center gap-3 pb-6 border-b border-black/[0.08]">
        {/* Official IEI emblem */}
        <div className="hero-anim-emblem">
          <img
            src="/iei-official-logo.png"
            alt="The Institution of Engineers (India) Official Seal"
            className="w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] object-contain select-none"
            draggable={false}
          />
        </div>

        {/* IEI SIES GST wordmark */}
        <span
          className={`${sweepDone ? 'hero-anim-title' : 'hero-anim-sweep'} font-sans font-bold tracking-tight text-[32px] sm:text-[42px] lg:text-[50px] leading-none select-none text-zinc-950`}
          data-sweep-done={sweepDone ? 'true' : 'false'}
        >
          IEI SIES GST
        </span>
      </div>

      {/* 02. CENTERED HERO BLOCK */}
      <div className="flex-1 flex items-center justify-center py-10 sm:py-14">

        {/* Content column — centered, controlled max-width */}
        <div className="flex flex-col items-center text-center max-w-2xl w-full">

          {/* Identity line */}
          <p className="hero-anim-institution text-sm font-medium text-zinc-500 mb-4 select-none">
            The Institution of Engineers (India) · Student Chapter #602
          </p>

          {/* Main headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black text-zinc-950 tracking-tight leading-[1.06] mb-5">
            <span className="block overflow-hidden">
              <span className="inline-block hero-anim-line-1">
                Advancing engineering
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block hero-anim-line-2">
                excellence, research &amp;{' '}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block hero-anim-line-3">
                <span className="hero-anim-innovation text-[#0052D6] inline-block">
                  innovation.
                </span>
              </span>
            </span>
          </h1>

          {/* Department context */}
          <div className="hero-anim-dept text-sm text-zinc-600 mb-5 font-medium">
            Department of Electronics &amp; Computer Science Engineering
          </div>

          {/* Descriptive paragraph */}
          <p className="hero-anim-desc text-base text-zinc-600 font-normal leading-relaxed mb-8 max-w-lg">
            The premier collegiate engineering society at <strong>SIES Graduate School of Technology</strong>.{' '}
            Empowering student engineers through applied hardware testbenches, interdisciplinary research,
            and century-old Royal Chartered accreditation.
          </p>

          {/* CTAs */}
          <div className="hero-anim-cta flex flex-wrap items-center justify-center gap-5 mb-8">
            <a
              href="#quick-facts"
              onClick={(e) => {
                e.preventDefault();
                audioEngine.playClick();
                if (onExploreClick) onExploreClick();
                else {
                  const el = document.getElementById('quick-facts');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-7 py-3.5 rounded-full bg-zinc-950 hover:bg-[#0052D6] text-white font-sans text-sm font-semibold flex items-center gap-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,82,214,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <span>Explore Chapter Initiatives</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Lower factual metadata — preserved verbatim with scaleX divider */}
          <div className="w-full pt-5 relative">
            <div className="hero-anim-divider w-full h-[1px] bg-black/[0.06] absolute top-0 inset-x-0" />

            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs text-zinc-500">
              <span className="font-medium text-zinc-700 hero-anim-fact-1">Royal Charter 1935</span>
              <span className="text-zinc-300 hero-anim-dot-1">·</span>
              <span className="hero-anim-fact-2">SIRO Recognized (DSIR)</span>
              <span className="text-zinc-300 hero-anim-dot-2">·</span>
              <span className="hero-anim-fact-3">Article 372 Body Corporate</span>
              <span className="text-zinc-300 hero-anim-dot-3">·</span>
              <span className="hero-anim-fact-4">1M+ Global Alumni</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
