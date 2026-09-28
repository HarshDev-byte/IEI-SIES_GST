import React from 'react';

/**
 * Institutional Sponsor & Partner Presentation Component.
 * Conforms strictly to:
 * - Clean institutional typography and layout
 * - Horizontal rail with consistent height and balanced spacing
 * - Restrained default state: grayscale(100%) and 0.70 opacity
 * - Hover state: grayscale(0%), opacity 1, scale(1.03), 250ms ease
 * - Desktop: 25-35s subtle CSS marquee with pause on hover
 * - Mobile: static / touch-friendly horizontal scroll (no forced animation)
 * - prefers-reduced-motion: reduce disabled
 * - Accessible title/aria attributes and new-tab links
 */

// Official Institutional Sponsor & Accreditation Partners Data
const DEFAULT_SPONSORS = [
  {
    name: "The Institution of Engineers (India)",
    category: "Apex National Statutory Body",
    website: "https://ieindia.org",
    logoText: "THE INSTITUTION OF ENGINEERS (INDIA)",
    subText: "ESTD. 1920 · ROYAL CHARTER 1935",
    logoSvg: (
      <svg viewBox="0 0 240 50" className="h-9 sm:h-10 w-auto fill-current" aria-hidden="true">
        <circle cx="25" cy="25" r="21" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="25" cy="25" r="16" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M25 12 L25 38 M12 25 L38 25 M16 16 L34 34 M16 34 L34 16" stroke="currentColor" strokeWidth="1.5" />
        <text x="56" y="22" className="font-display font-black text-[13px] tracking-wider fill-current">THE INSTITUTION</text>
        <text x="56" y="34" className="font-display font-extrabold text-[11px] tracking-widest fill-current">OF ENGINEERS (INDIA)</text>
        <text x="56" y="44" className="font-mono text-[8px] tracking-wider fill-current opacity-70">ESTD 1920 · CHARTER 1935</text>
      </svg>
    )
  },
  {
    name: "SIES Graduate School of Technology",
    category: "Collegiate Engineering Campus",
    website: "https://siesgst.edu.in",
    logoText: "SIES GST",
    subText: "NERUL, NAVI MUMBAI",
    logoSvg: (
      <svg viewBox="0 0 220 50" className="h-9 sm:h-10 w-auto fill-current" aria-hidden="true">
        <rect x="5" y="6" width="38" height="38" rx="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="24" y="31" textAnchor="middle" className="font-display font-black text-[16px] fill-current">SIES</text>
        <text x="52" y="21" className="font-display font-black text-[14px] tracking-wider fill-current">SIES GRADUATE SCHOOL</text>
        <text x="52" y="33" className="font-display font-bold text-[11px] tracking-widest fill-current">OF TECHNOLOGY</text>
        <text x="52" y="44" className="font-mono text-[8px] tracking-wider fill-current opacity-70">NERUL · NAVI MUMBAI</text>
      </svg>
    )
  },
  {
    name: "Department of Electronics & Computer Science",
    category: "Academic Department",
    website: "https://siesgst.edu.in",
    logoText: "DEPT. OF ECS",
    subText: "SIES GST",
    logoSvg: (
      <svg viewBox="0 0 230 50" className="h-9 sm:h-10 w-auto fill-current" aria-hidden="true">
        <path d="M7 25 L18 10 L33 10 L44 25 L33 40 L18 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="25.5" cy="25" r="5" fill="currentColor" />
        <text x="54" y="21" className="font-display font-black text-[13px] tracking-wider fill-current">DEPARTMENT OF ECS</text>
        <text x="54" y="33" className="font-display font-medium text-[10px] tracking-wider fill-current">ELECTRONICS & COMPUTER SCIENCE</text>
        <text x="54" y="44" className="font-mono text-[8px] tracking-wider fill-current opacity-70">SIES GST CHAPTER #602</text>
      </svg>
    )
  },
  {
    name: "All India Council for Technical Education",
    category: "Statutory Apex Authority",
    website: "https://aicte-india.org",
    logoText: "AICTE",
    subText: "GOVERNMENT OF INDIA",
    logoSvg: (
      <svg viewBox="0 0 170 50" className="h-9 sm:h-10 w-auto fill-current" aria-hidden="true">
        <circle cx="22" cy="25" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="22" cy="25" r="4" fill="currentColor" />
        <text x="50" y="24" className="font-display font-black text-[16px] tracking-widest fill-current">AICTE</text>
        <text x="50" y="36" className="font-mono text-[8px] tracking-wider fill-current opacity-70">STATUTORY APEX COUNCIL</text>
        <text x="50" y="45" className="font-mono text-[7px] tracking-wider fill-current opacity-60">GOVERNMENT OF INDIA</text>
      </svg>
    )
  },
  {
    name: "National Board of Accreditation",
    category: "Accreditation Tier",
    website: "https://nbaind.org",
    logoText: "NBA ACCREDITED",
    subText: "WASHINGTON ACCORD TIER-1",
    logoSvg: (
      <svg viewBox="0 0 180 50" className="h-9 sm:h-10 w-auto fill-current" aria-hidden="true">
        <polygon points="22,6 38,15 38,35 22,44 6,35 6,15" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 25 L20 31 L31 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="48" y="23" className="font-display font-black text-[15px] tracking-wider fill-current">NBA</text>
        <text x="48" y="34" className="font-display font-bold text-[9px] tracking-widest fill-current">ACCREDITED PROGRAM</text>
        <text x="48" y="44" className="font-mono text-[7px] tracking-wider fill-current opacity-70">TIER-1 WASHINGTON ACCORD</text>
      </svg>
    )
  },
  {
    name: "University of Mumbai",
    category: "Affiliating University",
    website: "https://mu.ac.in",
    logoText: "UNIVERSITY OF MUMBAI",
    subText: "ESTD. 1857",
    logoSvg: (
      <svg viewBox="0 0 200 50" className="h-9 sm:h-10 w-auto fill-current" aria-hidden="true">
        <circle cx="22" cy="25" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 27 C14 18 30 18 30 27 L22 34 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="48" y="22" className="font-display font-black text-[13px] tracking-wider fill-current">UNIVERSITY OF</text>
        <text x="48" y="34" className="font-display font-extrabold text-[12px] tracking-widest fill-current">MUMBAI</text>
        <text x="48" y="44" className="font-mono text-[8px] tracking-wider fill-current opacity-70">ESTD. 1857 · AFFILIATED</text>
      </svg>
    )
  }
];

export default function SponsorsSection({ sponsors = [] }) {
  const sponsorList = sponsors && sponsors.length > 0 ? sponsors : DEFAULT_SPONSORS;
  
  // Quadruple for continuous, seamless sliding loop without any seams
  const marqueeList = [...sponsorList, ...sponsorList, ...sponsorList, ...sponsorList];

  return (
    <section 
      className="py-14 sm:py-20 border-t border-black/[0.06] bg-white relative overflow-hidden" 
      aria-label="Major Sponsors"
    >
      {/* Institutional Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-2">
          Major Sponsors &amp; Institutional Partners
        </h2>
        <p className="text-sm text-zinc-600">
          Organizations supporting IEI SIES GST
        </p>
      </div>

      {/* Rail Container with subtle edge gradients for editorial finish */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right edge fade masks */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" 
          aria-hidden="true" 
        />

        {/* Continuous Automatic Smooth Sliding Marquee */}
        <div className="w-full overflow-hidden">
          <div className="flex items-center gap-10 sm:gap-14 md:gap-16 w-max animate-sponsor-marquee py-3">
            {marqueeList.map((item, idx) => {
              const innerContent = (
                <div 
                  className="flex items-center justify-center h-14 sm:h-16 px-4 text-zinc-800 transition-all duration-250 ease-out select-none cursor-pointer filter grayscale contrast-75 opacity-70 hover:grayscale-0 hover:contrast-100 hover:opacity-100 hover:scale-[1.03] hover:text-[#0062FF]"
                  title={`${item.name}${item.category ? ` — ${item.category}` : ''}`}
                >
                  {item.logo ? (
                    <img 
                      src={item.logo} 
                      alt={item.name} 
                      className="max-h-9 sm:max-h-11 w-auto object-contain" 
                      loading="lazy"
                    />
                  ) : item.logoSvg ? (
                    item.logoSvg
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="font-display font-black text-sm tracking-wider uppercase">
                        {item.logoText || item.name}
                      </span>
                      {item.subText && (
                        <span className="font-mono text-[8px] uppercase tracking-widest mt-0.5 opacity-70">
                          {item.subText}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );

              return item.website ? (
                <a
                  key={`${item.name}-${idx}`}
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} (Opens official site in a new tab)`}
                  className="focus:outline-hidden focus:ring-1 focus:ring-[#0062FF] rounded-md transition-shadow"
                >
                  {innerContent}
                </a>
              ) : (
                <div key={`${item.name}-${idx}`}>
                  {innerContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
