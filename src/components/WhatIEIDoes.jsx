import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/**
 * ============================================================================
 * IEI SIES GST — WHAT IEI DOES & FREQUENTLY ASKED QUESTIONS
 * Clean editorial split layout:
 * Left: Institutional "What IEI Does" statement & Royal Charter governance
 * Right: Refined 5-item Frequently Asked Questions accordion (open composition)
 * ============================================================================
 */

export default function WhatIEIDoes({ onOpenVerify, onOpenMembership }) {
  // Allow only one open FAQ item at a time (defaults to FAQ 01)
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: "faq-01",
      code: "01",
      question: "What is IEI?",
      answer: "The Institution of Engineers (India) is the premier statutory professional body of engineers established in 1920 in Kolkata and incorporated by Royal Charter in 1935. It operates across 15 engineering disciplines, administering sovereign professional certifications, sponsoring national SIRO research grants, and representing India in the International Professional Engineers Alliance (IPEA)."
    },
    {
      id: "faq-02",
      code: "02",
      question: "What is the IEI SIES GST Student Chapter?",
      answer: "The IEI SIES GST Student Chapter is the recognized collegiate chapter established under the Department of Electronics & Computer Science at SIES Graduate School of Technology, Nerul, Navi Mumbai. It serves as an institutional bridge connecting classroom curriculum with multidisciplinary engineering practice, technical mentorship, and industry engagement."
    },
    {
      id: "faq-03",
      code: "03",
      question: "What does the student chapter do?",
      answer: "The chapter orchestrates hands-on technical workshops, competitive hackathons, industrial laboratory visits, expert guest masterclasses, and technical paper research mentorship across embedded RTOS, microcontrollers, robotics, design systems, and software engineering sprints."
    },
    {
      id: "faq-04",
      code: "04",
      question: "Who can participate in IEI SIES GST activities?",
      answer: "Chapter activities, technical symposia, competitions, and skills workshops are open to collegiate engineering students across departments. Students can participate in hackathons, attend guest lectures, and collaborate on multidisciplinary engineering projects throughout the academic session."
    },
    {
      id: "faq-05",
      code: "05",
      question: "How can students get involved?",
      answer: "Students can participate in scheduled technical symposia and workshops, apply for domain coordinator positions during annual chapter appointments, contribute to technical testbenches, or connect with the council desk for guidance on student initiatives and paper submissions."
    }
  ];

  const handleToggle = (idx) => {
    if (audioEngine?.playClick) audioEngine.playClick();
    setOpenIndex(prev => (prev === idx ? -1 : idx));
  };

  return (
    <section 
      id="what-we-do" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" 
      aria-label="What IEI Does and Frequently Asked Questions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: WHAT IEI DOES (STICKY DESKTOP) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="font-mono text-xs font-semibold text-[#0062FF] uppercase tracking-wider mb-2">
            Institutional Charter &amp; Governance
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.14] mb-6">
            What IEI Does
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-800 leading-relaxed font-normal mb-5">
            From conducting statutory degree examinations and issuing sovereign Chartered Engineer licenses to funding collegiate hardware research and publishing international peer-reviewed journals.
          </p>

          <p className="font-sans text-xs sm:text-sm text-zinc-500 leading-relaxed">
            All statutory functions are administered under the historic authority of the Royal Charter 1935, Article 372 of the Constitution of India, and multilateral agreements with international engineering federations.
          </p>
        </div>

        {/* RIGHT COLUMN: FREQUENTLY ASKED QUESTIONS (OPEN EDITORIAL ACCORDION) */}
        <div className="lg:col-span-7">
          <div className="mb-6 sm:mb-8">
            <div className="font-mono text-xs font-semibold text-[#0062FF] uppercase tracking-wider mb-2">
              Chapter Knowledge &amp; Guidance
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h3>
          </div>

          {/* 5-Item Editorial Accordion — No Heavy Cards */}
          <div className="divide-y divide-black/[0.06] border-t border-b border-black/[0.06]">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div 
                  key={faq.id} 
                  className="py-5 sm:py-6 transition-colors"
                >
                  {/* Question Trigger Row */}
                  <button
                    type="button"
                    id={`faq-trigger-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => handleToggle(idx)}
                    className="w-full text-left flex items-start justify-between gap-4 cursor-pointer outline-none group"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                      <span 
                        className={`font-mono text-xs sm:text-sm font-bold shrink-0 transition-colors duration-200 ${
                          isOpen ? 'text-[#0062FF]' : 'text-zinc-400 group-hover:text-zinc-600'
                        }`}
                      >
                        {faq.code}
                      </span>
                      <span 
                        className={`font-display text-base sm:text-lg font-bold leading-snug transition-colors duration-200 ${
                          isOpen ? 'text-[#0062FF]' : 'text-zinc-900 group-hover:text-[#0062FF]'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Subtle Plus -> Rotate 45deg (X) Icon */}
                    <div 
                      className={`shrink-0 mt-0.5 p-1 rounded-md transition-all duration-250 ease-out ${
                        isOpen 
                          ? 'rotate-45 text-[#0062FF] bg-[#0062FF]/10' 
                          : 'text-zinc-400 group-hover:text-zinc-900 group-hover:bg-zinc-100'
                      }`}
                    >
                      <Plus size={16} className="transition-transform duration-250" />
                    </div>
                  </button>

                  {/* Answer Container: Restrained Smooth Pure-CSS Height & Opacity Transition */}
                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${idx}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen 
                        ? 'grid-rows-[1fr] opacity-100 mt-3 pt-1' 
                        : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal pl-7 sm:pl-10 pr-2">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
