import React from 'react';
import { ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/*
 * IEI SIES GST — Chapter Identity Animation
 * 4-phase animation, CSS-only, respects prefers-reduced-motion.
 * Only the top identity block is animated; all other hero content is unchanged.
 */

const IDENTITY_STYLES = `
  /* Phase 1 (0–0.35s): Emblem reveals left → right via clip-path */
  @keyframes iei-emblem-reveal {
    from { clip-path: inset(0 100% 0 0); opacity: 0; }
    to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
  }

  /* Phase 3 (0.65–1.1s): Text slides in from left + fades */
  @keyframes iei-text-in {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0);     }
  }

  /* Phase 4 (0.9–1.3s): Single blue highlight sweep left → right */
  @keyframes iei-sweep {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .iei-emblem-animate {
    animation: iei-emblem-reveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
  }

  .iei-text-animate {
    animation: iei-text-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both;
  }

  .iei-sweep-animate {
    background: linear-gradient(
      90deg,
      #1a1a1a 0%,
      #1a1a1a 38%,
      #0052D6 48%,
      #ffffff 52%,
      #0052D6 56%,
      #1a1a1a 66%,
      #1a1a1a 100%
    );
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation:
      iei-text-in  0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both,
      iei-sweep    0.55s cubic-bezier(0.4, 0, 0.6, 1)   0.9s  both;
  }

  /* After sweep completes — reset to plain black text */
  .iei-sweep-animate[data-done="true"] {
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
    -webkit-text-fill-color: unset;
    color: #1a1a1a;
    animation: none;
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .iei-emblem-animate,
    .iei-text-animate,
    .iei-sweep-animate {
      animation: none !important;
      opacity: 1 !important;
      clip-path: none !important;
      transform: none !important;
      background: none !important;
      -webkit-background-clip: unset !important;
      background-clip: unset !important;
      -webkit-text-fill-color: unset !important;
      color: #1a1a1a !important;
    }
  }
`;

function ChapterIdentity() {
  const [sweepDone, setSweepDone] = React.useState(false);

  React.useEffect(() => {
    // After sweep animation ends (0.9s start + 0.55s duration = 1.45s), mark done
    const t = setTimeout(() => setSweepDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{IDENTITY_STYLES}</style>
      <div className="flex flex-col items-center gap-3 pb-6 border-b border-black/[0.08]">
        {/* Official IEI emblem — revealed left to right */}
        <div className="iei-emblem-animate">
          <img
            src="/iei-official-logo.png"
            alt="The Institution of Engineers (India) Official Seal"
            className="w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] object-contain select-none"
            draggable={false}
          />
        </div>

        {/* IEI SIES GST wordmark — slides in, then single sweep */}
        <span
          className={sweepDone ? 'iei-text-animate font-sans font-bold text-zinc-950 tracking-tight text-[32px] sm:text-[42px] lg:text-[50px] leading-none select-none' : 'iei-sweep-animate font-sans font-bold tracking-tight text-[32px] sm:text-[42px] lg:text-[50px] leading-none select-none'}
          data-done={sweepDone ? 'true' : 'false'}
        >
          IEI SIES GST
        </span>
      </div>
    </>
  );
}

export default function Hero({ 
  onExploreClick, 
  onOpenVerify 
}) {
  return (
    <section className="relative min-h-[85vh] flex flex-col pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">

      {/* 01. CHAPTER IDENTITY — emblem + wordmark + one-time animation */}
      <ChapterIdentity />

      {/* 02. CENTERED HERO BLOCK */}
      <div className="flex-1 flex items-center justify-center py-10 sm:py-14">

        {/* Content column — centered, controlled max-width */}
        <div className="flex flex-col items-center text-center max-w-2xl w-full">

          {/* Identity line */}
          <p className="text-sm font-medium text-zinc-500 mb-4 select-none">
            The Institution of Engineers (India) · Student Chapter #602
          </p>

          {/* Main headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black text-zinc-950 tracking-tight leading-[1.06] mb-5">
            Advancing engineering<br className="hidden sm:inline" />
            {' '}excellence, research &amp;{' '}
            <span className="text-[#0052D6]">
              innovation.
            </span>
          </h1>

          {/* Department context */}
          <div className="text-sm text-zinc-600 mb-5 font-medium">
            Department of Electronics &amp; Computer Science Engineering
          </div>

          {/* Descriptive paragraph */}
          <p className="text-base text-zinc-600 font-normal leading-relaxed mb-8 max-w-lg">
            The premier collegiate engineering society at <strong>SIES Graduate School of Technology</strong>.{' '}
            Empowering student engineers through applied hardware testbenches, interdisciplinary research,
            and century-old Royal Chartered accreditation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-8">
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

          {/* Lower factual metadata — preserved verbatim */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs text-zinc-500 pt-5 border-t border-black/[0.06] w-full">
            <span className="font-medium text-zinc-700">Royal Charter 1935</span>
            <span className="text-zinc-300">·</span>
            <span>SIRO Recognized (DSIR)</span>
            <span className="text-zinc-300">·</span>
            <span>Article 372 Body Corporate</span>
            <span className="text-zinc-300">·</span>
            <span>1M+ Global Alumni</span>
          </div>

        </div>
      </div>

    </section>
  );
}
