import React, { useState, useRef, useEffect } from 'react';
import { facultyLeadership, seniorCouncil } from '../data/membersData';
import { audioEngine } from '../utils/audioEngine';
import KineticRosette from './KineticRosette';
import KineticExecutiveOrbit from './KineticExecutiveOrbit';
import './LeadershipSpotlight.css';

/**
 * ============================================================================
 * IEI SIES GST — EDITORIAL LEADERSHIP SPOTLIGHT
 * 01 — FACULTY LEADERSHIP ("Living Editorial Portrait")
 *      Large photography • Kinetic Mathematical Rosette • Centered IEI Emblem
 *      Grayscale-to-Colour Selective Reveal • Pure Typography (No Cards / Boxes)
 * 
 * 02 — EXECUTIVE COUNCIL ("Editorial Group Portrait")
 *      Large Group Photo • Kinetic Horizontal Orbit • 4-Mask Channel Architecture
 *      Grayscale-to-Colour Selection • Pure Typography (No Cards / Boxes)
 * ============================================================================
 */
export default function LeadershipSpotlight() {
  // Active faculty selection: 'kharche' (left) | 'hirani' (right) | null
  // Default to 'kharche' or null
  const [activeFaculty, setActiveFaculty] = useState('kharche');

  // Active executive selection: 'chairperson' | 'vice-chairperson' | 'secretary' | 'treasurer'
  const [activeExecutive, setActiveExecutive] = useState('chairperson');

  const stageRef = useRef(null);
  const lastTouchTimeRef = useRef(0);

  // Authoritative Faculty Data
  // LEFT in photo: Dr. Shubhangi Kharche (HOD)
  const kharcheMember = facultyLeadership.find(m => m.name.includes('Kharche') || m.id === 'FAC-01') || {
    id: "FAC-01",
    slug: "shubhangi-kharche",
    name: "Dr. Shubhangi Kharche",
    role: "Head of Department",
    branch: "ECS"
  };

  // RIGHT in photo: Prof. Jasmin Hirani (Student Branch Coordinator)
  const hiraniMember = facultyLeadership.find(m => m.name.includes('Jasmin') || m.id === 'FAC-02') || {
    id: "FAC-02",
    slug: "jasmin-hirani",
    name: "Prof. Jasmin Hirani",
    role: "Student Branch Coordinator",
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

  const activeExecItem = executiveList.find(e => e.key === activeExecutive) || executiveList[0];
  const activeExecMember = activeExecItem.member;

  // Touch tracking for mobile tap handling
  const handleTouchStart = () => {
    lastTouchTimeRef.current = Date.now();
  };

  // Hover handlers for Faculty
  const handleFacultyHover = (key) => {
    if (Date.now() - lastTouchTimeRef.current < 500) return;
    if (key) {
      setActiveFaculty(key);
      if (audioEngine?.playHover) audioEngine.playHover();
    }
  };

  // Click & Mobile Tap Handler for Faculty -> Profile
  const handleFacultyClick = (key, member) => {
    const isTouch = Date.now() - lastTouchTimeRef.current < 500;
    if (isTouch && activeFaculty !== key) {
      setActiveFaculty(key);
      if (audioEngine?.playHover) audioEngine.playHover();
      return;
    }
    
    setActiveFaculty(key);
    if (audioEngine?.playClick) audioEngine.playClick();
    const slug = member?.slug || (key === 'kharche' ? 'shubhangi-kharche' : 'jasmin-hirani');
    window.location.hash = `#/team/${slug}`;
  };

  // Hover handlers for Executive
  const handleExecutiveHover = (key) => {
    if (Date.now() - lastTouchTimeRef.current < 500) return;
    if (key) {
      setActiveExecutive(key);
      if (audioEngine?.playHover) audioEngine.playHover();
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

    setActiveExecutive(key);
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
      {/* "LIVING EDITORIAL PORTRAIT"                                           */}
      {/* Large Photography • Kinetic Mathematical Rosette • Centered Emblem    */}
      {/* Monochrome to Selective Colour Focus • Pure Typography               */}
      {/* ===================================================================== */}
      <section className="mb-24 sm:mb-32 lg:mb-40" aria-labelledby="heading-faculty-leadership">
        
        {/* Section Header */}
        <div className="leadership-section-header">
          {/* Eyebrow */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-zinc-900 font-bold">TEAM</span>
              <span className="inline-block w-8 sm:w-12 h-px bg-zinc-300"></span>
            </div>
            <div className="text-zinc-500 font-medium">IEI SIES GST</div>
          </div>

          {/* Section Title & Index */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
            <h2 id="heading-faculty-leadership" className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-zinc-950 tracking-tight leading-none">
              Faculty <span className="font-black text-[#0062FF]">Leadership</span>
            </h2>
            <div className="mt-2 sm:mt-0 font-mono text-sm sm:text-base font-bold text-zinc-400 tracking-wider">
              <span className="inline-block w-6 sm:w-8 h-px bg-zinc-300 align-middle mr-2"></span>
              01 / 03
            </div>
          </div>
        </div>

        {/* LARGE EDITORIAL FACULTY COMPOSITION */}
        <div className="faculty-editorial-stage-wrapper">
          <div 
            className="faculty-editorial-stage"
            onTouchStart={handleTouchStart}
          >
            {/* LAYER 0: Clean Studio White Backdrop */}
            <div className="faculty-white-backdrop" aria-hidden="true" />

            {/* LAYER 1: Kinetic Mathematical Rosette / Flower (Rotating Slowly Behind) */}
            <KineticRosette className="faculty-rosette-layer" />

            {/* LAYER 2: Official Crisp IEI Emblem (Static, Centered in Rosette Behind People) */}
            <div className="faculty-emblem-wrap" aria-hidden="true">
              <img 
                src="/iei-official-logo.png" 
                alt="Institution of Engineers India Official Seal" 
                className="faculty-iei-emblem"
                loading="eager"
              />
            </div>

            {/* LAYER 3: Responsive Stage Canvas for Cutout People & Silhouette Masks */}
            <div className="faculty-stage-canvas">
              {/* Base Layer: 100% Grayscale Cutout (Both People & Chairs) */}
              <picture>
                <source srcSet="/assets/faculty-leadership-cutout.webp" type="image/webp" />
                <img
                  src="/assets/faculty-leadership-cutout.png"
                  alt="Faculty Leadership of IEI SIES GST: Dr. Shubhangi Kharche and Prof. Jasmin Hirani"
                  className="faculty-photo-layer faculty-photo-base"
                  loading="eager"
                />
              </picture>

              {/* Color Layer 1: Dr. Shubhangi Kharche (LEFT PERSON) in Full Natural Warm Peach */}
              <div 
                className={`faculty-photo-layer faculty-color-layer faculty-mask-left ${activeFaculty === 'kharche' ? 'is-visible' : ''}`}
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

              {/* Color Layer 2: Prof. Jasmin Hirani (RIGHT PERSON) in Full Natural Saree Colour */}
              <div 
                className={`faculty-photo-layer faculty-color-layer faculty-mask-right ${activeFaculty === 'hirani' ? 'is-visible' : ''}`}
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

              {/* INTERACTIVE HIT REGIONS (ERGONOMIC OVERLAYS OVER EACH PERSON) */}
              {/* Hit Zone 1: Dr. Shubhangi Kharche (LEFT) */}
              <button
                type="button"
                className={`faculty-hit-zone faculty-hit-left ${activeFaculty === 'kharche' ? 'hit-active' : ''}`}
                onMouseEnter={() => handleFacultyHover('kharche')}
                onFocus={() => handleFacultyHover('kharche')}
                onClick={() => handleFacultyClick('kharche', kharcheMember)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFacultyClick('kharche', kharcheMember);
                  }
                }}
                aria-label="Dr. Shubhangi Kharche, Head of Department. Click to inspect."
                tabIndex={0}
              >
                <span className="sr-only">Dr. Shubhangi Kharche, Head of Department</span>
              </button>

              {/* Hit Zone 2: Prof. Jasmin Hirani (RIGHT) */}
              <button
                type="button"
                className={`faculty-hit-zone faculty-hit-right ${activeFaculty === 'hirani' ? 'hit-active' : ''}`}
                onMouseEnter={() => handleFacultyHover('hirani')}
                onFocus={() => handleFacultyHover('hirani')}
                onClick={() => handleFacultyClick('hirani', hiraniMember)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFacultyClick('hirani', hiraniMember);
                  }
                }}
                aria-label="Prof. Jasmin Hirani, Student Branch Coordinator. Click to inspect."
                tabIndex={0}
              >
                <span className="sr-only">Prof. Jasmin Hirani, Student Branch Coordinator</span>
              </button>
            </div>

          </div>
        </div>

        {/* PURE EDITORIAL TYPOGRAPHY UNDERNEATH — NO CARDS, NO BOXES */}
        <div className="grid grid-cols-2 gap-4 sm:gap-12 mt-6 sm:mt-10 px-2 sm:px-4 max-w-4xl mx-auto">
          {/* 01: Dr. Shubhangi Kharche (LEFT) */}
          <button
            type="button"
            onClick={() => handleFacultyClick('kharche', kharcheMember)}
            className={`text-left transition-all duration-300 cursor-pointer group outline-none ${
              activeFaculty === 'kharche' ? 'opacity-100' : 'opacity-45 hover:opacity-80'
            }`}
          >
            <div className="font-mono text-xs sm:text-sm font-bold text-[#0062FF] tracking-widest mb-1">
              01
            </div>
            <div className="font-display font-black text-sm sm:text-xl md:text-2xl text-zinc-950 tracking-tight leading-tight uppercase">
              Dr. Shubhangi Kharche
            </div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase mt-0.5 sm:mt-1">
              Head of Department
            </div>
            <div className={`h-0.5 bg-[#0062FF] mt-2 transition-all duration-300 ${activeFaculty === 'kharche' ? 'w-8 sm:w-12 opacity-100' : 'w-0 opacity-0'}`} />
          </button>

          {/* 02: Prof. Jasmin Hirani (RIGHT) */}
          <button
            type="button"
            onClick={() => handleFacultyClick('hirani', hiraniMember)}
            className={`text-left transition-all duration-300 cursor-pointer group outline-none ${
              activeFaculty === 'hirani' ? 'opacity-100' : 'opacity-45 hover:opacity-80'
            }`}
          >
            <div className="font-mono text-xs sm:text-sm font-bold text-[#0062FF] tracking-widest mb-1">
              02
            </div>
            <div className="font-display font-black text-sm sm:text-xl md:text-2xl text-zinc-950 tracking-tight leading-tight uppercase">
              Prof. Jasmin Hirani
            </div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase mt-0.5 sm:mt-1">
              Student Branch Coordinator
            </div>
            <div className={`h-0.5 bg-[#0062FF] mt-2 transition-all duration-300 ${activeFaculty === 'hirani' ? 'w-8 sm:w-12 opacity-100' : 'w-0 opacity-0'}`} />
          </button>
        </div>

        {/* Minimalist Section Progress Line Indicator */}
        <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-400 mt-8 sm:mt-12 pt-4 border-t border-zinc-100 max-w-4xl mx-auto">
          <span>01</span>
          <div className="flex-1 mx-4 sm:mx-8 h-px bg-zinc-200 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-[#0062FF]"></div>
          </div>
          <span>03</span>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 02 — EXECUTIVE COUNCIL                                               */}
      {/* "EDITORIAL GROUP PORTRAIT"                                            */}
      {/* Large Group Photo • Kinetic Horizontal Orbit Geometry                */}
      {/* Monochrome to Colour Selection • Pure Typography (No Cards / Boxes)  */}
      {/* ===================================================================== */}
      <section className="mb-24 sm:mb-32 lg:mb-40" aria-labelledby="heading-executive-leadership">
        
        {/* Section Header */}
        <div className="leadership-section-header">
          {/* Eyebrow */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-zinc-900 font-bold">TEAM</span>
              <span className="inline-block w-8 sm:w-12 h-px bg-zinc-300"></span>
            </div>
            <div className="text-zinc-500 font-medium">IEI SIES GST</div>
          </div>

          {/* Section Title & Index */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
            <h2 id="heading-executive-leadership" className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-zinc-950 tracking-tight leading-none">
              Executive <span className="font-black text-[#0062FF]">Council</span>
            </h2>
            <div className="mt-2 sm:mt-0 font-mono text-sm sm:text-base font-bold text-zinc-400 tracking-wider">
              <span className="inline-block w-6 sm:w-8 h-px bg-zinc-300 align-middle mr-2"></span>
              02 / 03
            </div>
          </div>

          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed font-normal mb-8 sm:mb-12">
            Student leadership managing chapter operations, engineering initiatives, community outreach, and technical excellence.
          </p>
        </div>

        {/* 4-PERSON EXECUTIVE GROUP STAGE */}
        <div className="executive-editorial-stage-wrapper">
          <div 
            className="executive-editorial-stage"
            onTouchStart={handleTouchStart}
          >
            {/* LAYER 0: Clean White Backdrop */}
            <div className="executive-white-backdrop" aria-hidden="true" />

            {/* LAYER 1: Kinetic Executive Horizontal Orbital Geometry */}
            <KineticExecutiveOrbit className="executive-orbit-layer" />

            {/* LAYER 2: Responsive Stage Canvas for 4-Person Group Photo & Masks */}
            <div className="executive-stage-canvas">
              {/* Base Photograph in 100% Monochrome / Grayscale */}
              <img
                src="/assets/executive-leadership-placeholder.jpg"
                alt="Executive Leadership: Chairperson, Vice Chairperson, Secretary, and Treasurer"
                className="executive-photo-layer executive-photo-base"
                loading="lazy"
              />

              {/* 4 Individual Color Overlay Layers */}
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

              {/* 4 INTERACTIVE HIT REGIONS */}
              <div className="executive-hit-grid">
                {executiveList.map(({ key, member, label }, idx) => (
                  <button
                    key={key}
                    type="button"
                    className={`executive-hit-slot slot-${idx} ${activeExecutive === key ? 'hit-active' : ''}`}
                    onMouseEnter={() => handleExecutiveHover(key)}
                    onFocus={() => handleExecutiveHover(key)}
                    onClick={() => handleExecutiveClick(key, member)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleExecutiveClick(key, member);
                      }
                    }}
                    aria-label={`${member?.name || label}, ${label}. Click to inspect.`}
                    tabIndex={0}
                  >
                    <span className="sr-only">{member?.name || label}, {label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* PURE EDITORIAL TYPOGRAPHY UNDERNEATH — NO CARDS, NO BOXES */}
        <div className="mt-6 sm:mt-10 px-2 sm:px-4 max-w-4xl mx-auto text-left">
          <div className="font-mono text-xs sm:text-sm font-bold text-[#0062FF] tracking-widest mb-1">
            0{activeExecItem.slotIndex + 1}
          </div>
          <div className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-zinc-950 tracking-tight leading-none uppercase">
            {activeExecItem.label}
          </div>
          <div className="text-base sm:text-xl font-bold tracking-tight text-zinc-800 uppercase mt-2">
            {activeExecMember?.name}
          </div>
          {activeExecMember?.branch && (
            <div className="text-xs sm:text-sm text-zinc-500 font-mono mt-1">
              Dept. of {activeExecMember.branch} • SIES GST
            </div>
          )}
        </div>

        {/* 4-Step Minimalist Progress Indicator Bar */}
        <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-400 mt-8 sm:mt-12 pt-4 border-t border-zinc-100 max-w-4xl mx-auto">
          <span>01</span>
          <div className="flex-1 mx-4 sm:mx-8 grid grid-cols-4 gap-2">
            {executiveList.map(({ key, label }, i) => (
              <button
                key={key}
                type="button"
                onClick={() => handleExecutiveHover(key)}
                className="h-1 rounded-full transition-all duration-300 cursor-pointer relative"
                style={{
                  backgroundColor: activeExecutive === key ? '#0062FF' : 'rgba(0, 0, 0, 0.12)'
                }}
                aria-label={`Select ${label}`}
              />
            ))}
          </div>
          <span>04</span>
        </div>

      </section>

    </div>
  );
}
