import React, { useState, useRef } from 'react';
import { 
  Cpu, Globe, Palette, Megaphone, BookOpen, ShieldCheck, Users, Layers
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { coordinatorsData, facultyLeadership, seniorCouncil, juniorCouncil, getMemberById } from '../data/membersData';
import MemberCard from './MemberCard';
import DomainSpiderwebGraph from './DomainSpiderwebGraph';

export default function GovernanceTeam() {
  const deckRef = useRef(null);

  // Top-level section view: 'domains' | 'senior' | 'junior'
  const [activeView, setActiveView] = useState('domains');

  // State for Domain Universe active wing: 0..6 or 'core'
  const [selectedWingIndex, setSelectedWingIndex] = useState(0);

  const handleSelectWing = (target) => {
    setSelectedWingIndex(target);
    audioEngine.playClick();
    setTimeout(() => {
      if (deckRef.current) {
        deckRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  };

  const handleViewChange = (view) => {
    audioEngine.playClick();
    setActiveView(view);
  };

  // Helper to enrich any member object with authoritative data from membersData
  const enrichMember = (m) => {
    if (!m) return {};
    const full = getMemberById(m.id || m.prn || m.name);
    return {
      ...m,
      ...(full || {}),
      name: m.name || full?.name,
      position: m.role || m.position || full?.position || full?.role || 'Coordinator',
      image: full?.image || full?.photo || m.image || m.photo || null,
      linkedin: full?.linkedin || full?.socials?.linkedin || m.linkedin || null,
      github: full?.github || full?.socials?.github || m.github || null,
      email: full?.email || full?.socials?.email || m.email || null,
    };
  };

  // Chapter Core Governance Deck Definition
  const chapterCoreData = {
    id: "core",
    name: "Chapter Core",
    code: "CORE",
    fullName: "Chapter Core Governance",
    fullCode: "IEI-SIES-CORE",
    icon: ShieldCheck,
    subtext: "Central collegiate executive council and faculty stewardship directing the overall strategy, multidisciplinary initiatives, and institutional governance of the IEI Student Chapter.",
    scopeList: [
      "Institutional governance & academic council steering",
      "Inter-domain operational alignment & budget allocations",
      "National IEI statutory liaison & professional compliance",
      "Executive oversight of annual chapter symposia & hackathons"
    ],
    mentors: facultyLeadership.map(f => ({
      name: f.name,
      role: f.role,
      branch: f.branch,
      id: f.id,
      council: "Faculty Leadership"
    })),
    heads: seniorCouncil.slice(0, 4).map(s => ({
      name: s.name,
      role: s.role,
      branch: s.branch,
      id: s.id,
      council: "Executive Council"
    })),
    coordinators: seniorCouncil.slice(4).map(s => ({
      name: s.name,
      role: s.role,
      position: s.position,
      branch: s.branch,
      id: s.id,
      council: "Senior Council"
    }))
  };

  // 6 Official Domains for Domain Universe: Technical, Industry Outreach & Admin, Design, Creative, Media, Editorial
  const domainWings = [
    {
      id: "tech",
      name: "Technical",
      code: "TECH",
      fullName: "Technical Wing",
      fullCode: "IEI-ECS-TECH",
      icon: Cpu,
      subtext: "Microcontroller testbenches, algorithm sprints, embedded IoT development, and collegiate hackathons.",
      scopeList: [
        "Hands-on technical workshops & hardware-software sprints",
        "RTOS labs, robotics development & embedded testbenches",
        "Collegiate coding hackathons & project competitions",
        "Mentorship for open-source and national technical symposiums"
      ],
      mentors: [
        { name: "Harsh Mhatre", role: "Technical Advisor", branch: "ECS", id: "123A7019", council: "Senior Council" },
        { name: "Sahil Chavan", role: "Technical Advisor", branch: "ECS", id: "123A7011", council: "Senior Council" },
        { name: "Soham Chafale", role: "Technical Advisor", branch: "ECS", id: "123A7009", council: "Senior Council" },
        { name: "Aditya Kinikar", role: "Technical Advisor", branch: "ECS", id: "123A7027", council: "Senior Council" }
      ],
      heads: [
        { name: "Saran Rajasekhar", role: "Technical Head", branch: "ECS", id: "124A7052", council: "Junior Council" },
        { name: "Manas Suryawanshi", role: "Technical Head", branch: "ECS", id: "124A7061", council: "Junior Council" },
        { name: "Hariom Mohare", role: "Technical Head", branch: "ECS", id: "124A7036", council: "Junior Council" },
        { name: "Kaustubh Patil", role: "Technical Head", branch: "ECS", id: "124A7045", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.technical || []
    },
    {
      id: "outreach",
      name: "Industry Outreach & Admin",
      code: "ADMIN",
      fullName: "Industry Outreach & Admin Wing",
      fullCode: "IEI-ECS-ADMIN",
      icon: Globe,
      subtext: "Corporate liaison, industry tours, guest lecture protocols, and institutional partnership logistics.",
      scopeList: [
        "Industry expert masterclasses & technical seminars",
        "Industrial visits & laboratory field study expeditions",
        "Corporate sponsorship relations & MoU agreements",
        "Institutional administrative records & statutory liaison"
      ],
      mentors: [
        { name: "Tejraj Gujar", role: "Chairperson", branch: "ECS", id: "123A7018", council: "Senior Council" },
        { name: "Sarang Patil", role: "Vice Chairperson", branch: "AIDS", id: "123A8043", council: "Senior Council" },
        { name: "Shardul Gade", role: "Secretary", branch: "ECS", id: "123A7016", council: "Senior Council" },
        { name: "A S Lakshanya", role: "Event & Community Manager", branch: "AIDS", id: "123A8001", council: "Senior Council" },
        { name: "Anushka Pawar", role: "Event & Community Manager", branch: "ECS", id: "123A7002", council: "Senior Council" }
      ],
      heads: [
        { name: "Advaith Nair", role: "Industry Outreach & Admin Head", branch: "ECS", id: "124A7041", council: "Junior Council" },
        { name: "Harshit Lahari", role: "Industry Outreach & Admin Head", branch: "ECS", id: "124A7026", council: "Junior Council" },
        { name: "Aditya Bagwe", role: "Joint Secretary", branch: "ECS", id: "124A7003", council: "Junior Council" },
        { name: "Indrayani Patil", role: "Joint Secretary", branch: "CE", id: "124A1118", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.outreach || []
    },
    {
      id: "design",
      name: "Design",
      code: "DSGN",
      fullName: "Design Wing",
      fullCode: "IEI-ECS-DSGN",
      icon: Palette,
      subtext: "Brand design identity, event posters, web interfaces, UI/UX systems, and architectural editorial graphics.",
      scopeList: [
        "Vector typography, event posters & digital banners",
        "UI/UX wireframing for chapter portals & mobile apps",
        "Technical visual infographics & architecture diagrams",
        "Brand style guide preservation across all chapter publications"
      ],
      mentors: [
        { name: "Shravani Khedkar", role: "Design Mentor", branch: "ECS", id: "123A7053", council: "Senior Council" }
      ],
      heads: [
        { name: "Gauri Shinde", role: "Design Head", branch: "IT", id: "124A3052", council: "Junior Council" },
        { name: "Nimish Roge", role: "Design & Media Head", branch: "ECS", id: "124A7051", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.design || []
    },
    {
      id: "creative",
      name: "Creative",
      code: "CRTV",
      fullName: "Creative Wing",
      fullCode: "IEI-ECS-CRTV",
      icon: Palette,
      subtext: "Thematic ideation, event stagecraft, interactive installations, and experiential technical aesthetics.",
      scopeList: [
        "Thematic installations for annual technical symposia",
        "Creative event stagecraft & interactive lighting setups",
        "Experiential visual concepts for hackathons & expos",
        "Branding artboards for chapter print and digital assets"
      ],
      mentors: [
        { name: "Ananya Siddayyanavar", role: "Creative Mentor", branch: "ECS", id: "123A7001", council: "Senior Council" }
      ],
      heads: [
        { name: "Maadeshselvan Chidambarakuthala", role: "Creative Head", branch: "ECS", id: "124A7028", council: "Junior Council" },
        { name: "Sana Tankar", role: "Creative Head", branch: "EXTC", id: "124A2059", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.creative || []
    },
    {
      id: "media",
      name: "Media",
      code: "MED",
      fullName: "Media Wing",
      fullCode: "IEI-ECS-MDIA",
      icon: Megaphone,
      subtext: "Cinematic event recording, high-resolution photography, live broadcast production, and media archival.",
      scopeList: [
        "Event cinematography, recap videos & after-movies",
        "Professional photography & high-resolution photo archives",
        "Live audio-visual streaming & auditorium media setups",
        "Digital media campaigns & social video coverage"
      ],
      mentors: [
        { name: "Ayush Tandel", role: "Media Mentor", branch: "ECS", id: "2247068", council: "Senior Council" },
        { name: "Kaushik Yadav", role: "Media Mentor", branch: null, id: "122A7021", council: "Senior Council" }
      ],
      heads: [
        { name: "Nimish Roge", role: "Design & Media Head", branch: "ECS", id: "124A7051", council: "Junior Council" }
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
      scopeList: [
        "Annual chapter magazine & technical research digests",
        "Formal proceedings of seminars, symposia & hackathons",
        "Newsletter editorial curation & departmental archives",
        "Documentation standards for student engineering papers"
      ],
      mentors: [
        { name: "Shardul Gade", role: "Secretary", branch: "ECS", id: "123A7016", council: "Senior Council" }
      ],
      heads: [
        { name: "Indrayani Patil", role: "Joint Secretary", branch: "CE", id: "124A1118", council: "Junior Council" },
        { name: "Aditya Bagwe", role: "Joint Secretary", branch: "ECS", id: "124A7003", council: "Junior Council" }
      ],
      coordinators: coordinatorsData.editorial || []
    }
  ];

  const currentWing = selectedWingIndex === 'core' 
    ? chapterCoreData 
    : (domainWings[selectedWingIndex] || domainWings[0]);

  return (
    <div id="team" className="relative text-zinc-900 bg-white">
      {/* ========================================================================= */}
      {/* 03 — DIRECTORY SECTIONS: DOMAIN WINGS, SENIOR COUNCIL, JUNIOR COUNCIL     */}
      {/* ========================================================================= */}
      <section id="domains" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-black/[0.06]">
        
        {/* Section Header & Subtitle */}
        <div className="max-w-3xl mb-8 sm:mb-10">

          <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight mb-3">
            {activeView === 'domains' && 'Domain Universe'}
            {activeView === 'senior' && 'Senior Council'}
            {activeView === 'junior' && 'Junior Council'}
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
            {activeView === 'domains' && "Explore the chapter's multidisciplinary departments. Select any domain node or deck to inspect its coordinators and leadership."}
            {activeView === 'senior' && "Executive leadership and domain mentors directing chapter strategy, multidisciplinary initiatives, and technical symposiums."}
            {activeView === 'junior' && "Operational wing heads and student coordinators driving hands-on execution across technical, design, editorial, and outreach programs."}
          </p>
        </div>

        {/* Directory View Switcher Tabs (Simplified Minimal Design) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none border-b border-black/[0.06]">
          <button
            type="button"
            onClick={() => handleViewChange('domains')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer border-b-2 -mb-[1px] ${
              activeView === 'domains'
                ? 'border-[#0062FF] text-[#0062FF]'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Domain Universe (6 Wings)
          </button>
          <button
            type="button"
            onClick={() => handleViewChange('senior')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer border-b-2 -mb-[1px] ${
              activeView === 'senior'
                ? 'border-[#0062FF] text-[#0062FF]'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Senior Council ({seniorCouncil.length})
          </button>
          <button
            type="button"
            onClick={() => handleViewChange('junior')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer border-b-2 -mb-[1px] ${
              activeView === 'junior'
                ? 'border-[#0062FF] text-[#0062FF]'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Junior Council ({juniorCouncil.length})
          </button>
        </div>

        {/* ===================================================================== */}
        {/* VIEW 1: DOMAIN UNIVERSE & INTERACTIVE NODE GRAPH                     */}
        {/* ===================================================================== */}
        {activeView === 'domains' && (
          <div className="animate-fadeIn">
            {/* Interactive Domain Spiderweb Graph */}
            <DomainSpiderwebGraph
              chapterCoreData={chapterCoreData}
              domainWings={domainWings}
              selectedWingIndex={selectedWingIndex}
              onSelectWing={handleSelectWing}
            />

            {/* Selected Wing Detail Panel: MemberCard Responsive Directory */}
            <div 
              ref={deckRef} 
              key={currentWing.id} 
              className="bg-[#FAFBFD] rounded-3xl border border-black/[0.08] p-6 sm:p-10 shadow-xs animate-fadeIn scroll-mt-24"
            >
              
              <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 mb-8 border-b border-black/[0.08] gap-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-4xl font-black text-zinc-950">
                    {currentWing.fullName}
                  </h3>
                </div>

                <div className="max-w-md">
                  <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed mb-2.5">
                    {currentWing.subtext}
                  </p>
                  {currentWing.scopeList && (
                    <ul className="space-y-1 text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed list-disc list-inside">
                      {currentWing.scopeList.map((scope, i) => (
                        <li key={i}>{scope}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Sub-section 1: Advisory & Senior Mentors (if present) */}
              {currentWing.mentors && currentWing.mentors.length > 0 && (
                <div className="mb-10">
                  <div className="mb-4 pb-2 border-b border-black/[0.06]">
                    <h4 className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wider">
                      Advisory & Mentorship ({currentWing.mentors.length})
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentWing.mentors.map((m) => (
                      <MemberCard 
                        key={m.id || m.name} 
                        member={enrichMember(m)} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-section 2: Wing Leadership & Heads (if present) */}
              {currentWing.heads && currentWing.heads.length > 0 && (
                <div className="mb-10">
                  <div className="mb-4 pb-2 border-b border-black/[0.06]">
                    <h4 className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wider">
                      Wing Leadership ({currentWing.heads.length})
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentWing.heads.map((h) => (
                      <MemberCard 
                        key={h.id || h.name} 
                        member={enrichMember(h)} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-section 3: Domain Coordinators (if present) */}
              {currentWing.coordinators && currentWing.coordinators.length > 0 && (
                <div>
                  <div className="mb-4 pb-2 border-b border-black/[0.06]">
                    <h4 className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wider">
                      Domain Coordinators ({currentWing.coordinators.length})
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentWing.coordinators.map((c) => (
                      <MemberCard 
                        key={c.id || c.name} 
                        member={enrichMember(c)} 
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 2: SENIOR COUNCIL (ALL 14 MEMBERS)                              */}
        {/* ===================================================================== */}
        {activeView === 'senior' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {seniorCouncil.map((member) => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                />
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 3: JUNIOR COUNCIL (ALL 14 MEMBERS)                              */}
        {/* ===================================================================== */}
        {activeView === 'junior' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {juniorCouncil.map((member) => (
                <MemberCard 
                  key={member.id} 
                  member={enrichMember(member)} 
                />
              ))}
            </div>
          </div>
        )}

      </section>

    </div>
  );
}
