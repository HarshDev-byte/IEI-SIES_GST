import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  FlaskConical, 
  GraduationCap, 
  ArrowUpRight, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function CorePlatform({ 
  onOpenMembership, 
  onOpenVerify, 
  onOpenSearch,
  onSelectService
}) {
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      id: 'membership',
      number: '01',
      title: 'MEMBERSHIP',
      tagline: 'Join India’s engineering community.',
      desc: 'Connect with over 927,000 engineers across 15 disciplines. Access state centres, worldwide chapters, technical libraries, and voting rights in the national council.',
      metrics: ['266K+ Corporate', '125+ Centres', '15 Disciplines'],
      action: 'Apply for Membership',
      handler: onOpenMembership,
      category: 'community',
      visualCode: 'MEM-SYS-9001'
    },
    {
      id: 'certification',
      number: '02',
      title: 'CERTIFICATION',
      tagline: 'Professional recognition that travels with you.',
      desc: 'Elevate your engineering standing through Chartered Engineer (CEng) and Professional Engineer (PE) credentials, legally recognized for statutory appraisals and international reciprocity.',
      metrics: ['CEng Registry', 'PE India', 'IntPE Mobility'],
      action: 'Verify & Apply',
      handler: onOpenVerify,
      category: 'standards',
      visualCode: 'CRT-REG-4010'
    },
    {
      id: 'publications',
      number: '03',
      title: 'PUBLICATIONS',
      tagline: 'Engineering knowledge, published.',
      desc: 'Flagship peer-reviewed journals published with Springer Nature across 5 distinct Series, including monographic compendiums, conference proceedings, and technical guidelines.',
      metrics: ['Springer Series A-E', 'Scopus Q2', 'Annual Reviews'],
      action: 'Explore Journals',
      handler: () => onSelectService('publications'),
      category: 'knowledge',
      visualCode: 'PUB-DOI-1920'
    },
    {
      id: 'events',
      number: '04',
      title: 'TECHNICAL EVENTS',
      tagline: 'Where engineering ideas meet.',
      desc: 'National Conventions, the Indian Engineering Congress (IEC), international symposia, and inter-institutional student hackathons across major industrial hubs.',
      metrics: ['IEC 2026', 'Awards Conclave', 'Webinar Series'],
      action: 'View Calendar',
      handler: () => onSelectService('events'),
      category: 'events',
      visualCode: 'EVT-CNV-2026'
    },
    {
      id: 'research',
      number: '05',
      title: 'RESEARCH & GRANTS',
      tagline: 'Support the next generation of engineering.',
      desc: 'Competitive seed capital, laboratory equipment grants, and postdoctoral sponsorship for breakthroughs in sustainable materials, robotics, AI, and green hydrogen.',
      metrics: ['₹12.5 Cr Funds', '340+ Grants', '15 CoE Labs'],
      action: 'R&D Proposals',
      handler: () => onSelectService('research'),
      category: 'knowledge',
      visualCode: 'RND-GNT-8802'
    },
    {
      id: 'education',
      number: '06',
      title: 'EDUCATION & CPD',
      tagline: 'Keep learning. Keep leading.',
      desc: 'Administered through the Engineering Staff College of India (ESCI), offering executive masterclasses, continuous professional development points, and EV battery certifications.',
      metrics: ['ESCI Campus', 'EV Battery Cert', 'CPD Points'],
      action: 'ESCI Programs',
      handler: () => onSelectService('education'),
      category: 'standards',
      visualCode: 'EDU-CPD-5500'
    }
  ];

  return (
    <section id="platform-services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
        <div>
          <div className="badge-cad-blue mb-3">
            IEI CORE ECOSYSTEM PLATFORMS
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-ultra-tight">
            Engineered for Impact.
          </h2>
        </div>

        <p className="text-white/60 text-sm sm:text-base max-w-md mt-4 md:mt-0 font-normal">
          Six foundational pillars powering India’s engineering infrastructure, research accreditation, and professional mobility.
        </p>
      </div>

      {/* 6 EDITORIAL MODULES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="glass-panel p-6 sm:p-8 rounded border border-white/10 hover:border-[#00D6FF]/50 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
            data-cursor="INSPECT"
          >
            {/* Top Border Expand Effect */}
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#075BFF] to-[#00D6FF] group-hover:w-full transition-all duration-500" />
            
            {/* Crosshair accents */}
            <div className="crosshair-corner crosshair-tl opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="crosshair-corner crosshair-br opacity-30 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Card Meta Bar */}
              <div className="flex items-center justify-between font-mono text-[11px] text-white/40 mb-4">
                <span className="text-[#00D6FF] font-semibold">{svc.number}</span>
                <span className="tracking-widest">{svc.visualCode}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#00D6FF] transition-colors mb-2">
                {svc.title}
              </h3>
              <div className="text-xs font-mono text-[#D6A85F] mb-4">
                "{svc.tagline}"
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 font-normal">
                {svc.desc}
              </p>

              {/* Key Highlights / Metrics tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {svc.metrics.map((m) => (
                  <span 
                    key={m} 
                    className="text-[11px] font-mono text-white/60 bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.06]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Trigger */}
            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                if (svc.handler) svc.handler();
              }}
              className="w-full py-3 px-4 rounded border border-white/15 group-hover:border-[#00D6FF]/60 text-white group-hover:text-[#00D6FF] font-medium text-xs tracking-tight flex items-center justify-between transition-all bg-white/[0.02] group-hover:bg-[#00D6FF]/5"
            >
              <span>{svc.action}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}
