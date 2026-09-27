import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, Cpu, Globe, Palette, Megaphone, BookOpen, Sparkles, 
  ChevronRight, ChevronLeft, CheckCircle2, Search, ArrowRight, X, 
  Clock, Award, ExternalLink, Mail, GraduationCap, Building2
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
  // State for Executive Spotlight pagination
  const [activeExecIndex, setActiveExecIndex] = useState(1); // Default to 02 President / Chairperson matching image

  // State for Domain Universe active wing
  const [selectedWingIndex, setSelectedWingIndex] = useState(0);

  // State for Directory Search & Filters
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryFilter, setDirectoryFilter] = useState('all');

  // State for Portrait Archive filter
  const [portraitFilter, setPortraitFilter] = useState('all');

  // State for Modal
  const [selectedMember, setSelectedMember] = useState(null);

  // 4 Primary Executive Officers for Executive Spotlight
  const executiveOfficers = useMemo(() => [
    {
      id: "123A8043",
      num: "01",
      figureTitle: "01 · Vice President",
      roleCode: "VICE PRESIDENT",
      name: "Sarang Patil",
      position: "Vice Chairperson",
      branch: "ECS",
      prn: "123A8043",
      scope: "Operations, Technical Symposia & Vice Leadership",
      bio: "Managing operational execution, inter-collegiate engineering hackathons, and administrative alignment across all chapter wings.",
      council: "Senior Council"
    },
    {
      id: "123A7018",
      num: "02",
      figureTitle: "02 · President",
      roleCode: "PRESIDENT",
      name: "Tejraj Gujar",
      position: "Chairperson",
      branch: "ECS",
      prn: "123A7018",
      scope: "Chapter Governance & Executive Operations",
      bio: "Overseeing chapter strategy, collegiate accreditation, cross-departmental initiatives, and executive leadership of the IEI SIES GST Student Chapter.",
      council: "Senior Council"
    },
    {
      id: "123A7016",
      num: "03",
      figureTitle: "03 · Secretary",
      roleCode: "SECRETARY",
      name: "Shardul Gade",
      position: "Secretary",
      branch: "ECS",
      prn: "123A7016",
      scope: "Institutional Secretariat & Records",
      bio: "Governing chapter correspondence, statutory compliance, meeting proceedings, and official communications with institutional boards.",
      council: "Senior Council"
    },
    {
      id: "123A7020",
      num: "04",
      figureTitle: "04 · Technical Head",
      roleCode: "TREASURER & FINANCE",
      name: "Harshad Jadhav",
      position: "Treasurer",
      branch: "ECS",
      prn: "123A7020",
      scope: "Financial Oversight & Chapter Treasury",
      bio: "Directing fiscal planning, budget audits, sponsorships allocations, and annual financial statements for all semester initiatives.",
      council: "Senior Council"
    }
  ], []);

  const currentExec = executiveOfficers[activeExecIndex];

  // Faculty Leadership Profiles matching Image 2
  const facultyProfiles = [
    {
      id: "FAC-01",
      name: "Dr. Shubhangi Kharche",
      role: "Head of Department",
      officialTitle: "Head of Department",
      dept: "Electronics & Computer Science Engineering",
      badge: "APEX ACADEMIC GOVERNANCE",
      subBadge: "HOD • ECS",
      email: "hod.ecs@siesgst.ac.in",
      avatarBadge: "CHAIR OF ADVISORY",
      icon: Award,
      desc: "Providing institutional vision and academic direction for the IEI SIES GST Student Chapter, guiding curriculum integration and professional research standards.",
      portfolioHeader: "INSTITUTIONAL PORTFOLIO:",
      portfolio: [
        "Departmental accreditation standards & curriculum alignment",
        "Strategic research sponsorship & industry liaison",
        "Collegiate engineering chapter charter verification"
      ]
    },
    {
      id: "FAC-02",
      name: "Prof. Jasmin Hirani",
      role: "Faculty Advisor & Chapter Coordinator",
      officialTitle: "Faculty Advisor & Chapter Coordinator",
      dept: "Electronics & Computer Science Engineering",
      badge: "STUDENT BRANCH OVERSIGHT",
      subBadge: "FACULTY ADVISOR",
      email: "jasmin.hirani@siesgst.ac.in",
      avatarBadge: "CHAPTER LIAISON",
      icon: GraduationCap,
      desc: "Overseeing chapter operations, student leadership coordination, and official IEI council liaison to foster engineering innovation and collaborative student development.",
      portfolioHeader: "OPERATIONAL OVERSIGHT:",
      portfolio: [
        "Student council term governance & executive mentoring",
        "Official IEI India headquarters reporting & compliance",
        "Symposia, technical papers & student project evaluations"
      ]
    },
    {
      id: "FAC-03",
      name: "Dr. K. Lakshmisudha",
      role: "Principal & Institutional Patron",
      officialTitle: "Principal",
      dept: "SIES Graduate School of Technology",
      badge: "COLLEGIATE LEADERSHIP",
      subBadge: "PRINCIPAL",
      email: "principal@siesgst.ac.in",
      avatarBadge: "CHIEF PATRON",
      icon: Building2,
      desc: "Providing apex institutional leadership, statutory collegiate mentorship, and executive guidance for collegiate engineering societies.",
      portfolioHeader: "EXECUTIVE PATRONAGE:",
      portfolio: [
        "Apex statutory leadership & collegiate engineering excellence direction",
        "Inter-disciplinary engineering integration across graduate schools",
        "National engineering society charters and national council accreditation"
      ]
    }
  ];

  // Core Council Highlighted Officers
  const coreCouncilCards = [
    {
      code: "CORE-01",
      title: "Chairperson",
      name: "Tejraj Gujar",
      branch: "ECS",
      prn: "123A7018",
      scope: "Executive Chapter Governance, Statutory Compliance & Board Coordination"
    },
    {
      code: "CORE-02",
      title: "Vice Chairperson",
      name: "Sarang Patil",
      branch: "ECS",
      prn: "123A8043",
      scope: "Operational Strategy, Cross-Wing Coordination & Event Execution"
    },
    {
      code: "CORE-03",
      title: "Secretary",
      name: "Shardul Gade",
      branch: "ECS",
      prn: "123A7016",
      scope: "Institutional Secretariat, Statutory Proceedings & National Records"
    },
    {
      code: "CORE-04",
      title: "Joint Secretaries",
      name: "Prathamesh Bhagwat & Indrayani Patil",
      branch: "ECS / CE",
      prn: "124A7003 / 124A1118",
      scope: "Secretariat Support, Member Records & Cross-Branch Administrative Liaison"
    },
    {
      code: "CORE-05",
      title: "Treasurer",
      name: "Harshad Jadhav",
      branch: "ECS",
      prn: "123A7020",
      scope: "Fiscal Governance, Budget Approvals, Sponsor Audits & Financial Reports"
    }
  ];

  // 7 Domain Wings matching Image 1:
  // 01 Technical (TECH)
  // 02 Industry Outreach & Admin (OUTREACH)
  // 03 Publicity (PUB)
  // 04 Creative (CRTV)
  // 05 Design (DSGN)
  // 06 Media (MED)
  // 07 Editorial (EDIT)
  const domainWings = [
    {
      id: "tech",
      name: "Technical",
      code: "TECH",
      fullName: "Technical Wing",
      fullCode: "IEI-ECS-TECH",
      icon: Cpu,
      subtext: "Microcontroller testbenches, algorithm sprints, embedded IoT development, and collegiate hackathons.",
      // SVG node coordinates (matching Image 1 layout: TECH at top center)
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
      // Bottom-left
      nodeX: 200,
      nodeY: 410,
      labelX: 200,
      labelY: 445,
      scopeList: [
        "Corporate partnerships & industrial visit logistics",
        "Invited guest lectures & professional symposia protocols",
        "Campus-wide administrative synchronization & event permits",
        "National engineering chapter liaison & institutional reporting"
      ],
      mentors: [
        { name: "A S Lakshanya", role: "Event & Community Manager", branch: "AIDS", id: "123A8001", prn: "123A8001", council: "Senior Council" },
        { name: "Anushka Pawar", role: "Event & Community Manager", branch: "ECS", id: "123A7002", prn: "123A7002", council: "Senior Council" }
      ],
      heads: [
        { name: "Advaith Nair", role: "Industry Outreach & Admin Head", branch: "ECS", id: "124A7041", prn: "124A7041", council: "Junior Council" },
        { name: "Harshit Lahari", role: "Industry Outreach & Admin Head", branch: "ECS", id: "124A7026", prn: "124A7026", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.outreach || coordinatorsData.industryOutreach || []
    },
    {
      id: "publicity",
      name: "Publicity",
      code: "PUB",
      fullName: "Publicity Wing",
      fullCode: "IEI-ECS-PUB",
      icon: Megaphone,
      subtext: "Public relations, campaign promotions, campus announcements, and student body outreach.",
      // Bottom-right
      nodeX: 580,
      nodeY: 340,
      labelX: 580,
      labelY: 375,
      scopeList: [
        "Campaign promotions across academic departments",
        "Student registration drives and chapter publicity",
        "Interactive outreach desks and announcement broadcasts",
        "Inter-collegiate invitations and media circulation"
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
      id: "creative",
      name: "Creative",
      code: "CRTV",
      fullName: "Creative Wing",
      fullCode: "IEI-ECS-CRTV",
      icon: Sparkles,
      subtext: "Thematic stagecraft, creative installations, campaign narrative development, and artistic curation.",
      // Mid-left
      nodeX: 270,
      nodeY: 300,
      labelX: 270,
      labelY: 335,
      scopeList: [
        "Auditorium stage installations & event theme aesthetics",
        "Creative narrative copywriting & storytelling campaigns",
        "Experiential student engagement setups & interactive games",
        "Artistic fabrication & chapter decor installations"
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
      subtext: "Visual branding identity, publication layouts, UI design systems, typography, and creative collateral.",
      // Upper-right
      nodeX: 560,
      nodeY: 190,
      labelX: 560,
      labelY: 225,
      scopeList: [
        "Brand visual standards, color systems & typography assets",
        "Digital posters, motion collaterals & event banners",
        "UI/UX wireframes for web applications and registration portals",
        "Merchandise curation & printed event deliverables"
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
      // Upper-left
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
      // Bottom-center-right
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

  // Portrait Archive full roster list
  const portraitList = useMemo(() => {
    let list = [...seniorCouncil, ...juniorCouncil];
    if (portraitFilter === 'senior') list = seniorCouncil;
    if (portraitFilter === 'junior') list = juniorCouncil;
    if (portraitFilter === 'heads') list = juniorCouncil.filter(m => m.position.toLowerCase().includes('head'));
    return list;
  }, [portraitFilter]);

  // Searchable Chapter Directory Filter
  const filteredDirectoryMembers = useMemo(() => {
    return membersData.filter((m) => {
      const query = directorySearch.toLowerCase().trim();
      const matchesQuery = !query || 
        m.name.toLowerCase().includes(query) ||
        (m.position && m.position.toLowerCase().includes(query)) ||
        (m.branch && m.branch.toLowerCase().includes(query)) ||
        (m.council && m.council.toLowerCase().includes(query));

      let matchesFilter = true;
      if (directoryFilter === 'senior') matchesFilter = m.council === 'Senior Council';
      else if (directoryFilter === 'junior') matchesFilter = m.council === 'Junior Council';
      else if (directoryFilter === 'coordinators') matchesFilter = m.council === 'Coordinators';
      else if (directoryFilter === 'faculty') matchesFilter = m.council === 'Faculty Leadership';
      else if (directoryFilter === 'technical') matchesFilter = m.domain === 'Technical';
      else if (directoryFilter === 'outreach') matchesFilter = m.domain === 'Industry Outreach & Admin';
      else if (directoryFilter === 'editorial') matchesFilter = m.domain === 'Editorial';
      else if (directoryFilter === 'design') matchesFilter = m.domain === 'Design';
      else if (directoryFilter === 'media') matchesFilter = m.domain === 'Media';
      else if (directoryFilter === 'creative') matchesFilter = m.domain === 'Creative';

      return matchesQuery && matchesFilter;
    });
  }, [directorySearch, directoryFilter]);

  return (
    <div id="team" className="relative min-h-screen text-zinc-900 bg-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO / HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/[0.06]">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-minimal badge-blue">
              IEI·GOV·ECS
            </span>
            <span className="badge-minimal">
              SESSION 2026–2027
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-zinc-950 tracking-ultra-tight uppercase leading-none mb-3">
            THE PEOPLE
          </h1>
          <p className="font-display text-2xl sm:text-3xl text-zinc-600 font-bold mb-6 tracking-tight">
            BEHIND IEI SIES GST
          </p>

          <p className="text-zinc-600 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            The engineering minds, student leadership council, and specialized domain wings driving academic innovation, technical research, and institutional excellence within the Department of Electronics and Computer Science.
          </p>
        </div>

        {/* System 01 Hairline Divider */}
        <div className="relative mt-16 pt-6 border-t border-black/[0.08] flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
            SYSTEM 01 • ORGANIZATIONAL ROSTER
          </span>
          <span className="font-mono text-xs text-zinc-500">
            TOTAL RATIFIED MEMBERS: 46
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SYSTEM 02 • EXECUTIVE SPOTLIGHT (MATCHING IMAGE 3 EXACTLY) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/[0.06]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="font-mono text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-1">
              SYSTEM 02 • EXECUTIVE SPOTLIGHT / SELECT FIGURE TO REVEAL ISOLATED CHROMATIC SILHOUETTE & CREDENTIALS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
              The Executive Council
            </h2>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveExecIndex((prev) => (prev > 0 ? prev - 1 : executiveOfficers.length - 1));
                audioEngine.playClick();
              }}
              aria-label="Previous executive officer"
              className="w-9 h-9 rounded-xl border border-black/[0.08] bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-xs text-zinc-600 px-2 font-medium">
              0{activeExecIndex + 1} / 0{executiveOfficers.length}
            </span>
            <button
              onClick={() => {
                setActiveExecIndex((prev) => (prev < executiveOfficers.length - 1 ? prev + 1 : 0));
                audioEngine.playClick();
              }}
              aria-label="Next executive officer"
              className="w-9 h-9 rounded-xl border border-black/[0.08] bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Gray Stage Container with Standing Silhouettes matching Image 3 */}
        <div className="relative bg-[#DCE0E5] rounded-3xl p-6 sm:p-10 pt-12 overflow-hidden shadow-inner border border-black/[0.08] min-h-[580px] flex flex-col justify-between">
          
          {/* Subtle Stage Grid Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#0000000d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

          {/* 4 Standing Humanoid Figures */}
          <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-6 items-end justify-items-center max-w-5xl mx-auto w-full pt-4 pb-20">
            {executiveOfficers.map((exec, idx) => {
              const isSelected = activeExecIndex === idx;

              return (
                <div
                  key={exec.id}
                  onClick={() => {
                    setActiveExecIndex(idx);
                    audioEngine.playClick();
                  }}
                  className="flex flex-col items-center cursor-pointer group relative transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Silhouette Head */}
                  <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-md z-20 transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-b from-zinc-300 to-zinc-500 ring-2 ring-white/60' 
                      : 'bg-gradient-to-b from-zinc-400 to-zinc-500 opacity-90 group-hover:opacity-100'
                  }`} />

                  {/* Figure Pill Badge Across Chest */}
                  <div className={`-mt-3 z-30 px-2 sm:px-3 py-1 rounded-full shadow-md font-mono text-[9px] sm:text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                    isSelected 
                      ? 'bg-white text-zinc-950 border-white shadow-lg scale-105' 
                      : 'bg-white/90 text-zinc-700 border-black/[0.08] group-hover:bg-white'
                  }`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-[#0062FF]' : 'bg-zinc-400'}`} />
                    <span>{exec.figureTitle}</span>
                  </div>

                  {/* Silhouette Torso & Legs */}
                  <div className="relative mt-1">
                    {/* Default Gray Torso */}
                    <div className="w-20 sm:w-36 h-48 sm:h-72 bg-gradient-to-b from-zinc-500 via-zinc-600 to-zinc-700 rounded-t-[32px] sm:rounded-t-[44px] shadow-lg opacity-90" />

                    {/* Chromatic Electric Blue Polygonal Cape Overlay when Active (Image 3) */}
                    {isSelected && (
                      <div 
                        className="absolute -inset-x-3 -top-10 bottom-0 bg-[#0062FF] rounded-t-[40px] shadow-2xl opacity-90 transition-all duration-300 animate-fadeIn pointer-events-none"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 18%, 82% 100%, 18% 100%, 0% 18%)'
                        }}
                      >
                        {/* Shimmer line */}
                        <div className="w-full h-full bg-gradient-to-b from-white/20 via-transparent to-black/20" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating White Spotlight Card Overlaid at Bottom (Matching Image 3) */}
          <div className="relative z-30 bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full mx-auto shadow-2xl border border-black/[0.08] -mt-10 sm:-mt-12 backdrop-blur-md">
            
            {/* Top row: EXEC-0X & Verified Badge */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#0062FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  EXEC-0{activeExecIndex + 1}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  2026–2027
                </span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-700 font-semibold">
                <ShieldCheck size={13} className="text-emerald-600" />
                VERIFIED RECORD
              </span>
            </div>

            {/* Position Subtitle & Name */}
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
              {currentExec.roleCode}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 mb-1 leading-tight">
              {currentExec.name}
            </h3>
            <div className="font-mono text-xs font-semibold text-[#0062FF] mb-3">
              {currentExec.scope}
            </div>

            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              {currentExec.bio}
            </p>

            {/* Bottom Action Row with LinkedIn, GitHub, and View Profile Button */}
            <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-black/[0.06] flex items-center justify-center text-zinc-600 hover:text-zinc-950 cursor-pointer transition-colors" title="Institutional Profile">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-black/[0.06] flex items-center justify-center text-zinc-600 hover:text-zinc-950 cursor-pointer transition-colors" title="Institutional Repository">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedMember(currentExec);
                  audioEngine.playClick();
                }}
                className="px-5 py-2.5 rounded-full bg-[#0062FF] hover:bg-[#0052D6] text-white font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <span>VIEW PROFILE</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SYSTEM 03 • FACULTY LEADERSHIP (MATCHING IMAGE 2 EXACTLY) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/[0.06]">
        
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-1">
            SYSTEM 03 • INSTITUTIONAL ADVISORY / DEPARTMENT OF ELECTRONICS & COMPUTER SCIENCE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-2">
            Faculty Leadership
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
            Distinguished academic advisors steering chapter governance, accreditation standards, and research initiatives within SIES Graduate School of Technology.
          </p>
        </div>

        {/* 2 Large Horizontal Cards Side-by-Side (Matching Image 2 Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {facultyProfiles.slice(0, 2).map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.id}
                onClick={() => {
                  setSelectedMember(fac);
                  audioEngine.playClick();
                }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-black/20 hover:shadow-md transition-all cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-6 items-start group"
              >
                {/* Left Column: Portrait Frame with Minimalist Silhouette & Bottom Ribbon Button */}
                <div className="sm:col-span-5 bg-[#F7F8FA] rounded-2xl border border-black/[0.06] p-4 flex flex-col justify-between items-center min-h-[310px] relative">
                  {/* Subtle Corner Crop Marks */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-zinc-300" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-zinc-300" />
                  <div className="absolute bottom-12 left-2 w-2 h-2 border-b border-l border-zinc-300" />
                  <div className="absolute bottom-12 right-2 w-2 h-2 border-b border-r border-zinc-300" />

                  {/* Silhouette Portrait (Head + Arched Torso matching Image 2) */}
                  <div className="flex-1 flex flex-col items-center justify-center pt-4">
                    <div className="w-18 h-18 rounded-full bg-zinc-300/90 shadow-inner" />
                    <div className="w-28 h-20 bg-zinc-300/90 rounded-t-full mt-2" />
                  </div>

                  {/* Bottom Ribbon / Badge Button */}
                  <div className="w-full mt-3 bg-white border border-black/[0.08] px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider text-zinc-800 text-center flex items-center justify-center gap-1.5 shadow-2xs">
                    <Icon size={13} className="text-[#0062FF]" />
                    <span>{fac.avatarBadge}</span>
                  </div>
                </div>

                {/* Right Column: Title, Role, Description, Portfolio, Email Pill */}
                <div className="sm:col-span-7 flex flex-col justify-between min-h-[310px]">
                  <div>
                    {/* Top Row: Category + SubBadge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold text-[#0062FF] uppercase tracking-wider">
                        {fac.badge}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 font-semibold">
                        {fac.subBadge}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-zinc-950 group-hover:text-[#0062FF] transition-colors leading-tight mb-1">
                      {fac.name}
                    </h3>
                    <div className="font-display font-medium text-sm text-zinc-800">
                      {fac.officialTitle}
                    </div>
                    <div className="font-mono text-[11px] text-zinc-500 mb-3">
                      {fac.dept}
                    </div>

                    <p className="text-zinc-600 text-xs leading-relaxed font-normal mb-4">
                      {fac.desc}
                    </p>

                    {/* Institutional Portfolio Bullet Points with Dash Prefix */}
                    <div className="pt-3 border-t border-black/[0.06] mb-4">
                      <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                        {fac.portfolioHeader}
                      </div>
                      <ul className="space-y-1 font-normal text-xs text-zinc-600 leading-relaxed">
                        {fac.portfolio.map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-zinc-400 select-none">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom: Email Pill Button */}
                  <div className="pt-2">
                    <a
                      href={`mailto:${fac.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-xs text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-black/[0.08] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 font-semibold transition-colors"
                    >
                      <Mail size={12} className="text-zinc-500" />
                      <span>{fac.email}</span>
                      <span className="text-zinc-400">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3rd Faculty Card: Dr. K. Lakshmisudha (Principal) */}
        <div
          onClick={() => {
            setSelectedMember(facultyProfiles[2]);
            audioEngine.playClick();
          }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-black/20 hover:shadow-md transition-all cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-6 items-start group max-w-2xl"
        >
          <div className="sm:col-span-5 bg-[#F7F8FA] rounded-2xl border border-black/[0.06] p-4 flex flex-col justify-between items-center min-h-[280px] relative">
            <div className="flex-1 flex flex-col items-center justify-center pt-4">
              <div className="w-18 h-18 rounded-full bg-zinc-300/90 shadow-inner" />
              <div className="w-28 h-20 bg-zinc-300/90 rounded-t-full mt-2" />
            </div>
            <div className="w-full mt-3 bg-white border border-black/[0.08] px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider text-zinc-800 text-center flex items-center justify-center gap-1.5 shadow-2xs">
              <Building2 size={13} className="text-[#0062FF]" />
              <span>CHIEF PATRON</span>
            </div>
          </div>

          <div className="sm:col-span-7 flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold text-[#0062FF] uppercase tracking-wider">
                  COLLEGIATE LEADERSHIP
                </span>
                <span className="font-mono text-[10px] text-zinc-500 font-semibold">
                  PRINCIPAL
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-zinc-950 group-hover:text-[#0062FF] transition-colors leading-tight mb-1">
                Dr. K. Lakshmisudha
              </h3>
              <div className="font-display font-medium text-sm text-zinc-800">
                Principal, SIES GST
              </div>
              <div className="font-mono text-[11px] text-zinc-500 mb-3">
                SIES Graduate School of Technology
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed font-normal mb-4">
                Providing apex institutional leadership, statutory collegiate mentorship, and executive guidance for collegiate engineering societies.
              </p>
            </div>

            <div>
              <a
                href="mailto:principal@siesgst.ac.in"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-xs text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-black/[0.08] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 font-semibold transition-colors"
              >
                <Mail size={12} className="text-zinc-500" />
                <span>principal@siesgst.ac.in</span>
                <span className="text-zinc-400">↗</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. SYSTEM 04 • CORE COUNCIL */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/[0.06]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="font-mono text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-1">
              SYSTEM 04 • APEX EXECUTIVE STRUCTURE / INDEPENDENT EXECUTIVE GOVERNANCE BODY
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
              Core Council
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-xl border border-black/[0.06]">
            <Clock size={13} className="text-zinc-500" />
            <span>SESSION 2026–2027 APPOINTMENT CYCLE</span>
          </div>
        </div>

        {/* Callout Banner Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-black/[0.06] mb-8 flex items-start sm:items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-[#0062FF] shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-zinc-950">
              Chapter Core Council Session 2026–2027 Ratified
            </div>
            <p className="text-zinc-600 text-xs sm:text-sm font-normal mt-0.5">
              Official student executive appointments for the current session ratified by the Faculty Advisory Board. Digital credentials authenticated for collegiate operations.
            </p>
          </div>
        </div>

        {/* 5-Column Core Council Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {coreCouncilCards.map((c) => (
            <div
              key={c.code}
              onClick={() => {
                const member = membersData.find(m => m.name.toLowerCase() === c.name.toLowerCase().split('&')[0].trim()) || {
                  name: c.name,
                  position: c.title,
                  branch: c.branch,
                  council: "Core Council",
                  prn: c.prn
                };
                setSelectedMember(member);
                audioEngine.playClick();
              }}
              className="bg-white p-5 rounded-2xl border border-black/[0.08] hover:border-black/20 hover:shadow-md transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)] cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-black/[0.06] pb-2">
                  <span className="font-mono text-[10px] text-zinc-500 font-bold">
                    {c.code}
                  </span>
                  <span className="font-mono text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    RATIFIED
                  </span>
                </div>

                <div className="font-mono text-[11px] font-bold text-[#0062FF] uppercase tracking-wide mb-1">
                  {c.title}
                </div>
                <h3 className="font-display font-bold text-base text-zinc-950 mb-1 group-hover:text-[#0062FF] transition-colors">
                  {c.name}
                </h3>
                <div className="font-mono text-[10px] text-zinc-500 mb-3">
                  Branch: {c.branch}
                </div>

                <p className="text-zinc-600 text-xs leading-relaxed font-normal">
                  {c.scope}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="font-mono text-[9px] text-zinc-500 uppercase">
                  FACULTY RATIFICATION
                </span>
                <span className="text-[#0062FF] font-bold text-xs group-hover:translate-x-0.5 transition-transform">+</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SYSTEM 05 • DOMAIN UNIVERSE (MATCHING IMAGE 1 EXACTLY) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/[0.06]">
        
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-1">
            SYSTEM 05 • ORGANIZATIONAL UNIVERSE / SEVEN SPECIALIZED ENGINEERING WINGS
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-3">
            Domain Universe
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
            Explore the chapter's multidisciplinary departments. Select a domain node to inspect its charter, volunteer responsibilities, and four-tier hierarchy.
          </p>
        </div>

        {/* 2-Column: Left Index + Right Network Canvas (Matching Image 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Wing Selector Rail (DOMAIN INDEX 07 WINGS) */}
          <div className="lg:col-span-4 bg-white p-2 rounded-2xl border border-black/[0.06] shadow-xs space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[11px] font-bold text-zinc-500 px-3 py-2 uppercase tracking-wider border-b border-black/[0.06] mb-1">
              <span>DOMAIN INDEX</span>
              <span className="text-[#0062FF]">07 WINGS</span>
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

          {/* Right Canvas: Interactive Node Graph Representation (Matching Image 1) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-black/[0.08] p-4 sm:p-6 shadow-xs relative overflow-hidden min-h-[460px] flex items-center justify-center">
            
            <svg 
              viewBox="0 0 700 480" 
              className="w-full h-auto select-none"
              style={{ maxWidth: '700px' }}
            >
              {/* Center Hub Position */}
              {/* cx = 420, cy = 250 */}

              {/* Connecting Lines between IEI ECS Hub and Satellite Nodes */}
              {domainWings.map((w, idx) => {
                const isSelected = selectedWingIndex === idx;
                const hubX = 420;
                const hubY = 250;

                return (
                  <line
                    key={`line-${w.id}`}
                    x1={hubX}
                    y1={hubY}
                    x2={w.nodeX}
                    y2={w.nodeY}
                    stroke={isSelected ? '#0062FF' : '#E2E8F0'}
                    strokeWidth={isSelected ? 6 : 1.5}
                    strokeDasharray={isSelected ? 'none' : '4,4'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Central Chapter Hub Node (IEI ECS) */}
              <g className="cursor-pointer" onClick={() => setSelectedWingIndex(0)}>
                {/* Glow ring */}
                <circle cx="420" cy="250" r="44" fill="#0062FF" opacity="0.08" />
                {/* Outer border */}
                <circle cx="420" cy="250" r="36" fill="#FFFFFF" stroke="#0062FF" strokeWidth="2.5" />
                {/* Text inside */}
                <text x="420" y="244" textAnchor="middle" fill="#0062FF" fontSize="13" fontFamily="monospace" fontWeight="bold">
                  IEI
                </text>
                <text x="420" y="260" textAnchor="middle" fill="#0062FF" fontSize="11" fontFamily="monospace" fontWeight="600">
                  ECS
                </text>
              </g>

              {/* 7 Satellite Domain Nodes (Matching Image 1) */}
              {domainWings.map((w, idx) => {
                const isSelected = selectedWingIndex === idx;

                return (
                  <g
                    key={`node-${w.id}`}
                    onClick={() => {
                      setSelectedWingIndex(idx);
                      audioEngine.playClick();
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Node Pill Badge */}
                    <rect
                      x={w.nodeX - (w.code.length > 5 ? 44 : 36)}
                      y={w.nodeY - 14}
                      width={w.code.length > 5 ? 88 : 72}
                      height="26"
                      rx="13"
                      fill="#FFFFFF"
                      stroke={isSelected ? '#0062FF' : '#CBD5E1'}
                      strokeWidth={isSelected ? '2' : '1.2'}
                      className="transition-all"
                    />

                    {/* Dot inside Pill */}
                    <circle
                      cx={w.nodeX - (w.code.length > 5 ? 32 : 24)}
                      cy={w.nodeY}
                      r="3.5"
                      fill={isSelected ? '#0062FF' : '#94A3B8'}
                    />

                    {/* Code text inside Pill */}
                    <text
                      x={w.nodeX + 4}
                      y={w.nodeY + 4}
                      textAnchor="middle"
                      fill={isSelected ? '#0F172A' : '#64748B'}
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight={isSelected ? 'bold' : '600'}
                    >
                      {w.code}
                    </text>

                    {/* Label below Pill */}
                    <text
                      x={w.nodeX}
                      y={w.nodeY + 28}
                      textAnchor="middle"
                      fill={isSelected ? '#0062FF' : '#334155'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : '500'}
                    >
                      {w.name}
                    </text>
                  </g>
                );
              })}
            </svg>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* ACTIVE WING CHARTER & 4-TIER APPOINTMENTS BLOCK */}
        {/* ========================================================================= */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          
          {/* Wing Charter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-black/[0.06] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-minimal badge-blue text-[10px]">
                  {currentWing.fullCode}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  ACTIVE WING CHARTER
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black text-zinc-950">
                {currentWing.fullName}
              </h3>
              <p className="text-zinc-600 text-sm mt-1 font-normal max-w-xl">
                {currentWing.subtext}
              </p>
            </div>
          </div>

          {/* Volunteer Scope & Operational Responsibilities Card */}
          <div className="bg-[#FAFAFC] p-6 rounded-2xl border border-black/[0.06] mb-10">
            <div className="font-mono text-xs font-bold text-zinc-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#0062FF]" />
              <span>Volunteer Scope & Operational Responsibilities</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentWing.scopeList.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 font-normal text-xs text-zinc-700 leading-relaxed">
                  <span className="text-[#0062FF] font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Tier Hierarchy & Appointments Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b border-black/[0.06] gap-1">
              <h4 className="font-display text-xl font-bold text-zinc-950">
                Domain Hierarchy & Appointments
              </h4>
              <span className="font-mono text-xs text-zinc-500">
                Tiers: Mentor • Head • Coordinator • Volunteer
              </span>
            </div>

            {/* 4-Tier Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Tier 1: Mentors */}
              <div className="space-y-3">
                <div className="pb-2 border-b border-black/[0.06]">
                  <div className="font-mono text-xs font-bold text-zinc-950 uppercase">
                    1. Mentors
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500">
                    Senior advisory & technical oversight
                  </div>
                </div>

                <div className="space-y-2.5">
                  {currentWing.mentors.map((m) => (
                    <div
                      key={m.id || m.name}
                      onClick={() => {
                        setSelectedMember(m);
                        audioEngine.playClick();
                      }}
                      className="p-3.5 rounded-xl border border-black/[0.08] hover:border-black/20 hover:bg-zinc-50 transition-all cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                    >
                      <div className="font-display font-bold text-sm text-zinc-950 group-hover:text-[#0062FF] transition-colors">
                        {m.name}
                      </div>
                      <div className="font-mono text-[11px] text-[#0062FF] font-medium">
                        {m.role}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500 mt-0.5">
                        {m.branch ? `Branch: ${m.branch}` : 'Branch: —'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Domain Heads */}
              <div className="space-y-3">
                <div className="pb-2 border-b border-black/[0.06]">
                  <div className="font-mono text-xs font-bold text-zinc-950 uppercase">
                    2. Domain Heads
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500">
                    Executive management & delivery leads
                  </div>
                </div>

                <div className="space-y-2.5">
                  {currentWing.heads.map((h) => (
                    <div
                      key={h.id || h.name}
                      onClick={() => {
                        setSelectedMember(h);
                        audioEngine.playClick();
                      }}
                      className="p-3.5 rounded-xl border border-black/[0.08] hover:border-black/20 hover:bg-zinc-50 transition-all cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                    >
                      <div className="font-display font-bold text-sm text-zinc-950 group-hover:text-[#0062FF] transition-colors">
                        {h.name}
                      </div>
                      <div className="font-mono text-[11px] text-[#0062FF] font-medium">
                        {h.role}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500 mt-0.5">
                        {h.branch ? `Branch: ${h.branch}` : 'Branch: —'}
                      </div>
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
                      onClick={() => {
                        setSelectedMember(c);
                        audioEngine.playClick();
                      }}
                      className="p-3.5 rounded-xl border border-black/[0.08] hover:border-black/20 hover:bg-zinc-50 transition-all cursor-pointer group shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-display font-bold text-sm text-zinc-950 group-hover:text-[#0062FF] transition-colors">
                          {c.name}
                        </div>
                        <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                          {c.position}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-black/[0.04]">
                        {c.branch}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 4: Volunteers / Departmental Execution */}
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
                  Open student volunteer induction conducted each academic term for registered IEEE/IEI collegiate members.
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. SYSTEM 06 • PORTRAIT ARCHIVE */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/[0.06]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="font-mono text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-1">
              SYSTEM 06 • COMPLETE ROSTER ARCHIVE / RECORDED APPOINTMENTS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
              Portrait Archive
            </h2>
            <p className="text-zinc-600 text-sm mt-1 font-normal max-w-xl">
              Editorial contact sheet of inducted executive leadership and domain leads. Hover or select a portrait to illuminate individual credentials.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPortraitFilter('all');
                audioEngine.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all ${
                portraitFilter === 'all'
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              All Leadership ({seniorCouncil.length + juniorCouncil.length})
            </button>
            <button
              onClick={() => {
                setPortraitFilter('senior');
                audioEngine.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all ${
                portraitFilter === 'senior'
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Senior Council ({seniorCouncil.length})
            </button>
            <button
              onClick={() => {
                setPortraitFilter('junior');
                audioEngine.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all ${
                portraitFilter === 'junior'
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Junior Council ({juniorCouncil.length})
            </button>
          </div>
        </div>

        {/* 3-Column Contact Sheet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portraitList.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                setSelectedMember(m);
                audioEngine.playClick();
              }}
              className="bg-white p-6 rounded-3xl border border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-black/20 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
            >
              {/* Avatar circle with initials */}
              <div className="w-16 h-16 rounded-full bg-zinc-100 border border-black/[0.08] flex items-center justify-center font-display font-black text-xl text-zinc-900 group-hover:bg-[#0062FF] group-hover:text-white transition-colors shrink-0">
                {getInitials(m.name)}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-zinc-500 font-bold">
                    IEI-GST-2026
                  </span>
                  <ShieldCheck size={12} className="text-[#0062FF]" />
                </div>

                <div className="font-mono text-[11px] font-bold text-[#0062FF] uppercase tracking-wide truncate">
                  {m.position}
                </div>
                <h3 className="font-display font-bold text-base text-zinc-950 group-hover:text-[#0062FF] transition-colors truncate">
                  {m.name}
                </h3>
                <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                  {m.branch ? `Branch: ${m.branch}` : 'Branch: —'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SEARCHABLE ROSTER / CHAPTER MEMBER DIRECTORY */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-10">
          <div className="font-mono text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-1">
            SEARCHABLE ROSTER
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-3">
            Chapter Member Directory
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
            Search and verify student chapter executives and members. All credentials can be independently validated via authenticated chapter records.
          </p>
        </div>

        {/* Controls & Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={directorySearch}
              onChange={(e) => setDirectorySearch(e.target.value)}
              placeholder="Search by name, position, branch..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-black/[0.08] text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all font-mono"
            />
          </div>

          {/* Results Count Indicator */}
          <div className="font-mono text-xs text-zinc-500">
            Showing {filteredDirectoryMembers.length} members
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: `All Members (${membersData.length})` },
            { id: 'senior', label: `Senior Council (${seniorCouncil.length})` },
            { id: 'junior', label: `Junior Council (${juniorCouncil.length})` },
            { id: 'coordinators', label: `Coordinators (${activeCoordinators.length})` },
            { id: 'technical', label: 'Technical' },
            { id: 'outreach', label: 'Outreach & Admin' },
            { id: 'editorial', label: 'Editorial' },
            { id: 'design', label: 'Design' },
            { id: 'media', label: 'Media' },
            { id: 'creative', label: 'Creative' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => {
                setDirectoryFilter(pill.id);
                audioEngine.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                directoryFilter === pill.id
                  ? 'bg-zinc-950 text-white font-semibold shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDirectoryMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => {
                setSelectedMember(member);
                audioEngine.playClick();
              }}
              className="bg-white p-5 rounded-2xl border border-black/[0.08] hover:border-black/20 hover:shadow-md transition-all shadow-[0_1px_8px_rgba(0,0,0,0.02)] cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.08] flex items-center justify-center font-display font-black text-sm text-zinc-900 group-hover:bg-[#0062FF] group-hover:text-white transition-colors shrink-0">
                    {getInitials(member.name)}
                  </div>
                  <span className="font-mono text-[9px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-black/[0.04]">
                    {member.branch ? `BRANCH: ${member.branch}` : 'BRANCH: —'}
                  </span>
                </div>

                <div className="font-mono text-[10px] font-bold text-[#0062FF] uppercase tracking-wide truncate mb-0.5">
                  {member.position}
                </div>
                <h3 className="font-display font-bold text-base text-zinc-950 group-hover:text-[#0062FF] transition-colors leading-snug">
                  {member.name}
                </h3>
                <div className="font-mono text-[11px] text-zinc-500 mt-1">
                  {member.council}
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-500">
                  {member.domain || 'Chapter Roster'}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#0062FF] font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Profile</span>
                  <ExternalLink size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. CONTEXTUAL MEMBER PROFILE MODAL */}
      {/* ========================================================================= */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-3xl border border-black/[0.1] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative overflow-hidden transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => {
                setSelectedMember(null);
                audioEngine.playClick();
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Modal Top Metadata */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
                OFFICIAL CHAPTER RECORD
              </span>
              <span className="font-mono text-xs text-zinc-500">
                SIES GST • 2026–2027
              </span>
            </div>

            {/* Member Profile Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-black/[0.08] flex items-center justify-center font-display font-black text-2xl text-zinc-900 shrink-0">
                {getInitials(selectedMember.name)}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-zinc-950 leading-tight">
                  {selectedMember.name}
                </h3>
                <div className="font-mono text-xs text-[#0062FF] font-semibold mt-0.5">
                  {selectedMember.position || selectedMember.role}
                </div>
                {selectedMember.branch ? (
                  <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                    Branch: {selectedMember.branch}
                  </div>
                ) : (
                  <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                    Branch: Unspecified
                  </div>
                )}
                <div className="font-mono text-[10px] text-zinc-400 mt-1">
                  {selectedMember.council}
                </div>
              </div>
            </div>

            {/* Underlying Verification Record */}
            <div className="bg-zinc-50 rounded-2xl p-4 border border-black/[0.06] mb-6 space-y-2.5 font-mono text-xs">
              {selectedMember.prn && (
                <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                  <span className="text-zinc-500">Student PRN:</span>
                  <span className="font-semibold text-zinc-900">{selectedMember.prn}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                <span className="text-zinc-500">Council Standing:</span>
                <span className="font-semibold text-zinc-900">{selectedMember.council}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                <span className="text-zinc-500">Verification Status:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  AUTHENTICATED CHAPTER RECORD
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Academic Session:</span>
                <span className="text-zinc-900">2026–2027</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
              <button
                type="button"
                onClick={() => {
                  setSelectedMember(null);
                  audioEngine.playClick();
                }}
                className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  window.location.hash = `#/member/${selectedMember.id || selectedMember.prn}`;
                }}
                className="px-5 py-2 rounded-xl bg-[#0062FF] hover:bg-[#0052D6] text-white font-mono text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>View Full Profile & QR</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
