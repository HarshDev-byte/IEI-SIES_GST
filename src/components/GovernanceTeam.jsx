import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { 
  Cpu, Globe, Palette, Megaphone, BookOpen, 
  ChevronRight, ChevronLeft, ArrowRight
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { 
  facultyLeadership, 
  seniorCouncil, 
  juniorCouncil, 
  coordinatorsData, 
  activeCoordinators,
  membersData,
  getInitials 
} from '../data/membersData';

export default function GovernanceTeam() {
  // Category selector: 'senior' | 'junior' | 'coordinators'
  const [activeCategory, setActiveCategory] = useState('senior');
  const [activeIndex, setActiveIndex] = useState(0);

  // Direct navigation to individual member profile page
  const handleOpenProfile = (member) => {
    if (!member) return;
    audioEngine.playClick();
    const identifier = member.id || member.prn || encodeURIComponent(member.name);
    window.location.hash = `#/member/${identifier}`;
  };

  // Carousel layout and interaction states
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Carousel container ref for measuring width & event listeners
  const carouselContainerRef = useRef(null);
  const carouselSectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const pauseTimerRef = useRef(null);

  // Resume helper after user interaction
  const triggerUserPause = useCallback((duration = 4000) => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, duration);
  }, []);

  // IntersectionObserver: detect when the showcase carousel is reached in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    const target = carouselSectionRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  // State for Domain Universe active wing
  const [selectedWingIndex, setSelectedWingIndex] = useState(0);

  // Categories definition
  const categories = useMemo(() => [
    { id: 'senior', label: 'SENIOR CORE', data: seniorCouncil },
    { id: 'junior', label: 'JUNIOR CORE', data: juniorCouncil },
    { id: 'coordinators', label: 'COORDINATORS', data: activeCoordinators }
  ], []);

  const currentCategoryObj = useMemo(() => {
    return categories.find(c => c.id === activeCategory) || categories[0];
  }, [categories, activeCategory]);

  const currentMembers = currentCategoryObj.data;
  const activeMember = currentMembers[activeIndex] || currentMembers[0];

  // Measure container width for responsive carousel math
  useEffect(() => {
    const updateWidth = () => {
      if (carouselContainerRef.current) {
        setContainerWidth(carouselContainerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Category change handler
  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setActiveIndex(0);
    setDragOffset(0);
    audioEngine.playClick();
    triggerUserPause(2500);
  };

  // Previous & Next navigation handlers
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : currentMembers.length - 1));
    audioEngine.playClick();
    triggerUserPause(4000);
  }, [currentMembers.length, triggerUserPause]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < currentMembers.length - 1 ? prev + 1 : 0));
    audioEngine.playClick();
    triggerUserPause(4000);
  }, [currentMembers.length, triggerUserPause]);

  // Auto-rotating carousel when reached in viewport
  useEffect(() => {
    if (!isInView || isPaused || isDragging) return;

    // Gentle initial rotation after 1.6s so user immediately sees rotation upon arrival,
    // followed by continuous smooth 3.2s cadence
    let intervalTimer = null;
    const initialTimer = setTimeout(() => {
      setActiveIndex((prev) => (prev < currentMembers.length - 1 ? prev + 1 : 0));
      intervalTimer = setInterval(() => {
        setActiveIndex((prev) => (prev < currentMembers.length - 1 ? prev + 1 : 0));
      }, 3200);
    }, 1600);

    return () => {
      clearTimeout(initialTimer);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [isInView, isPaused, isDragging, currentMembers.length]);

  // Keyboard navigation when user presses ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't hijack if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX;
    // Restrain drag movement
    setDragOffset(diff * 0.7);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 40) {
      handlePrev();
    } else if (dragOffset < -40) {
      handleNext();
    }
    setDragOffset(0);
    triggerUserPause(3000);
  };

  // Mouse Drag handlers for desktop
  const handleMouseDown = (e) => {
    setIsPaused(true);
    setDragStartX(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff * 0.6);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 45) {
      handlePrev();
    } else if (dragOffset < -45) {
      handleNext();
    }
    setDragOffset(0);
    triggerUserPause(3000);
  };

  // 7 Domain Wings for Domain Universe
  const domainWings = [
    {
      id: "tech",
      name: "Technical",
      code: "TECH",
      fullName: "Technical Wing",
      fullCode: "IEI-ECS-TECH",
      icon: Cpu,
      subtext: "Microcontroller testbenches, algorithm sprints, embedded IoT development, and collegiate hackathons.",
      nodeX: 420,
      nodeY: 70,
      labelX: 420,
      labelY: 105,
      scopeList: [
        "Hands-on technical workshops & hardware-software sprints",
        "RTOS labs, robotics development & embedded testbenches",
        "Collegiate coding hackathons & project competitions",
        "Mentorship for open-source and national technical symposiums"
      ],
      mentors: [
        { name: "Harsh Mhatre", role: "Technical Advisor", branch: "ECS", id: "123A7019", prn: "123A7019", council: "Senior Council" },
        { name: "Sahil Chavan", role: "Technical Advisor", branch: "ECS", id: "123A7011", prn: "123A7011", council: "Senior Council" },
        { name: "Soham Chafale", role: "Technical Advisor", branch: "ECS", id: "123A7009", prn: "123A7009", council: "Senior Council" },
        { name: "Aditya Kinikar", role: "Technical Advisor", branch: "ECS", id: "123A7027", prn: "123A7027", council: "Senior Council" }
      ],
      heads: [
        { name: "Saran Rajasekhar", role: "Technical Head", branch: "ECS", id: "124A7052", prn: "124A7052", council: "Junior Council" },
        { name: "Manas Suryawanshi", role: "Technical Head", branch: "ECS", id: "124A7061", prn: "124A7061", council: "Junior Council" },
        { name: "Hariom Mohare", role: "Technical Head", branch: "ECS", id: "124A7036", prn: "124A7036", council: "Junior Council" },
        { name: "Kaustubh Patil", role: "Technical Head", branch: "ECS", id: "124A7045", prn: "124A7045", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.technical || []
    },
    {
      id: "outreach",
      name: "Industry Outreach & Admin",
      code: "OUTREACH",
      fullName: "Industry Outreach & Admin Wing",
      fullCode: "IEI-ECS-ADMIN",
      icon: Globe,
      subtext: "Corporate liaison, industry tours, guest lecture protocols, and institutional partnership logistics.",
      nodeX: 200,
      nodeY: 410,
      labelX: 200,
      labelY: 445,
      scopeList: [
        "Industry expert masterclasses & technical seminars",
        "Industrial visits & laboratory field study expeditions",
        "Corporate sponsorship relations & MoU agreements",
        "Institutional administrative records & statutory liaison"
      ],
      mentors: [
        { name: "Tejraj Gujar", role: "Chairperson", branch: "ECS", id: "123A7018", prn: "123A7018", council: "Senior Council" },
        { name: "Sarang Patil", role: "Vice Chairperson", branch: "AIDS", id: "123A8043", prn: "123A8043", council: "Senior Council" }
      ],
      heads: [
        { name: "Advaith Nair", role: "Outreach & Admin Head", branch: "ECS", id: "124A7041", prn: "124A7041", council: "Junior Council" },
        { name: "Harshit Lahari", role: "Outreach & Admin Head", branch: "ECS", id: "124A7026", prn: "124A7026", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.outreach || []
    },
    {
      id: "publicity",
      name: "Publicity",
      code: "PUB",
      fullName: "Publicity & Outreach Wing",
      fullCode: "IEI-ECS-PUBL",
      icon: Megaphone,
      subtext: "Collegiate PR, campus outreach, student orientation campaigns, and cross-departmental engagement.",
      nodeX: 130,
      nodeY: 280,
      labelX: 130,
      labelY: 315,
      scopeList: [
        "Campus-wide event announcements & auditorium promotions",
        "Departmental orientation drives for freshmen & sophomores",
        "Inter-college technical festival representations",
        "Public relations with external engineering student bodies"
      ],
      mentors: [
        { name: "A S Lakshanya", role: "Event & Community Manager", branch: "AIDS", id: "123A8001", prn: "123A8001", council: "Senior Council" },
        { name: "Anushka Pawar", role: "Event & Community Manager", branch: "ECS", id: "123A7002", prn: "123A7002", council: "Senior Council" }
      ],
      heads: [
        { name: "Indrayani Patil", role: "Joint Secretary", branch: "CE", id: "124A1118", prn: "124A1118", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.outreach || []
    },
    {
      id: "creative",
      name: "Creative",
      code: "CRTV",
      fullName: "Creative Wing",
      fullCode: "IEI-ECS-CRTV",
      icon: Palette,
      subtext: "Thematic ideation, event stagecraft, interactive installations, and experiential technical aesthetics.",
      nodeX: 630,
      nodeY: 410,
      labelX: 630,
      labelY: 445,
      scopeList: [
        "Thematic installations for annual technical symposia",
        "Creative event stagecraft & interactive lighting setups",
        "Experiential visual concepts for hackathons & expos",
        "Branding artboards for chapter print and digital assets"
      ],
      mentors: [
        { name: "Ananya Siddayyanavar", role: "Creative Mentor", branch: "ECS", id: "123A7001", prn: "123A7001", council: "Senior Council" }
      ],
      heads: [
        { name: "Maadeshselvan Chidambarakuthala", role: "Creative Head", branch: "ECS", id: "124A7028", prn: "124A7028", council: "Junior Council" },
        { name: "Sana Tankar", role: "Creative Head", branch: "EXTC", id: "124A2059", prn: "124A2059", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.creative || []
    },
    {
      id: "design",
      name: "Design",
      code: "DSGN",
      fullName: "Design Wing",
      fullCode: "IEI-ECS-DSGN",
      icon: Palette,
      subtext: "Brand design identity, event posters, web interfaces, UI/UX systems, and architectural editorial graphics.",
      nodeX: 600,
      nodeY: 190,
      labelX: 600,
      labelY: 225,
      scopeList: [
        "Vector typography, event posters & digital banners",
        "UI/UX wireframing for chapter portals & mobile apps",
        "Technical visual infographics & architecture diagrams",
        "Brand style guide preservation across all chapter publications"
      ],
      mentors: [
        { name: "Shravani Khedkar", role: "Design Mentor", branch: "ECS", id: "123A7053", prn: "123A7053", council: "Senior Council" }
      ],
      heads: [
        { name: "Gauri Shinde", role: "Design Head", branch: "IT", id: "124A3052", prn: "124A3052", council: "Junior Council" },
        { name: "Nimish Roge", role: "Design & Media Head", branch: "ECS", id: "124A7051", prn: "124A7051", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.design || []
    },
    {
      id: "media",
      name: "Media",
      code: "MED",
      fullName: "Media Wing",
      fullCode: "IEI-ECS-MDIA",
      icon: Megaphone,
      subtext: "Cinematic event recording, high-resolution photography, live broadcast production, and media archival.",
      nodeX: 250,
      nodeY: 190,
      labelX: 250,
      labelY: 225,
      scopeList: [
        "Event cinematography, recap videos & after-movies",
        "Professional photography & high-resolution photo archives",
        "Live audio-visual streaming & auditorium media setups",
        "Digital media campaigns & social video coverage"
      ],
      mentors: [
        { name: "Ayush Tandel", role: "Media Mentor", branch: "ECS", id: "2247068", prn: "2247068", council: "Senior Council" },
        { name: "Kaushik Yadav", role: "Media Mentor", branch: null, id: "122A7021", prn: "122A7021", council: "Senior Council" }
      ],
      heads: [
        { name: "Nimish Roge", role: "Design & Media Head", branch: "ECS", id: "124A7051", prn: "124A7051", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.media || []
    },
    {
      id: "editorial",
      name: "Editorial",
      code: "EDIT",
      fullName: "Editorial Wing",
      fullCode: "IEI-ECS-EDIT",
      icon: BookOpen,
      subtext: "Technical documentation, annual publications, chapter digest, research chronicles, and event proceedings.",
      nodeX: 420,
      nodeY: 410,
      labelX: 420,
      labelY: 445,
      scopeList: [
        "Annual chapter magazine & technical research digests",
        "Formal proceedings of seminars, symposia & hackathons",
        "Newsletter editorial curation & departmental archives",
        "Documentation standards for student engineering papers"
      ],
      mentors: [
        { name: "Shardul Gade", role: "Secretary", branch: "ECS", id: "123A7016", prn: "123A7016", council: "Senior Council" }
      ],
      heads: [
        { name: "Indrayani Patil", role: "Joint Secretary", branch: "CE", id: "124A1118", prn: "124A1118", council: "Junior Council" },
        { name: "Prathamesh Bhagwat", role: "Joint Secretary", branch: "ECS", id: "124A7003", prn: "124A7003", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.editorial || []
    }
  ];

  const currentWing = domainWings[selectedWingIndex] || domainWings[0];

  // Carousel card sizing calculations
  const isMobile = containerWidth < 640;
  const cardWidth = isMobile ? Math.min(Math.round(containerWidth * 0.72), 260) : 300;
  const gap = isMobile ? 14 : 20;
  const step = cardWidth + gap;

  // Track position centered on the active card
  const trackTranslateX = (containerWidth / 2) - (activeIndex * step + cardWidth / 2) + dragOffset;

  return (
    <div id="team" className="relative min-h-screen text-zinc-900 bg-white">
      
      {/* ========================================================================= */}
      {/* 1. THE PEOPLE • UNIFIED HERO & CATEGORY NAVIGATION */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-950 tracking-ultra-tight uppercase leading-none mb-2">
            THE PEOPLE
          </h1>
          <p className="font-display text-xl sm:text-2xl text-zinc-600 font-bold mb-4 tracking-tight">
            BEHIND IEI SIES GST
          </p>

          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            The engineering minds, student leadership council, and specialized domain wings driving academic innovation, technical research, and institutional excellence.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY SELECTOR (SIMPLE TEXT NAVIGATION — ACTIVE BLUE + THIN UNDERLINE) */}
        {/* ========================================================================= */}
        <div className="mt-8 pt-4 border-t border-black/[0.08] flex items-center justify-start gap-8 sm:gap-12 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`relative pb-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#0062FF] shrink-0 ${
                  isActive 
                    ? 'text-[#0062FF]' 
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
                aria-selected={isActive}
                role="tab"
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 font-mono text-[10px] text-zinc-400 font-normal">
                  ({cat.data.length})
                </span>
                
                {/* Active Category Underline */}
                {isActive && (
                  <span 
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-[#0062FF] rounded-full" 
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. UNIFIED MEMBER SHOWCASE CAROUSEL (RESTRAINED APPLE DOCK / INSET DEPTH) */}
      {/* ========================================================================= */}
      <section 
        ref={carouselSectionRef}
        className="relative py-4 overflow-hidden select-none bg-gradient-to-b from-white via-[#FAFAFC]/60 to-white border-b border-black/[0.06]"
        aria-label="Unified Member Showcase"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div 
          ref={carouselContainerRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden py-2"
        >
          {/* Sliding Carousel Track */}
          <div 
            className="flex items-center"
            style={{
              transform: `translate3d(${trackTranslateX}px, 0, 0)`,
              transition: isDragging ? 'none' : 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }}
          >
            {currentMembers.map((member, idx) => {
              const diff = idx - activeIndex;
              const absDiff = Math.abs(diff);
              const isActive = diff === 0;

              // Scale & Opacity: Active is centered & dominant; neighbors are partially visible and scaled down
              let scale = 1.0;
              let opacity = 1.0;
              let zIndex = 30;

              if (!isActive) {
                scale = Math.max(0.76, 1 - absDiff * 0.12);
                opacity = Math.max(0.2, 0.65 - (absDiff - 1) * 0.28);
                zIndex = Math.max(1, 20 - absDiff);
              }

              return (
                <div
                  key={member.id || `${member.name}-${idx}`}
                  onClick={() => {
                    if (!isDragging && Math.abs(dragOffset) < 5) {
                      if (isActive) {
                        handleOpenProfile(member);
                      } else {
                        setActiveIndex(idx);
                        audioEngine.playClick();
                      }
                    }
                  }}
                  onMouseEnter={() => {
                    if (isActive) setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    if (isActive) setIsPaused(false);
                  }}
                  style={{
                    width: `${cardWidth}px`,
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    marginRight: `${gap}px`,
                    transition: isDragging 
                      ? 'none' 
                      : 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1), opacity 520ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transformOrigin: 'center center',
                    willChange: 'transform, opacity'
                  }}
                  className={`shrink-0 rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-white border border-black/[0.12] shadow-[0_20px_45px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.03)]' 
                      : 'bg-zinc-50 border border-black/[0.06] hover:border-black/20 hover:bg-white'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Portrait Frame Area */}
                  <div className={`w-full rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden transition-all ${
                    isMobile ? 'h-[200px]' : 'h-[240px]'
                  } ${
                    isActive
                      ? 'bg-gradient-to-b from-[#F2F4F8] via-[#E8EDF4] to-[#DFE5EE] border border-black/[0.04]'
                      : 'bg-gradient-to-b from-zinc-100 to-zinc-200/70 border border-black/[0.03]'
                  }`}>
                    {/* Portrait Content: Official Photo or Neutral Monogram Avatar Frame */}
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={member.name} 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center select-none text-center">
                        <div className={`rounded-full flex items-center justify-center font-display font-black transition-all ${
                          isMobile ? 'w-18 h-18 text-2xl' : 'w-20 h-20 text-3xl'
                        } ${
                          isActive 
                            ? 'bg-white text-zinc-950 border border-black/10 shadow-sm scale-105' 
                            : 'bg-white/80 text-zinc-700 border border-black/5'
                        }`}>
                          {getInitials(member.name)}
                        </div>
                        
                        <div className={`mt-3 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                          isActive 
                            ? 'bg-white text-[#0062FF] border-black/10 font-bold' 
                            : 'bg-black/[0.04] text-zinc-600 border-transparent font-medium'
                        }`}>
                          {member.domain || member.council}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-2.5 mt-1 border-t border-black/[0.04]">
                    <div className="text-[10px] font-semibold text-zinc-500 truncate uppercase tracking-wider">
                      {member.position}
                    </div>
                    <div className="font-display font-bold text-sm sm:text-base text-zinc-950 truncate">
                      {member.name}
                    </div>
                    {member.branch && (
                      <div className="text-[10px] text-zinc-400 font-mono">
                        Branch: {member.branch}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* ACTIVE MEMBER INFORMATION (DOMINANT FOCUSED DETAILS BELOW ACTIVE PORTRAIT) */}
          {/* ========================================================================= */}
          <div className="mt-6 text-center max-w-xl mx-auto px-4 select-none">
            {/* Group / Council */}
            <div className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#0062FF] uppercase mb-1">
              {activeMember.council} {activeMember.domain ? `· ${activeMember.domain}` : ''}
            </div>

            {/* Name */}
            <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 tracking-tight leading-tight mb-1">
              {activeMember.name}
            </h2>

            {/* Position */}
            <div className="font-display font-bold text-sm sm:text-lg text-zinc-700 mb-0.5">
              {activeMember.position}
            </div>

            {/* Branch (Rendered ONLY if specified. For Kaushik Yadav branch is null, so omitted) */}
            {activeMember.branch && (
              <div className="text-xs sm:text-sm text-zinc-500 font-medium font-mono">
                Department of {activeMember.branch}
              </div>
            )}

            {/* Direct Action Button: View Profile */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenProfile(activeMember)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="px-5 py-2 rounded-full bg-zinc-950 hover:bg-[#0062FF] text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
                aria-label={`View profile of ${activeMember.name}`}
              >
                <span>View Profile</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Carousel Navigation Controls & Counter */}
            <div className="mt-5 flex items-center justify-center gap-4 text-xs font-mono text-zinc-600">
              <button
                type="button"
                onClick={handlePrev}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label="Previous member"
                className="w-9 h-9 rounded-full border border-black/[0.1] bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-900 transition-colors shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0062FF]"
              >
                <ChevronLeft size={15} />
              </button>

              <span className="px-3 py-1 font-semibold text-zinc-900 bg-zinc-100 rounded-full text-[11px]">
                {String(activeIndex + 1).padStart(2, '0')} / {String(currentMembers.length).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={handleNext}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label="Next member"
                className="w-9 h-9 rounded-full border border-black/[0.1] bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-900 transition-colors shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0062FF]"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DOMAIN EXPANSION / DOMAIN UNIVERSE SECTION (DIRECT TRANSITION) */}
      {/* ========================================================================= */}
      <section id="domains" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/[0.06]">
        
        <div className="max-w-3xl mb-12">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-3">
            Domain Universe
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
            Explore the chapter's multidisciplinary departments. Select a domain node to inspect its charter, volunteer responsibilities, and four-tier hierarchy.
          </p>
        </div>

        {/* 2-Column: Left Index + Right Network Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Wing Selector Rail (DOMAIN INDEX 07 WINGS) */}
          <div className="lg:col-span-4 bg-white p-2 rounded-2xl border border-black/[0.06] shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 px-3 py-2 border-b border-black/[0.06] mb-1">
              <span>Domain Index</span>
              <span className="text-zinc-500">7 Wings</span>
            </div>

            {domainWings.map((w, idx) => {
              const isSelected = selectedWingIndex === idx;

              return (
                <button
                  key={w.id}
                  onClick={() => {
                    setSelectedWingIndex(idx);
                    audioEngine.playClick();
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    isSelected 
                      ? 'border-[1.5px] border-[#0062FF] bg-white text-zinc-950 shadow-xs' 
                      : 'border border-transparent bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      0{idx + 1}
                    </span>
                    <span className={`font-display text-sm font-bold ${isSelected ? 'text-zinc-950' : 'text-zinc-700'}`}>
                      {w.name}
                    </span>
                  </div>
                  <span className={`font-mono text-[10px] font-semibold ${isSelected ? 'text-[#0062FF]' : 'text-zinc-400'}`}>
                    {w.code}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Canvas: Interactive Node Graph Representation */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-black/[0.08] p-4 sm:p-6 shadow-xs relative overflow-hidden min-h-[460px] flex items-center justify-center">
            
            <svg 
              viewBox="0 0 700 480" 
              className="w-full h-auto select-none"
              style={{ maxWidth: '700px' }}
            >
              {/* Center Hub Position */}
              <defs>
                <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0062FF" />
                  <stop offset="100%" stopColor="#0040A8" />
                </linearGradient>
              </defs>

              {/* Background Concentric Radar Rings */}
              <circle cx="420" cy="270" r="80" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="420" cy="270" r="150" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
              <circle cx="420" cy="270" r="220" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="6 6" />

              {/* Connecting Vector Lines from Center Hub (420, 270) to each Domain Node */}
              {domainWings.map((w) => {
                const isSelected = w.id === currentWing.id;
                return (
                  <g key={`line-${w.id}`}>
                    <line
                      x1="420"
                      y1="270"
                      x2={w.nodeX}
                      y2={w.nodeY}
                      stroke={isSelected ? '#0062FF' : 'rgba(0,0,0,0.12)'}
                      strokeWidth={isSelected ? '2' : '1'}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                      className="transition-all duration-300"
                    />
                    {isSelected && (
                      <circle
                        cx={(420 + w.nodeX) / 2}
                        cy={(270 + w.nodeY) / 2}
                        r="3"
                        fill="#0062FF"
                      />
                    )}
                  </g>
                );
              })}

              {/* Central Apex Node: IEI SIES GST */}
              <g 
                className="cursor-pointer"
                onClick={() => {
                  setSelectedWingIndex(0);
                  audioEngine.playClick();
                }}
              >
                <circle cx="420" cy="270" r="38" fill="url(#coreGlow)" />
                <circle cx="420" cy="270" r="44" fill="none" stroke="#0062FF" strokeWidth="1.5" strokeOpacity="0.4" />
                <text x="420" y="265" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="Rajdhani, sans-serif">
                  IEI SIES GST
                </text>
                <text x="420" y="278" textAnchor="middle" fill="#BFDBFE" fontSize="8" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                  CHAPTER CORE
                </text>
              </g>

              {/* 7 Peripheral Domain Nodes matching Image 1 layout */}
              {domainWings.map((w, idx) => {
                const isSelected = w.id === currentWing.id;

                return (
                  <g 
                    key={`node-${w.id}`}
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedWingIndex(idx);
                      audioEngine.playClick();
                    }}
                  >
                    {/* Outer halo when active */}
                    {isSelected && (
                      <circle 
                        cx={w.nodeX} 
                        cy={w.nodeY} 
                        r="26" 
                        fill="none" 
                        stroke="#0062FF" 
                        strokeWidth="1.5" 
                        strokeDasharray="2 2"
                        className="animate-spin-slow origin-center"
                        style={{ transformOrigin: `${w.nodeX}px ${w.nodeY}px` }}
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      cx={w.nodeX}
                      cy={w.nodeY}
                      r="18"
                      fill={isSelected ? '#0062FF' : '#FFFFFF'}
                      stroke={isSelected ? '#0062FF' : 'rgba(0,0,0,0.18)'}
                      strokeWidth="1.5"
                      className="transition-all duration-200 group-hover:stroke-[#0062FF]"
                    />

                    {/* Node Code Inside Circle */}
                    <text
                      x={w.nodeX}
                      y={w.nodeY + 3.5}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#18181B'}
                      fontSize="8"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {w.code}
                    </text>

                    {/* Node Label Below */}
                    <text
                      x={w.labelX}
                      y={w.labelY}
                      textAnchor="middle"
                      fill={isSelected ? '#0062FF' : '#52525B'}
                      fontSize="10"
                      fontWeight={isSelected ? '700' : '600'}
                      fontFamily="Rajdhani, sans-serif"
                    >
                      {w.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Floating Legend Pill */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-500 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-black/[0.06]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0062FF]" />
                Selected: {currentWing.fullName}
              </span>
              <span>Node: {currentWing.fullCode}</span>
            </div>

          </div>

        </div>

        {/* Selected Wing Detail Panel: 4-Tier Hierarchy View */}
        <div className="bg-[#FAFBFD] rounded-3xl border border-black/[0.08] p-6 sm:p-10 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-black/[0.08] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-[#0062FF]">
                  {currentWing.fullCode}
                </span>
                <span className="text-zinc-300">•</span>
                <span className="font-mono text-xs text-zinc-500">
                  Four-Tier Execution Model
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black text-zinc-950">
                {currentWing.fullName}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
              {currentWing.subtext}
            </p>
          </div>

          {/* 4-Tier Hierarchy Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tier 1: Senior Advisors */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-black/[0.06]">
                <div className="font-mono text-xs font-bold text-zinc-950 uppercase">
                  1. Senior Advisors ({currentWing.mentors.length})
                </div>
                <div className="font-mono text-[10px] text-zinc-500">
                  Strategic governance & oversight
                </div>
              </div>

              <div className="space-y-2.5">
                {currentWing.mentors.map((m) => (
                  <div
                    key={m.id || m.name}
                    onClick={() => handleOpenProfile(m)}
                    className="p-3.5 rounded-xl border border-black/[0.08] hover:border-black/20 hover:bg-zinc-50 transition-all cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  >
                    <div className="font-display font-bold text-sm text-zinc-950 group-hover:text-[#0062FF] transition-colors flex items-center justify-between">
                      <span>{m.name}</span>
                      <ArrowRight size={13} className="text-[#0062FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="font-mono text-[11px] text-[#0062FF] font-medium">
                      {m.role}
                    </div>
                    {m.branch && (
                      <div className="font-mono text-[10px] text-zinc-500 mt-0.5">
                        Branch: {m.branch}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 2: Junior Council Wing Heads */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-black/[0.06]">
                <div className="font-mono text-xs font-bold text-zinc-950 uppercase">
                  2. Wing Heads ({currentWing.heads.length})
                </div>
                <div className="font-mono text-[10px] text-zinc-500">
                  Operational execution & delegation
                </div>
              </div>

              <div className="space-y-2.5">
                {currentWing.heads.map((h) => (
                  <div
                    key={h.id || h.name}
                    onClick={() => handleOpenProfile(h)}
                    className="p-3.5 rounded-xl border border-black/[0.08] hover:border-black/20 hover:bg-zinc-50 transition-all cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  >
                    <div className="font-display font-bold text-sm text-zinc-950 group-hover:text-[#0062FF] transition-colors flex items-center justify-between">
                      <span>{h.name}</span>
                      <ArrowRight size={13} className="text-[#0062FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="font-mono text-[11px] text-[#0062FF] font-medium">
                      {h.role}
                    </div>
                    {h.branch && (
                      <div className="font-mono text-[10px] text-zinc-500 mt-0.5">
                        Branch: {h.branch}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 3: Coordinators */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-black/[0.06]">
                <div className="font-mono text-xs font-bold text-zinc-950 uppercase">
                  3. Coordinators ({currentWing.coordinators.length})
                </div>
                <div className="font-mono text-[10px] text-zinc-500">
                  Operational flow & session logistics
                </div>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {currentWing.coordinators.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleOpenProfile(c)}
                    className="p-3.5 rounded-xl border border-black/[0.08] hover:border-black/20 hover:bg-zinc-50 transition-all cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-display font-bold text-sm text-zinc-950 group-hover:text-[#0062FF] transition-colors flex items-center gap-1.5">
                        <span>{c.name}</span>
                        <ArrowRight size={12} className="text-[#0062FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                        {c.position}
                      </div>
                    </div>
                    {c.branch && (
                      <span className="font-mono text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-black/[0.04]">
                        {c.branch}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 4: Volunteers */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-black/[0.06]">
                <div className="font-mono text-xs font-bold text-zinc-950 uppercase">
                  4. Volunteers
                </div>
                <div className="font-mono text-[10px] text-zinc-500">
                  Departmental execution & initiatives
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAFC] border border-black/[0.06] text-xs text-zinc-600 leading-relaxed font-mono">
                <span className="font-semibold text-zinc-900 block mb-1">
                  SEMESTER RECRUITMENT
                </span>
                Open student volunteer induction conducted each academic term for registered collegiate members.
              </div>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
