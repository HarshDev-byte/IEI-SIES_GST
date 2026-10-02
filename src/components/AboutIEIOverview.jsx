import React, { useRef } from 'react';
import { ExternalLink, ArrowRight, ShieldCheck, Award, MapPin } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { useScrollReveal } from '../utils/scrollReveal';

/**
 * ============================================================================
 * IEI SIES GST — ABOUT IEI & SIES GST CHAPTER OVERVIEW
 * Editorial two-column layout, clear hierarchy, restrained metadata, and
 * clean typographic Mission & Mandate section without card bloat or grey divider lines.
 * Enhanced with 240Hz hardware-accelerated scroll-reveal transitions.
 * ============================================================================
 */

export default function AboutIEIOverview({ onOpenMembership }) {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const institutionalSpecifications = [
    {
      label: "Incorporation Authority",
      value: "Royal Charter (9 Sept 1935)",
      detail: "Granted by King George V · Perpetual Statutory Body Corporate"
    },
    {
      label: "Constitutional Status",
      value: "Article 372 Continuity",
      detail: "Preserved under the Constitution of the Republic of India"
    },
    {
      label: "Apex Governance",
      value: "National Council & President",
      detail: "Headquarters: 8 Gokhale Road, Kolkata - 700020, West Bengal"
    },
    {
      label: "National Footprint",
      value: "100+ State & Local Centres",
      detail: "1,000,000+ engineers worldwide spanning 15 statutory divisions"
    },
    {
      label: "Bilateral & Global Representation",
      value: "WFEO · CEC · WMC · fib · FEISCA",
      detail: "India's sole representative to apex international engineering federations"
    },
    {
      label: "Scientific R&D Status",
      value: "DSIR Approved SIRO",
      detail: "Ministry of Science & Technology · Direct Grant-in-Aid funding"
    }
  ];

  const supportingDirectives = [
    {
      num: "01",
      title: "Technological Advancement & Sovereignty",
      desc: "Promoting the general advancement of engineering, indigenous system design, and the applied practical application of technology across Indian industry and academia."
    },
    {
      num: "02",
      title: "Scholarly Dissemination & Peer-Reviewed Journals",
      desc: "Publishing five series of international peer-reviewed journals in co-publication with Springer Nature, indexed globally in Scopus, INSPEC, and citation repositories."
    },
    {
      num: "03",
      title: "Direct Research Grants & Laboratory Sponsorship",
      desc: "Disbursing annual Grant-in-Aid research funding under DSIR SIRO recognition to undergraduate, postgraduate, and doctoral researchers developing hardware and algorithmic prototypes."
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" 
      aria-label="About The Institution of Engineers (India) and SIES GST Chapter"
    >
      {/* ===================================================================== */}
      {/* 01. EDITORIAL TWO-COLUMN INSTITUTIONAL OVERVIEW                      */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-20 sm:pb-28">
        
        {/* LEFT COLUMN: PRIMARY EDITORIAL NARRATIVE (240Hz Smooth Scroll Reveal) */}
        <div className="lg:col-span-7 flex flex-col justify-start reveal-on-scroll">
          <div className="font-mono text-xs font-semibold text-[#0062FF] uppercase tracking-wider mb-3">
            National Statutory Apex Body · Estd. 1920
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.14] mb-6">
            The Institution of Engineers (India)
          </h2>

          <p className="font-sans text-lg sm:text-xl text-zinc-900 leading-relaxed font-normal mb-6">
            Established on <strong>13 September 1920</strong> in Kolkata and incorporated by <strong>Royal Charter in 1935</strong>, IEI is the sovereign multi-disciplinary professional body representing over <strong>one million engineers</strong> across 15 engineering disciplines in India and abroad.
          </p>

          <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed mb-6 font-normal">
            Following independence, the Institution was formally preserved as an autonomous <strong>Body Corporate under Article 372</strong> of the Constitution of India. It operates over 100 State and Local Centres, holds bilateral agreements with more than 30 national engineering societies, and serves as India&apos;s National Member on the <strong>World Federation of Engineering Organizations (WFEO)</strong> under UNESCO auspices.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-zinc-500 font-medium">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#0062FF]" />
              <span>National Secretariat: 8 Gokhale Road, Kolkata</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Article 372 Perpetual Seal</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESTRAINED OPEN STATUTORY SPECIFICATIONS LIST (240Hz Staggered) */}
        <div className="lg:col-span-5 flex flex-col justify-between pt-2 reveal-on-scroll reveal-delay-2">
          <div>
            <div className="font-mono text-xs font-bold text-zinc-900 uppercase tracking-wider mb-6">
              Institutional Specifications
            </div>

            <div className="space-y-6">
              {institutionalSpecifications.map((spec, i) => (
                <div key={i} className={`flex flex-col reveal-on-scroll reveal-delay-${(i % 5) + 1}`}>
                  <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="font-sans text-sm font-bold text-zinc-950 mt-0.5">
                    {spec.value}
                  </span>
                  <span className="text-xs text-zinc-600 mt-0.5 leading-relaxed font-normal">
                    {spec.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between text-xs reveal-on-scroll reveal-delay-4">
            <span className="text-zinc-500 font-medium">Official Registry Verified</span>
            <a 
              href="https://www.ieindia.org" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => audioEngine?.playClick && audioEngine.playClick()}
              className="inline-flex items-center gap-1.5 font-semibold text-[#0062FF] hover:text-[#0052D6] transition-colors"
            >
              <span>ieindia.org</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>

      {/* ===================================================================== */}
      {/* 02. CLEAN EDITORIAL MISSION & MANDATE                                */}
      {/* ===================================================================== */}
      <div className="py-20 sm:py-28">
        
        {/* Mission Statement (240Hz Smooth Reveal) */}
        <div className="mb-14 sm:mb-16 reveal-on-scroll">
          <div className="font-mono text-xs font-semibold text-[#0062FF] uppercase tracking-wider mb-2">
            Institutional Mission
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 leading-snug tracking-tight max-w-5xl">
            &ldquo;To effectively promote the general advancement of engineering, engineering science and technology, and their practical application across all indigenous sectors in India.&rdquo;
          </blockquote>
        </div>

        {/* Mandate Statement (240Hz Smooth Reveal) */}
        <div className="mb-14 sm:mb-16 reveal-on-scroll reveal-delay-2">
          <div className="font-mono text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Statutory Mandate
          </div>
          <p className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-800 leading-snug tracking-tight max-w-5xl">
            &ldquo;To maintain standards of professional ethics and competency, certify practicing engineers under national and international registers, and extend value-based advisory and engineering services to the nation.&rdquo;
          </p>
        </div>

        {/* 3 Concise Supporting Points Separated by Typography, Numbers and Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-4">
          {supportingDirectives.map((d, idx) => (
            <div key={d.num} className={`flex flex-col reveal-on-scroll reveal-delay-${idx + 1}`}>
              <span className="font-mono text-xs font-bold text-[#0062FF] mb-2">
                {d.num}
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-zinc-950 mb-2 leading-snug">
                {d.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                {d.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ===================================================================== */}
      {/* 03. SIES GST STUDENT CHAPTER (DEPARTMENT OF ECS)                    */}
      {/* ===================================================================== */}
      <div className="pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
          
          <div className="lg:col-span-5 reveal-on-scroll">
            <div className="font-mono text-xs font-semibold text-[#0062FF] uppercase tracking-wider mb-2">
              SIES GST Student Chapter
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
              Department of Electronics &amp; Computer Science
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
              Operating within SIES Graduate School of Technology, Nerul, the chapter bridges national statutory engineering credentials with hands-on hardware testbenches, algorithmic hackathons, and technical symposia.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 sm:gap-8 justify-between pt-4 sm:pt-0 reveal-on-scroll reveal-delay-2">
            <div>
              <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                Departmental Patron
              </div>
              <div className="font-display text-base font-bold text-zinc-950 mt-1">
                Dr. Shubhangi Kharche
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">
                Head of Department · ECS
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                Faculty Coordinator
              </div>
              <div className="font-display text-base font-bold text-zinc-950 mt-1">
                Prof. Jasmin Hirani
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">
                Assistant Professor · ECS
              </div>
            </div>

            <div className="self-start sm:self-center">
              <a
                href="#/team"
                onClick={() => audioEngine?.playClick && audioEngine.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white text-xs font-semibold transition-all shadow-xs"
              >
                <span>Executive Leadership &amp; Wings</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
