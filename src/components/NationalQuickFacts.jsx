import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/**
 * ============================================================================
 * IEI SIES GST — NATIONAL QUICK FACTS & CHAPTER DATA
 * Clean, restrained horizontal editorial fact strip.
 * Replaces SaaS-style dashboard cards with confident institutional typography.
 * ============================================================================
 */

export default function NationalQuickFacts() {
  const chapterMetrics = [
    { 
      val: "56+", 
      label: "Active Collegiate Engineers", 
      desc: "Department of ECS & SIES GST Student Roster" 
    },
    { 
      val: "10+", 
      label: "Flagship Symposia & Conclaves", 
      desc: "Annual technical summits, ideathons, and workshops" 
    },
    { 
      val: "12+", 
      label: "Accredited SMIE Cardholders", 
      desc: "Student Members recognized under National Grade" 
    },
    { 
      val: "15+", 
      label: "Hardware & Software Testbenches", 
      desc: "Microcontroller, RTOS, and computing test facilities" 
    }
  ];

  const nationalSpecs = [
    { label: "Founded", val: "13 Sept 1920", meta: "Kolkata, West Bengal" },
    { label: "Royal Charter", val: "9 Sept 1935", meta: "King George V" },
    { label: "Constitutional Status", val: "Article 372", meta: "Body Corporate of India" },
    { label: "Apex Footprint", val: "1,000,000+", meta: "Engineers Worldwide · 15 Divisions" }
  ];

  return (
    <section 
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" 
      aria-label="Chapter Benchmarks and National Fact Strip"
    >
      {/* 01. HORIZONTAL EDITORIAL CHAPTER FACT STRIP (No divider lines) */}
      <div className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-3">
          <div className="font-mono text-xs font-semibold text-[#0062FF] uppercase tracking-wider">
            SIES GST Student Chapter · Performance Telemetry
          </div>
          <div className="text-xs text-zinc-500 font-medium">
            Academic Session 2026–2027 · Department of Electronics &amp; Computer Science
          </div>
        </div>

        {/* 4 Clean Typographic Stat Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
          {chapterMetrics.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight leading-none">
                {item.val}
              </div>
              <div className="font-sans text-sm sm:text-base font-bold text-zinc-900 mt-2.5 leading-snug">
                {item.label}
              </div>
              <div className="text-xs text-zinc-500 mt-1 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 02. STATUTORY NATIONAL BENCHMARK BASELINE */}
      <div className="pt-8 sm:pt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
              Scientific &amp; Industrial Research Organisation (SIRO)
            </div>
            <div className="text-xs text-zinc-500">
              Recognized by DSIR, Ministry of Science &amp; Technology, Government of India
            </div>
          </div>
        </div>

        {/* 4 Compact Institutional Anchors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-xs text-zinc-600">
          {nationalSpecs.map((spec, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider">{spec.label}</span>
              <span className="font-bold text-zinc-900 mt-0.5">{spec.val}</span>
              <span className="text-zinc-500 text-[11px]">{spec.meta}</span>
            </div>
          ))}
        </div>

        <a 
          href="https://www.ieindia.org" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => audioEngine?.playClick && audioEngine.playClick()}
          className="self-start lg:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#0062FF] hover:text-[#0052D6] transition-colors py-1 group"
        >
          <span>ieindia.org</span>
          <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
