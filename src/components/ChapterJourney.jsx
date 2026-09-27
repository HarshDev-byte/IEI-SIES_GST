import React, { useState } from 'react';
import { ArrowRight, Terminal, Cpu, Layers, Network, Award, HeartHandshake } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ChapterJourney() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: "learn",
      number: "01",
      title: "LEARN",
      eyebrow: "PHASE 01 — ACADEMIC FOUNDATIONS",
      subtitle: "Rigorous Technical Grounding in Circuits & Logic",
      description: "Members commence their journey by establishing core engineering fluency. Curated syllabus enhancements, departmental reading groups, and structured technical seminars bridge theoretical textbooks with practical intuition.",
      category: "Foundational Knowledge Acquisition",
      metadata: [
        { label: "DOMAIN", value: "Circuit Theory & Computation" },
        { label: "FORMAT", value: "Technical Seminars & Study Circles" },
        { label: "OUTPUT", value: "Core Engineering Literacy" }
      ],
      technicalTags: ["SPICE Modeling", "Signals & Systems", "Digital Logic", "C/C++ Fundamentals"],
      icon: Terminal
    },
    {
      id: "explore",
      number: "02",
      title: "EXPLORE",
      eyebrow: "PHASE 02 — LABORATORY EXPLORATION",
      subtitle: "Cross-Disciplinary Inquiry & Architecture Study",
      description: "Moving into departmental laboratories, student engineers experiment with silicon architectures, RTOS kernels, sensor telemetry, and modern communications protocols — exploring engineering vectors beyond standard coursework.",
      category: "Specialized Domain Research",
      metadata: [
        { label: "DOMAIN", value: "Embedded Systems & AIoT" },
        { label: "FORMAT", value: "Hands-on Hardware Labs" },
        { label: "OUTPUT", value: "Architectural Intuition" }
      ],
      technicalTags: ["RISC-V Microcontrollers", "FreeRTOS", "Telemetry Traces", "RF & Antennae"],
      icon: Cpu
    },
    {
      id: "build",
      number: "03",
      title: "BUILD",
      eyebrow: "PHASE 03 — SYSTEM FABRICATION",
      subtitle: "From Silicon Schematics to Tangible Prototypes",
      description: "Theoretical knowledge crystallizes into physical hardware and production software. Students design multi-layer PCBs, assemble surface-mount components, author deterministic firmware, and build web platforms for chapter infrastructure.",
      category: "Engineering Implementation",
      metadata: [
        { label: "DOMAIN", value: "Design & Rapid Prototyping" },
        { label: "FORMAT", value: "Quarterly Chapter Hackathons" },
        { label: "OUTPUT", value: "Functional Hardware Prototypes" }
      ],
      technicalTags: ["Multi-Layer KiCad", "STM32 / ESP32", "Firmware Stack", "Next.js Platforms"],
      icon: Layers
    },
    {
      id: "connect",
      number: "04",
      title: "CONNECT",
      eyebrow: "PHASE 04 — PROFESSIONAL NETWORK",
      subtitle: "Interdisciplinary Synergy & Industry Mentorship",
      description: "Engineering thrives on collective discourse. The chapter orchestrates collaborative sessions between junior members, council mentors, alumni researchers in global institutions, and practicing industry technocrats.",
      category: "Institutional Collaboration",
      metadata: [
        { label: "DOMAIN", value: "Industry Outreach & Relations" },
        { label: "FORMAT", value: "Executive Guest Keynotes & Visits" },
        { label: "OUTPUT", value: "Professional Career Pathways" }
      ],
      technicalTags: ["Alumni Mesh", "Corporate Liaison", "Peer Code Reviews", "Technical Mentoring"],
      icon: Network
    },
    {
      id: "compete",
      number: "05",
      title: "COMPETE",
      eyebrow: "PHASE 05 — COMPETITIVE BENCHMARK",
      subtitle: "Testing Prowess in High-Stakes National Arenas",
      description: "Chapter teams represent SIES GST at state and national competitions — robotics tournaments, hackathons, and research symposiums. Developing rapid algorithmic judgment, team resilience, and professional presentation caliber.",
      category: "Competitive Engineering",
      metadata: [
        { label: "DOMAIN", value: "Hackathons & Robotics Arenas" },
        { label: "FORMAT", value: "Inter-Collegiate Competitions" },
        { label: "OUTPUT", value: "Institutional Accolades" }
      ],
      technicalTags: ["Smart India Hackathon", "RoboCon League", "Cybersecurity CTFs", "Technical Papers"],
      icon: Award
    },
    {
      id: "contribute",
      number: "06",
      title: "CONTRIBUTE",
      eyebrow: "PHASE 06 — LEGACY & GIVING BACK",
      subtitle: "Open Source Knowledge & Junior Stewardship",
      description: "The journey culminates in generational stewardship. Senior engineers open-source their research tooling, author comprehensive archival guides, and mentor the incoming first-year cohort to sustain the chapter’s institutional legacy.",
      category: "Community Leadership",
      metadata: [
        { label: "DOMAIN", value: "Archival & Open Source" },
        { label: "FORMAT", value: "Annual Chapter Publications" },
        { label: "OUTPUT", value: "Sustained Institutional Heritage" }
      ],
      technicalTags: ["Open Hardware", "IEI Student Journal", "Cohort Mentorship", "Department Archives"],
      icon: HeartHandshake
    }
  ];

  const current = stages[activeStage];
  const CurrentIcon = current.icon;

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]" aria-label="Chapter Journey: From Learning to Contribution">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            From Learning to Contribution.
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Institutional Progression &amp; Engineering Lifecycle across 4 collegiate years.
        </p>
      </div>

      {/* 6 STAGE STEPPER BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
        {stages.map((stg, idx) => {
          const isSelected = activeStage === idx;
          const StageIcon = stg.icon;

          return (
            <button
              key={stg.id}
              onClick={() => {
                setActiveStage(idx);
                audioEngine.playClick();
              }}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-md' 
                  : 'bg-white text-zinc-600 border-black/[0.08] hover:border-black/20 hover:text-zinc-950 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-[11px] ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>{stg.number}</span>
                <StageIcon size={14} className={isSelected ? 'text-[#0062FF]' : 'text-zinc-400'} />
              </div>
              <div className="font-display font-bold text-xs tracking-wide">
                {stg.title}
              </div>
              <div className={`font-mono text-[9px] truncate mt-0.5 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {stg.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* DETAILED ACTIVE STAGE CARD */}
      <div className="minimal-card-elevated p-8 sm:p-10 border border-black/[0.08] bg-white relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-minimal badge-blue text-[10px]">
                {current.eyebrow}
              </span>
              <span className="text-zinc-500 font-mono text-xs">
                {current.category}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 mb-3">
              {current.subtitle}
            </h3>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {current.description}
            </p>

            <div>
              <span className="text-zinc-500 font-mono text-[10px] block mb-2 uppercase tracking-wider">
                Technical Focus &amp; Tools:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.technicalTags.map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-100 border border-black/[0.06] text-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stage Specs */}
          <div className="lg:col-span-5 bg-[#FAFAFC] p-6 rounded-xl border border-black/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
              <span className="font-mono text-xs font-semibold text-zinc-900 flex items-center gap-2">
                <CurrentIcon size={14} className="text-[#0062FF]" />
                STAGE METRICS
              </span>
              <span className="font-mono text-[10px] text-zinc-500">
                PHASE SPECIFICATION
              </span>
            </div>

            {current.metadata.map((meta, mIdx) => (
              <div key={mIdx} className="space-y-0.5">
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider block">
                  {meta.label}
                </span>
                <span className="font-mono text-xs text-zinc-800 font-medium block">
                  {meta.value}
                </span>
              </div>
            ))}

            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
              <span className="font-mono text-[11px] text-zinc-500">Next Stage</span>
              <button 
                onClick={() => {
                  setActiveStage((prev) => (prev + 1) % stages.length);
                  audioEngine.playClick();
                }}
                className="font-mono text-xs text-[#0062FF] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Advance to Phase {((activeStage + 1) % stages.length) + 1}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
