import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

// Minimal Recognizable Line Iconography for Footer Social Badges
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

export default function Footer() {
  return (
    <footer className="relative bg-[#FAFAFC] dark:bg-[#000000] pt-20 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8 z-10 transition-colors" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto">
        
        {/* Wordmark Header & Social Badges Row */}
        <div className="pb-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src="/iei-official-logo.png" alt="IEI Logo" className="w-8 h-8 object-contain" />
              <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 dark:text-white tracking-ultra-tight">
                IEI SIES GST
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Official Student Chapter · Department of Electronics &amp; Computer Science Engineering
            </p>
          </div>

          {/* Social Badges: Instagram · LinkedIn · GitHub · Email */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap" role="list" aria-label="Official Social and Contact Channels">
            {/* 1. Instagram */}
            <a
              href="https://www.instagram.com/ieisiesgst/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine?.playClick && audioEngine.playClick()}
              className="group relative flex items-center justify-center w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-xl bg-white dark:bg-[#0A0A0C] border border-black/[0.08] dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-[#0062FF] hover:border-[#0062FF]/40 hover:bg-[#0062FF]/[0.03] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#0062FF] focus-visible:outline-offset-2 shadow-2xs cursor-pointer"
              aria-label="Instagram"
              title="Instagram"
              role="listitem"
            >
              <InstagramIcon size={18} className="transition-transform duration-200 ease-out group-hover:scale-105" />
            </a>

            {/* 2. LinkedIn */}
            <a
              href="https://www.linkedin.com/company/iei-sies-gst"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine?.playClick && audioEngine.playClick()}
              className="group relative flex items-center justify-center w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-xl bg-white dark:bg-[#0A0A0C] border border-black/[0.08] dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-[#0062FF] hover:border-[#0062FF]/40 hover:bg-[#0062FF]/[0.03] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#0062FF] focus-visible:outline-offset-2 shadow-2xs cursor-pointer"
              aria-label="LinkedIn"
              title="LinkedIn"
              role="listitem"
            >
              <LinkedInIcon size={18} className="transition-transform duration-200 ease-out group-hover:scale-105" />
            </a>

            {/* 3. GitHub */}
            <a
              href="https://github.com/HarshDev-byte/IEI-SIES_GST"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine?.playClick && audioEngine.playClick()}
              className="group relative flex items-center justify-center w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-xl bg-white dark:bg-[#0A0A0C] border border-black/[0.08] dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-[#0062FF] hover:border-[#0062FF]/40 hover:bg-[#0062FF]/[0.03] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#0062FF] focus-visible:outline-offset-2 shadow-2xs cursor-pointer"
              aria-label="GitHub"
              title="GitHub"
              role="listitem"
            >
              <GitHubIcon size={18} className="transition-transform duration-200 ease-out group-hover:scale-105" />
            </a>

            {/* 4. Email */}
            <a
              href="mailto:iei@sies.edu.in"
              onClick={() => audioEngine?.playClick && audioEngine.playClick()}
              className="group relative flex items-center justify-center w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-xl bg-white dark:bg-[#0A0A0C] border border-black/[0.08] dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-[#0062FF] hover:border-[#0062FF]/40 hover:bg-[#0062FF]/[0.03] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#0062FF] focus-visible:outline-offset-2 shadow-2xs cursor-pointer"
              aria-label="Email"
              title="Email"
              role="listitem"
            >
              <EmailIcon size={18} className="transition-transform duration-200 ease-out group-hover:scale-105" />
            </a>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          
          {/* Col 1: National Headquarters */}
          <div>
            <div className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wide mb-3">
              National Headquarters
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mb-3">
              <strong>The Institution of Engineers (India)</strong><br />
              8 Gokhale Road, Kolkata - 700020<br />
              West Bengal, India<br />
              <a href="https://www.ieindia.org" target="_blank" rel="noopener noreferrer" className="text-[#0062FF] hover:underline">
                ieindia.org
              </a>
            </p>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Royal Charter 1935 · Recognized SIRO (DSIR)
            </div>
          </div>

          {/* Col 2: Directory */}
          <div>
            <div className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wide mb-3">
              National Directory
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <li><a href="#/" className="hover:text-black dark:hover:text-white transition-colors">Home Page</a></li>
              <li><a href="#/about" className="hover:text-black dark:hover:text-white transition-colors">About IEI &amp; Heritage</a></li>
              <li><a href="#/what-we-do" className="hover:text-black dark:hover:text-white transition-colors">What IEI Does (AMIE / CEng)</a></li>
            </ul>
          </div>

          {/* Col 3: Chapter & Programs */}
          <div>
            <div className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wide mb-3">
              SIES GST Chapter
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <li><a href="#/activities" className="hover:text-black dark:hover:text-white transition-colors">Workshops &amp; Activities</a></li>
              <li><a href="#/events" className="hover:text-black dark:hover:text-white transition-colors">Events &amp; Symposia</a></li>
              <li><a href="#/team" className="hover:text-black dark:hover:text-white transition-colors">Leadership &amp; 6 Wings</a></li>
              <li><a href="#/resources" className="hover:text-black dark:hover:text-white transition-colors">Resources &amp; Publications</a></li>
            </ul>
          </div>

          {/* Col 4: Campus & Contact */}
          <div>
            <div className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wide mb-3">
              Campus Headquarters
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mb-3">
              Department of ECS<br />
              SIES Graduate School of Technology<br />
              Sector-V, Nerul, Navi Mumbai - 400706
            </p>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <li>
                <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5">
                  <MapPin size={12} className="text-zinc-500 dark:text-zinc-400" />
                  <span>Campus Location</span>
                </a>
              </li>
              <li>
                <a href="mailto:iei@sies.edu.in" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail size={12} className="text-[#0062FF]" />
                  <span>iei@sies.edu.in</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <div>
            © 2026 The Institution of Engineers (India) · SIES GST Student Chapter.
          </div>
        </div>

      </div>
    </footer>
  );
}
