import React, { useState } from 'react';
import { 
  Calendar, Bell, ArrowLeft, CheckCircle2, 
  Sparkles, Layers, Cpu
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function EventsPage() {
  const [notified, setNotified] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleNotify = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      audioEngine.playClick();
      alert('Please enter a valid college or personal email address.');
      return;
    }
    audioEngine.playSuccessChime();
    setNotified(true);
  };

  return (
    <div className="animate-fadeIn py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h1 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight mb-4">
          Events &amp; Symposia
        </h1>

        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          Official conclave calendar, flagship technical symposiums, and engineering workshops for the SIES GST Student Chapter.
        </p>
      </div>

      {/* ARCHITECTURAL COMING SOON MONOLITH */}
      <div className="relative rounded-3xl bg-white border border-black/10 p-8 sm:p-14 shadow-[0_16px_50px_rgba(0,0,0,0.04)] overflow-hidden text-center">
        
        {/* CAD Corner Crosshairs */}
        <span className="absolute top-4 left-4 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>
        <span className="absolute top-4 right-4 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-4 left-4 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-4 right-4 text-zinc-300 font-mono text-xs select-none pointer-events-none">+</span>

        {/* Subtle Background Radial Glow */}
        <div className="absolute inset-0 bg-radial from-[#0062FF]/[0.03] to-transparent pointer-events-none" />

        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-700 font-mono text-xs font-semibold mb-6 border border-black/[0.04]">
          <span className="w-2 h-2 rounded-full bg-[#0062FF] animate-pulse" />
          <span>SCHEDULE UNDER FINALIZATION</span>
        </div>

        {/* Icon & Pulse Rings */}
        <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-[#0062FF]/10 animate-ping opacity-25" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-[#0062FF]/30 flex items-center justify-center text-[#0062FF] shadow-[0_8px_24px_rgba(0,98,255,0.12)]">
            <Calendar size={36} strokeWidth={1.75} />
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-tight mb-4">
          Coming Soon
        </h2>

        {/* Description */}
        <p className="text-zinc-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-normal">
          The upcoming calendar for technical symposiums, hands-on microelectronics testbenches, and national collegiate hackathons for the <strong>2026–2027 tenure</strong> is currently being finalized with our faculty patrons and industry mentors.
        </p>

        {/* Notification Form / Status */}
        <div className="max-w-md mx-auto mb-12">
          {notified ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-xs flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>You will receive an official dispatch when the schedule is published.</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email to get notified..."
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 border border-black/10 text-zinc-950 placeholder-zinc-400 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#0062FF] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white font-mono text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Bell size={13} />
                <span>Notify Me</span>
              </button>
            </form>
          )}
        </div>

        {/* Preview Pillars */}
        <div className="pt-8 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.04]">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#0062FF] font-bold uppercase mb-1">
              <Sparkles size={11} />
              <span>Flagship</span>
            </div>
            <div className="font-display font-bold text-sm text-zinc-950">
              Annual Technical Symposium
            </div>
            <div className="font-sans text-xs text-zinc-500 mt-0.5">
              Keynotes, paper tracks &amp; project expos
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.04]">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#0062FF] font-bold uppercase mb-1">
              <Cpu size={11} />
              <span>Hardware</span>
            </div>
            <div className="font-display font-bold text-sm text-zinc-950">
              Microcontroller Testbenches
            </div>
            <div className="font-sans text-xs text-zinc-500 mt-0.5">
              STM32, RTOS &amp; hands-on PCB layout
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.04]">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#0062FF] font-bold uppercase mb-1">
              <Layers size={11} />
              <span>Innovation</span>
            </div>
            <div className="font-display font-bold text-sm text-zinc-950">
              Collegiate Hackathons
            </div>
            <div className="font-sans text-xs text-zinc-500 mt-0.5">
              Inter-disciplinary build sprints &amp; prizes
            </div>
          </div>
        </div>

        {/* Action Link: Return to Overview */}
        <div className="mt-10 pt-4 text-center">
          <a
            href="#/"
            onClick={() => audioEngine.playClick()}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Chapter Overview</span>
          </a>
        </div>

      </div>

    </div>
  );
}
