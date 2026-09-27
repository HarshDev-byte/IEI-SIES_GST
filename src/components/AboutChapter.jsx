import React from 'react';
import { BookOpen, Hammer, Compass } from 'lucide-react';

export default function AboutChapter() {
  const philosophies = [
    {
      num: '01',
      title: 'Learn',
      icon: BookOpen,
      desc: 'Cultivate deep technical knowledge across engineering disciplines through structured study groups, peer review, and hands-on laboratory sessions. Every member leaves more capable than they arrived.'
    },
    {
      num: '02',
      title: 'Build',
      icon: Hammer,
      desc: 'Transform engineering theory into tangible systems — hardware prototypes, deterministic firmware, and scalable software platforms. Engineering is defined by what you create.'
    },
    {
      num: '03',
      title: 'Lead',
      icon: Compass,
      desc: 'Develop the judgment, responsibility, and academic integrity that define exceptional engineers. The chapter prepares members for positions of lasting technical influence.'
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            We build engineers,
            <span className="block text-zinc-500 font-bold">
              not just graduates.
            </span>
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Bridging the gap between academic coursework and real-world engineering rigor at SIES Graduate School of Technology.
        </p>
      </div>

      {/* INSTITUTIONAL INFO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left: Narrative */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-base sm:text-lg text-zinc-800 leading-relaxed font-normal">
            <strong className="text-zinc-950 font-bold">IEI SIES GST</strong> is the official collegiate chapter of The Institution of Engineers (India) 
            at SIES Graduate School of Technology, Nerul, Navi Mumbai. It exists to bridge the gap between textbook 
            engineering curriculum and the empirical demands of technical practice.
          </p>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            Through structured hardware masterclasses, mentored engineering project tracks, collegiate hackathons, and direct 
            dialogue with practicing industry directors, the chapter equips students with what the syllabus alone 
            cannot provide: the experience of designing and deploying complex systems.
          </p>
        </div>

        {/* Right: Clean Specs Box */}
        <div className="lg:col-span-5 minimal-card p-6 font-mono text-xs shadow-sm bg-white">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-4">
            <span className="text-[#0062FF] font-semibold">CHAPTER ACCREDITATION</span>
            <span className="text-zinc-500">SIES GST · NERUL</span>
          </div>

          <div className="space-y-3.5">
            <div>
              <span className="text-zinc-400 text-[10px] uppercase block">Institution</span>
              <span className="text-zinc-900 font-semibold text-sm block mt-0.5">SIES Graduate School of Technology</span>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] uppercase block">Department</span>
              <span className="text-zinc-700 text-xs block mt-0.5">Electronics &amp; Computer Science Engineering (ECS)</span>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] uppercase block">Parent National Body</span>
              <span className="text-zinc-700 text-xs block mt-0.5">The Institution of Engineers (India) · Est. 1920</span>
            </div>
            <div className="pt-2 border-t border-black/[0.06] flex justify-between items-center text-zinc-600">
              <span>Collegiate Session:</span>
              <span className="text-zinc-900 font-semibold">2025–2026</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3 PHILOSOPHIES (Learn, Build, Lead) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {philosophies.map((p) => {
          const Icon = p.icon;
          return (
            <div 
              key={p.num}
              className="minimal-card p-6 sm:p-7 flex flex-col justify-between bg-white"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-6">
                  <span>PRINCIPLE {p.num}</span>
                  <Icon size={16} className="text-[#0062FF]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-zinc-950 mb-3">
                  {p.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
