import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import HeroInteractiveCore from './HeroInteractiveCore';

export default function Hero({ 
  onExploreClick, 
  onOpenMembership, 
  onOpenVerify 
}) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* 01. TOP INSTITUTIONAL METADATA BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/[0.08]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0052D6]/8 border border-[#0052D6]/20 text-[#0052D6] font-mono text-[11px] font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052D6]" />
            <span>IEI · SIES GST</span>
          </div>

          <span className="text-zinc-300 hidden sm:inline">|</span>

          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
            <span className="font-sans text-xs font-bold text-zinc-900">
              SIES Graduate School of Technology
            </span>
            <span className="text-zinc-400 text-xs hidden md:inline">
              · Nerul, Navi Mumbai
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-zinc-600">
          <span className="hidden lg:inline text-zinc-500 font-sans text-xs">
            Dept. of Electronics &amp; Computer Science
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 font-semibold text-[11px] border border-emerald-500/20 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tenure 1 (2026–2027) Active</span>
          </div>
        </div>
      </div>

      {/* 02. MINIMAL & EYE-CATCHING HERO SPLIT */}
      <div className="my-auto py-8 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Authoritative Editorial Typography & Actions */}
        <div className="lg:col-span-6 flex flex-col max-w-2xl">
          
          {/* Institutional Badge Pill */}
          <div className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100/80 border border-black/8 select-none w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052D6]" />
            <span className="font-mono text-[10px] font-bold text-zinc-800 tracking-wider uppercase">
              The Institution of Engineers (India)
            </span>
            <span className="text-zinc-300">·</span>
            <span className="font-mono text-[10px] text-zinc-500 font-medium">
              Student Chapter #602
            </span>
          </div>

          {/* Strong, Authoritative Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-black text-zinc-950 tracking-tight leading-[1.03] mb-5">
            Advancing engineering excellence, research &amp;{' '}
            <span className="text-[#0052D6] relative inline-block">
              innovation.
            </span>
          </h1>

          {/* Department Descriptor Pill */}
          <div className="font-mono text-xs text-[#0052D6] font-bold tracking-wider uppercase mb-4">
            Department of Electronics &amp; Computer Science Engineering
          </div>

          {/* Editorial Paragraph */}
          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed mb-8 max-w-xl">
            The premier collegiate engineering society at <strong>SIES Graduate School of Technology</strong>. 
            Empowering student engineers through applied hardware testbenches, interdisciplinary research, 
            and century-old Royal Chartered accreditation.
          </p>

          {/* Action CTAs (Minimal: Just ONE Primary Button + ONE Text Link) */}
          <div className="flex flex-wrap items-center gap-5 mb-8">
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

            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                onOpenMembership();
              }}
              className="text-zinc-600 hover:text-zinc-950 font-sans text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer py-2 group"
            >
              <span>Become a Member (SMIE)</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Clean Institutional Trust Line */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 font-mono text-[11px] text-zinc-500 pt-5 border-t border-black/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-zinc-800">Royal Charter 1935</span>
            </div>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-600">SIRO Recognized (DSIR)</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-600">Article 372 Body Corporate</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-600">1M+ Global Alumni</span>
          </div>

        </div>

        {/* Right Column: Pure Architectural Emblem & Vector Blueprint */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
          <HeroInteractiveCore 
            onOpenVerify={onOpenVerify}
          />
        </div>

      </div>

    </section>
  );
}


