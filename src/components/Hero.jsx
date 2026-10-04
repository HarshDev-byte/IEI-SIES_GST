import React, { useState, useEffect, useRef } from 'react';
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

  /* 05. IEI Editorial Initial Letters: appear first (550ms ease) */
  @keyframes hero-initial-reveal {
    0% {
      opacity: 0;
      transform: translateY(14px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 06. IEI Editorial Supporting Words: subtle slide & letter-spacing settle (650ms ease) */
  @keyframes hero-word-reveal {
    0% {
      opacity: 0;
      transform: translateY(10px);
      letter-spacing: 0.03em;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      letter-spacing: -0.025em;
    }
  }

  /* Department right-side line entrance */
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

  /* 06. Major Title Lines & 'The' prefix styling */
  .hero-the-line {
    font-size: clamp(0.95rem, 1.5vw, 1.35rem);
    line-height: 1.1;
    letter-spacing: 0.14em;
    font-weight: 700;
  }

  .hero-major-title-line {
    font-size: clamp(2rem, 8vw, 2.75rem);
    line-height: 1.04;
    letter-spacing: -0.035em;
    font-weight: 900;
  }

  @media (min-width: 640px) {
    .hero-major-title-line {
      font-size: clamp(2.5rem, 4.4vw, 4.35rem);
    }
  }

  /* Dramatic Mask Entrance: lines slide up cleanly from below */
  @keyframes hero-line-reveal {
    0% {
      opacity: 0;
      transform: translateY(115%);
      filter: blur(4px);
    }
    40% {
      opacity: 0.85;
      filter: blur(1px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
    }
  }

  /* Continuous Cascading Wave: INSTITUTION -> OF -> ENGINEERS -> INDIA */
  @keyframes cascade-wave-zinc {
    0%, 30%, 100% {
      color: var(--fg-primary, #09090b);
      transform: translateY(0);
      filter: drop-shadow(0 0 0 rgba(0, 82, 214, 0));
    }
    12% {
      color: #0052D6;
      transform: translateY(-4px);
      filter: drop-shadow(0 6px 18px rgba(0, 82, 214, 0.35));
    }
  }

  @keyframes cascade-wave-blue {
    0%, 30%, 100% {
      color: #0052D6;
      transform: translateY(0);
      filter: drop-shadow(0 0 0 rgba(0, 82, 214, 0));
    }
    12% {
      color: #38BDF8;
      transform: translateY(-4px);
      filter: drop-shadow(0 8px 22px rgba(56, 189, 248, 0.5));
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
  .hero-waiting .hero-anim-initial,
  .hero-waiting .hero-anim-word,
  .hero-waiting .hero-paren,
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
      var(--fg-primary, #09090b) 0%,
      var(--fg-primary, #09090b) 40%,
      #0052D6 48%,
      #70a6ff 50%,
      #0052D6 52%,
      var(--fg-primary, #09090b) 60%,
      var(--fg-primary, #09090b) 100%
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
    color: var(--fg-primary, #09090b) !important;
    animation: none !important;
  }

  /* 5 Title lines reveal sequence during entrance */
  .hero-active .hero-anim-title-line-1 { animation: hero-line-reveal 0.60s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both; }
  .hero-active .hero-anim-title-line-2 { animation: hero-line-reveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both; }
  .hero-active .hero-anim-title-line-3 { animation: hero-line-reveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.70s both; }
  .hero-active .hero-anim-title-line-4 { animation: hero-line-reveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.95s both; }
  .hero-active .hero-anim-title-line-5 { animation: hero-line-reveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.20s both; }

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

  /* Settled state: continuous cascade transition through INSTITUTION -> OF -> ENGINEERS -> INDIA */
  .hero-settled .hero-anim-title-line-1 {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .hero-settled .hero-anim-title-line-2 { animation: cascade-wave-zinc 4.8s cubic-bezier(0.4, 0, 0.2, 1) 0.0s infinite; }
  .hero-settled .hero-anim-title-line-3 { animation: cascade-wave-zinc 4.8s cubic-bezier(0.4, 0, 0.2, 1) 1.0s infinite; }
  .hero-settled .hero-anim-title-line-4 { animation: cascade-wave-blue 4.8s cubic-bezier(0.4, 0, 0.2, 1) 2.0s infinite; }
  .hero-settled .hero-anim-title-line-5 { animation: cascade-wave-zinc 4.8s cubic-bezier(0.4, 0, 0.2, 1) 3.0s infinite; }

  /* Final State for other elements: Stop, completely calm, static with no residual transforms */
  .hero-settled .hero-anim-emblem,
  .hero-settled .hero-anim-title,
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
    [class*="hero-anim-title-line-"],
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-14">
          <div className="flex items-center gap-3.5">
            <div className="hero-anim-emblem w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/15 p-1.5 shadow-2xs flex items-center justify-center shrink-0">
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
                  className={`${sweepDone ? 'hero-anim-title' : 'hero-anim-sweep'} font-sans font-bold tracking-tight text-xl sm:text-2xl leading-none select-none text-zinc-950 dark:text-white`}
                  data-sweep-done={sweepDone ? 'true' : 'false'}
                >
                  IEI SIES GST
                </span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                Department of Electronics &amp; Computer Science Engineering
              </span>
            </div>
          </div>
        </div>

        {/* 02. EDITORIAL BALANCED GRID (Desktop: 2 Columns Aligned / Mobile: Segregated Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center flex-1">
          
          {/* LEFT COLUMN: MONUMENTAL IEI EDITORIAL IDENTITY TYPOGRAPHY */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center select-none py-2 sm:py-4 lg:py-0">
            <h1 
              className="flex flex-col space-y-1 sm:space-y-1.5 lg:space-y-2 font-display"
              aria-label="The Institution Of Engineers India"
            >
              {/* Line 1: The (Refined smaller editorial prefix) */}
              <div className="overflow-hidden pb-1">
                <span className="hero-anim-title-line-1 text-[clamp(0.95rem,1.5vw,1.35rem)] font-mono font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 block transition-colors duration-300 hover:text-zinc-600 dark:hover:text-zinc-300">
                  The
                </span>
              </div>

              {/* Line 2: INSTITUTION */}
              <div className="overflow-hidden pb-0.5">
                <span className="hero-anim-title-line-2 hero-major-title-line text-[clamp(2rem,8vw,2.75rem)] sm:text-[clamp(2.5rem,4.4vw,4.35rem)] font-display font-black tracking-[-0.035em] leading-[1.04] block uppercase cursor-default">
                  Institution
                </span>
              </div>

              {/* Line 3: OF */}
              <div className="overflow-hidden pb-0.5">
                <span className="hero-anim-title-line-3 hero-major-title-line text-[clamp(2rem,8vw,2.75rem)] sm:text-[clamp(2.5rem,4.4vw,4.35rem)] font-display font-black tracking-[-0.035em] leading-[1.04] block uppercase cursor-default">
                  Of
                </span>
              </div>

              {/* Line 4: ENGINEERS (IEI Royal Blue Highlight) */}
              <div className="overflow-hidden pb-0.5">
                <span className="hero-anim-title-line-4 hero-major-title-line text-[clamp(2rem,8vw,2.75rem)] sm:text-[clamp(2.5rem,4.4vw,4.35rem)] font-display font-black tracking-[-0.035em] leading-[1.04] text-[#0052D6] block uppercase cursor-default">
                  Engineers
                </span>
              </div>

              {/* Line 5: INDIA */}
              <div className="overflow-hidden pb-0.5">
                <span className="hero-anim-title-line-5 hero-major-title-line text-[clamp(2rem,8vw,2.75rem)] sm:text-[clamp(2.5rem,4.4vw,4.35rem)] font-display font-black tracking-[-0.035em] leading-[1.04] block uppercase cursor-default">
                  India
                </span>
              </div>
            </h1>
          </div>

          {/* RIGHT COLUMN: HIGH-IMPACT DEPARTMENT IDENTITY */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center pt-8 sm:pt-10 lg:pt-0">
            <div className="flex flex-col select-none">
              
              {/* DEPARTMENT OF Label + Subtle Restrained Live Accent */}
              <div className="hero-anim-dept-label flex items-center gap-3 mb-3 sm:mb-4">
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                  DEPARTMENT OF
                </span>
                <div className="hero-dept-live-accent-track" aria-hidden="true">
                  <div className="hero-dept-accent-traveler" />
                </div>
              </div>

              {/* Major Department Heading: Bold Helvetica with Responsive Clamp */}
              <h2 
                className="font-display font-black tracking-[-0.03em] text-zinc-950 dark:text-white leading-[1.06] mb-5 sm:mb-6"
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
                  <p className="font-sans font-semibold text-xs sm:text-sm tracking-wider text-zinc-700 dark:text-zinc-300 uppercase">
                    SIES GRADUATE SCHOOL OF TECHNOLOGY
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 03. BOTTOM EDITORIAL FACT STRIP */}
        <div className="pt-12 sm:pt-16 lg:pt-20 mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col hero-anim-fact-1">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
              Royal Charter
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-white tracking-tight mt-1 leading-tight break-words">
              1935
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
              King George V Statutory Warrant
            </span>
          </div>

          <div className="flex flex-col hero-anim-fact-2">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
              Scientific Recognition
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-white tracking-tight mt-1 leading-tight break-words">
              DSIR SIRO
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
              Ministry of Science &amp; Technology
            </span>
          </div>

          <div className="flex flex-col hero-anim-fact-3">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
              Constitutional Standing
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-white tracking-tight mt-1 leading-tight break-words">
              Article 372
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
              Body Corporate of India
            </span>
          </div>

          <div className="flex flex-col hero-anim-fact-4">
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
              Apex Footprint
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-white tracking-tight mt-1 leading-tight break-words">
              1,000,000+
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
              Global Alumni Across 15 Disciplines
            </span>
          </div>
        </div>

      </section>
    </div>
  );
}
