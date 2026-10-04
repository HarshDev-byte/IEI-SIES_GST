import React, { useState } from 'react';
import { Calendar, MapPin, Award, ArrowUpRight, Clock, Users, ChevronRight, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function FeaturedEvents({ onRegisterEvent }) {
  const [selectedAward, setSelectedAward] = useState(null);

  const upcomingEvents = [
    {
      date: '19 SEP 2026',
      title: '18th IEI Industry Excellence & 5th Education Awards',
      location: 'Scope Convention Centre, Lodhi Road, New Delhi',
      category: 'APEX NATIONAL AWARDS',
      featured: true,
      time: '09:30 IST — 18:00 IST',
      attendees: '1,200+ Delegates',
      highlights: [
        'Recognizing pioneering industrial engineering innovation',
        'Felicitation of benchmark academic faculties and researchers',
        'National address by Union Ministry of Heavy Industries'
      ]
    },
    {
      date: '12-14 OCT 2026',
      title: '39th Indian Engineering Congress (IEC 2026)',
      location: 'Science City Convention Centre, Kolkata',
      category: 'CONGRESS',
      featured: false,
      time: '3 Days Conclave',
      attendees: '4,500+ Engineers',
      highlights: [
        'Central theme: Engineering for Net-Zero Hydrogen Civilization',
        'Over 140 peer-reviewed technical research presentations'
      ]
    },
    {
      date: '04-05 NOV 2026',
      title: 'National Convention of Civil & Aerospace Engineers',
      location: 'IISc / NIMHANS Convention Centre, Bengaluru',
      category: 'CONVENTION',
      featured: false,
      time: '09:00 IST — 17:30 IST',
      attendees: '850+ Specialists',
      highlights: [
        'High-altitude railway tunnels & deep subterranean foundations',
        'Next-generation composite metallurgy for launch vehicles'
      ]
    },
    {
      date: '28 NOV 2026',
      title: 'All-India National Student Engineering Conclave',
      location: 'IIT Bombay Campus & Virtual Stream',
      category: 'YOUTH & R&D',
      featured: false,
      time: '10:00 IST — 20:00 IST',
      attendees: '15,000+ Students',
      highlights: [
        '₹25 Lakh innovation seed prize pool for student prototypes',
        'Direct recruitment roundtables with Navratna PSUs'
      ]
    }
  ];

  return (
    <section id="events-awards" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="badge-cad-gold mb-3">
            CONFERENCES · CONVENTIONS · APEX HONORS
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-ultra-tight">
            IEI Awards & Conclaves 2026
          </h2>
        </div>

        <p className="text-white/60 text-sm sm:text-base max-w-md mt-4 md:mt-0">
          Where India’s foremost engineering minds convene to celebrate technical breakthroughs, 
          honor statutory excellence, and shape future policy.
        </p>
      </div>

      {/* APEX HERO EVENT BANNER: IEI AWARDS 2026 */}
      <div className="glass-panel p-6 sm:p-10 rounded-lg border border-[#D6A85F]/40 relative overflow-hidden mb-8 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6A85F]/5 rounded-full filter blur-3xl pointer-events-none" />
        
        {/* Corner technical indicators */}
        <div className="crosshair-corner crosshair-tl !border-[#D6A85F]" />
        <div className="crosshair-corner crosshair-tr !border-[#D6A85F]" />
        <div className="crosshair-corner crosshair-bl !border-[#D6A85F]" />
        <div className="crosshair-corner crosshair-br !border-[#D6A85F]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: Oversized Date Stamp */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8 flex flex-col justify-center">
            <span className="badge-cad-gold text-xs mb-3 w-fit">
              FLAGSHIP NATIONAL EVENT
            </span>
            <div className="font-display font-black text-5xl sm:text-7xl text-white tracking-tight leading-none">
              19
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-[#D6A85F] tracking-tight mt-1">
              SEPTEMBER 2026
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-white/50 mt-4">
              <Clock className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>09:30 IST — 18:00 IST</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-white/50 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>Scope Convention Centre, Lodhi Road, New Delhi</span>
            </div>
          </div>

          {/* Center: Award Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              18th IEI Industry Excellence & 5th Engineering Education Awards
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              India's definitive national benchmark for corporate engineering excellence, manufacturing mastery, 
              and faculty scholarship across premier institutions and public sector undertakings.
            </p>
            <ul className="space-y-2 mb-2">
              <li className="flex items-center gap-2 text-xs text-white/60">
                <Check className="w-3.5 h-3.5 text-[#D6A85F]" />
                <span>IEI Industry Excellence Award in 15 Engineering Sectors</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-white/60">
                <Check className="w-3.5 h-3.5 text-[#D6A85F]" />
                <span>IEI Engineering Education Excellence Award for Accredited Colleges</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-white/60">
                <Check className="w-3.5 h-3.5 text-[#D6A85F]" />
                <span>Keynote addresses from leading Indian industrialists & scientists</span>
              </li>
            </ul>
          </div>

          {/* Right: Registration / Nomination CTAs */}
          <div className="lg:col-span-3 flex flex-col gap-3 justify-center">
            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                onRegisterEvent('iei-awards-2026');
              }}
              className="btn-engineering-primary text-xs sm:text-sm py-3 px-5 font-semibold text-center flex items-center justify-center gap-2"
              data-cursor="REGISTER"
            >
              <Award className="w-4 h-4" />
              <span>Request Delegate Pass</span>
            </button>
            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                onRegisterEvent('nomination-dossier');
              }}
              className="btn-engineering-secondary text-xs sm:text-sm py-3 px-5 text-center flex items-center justify-center gap-2"
            >
              <span>Download Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* OTHER UPCOMING TECHNICAL CONVENTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingEvents.slice(1).map((ev) => (
          <div
            key={ev.title}
            className="glass-panel p-6 rounded border border-white/10 hover:border-[#00D6FF]/40 transition-all flex flex-col justify-between group"
            data-cursor="VIEW"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-white/40 mb-3">
                <span className="text-[#00D6FF] font-semibold">{ev.category}</span>
                <span>{ev.date}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white group-hover:text-[#00D6FF] transition-colors mb-2 leading-snug">
                {ev.title}
              </h4>
              <p className="text-xs text-white/50 flex items-center gap-1.5 mb-4 font-mono">
                <MapPin className="w-3 h-3 text-[#00D6FF]" />
                <span>{ev.location}</span>
              </p>
              <ul className="space-y-1.5 mb-6">
                {ev.highlights.map((hl, i) => (
                  <li key={i} className="text-xs text-white/60 flex items-start gap-1.5">
                    <span className="text-[#00D6FF] mt-0.5">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                onRegisterEvent(ev.title);
              }}
              className="w-full py-2.5 px-3 rounded border border-white/10 hover:border-[#00D6FF]/40 text-xs text-white/80 hover:text-white font-medium flex items-center justify-between transition-all bg-white/[0.02]"
            >
              <span>Register Attendance</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#00D6FF]" />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
