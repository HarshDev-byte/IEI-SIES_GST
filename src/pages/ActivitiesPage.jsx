import React, { useState } from 'react';
import { 
  Layers, Terminal, Cpu, Users, Award, Calendar, 
  ArrowRight, CheckCircle2, ChevronRight, BookOpen, 
  Briefcase, Compass, FileText, Sparkles 
} from 'lucide-react';
import ActivitiesSection from '../components/ActivitiesSection';
import { audioEngine } from '../utils/audioEngine';

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

  return (
    <div className="animate-fadeIn">
      {/* 01. FEATURED HARDWARE ACTIVITIES ACCORDION */}
      <ActivitiesSection onOpenMembership={onOpenMembership} />

      {/* 02. CHAPTER ACTIVITY WINGS DIRECTORY */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
              Major Chapter Initiatives
            </h2>
            <p className="text-zinc-600 text-sm mt-1 max-w-xl">
              Following the verified IEI student chapter mandate: expert lectures, workshops, placement drives, site visits, and publications.
            </p>
          </div>

          {/* Quick Filter */}
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
                className={`px-3 py-1.5 rounded-full font-mono text-xs whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === f.id
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'bg-white border border-black/[0.08] text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 INITIATIVES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-black/25 hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                  <span className="text-[#0062FF] font-bold uppercase">{item.categoryName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-semibold">{item.tag}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-zinc-950 mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-zinc-600 text-xs leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>{item.cadence}</span>
                <span className="text-emerald-700 font-semibold">{item.stats}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CHAPTER STATS SUMMARY BANNER */}
        <div className="mt-12 p-6 rounded-3xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-display font-bold text-xl text-white">
              Want to propose a technical workshop or lecture?
            </div>
            <p className="font-mono text-xs text-zinc-400">
              Student domain leads and faculty members can submit activity agendas for chapter sponsorship.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              audioEngine.playClick();
              if (onOpenMembership) onOpenMembership('Activity Proposal');
            }}
            className="px-6 py-3 rounded-full bg-[#0062FF] hover:bg-blue-600 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
          >
            Submit Activity Agenda
          </button>
        </div>

      </section>
    </div>
  );
}
