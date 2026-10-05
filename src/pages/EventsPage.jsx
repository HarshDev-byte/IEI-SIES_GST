import React, { useState } from 'react';
import { 
  Bell, ArrowLeft, CheckCircle2, Sparkles, Calendar, Clock, Radio
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/**
 * ============================================================================
 * IEI SIES GST — EVENTS & SYMPOSIA PAGE
 * Coming Soon State for Upcoming Academic Conclaves & Workshops
 * Clean, editorial, responsive, and matches chapter design system
 * ============================================================================
 */

export default function EventsPage({ onRegisterEvent }) {
  const [notified, setNotified] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleNotify = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      if (audioEngine?.playClick) audioEngine.playClick();
      alert('Please enter a valid college or personal email address.');
      return;
    }
    if (audioEngine?.playSuccessChime) audioEngine.playSuccessChime();
    setNotified(true);
  };

  return (
    <div className="animate-fadeIn py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* 01. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h1 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-tight leading-tight mb-4">
          Events &amp; Symposia
        </h1>

        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
          Official conclave calendar, flagship technical symposiums, and hands-on engineering workshops hosted by the <strong>IEI SIES GST Student Chapter</strong>.
        </p>
      </div>

      {/* 02. COMING SOON EDITORIAL DISPLAY CARD */}
      <section aria-label="Events Coming Soon" className="mb-14 sm:mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 sm:p-14 lg:p-16 border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center">
          
          {/* Subtle Cyber Grid Background Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,98,255,0.06) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,98,255,0.06) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px'
              }}
            />
          </div>

          {/* Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0062FF]/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Main Headline */}
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-zinc-950 tracking-tight leading-none mb-6">
              Coming Soon<span className="text-[#0062FF]">.</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal mb-2 max-w-xl">
              We are finalizing our upcoming schedule of flagship engineering conclaves, 
              inter-collegiate hackathons, and intensive hands-on lab sprints with industry mentors.
              Full itineraries, dates, and registration portals will be published here soon.
            </p>

          </div>
        </div>
      </section>

      {/* 03. DISPATCH NOTIFICATION (STAY UPDATED) */}
      <div className="rounded-3xl bg-white border border-black/[0.08] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        <div className="w-10 h-10 rounded-2xl bg-[#0062FF]/10 border border-[#0062FF]/20 flex items-center justify-center text-[#0062FF] mx-auto mb-4">
          <Bell size={18} />
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mb-2">
          Never Miss an Event Drop
        </h3>

        <p className="text-zinc-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6 font-normal">
          Subscribe with your institutional or personal email to receive direct notifications when registrations open for upcoming symposiums and hackathons.
        </p>

        <div className="max-w-md mx-auto mb-6">
          {notified ? (
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 size={16} className="text-[#0062FF] shrink-0" />
              <span>You're on the priority list! We'll notify you when registrations open.</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter college or personal email..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAFAFC] border border-black/[0.1] text-zinc-950 placeholder-zinc-400 text-xs font-sans focus:outline-none focus:border-[#0062FF] focus:ring-2 focus:ring-[#0062FF]/20 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0062FF] hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-[0_2px_12px_rgba(0,98,255,0.25)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Bell size={13} />
                <span>Notify Me</span>
              </button>
            </form>
          )}
        </div>

        {/* Back Link */}
        <div className="pt-4 border-t border-black/[0.06]">
          <a
            href="#/"
            onClick={() => audioEngine?.playClick && audioEngine.playClick()}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-[#0062FF] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Chapter Overview</span>
          </a>
        </div>
      </div>

    </div>
  );
}
