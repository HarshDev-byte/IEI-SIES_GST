import React, { useState } from 'react';
import { FileText, Share2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/**
 * ============================================================================
 * IEI SIES GST — EVENT CARD (EDITORIAL ARCHIVE ROW COMPONENT)
 * Clean, lightweight editorial event item with 16:9 photography & strong typography
 * ============================================================================
 */

export default function EventCard({ event, onRegister }) {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const {
    id,
    title,
    category,
    badge,
    date,
    venue,
    description,
    highlights = [],
    eligibility,
    registrationLink,
    rulebookLink,
    image
  } = event;

  const handleRegisterClick = (e) => {
    if (audioEngine?.playClick) audioEngine.playClick();
    if (!registrationLink && onRegister) {
      e.preventDefault();
      onRegister(title);
    }
  };

  const handleShareClick = async () => {
    if (audioEngine?.playClick) audioEngine.playClick();
    const eventUrl = `${window.location.origin}/#/events?id=${id}`;
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } else {
      alert(`Event URL copied: ${eventUrl}`);
    }
  };

  return (
    <article className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start group border-b border-black/[0.06]">
      {/* Left: Thumbnail Image (16:9) */}
      <div className="md:col-span-4 aspect-[16/9] rounded-xl overflow-hidden bg-zinc-100 border border-black/[0.08]">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-zinc-100 flex items-center justify-center font-mono text-xs text-zinc-400">
            IEI SIES GST
          </div>
        )}
      </div>

      {/* Right: Event Information & Action */}
      <div className="md:col-span-8 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-[#0062FF] uppercase tracking-wider">
                {category}
              </span>
              {badge && (
                <>
                  <span className="text-zinc-300">·</span>
                  <span className="font-mono text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {badge}
                  </span>
                </>
              )}
            </div>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShareClick}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer relative"
              title="Share event link"
              aria-label="Share event link"
            >
              <Share2 size={14} />
              {copied && (
                <span className="absolute -top-7 right-0 text-[10px] font-mono font-bold bg-zinc-900 text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>

          <h4 className="font-display text-lg sm:text-2xl font-black text-zinc-950 tracking-tight leading-snug mb-2 group-hover:text-[#0062FF] transition-colors">
            {title}
          </h4>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 font-sans mb-3">
            <span className="font-semibold text-zinc-950">{date}</span>
            <span className="text-zinc-300">·</span>
            <span>{venue}</span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mb-3">
            {description}
          </p>

          {highlights && highlights.length > 0 && (
            <p className="text-xs text-zinc-500 font-normal mb-2">
              <strong className="text-zinc-800 font-semibold">Highlights: </strong>
              {highlights.slice(0, 3).join(' · ')}
            </p>
          )}

          {eligibility && (
            <p className="text-xs text-zinc-500 font-normal mb-4">
              <strong className="text-zinc-800 font-semibold">Eligibility: </strong>
              {eligibility}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <a
            href={registrationLink || '#'}
            target={registrationLink ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={handleRegisterClick}
            className="group/btn h-10 px-5 rounded-xl bg-zinc-950 hover:bg-[#0062FF] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all duration-180 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <span className="inline-block transition-transform duration-180 group-hover/btn:translate-x-1">→</span>
          </a>

          {rulebookLink && (
            <a
              href={rulebookLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine?.playClick && audioEngine.playClick()}
              className="h-10 px-3.5 rounded-xl border border-black/[0.12] hover:border-black/30 hover:bg-zinc-50 text-zinc-800 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText size={13} className="text-zinc-500" />
              <span>Rulebook</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
