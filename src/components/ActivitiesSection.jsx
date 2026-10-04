import React, { useState } from 'react';
import { Terminal, Cpu, Users, Award, Calendar, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ActivitiesSection({ onOpenMembership }) {
  const activities = [
    {
      id: "embedded-symposium",
      num: "01",
      code: "IEI·ACT·01",
      title: "Advanced Microcontroller & RTOS Lab",
      category: "Hands-on Workshop",
      description: "Rigorous hardware masterclasses where student engineers program real-time operating system kernels directly onto 32-bit ARM architectures.",
      cadence: "Bi-Weekly Track",
      icon: Cpu,
      specs: ["ARM Cortex-M4 & STM32", "FreeRTOS Deterministic Scheduler", "Logic Analyzer & Oscilloscope Telemetry"]
    },
    {
      id: "ai-paper-track",
      num: "02",
      code: "IEI·ACT·02",
      title: "Distributed Machine Learning Working Group",
      category: "Research Circle",
      description: "Empirical analysis of state-of-the-art transformer papers and hands-on optimization for neural inference on edge devices.",
      cadence: "Weekly Seminar",
      icon: Terminal,
      specs: ["Quantized Edge Inference (INT8)", "Model Sharding & Tensor Parallelism", "Peer Reviewed IEEE Paper Digest"]
    },
    {
      id: "industry-conclave",
      num: "03",
      code: "IEI·ACT·03",
      title: "ECS Industrial Leadership Forum",
      category: "Industry Outreach",
      description: "Direct dialogue between industry engineering heads and student researchers on microelectronics supply chains and cloud infrastructure.",
      cadence: "Semester Symposium",
      icon: Users,
      specs: ["Direct CTO & VP Engineering Keynotes", "Semiconductor & VLSI Career Pathways", "Departmental Industry Advisory Feedback"]
    },
    {
      id: "hackathon-delegation",
      num: "04",
      code: "IEI·ACT·04",
      title: "Collegiate Systems Hackathon",
      category: "Chapter Flagship",
      description: "A 36-hour rapid hardware-software prototyping sprint building verified engineering solutions for real civic and industrial challenges.",
      cadence: "Annual Flagship",
      icon: Award,
      specs: ["36-Hour Continuous Build Sprint", "Full Hardware Component Dispensary", "Judged by Senior Industrial Fellows"]
    }
  ];

  const [activeActivity, setActiveActivity] = useState(0);
  const current = activities[activeActivity];

  return (
    <section id="program-roster" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" aria-label="Featured Activities">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            Featured Activities
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Disciplined technical initiatives organized across the academic semester at SIES GST.
        </p>
      </div>

      {/* 4 ACTIVITIES SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Activity Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          {activities.map((act, idx) => {
            const isSelected = activeActivity === idx;

            return (
              <button
                key={act.id}
                onClick={() => {
                  setActiveActivity(idx);
                  audioEngine.playClick();
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' 
                    : 'bg-white border-black/[0.08] text-zinc-600 hover:text-zinc-950 hover:border-black/20 hover:bg-zinc-50/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                    isSelected ? 'bg-white/15 text-white' : 'bg-black/[0.04] text-zinc-800'
                  }`}>
                    {act.num}
                  </div>
                  <div>
                    <div className={`text-xs flex items-center gap-1.5 ${
                      isSelected ? 'text-zinc-300' : 'text-zinc-500'
                    }`}>
                      <span>{act.category}</span>
                      <span>·</span>
                      <span>{act.cadence}</span>
                    </div>
                    <div className={`font-display font-bold text-sm mt-0.5 ${
                      isSelected ? 'text-white' : 'text-zinc-900'
                    }`}>
                      {act.title}
                    </div>
                  </div>
                </div>

                <ChevronRight 
                  size={14} 
                  className={isSelected ? 'text-white' : 'text-zinc-400'} 
                />
              </button>
            );
          })}
        </div>

        {/* Right: Detailed High-Precision Engineering Activity Dossier */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.03)] relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-black/[0.08] pb-4 mb-6 text-xs text-zinc-500 font-medium">
            <span>{current.category}</span>
            <span>{current.cadence}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 mb-3 tracking-tight">
            {current.title}
          </h3>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {current.description}
          </p>

          {/* Technical Modules & Lab Architecture */}
          <div className="bg-[#FAFAFC] p-5 sm:p-6 rounded-2xl border border-black/[0.06] mb-6">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/[0.04] text-xs font-semibold text-zinc-700">
              <span>Core Syllabus &amp; Hardware Testbeds</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {current.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3 text-zinc-800 bg-white p-2.5 rounded-xl border border-black/5 shadow-xs">
                  <CheckCircle2 size={15} className="text-[#0066CC] shrink-0" />
                  <span className="font-medium">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Enrollment Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
            <div className="text-xs text-zinc-500 font-medium">
              Active Semester Cohort Forming
            </div>

            <button
              onClick={() => {
                audioEngine.playClick();
                if (onOpenMembership) onOpenMembership(current.title);
              }}
              className="btn-minimal-primary text-xs py-3 px-6 shadow-md flex items-center gap-2 group cursor-pointer"
            >
              <span>Enroll In Active Track</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
