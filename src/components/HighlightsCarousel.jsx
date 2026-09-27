import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Plane, ShoppingBag, Flag, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function HighlightsCarousel({ onActionClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      num: '01',
      tag: 'NATIONAL COMMEMORATION',
      icon: Flag,
      title: '79th Independence Day — Engineering Atmanirbhar Bharat',
      desc: 'Reflecting on 100+ years of nation-building: from irrigation dams and arterial rail corridors to self-reliant aerospace defense and semiconductor sovereignty.',
      cta: 'Read National Commemoration Address',
      linkType: 'independence-day',
      accent: '#D6A85F'
    },
    {
      num: '02',
      tag: 'MEMBER BENEFIT PROGRAM',
      icon: Plane,
      title: 'Air India Corporate Travel Privilege for Corporate Members',
      desc: 'Exclusive institutional flight booking rates, enhanced baggage allowance, priority check-in, and lounge privileges across all domestic and international sectors.',
      cta: 'Activate Travel Privilege',
      linkType: 'air-travel',
      accent: '#00D6FF'
    },
    {
      num: '03',
      tag: 'TECHNOLOGY PARTNERSHIP',
      icon: ShoppingBag,
      title: 'Samsung Corporate E-Store Privileges for IEI Members',
      desc: 'Special corporate member concessions up to 35% on high-performance workstations, ultra-wide CAD monitors, Galaxy tablets, and high-density SSD storage.',
      cta: 'Access Member E-Store',
      linkType: 'samsung-store',
      accent: '#075BFF'
    },
    {
      num: '04',
      tag: 'REGALIA & HERITAGE',
      icon: Sparkles,
      title: 'Official Centenary Regalia & Archival IEI Merchandise',
      desc: 'Commissioned gold-plated FIE/MIE lapel pins, precision tie-pins, pure silk crest ties, and the leather-bound 100-Year Commemorative Engineering Compendium.',
      cta: 'Explore Official Regalia',
      linkType: 'regalia',
      accent: '#D6A85F'
    }
  ];

  // Auto-cycle every 6 seconds if not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    audioEngine.playClick();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    audioEngine.playClick();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <section 
      id="highlights-carousel" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.06]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-8 border-b border-white/[0.08] pb-4 font-mono text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF]" />
          <span className="text-white/80 font-bold uppercase tracking-wider">
            FEATURED HIGHLIGHTS & PRIVILEGES
          </span>
        </div>

        {/* Slide Counter: 01 / 04 */}
        <div className="flex items-center gap-4">
          <span className="text-white font-bold text-sm">
            {currentSlide.num} <span className="text-white/30 font-normal">/ 0{slides.length}</span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded border border-white/15 hover:border-white/40 text-white/70 hover:text-white transition-all bg-white/[0.02]"
              aria-label="Previous Highlight"
              data-cursor="PREV"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded border border-white/15 hover:border-white/40 text-white/70 hover:text-white transition-all bg-white/[0.02]"
              aria-label="Next Highlight"
              data-cursor="NEXT"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH EDITORIAL PANEL */}
      <div className="glass-panel p-8 sm:p-14 rounded-lg border border-white/10 relative overflow-hidden transition-all duration-500">
        <div className="crosshair-corner crosshair-tl" />
        <div className="crosshair-corner crosshair-br" />

        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="badge-cad text-xs font-semibold"
              style={{ color: currentSlide.accent, borderColor: `${currentSlide.accent}40` }}
            >
              {currentSlide.tag}
            </span>
            <span className="font-mono text-xs text-white/40">ANNOUNCEMENT</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            {currentSlide.title}
          </h3>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mb-8 font-normal">
            {currentSlide.desc}
          </p>

          <button
            type="button"
            onClick={() => {
              audioEngine.playClick();
              onActionClick(currentSlide.linkType);
            }}
            className="btn-engineering-primary text-xs sm:text-sm py-3 px-6 font-semibold flex items-center gap-2"
            data-cursor="OPEN"
          >
            <span>{currentSlide.cta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/[0.08]">
          <div 
            className="h-full bg-[#00D6FF] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

      </div>

    </section>
  );
}
