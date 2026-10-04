import React, { useState, useRef, useEffect } from 'react';
import { facultyLeadership, seniorCouncil } from '../data/membersData';
import { audioEngine } from '../utils/audioEngine';
import './LeadershipSpotlight.css';

/**
 * ============================================================================
 * IEI SIES GST — LEADERSHIP SPOTLIGHT
 * 01 — FACULTY LEADERSHIP (Unified Studio Composition • IEI Emblem • Grayscale-to-Color)
 * 02 — EXECUTIVE LEADERSHIP (Unified 4-Person Composition • 4-Mask Channel Architecture)
 * 
 * Strict Architectural Guarantees:
 * 1. Pure clean white studio background.
 * 2. Official crisp IEI SVG emblem centered behind faculty members.
 * 3. Both faculty members and chairs preserved completely intact.
 * 4. 100% grayscale by default; hover/tap selectively reveals only the active
 *    person in full natural color via precise silhouette masks.
 * 5. NO below-image cards. Information is purely editorial typography
 *    integrated into the image interaction.
 * 6. Click navigates to the simplified profile page (/team/:slug).
 * ============================================================================
 */

export default function LeadershipSpotlight() {
  // Active faculty selection: 'hirani' | 'kharche' | null
  const [activeFaculty, setActiveFaculty] = useState(null);

  // Active executive selection: 'chairperson' | 'vice-chairperson' | 'secretary' | 'treasurer' | null
  const [activeExecutive, setActiveExecutive] = useState(null);

  const stageRef = useRef(null);
  const lastTouchTimeRef = useRef(0);

  // Authoritative Faculty Data
  // LEFT: Prof. Jasmin Hirani (Student Branch Coordinator)
  const hiraniMember = facultyLeadership.find(m => m.name.includes('Jasmin') || m.id === 'FAC-02') || {
    id: "FAC-02",
    slug: "jasmin-hirani",
    name: "Prof. Jasmin Hirani",
    role: "Student Branch Coordinator",
    branch: "ECS"
  };

  // RIGHT: Dr. Shubhangi Kharche (HOD)
  const kharcheMember = facultyLeadership.find(m => m.name.includes('Kharche') || m.id === 'FAC-01') || {
    id: "FAC-01",
    slug: "shubhangi-kharche",
    name: "Dr. Shubhangi Kharche",
    role: "HOD",
    branch: "ECS"
  };

  // 4 Core Executive Members
  const chairpersonMember = seniorCouncil.find(m => m.role === 'Chairperson') || seniorCouncil[0];
  const viceChairMember = seniorCouncil.find(m => m.role === 'Vice Chairperson') || seniorCouncil[1];
  const secretaryMember = seniorCouncil.find(m => m.role === 'Secretary') || seniorCouncil[2];
  const treasurerMember = seniorCouncil.find(m => m.role === 'Treasurer') || seniorCouncil[3];

  const executiveList = [
    { key: 'chairperson', member: chairpersonMember, maskClass: 'mask-chairperson', label: 'Chairperson', slotIndex: 0 },
    { key: 'vice-chairperson', member: viceChairMember, maskClass: 'mask-vice-chairperson', label: 'Vice Chairperson', slotIndex: 1 },
    { key: 'secretary', member: secretaryMember, maskClass: 'mask-secretary', label: 'Secretary', slotIndex: 2 },
    { key: 'treasurer', member: treasurerMember, maskClass: 'mask-treasurer', label: 'Treasurer', slotIndex: 3 },
  ];

  // Touch tracking for mobile tap handling
  const handleTouchStart = () => {
    lastTouchTimeRef.current = Date.now();
  };

  // Close active states when tapping outside
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (stageRef.current && !stageRef.current.contains(e.target)) {
        setActiveFaculty(null);
        setActiveExecutive(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Keyboard navigation escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveFaculty(null);
        setActiveExecutive(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover handlers for Faculty
  const handleFacultyHover = (key) => {
    if (Date.now() - lastTouchTimeRef.current < 500) return;
    setActiveFaculty(key);
    if (key && audioEngine?.playHover) {
      audioEngine.playHover();
    }
  };

  // Click & Mobile Tap Handler for Faculty -> Profile
  const handleFacultyClick = (key, member) => {
    // On mobile tap, if not active, first activate
    const isTouch = Date.now() - lastTouchTimeRef.current < 500;
    if (isTouch && activeFaculty !== key) {
      setActiveFaculty(key);
      if (audioEngine?.playHover) audioEngine.playHover();
      return;
    }
    
    // Otherwise open profile
    if (audioEngine?.playClick) audioEngine.playClick();
    const slug = member?.slug || (key === 'hirani' ? 'jasmin-hirani' : 'shubhangi-kharche');
    window.location.hash = `#/team/${slug}`;
  };

  // Hover handlers for Executive
  const handleExecutiveHover = (key) => {
    if (Date.now() - lastTouchTimeRef.current < 500) return;
    setActiveExecutive(key);
    if (key && audioEngine?.playHover) {
      audioEngine.playHover();
    }
  };

  // Click & Mobile Tap Handler for Executive -> Profile
  const handleExecutiveClick = (key, member) => {
    const isTouch = Date.now() - lastTouchTimeRef.current < 500;
    if (isTouch && activeExecutive !== key) {
      setActiveExecutive(key);
      if (audioEngine?.playHover) audioEngine.playHover();
      return;
    }

    if (audioEngine?.playClick) audioEngine.playClick();
    const target = member?.slug || member?.id;
    if (target) {
      window.location.hash = `#/team/${target}`;
    }
  };

  return (
    <div className="leadership-spotlight-root px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto" ref={stageRef}>
      
      {/* ===================================================================== */}
      {/* 01 — FACULTY LEADERSHIP                                              */}
      {/* PURE WHITE STUDIO BACKGROUND • CENTERED CRISP IEI SVG EMBLEM         */}
      {/* TWO PEOPLE + CHAIRS INTACT • MONOCHROME-TO-COLOR SILHOUETTE MASKS    */}
      {/* INTEGRATED EDITORIAL TYPOGRAPHY — NO BELOW-IMAGE CARDS               */}
      {/* ===================================================================== */}
      <section className="mb-24 lg:mb-32" aria-labelledby="heading-faculty-leadership">
        
        {/* Section Header */}
        <div className="leadership-section-header text-center sm:text-left">

          <h2 id="heading-faculty-leadership" className="leadership-heading">
            Academic Governance
          </h2>
          <p className="leadership-subheading">
            Institutional stewardship and academic direction steering the SIES Graduate School of Technology Student Chapter.
          </p>
        </div>

        {/* UNIFIED HERO-STYLE FACULTY LEADERSHIP COMPOSITION */}
        <div className="faculty-hero-stage-wrapper">
          <div 
            className={`faculty-hero-stage ${activeFaculty ? 'has-active-person' : ''}`}
            onTouchStart={handleTouchStart}
            onMouseLeave={() => handleFacultyHover(null)}
          >
            {/* LAYER 0: Pure Clean White Background */}
            <div className="faculty-white-backdrop" aria-hidden="true" />

            {/* LAYER 1: Official Crisp IEI SVG Emblem (Centered Behind People) */}
            <div className="faculty-emblem-wrap" aria-hidden="true">
              <img 
                src="/iei-emblem.svg" 
                alt="" 
                className="faculty-iei-emblem"
                loading="eager"
              />
            </div>

            {/* LAYER 2: Cutout People + Chairs in 100% Grayscale (Base Layer) */}
            <picture>
              <source srcSet="/assets/faculty-leadership-cutout.webp" type="image/webp" />
              <img
                src="/assets/faculty-leadership-cutout.png"
                alt="Faculty Leadership of IEI SIES GST: Prof. Jasmin Hirani and Dr. Shubhangi Kharche"
                className="faculty-photo-layer faculty-photo-base"
                loading="eager"
              />
            </picture>

            {/* LAYER 3: Same Cutout in Full Natural Color, masked to Prof. Jasmin Hirani (LEFT) */}
            <div 
              className={`faculty-photo-layer faculty-color-layer faculty-mask-hirani ${activeFaculty === 'hirani' ? 'is-visible' : ''}`}
              aria-hidden="true"
            >
              <picture>
                <source srcSet="/assets/faculty-leadership-cutout.webp" type="image/webp" />
                <img
                  src="/assets/faculty-leadership-cutout.png"
                  alt=""
                  className="faculty-photo-inner-img"
                />
              </picture>
            </div>

            {/* LAYER 4: Same Cutout in Full Natural Color, masked to Dr. Shubhangi Kharche (RIGHT) */}
            <div 
              className={`faculty-photo-layer faculty-color-layer faculty-mask-kharche ${activeFaculty === 'kharche' ? 'is-visible' : ''}`}
              aria-hidden="true"
            >
              <picture>
                <source srcSet="/assets/faculty-leadership-cutout.webp" type="image/webp" />
                <img
                  src="/assets/faculty-leadership-cutout.png"
                  alt=""
                  className="faculty-photo-inner-img"
                />
              </picture>
            </div>

            {/* INTEGRATED EDITORIAL TYPOGRAPHY: LEFT PERSON (Prof. Jasmin Hirani) */}
            <div 
              className={`faculty-editorial-info info-left ${activeFaculty === 'hirani' ? 'is-revealed' : ''}`}
              aria-hidden={activeFaculty !== 'hirani'}
            >
              <div className="editorial-role-tag">Student Branch Coordinator</div>
              <div className="editorial-name">Prof. Jasmin Hirani</div>
              <div className="editorial-meta">Dept. of ECS • SIES GST</div>
            </div>

            {/* INTEGRATED EDITORIAL TYPOGRAPHY: RIGHT PERSON (Dr. Shubhangi Kharche) */}
            <div 
              className={`faculty-editorial-info info-right ${activeFaculty === 'kharche' ? 'is-revealed' : ''}`}
              aria-hidden={activeFaculty !== 'kharche'}
            >
              <div className="editorial-role-tag">Head of Department</div>
              <div className="editorial-name">Dr. Shubhangi Kharche</div>
              <div className="editorial-meta">HOD, Dept. of ECS • SIES GST</div>
            </div>

            {/* INTERACTIVE HIT REGIONS (ERGONOMIC OVERLAYS OVER EACH PERSON) */}
            {/* HIT ZONE 1: Prof. Jasmin Hirani (LEFT) */}
            <button
              type="button"
              className={`faculty-hit-zone faculty-hit-left ${activeFaculty === 'hirani' ? 'hit-active' : ''}`}
              onMouseEnter={() => handleFacultyHover('hirani')}
              onMouseOver={() => handleFacultyHover('hirani')}
              onPointerEnter={() => handleFacultyHover('hirani')}
              onMouseLeave={() => handleFacultyHover(null)}
              onPointerLeave={() => handleFacultyHover(null)}
              onFocus={() => handleFacultyHover('hirani')}
              onBlur={() => handleFacultyHover(null)}
              onClick={() => handleFacultyClick('hirani', hiraniMember)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFacultyClick('hirani', hiraniMember);
                }
              }}
              aria-label="Prof. Jasmin Hirani, Student Branch Coordinator. Click to view profile."
              tabIndex={0}
            >
              <span className="sr-only">Prof. Jasmin Hirani, Student Branch Coordinator</span>
            </button>

            {/* HIT ZONE 2: Dr. Shubhangi Kharche (RIGHT) */}
            <button
              type="button"
              className={`faculty-hit-zone faculty-hit-right ${activeFaculty === 'kharche' ? 'hit-active' : ''}`}
              onMouseEnter={() => handleFacultyHover('kharche')}
              onMouseOver={() => handleFacultyHover('kharche')}
              onPointerEnter={() => handleFacultyHover('kharche')}
              onMouseLeave={() => handleFacultyHover(null)}
              onPointerLeave={() => handleFacultyHover(null)}
              onFocus={() => handleFacultyHover('kharche')}
              onBlur={() => handleFacultyHover(null)}
              onClick={() => handleFacultyClick('kharche', kharcheMember)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFacultyClick('kharche', kharcheMember);
                }
              }}
              aria-label="Dr. Shubhangi Kharche, HOD. Click to view profile."
              tabIndex={0}
            >
              <span className="sr-only">Dr. Shubhangi Kharche, HOD</span>
            </button>

          </div>

          {/* MOBILE EDITORIAL DETAILS CARD (Visible only on mobile < 640px, never overlaps faces) */}
          <div className="sm:hidden mt-3 p-3.5 rounded-xl border border-black/[0.08] bg-white shadow-xs transition-all">
            {activeFaculty === 'hirani' ? (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0062FF] truncate">Student Branch Coordinator</div>
                  <div className="text-base font-bold text-zinc-950 truncate">Prof. Jasmin Hirani</div>
                  <div className="text-xs text-zinc-500 truncate">Dept. of ECS • SIES GST</div>
                </div>
                <a 
                  href={`#/team/${hiraniMember.slug}`} 
                  onClick={() => audioEngine?.playClick && audioEngine.playClick()}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0062FF] font-semibold text-xs shrink-0 hover:bg-blue-100 transition-colors"
                >
                  View Profile →
                </a>
              </div>
            ) : activeFaculty === 'kharche' ? (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0062FF] truncate">Head of Department</div>
                  <div className="text-base font-bold text-zinc-950 truncate">Dr. Shubhangi Kharche</div>
                  <div className="text-xs text-zinc-500 truncate">HOD, Dept. of ECS • SIES GST</div>
                </div>
                <a 
                  href={`#/team/${kharcheMember.slug}`} 
                  onClick={() => audioEngine?.playClick && audioEngine.playClick()}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0062FF] font-semibold text-xs shrink-0 hover:bg-blue-100 transition-colors"
                >
                  View Profile →
                </a>
              </div>
            ) : (
              <div className="text-center py-1 text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                <span>👆 Tap a faculty member above to inspect profile</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 02 — EXECUTIVE LEADERSHIP                                            */}
      {/* ONE SINGLE FOUR-PERSON GROUP PHOTOGRAPH • 4-MASK CHANNEL SYSTEM       */}
      {/* INTEGRATED EDITORIAL TYPOGRAPHY — NO BELOW-IMAGE CARDS               */}
      {/* ===================================================================== */}
      <section className="mb-24 lg:mb-32" aria-labelledby="heading-executive-leadership">
        <div className="leadership-section-header text-center sm:text-left">

          <h2 id="heading-executive-leadership" className="leadership-heading">
            Executive Council
          </h2>
          <p className="leadership-subheading">
            Student leadership managing chapter operations, engineering initiatives, community outreach, and technical excellence.
          </p>
        </div>

        {/* 4-PERSON EXECUTIVE GROUP STAGE */}
        <div className="executive-hero-stage-wrapper">
          <div 
            className={`executive-hero-stage ${activeExecutive ? 'has-active-person' : ''}`}
            onTouchStart={handleTouchStart}
            onMouseLeave={() => handleExecutiveHover(null)}
          >
            {/* LAYER 0: Clean White Backdrop */}
            <div className="executive-white-backdrop" aria-hidden="true" />

            {/* LAYER 1: Base Photograph in 100% Monochrome / Grayscale */}
            <img
              src="/assets/executive-leadership-placeholder.jpg"
              alt="Executive Leadership: Chairperson, Vice Chairperson, Secretary, and Treasurer"
              className="executive-photo-layer executive-photo-base"
              loading="lazy"
            />

            {/* LAYER 2: 4 Individual Color Overlay Layers masked to each executive */}
            {executiveList.map(({ key, maskClass }) => (
              <div
                key={key}
                className={`executive-photo-layer executive-color-layer ${maskClass} ${activeExecutive === key ? 'is-visible' : ''}`}
                aria-hidden="true"
              >
                <img
                  src="/assets/executive-leadership-placeholder.jpg"
                  alt=""
                  className="executive-photo-inner-img"
                />
              </div>
            ))}

            {/* INTEGRATED EDITORIAL TYPOGRAPHY FOR EXECUTIVE MEMBERS */}
            {executiveList.map(({ key, member, label, slotIndex }) => {
              const isActive = activeExecutive === key;
              return (
                <div
                  key={`info-${key}`}
                  className={`executive-editorial-info exec-info-slot-${slotIndex} ${isActive ? 'is-revealed' : ''}`}
                  aria-hidden={!isActive}
                >
                  <div className="editorial-role-tag">{label}</div>
                  <div className="editorial-name">{member?.name || label}</div>
                  {member?.branch && (
                    <div className="editorial-meta">Dept. of {member.branch} • 2026–2027</div>
                  )}
                </div>
              );
            })}

            {/* 4 INTERACTIVE HIT REGIONS */}
            <div className="executive-hit-grid">
              {executiveList.map(({ key, member, label }, idx) => (
                <button
                  key={key}
                  type="button"
                  className={`executive-hit-slot slot-${idx} ${activeExecutive === key ? 'hit-active' : ''}`}
                  onMouseEnter={() => handleExecutiveHover(key)}
                  onMouseOver={() => handleExecutiveHover(key)}
                  onPointerEnter={() => handleExecutiveHover(key)}
                  onMouseLeave={() => handleExecutiveHover(null)}
                  onPointerLeave={() => handleExecutiveHover(null)}
                  onFocus={() => handleExecutiveHover(key)}
                  onBlur={() => handleExecutiveHover(null)}
                  onClick={() => handleExecutiveClick(key, member)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleExecutiveClick(key, member);
                    }
                  }}
                  aria-label={`${member?.name || label}, ${member?.role || label}. Click to view profile.`}
                  tabIndex={0}
                >
                  <span className="sr-only">{member?.name || label}, {member?.role || label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* MOBILE EDITORIAL DETAILS CARD (Visible only on mobile < 640px, never overlaps faces) */}
          <div className="sm:hidden mt-3 p-3.5 rounded-xl border border-black/[0.08] bg-white shadow-xs transition-all">
            {activeExecutive ? (() => {
              const selected = executiveList.find(e => e.key === activeExecutive);
              const m = selected?.member;
              return (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0062FF] truncate">{selected?.label}</div>
                    <div className="text-base font-bold text-zinc-950 truncate">{m?.name || selected?.label}</div>
                    {m?.branch && <div className="text-xs text-zinc-500 truncate">Dept. of {m.branch} • 2026–2027</div>}
                  </div>
                  {m?.slug && (
                    <a 
                      href={`#/team/${m.slug}`} 
                      onClick={() => audioEngine?.playClick && audioEngine.playClick()}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0062FF] font-semibold text-xs shrink-0 hover:bg-blue-100 transition-colors"
                    >
                      View Profile →
                    </a>
                  )}
                </div>
              );
            })() : (
              <div className="text-center py-1 text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                <span>👆 Tap an executive above to inspect profile</span>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
