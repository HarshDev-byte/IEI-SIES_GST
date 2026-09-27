import React, { useState } from 'react';
import { ShieldCheck, Cpu, Globe, Palette, Megaphone, DollarSign, CalendarCheck, BookOpen, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function GovernanceTeam() {
  const [activeTab, setActiveTab] = useState('faculty');
  const [activeWing, setActiveWing] = useState(0);

  const faculty = [
    {
      name: "Dr. Atul Kemkar",
      role: "Principal & Chief Patron",
      dept: "SIES Graduate School of Technology",
      initials: "AK",
      desc: "Providing apex institutional leadership, statutory mentorship, and executive guidance for collegiate engineering societies.",
      badge: "PRINCIPAL · SIES GST"
    },
    {
      name: "Dr. Shubhangi Kharache",
      role: "Head of Department & Patron",
      dept: "Electronics & Computer Science Engineering",
      initials: "SK",
      desc: "Providing departmental vision, academic direction, and curriculum alignment for the IEI SIES GST Student Chapter.",
      badge: "HOD · DEPT OF ECS"
    },
    {
      name: "Prof. Jasmin Hirani",
      role: "Faculty Advisor & Chapter Coordinator",
      dept: "Electronics & Computer Science Engineering",
      initials: "JH",
      desc: "Overseeing chapter operations, student leadership development, institutional compliance, and national council liaison.",
      badge: "STUDENT BRANCH COORDINATOR"
    }
  ];

  const council = [
    { name: "Executive President", role: "Chapter President", code: "IEI-GST-EXEC-01", dept: "ECS 4th Year" },
    { name: "Vice President (Technical)", role: "VP Technical & Projects", code: "IEI-GST-EXEC-02", dept: "ECS 4th Year" },
    { name: "Vice President (Admin)", role: "VP Operations & Outreach", code: "IEI-GST-EXEC-03", dept: "ECS 3rd Year" },
    { name: "General Secretary", role: "Executive Secretariat", code: "IEI-GST-EXEC-04", dept: "ECS 3rd Year" },
    { name: "Treasurer & Head of Finance", role: "Fiscal Custodian", code: "IEI-GST-EXEC-05", dept: "ECS 3rd Year" }
  ];

  const wings = [
    {
      id: "tech",
      name: "Technical Wing",
      code: "IEI-ECS-TECH",
      icon: Cpu,
      lead: "Technical Head & 12 Specialists",
      focus: "Hardware sprints, RTOS labs, microcontroller testbenches, and collegiate project mentorship."
    },
    {
      id: "web",
      name: "Web & Digital Systems Wing",
      code: "IEI-ECS-WEB",
      icon: Globe,
      lead: "Webmaster & 6 Developers",
      focus: "Modern web platforms, API microservices, event portals, and digital infrastructure for the chapter."
    },
    {
      id: "creative",
      name: "Creative & Design Wing",
      code: "IEI-ECS-CRTV",
      icon: Palette,
      lead: "Creative Director & 8 Designers",
      focus: "Visual identity, CAD schematics, editorial layouts, motion design, and event aesthetics."
    },
    {
      id: "pr",
      name: "Public Relations & Outreach Wing",
      code: "IEI-ECS-PR",
      icon: Megaphone,
      lead: "PR Head & 8 Coordinators",
      focus: "Campus-wide dissemination, inter-collegiate communications, social media, and institutional outreach."
    },
    {
      id: "spon",
      name: "Sponsorship & Corporate Relations",
      code: "IEI-ECS-SPON",
      icon: DollarSign,
      lead: "Sponsorship Lead & 5 Liaisons",
      focus: "Corporate partnerships, hackathon hardware grants, industrial tour arrangements, and sponsor deliverables."
    },
    {
      id: "ops",
      name: "Events & Operations Wing",
      code: "IEI-ECS-OPS",
      icon: CalendarCheck,
      lead: "Operations Head & 15 Marshals",
      focus: "Auditorium logistics, stage management, registration flows, AV infrastructure, and venue protocol."
    },
    {
      id: "edit",
      name: "Editorial & Documentation Wing",
      code: "IEI-ECS-EDIT",
      icon: BookOpen,
      lead: "Chief Editor & 6 Scribes",
      focus: "Formal proceedings, annual research digests, project documentation standards, and IEEE report templates."
    }
  ];

  return (
    <section id="team" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.06]" aria-label="The People of IEI SIES GST">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-minimal badge-blue">
              07 CHAPTER GOVERNANCE
            </span>
            <span className="badge-minimal">
              IEI·GOV·ECS
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            The People
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Academic advisors, executive council officers, and 7 specialized domain wings.
        </p>
      </div>

      {/* THREE TIER NAVIGATION STRIP */}
      <div className="flex flex-wrap gap-2 mb-10 p-1.5 rounded-xl bg-zinc-100/80 border border-black/[0.06] w-fit">
        <button
          onClick={() => {
            setActiveTab('faculty');
            audioEngine.playClick();
          }}
          className={`px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
            activeTab === 'faculty' 
              ? 'bg-zinc-950 text-white font-semibold shadow-sm' 
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          TIER 01: FACULTY ADVISORY
        </button>

        <button
          onClick={() => {
            setActiveTab('council');
            audioEngine.playClick();
          }}
          className={`px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
            activeTab === 'council' 
              ? 'bg-zinc-950 text-white font-semibold shadow-sm' 
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          TIER 02: CORE COUNCIL
        </button>

        <button
          onClick={() => {
            setActiveTab('wings');
            audioEngine.playClick();
          }}
          className={`px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
            activeTab === 'wings' 
              ? 'bg-zinc-950 text-white font-semibold shadow-sm' 
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          TIER 03: 7 DOMAIN WINGS
        </button>
      </div>

      {/* TAB 1: FACULTY ADVISORY */}
      {activeTab === 'faculty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faculty.map((member, idx) => (
            <div 
              key={idx}
              className="bg-white p-7 sm:p-8 rounded-2xl border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="badge-minimal badge-blue text-[10px]">
                  {member.badge}
                </span>
                <span className="font-mono text-xs text-zinc-500">OFFICIAL ADVISOR</span>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-black/[0.08] flex items-center justify-center font-display font-bold text-lg text-zinc-900">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-zinc-950">
                    {member.name}
                  </h3>
                  <div className="font-mono text-xs text-[#0062FF] mt-0.5 font-medium">
                    {member.role}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-500">
                    {member.dept}
                  </div>
                </div>
              </div>

              <p className="text-zinc-600 text-sm leading-relaxed font-normal pt-4 border-t border-black/[0.06]">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CORE COUNCIL */}
      {activeTab === 'council' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {council.map((c, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 rounded-xl border border-black/[0.08] hover:border-black/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              <div className="font-mono text-[10px] text-zinc-500 flex items-center justify-between mb-2">
                <span>{c.code}</span>
                <ShieldCheck size={12} className="text-[#0062FF]" />
              </div>
              <h3 className="font-display font-bold text-base text-zinc-950 mb-1">
                {c.name}
              </h3>
              <div className="font-mono text-xs text-[#0062FF] font-medium mb-0.5">
                {c.role}
              </div>
              <div className="font-mono text-[11px] text-zinc-500">
                {c.dept}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: 7 DOMAIN WINGS */}
      {activeTab === 'wings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-2">
            {wings.map((w, idx) => {
              const isSelected = activeWing === idx;
              const Icon = w.icon;

              return (
                <button
                  key={w.id}
                  onClick={() => {
                    setActiveWing(idx);
                    audioEngine.playClick();
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected 
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' 
                      : 'bg-white border-black/[0.08] text-zinc-600 hover:text-zinc-950 hover:border-black/20 hover:bg-zinc-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isSelected ? 'text-[#38bdf8]' : 'text-zinc-500'} />
                    <div>
                      <div className={`font-display font-bold text-xs ${isSelected ? 'text-white' : 'text-zinc-900'}`}>{w.name}</div>
                      <div className={`font-mono text-[9px] ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>{w.code}</div>
                    </div>
                  </div>
                  <ChevronRight size={13} className={isSelected ? 'text-white' : 'text-zinc-400'} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            {(() => {
              const currentWing = wings[activeWing];
              const WingIcon = currentWing.icon;

              return (
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-5">
                    <span className="badge-minimal badge-blue text-[10px]">
                      {currentWing.code}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">WING DIVISION</span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.08] flex items-center justify-center">
                      <WingIcon size={20} className="text-[#0062FF]" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-zinc-950">
                        {currentWing.name}
                      </h3>
                      <span className="font-mono text-xs text-emerald-700 font-medium">
                        {currentWing.lead}
                      </span>
                    </div>
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-normal">
                    {currentWing.focus}
                  </p>

                  <div className="bg-[#FAFAFC] p-4 rounded-xl border border-black/[0.06] font-mono text-xs text-zinc-700">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider block mb-1 font-semibold">
                      Departmental Alignment:
                    </span>
                    Operates in coordination with ECS faculty advisory, executing semester initiatives with strict institutional standards.
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      )}

    </section>
  );
}
