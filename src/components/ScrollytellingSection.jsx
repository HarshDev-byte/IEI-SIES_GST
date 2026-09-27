import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Cpu, 
  Zap, 
  Cog, 
  FlaskConical, 
  Compass, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Network, 
  CheckCircle2, 
  ChevronRight,
  Search,
  ExternalLink,
  Award
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ScrollytellingSection({ 
  blueprintMode,
  onOpenVerify,
  onOpenMembership,
  onInspectPaper
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeDisciplineIndex, setActiveDisciplineIndex] = useState(0);
  const prevChapterRef = useRef(0);

  // Monitor scroll within sticky container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));
      setScrollProgress(progress);

      // Determine active chapter (0 to 7)
      let chapter = 0;
      if (progress < 0.14) chapter = 0;
      else if (progress < 0.28) chapter = 1;
      else if (progress < 0.42) chapter = 2;
      else if (progress < 0.56) chapter = 3;
      else if (progress < 0.70) chapter = 4;
      else if (progress < 0.82) chapter = 5;
      else if (progress < 0.92) chapter = 6;
      else chapter = 7;

      setActiveChapterIndex(chapter);

      if (chapter !== prevChapterRef.current) {
        audioEngine.playChapterPulse();
        prevChapterRef.current = chapter;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to specific chapter
  const scrollToChapter = (chapterIdx) => {
    if (!containerRef.current) return;
    audioEngine.playClick();
    const containerTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (chapterIdx / 7.5) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // 15 Engineering Disciplines
  const disciplines = [
    { name: 'Civil Engineering', code: 'CV', icon: Building2, desc: 'Mega-bridges, rapid transit, high-altitude rail, smart resilient urban systems.' },
    { name: 'Mechanical Engineering', code: 'MC', icon: Cog, desc: 'Precision thermodynamics, robotics, heavy industrial automation, propulsion.' },
    { name: 'Electrical Engineering', code: 'EL', icon: Zap, desc: 'National ultra-high voltage grids, renewable transmission, HVDC networks.' },
    { name: 'Electronics & Telecom', code: 'ET', icon: Cpu, desc: '5G/6G RF infrastructure, optical carrier communications, satellite transponders.' },
    { name: 'Computer Science', code: 'CP', icon: Network, desc: 'High-performance computing, distributed ledger trust, sovereign AI infrastructure.' },
    { name: 'Chemical Engineering', code: 'CH', icon: FlaskConical, desc: 'Polymer synthesis, green hydrogen separation, refinery decarbonization.' },
    { name: 'Aerospace Engineering', code: 'AS', icon: Compass, desc: 'Launch vehicle dynamics, satellite bus systems, subsonic & hypersonic airframes.' },
    { name: 'Environmental Eng.', code: 'EN', icon: Sparkles, desc: 'Atmospheric carbon capture, closed-loop industrial hydrology, zero-effluent cycles.' }
  ];

  const chapters = [
    { num: '01', title: 'The Legacy', tag: 'ESTD. 1920' },
    { num: '02', title: 'The Community', tag: '927K+ NETWORK' },
    { num: '03', title: 'Disciplines', tag: '15 DIVISIONS' },
    { num: '04', title: 'Excellence', tag: 'CENG & PE TRUST' },
    { num: '05', title: 'Knowledge', tag: 'SPRINGER JOURNALS' },
    { num: '06', title: 'Innovation', tag: 'NEXT CENTURY' },
    { num: '07', title: 'National Impact', tag: 'MEGASTRUCTURES' },
    { num: '08', title: 'The Future', tag: 'LEADERSHIP' }
  ];

  return (
    <div 
      id="story-container"
      ref={containerRef} 
      className="relative w-full h-[650vh]"
    >
      {/* STICKY FULLSCREEN VIEWPORT (100vh pinned) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
        
        {/* TOP STATUS BAR & CHAPTER STEPPER */}
        <div className="relative z-20 flex items-center justify-between max-w-7xl mx-auto w-full pt-14 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00D6FF] font-semibold tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00D6FF] animate-ping inline-block" />
              <span>CHAPTER {chapters[activeChapterIndex].num}</span>
            </span>
            <span className="text-white/20">/</span>
            <span className="font-display font-medium text-xs sm:text-sm text-white/80 tracking-tight">
              {chapters[activeChapterIndex].title}
            </span>
          </div>

          {/* Chapter Quick Jump Bullets */}
          <div className="hidden md:flex items-center gap-2">
            {chapters.map((ch, idx) => (
              <button
                key={ch.num}
                type="button"
                onClick={() => scrollToChapter(idx)}
                className={`group flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono transition-all ${
                  activeChapterIndex === idx 
                    ? 'bg-[#00D6FF]/15 text-[#00D6FF] border border-[#00D6FF]/40' 
                    : 'text-white/40 hover:text-white/80 border border-transparent'
                }`}
                title={`Jump to Chapter ${ch.num}: ${ch.title}`}
              >
                <span>{ch.num}</span>
              </button>
            ))}
          </div>

          {/* Overall Scroll Timeline Meter */}
          <div className="flex items-center gap-3 font-mono text-[11px] text-white/40">
            <span className="hidden sm:inline">TIMELINE</span>
            <div className="w-24 sm:w-36 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#075BFF] via-[#00A8FF] to-[#00D6FF] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="w-8 text-right text-[#00D6FF]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* ====================================================================
            CHAPTER CONTENT PANELS (FADE IN/OUT BASED ON SCROLL PROGRESS)
           ==================================================================== */}
        <div className="relative z-10 my-auto max-w-7xl mx-auto w-full h-full max-h-[72vh] flex items-center">

          {/* -------------------------------------------------------------
              CHAPTER 01: THE LEGACY (1920)
             ------------------------------------------------------------- */}
          {activeChapterIndex === 0 && (
            <div 
              id="story-legacy"
              className="w-full max-w-4xl animate-fadeIn transition-opacity duration-500"
            >
              <div className="badge-cad-gold mb-6">
                ESTABLISHED 1920 · ROYAL CHARTER 1935
              </div>

              <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-ultra-tight leading-none mb-4">
                1920
              </div>

              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#00D6FF] tracking-tight mb-6">
                OVER A CENTURY OF ENGINEERING.
              </h2>

              <p className="text-base sm:text-xl text-white/75 max-w-2xl font-normal leading-relaxed mb-8">
                Founded in 1920 and granted the Royal Charter in 1935, The Institution of Engineers (India) 
                has grown alongside India's historic journey from industrial emergence to global technological leadership.
              </p>

              <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm bg-[#D6A85F]" />
                  <span className="font-mono text-xs text-white/60">Charter of King George V</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm bg-[#00D6FF]" />
                  <span className="font-mono text-xs text-white/60">Parliamentary Recognition</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm bg-[#075BFF]" />
                  <span className="font-mono text-xs text-white/60">106th Annual Council</span>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              CHAPTER 02: THE ENGINEERING COMMUNITY
             ------------------------------------------------------------- */}
          {activeChapterIndex === 1 && (
            <div 
              id="story-community"
              className="w-full max-w-5xl animate-fadeIn transition-opacity duration-500"
            >
              <div className="badge-cad-blue mb-4">
                NATIONAL ENGINEERING NETWORK
              </div>

              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-ultra-tight mb-4">
                Engineering is never built alone.
              </h2>

              <p className="text-base sm:text-lg text-white/70 max-w-2xl mb-8">
                IEI unites engineers, practitioners, scholars, and industry leaders across all 28 states, 
                forming one of the world's most formidable multidisciplinary engineering networks.
              </p>

              {/* Monumental Counter Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
                
                <div className="glass-panel p-5 sm:p-6 rounded border border-white/10 relative overflow-hidden group">
                  <div className="crosshair-corner crosshair-tl" />
                  <div className="crosshair-corner crosshair-br" />
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    1920
                  </div>
                  <div className="font-mono text-xs text-[#00D6FF] uppercase tracking-wider mt-2">
                    Year Established
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Continuous institutional governance for over 104 years.
                  </p>
                </div>

                <div className="glass-panel p-5 sm:p-6 rounded border border-white/10 relative overflow-hidden group">
                  <div className="crosshair-corner crosshair-tl" />
                  <div className="crosshair-corner crosshair-br" />
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#00D6FF] tracking-tight">
                    266,847+
                  </div>
                  <div className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
                    Corporate Members
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Fellows (FIE), Members (MIE), and Chartered Engineers.
                  </p>
                </div>

                <div className="glass-panel p-5 sm:p-6 rounded border border-white/10 relative overflow-hidden group">
                  <div className="crosshair-corner crosshair-tl" />
                  <div className="crosshair-corner crosshair-br" />
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#B8C1CC] tracking-tight">
                    661,047+
                  </div>
                  <div className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
                    Non-Corporate
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Graduate engineers, technicians, and student affiliates.
                  </p>
                </div>

                <div className="glass-panel p-5 sm:p-6 rounded border border-white/10 relative overflow-hidden group">
                  <div className="crosshair-corner crosshair-tl" />
                  <div className="crosshair-corner crosshair-br" />
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#D6A85F] tracking-tight">
                    772
                  </div>
                  <div className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
                    Institutional
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Universities, IITs, NITs, PSU conglomerates & R&D labs.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              CHAPTER 03: DISCIPLINES
             ------------------------------------------------------------- */}
          {activeChapterIndex === 2 && (
            <div 
              id="story-disciplines"
              className="w-full max-w-5xl animate-fadeIn transition-opacity duration-500"
            >
              <div className="badge-cad mb-4">
                15 ENGINEERING DIVISIONS
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
                Different disciplines.
              </h2>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D6FF] to-[#075BFF] mb-6">
                One engineering community.
              </h3>

              {/* Interactive Discipline Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {disciplines.map((d, idx) => {
                  const Icon = d.icon;
                  const isSelected = activeDisciplineIndex === idx;
                  return (
                    <button
                      key={d.code}
                      type="button"
                      onClick={() => {
                        audioEngine.playClick();
                        setActiveDisciplineIndex(idx);
                      }}
                      className={`p-3.5 rounded border text-left transition-all ${
                        isSelected 
                          ? 'bg-[#00D6FF]/10 border-[#00D6FF] shadow-lg shadow-cyan-950/40' 
                          : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                      }`}
                      data-cursor="SELECT"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00D6FF]' : 'text-white/60'}`} />
                        <span className="font-mono text-[10px] text-white/40">{d.code}</span>
                      </div>
                      <div className="font-display font-semibold text-xs sm:text-sm text-white tracking-tight">
                        {d.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Discipline Blueprint Inspection Card */}
              <div className="glass-panel p-5 rounded border border-[#00D6FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="badge-cad-blue text-[10px] mb-2 inline-block">
                    ACTIVE DIVISION SPECS · {disciplines[activeDisciplineIndex].code}
                  </span>
                  <div className="font-display text-lg font-bold text-white">
                    {disciplines[activeDisciplineIndex].name}
                  </div>
                  <p className="text-xs text-white/70 max-w-xl mt-1">
                    {disciplines[activeDisciplineIndex].desc}
                  </p>
                </div>

                <a 
                  href="#platform-services" 
                  className="btn-engineering-secondary text-xs py-2 px-4 whitespace-nowrap"
                  onClick={() => audioEngine.playClick()}
                >
                  <span>Division Guidelines</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              CHAPTER 04: PROFESSIONAL EXCELLENCE
             ------------------------------------------------------------- */}
          {activeChapterIndex === 3 && (
            <div 
              id="story-excellence"
              className="w-full max-w-4xl animate-fadeIn transition-opacity duration-500"
            >
              <div className="badge-cad-blue mb-4">
                CERTIFICATION & RECOGNITION
              </div>

              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
                Engineering demands trust.
              </h2>

              <p className="text-base sm:text-lg text-white/75 max-w-2xl mb-8">
                Professional recognition built on competence, ethics, validated experience, and technical 
                excellence. Recognized across international mobility agreements including the Washington Accord.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                
                <div className="glass-panel p-5 rounded border border-white/10 hover:border-[#00D6FF]/50 transition-all group">
                  <div className="w-8 h-8 rounded bg-[#075BFF]/10 flex items-center justify-center text-[#00D6FF] mb-3 border border-[#00D6FF]/20">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="font-display font-bold text-white text-base">
                    Chartered Engineer
                  </div>
                  <div className="font-mono text-xs text-[#00D6FF] mb-2">CEng (India)</div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Statutory authorization for technical appraisal, project certification, and industrial valuation.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded border border-white/10 hover:border-[#00D6FF]/50 transition-all group">
                  <div className="w-8 h-8 rounded bg-[#075BFF]/10 flex items-center justify-center text-[#00D6FF] mb-3 border border-[#00D6FF]/20">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="font-display font-bold text-white text-base">
                    Professional Engineer
                  </div>
                  <div className="font-mono text-xs text-[#00D6FF] mb-2">PE (India)</div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Benchmarked against apex national engineering standards with peer-reviewed competency assessment.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded border border-white/10 hover:border-[#D6A85F]/50 transition-all group">
                  <div className="w-8 h-8 rounded bg-[#D6A85F]/10 flex items-center justify-center text-[#D6A85F] mb-3 border border-[#D6A85F]/20">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="font-display font-bold text-white text-base">
                    IntPE Certification
                  </div>
                  <div className="font-mono text-xs text-[#D6A85F] mb-2">International PE</div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Reciprocal mobility across signatories of the International Engineering Alliance (IEA).
                  </p>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playClick();
                    onOpenVerify();
                  }}
                  className="btn-engineering-primary text-xs sm:text-sm py-3 px-5 font-semibold"
                  data-cursor="VERIFY"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential Registry</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playClick();
                    onOpenMembership();
                  }}
                  className="btn-engineering-secondary text-xs sm:text-sm py-3 px-5"
                >
                  <span>Certification Requirements</span>
                </button>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              CHAPTER 05: KNOWLEDGE & PUBLICATIONS
             ------------------------------------------------------------- */}
          {activeChapterIndex === 4 && (
            <div 
              id="story-knowledge"
              className="w-full max-w-5xl animate-fadeIn transition-opacity duration-500"
            >
              <div className="badge-cad mb-4">
                IEI — SPRINGER NATURE SCHOLARLY ARCHIVE
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                Knowledge moves engineering forward.
              </h2>

              <p className="text-base sm:text-lg text-white/70 max-w-2xl mb-8">
                Over 5 dedicated peer-reviewed Series co-published with Springer Nature, documenting fundamental 
                breakthroughs, applied technical paradigms, and patents.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                
                <div 
                  className="glass-panel p-5 rounded border border-white/10 hover:border-[#00D6FF]/40 transition-all cursor-pointer group"
                  onClick={() => onInspectPaper('series-a')}
                  data-cursor="INSPECT"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/40 mb-2">
                    <span>SPRINGER SERIES A</span>
                    <span className="text-[#00D6FF]">Q2 SCOPUS</span>
                  </div>
                  <div className="font-display font-bold text-white text-base group-hover:text-[#00D6FF] transition-colors">
                    Civil, Architectural, Environmental & Agricultural
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    Structural modeling, hydraulic resilience, climate-adaptive geotechnical mechanics.
                  </p>
                </div>

                <div 
                  className="glass-panel p-5 rounded border border-white/10 hover:border-[#00D6FF]/40 transition-all cursor-pointer group"
                  onClick={() => onInspectPaper('series-b')}
                  data-cursor="INSPECT"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/40 mb-2">
                    <span>SPRINGER SERIES B</span>
                    <span className="text-[#00D6FF]">Q2 SCOPUS</span>
                  </div>
                  <div className="font-display font-bold text-white text-base group-hover:text-[#00D6FF] transition-colors">
                    Electrical, Electronics, Telecom & Computer Engineering
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    Autonomous control systems, semiconductor physics, grid stability algorithms.
                  </p>
                </div>

                <div 
                  className="glass-panel p-5 rounded border border-white/10 hover:border-[#00D6FF]/40 transition-all cursor-pointer group"
                  onClick={() => onInspectPaper('series-c')}
                  data-cursor="INSPECT"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/40 mb-2">
                    <span>SPRINGER SERIES C</span>
                    <span className="text-[#00D6FF]">Q2 SCOPUS</span>
                  </div>
                  <div className="font-display font-bold text-white text-base group-hover:text-[#00D6FF] transition-colors">
                    Mechanical, Aerospace, Marine & Production
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    Turbomachinery, additive aerospace metallurgy, hypersonic fluid simulations.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-white/50">
                <span>INDEXED IN SCOPUS · WEB OF SCIENCE · INSPEC · EI COMPENDEX</span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              CHAPTER 06: RESEARCH & INNOVATION
             ------------------------------------------------------------- */}
          {activeChapterIndex === 5 && (
            <div 
              id="story-innovation"
              className="w-full max-w-4xl animate-fadeIn transition-opacity duration-500"
            >
              <div className="badge-cad-blue mb-4">
                FRONTIER R&D LABORATORIES
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Engineering the next century.
              </h2>

              <p className="text-base sm:text-lg text-white/75 max-w-2xl mb-8">
                Supporting research, technical breakthroughs, doctoral grants, and patent commercialization 
                across India's high-tech engineering institutions.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="glass-panel p-4 rounded border border-white/10">
                  <div className="font-display font-bold text-white text-lg">₹12.5 Cr+</div>
                  <div className="font-mono text-[11px] text-[#00D6FF] uppercase mt-1">R&D Grants</div>
                  <p className="text-xs text-white/50 mt-1">Disbursed for young faculty & scholars.</p>
                </div>
                <div className="glass-panel p-4 rounded border border-white/10">
                  <div className="font-display font-bold text-white text-lg">340+</div>
                  <div className="font-mono text-[11px] text-[#00D6FF] uppercase mt-1">Funded Projects</div>
                  <p className="text-xs text-white/50 mt-1">Covering EV, hydrogen & aerospace.</p>
                </div>
                <div className="glass-panel p-4 rounded border border-white/10">
                  <div className="font-display font-bold text-white text-lg">15</div>
                  <div className="font-mono text-[11px] text-[#00D6FF] uppercase mt-1">Centres of Excellence</div>
                  <p className="text-xs text-white/50 mt-1">Specialized industrial testbeds.</p>
                </div>
                <div className="glass-panel p-4 rounded border border-white/10">
                  <div className="font-display font-bold text-white text-lg">98%</div>
                  <div className="font-mono text-[11px] text-[#D6A85F] uppercase mt-1">Industrial Output</div>
                  <p className="text-xs text-white/50 mt-1">Direct translational technology.</p>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              CHAPTER 07: NATIONAL IMPACT
             ------------------------------------------------------------- */}
          {activeChapterIndex === 6 && (
            <div 
              id="story-impact"
              className="w-full max-w-4xl animate-fadeIn transition-opacity duration-500"
            >
              <div className="badge-cad-gold mb-4">
                NATION BUILDING & INFRASTRUCTURE
              </div>

              <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-ultra-tight leading-tight mb-4">
                Engineering shapes everything.
              </h2>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#00D6FF] mb-6">
                Build what comes next.
              </h3>

              <p className="text-base sm:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed">
                From the Chenab Arch Bridge and Vande Bharat rail corridors to lunar exploration arrays and 
                smart clean-energy supergrids — Indian engineers lead the vanguard of modern civilization.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-cad">CHENAB RAIL ARCH · 359M HEIGHT</span>
                <span className="badge-cad">ATAL TUNNEL · 9.02 KM</span>
                <span className="badge-cad">ONE NATION ONE GRID · 400 GW</span>
                <span className="badge-cad">CHANDRAYAAN & GAGANYAAN</span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              CHAPTER 08: THE FUTURE & BRAND CONVERGENCE
             ------------------------------------------------------------- */}
          {activeChapterIndex === 7 && (
            <div 
              id="story-future"
              className="w-full max-w-3xl mx-auto text-center animate-fadeIn transition-opacity duration-500 flex flex-col items-center"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 mb-6 relative p-2 rounded-full bg-white/[0.04] border border-white/15 shadow-[0_0_50px_rgba(0,168,255,0.4)]">
                <img 
                  src="/iei-official-logo.png" 
                  alt="Official Emblem of The Institution of Engineers (India)" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(0,168,255,0.6)] animate-pulse"
                />
              </div>

              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-ultra-tight mb-3">
                Where Engineers Belong.
              </h2>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#00D6FF] mb-6">
                And Engineering Leads.
              </h3>

              <p className="text-base sm:text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
                Join an elite ecosystem shaping the future of global technology, rigorous standards, 
                and national infrastructure.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playClick();
                    onOpenMembership();
                  }}
                  className="btn-engineering-primary text-sm sm:text-base py-3.5 px-8 font-semibold"
                  data-cursor="JOIN"
                >
                  <span>Become a Member</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href="#platform-services"
                  onClick={() => audioEngine.playClick()}
                  className="btn-engineering-secondary text-sm sm:text-base py-3.5 px-8"
                  data-cursor="EXPLORE"
                >
                  <span>Explore Core Services</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM METADATA & TELEMETRY */}
        <div className="relative z-20 flex items-center justify-between max-w-7xl mx-auto w-full pt-4 border-t border-white/[0.08] font-mono text-xs text-white/40">
          <div className="flex items-center gap-3">
            <span>CAD REF: ISO/TC-10</span>
            <span className="text-white/20">|</span>
            <span className="hidden sm:inline">STATE: DYNAMIC 60FPS</span>
          </div>
          <div className="flex items-center gap-2 text-[#00D6FF]">
            <span>STORY PROGRESS:</span>
            <span>{activeChapterIndex + 1} / 8</span>
          </div>
        </div>

      </div>
    </div>
  );
}
