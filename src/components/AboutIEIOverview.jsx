import React, { useState } from 'react';
import { 
  Building2, Globe, Award, ShieldCheck, Compass, 
  Target, Calendar, ArrowRight, CheckCircle2,
  Layers, ExternalLink, Cpu, MapPin, 
  Crown, Landmark
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function AboutIEIOverview({ onOpenMembership }) {
  const [activeTab, setActiveTab] = useState('overview');

  const internationalBodies = [
    { 
      name: "WFEO", 
      full: "World Federation of Engineering Organizations", 
      hq: "Paris, France",
      role: "National Member Representing India",
      desc: "Apex international non-governmental organization representing the engineering profession globally under UNESCO auspices."
    },
    { 
      name: "WMC", 
      full: "World Mining Congress", 
      hq: "International Secretariat",
      role: "Indian National Committee Secretarial Seat",
      desc: "United Nations-affiliated global platform steering mineral resources, geo-technology, and sustainable extraction engineering."
    },
    { 
      name: "CEC", 
      full: "Commonwealth Engineers' Council", 
      hq: "London, United Kingdom",
      role: "Founding Member & Commonwealth Executive",
      desc: "Federation fostering professional engineering mobility, accreditation standards, and sustainable development across 54 nations."
    },
    { 
      name: "fib", 
      full: "Fédération Internationale du Béton", 
      hq: "Lausanne, Switzerland",
      role: "International Structural Concrete Federation",
      desc: "Preeminent international scientific federation advancing structural design, materials engineering, and codes of practice."
    },
    { 
      name: "FEISCA", 
      full: "Federation of Engg. Institutions of South & Central Asia", 
      hq: "Regional Apex Secretariat",
      role: "Apex Regional Multi-Lateral Platform",
      desc: "Transnational engineering coalition coordinating regional technical cooperation, infrastructure accords, and research harmonization."
    }
  ];

  const timelineEvents = [
    {
      year: "1920",
      date: "13 September 1920",
      title: "Founding in Kolkata",
      desc: "The Institution of Engineers was officially established in Kolkata under the leadership of Sir Thomas Holland to foster professional engineering excellence and indigenous technical capability in India.",
      tag: "FOUNDATION",
      badge: "HISTORICAL INCEPTION"
    },
    {
      year: "1935",
      date: "9 September 1935",
      title: "Royal Charter Incorporation",
      desc: "Incorporated by Royal Charter granted by King George V, formally establishing IEI as the sovereign statutory authority for the engineering profession in India.",
      tag: "ROYAL CHARTER",
      badge: "SOVEREIGN STATUS"
    },
    {
      year: "1950",
      date: "Post-Independence Constitution",
      title: "Article 372 Body Corporate",
      desc: "Formally recognized as a 'Body Corporate' under Article 372 of the Constitution of India, preserving its statutory charter, autonomous governance, and public-interest mandate across the Republic.",
      tag: "CONSTITUTIONAL STATUS",
      badge: "STATUTORY CONTINUITY"
    },
    {
      year: "Present",
      date: "Centennial Horizon",
      title: "World's Largest Multi-Disciplinary Society",
      desc: "Headquartered at 8 Gokhale Road, Kolkata; governed by a National Council led by a President; commanding 100+ State & Local Centres in India, overseas chapters, and over 1,000,000 members across 15 disciplines.",
      tag: "GLOBAL HORIZON",
      badge: "1M+ ENGINEERS"
    }
  ];

  const missionPillars = [
    {
      num: "01",
      title: "Advancement of Engineering",
      subtitle: "Scientific & Technological Sovereignty",
      desc: "To effectively promote the general advancement of engineering, engineering science and technology, and their practical application across all indigenous sectors in India."
    },
    {
      num: "02",
      title: "Information Dissemination",
      subtitle: "Scholarly Exchange & Conclaves",
      desc: "To facilitate the international dissemination and exchange of information, peer-reviewed research, and technical ideas among members of the profession and academic institutions."
    },
    {
      num: "03",
      title: "Value-Based National Service",
      subtitle: "Public Interest & Sustainable Policy",
      desc: "To extend value-based advisory and engineering services to the nation at every level, fostering technological self-reliance, ethical rigor, and sustainable capacity building."
    }
  ];

  const tabs = [
    { id: 'overview', index: '01', label: 'National Overview' },
    { id: 'vision-mission', index: '02', label: 'Vision & Mission' },
    { id: 'history', index: '03', label: 'Centennial Timeline' },
    { id: 'affiliations', index: '04', label: 'Global Accords & SIRO' },
    { id: 'chapter', index: '05', label: 'SIES GST Chapter' }
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]" aria-label="About The Institution of Engineers (India) and SIES GST Chapter">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-minimal badge-blue">
              02 // CENTENNIAL HERITAGE &amp; CHARTER
            </span>
            <span className="badge-minimal badge-gold">
              EST. 1920 · ROYAL CHARTER 1935
            </span>
            <span className="hidden sm:inline-flex badge-minimal text-zinc-500">
              ARTICLE 372 BODY CORPORATE
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            About IEI &amp; SIES GST
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
            The Institution of Engineers (India) is the world&apos;s largest multi-disciplinary engineering professional body, bridging over a century of statutory heritage with collegiate innovation at SIES GST.
          </p>
          <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <MapPin size={12} className="text-[#0062FF]" />
            <span>APEX HQ: 8 GOKHALE ROAD, KOLKATA · EST. 1920</span>
          </div>
        </div>
      </div>

      {/* ARCHITECTURAL SEGMENTED NAVIGATION */}
      <div className="mb-12">
        <div className="p-1.5 rounded-2xl bg-zinc-100/80 border border-black/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-2xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  setActiveTab(tab.id);
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-zinc-950 font-bold shadow-xs border border-black/[0.08]'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                }`}
              >
                <span className={`text-[10px] font-bold ${isActive ? 'text-[#0062FF]' : 'text-zinc-400'}`}>
                  {tab.index}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: NATIONAL OVERVIEW (ARCHITECTURAL HERO SPECIFICATION) */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-10 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT COLUMN: EDITORIAL NARRATIVE & METRIC PILLARS */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
              <div className="space-y-6">
                
                {/* Authority Proclamation Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0062FF]/[0.06] border border-[#0062FF]/20 text-[#0062FF] font-mono text-xs font-semibold">
                  <ShieldCheck size={14} className="shrink-0" />
                  <span>APEX STATUTORY PROFESSIONAL ENGINEERING AUTHORITY</span>
                </div>

                {/* Monumental Headline */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 leading-tight tracking-tight">
                  A century of engineering sovereignty, connecting over one million professional engineers worldwide.
                </h3>

                {/* Editorial Body */}
                <p className="text-zinc-700 text-base sm:text-lg leading-relaxed font-normal">
                  <strong>The Institution of Engineers (India)</strong> is a statutory, multi-disciplinary professional body for engineers, established on <strong>13 September 1920</strong> in Kolkata and incorporated by <strong>Royal Charter in 1935</strong> by King George V. Following independence, it was preserved as an apex <strong>Body Corporate under Article 372</strong> of the Constitution of India.
                </p>

                {/* 3 High-Impact Spec Tiles */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.06] hover:border-[#0062FF]/30 transition-all">
                    <div className="font-display text-2xl sm:text-3xl font-black text-zinc-950">1920</div>
                    <div className="font-sans font-bold text-xs text-zinc-800 mt-0.5">Founding Year</div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-0.5">Kolkata, WB</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.06] hover:border-[#0062FF]/30 transition-all">
                    <div className="font-display text-2xl sm:text-3xl font-black text-[#0062FF]">15</div>
                    <div className="font-sans font-bold text-xs text-zinc-800 mt-0.5">Divisions</div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-0.5">All Disciplines</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.06] hover:border-[#0062FF]/30 transition-all">
                    <div className="font-display text-2xl sm:text-3xl font-black text-zinc-950">100+</div>
                    <div className="font-sans font-bold text-xs text-zinc-800 mt-0.5">Centres</div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-0.5">India &amp; Overseas</div>
                  </div>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed">
                  IEI holds bilateral agreements with roughly <strong>30+ international engineering bodies</strong>. It proudly represents India in apex global federations including the <strong>World Federation of Engineering Organizations (WFEO)</strong>, the <strong>World Mining Congress (WMC)</strong>, the <strong>Commonwealth Engineers&apos; Council (CEC)</strong>, <strong>Fédération Internationale du Béton (fib)</strong>, and <strong>FEISCA</strong>.
                </p>
              </div>

              {/* Prestigious SIRO DSIR Credential Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/40 border border-blue-200/80 shadow-[0_4px_20px_rgba(0,98,255,0.04)] relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0062FF] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Award size={20} />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-sans text-sm font-bold text-blue-950 tracking-tight">
                        Scientific &amp; Industrial Research Organisation (SIRO)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0052D6] font-mono text-[10px] font-bold">
                        DSIR · GOVT. OF INDIA
                      </span>
                    </div>
                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                      Officially recognized by the <strong>Department of Scientific &amp; Industrial Research (DSIR)</strong>, Ministry of Science &amp; Technology. IEI extends direct <strong>Grant-in-Aid funding</strong> to undergraduate, postgraduate, and doctoral scholars across engineering colleges nationwide.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: ARCHITECTURAL HERITAGE SPECIFICATION MONOLITH */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-between">
              
              {/* Technical Corner Crosshairs (CAD Aesthetic) */}
              <span className="absolute top-3 left-3 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>
              <span className="absolute top-3 right-3 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-3 left-3 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-3 right-3 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>

              {/* Watermark Archival Graphic */}
              <div 
                className="absolute right-0 bottom-0 w-64 h-64 pointer-events-none opacity-[0.03] select-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 100% 100%, #0062FF 0%, transparent 70%)`
                }}
              />

              <div>
                {/* Monolith Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0062FF]" />
                    <span className="font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider">
                      STATUTORY SPECIFICATIONS
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-400 font-medium">
                    FOLIO: IEI·1935·HQ
                  </span>
                </div>

                {/* Structured Archival Specs */}
                <div className="space-y-4">
                  
                  {/* Spec 1: Incorporation */}
                  <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-black/[0.04] hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Crown size={12} className="text-[#C28B38]" />
                      <span>INCORPORATION AUTHORITY</span>
                    </div>
                    <div className="font-sans font-bold text-zinc-950 text-sm mt-1">
                      Royal Charter (9 Sept 1935)
                    </div>
                    <div className="font-mono text-zinc-500 text-xs mt-0.5">
                      Granted by His Imperial Majesty King George V
                    </div>
                  </div>

                  {/* Spec 2: Constitutional Recognition */}
                  <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-black/[0.04] hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Landmark size={12} className="text-[#0062FF]" />
                      <span>CONSTITUTIONAL RECOGNITION</span>
                    </div>
                    <div className="font-sans font-bold text-zinc-950 text-sm mt-1">
                      &quot;Body Corporate&quot; under Article 372
                    </div>
                    <div className="font-mono text-zinc-500 text-xs mt-0.5">
                      Constitution of India (Post-1947 Republic Continuity)
                    </div>
                  </div>

                  {/* Spec 3: Governance */}
                  <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-black/[0.04] hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Building2 size={12} className="text-zinc-600" />
                      <span>APEX GOVERNANCE &amp; SECRETARIAT</span>
                    </div>
                    <div className="font-sans font-bold text-zinc-950 text-sm mt-1">
                      National Council headed by President
                    </div>
                    <div className="font-mono text-zinc-500 text-xs mt-0.5">
                      8 Gokhale Road, Kolkata - 700020, West Bengal
                    </div>
                  </div>

                  {/* Spec 4: Disciplines */}
                  <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-black/[0.04] hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Layers size={12} className="text-emerald-600" />
                      <span>DISCIPLINES ENCOMPASSED</span>
                    </div>
                    <div className="font-sans font-bold text-zinc-950 text-sm mt-1">
                      15 Engineering Divisions
                    </div>
                    <div className="font-mono text-zinc-500 text-xs mt-0.5">
                      Electronics, CompSci, Mech, Civil, Aerospace, Elec, etc.
                    </div>
                  </div>

                </div>
              </div>

              {/* Monolith Footer Action Bar */}
              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Apex Registry Validated</span>
                </div>

                <a 
                  href="https://www.ieindia.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClick()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white font-mono text-xs font-bold transition-all shadow-2xs group"
                >
                  <span>ieindia.org</span>
                  <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: VISION & MISSION */}
      {/* ========================================================================= */}
      {activeTab === 'vision-mission' && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* MONUMENTAL VISION PEDESTAL */}
          <div className="bg-gradient-to-br from-white via-[#F8FAFF] to-[#EFF5FF] rounded-3xl p-8 sm:p-12 border border-[#0062FF]/20 shadow-[0_12px_40px_rgba(0,98,255,0.06)] relative overflow-hidden">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0062FF] font-bold mb-6 uppercase tracking-widest">
              <Compass size={16} />
              <span>OFFICIAL INSTITUTIONAL VISION</span>
            </div>

            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-zinc-950 leading-snug tracking-tight max-w-5xl">
              &ldquo;To be one of the largest and most vibrant professional societies of engineers, technologists, and applied scientists in the world — covering all branches of engineering — committed to continual professional and intellectual development, and contributing significantly to the growth of technological knowledge, skill, and capacity-building, through an innovative approach to sustainable development.&rdquo;
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500 pt-6 border-t border-[#0062FF]/10">
              <span className="font-bold text-zinc-900">Adopted by the National Council</span>
              <span>·</span>
              <span>The Institution of Engineers (India)</span>
              <span>·</span>
              <span className="text-[#0062FF]">Apex Kolkata Secretariat</span>
            </div>
          </div>

          {/* 3 MISSION PILLARS */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 font-bold mb-6 uppercase tracking-widest">
              <Target size={16} className="text-[#0062FF]" />
              <span>OFFICIAL INSTITUTIONAL MISSION PILLARS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {missionPillars.map((p) => (
                <div 
                  key={p.num}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#0062FF]/30 hover:shadow-[0_8px_30px_rgba(0,98,255,0.08)] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-bold text-[#0062FF] px-2.5 py-1 rounded-md bg-[#0062FF]/[0.08]">
                        PILLAR {p.num}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">STATUTORY MANDATE</span>
                    </div>

                    <h4 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 mb-1 group-hover:text-[#0062FF] transition-colors">
                      {p.title}
                    </h4>

                    <div className="font-mono text-xs text-zinc-400 font-semibold mb-3">
                      {p.subtitle}
                    </div>

                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Active National Directive</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: HISTORY & HERITAGE (CENTENNIAL TIMELINE) */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="animate-fadeIn space-y-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#0062FF] font-semibold mb-2">
              <Calendar size={14} />
              <span>CHRONOLOGICAL MILESTONES · 1920 TO PRESENT</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              A Century of Engineering Nation-Building
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-2 leading-relaxed">
              Tracing the historical trajectory from British-era Royal Inscription to India&apos;s constitutional era and contemporary global engineering footprint.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 border-l-2 border-black/[0.08] space-y-10 my-8">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative group">
                {/* Node pin */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-2 border-[#0062FF] group-hover:scale-125 group-hover:bg-[#0062FF] transition-all shadow-xs" />

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#0062FF]/30 transition-all max-w-3xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#0062FF] font-black text-lg sm:text-xl font-display">{evt.year}</span>
                      <span className="text-zinc-300">/</span>
                      <span className="text-zinc-500 font-semibold">{evt.date}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-semibold text-[10px] uppercase tracking-wider">
                      {evt.tag}
                    </span>
                  </div>

                  <h4 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 mb-2">
                    {evt.title}
                  </h4>

                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    {evt.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between font-mono text-xs text-zinc-400">
                    <span>{evt.badge}</span>
                    <span className="text-zinc-300">#0{idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: GLOBAL ACCORDS & SIRO */}
      {/* ========================================================================= */}
      {activeTab === 'affiliations' && (
        <div className="animate-fadeIn space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#0062FF] font-semibold mb-2">
              <Globe size={14} />
              <span>SOVEREIGN MULTI-LATERAL MEMBERSHIPS</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              International Representation &amp; Bilateral Accords
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              IEI holds bilateral agreements with roughly 30+ international engineering societies and proudly represents the Republic of India on the apex global stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalBodies.map((b, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl p-7 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#0062FF]/30 hover:shadow-[0_8px_30px_rgba(0,98,255,0.08)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-black text-[#0062FF] tracking-tight">{b.name}</span>
                    <span className="font-mono text-[10px] text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-100">{b.hq}</span>
                  </div>
                  <div className="font-sans font-bold text-base text-zinc-950 mb-2 leading-snug">{b.full}</div>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">{b.desc}</p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-black/[0.04] font-mono text-xs text-[#0052D6] font-semibold">
                  {b.role}
                </div>
              </div>
            ))}
          </div>

          {/* SIRO & GRANT-IN-AID SCHEME */}
          <div className="bg-zinc-950 rounded-3xl p-8 sm:p-10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden border border-black/20">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                  <CheckCircle2 size={13} />
                  <span>RECOGNIZED SIRO · DEPT. OF SCIENTIFIC &amp; INDUSTRIAL RESEARCH (DSIR)</span>
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  National Grant-in-Aid Research Scheme
                </h4>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
                  As an officially recognized SIRO, IEI funds high-impact, innovative research projects across Indian engineering colleges. Undergraduate, postgraduate, and doctoral candidates can apply for financial grant-in-aid to fabricate hardware prototypes, test algorithms, and publish academic research.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  if (onOpenMembership) onOpenMembership('Research Grant Inquiry');
                }}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#0062FF] text-zinc-950 hover:text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
              >
                Inquire for Research Grants →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SIES GST STUDENT CHAPTER */}
      {/* ========================================================================= */}
      {activeTab === 'chapter' && (
        <div className="animate-fadeIn space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Chapter Profile */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#0062FF] font-semibold">
                <Cpu size={16} />
                <span>SIES GRADUATE SCHOOL OF TECHNOLOGY · NAVI MUMBAI</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight">
                About the SIES GST Student Chapter
              </h3>

              <p className="text-zinc-700 text-base sm:text-lg leading-relaxed font-normal">
                The <strong>IEI SIES GST Student Chapter</strong> operates primarily under the <strong>Department of Electronics &amp; Computer Science Engineering (ECS)</strong>, uniting passionate student engineers, faculty researchers, and corporate mentors.
              </p>

              <div className="space-y-3 font-sans text-sm text-zinc-700">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-black/[0.04]">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0062FF] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div>
                    <strong className="text-zinc-950">Core Objective:</strong> To enhance technical knowledge-sharing, foster active industry–institute interaction, and give students a rigorous platform to build hands-on skills across engineering domains.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-black/[0.04]">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0062FF] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div>
                    <strong className="text-zinc-950">Chapter Activities:</strong> Expert lectures, hands-on microelectronics workshops, mock placement drives, technical talks, industrial site visits, bi-annual e-magazines, hackathons, and national awards.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-black/[0.04]">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0062FF] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div>
                    <strong className="text-zinc-950">National Alignment:</strong> Reusing the national vision and mission of IEI to instill ethics, engineering rigor, and societal responsibility in every student.
                  </div>
                </div>
              </div>

              {/* STATS HIGHLIGHT */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.08] font-mono text-xs text-zinc-600 flex flex-wrap gap-4 items-center">
                <span className="font-bold text-zinc-900">56 Chapter Members</span>
                <span>·</span>
                <span className="text-[#0062FF] font-bold">10 Events Conducted</span>
                <span>·</span>
                <span className="font-bold text-zinc-900">12 SMIE Student Members</span>
                <span>·</span>
                <span className="text-emerald-700 font-bold">15 Workshops Organized</span>
              </div>
            </div>

            {/* Right: Leadership & Mentors Box */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-7 border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] font-mono text-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
                <span className="text-[#0062FF] font-bold">CHAPTER PATRONS &amp; ADVISORS</span>
                <span className="text-zinc-400">SIES GST #602</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.04]">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Chief Institutional Patron</span>
                  <span className="font-sans font-bold text-base text-zinc-950 block mt-0.5">Dr. Atul Kemkar</span>
                  <span className="text-zinc-600 text-xs block font-sans">Principal, SIES Graduate School of Technology</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.04]">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Departmental Patron</span>
                  <span className="font-sans font-bold text-base text-zinc-950 block mt-0.5">Dr. Shubhangi Kharache</span>
                  <span className="text-zinc-600 text-xs block font-sans">Head of Department, Electronics &amp; Computer Science</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.04]">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Faculty Advisor &amp; Coordinator</span>
                  <span className="font-sans font-bold text-base text-zinc-950 block mt-0.5">Prof. Jasmin Hirani</span>
                  <span className="text-zinc-600 text-xs block font-sans">Assistant Professor, ECS Department</span>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] text-center">
                <a
                  href="#/team"
                  onClick={() => audioEngine.playClick()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white font-mono text-xs font-bold transition-all shadow-xs"
                >
                  <span>Explore 7 Student Wings &amp; Executive Council</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

