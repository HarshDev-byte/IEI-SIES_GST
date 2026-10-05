import React from 'react';

/**
 * ============================================================================
 * IEI SIES GST — COMING SOON DISPLAY CARD
 * Signature Cyberpunk / Editorial Dark Display Box
 * Used for upcoming modules, initiatives, events, and resources repositories
 * ============================================================================
 */
export default function ComingSoonCard({
  title = "Coming Soon",
  description = "We are finalizing our upcoming schedule of hands-on microcontroller masterclasses, research working groups, and flagship collegiate hackathons. Detailed syllabus, testbeds, and enrollment portals will be published here soon.",
  className = ""
}) {
  return (
    <div 
      className={`relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-[#090D1A] p-6 sm:p-10 md:p-12 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] text-center ${className}`}
    >
      {/* Subtle Blueprint Grid Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,98,255,0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,98,255,0.25) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0062FF]/15 blur-[80px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* Main Headline: Split into two lines as in screenshot */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
          {title.includes(' ') ? (
            <>
              {title.split(' ')[0]}<br />{title.split(' ').slice(1).join(' ')}<span className="text-[#0062FF]">.</span>
            </>
          ) : (
            <>{title}<span className="text-[#0062FF]">.</span></>
          )}
        </h2>

        {/* Description Paragraph */}
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
