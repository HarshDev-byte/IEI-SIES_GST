import React, { useState } from 'react';
import { 
  Bell, ArrowLeft, CheckCircle2, FileText, Share2 
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { eventsData } from '../data/eventsData';

/**
 * ============================================================================
 * IEI SIES GST — EVENTS & SYMPOSIA PAGE
 * Single Clean Template Event Card for Technical Team Editing
 * Editorial, lightweight, responsive, and free of clutter
 * ============================================================================
 */

export default function EventsPage({ onRegisterEvent }) {
  const [notified, setNotified] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [copied, setCopied] = useState(false);

  // Take the primary template event from eventsData
  const event = eventsData[0];

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

  const handleShare = async () => {
    if (audioEngine?.playClick) audioEngine.playClick();
    const eventUrl = `${window.location.origin}/#/events?id=${event?.id || 'event'}`;
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } else {
      alert(`Event URL copied: ${eventUrl}`);
    }
  };

  const handleRegisterClick = (e) => {
    if (audioEngine?.playClick) audioEngine.playClick();
    if (!event?.registrationLink && onRegisterEvent) {
      e.preventDefault();
      onRegisterEvent(event?.title);
    }
  };

  return (
    <div className="animate-fadeIn py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* 01. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="font-mono text-xs font-semibold tracking-wider text-[#0062FF] uppercase inline-flex items-center gap-2 mb-3">
          <span>01</span>
          <span className="opacity-40">—</span>
          <span>CONCLAVE &amp; SYMPOSIA CALENDAR</span>
        </div>

        <h1 className="font-display text-[clamp(2.15rem,6vw,3.75rem)] font-black text-zinc-950 tracking-tight leading-tight mb-4">
          Events &amp; Symposia
        </h1>

        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
          Official conclave calendar, flagship technical symposiums, and hands-on engineering workshops hosted by the <strong>IEI SIES GST Student Chapter</strong>.
        </p>
      </div>

      {/* 02. SINGLE BLANK / TEMPLATE EVENT CARD (EDITORIAL ARCHIVE COMPOSITION) */}
      {event && (
        <section aria-label="Event Details" className="mb-20 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-[#FAFBFD] p-5 sm:p-10 rounded-3xl border border-black/[0.08] shadow-xs min-w-0">
            
            {/* Left: 16:9 Image / Poster Container */}
            <div className="lg:col-span-6 min-w-0 w-full">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-100 border border-black/[0.08]">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.015]"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-zinc-400 font-mono text-xs text-center">
                    <span>EVENT BANNER IMAGE</span>
                    <span className="text-[10px] text-zinc-500 mt-1">16:9 Aspect Ratio</span>
                  </div>
                )}

                {/* Subtle Single Status Pill */}
                {event.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-zinc-950 border border-black/[0.08] shadow-2xs">
                      {event.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Event Information & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full min-w-0 w-full">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono text-[11px] font-bold text-[#0062FF] uppercase tracking-wider">
                    {event.category || 'TECHNICAL SYMPOSIUM'}
                  </span>

                  {/* Share Action */}
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer relative"
                    title="Share event link"
                    aria-label="Share event link"
                  >
                    <Share2 size={15} />
                    {copied && (
                      <span className="absolute -top-7 right-0 text-[10px] font-mono font-bold bg-zinc-900 text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>

                <h2 className="font-display text-[clamp(1.5rem,4.5vw,2.25rem)] font-black text-zinc-950 tracking-tight leading-[1.18] mb-3 break-words">
                  {event.title}
                </h2>

                {/* Date & Venue Metadata */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-600 font-sans mb-4">
                  <span className="font-semibold text-zinc-950">{event.date}</span>
                  {event.venue && (
                    <>
                      <span className="text-zinc-300">·</span>
                      <span>{event.venue}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                  {event.description}
                </p>

                {/* Highlights */}
                {event.highlights && event.highlights.length > 0 && (
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed mb-3">
                    <strong className="text-zinc-800 font-semibold">Highlights: </strong>
                    {event.highlights.slice(0, 4).join(' · ')}
                  </p>
                )}

                {/* Eligibility */}
                {event.eligibility && (
                  <p className="text-xs text-zinc-500 font-normal mb-6">
                    <strong className="text-zinc-800 font-semibold">Eligibility: </strong>
                    {event.eligibility}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={event.registrationLink || '#'}
                  target={event.registrationLink ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={handleRegisterClick}
                  className="group h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2.5 transition-all duration-180 transform hover:-translate-y-0.5 active:scale-[0.99] shadow-xs cursor-pointer"
                >
                  <span>REGISTER NOW</span>
                  <span className="inline-block transition-transform duration-180 group-hover:translate-x-1">→</span>
                </a>

                {event.rulebookLink && (
                  <a
                    href={event.rulebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioEngine?.playClick && audioEngine.playClick()}
                    className="h-11 sm:h-12 px-4 rounded-xl border border-black/[0.12] hover:border-black/30 hover:bg-zinc-50 text-zinc-800 text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <FileText size={14} className="text-zinc-500" />
                    <span>Rulebook</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 03. DISPATCH NOTIFICATION (STAY UPDATED) */}
      <div className="rounded-2xl bg-[#FAFAF9] border border-black/[0.08] p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <h3 className="font-display text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mb-2">
          Never Miss an Event Drop
        </h3>

        <p className="text-zinc-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6 font-normal">
          Subscribe with your institutional or personal email to receive direct notifications when registrations open for upcoming symposiums and hackathons.
        </p>

        <div className="max-w-md mx-auto mb-6">
          {notified ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>You will receive an official notification for upcoming events.</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter college or personal email..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-black/[0.12] text-zinc-950 placeholder-zinc-400 text-xs font-sans focus:outline-none focus:border-[#0062FF] focus:ring-2 focus:ring-[#0062FF]/15 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white text-xs font-semibold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
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
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Chapter Overview</span>
          </a>
        </div>
      </div>

    </div>
  );
}
