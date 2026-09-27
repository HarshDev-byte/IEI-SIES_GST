import React, { useState } from 'react';
import { Cpu, Wrench, Compass, Building2, Trophy, Users, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ScopeOfAction() {
  const tracks = [
    {
      num: "01",
      id: "technical",
      title: "Technical Core",
      category: "Engineering Development",
      description: "Rigorous exploration into embedded systems, algorithmic software architectures, computer vision, and VLSI circuit prototyping.",
      deliverables: ["Firmware Development", "RTOS Kernels", "Signal Processing"],
      icon: Cpu
    },
    {
      num: "02",
      id: "workshops",
      title: "Workshops & Labs",
      category: "Skill Transfer",
      description: "Intensive hands-on technical masterclasses led by senior engineers, alumni researchers, and industry specialists.",
      deliverables: ["Hands-on Toolchains", "Hardware Testbenches", "Code Labs"],
      icon: Wrench
    },
    {
      num: "03",
      id: "projects",
      title: "Project Tracks",
      category: "Applied Innovation",
      description: "Multi-month mentored student engineering projects tackling real collegiate challenges, technical patents, and research publications.",
      deliverables: ["Functional Prototypes", "Design Documentation", "Peer Review"],
      icon: Compass
    },
    {
      num: "04",
      id: "industry",
      title: "Industry Outreach",
      category: "Professional Liaison",
      description: "Direct partnerships with engineering enterprises, tech facility tours, guest lecture series, and technical internship pathways.",
      deliverables: ["Industrial Seminars", "Technical Site Visits", "Alumni Mentorship"],
      icon: Building2
    },
    {
      num: "05",
      id: "competitions",
      title: "Competitions",
      category: "Collegiate Hackathons",
      description: "Organizing and fielding chapter delegations for national hackathons, hardware build-offs, and collegiate engineering symposia.",
      deliverables: ["National Hackathons", "Design Challenges", "Collegiate Cups"],
      icon: Trophy
    },
    {
      num: "06",
      id: "community",
      title: "Community & Ethics",
      category: "Institutional Impact",
      description: "Fostering collegiate peer learning, open-source knowledge sharing, and societal engineering initiatives across campus.",
      deliverables: ["Open Source Tooling", "Technical Mentoring", "Academic Ethics"],
      icon: Users
    }
  ];

  return (
    <section id="activities" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]" aria-label="Scope of Action">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            What We Do
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          A structured framework designed to cultivate technical depth, empirical discipline, and professional leadership.
        </p>
      </div>

      {/* 6 TRACKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => {
          const Icon = track.icon;

          return (
            <div 
              key={track.id}
              className="minimal-card p-6 sm:p-7 flex flex-col justify-between bg-white shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-5">
                  <span className="text-[#0062FF] font-semibold">
                    TRACK {track.num}
                  </span>
                  <span className="text-zinc-500 uppercase text-[10px] tracking-wider">
                    {track.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-50 border border-black/[0.06]">
                    <Icon size={18} className="text-zinc-800" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-zinc-950">
                    {track.title}
                  </h3>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-normal">
                  {track.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.06]">
                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider block mb-2">
                  Deliverables:
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  {track.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-zinc-700">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
