import React, { useState } from 'react';
import { 
  Calendar, MapPin, ArrowRight, Clock, Users, 
  Sparkles, CheckCircle2, Share2, Tag, ShieldCheck,
  ChevronRight, Award, Flame
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function EventsArchive({ onRegisterEvent }) {
  const events = [
    {
      id: "evt-01",
      code: "IEI·EVT·01",
      title: "Annual Technical Symposium 2026",
      tagline: "Collegiate engineering competition, keynote track & prototype exhibition",
      category: "flagship",
      date: "October 15–16, 2026",
      time: "09:00 AM – 06:00 PM IST",
      venue: "Main Auditorium & Multi-Purpose Arena, SIES GST",
      description: "Flagship annual technical symposium bringing together over 500 interdisciplinary engineering students for national innovation challenges, peer-reviewed paper presentations, and direct industry keynote tracks with leaders from Tata Motors, Qualcomm, and BARC.",
      tags: ["National", "Flagship", "Research Papers", "Hardware Expo"],
      status: "Registration Open",
      capacity: 88,
      seatsLeft: 24,
      agenda: [
        { time: "09:00 AM", title: "Inaugural Ceremony & Royal Charter Commemoration" },
        { time: "10:30 AM", title: "Keynote Address: Neuromorphic Computing & Silicon Frontiers" },
        { time: "01:30 PM", title: "Collegiate Hardware Prototype Exhibition & Jury Evaluation" },
        { time: "04:30 PM", title: "Annual Innovation Awards & Merit Fellowship Announcement" }
      ],
      perks: [
        "Official IEI National Participation Certificate",
        "Direct interaction with silicon hardware leaders",
        "₹75,000 Total Prize Pool for Winning Prototypes"
      ]
    },
    {
      id: "evt-02",
      code: "IEI·EVT·02",
      title: "Applied Robotics & Microcontrollers Testbench",
      tagline: "Hands-on embedded firmware and sensor telemetry interfacing",
      category: "workshop",
      date: "November 05, 2026",
      time: "10:00 AM – 04:30 PM IST",
      venue: "Embedded Hardware Lab 3 (Room 304), SIES GST",
      description: "Rigorous full-day hardware workshop focused on STM32 / ESP32 architecture, bus telemetry (I2C/SPI), RTOS task scheduling, and real-time PID motor control loops taught on physical oscilloscopes and logic analyzers.",
      tags: ["Embedded", "Robotics", "RTOS", "Hands-on Lab"],
      status: "Registration Open",
      capacity: 94,
      seatsLeft: 6,
      agenda: [
        { time: "10:00 AM", title: "Microcontroller Hardware Architecture & Register Setup" },
        { time: "12:00 PM", title: "Sensor Telemetry & High-Speed Bus Protocol Interfacing" },
        { time: "02:00 PM", title: "FreeRTOS Scheduling & Multi-Threaded Sensor Loops" },
        { time: "03:45 PM", title: "Autonomous Motor Control & Tuning Closed-Loop PID" }
      ],
      perks: [
        "Individual Hardware Kit provided for lab duration",
        "Verified Skill Badge for Chapter Portfolio",
        "Take-home firmware repository with starter codes"
      ]
    },
    {
      id: "evt-03",
      code: "IEI·EVT·03",
      title: "Industry Expert Colloquium: VLSI & Chip Design",
      tagline: "Global semiconductor engineering directors share real-world tapeout insights",
      category: "seminar",
      date: "December 10, 2026",
      time: "02:00 PM – 05:30 PM IST",
      venue: "Executive Seminar Hall, SIES GST",
      description: "An elite technical dialogue featuring senior chip architects from Texas Instruments and Intel discussing advanced lithography, RISC-V SoC synthesis, and the growing Indian semiconductor manufacturing ecosystem.",
      tags: ["Semiconductors", "VLSI", "Chip Design", "Industry Dialogue"],
      status: "Registration Open",
      capacity: 72,
      seatsLeft: 35,
      agenda: [
        { time: "02:00 PM", title: "State of Global Semiconductor Supply Chains & 3nm Nodes" },
        { time: "03:15 PM", title: "Next-Gen AI Hardware Accelerators & Custom ASICs" },
        { time: "04:30 PM", title: "Direct Q&A with Engineering Directors on Silicon Careers" }
      ],
      perks: [
        "Direct networking with senior semiconductor engineers",
        "Exclusive whitepaper & industry reading dossier",
        "Priority internship recommendation referral"
      ]
    },
    {
      id: "evt-04",
      code: "IEI·EVT·04",
      title: "Hack-A-League: 36H Hardware-Software Hackathon",
      tagline: "36-Hour continuous sprint solving industrial & societal automation problems",
      category: "hackathon",
      date: "January 18–19, 2027",
      time: "08:00 AM – 08:00 PM (36 Hours)",
      venue: "Innovation Arena & Central Computing Commons, SIES GST",
      description: "The chapter's premier endurance sprint. Over 40 collegiate teams compete across 3 domains: Smart Industrial IoT, Edge AI for Health, and Renewable Grid Optimization with 24-hour hardware mentor access and power backups.",
      tags: ["36H Hackathon", "Industrial IoT", "Edge AI", "Prize Pool"],
      status: "Team Delegations Forming",
      capacity: 85,
      seatsLeft: 8,
      agenda: [
        { time: "08:00 AM", title: "Industrial Problem Statement Reveal & Hardware Allocation" },
        { time: "08:00 PM", title: "Midnight Review Checkpoint & Architecture Scrutiny" },
        { time: "08:00 AM", title: "Live Prototype Demo & System Stress Testing on Testbed" },
        { time: "06:00 PM", title: "Grand Finale Judging & ₹1,00,000 Fellowship Awards" }
      ],
      perks: [
        "24/7 high-speed gigabit Wi-Fi, lab equipment, and meals",
        "Mentorship by alumni at Google, Amazon, and NVIDIA",
        "Seed grant opportunities for top 3 functional prototypes"
      ]
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'agenda' | 'perks'
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'All Symposia', count: events.length },
    { id: 'flagship', label: 'Flagship', count: events.filter(e => e.category === 'flagship').length },
    { id: 'workshop', label: 'Workshops', count: events.filter(e => e.category === 'workshop').length },
    { id: 'seminar', label: 'Seminars', count: events.filter(e => e.category === 'seminar').length },
    { id: 'hackathon', label: 'Hackathons', count: events.filter(e => e.category === 'hackathon').length }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.category === activeFilter);

  const activeEvt = events[selectedEvent] || events[0];

  const handleCopyShare = () => {
    audioEngine.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.08]" aria-label="Chapter Events Archive">
      
      {/* SECTION HEADER WITH TELEMETRY CHIPS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight leading-tight">
            Flagship Events &amp; Symposia
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Rigorous technical conventions, hands-on silicon testbenches, national paper symposia, and collegiate engineering hackathons at <strong>SIES GST</strong>.
        </p>
      </div>

      {/* FILTER PILLS DOCK */}
      <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-black/[0.06] mb-10">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                audioEngine.playClick();
                setActiveFilter(cat.id);
                // auto-select first in filtered
                const firstIdx = events.findIndex(e => cat.id === 'all' || e.category === cat.id);
                if (firstIdx !== -1) setSelectedEvent(firstIdx);
              }}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm ${
                isActive 
                  ? 'bg-zinc-950 text-white font-bold shadow-md' 
                  : 'bg-white border border-black/10 text-zinc-600 hover:text-black hover:border-black/25'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* EVENTS MAIN TWO-COLUMN SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Event Roster Cards */}
        <div className="lg:col-span-5 space-y-4">
          {filteredEvents.map((evt) => {
            const originalIdx = events.findIndex(e => e.id === evt.id);
            const isSelected = selectedEvent === originalIdx;

            return (
              <div
                key={evt.id}
                onClick={() => {
                  setSelectedEvent(originalIdx);
                  audioEngine.playClick();
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group select-none ${
                  isSelected 
                    ? 'bg-white border-[#0066CC] shadow-[0_16px_40px_rgba(0,98,255,0.12),_0_0_0_1px_rgba(0,98,255,0.4)] translate-x-1' 
                    : 'bg-white border-black/[0.08] hover:border-black/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]'
                }`}
              >
                {/* Active Left Laser Accent Stripe */}
                {isSelected && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#0066CC]" />
                )}

                {/* Top Event Meta */}
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[11px] text-[#0066CC]">
                      {evt.code}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                      {evt.category}
                    </span>
                  </div>

                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{evt.status}</span>
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-950 mb-1.5 group-hover:text-[#0066CC] transition-colors leading-snug">
                  {evt.title}
                </h3>
                <p className="text-zinc-600 text-xs font-normal mb-4 line-clamp-2 leading-relaxed">
                  {evt.tagline}
                </p>

                {/* Capacity Fill Meter */}
                <div className="mb-4 bg-zinc-50 p-2.5 rounded-xl border border-black/[0.04]">
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Users size={11} className="text-zinc-400" />
                      <span>Capacity: {evt.capacity}% Filled</span>
                    </span>
                    <span className="text-amber-700 font-bold">
                      {evt.seatsLeft} Seats Available
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200/80 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0066CC] to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${evt.capacity}%` }}
                    />
                  </div>
                </div>

                {/* Logistics Bottom Row */}
                <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] font-mono text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#0066CC]" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-800 font-semibold group-hover:text-[#0066CC] transition-colors">
                    <span>Inspect</span>
                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Column: High-Tech Technical Dossier Terminal */}
        <div className="lg:col-span-7 sticky top-28 bg-white rounded-3xl border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.03)] p-6 sm:p-10 relative overflow-hidden">
          
          {/* Top Dossier Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-black/[0.08] pb-5 mb-6 gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#0066CC] bg-[#0066CC]/10 px-3 py-1 rounded-full border border-[#0066CC]/20">
                DOSSIER · {activeEvt.code}
              </span>
              <span className="font-mono text-xs text-zinc-400">
                SIES GST HUB · OFFICIAL SYMPOSIUM
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShare}
                className="p-2 rounded-lg border border-black/10 text-zinc-600 hover:text-black hover:bg-zinc-50 transition-colors flex items-center gap-1.5 font-mono text-xs cursor-pointer"
                title="Share Event URL"
              >
                <Share2 size={13} />
                <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Event Monumental Title */}
          <h3 className="font-display text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-2">
            {activeEvt.title}
          </h3>
          <p className="font-mono text-xs text-[#0066CC] font-semibold mb-6">
            {activeEvt.tagline}
          </p>

          {/* Logistics HUD Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAFAFC] border border-black/[0.06] mb-6 font-mono text-xs">
            <div className="flex items-start gap-2.5">
              <Calendar size={15} className="text-[#0066CC] mt-0.5 shrink-0" />
              <div>
                <div className="text-zinc-400 text-[10px] uppercase">Official Schedule</div>
                <div className="text-zinc-900 font-semibold">{activeEvt.date}</div>
                <div className="text-zinc-500 text-[11px]">{activeEvt.time}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-[#0066CC] mt-0.5 shrink-0" />
              <div>
                <div className="text-zinc-400 text-[10px] uppercase">Campus Venue</div>
                <div className="text-zinc-900 font-semibold">{activeEvt.venue}</div>
                <div className="text-zinc-500 text-[11px]">SIES GST · Nerul Campus</div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE DOSSIER TABS */}
          <div className="flex items-center gap-2 border-b border-black/[0.08] pb-3 mb-6">
            <button
              onClick={() => {
                setActiveTab('overview');
                audioEngine.playClick();
              }}
              className={`font-mono text-xs py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === 'overview' 
                  ? 'bg-zinc-950 text-white font-bold' 
                  : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
              }`}
            >
              01 // Overview
            </button>
            <button
              onClick={() => {
                setActiveTab('agenda');
                audioEngine.playClick();
              }}
              className={`font-mono text-xs py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === 'agenda' 
                  ? 'bg-zinc-950 text-white font-bold' 
                  : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
              }`}
            >
              02 // Agenda Timeline
            </button>
            <button
              onClick={() => {
                setActiveTab('perks');
                audioEngine.playClick();
              }}
              className={`font-mono text-xs py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === 'perks' 
                  ? 'bg-zinc-950 text-white font-bold' 
                  : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
              }`}
            >
              03 // Perks &amp; Fellowship
            </button>
          </div>

          {/* TAB 01: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
                {activeEvt.description}
              </p>
              
              <div className="pt-2">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-2 font-semibold">
                  TAGGED SPECIALIZATIONS:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {activeEvt.tags.map((tg, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-md bg-zinc-100 border border-black/5 font-mono text-[11px] text-zinc-700"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 02: AGENDA TIMELINE */}
          {activeTab === 'agenda' && (
            <div className="space-y-3 animate-fadeIn">
              {activeEvt.agenda.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-black/5 bg-zinc-50/70 hover:bg-zinc-50 hover:border-black/10 transition-colors flex items-start gap-4 font-mono text-xs"
                >
                  <span className="font-bold text-[#0066CC] bg-white px-2 py-1 rounded border border-black/5 shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <div className="font-sans font-bold text-zinc-900 text-sm">{item.title}</div>
                    <div className="text-zinc-500 text-[11px] mt-0.5">Session Verified by Advisory Committee</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 03: PERKS & FELLOWSHIP */}
          {activeTab === 'perks' && (
            <div className="space-y-3 animate-fadeIn">
              {activeEvt.perks.map((perk, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-50/50 flex items-center gap-3 font-sans text-xs text-zinc-800"
                >
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span className="font-medium">{perk}</span>
                </div>
              ))}
            </div>
          )}

          {/* CALL TO ACTION ROW */}
          <div className="pt-8 mt-8 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Accredited IEI Institutional Registration</span>
            </div>

            <button
              onClick={() => {
                audioEngine.playClick();
                if (onRegisterEvent) onRegisterEvent(activeEvt.title);
              }}
              className="btn-minimal-primary text-xs py-3 px-6 shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <span>RSVP &amp; Secure Attendance Pass</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
