import React, { useState } from 'react';
import { getInitials } from '../data/membersData';

// Crisp, lightweight standalone SVG icons for social platforms
const LinkedInIcon = ({ size = 12, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ size = 12, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const MailIcon = ({ size = 12, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/**
 * Fallback Avatar Component for members without photographs
 * Uses clean typographic initials with institutional silhouette styling.
 */
function FallbackAvatar({ name = '' }) {
  const initials = getInitials(name);
  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 select-none relative overflow-hidden" 
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center mt-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-200/90 border border-black/[0.06] flex items-center justify-center font-display font-bold text-xl sm:text-2xl text-zinc-700 shadow-2xs">
          {initials}
        </div>
        <div className="w-28 sm:w-32 h-10 sm:h-12 mt-2 rounded-t-full bg-zinc-200/60" />
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * IEI SIES GST — REUSABLE MEMBER CARD
 * 
 * People-first, editorial portrait-card for all team members.
 * Consumes ONLY:
 * 1. Portrait (65-75% height, 4:5 aspect ratio)
 * 2. Name
 * 3. Position / Role
 * 4. LinkedIn (if valid)
 * 5. GitHub (if valid)
 * 6. Email (if valid)
 * ============================================================================
 */
import { audioEngine } from '../utils/audioEngine';

export default function MemberCard({ member = {}, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false);

  const name = member.name || 'Team Member';
  const position = member.position || member.role || 'Member';
  const photo = member.image || member.photo;
  const hasValidPhoto = Boolean(photo) && !imgFailed;

  // Extract contact links (from root fields or nested socials)
  const linkedinUrl = member.linkedin || member.socials?.linkedin || null;
  const githubUrl = member.github || member.socials?.github || null;
  const email = member.email || member.socials?.email || null;

  const hasAnySocial = Boolean(linkedinUrl || githubUrl || email);

  const memberIdentifier = member.id || member.prn || member.slug || encodeURIComponent(name);

  const handleCardClick = () => {
    if (!memberIdentifier) return;
    if (audioEngine?.playClick) audioEngine.playClick();
    window.location.hash = `#/member/${memberIdentifier}`;
  };

  return (
    <article
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View profile of ${name}, ${position}`}
      className={`group relative flex flex-col w-full max-w-[340px] mx-auto rounded-xl border border-black/[0.08] bg-white overflow-hidden shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md cursor-pointer ${className}`}
    >
      {/* 1. PORTRAIT IMAGE (65–75% of card height, 4:5 ratio) */}
      <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden shrink-0">
        {hasValidPhoto ? (
          <img
            src={photo}
            alt={name}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.015]"
            loading="lazy"
          />
        ) : (
          <FallbackAvatar name={name} />
        )}
      </div>

      {/* 2. MEMBER INFO AREA */}
      <div className="p-4 sm:p-4.5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 
            className="font-display font-bold text-base text-zinc-950 tracking-tight leading-snug truncate group-hover:text-[#0062FF] transition-colors" 
            title={name}
          >
            {name}
          </h3>
          <p 
            className="text-xs sm:text-[13px] font-normal text-zinc-500 mt-1 line-clamp-1" 
            title={position}
          >
            {position}
          </p>
        </div>

        {/* 3. SOCIAL ACTIONS (Only visible when valid data exists) */}
        {hasAnySocial && (
          <div className="mt-3 pt-3 border-t border-black/[0.06] flex items-center gap-2 flex-wrap">
            {linkedinUrl && (
              <div className="relative inline-flex">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn — ${name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="peer flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 hover:bg-[#0A66C2]/10 text-zinc-600 hover:text-[#0A66C2] transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0062FF]"
                >
                  <LinkedInIcon size={14} className="shrink-0" />
                </a>
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-20 origin-bottom scale-0 opacity-0 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-[11px] font-semibold text-zinc-800 shadow-md transition-all duration-150 ease-out peer-hover:scale-100 peer-hover:opacity-100 peer-focus-visible:scale-100 peer-focus-visible:opacity-100 whitespace-nowrap">
                  LinkedIn
                </span>
              </div>
            )}

            {githubUrl && (
              <div className="relative inline-flex">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub — ${name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="peer flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-800/10 text-zinc-600 hover:text-zinc-900 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0062FF]"
                >
                  <GitHubIcon size={14} className="shrink-0" />
                </a>
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-20 origin-bottom scale-0 opacity-0 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-[11px] font-semibold text-zinc-800 shadow-md transition-all duration-150 ease-out peer-hover:scale-100 peer-hover:opacity-100 peer-focus-visible:scale-100 peer-focus-visible:opacity-100 whitespace-nowrap">
                  GitHub
                </span>
              </div>
            )}

            {email && (
              <div className="relative inline-flex">
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email — ${name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="peer flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 hover:bg-[#0062FF]/10 text-zinc-600 hover:text-[#0062FF] transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0062FF]"
                >
                  <MailIcon size={14} className="shrink-0" />
                </a>
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-20 origin-bottom scale-0 opacity-0 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-[11px] font-semibold text-zinc-800 shadow-md transition-all duration-150 ease-out peer-hover:scale-100 peer-hover:opacity-100 peer-focus-visible:scale-100 peer-focus-visible:opacity-100 whitespace-nowrap">
                  Email
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
