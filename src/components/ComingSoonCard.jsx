import React from 'react';
import { Sparkles, ArrowRight, Mail } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

/**
 * ============================================================================
 * IEI SIES GST — COMING SOON DISPLAY CARD
 * Signature Editorial Dark Blueprint Display
 * Fully responsive across Mobile (320px–480px), Tablet, and Desktop (1080p–4K)
 * ============================================================================
 */
export default function ComingSoonCard({
  title = "Coming Soon",
  description = "We are finalizing our upcoming schedule of hands-on microcontroller masterclasses, research working groups, and flagship collegiate hackathons. Detailed syllabus, testbeds, and enrollment portals will be published here soon.",
  className = "",
  actionText = "Inquire with Chapter Desk",
  onAction
}) {
  const handleAction = () => {
    if (audioEngine?.playClick) audioEngine.playClick();
    if (onAction) {
      onAction();
    } else {
      window.location.hash = '#contact';
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-[#090D1A] p-6 sm:p-10 md:p-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center my-auto ${className}`}
    >
      {/* Blueprint Grid Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,98,255,0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,98,255,0.25) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px'
          }}
        />
      </div>

      {/* Ambient Blue Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#0062FF]/15 blur-[60px] sm:blur-[80px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-sm sm:max-w-md mx-auto flex flex-col items-center">

        {/* Main Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
          {title.includes(' ') ? (
            <>
              {title.split(' ')[0]}<br />{title.split(' ').slice(1).join(' ')}<span className="text-[#0062FF]">.</span>
            </>
          ) : (
            <>{title}<span className="text-[#0062FF]">.</span></>
          )}
        </h2>

        {/* Description Paragraph */}
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal mb-5 sm:mb-6 max-w-xs sm:max-w-sm">
          {description}
        </p>

        {/* Action Button: Allows access and direct inquiry */}
        <button
          type="button"
          onClick={handleAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#0062FF] text-white text-xs font-semibold tracking-wide border border-white/15 hover:border-[#0062FF] transition-all duration-200 cursor-pointer shadow-sm group"
        >
          <span>{actionText}</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
