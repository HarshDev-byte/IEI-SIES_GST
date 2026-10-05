import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';

// Recognizable Line Iconography matching chapter design system
const InstagramIcon = ({ size = 18, className = '' }) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ size = 18, className = '' }) => (
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

const GitHubIcon = ({ size = 18, className = '' }) => (
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
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const EmailIcon = ({ size = 18, className = '' }) => (
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
 * ============================================================================
 * IEI SIES GST — MOBILE FLOATING SOCIAL MEDIA MENU
 * Minimal, lightweight floating social menu for mobile devices (<= 767px).
 * Hidden on desktop/tablet (>= 768px).
 * ============================================================================
 */
export default function MobileFloatingSocial() {
  const [socialMenuOpen, setSocialMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const socialLinks = [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/ieisiesgst/',
      icon: InstagramIcon,
      external: true,
      ariaLabel: 'Instagram'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/iei-sies-gst',
      icon: LinkedInIcon,
      external: true,
      ariaLabel: 'LinkedIn'
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/HarshDev-byte/IEI-SIES_GST',
      icon: GitHubIcon,
      external: true,
      ariaLabel: 'GitHub'
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:iei@sies.edu.in',
      icon: EmailIcon,
      external: false,
      ariaLabel: 'Email'
    }
  ];

  // Close when tapping outside
  useEffect(() => {
    if (!socialMenuOpen) return;

    const handlePointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setSocialMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [socialMenuOpen]);

  const handleToggle = () => {
    if (audioEngine?.playClick) audioEngine.playClick();
    setSocialMenuOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    if (audioEngine?.playClick) audioEngine.playClick();
    setSocialMenuOpen(false);
  };

  return (
    <aside 
      ref={menuRef}
      className="md:hidden fixed z-40 flex flex-col items-end select-none pointer-events-auto"
      style={{
        bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        right: 'max(16px, env(safe-area-inset-right, 16px))',
      }}
      aria-label="Mobile Social Media Menu"
    >
      {/* SOCIAL OPTIONS VERTICAL ARRANGEMENT */}
      <div 
        className={`flex flex-col items-end gap-2.5 mb-2.5 transition-all duration-200 ease-out origin-bottom-right ${
          socialMenuOpen 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-2 scale-[0.94] pointer-events-none'
        }`}
        aria-hidden={!socialMenuOpen}
      >
        {socialLinks.map((item, index) => {
          const Icon = item.icon;
          // Stagger calculation: Email (bottom-most) appears first, Instagram (top-most) appears last
          const delay = socialMenuOpen ? (socialLinks.length - 1 - index) * 35 : 0;

          return (
            <a
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={handleLinkClick}
              aria-label={item.ariaLabel}
              tabIndex={socialMenuOpen ? 0 : -1}
              style={{
                transition: 'opacity 220ms ease-out, transform 220ms ease-out',
                transitionDelay: `${delay}ms`
              }}
              className="group flex items-center justify-end gap-2 active:scale-[0.97] cursor-pointer"
            >
              {/* Compact Pill Label */}
              <span className="text-[11px] font-sans font-medium text-zinc-700 bg-white/95 px-2.5 py-1 rounded-full border border-black/[0.08] shadow-2xs whitespace-nowrap">
                {item.label}
              </span>

              {/* Icon Circle Button */}
              <span className="w-10 h-10 rounded-full bg-white border border-black/[0.1] text-zinc-700 group-hover:text-[#0062FF] group-hover:border-[#0062FF]/40 flex items-center justify-center shadow-xs transition-colors">
                <Icon size={18} />
              </span>
            </a>
          );
        })}
      </div>

      {/* FLOATING @ BUTTON */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={socialMenuOpen ? "Close social media menu" : "Open social media menu"}
        aria-expanded={socialMenuOpen}
        className={`w-[44px] h-[44px] rounded-full bg-white border transition-all duration-200 flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.1)] active:scale-[0.97] cursor-pointer ${
          socialMenuOpen 
            ? 'border-[#0062FF] ring-2 ring-[#0062FF]/20 text-[#0062FF]' 
            : 'border-black/[0.12] text-zinc-800 hover:text-[#0062FF] hover:border-[#0062FF]/40'
        }`}
      >
        <span className="font-sans font-bold text-base leading-none select-none">
          @
        </span>
      </button>
    </aside>
  );
}
