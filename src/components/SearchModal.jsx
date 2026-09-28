import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Sparkles, MessageSquare, ArrowRight, Bot, Compass, Users, Layers, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState(null);
  const inputRef = useRef(null);

  const searchableIndex = [
    { title: 'National Quick Facts & Stats Strip', category: 'Facts', link: '#/about', desc: '1M+ members, 100+ centres, 15 disciplines, Royal Charter 1935, SIRO recognized.' },
    { title: 'About IEI (History, Vision, Mission & Global Accords)', category: 'About', link: '#/about', desc: 'World’s largest multi-disciplinary engineering society, WFEO, WMC, CEC, fib, FEISCA.' },
    { title: 'What IEI Does — 7 Primary Functions', category: 'Services', link: '#/what-we-do', desc: 'AMIE examinations, PG programs, Chartered Engineer, PE/IntPE, Grant-in-Aid, Springer journals, ESCI.' },
    { title: 'AMIE Examinations (Section A & B)', category: 'Examinations', link: '#/what-we-do', desc: 'Ministry of Education recognized degree-equivalent examinations held bi-annually.' },
    { title: 'Chartered Engineer (CEng) & PE / IntPE Register', category: 'Certification', link: '#/what-we-do', desc: 'Independent consultant license, valuer empanelment, and global engineering mobility.' },
    { title: 'Membership Grades & Pathways (10 Grades)', category: 'Membership', link: '#/membership', desc: 'Honorary (HF, HLF), Corporate (FIE, MIE, AMIE), Non-Corporate (SMIE, MTIE, AMTIE, Sr Tech, IM).' },
    { title: 'Student Member (SMIE) Onboarding', category: 'Membership', link: '#/membership', desc: 'Step-by-step guide for SIES GST engineering students to obtain accredited SMIE cards.' },
    { title: 'SIES GST Chapter Initiatives & Workshops', category: 'Activities', link: '#/activities', desc: 'Expert lectures, microcontrollers, mock placement drives, site visits, and e-magazines.' },
    { title: 'Flagship Symposia & Hackathons', category: 'Events', link: '#/events', desc: 'Annual technical symposium, robotics testbenches, and pass registrations.' },
    { title: 'Faculty Advisors & Executive Council', category: 'Team', link: '#/team', desc: 'Principal Dr. Atul Kemkar, HOD Dr. Shubhangi Kharache, Prof. Jasmin Hirani, and 7 Domain Wings.' },
    { title: 'Resources, AMIE Syllabi & Publications', category: 'Resources', link: '#/resources', desc: 'Download AMIE regulations, SIRO research grant forms, Springer guidelines, and LaTeX boilerplate.' },
    { title: 'Student Hub & Digital Pass Generator', category: 'Membership', link: '#/hub', desc: 'Generate your official encrypted Chapter Membership Pass.' },
    { title: 'Campus Headquarters & Inquiry Desk', category: 'Contact', link: '#contact', desc: 'Sector-V Nerul campus location, lab coordinates, and direct contact desk.' }
  ];

  const aiPrompts = [
    {
      q: 'What is IEI and when was it founded?',
      a: 'The Institution of Engineers (India) was founded on 13 September 1920 in Kolkata and incorporated by Royal Charter on 9 September 1935 by King George V. Post-independence, it is recognized as a Body Corporate under Article 372 of the Constitution of India.',
      actionText: 'Explore About IEI',
      link: '#/about'
    },
    {
      q: 'What is AMIE and is it equivalent to B.E./B.Tech?',
      a: 'Yes. IEI conducts Section A & B examinations (AMIE). It is officially recognized by the Ministry of Education (MHRD), Govt. of India, as equivalent to a B.E./B.Tech degree in engineering.',
      actionText: 'View What IEI Does',
      link: '#/what-we-do'
    },
    {
      q: 'How do SIES GST students join as SMIE?',
      a: 'Undergraduate engineering students (ECS and allied departments) can enroll as Student Members (SMIE). It provides an official national ID, eligibility for chapter leadership, and access to SIRO Grant-in-Aid funding.',
      actionText: 'Apply for SMIE',
      link: '#/membership'
    },
    {
      q: 'What are the official Membership Grades?',
      a: 'IEI features 10 grades across 3 categories: Honorary (HF, HLF), Corporate (FIE, MIE, AMIE), and Non-Corporate (SMIE, MTIE, AMTIE, Sr Tech IE, IM).',
      actionText: 'Explore Membership Grades',
      link: '#/membership'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setAiAnswer(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePromptClick = (prompt) => {
    audioEngine.playClick();
    setQuery(prompt.q);
    setAiAnswer(prompt);
  };

  const filtered = searchableIndex.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/45 backdrop-blur-md animate-fadeIn select-none">
      <div 
        className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white/98 backdrop-blur-2xl overflow-hidden shadow-2xl relative text-zinc-950 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top AI Telemetry Header */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-blue-50/70 via-purple-50/50 to-cyan-50/70 border-b border-black/[0.06] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2 text-zinc-700">
            <span className="text-purple-600 font-bold">✦</span>
            <span className="font-bold tracking-wider">CHAPTER AI COPILOT &amp; SPOTLIGHT</span>
          </div>
          <span className="text-zinc-400">Tenure 1 · ECS SIES GST</span>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-black/[0.06] bg-white">
          <Search className="w-5 h-5 text-[#0062FF]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setAiAnswer(null);
            }}
            placeholder="Ask AI or search domains, events, team, resources..."
            className="flex-1 bg-transparent border-none outline-none text-zinc-950 text-sm font-sans placeholder:text-zinc-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setAiAnswer(null);
              }}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-black/[0.05] text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-black hover:bg-black/[0.05] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Quick Prompts Carousel */}
        {!query && (
          <div className="px-5 py-3 bg-zinc-50/70 border-b border-black/[0.04]">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#0062FF]" />
              <span>Suggested AI Prompts</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {aiPrompts.map((p) => (
                <button
                  key={p.q}
                  type="button"
                  onClick={() => handlePromptClick(p)}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50/80 border border-black/10 hover:border-blue-300 text-xs font-sans text-zinc-700 hover:text-[#0062FF] transition-all cursor-pointer shadow-2xs text-left"
                >
                  <span>{p.q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Answer Card (When prompt selected) */}
        {aiAnswer && (
          <div className="p-5 border-b border-black/[0.06] bg-blue-50/30 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0062FF] to-purple-600 flex items-center justify-center text-white text-xs shadow-xs">
                ✦
              </div>
              <span className="font-mono text-xs font-bold text-zinc-900">AI Synthesized Response</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans mb-3">
              {aiAnswer.a}
            </p>
            <a
              href={aiAnswer.link}
              onClick={() => {
                audioEngine.playClick();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-[#0062FF] text-white text-xs font-mono font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <span>{aiAnswer.actionText}</span>
              <ArrowRight size={12} />
            </a>
          </div>
        )}

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-zinc-400">
              NO DIRECT DIRECTORY MATCH FOR "{query}". TRY ASKING AN AI PROMPT ABOVE.
            </div>
          ) : (
            filtered.map((item) => (
              <a
                key={item.title}
                href={item.link}
                onClick={() => {
                  audioEngine.playClick();
                  onClose();
                }}
                className="flex items-start justify-between p-3 rounded-2xl hover:bg-zinc-50 transition-all border border-transparent hover:border-black/[0.06] group text-decoration-none"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-zinc-500 font-medium">
                      {item.category}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="font-display font-semibold text-xs sm:text-sm text-zinc-950 group-hover:text-[#0062FF] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#0062FF] transition-transform group-hover:translate-x-1 flex-shrink-0 mt-2" />
              </a>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 border-t border-black/[0.06] bg-zinc-50/70 flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <span className="text-red-500">♥</span>
            <span>by SIES GST Students</span>
          </span>
          <span>[ESC] TO CLOSE</span>
        </div>

      </div>
    </div>
  );
}
