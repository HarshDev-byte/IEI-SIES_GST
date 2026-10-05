import React, { useState } from 'react';
import { 
  Layers, Terminal, Cpu, Users, Award, Calendar, 
  ArrowRight, CheckCircle2, ChevronRight, BookOpen, 
  Briefcase, Compass, FileText, Sparkles 
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import ComingSoonCard from '../components/ComingSoonCard';

/**
 * ============================================================================
 * MAINTENANCE / LAUNCH TOGGLE:
 * Set COMING_SOON_MODE to false when technical coordinators are ready to
 * publish the active cards unblurred.
 * ============================================================================
 */
export const COMING_SOON_MODE = true;

export default function ActivitiesPage({ onOpenMembership }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const chapterInitiatives = [
    {
      category: 'workshops',
      categoryName: 'Hands-on Workshops',
      title: 'Advanced ARM Cortex-M & RTOS Embedded Testbench',
      desc: 'Hands-on laboratory sessions where students write deterministic FreeRTOS kernels, implement priority inversion protocols, and debug bus telemetry using physical oscilloscopes.',
      cadence: 'Bi-Weekly Cohort',
      stats: '120+ Students Trained',
      tag: 'HARDWARE'
    },
    {
      category: 'workshops',
      categoryName: 'Hands-on Workshops',
      title: 'Multi-Layer PCB Layout & KiCad Fabrication',
      desc: 'Schematic capture, high-speed differential pair routing, ground plane isolation, and gerber generation for physical hardware assembly.',
      cadence: 'Monthly Intensive',
      stats: '45 Fabricated Boards',
      tag: 'ELECTRONICS'
    },
    {
      category: 'lectures',
      categoryName: 'Expert Lectures',
      title: 'Distinguished Industry & Academic Keynotes',
      desc: 'Direct lectures delivered by corporate Fellows (FIE), CTOs, and BARC/ISRO research scientists on semiconductor supply chains, clean energy, and quantum communications.',
      cadence: 'Monthly Colloquium',
      stats: '8 Keynotes Conducted',
      tag: 'INDUSTRY'
    },
    {
      category: 'placement',
      categoryName: 'Mock Placements',
      title: 'Technical Interview Sprints & Core Placement Drives',
      desc: 'Rigorous mock technical interviews, algorithmic problem-solving sessions, and core electronics domain screening conducted with placed senior alumni and corporate HR mentors.',
      cadence: 'Pre-Placement Semester',
      stats: '95% Positive Feedback',
      tag: 'CAREER'
    },
    {
      category: 'visits',
      categoryName: 'Site Visits',
      title: 'Industrial Facilities & Supercomputing Lab Delegations',
      desc: 'Curated technical excursions to premier industrial complexes, satellite earth stations, and high-voltage transmission substations across Maharashtra.',
      cadence: 'Semester Excursion',
      stats: '3 Site Tours Hosted',
      tag: 'FIELD STUDY'
    },
    {
      category: 'publications',
      categoryName: 'E-Magazine & Papers',
      title: 'IEI-GST TechChronicle (Bi-Annual E-Magazine)',
      desc: 'Bi-annual student editorial publication featuring faculty research highlights, undergraduate student hardware teardowns, AI trends, and technical patent digests.',
      cadence: 'Bi-Annual Issue',
      stats: 'Vol. 1 & 2 Published',
      tag: 'EDITORIAL'
    },
    {
      category: 'hackathons',
      categoryName: 'Collegiate Hackathons',
      title: '36-Hour Systems Engineering Hackathon',
      desc: 'Annual flagship engineering marathon where student teams race the clock to build functional embedded firmware, connected sensors, and production software prototypes.',
      cadence: 'Annual Flagship',
      stats: '₹1.5 Lakh Prizes',
      tag: 'COMPETITION'
    },
    {
      category: 'awards',
      categoryName: 'Award Submissions',
      title: 'National Best Student & Best Chapter Nominations',
      desc: 'Comprehensive dossier preparation and mentoring for students submitting for national IEI innovation prizes, Young Engineer awards, and state council recognitions.',
      cadence: 'Annual National Cycle',
      stats: '3 State Nominations',
      tag: 'RECOGNITION'
    }
  ];

  const filtered = activeCategory === 'all' 
    ? chapterInitiatives 
    : chapterInitiatives.filter(item => item.category === activeCategory);

  const renderInitiativeCards = (items, isBlurred = false) => (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ${
        isBlurred 
          ? 'filter blur-[7px] opacity-35 select-none pointer-events-none scale-[0.99] transition-all' 
          : ''
      }`}
      aria-hidden={isBlurred ? 'true' : undefined}
    >
      {items.map((item, idx) => (
        <div 
          key={idx}
          className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-black/25 hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-zinc-500 mb-2">
              {item.categoryName}
            </div>

            <h3 className="font-display text-lg font-bold text-zinc-950 mb-2 leading-snug">
              {item.title}
            </h3>

            <p className="text-zinc-600 text-xs leading-relaxed mb-4">
              {item.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>{item.cadence}</span>
            <span className="text-emerald-700 font-semibold">{item.stats}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="animate-fadeIn">
      {/* CHAPTER ACTIVITY WINGS DIRECTORY */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
              Major Chapter Initiatives
            </h2>
            <p className="text-zinc-600 text-sm mt-1 max-w-xl">
              Following the verified IEI student chapter mandate: expert lectures, workshops, placement drives, site visits, and publications.
            </p>
          </div>

          {/* Quick Filter (Active when Coming Soon mode is toggled off) */}
          {!COMING_SOON_MODE && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'workshops', label: 'Workshops' },
                { id: 'lectures', label: 'Lectures' },
                { id: 'placement', label: 'Placements' },
                { id: 'visits', label: 'Site Visits' },
                { id: 'publications', label: 'E-Magazine' },
                { id: 'hackathons', label: 'Hackathons' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    audioEngine.playClick();
                    setActiveCategory(f.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === f.id
                      ? 'bg-zinc-950 text-white font-semibold'
                      : 'bg-white border border-black/[0.08] text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INITIATIVES DISPLAY (Blurred with Coming Soon overlay or active grid) */}
        {COMING_SOON_MODE ? (
          <div className="relative rounded-3xl overflow-hidden p-2 sm:p-4">
            {/* 1. Blurred background cards spanning full width */}
            <div className="w-full pointer-events-none select-none" aria-hidden="true">
              {renderInitiativeCards(chapterInitiatives, true)}
            </div>

            {/* 2. Subtle light ambient wash */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[3px] pointer-events-none z-10" aria-hidden="true" />

            {/* 3. Overlaid Official Coming Soon Bulletin - Perfectly Centered */}
            <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <ComingSoonCard 
                title="Coming Soon"
                description="We are finalizing our upcoming schedule of flagship engineering conclaves, inter-collegiate hackathons, and intensive hands-on lab sprints with industry mentors. Full itineraries, dates, and registration portals will be published here soon."
              />
            </div>
          </div>
        ) : (
          renderInitiativeCards(filtered, false)
        )}
      </section>
    </div>
  );
}

