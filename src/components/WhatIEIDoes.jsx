import React, { useState } from 'react';
import { 
  GraduationCap, Briefcase, Award, ShieldCheck, 
  BookOpen, Building, CheckCircle2, ArrowRight,
  ExternalLink, Layers, Sparkles
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function WhatIEIDoes({ onOpenVerify, onOpenMembership }) {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: "amie",
      code: "IEI·SVC·01",
      title: "AMIE Examinations",
      subtitle: "Associate Member of IEI — Equivalent to B.E./B.Tech",
      icon: GraduationCap,
      badge: "STATUTORY DEGREE EQUIVALENCY",
      summary: "IEI conducts Section A & B examinations twice a year, officially recognized by the Ministry of Human Resource Development (now Ministry of Education), Government of India, as fully equivalent to an engineering degree (B.E./B.Tech).",
      details: [
        "Section A Examination is common to all candidates across disciplines, covering core fundamentals in mathematics, physics, and engineering sciences.",
        "Section B Examination is discipline-specific, examining advanced specialization coursework, project work, and laboratory verification.",
        "Held bi-annually across examination centres in India and overseas.",
        "Opens direct statutory pathways for UPSC Engineering Services, GATE, state public service examinations, and post-graduate university admissions."
      ],
      metrics: ["Bi-Annual Sessions", "15 Disciplines", "MHRD Recognized"]
    },
    {
      id: "postgrad",
      code: "IEI·SVC·02",
      title: "Postgraduate Programs",
      subtitle: "Master's-Level Programs for Corporate Members",
      icon: Layers,
      badge: "ADVANCED HIGHER STUDIES",
      summary: "IEI offers specialized Postgraduate (Master's-level) programs in select engineering disciplines exclusively to corporate members, fostering continuous technical upskilling and specialization.",
      details: [
        "Structured advanced curricula tailored for practicing corporate engineers.",
        "Offered in key engineering verticals requiring specialized technological proficiency.",
        "Provides academic credits and advanced recognition for career promotions and research fellowships.",
        "Curated by academic boards comprising senior IIT/IISc professors and industrial experts."
      ],
      metrics: ["Master's Level", "Select Disciplines", "Corporate Pathway"]
    },
    {
      id: "chartered-engineer",
      code: "IEI·SVC·03",
      title: "Chartered Engineer Certification",
      subtitle: "CEng — Global Consultant Practice & Empanelment",
      icon: Award,
      badge: "GLOBAL CONSULTING LICENSE",
      summary: "Corporate members who obtain a Chartered Engineer's Certificate can practice as self-employed consulting engineers in India and abroad, and gain official recognition for empanelment.",
      details: [
        "Statutory license to practice as an independent consulting engineer nationally and internationally.",
        "Empanelment qualification as Valuer and Loss Assessor with government agencies, public sector undertakings, and major financial institutions.",
        "Required for project validation, structural audits, techno-economic feasibility appraisal, and export clearance certifications.",
        "Conferred under the historic authority of IEI's Royal Charter 1935."
      ],
      metrics: ["Global Recognition", "Valuer Empanelment", "Self-Employed Practice"]
    },
    {
      id: "pe-intpe",
      code: "IEI·SVC·04",
      title: "Professional Engineer (PE) & IntPE Register",
      subtitle: "International Professional Engineers Alliance (IntPE)",
      icon: ShieldCheck,
      badge: "INTERNATIONAL MOBILITY",
      summary: "IEI holds the International Professional Engineers (IntPE) Register for India under the global IntPE Alliance, and awards its own prestigious PE Certification.",
      details: [
        "Enables cross-border engineering practice and substantial equivalency across signatory nations in the IntPE Alliance.",
        "Rigorous peer-reviewed assessment evaluating minimum 7 years of post-qualification experience, ethical competence, and continuous professional development.",
        "Protects public health, safety, and welfare through uncompromising professional standards.",
        "Permanent inscribed recognition in the National PE Registry."
      ],
      metrics: ["IntPE Alliance", "Global Cross-Border Practice", "7+ Yrs Rigor"]
    },
    {
      id: "research-grants",
      code: "IEI·SVC·05",
      title: "Research & Grant-in-Aid",
      subtitle: "SIRO Recognized Funding for UG, PG & PhD Scholars",
      icon: CheckCircle2,
      badge: "GOVT. SIRO APPROVED",
      summary: "As a recognized Scientific and Industrial Research Organisation (SIRO) by DSIR, Govt. of India, IEI provides critical Grant-in-Aid funding to engineering institutions and universities.",
      details: [
        "Disburses annual research grants directly to undergraduate, postgraduate, and doctoral (PhD) candidates across Indian universities.",
        "Covers fabrication expenses for physical hardware prototypes, electronic testbenches, and scientific experimental setups.",
        "Priority funding given to green technology, robotics, smart computing, sustainable infrastructure, and biomedical devices.",
        "Student teams at SIES GST have access to faculty mentorship for submitting Grant-in-Aid proposals."
      ],
      metrics: ["UG / PG / PhD Grants", "Prototype Funding", "DSIR SIRO Scheme"]
    },
    {
      id: "springer-publications",
      code: "IEI·SVC·06",
      title: "Publications & Springer Journals",
      subtitle: "5 Peer-Reviewed International Series Covering 15 Disciplines",
      icon: BookOpen,
      badge: "PEER REVIEWED Q2/SCOPUS",
      summary: "In prestigious co-publication with Springer, IEI publishes five series of peer-reviewed international journals covering the entire spectrum of 15 engineering disciplines.",
      details: [
        "Series A: Civil, Architectural, Environmental & Agricultural Engineering.",
        "Series B: Electrical, Electronics & Telecommunications, Computer Engineering.",
        "Series C: Mechanical, Production, Aerospace & Marine Engineering.",
        "Series D: Metallurgical, Materials & Mining Engineering.",
        "Series E: Chemical & Textile Engineering.",
        "Indexed in major global bibliographic citation databases including Scopus, INSPEC, and Google Scholar."
      ],
      metrics: ["5 Series A-E", "Springer Co-Pub", "Global Scopus Index"]
    },
    {
      id: "esci-hyderabad",
      code: "IEI·SVC·07",
      title: "Knowledge Dissemination & ESCI",
      subtitle: "Engineering Staff College of India (ESCI), Hyderabad",
      icon: Building,
      badge: "CONTINUING EDUCATION ORGAN",
      summary: "IEI runs specialized technical Foras and its flagship organ — the Engineering Staff College of India (ESCI) in Hyderabad — dedicated to continuing education, executive training, and faculty development.",
      details: [
        "Sprawling green campus in Hyderabad conducting technical upskilling for senior executives from defense, power, railways, and telecom.",
        "National Technical Foras: National Design and Research Forum (NDRF), Rural Development Forum (RDF), Water Management Forum (WMF), and Safety and Quality Forum (SQF).",
        "Faculty Development Programs (FDPs) and customized corporate workshops in AI, EV battery thermal management, and power systems.",
        "Direct knowledge dissemination bridging laboratory discoveries with industrial implementation."
      ],
      metrics: ["Hyderabad Campus", "Technical Foras", "Executive Upskilling"]
    }
  ];

  const current = services[selectedService];

  return (
    <section id="what-we-do" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]" aria-label="What IEI Does — Objectives and Professional Services">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            What IEI Does
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          From the historic AMIE degree examinations and Chartered Engineer licensure to Springer journals and SIRO research grants.
        </p>
      </div>

      {/* 7-SERVICE DUAL INTERACTIVE WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 7 Services List */}
        <div className="lg:col-span-5 space-y-2.5">
          {services.map((svc, idx) => {
            const isSelected = selectedService === idx;
            const Icon = svc.icon;

            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  setSelectedService(idx);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 border-zinc-950 text-white shadow-md'
                    : 'bg-white border-black/[0.08] text-zinc-700 hover:text-zinc-950 hover:border-black/20 hover:bg-zinc-50/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/15 text-white' : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    <Icon size={18} />
                  </div>

                  <div>
                    <div className={`font-display font-bold text-sm sm:text-base leading-tight ${
                      isSelected ? 'text-white' : 'text-zinc-950'
                    }`}>
                      {svc.title}
                    </div>
                  </div>
                </div>

                <ArrowRight size={14} className={isSelected ? 'text-white' : 'text-zinc-400'} />
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Service Dossier */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 mb-1">
            {current.title}
          </h3>
          <div className="text-sm text-zinc-500 mb-6 font-medium">
            {current.subtitle}
          </div>

          <p className="text-zinc-800 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {current.summary}
          </p>

          {/* Key Specifications & Regulations */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFAFC] border border-black/[0.06] mb-6 space-y-3">
            <div className="text-xs font-semibold text-zinc-600 mb-2">
              Key Highlights &amp; Framework
            </div>

            {current.details.map((item, dIdx) => (
              <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700">
                <CheckCircle2 size={16} className="text-[#0062FF] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {current.metrics.map((m, mIdx) => (
              <span key={mIdx} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-700 font-medium">
                {m}
              </span>
            ))}
          </div>

          {/* Bottom Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-black/[0.08]">
            <span className="text-xs text-zinc-500">
              Inquiries processed via Chapter Secretariat
            </span>

            <div className="flex items-center gap-3">
              {current.id === 'chartered-engineer' || current.id === 'pe-intpe' ? (
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playClick();
                    if (onOpenVerify) onOpenVerify();
                  }}
                  className="btn-minimal-primary text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShieldCheck size={14} />
                  <span>Verify Inscription</span>
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  if (onOpenMembership) onOpenMembership(current.title);
                }}
                className="px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-[#0062FF] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Request Guidelines</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
