import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';

/*
 * IEI SIES GST — HERO TYPOGRAPHY REDESIGN
 * Minimal, editorial, typography-first IEI identity statement.
 * "THE / I nstitution of E ngineers I ndia" with dominant I-E-I initials.
 * All entrance motions play once, then settle into a completely calm, static editorial state.
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

  /* 04. Fade up entrance for editorial elements */
  @keyframes hero-fade-up {
    0% {
      opacity: 0;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 05. IEI Editorial Initial Letters Reveal with crisp scale presence */
  @keyframes hero-initial-reveal {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(0.96);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* 06. IEI Editorial Subword Portion: Slides OUT from behind the initial letter */
  @keyframes hero-subword-slide-out {
    0% {
      opacity: 0;
      transform: translateX(-104%);
    }
    30% {
      opacity: 0.45;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* 07. Outward kinetic wave rings pulsing OUT of the central blue E */
  @keyframes hero-ring-pulse-out {
    0% {
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0;
      box-shadow: 0 0 10px rgba(0, 98, 255, 0.75), inset 0 0 8px rgba(0, 98, 255, 0.5);
    }
    15% {
      opacity: 0.8;
    }
    60% {
      opacity: 0.35;
    }
    100% {
      transform: translate(-50%, -50%) scale(3.2);
      opacity: 0;
      box-shadow: 0 0 30px rgba(0, 98, 255, 0);
    }
  }

  /* 08. Luminous aura breathing behind the blue E */
  @keyframes hero-aura-breathe {
    0%, 100% {
      opacity: 0.4;
      transform: translate(-50%, -50%) scale(0.9);
    }
    50% {
      opacity: 0.85;
      transform: translate(-50%, -50%) scale(1.18);
    }
  }

  /* 09. Energy motes drifting OUT of the typography into the background */
  @keyframes hero-mote-drift {
    0% {
      transform: translate(0, 0) scale(0.4);
      opacity: 0;
    }
    20% {
      opacity: 0.9;
      transform: translate(calc(var(--tx) * 0.25), calc(var(--ty) * 0.25)) scale(1);
    }
    75% {
      opacity: 0.45;
    }
    100% {
      transform: translate(var(--tx), var(--ty)) scale(0.2);
      opacity: 0;
    }
  }

  /* =========================================================================
     EDITORIAL HERO TYPOGRAPHY DESIGN SYSTEM (+20-25% Scale)
     ========================================================================= */

  /* Eyebrow: THE */
  .hero-the-eyebrow {
    font-family: var(--font-mono);
    font-size: clamp(0.9rem, 1.38vw, 1.2rem);
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--fg-muted, #71717a);
    text-align: center;
    transition: color 0.3s ease;
  }

  /* =========================================================================
     CINEMATIC MORPH SYSTEM: EXPANDED <-> MONUMENTAL ACRONYM "IEI"
     ========================================================================= */

  /* Main Typographic Identity Line */
  .hero-identity-line {
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    line-height: 1;
    text-align: center;
    position: relative;
    gap: 0;
  }

  /* Word Clusters: ensures initial and subword stay unified */
  .hero-iei-word {
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
    position: relative;
  }

  .hero-word-institution,
  .hero-word-engineers {
    transition: margin-right 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* In Acronym Mode: precisely balanced, proportional spacing between monumental I - E - I */
  .hero-mode-acronym .hero-word-institution {
    margin-right: clamp(1.2rem, 2.8vw, 3.2rem);
  }

  .hero-mode-acronym .hero-word-engineers {
    margin-right: clamp(1.2rem, 2.8vw, 3.2rem);
  }

  .hero-word-india {
    margin-left: clamp(1.6rem, 3.8vw, 4.4rem);
    transition: margin-left 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-mode-acronym .hero-word-india {
    margin-left: 0 !important;
  }

  /* Large Initials (I, E, I) */
  .hero-iei-initial {
    font-family: var(--font-display);
    font-size: clamp(4.0rem, 7.8vw, 8.45rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.04em;
    display: inline-block;
    position: relative;
    z-index: 2;
    transition: font-size 0.95s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.95s cubic-bezier(0.16, 1, 0.3, 1),
                letter-spacing 0.85s ease;
  }

  /* In Acronym Mode: Initials scale up to massive, monumental font */
  .hero-mode-acronym .hero-iei-initial {
    font-size: clamp(8.5rem, 21vw, 19.5rem);
    letter-spacing: -0.03em;
    transform: scale(1.02);
  }

  /* First I: White / Primary */
  .hero-initial-i1 {
    color: var(--fg-primary, #09090b);
  }

  /* Middle E: IEI Blue with clean text shadow depth */
  .hero-initial-e {
    color: #0062FF;
    text-shadow: 0 0 45px rgba(0, 98, 255, 0.65), 0 0 90px rgba(0, 98, 255, 0.25);
  }

  /* Final I: White / Primary */
  .hero-initial-i2 {
    color: var(--fg-primary, #09090b);
  }

  /* Subword Reveal Masks: expand/collapse smoothly */
  .hero-iei-subword-mask {
    display: inline-flex;
    align-items: baseline;
    overflow: hidden;
    position: relative;
    padding-top: 0.15em;
    padding-bottom: 0.25em;
    padding-right: 0.08em;
    margin-top: -0.15em;
    margin-bottom: -0.25em;
    vertical-align: baseline;
    max-width: 25ch;
    opacity: 1;
    transform: translateX(0);
    transition: max-width 0.95s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.65s ease,
                transform 0.95s cubic-bezier(0.16, 1, 0.3, 1),
                padding 0.7s ease,
                margin 0.7s ease;
  }

  /* In Acronym Mode: subwords retract into initials and disappear */
  .hero-mode-acronym .hero-iei-subword-mask {
    max-width: 0 !important;
    opacity: 0 !important;
    transform: translateX(-40px) !important;
    padding: 0 !important;
    margin: 0 !important;
    pointer-events: none !important;
  }

  /* Subordinate word portions: nstitution, ngineers, ndia */
  .hero-iei-subword {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.9vw, 3.15rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.025em;
    color: var(--fg-primary, #09090b);
    display: inline-block;
    margin-left: 0.04em;
    will-change: transform, opacity;
  }

  /* Connector: of */
  .hero-iei-connector {
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 2.0vw, 2.15rem);
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.01em;
    color: var(--fg-muted, #71717a);
    display: inline-block;
    max-width: 8ch;
    opacity: 0.85;
    transform: scale(1);
    margin: 0 clamp(0.7rem, 1.8vw, 2.2rem);
    overflow: hidden;
    transition: max-width 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                margin 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.5s ease,
                transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* In Acronym Mode: connector collapses to absolute zero */
  .hero-mode-acronym .hero-iei-connector {
    width: 0 !important;
    max-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    opacity: 0 !important;
    transform: scale(0) !important;
    pointer-events: none !important;
  }

  /* Eyebrow: THE */
  .hero-the-eyebrow {
    font-family: var(--font-mono);
    font-size: clamp(0.9rem, 1.38vw, 1.2rem);
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--fg-muted, #71717a);
    text-align: center;
    opacity: 1;
    transform: translateY(0);
    transition: color 0.3s ease,
                opacity 0.6s ease,
                transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-mode-acronym .hero-the-eyebrow {
    opacity: 0;
    transform: translateY(-12px);
  }

  /* Editorial Subtitle underneath Monumental Typography */
  .hero-editorial-subtitle {
    font-family: var(--font-sans);
    font-size: clamp(0.95rem, 1.5vw, 1.3rem);
    font-weight: 500;
    line-height: 1.65;
    letter-spacing: -0.01em;
    color: #27272a;
    text-align: center;
    max-width: 48rem;
    margin: 0 auto;
    padding: 6px 12px;
    opacity: 1;
    transform: translateY(0);
    transition: color 0.3s ease,
                opacity 0.75s ease,
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-mode-acronym .hero-editorial-subtitle {
    opacity: 0.95;
    transform: translateY(4px);
  }

  /* Subtitle animation choreography */
  .hero-active .hero-editorial-subtitle {
    animation: hero-fade-up 0.60s cubic-bezier(0.16, 1, 0.3, 1) 1.05s both;
  }

  /* =========================================================================
     OUTWARD CONTINUOUS KINETIC SYSTEM (MOTES)
     ========================================================================= */

  /* Subtle kinetic motes emerging and moving out of the typography */
  .hero-outward-mote {
    position: absolute;
    width: 3.5px;
    height: 3.5px;
    border-radius: 50%;
    background: #70a6ff;
    box-shadow: 0 0 6px #0062ff, 0 0 12px rgba(112, 166, 255, 0.85);
    pointer-events: none;
    opacity: 0;
    z-index: 5;
  }

  .hero-mote-1 {
    top: 25%;
    left: 20%;
    --tx: -35px;
    --ty: -45px;
    animation: hero-mote-drift 4.2s ease-out 1.2s infinite;
  }
  .hero-mote-2 {
    top: 40%;
    left: 48%;
    --tx: 10px;
    --ty: -55px;
    animation: hero-mote-drift 3.8s ease-out 2.1s infinite;
  }
  .hero-mote-3 {
    top: 60%;
    left: 53%;
    --tx: 45px;
    --ty: -35px;
    animation: hero-mote-drift 4.5s ease-out 0.5s infinite;
  }
  .hero-mote-4 {
    top: 30%;
    left: 80%;
    --tx: 30px;
    --ty: -50px;
    animation: hero-mote-drift 4.0s ease-out 2.8s infinite;
  }

  /* =========================================================================
     RESPONSIVE ARCHITECTURE
     ========================================================================= */

  /* Mobile narrow viewports (< 640px): controlled editorial stacked rhythm */
  @media (max-width: 639px) {
    .hero-identity-line {
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
    }

    .hero-iei-initial {
      font-size: clamp(3.35rem, 14.5vw, 4.4rem);
    }

    .hero-iei-subword {
      font-size: clamp(1.4rem, 5.8vw, 1.78rem);
    }

    .hero-iei-connector {
      font-size: 1.25rem;
      margin: 0.15rem 0;
    }

    .hero-editorial-subtitle {
      font-size: clamp(0.88rem, 3.8vw, 1.05rem);
      line-height: 1.6;
      padding: 6px 8px;
    }

    .hero-word-india {
      margin-left: 0 !important;
    }

    .hero-word-institution { order: 1; }
    .hero-iei-connector   { order: 2; }
    .hero-word-engineers   { order: 3; }
    .hero-word-india       { order: 4; }

    /* Acronym mode on mobile: letters align horizontally on one grand line */
    .hero-mode-acronym .hero-identity-line {
      flex-direction: row !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 0 !important;
    }

    .hero-mode-acronym .hero-word-institution {
      margin-right: clamp(0.85rem, 3.5vw, 1.6rem) !important;
    }

    .hero-mode-acronym .hero-word-engineers {
      margin-right: clamp(0.85rem, 3.5vw, 1.6rem) !important;
    }

    .hero-mode-acronym .hero-iei-initial {
      font-size: clamp(5.2rem, 23vw, 8.2rem) !important;
    }
  }

  /* =========================================================================
     ENTRANCE ANIMATIONS & SETTLED STATIC STATE
     ========================================================================= */

  /* Pre-animation resting state when waiting for startup loader */
  .hero-waiting .hero-anim-emblem,
  .hero-waiting .hero-anim-title,
  .hero-waiting .hero-the-eyebrow,
  .hero-waiting .hero-anim-initial-1,
  .hero-waiting .hero-anim-initial-2,
  .hero-waiting .hero-anim-initial-3,
  .hero-waiting .hero-anim-subword-1,
  .hero-waiting .hero-anim-subword-2,
  .hero-waiting .hero-anim-subword-3,
  .hero-waiting .hero-anim-connector,
  .hero-waiting .hero-editorial-subtitle,
  .hero-waiting .hero-outward-mote {
    opacity: 0 !important;
  }

  /* Active sequence timing */
  .hero-active .hero-anim-emblem {
    animation: hero-emblem-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.00s both;
  }

  .hero-active .hero-anim-title {
    animation: hero-title-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both;
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
      hero-title-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both,
      hero-sweep-pass 0.45s cubic-bezier(0.2, 0, 0.4, 1) 0.55s both;
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

  /* Editorial Typography Choreography */
  .hero-active .hero-the-eyebrow {
    animation: hero-fade-up 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
  }

  .hero-active .hero-anim-initial-1 {
    animation: hero-initial-reveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both;
  }
  .hero-active .hero-anim-subword-1 {
    animation: hero-subword-slide-out 0.70s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
  }

  .hero-active .hero-anim-connector {
    animation: hero-fade-up 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.52s both;
  }

  .hero-active .hero-anim-initial-2 {
    animation: hero-initial-reveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.62s both;
  }
  .hero-active .hero-anim-subword-2 {
    animation: hero-subword-slide-out 0.70s cubic-bezier(0.16, 1, 0.3, 1) 0.72s both;
  }

  .hero-active .hero-anim-initial-3 {
    animation: hero-initial-reveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.82s both;
  }
  .hero-active .hero-anim-subword-3 {
    animation: hero-subword-slide-out 0.70s cubic-bezier(0.16, 1, 0.3, 1) 0.92s both;
  }

  /* Settled state: entrance animations turn off so fluid morphing transitions take over cleanly */
  .hero-settled .hero-the-eyebrow,
  .hero-settled .hero-anim-initial-1,
  .hero-settled .hero-anim-initial-2,
  .hero-settled .hero-anim-initial-3,
  .hero-settled .hero-anim-subword-1,
  .hero-settled .hero-anim-subword-2,
  .hero-settled .hero-anim-subword-3,
  .hero-settled .hero-anim-connector,
  .hero-settled .hero-editorial-subtitle,
  .hero-settled .hero-anim-emblem,
  .hero-settled .hero-anim-title {
    animation: none !important;
  }

  /* Mobile performance optimizations: remove motes, reduce text-shadow on small screens */
  @media (max-width: 768px) {
    .hero-outward-mote {
      display: none !important;
    }
    .hero-initial-e {
      text-shadow: 0 0 15px rgba(0, 98, 255, 0.4) !important;
    }
    .hero-iei-initial,
    .hero-iei-subword-mask {
      will-change: auto !important;
    }
  }

  /* Prefers-reduced-motion: instant static display */
  @media (prefers-reduced-motion: reduce) {
    .hero-the-eyebrow,
    .hero-anim-initial-1,
    .hero-anim-initial-2,
    .hero-anim-initial-3,
    .hero-anim-subword-1,
    .hero-anim-subword-2,
    .hero-anim-subword-3,
    .hero-anim-connector,
    .hero-editorial-subtitle,
    .hero-anim-emblem,
    .hero-anim-title,
    .hero-outward-mote {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
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

  // Cinematic Display Mode: 'expanded' ("Institution of Engineers India") vs 'acronym' ("IEI" in monumental font)
  const [displayMode, setDisplayMode] = useState('expanded');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setSweepDone(false);
      setSettled(false);
      return;
    }

    // Sweep finishes at 1.00s -> reset to plain static text at 1.05s
    const sweepTimer = setTimeout(() => {
      setSweepDone(true);
    }, 1050);

    // Full choreography finishes at 1.65s -> settle typography entrance motion at 1.75s
    const settleTimer = setTimeout(() => {
      setSettled(true);
    }, 1750);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(settleTimer);
    };
  }, [isReady]);

  // Cinematic Looping Morph: Expanded -> Big IEI Acronym -> Expanded (Desktop Only for zero-lag mobile)
  useEffect(() => {
    if (!isReady || !settled) return;

    // On mobile devices (< 768px or touch screens), disable the continuous auto-looping morph
    // to eliminate CPU layout thrashing, stuttering, and mobile freezes
    const isMobileDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024));
    if (isMobileDevice) return;

    // Display expanded for 4.2 seconds, display big IEI acronym for 2.8 seconds
    const holdDuration = displayMode === 'expanded' ? 4200 : 2800;

    const timer = setTimeout(() => {
      if (!isHovered) {
        setDisplayMode((prev) => (prev === 'expanded' ? 'acronym' : 'expanded'));
      }
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [isReady, settled, displayMode, isHovered]);

  const toggleDisplayMode = () => {
    audioEngine.playClick();
    setDisplayMode((prev) => (prev === 'expanded' ? 'acronym' : 'expanded'));
  };

  const stateClass = isReady ? (settled ? 'hero-settled' : 'hero-active') : 'hero-waiting';
  const morphClass = displayMode === 'acronym' ? 'hero-mode-acronym' : 'hero-mode-expanded';

  return (
    <div ref={heroWrapperRef} className="relative w-full overflow-hidden hero-wrapper">
      <section className={`hero-root ${stateClass} relative min-h-[85vh] flex flex-col pt-8 sm:pt-12 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10`}>
        <style>{HERO_MOTION_STYLES}</style>

        {/* 01. TOP CHAPTER IDENTIFIER — High-impact Institutional Brand Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
          <div className="flex items-center gap-3.5">
            <div className="hero-anim-emblem relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-2 shadow-[0_4px_20px_rgba(0,98,255,0.18)] border border-black/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,98,255,0.35)]">
              <img
                src="/iei-official-logo.png"
                alt="The Institution of Engineers (India) Official Seal"
                className="w-full h-full object-contain select-none filter contrast-110"
                draggable={false}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span
                  className={`${sweepDone ? 'hero-anim-title' : 'hero-anim-sweep'} font-sans font-bold tracking-tight text-xl sm:text-2xl leading-none select-none text-zinc-950`}
                  data-sweep-done={sweepDone ? 'true' : 'false'}
                >
                  IEI SIES GST
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 02. EDITORIAL TYPOGRAPHY-FIRST IEI IDENTITY WITH CINEMATIC MORPH */}
        <div 
          className={`flex-1 flex flex-col items-center justify-center select-none py-8 sm:py-12 md:py-16 w-full ${morphClass}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Eyebrow: THE */}
          <div className="overflow-hidden pb-1 mb-3 sm:mb-4 md:mb-5">
            <span className="hero-the-eyebrow block select-none">
              THE
            </span>
          </div>

          {/* Monumental Typographic Identity: I nstitution of E ngineers I ndia <-> I E I */}
          <h1 
            className="hero-identity-line select-none cursor-pointer"
            onClick={toggleDisplayMode}
            title="Click to toggle between IEI acronym and full title"
            aria-label="The Institution of Engineers India"
          >
            {/* Ambient kinetic motes moving out of typography */}
            <span className="hero-outward-mote hero-mote-1" aria-hidden="true" />
            <span className="hero-outward-mote hero-mote-2" aria-hidden="true" />
            <span className="hero-outward-mote hero-mote-3" aria-hidden="true" />
            <span className="hero-outward-mote hero-mote-4" aria-hidden="true" />

            {/* Word: Institution */}
            <span className="hero-iei-word hero-word-institution">
              <span className="hero-iei-initial hero-initial-i1 hero-anim-initial-1">
                I
              </span>
              <span className="hero-iei-subword-mask">
                <span className="hero-iei-subword hero-anim-subword-1">
                  nstitution
                </span>
              </span>
            </span>

            {/* Connector: of */}
            <span className="hero-iei-connector hero-anim-connector">
              of
            </span>

            {/* Word: Engineers (E in IEI Blue) */}
            <span className="hero-iei-word hero-word-engineers">
              <span className="hero-iei-initial hero-initial-e hero-anim-initial-2">
                E
              </span>
              <span className="hero-iei-subword-mask">
                <span className="hero-iei-subword hero-anim-subword-2">
                  ngineers
                </span>
              </span>
            </span>

            {/* Word: India */}
            <span className="hero-iei-word hero-word-india">
              <span className="hero-iei-initial hero-initial-i2 hero-anim-initial-3">
                I
              </span>
              <span className="hero-iei-subword-mask">
                <span className="hero-iei-subword hero-anim-subword-3">
                  ndia
                </span>
              </span>
            </span>
          </h1>

          {/* 03. EDITORIAL SUBTITLE — Institutional Chapter Identity */}
          <div className="overflow-visible mt-6 sm:mt-8 md:mt-10 px-4">
            <p className="hero-editorial-subtitle select-none text-zinc-700">
              A dedicated Student Chapter of{' '}
              <span className="text-zinc-950 font-bold tracking-normal">
                Electronics and Computer Science Engineering
              </span>
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
