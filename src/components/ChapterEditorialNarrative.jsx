import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { useScrollReveal } from '../utils/scrollReveal';

/**
 * ============================================================================
 * IEI SIES GST — CHAPTER EDITORIAL NARRATIVE
 * Pure editorial composition:
 * - 01 WHO WE ARE: Bold editorial statement & narrative
 * - 02 WHAT WE DO: Clean typographic list (no generic cards)
 * - 03 CHAPTER FOCUS: Classification system (TECHNICAL / INDUSTRY / INNOVATION / COMMUNITY)
 * - 04 CURRENT INITIATIVE: Featured verified flagship initiative
 * Enhanced with 240Hz hardware-accelerated scroll-reveal transitions.
 * ============================================================================
 */

export default function ChapterEditorialNarrative() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const activitiesList = [
    {
      num: "01",
      title: "Hands-on Hardware Workshops",
      scope: "Embedded ARM Cortex-M microcontrollers, FreeRTOS deterministic kernels, and multi-layer KiCad PCB fabrication testbenches."
    },
    {
      num: "02",
      title: "Technical Symposia & Conclaves",
      scope: "Annual departmental summits, plenary colloquiums, and distinguished keynotes by corporate Fellows (FIE) and research scientists."
    },
    {
      num: "03",
      title: "Collegiate Hackathons & Ideathons",
      scope: "36-hour rapid systems engineering marathons building physical firmware, sensor interfaces, and connected production prototypes."
    },
    {
      num: "04",
      title: "Industrial Delegations & Site Excursions",
      scope: "Curated technical excursions to premier industrial complexes, supercomputing facilities, and satellite ground stations."
    },
    {
      num: "05",
      title: "Applied Research & TechChronicle",
      scope: "Mentoring under DSIR SIRO research grant guidelines and bi-annual student editorial publishing in IEI-GST TechChronicle."
    },
    {
      num: "06",
      title: "Mock Placements & Career Screening",
      scope: "Rigorous technical interview sprints, algorithmic problem-solving sessions, and core electronics domain screening."
    }
  ];

  const focusClassifications = [
    {
      name: "TECHNICAL",
      desc: "Applied Hardware Testbenches",
      items: ["ARM Cortex-M & STM32", "Deterministic FreeRTOS", "Multi-Layer PCB Routing", "Logic Analyzer Telemetry"]
    },
    {
      name: "INDUSTRY",
      desc: "Corporate & Professional Linkage",
      items: ["Fellow (FIE) Keynotes", "Site Excursions", "Core Placement Sprints", "Alumni Mentorship"]
    },
    {
      name: "INNOVATION",
      desc: "Scientific & Applied Research",
      items: ["DSIR SIRO Grant Scheme", "TechChronicle E-Magazine", "Hardware Prototypes", "Patent Digest Circles"]
    },
    {
      name: "COMMUNITY",
      desc: "Student Governance & Wings",
      items: ["56+ Active Members", "7 Operational Wings", "Peer Code Reviews", "Collegiate Symposia"]
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="chapter-overview" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" 
      aria-label="Chapter Narrative, Core Activities and Focus Classification"
    >
      {/* ===================================================================== */}
      {/* SECTION 01: WHO WE ARE                                               */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-20 sm:pb-28">
        
        {/* Left Column: Number & Label (240Hz Reveal) */}
        <div className="lg:col-span-4 flex flex-col reveal-on-scroll">
          <span className="font-mono text-xs font-bold text-[#0062FF] uppercase tracking-wider mb-2">
            01 / WHO WE ARE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
            Collegiate Engineering Community
          </h2>
          <span className="text-xs text-zinc-500 mt-1 font-mono">
            SIES GST · Student Chapter
          </span>
        </div>

        {/* Right Column: Large Editorial Statement & Narrative (240Hz Staggered) */}
        <div className="lg:col-span-8 flex flex-col space-y-6 reveal-on-scroll reveal-delay-2">
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 leading-snug tracking-tight">
            Operating at the intersection of applied embedded systems, hardware testbenches, and sovereign statutory engineering accreditation.
          </p>
          <p className="font-sans text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-3xl">
            Anchored within the Department of Electronics &amp; Computer Science at SIES Graduate School of Technology, the chapter bridges classroom theoretical fundamentals with physical testbenches, industrial site visits, competitive hackathons, and research publication pathways under the century-old umbrella of The Institution of Engineers (India).
          </p>
        </div>

      </div>

      {/* ===================================================================== */}
      {/* SECTION 02: WHAT WE DO (CLEAN TYPOGRAPHIC LIST)                      */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-20 sm:pb-28">
        
        {/* Left Column: Number & Label (240Hz Reveal) */}
        <div className="lg:col-span-4 flex flex-col reveal-on-scroll">
          <span className="font-mono text-xs font-bold text-[#0062FF] uppercase tracking-wider mb-2">
            02 / WHAT WE DO
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
            Chapter Technical Initiatives
          </h2>
          <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
            Six disciplined operational tracks conducted across each academic semester at SIES GST.
          </p>
        </div>

        {/* Right Column: Editorial Typographic List (240Hz Staggered) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {activitiesList.map((item, idx) => (
            <div key={item.num} className={`flex flex-col reveal-on-scroll reveal-delay-${(idx % 4) + 1}`}>
              <span className="font-mono text-xs font-bold text-[#0062FF] mb-1.5">
                {item.num}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-950 leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed font-normal">
                {item.scope}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ===================================================================== */}
      {/* SECTION 03: CHAPTER FOCUS (CLASSIFICATION SYSTEM)                    */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-20 sm:pb-28">
        
        {/* Left Column: Number & Label (240Hz Reveal) */}
        <div className="lg:col-span-4 flex flex-col reveal-on-scroll">
          <span className="font-mono text-xs font-bold text-[#0062FF] uppercase tracking-wider mb-2">
            03 / CHAPTER FOCUS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
            Classification Taxonomy
          </h2>
          <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
            Structured focus areas guiding student projects, resource allocation, and mentorship.
          </p>
        </div>

        {/* Right Column: 4 Typographic Classification Pillars (240Hz Staggered) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {focusClassifications.map((col, idx) => (
            <div key={col.name} className={`flex flex-col reveal-on-scroll reveal-delay-${idx + 1}`}>
              <span className="font-display text-base font-black text-zinc-950 tracking-wide">
                {col.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                {col.desc}
              </span>

              <ul className="mt-4 space-y-2 text-xs text-zinc-600">
                {col.items.map((it, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#0062FF] shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* ===================================================================== */}
      {/* SECTION 04: FEATURED CURRENT INITIATIVE                               */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline pt-4">
        
        {/* Left Column: Number & Label (240Hz Reveal) */}
        <div className="lg:col-span-4 flex flex-col reveal-on-scroll">
          <span className="font-mono text-xs font-bold text-[#0062FF] uppercase tracking-wider mb-2">
            04 / CURRENT INITIATIVE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
            Flagship Systems Sprint
          </h2>
          <span className="text-xs text-zinc-500 mt-1 font-mono">
            Academic Year 2026–2027
          </span>
        </div>

        {/* Right Column: Deep Editorial Feature (240Hz Staggered Reveal) */}
        <div className="lg:col-span-8 flex flex-col justify-start reveal-on-scroll reveal-delay-2">
          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#0062FF] uppercase tracking-wider">
              ANNUAL CHAPTER FLAGSHIP · SIES GST
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-xs font-mono text-zinc-500">
              36-Hour Continuous Build
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug mb-4">
            36-Hour Systems Engineering Hackathon &amp; Hardware Testbench
          </h3>

          <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mb-6 max-w-2xl">
            The collegiate flagship where multidisciplinary student teams program deterministic FreeRTOS kernels, calibrate robotic sensor arrays, route custom PCB modules, and fabricate functional physical prototypes. Judged by senior industrial Fellows and accredited academic mentors.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#/activities"
              onClick={() => audioEngine?.playClick && audioEngine.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white text-xs font-semibold transition-all transform hover:-translate-y-0.5 shadow-sm group"
            >
              <span>EXPLORE ALL 8 CHAPTER INITIATIVES</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </a>

            <span className="text-xs font-mono text-zinc-400">
              Department of ECS · Lab 3 Dispensary
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
