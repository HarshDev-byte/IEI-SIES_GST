import React, { useState, useEffect } from 'react';
import { 
  Search, Volume2, VolumeX, ArrowRight, Compass, 
  Layers, Calendar, Users, Sparkles, FolderDown, 
  Cpu, Menu, X, ChevronRight, Radio, Building2, Award, Camera
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Navbar({ 
  currentRoute = 'home',
  identityTheme = 'default',
  onToggleTheme,
  onOpenSearch, 
  onOpenMembership 
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(() => audioEngine.isActive);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Track document scroll progress for the top laser depth line
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalDocHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        audioEngine.playClick();
        onOpenSearch();
      }
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch, mobileDrawerOpen]);

  const handleToggleSound = () => {
    const active = audioEngine.toggle();
    setIsSoundOn(active);
    if (active) {
      audioEngine.playSuccessChime();
    }
  };

  const navLinks = [
    { label: 'About', href: '#/', id: 'home', icon: Compass },
    { label: 'Activities', href: '#/activities', id: 'activities', icon: Cpu },
    { label: 'Events', href: '#/events', id: 'events', icon: Calendar },
    { label: 'Team', href: '#/team', id: 'team', icon: Users },
    { label: 'Resources', href: '#/resources', id: 'resources', icon: FolderDown },
    { label: 'Student Hub', href: '#/hub', id: 'hub', icon: Sparkles }
  ];

  return (
    <>
      {/* 1. TOP VIEWPORT CYBERNETIC READING DEPTH LASER */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2px] bg-black/[0.04]">
        <div 
          className="h-full bg-gradient-to-r from-zinc-950 via-[#0062FF] to-blue-500 shadow-[0_0_10px_rgba(0,98,255,0.6)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. PRISTINE ARCHITECTURAL WHITE BOTTOM NAVBAR */}
      <nav 
        className="fixed bottom-3 sm:bottom-5 inset-x-0 mx-auto w-fit max-w-[96vw] z-50 select-none animate-fadeIn"
        aria-label="Bottom Navigation"
      >
        <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/92 backdrop-blur-2xl border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] text-zinc-950">
          
          {/* BRAND ANCHOR */}
          <a
            href="#/"
            onClick={() => {
              audioEngine.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 pl-1 sm:pl-1.5 pr-2 sm:pr-3 py-1 rounded-full hover:bg-black/[0.04] transition-colors group cursor-pointer shrink-0"
            title="IEI SIES GST — Return to About"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black/10 p-1 flex items-center justify-center shadow-2xs group-hover:border-[#0062FF] transition-all">
              <img 
                src="/iei-official-logo.png" 
                alt="IEI Emblem" 
                className="w-full h-full object-contain"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>

            <div className="hidden md:flex flex-col text-left leading-none">
              <span className="font-display font-black text-xs tracking-tight text-zinc-950">
                IEI · GST
              </span>
              <span className="font-mono text-[9px] text-[#0062FF] tracking-wider mt-0.5 font-bold flex items-center gap-0.5">
                <span>Tenure 1</span>
                <span className="text-purple-600 font-bold text-[8px]">✦</span>
              </span>
            </div>
          </a>

          {/* DIVIDER */}
          <div className="h-5 w-[1px] bg-black/10 hidden sm:block shrink-0" />

          {/* DESKTOP & TABLET PRIMARY NAV CHIPS */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    audioEngine.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'bg-[#0062FF] text-white font-bold shadow-[0_4px_16px_rgba(0,98,255,0.35)] scale-[1.02]' 
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04]'
                  }`}
                >
                  <Icon size={13} className={isActive ? 'text-white' : 'text-zinc-400'} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* MOBILE / COMPACT SCREEN CHIPS */}
          <div className="flex lg:hidden items-center gap-1 overflow-x-auto no-scrollbar max-w-[55vw] sm:max-w-[65vw] px-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    audioEngine.playClick();
                  }}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1 shrink-0 ${
                    isActive 
                      ? 'bg-[#0062FF] text-white font-bold shadow-[0_4px_12px_rgba(0,98,255,0.3)]' 
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04]'
                  }`}
                  title={link.label}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-zinc-400'} />
                  <span className="hidden sm:inline text-[11px]">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* DIVIDER */}
          <div className="h-5 w-[1px] bg-black/10 shrink-0" />

          {/* UTILITY CONTROLS: JOIN & MOBILE TOGGLE ONLY */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Primary Action: Join */}
            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                onOpenMembership();
              }}
              className="ml-0.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-950 hover:bg-[#0062FF] text-white font-mono text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>JOIN</span>
              <ArrowRight size={12} />
            </button>

            {/* Mobile Expand Drawer Trigger */}
            <button
              type="button"
              onClick={() => {
                audioEngine.playClick();
                setMobileDrawerOpen(!mobileDrawerOpen);
              }}
              className="lg:hidden p-2 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04] transition-colors cursor-pointer"
              aria-label="Toggle mobile directory menu"
            >
              {mobileDrawerOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>

        </div>
      </nav>

      {/* 3. MOBILE FULL-SCREEN SHEET OVERLAY */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-3xl flex flex-col justify-between p-6 pb-24 pt-12 animate-fadeIn select-none text-zinc-950">
          
          <div className="space-y-4 max-w-md mx-auto w-full">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] font-mono text-xs text-zinc-500">
              <span className="text-[#0062FF] uppercase tracking-widest font-bold">
                CHAPTER DIRECTORY
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                const isActive = currentRoute === link.id;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      audioEngine.playClick();
                      setMobileDrawerOpen(false);
                    }}
                    className={`flex items-center justify-between font-mono text-sm py-3 px-4 rounded-xl transition-all border ${
                      isActive
                        ? 'bg-[#0062FF] text-white border-blue-500 shadow-sm font-bold'
                        : 'text-zinc-700 hover:text-zinc-950 hover:bg-black/[0.03] border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 text-xs">0{idx + 1}</span>
                      <Icon size={16} className={isActive ? 'text-white' : 'text-zinc-500'} />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight size={14} className={isActive ? 'text-white' : 'text-zinc-400'} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="max-w-md mx-auto w-full space-y-3 pt-4 border-t border-black/[0.06] font-mono text-xs text-zinc-500">
            <div className="flex items-center justify-between text-[11px]">
              <span>SIES GST, NERUL</span>
              <span>19.0330° N, 73.0297° E</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileDrawerOpen(false);
                onOpenMembership();
              }}
              className="w-full bg-zinc-950 hover:bg-[#0062FF] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>APPLY FOR STUDENT MEMBERSHIP</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
