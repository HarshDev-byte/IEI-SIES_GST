import React from 'react';
import { 
  Building2, Award, Globe, 
  BookOpen, ShieldCheck, ExternalLink,
  Layers, CheckCircle2
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function NationalQuickFacts() {
  const chapterStats = [
    { label: "Active Collegiate Engineers", val: "56+", note: "SIES GST Chapter Roster" },
    { label: "Flagship Events & Conclaves", val: "10+", note: "Symposia, Ideathons & Summits" },
    { label: "Accredited SMIE Cardholders", val: "12+", note: "National Professional Grade" },
    { label: "Hardware & Software Labs", val: "15+", note: "Microcontroller & AI Testbenches" }
  ];

  const engineeringDivisions = [
    "Electronics & Telecommunication",
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Aerospace Engineering",
    "Civil Engineering",
    "Production & Industrial",
    "Chemical Engineering",
    "Metallurgical & Materials",
    "Environmental Engineering"
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" aria-label="National Quick Facts & Chapter Statistics">
      
      {/* 01. SIES GST CHAPTER REAL-TIME TELEMETRY CONSOLE */}
      <div className="bg-zinc-950 rounded-3xl p-6 sm:p-9 text-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] mb-14 relative overflow-hidden border border-black/20">
        {/* Subtle Architectural Blueprint Millimeter Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0062FF 1px, transparent 1px),
              linear-gradient(to bottom, #0062FF 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Cobalt Glow */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#0052D6]/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#00D6FF] font-mono text-[11px] font-semibold mb-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>COLLEGIATE TELEMETRY // SIES GST CHAPTER #602</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Collegiate Chapter Performance Benchmarks
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
              Department of Electronics &amp; Computer Science Engineering · Practical hardware testbenches, interdisciplinary research, and national student accreditation.
            </p>
          </div>

          <a 
            href="https://www.ieindia.org" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => audioEngine.playClick()}
            className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-zinc-950 hover:bg-[#0052D6] hover:text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer group"
          >
            <span>Visit ieindia.org</span>
            <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 4 Sculpted Stats Counters */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-7">
          {chapterStats.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                {item.val}
              </span>
              <span className="font-sans text-sm font-bold text-zinc-200 mt-1">
                {item.label}
              </span>
              <span className="font-mono text-[11px] text-zinc-400 mt-0.5">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 02. SECTION HEADER: NATIONAL IEI FACTS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-minimal badge-blue">
              01 // NATIONAL COUNCIL DOSSIER
            </span>
            <span className="badge-minimal badge-gold">
              ROYAL CHARTERED ARCHIVE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-ultra-tight">
            The Institution of Engineers (India)
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-1 max-w-2xl font-normal leading-relaxed">
            Essential facts &amp; statutory credentials of India&apos;s apex engineering organization, established in 1920 and incorporated by Royal Charter in 1935.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Govt. Recognized SIRO (DSIR)</span>
          </span>
        </div>
      </div>

      {/* 03. ARCHITECTURAL BENTO GRID (REPLACING THE BORING REPETITIVE 8 BOXES) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* CARD 1: THE ROYAL CHARTER & CONSTITUTIONAL PROCLAMATION (Span 7) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all relative overflow-hidden group">
          {/* Subtle watermark background seal */}
          <div className="absolute -bottom-10 -right-10 w-60 h-60 opacity-[0.035] pointer-events-none group-hover:scale-105 transition-transform duration-500">
            <img src="/iei-official-logo.png" alt="" className="w-full h-full object-contain" />
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 font-mono text-[10px] font-bold tracking-wider uppercase">
                <Award size={12} className="text-amber-600" />
                <span>CENTENARY ROYAL CHARTER · KING GEORGE V</span>
              </div>
              <span className="font-mono text-xs font-semibold text-zinc-400">ESTD. 1920</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-2">
              Royal Charter of 9 September 1935
            </h3>

            <p className="font-sans text-sm text-zinc-600 leading-relaxed mb-6">
              Granted Royal Inscription by King George V in 1935, incorporating the Institution into a perpetual statutory body corporate with its official Common Seal. Sir Thomas Holland, KCSI, KCIE, FRS served as the first President.
            </p>

            {/* Inscription Quote Block */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.06] text-xs font-sans text-zinc-700 italic leading-relaxed mb-6">
              &ldquo;To promote and advance the science, practice, and business of engineering in all its branches in India, and to maintain standards of professional ethics and competency.&rdquo;
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span className="font-semibold text-zinc-800">Article 372 Body Corporate</span>
            </div>
            <span>Perpetual Common Seal</span>
          </div>
        </div>

        {/* CARD 2: 1M+ GLOBAL NETWORK & FOOTPRINT (Span 5) */}
        <div className="md:col-span-5 bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,82,214,0.15)] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0052D6]/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/10 text-blue-300 border border-white/10">
                GLOBAL FOOTPRINT
              </span>
              <Globe size={16} className="text-blue-400" />
            </div>

            <div className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              1,000,000+
            </div>
            <div className="font-sans text-sm font-bold text-zinc-200 mt-1">
              Engineers Worldwide
            </div>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
              World&apos;s largest multi-disciplinary engineering society with over 200,000 Corporate Members and fellows across India and international diaspora chapters.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 mt-6">
            <div>
              <div className="font-display text-xl sm:text-2xl font-bold text-white">100+</div>
              <div className="font-mono text-[10px] text-zinc-400 uppercase mt-0.5">State &amp; Local Centres</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-bold text-[#00D6FF]">15</div>
              <div className="font-mono text-[10px] text-zinc-400 uppercase mt-0.5">Engineering Divisions</div>
            </div>
          </div>
        </div>

        {/* CARD 3: 15 DISCIPLINES MATRIX (Span 6) */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers size={16} className="text-[#0052D6]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                DISCIPLINE DIVISION ROSTER
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight mb-2">
              15 Statutory Engineering Divisions
            </h3>
            <p className="font-sans text-xs text-zinc-600 mb-4 leading-relaxed">
              Comprehensive professional accreditation spanning foundational core engineering to modern frontier algorithmic architectures:
            </p>

            {/* Division Chips */}
            <div className="flex flex-wrap gap-2">
              {engineeringDivisions.map((div, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-zinc-100/80 hover:bg-[#0052D6]/10 text-zinc-700 hover:text-[#0052D6] font-mono text-[10px] font-medium transition-colors border border-black/[0.04]"
                >
                  {div}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] mt-5 flex items-center justify-between text-xs font-sans text-zinc-500">
            <span>SIES GST operates under Division 09 (ECS)</span>
            <span className="font-mono text-[11px] text-[#0052D6] font-semibold">Tier-1 Collegiate Accreditation</span>
          </div>
        </div>

        {/* CARD 4: RESEARCH & STATUTORY RECOGNITION (Span 6) */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-emerald-600" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                SCIENTIFIC &amp; RESEARCH RECOGNITION
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight mb-2">
              DSIR Recognized SIRO &amp; Publications
            </h3>
            <p className="font-sans text-xs text-zinc-600 mb-4 leading-relaxed">
              Officially recognized as a Scientific and Industrial Research Organization (SIRO) by the Ministry of Science and Technology, Government of India.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-zinc-50 border border-black/[0.05]">
                <div className="font-mono text-[10px] text-emerald-700 font-bold uppercase">DSIR (Govt. of India)</div>
                <div className="font-sans text-xs font-bold text-zinc-900 mt-0.5">Approved SIRO</div>
                <div className="font-sans text-[10px] text-zinc-500 mt-0.5">National R&amp;D Standing</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-50 border border-black/[0.05]">
                <div className="font-mono text-[10px] text-[#0052D6] font-bold uppercase">Springer Nature</div>
                <div className="font-sans text-xs font-bold text-zinc-900 mt-0.5">Series A, B, C &amp; D</div>
                <div className="font-sans text-[10px] text-zinc-500 mt-0.5">Peer-Reviewed Journals</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-sans text-zinc-500">
            <span>Washington Accord Signatory Representation</span>
            <span className="font-mono text-[11px] text-emerald-700 font-semibold">Active Accreditations</span>
          </div>
        </div>

      </div>

      {/* 04. NATIONAL CITATION STRIP */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#FAFAFC] border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-600">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <Building2 size={15} className="text-zinc-400 shrink-0 hidden sm:inline" />
          <span className="font-bold text-zinc-900">National Headquarters:</span>
          <span>8 Gokhale Road, Kolkata - 700020, West Bengal, India</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span>Govt. Dept. of Scientific &amp; Industrial Research</span>
          <span>·</span>
          <a 
            href="https://www.ieindia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0052D6] font-semibold hover:underline"
          >
            ieindia.org
          </a>
        </div>
      </div>

    </section>
  );
}

