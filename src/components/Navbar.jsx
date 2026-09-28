import React, { useState, useEffect } from 'react';
import { 
  Search, Volume2, VolumeX, ArrowRight, Compass, 
  Layers, Calendar, Users, FolderDown, 
  Cpu, Menu, X, ChevronRight, Radio, Building2, Award, Camera
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Navbar({ 
  currentRoute = 'home',
  identityTheme = 'default',
  onToggleTheme,
  onOpenSearch
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
    { label: 'Resources', href: '#/resources', id: 'resources', icon: FolderDown }
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
            </div>

            <div className="hidden md:flex flex-col text-left leading-none">
              <span className="font-display font-black text-xs tracking-tight text-zinc-950">
                IEI · GST
              </span>
              <span className="text-[10px] text-zinc-500 font-medium mt-0.5">
                Student Chapter
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'bg-[#0062FF] text-white font-semibold shadow-[0_4px_16px_rgba(0,98,255,0.35)]' 
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
                  className={`px-2.5 py-1.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1 shrink-0 ${
                    isActive 
                      ? 'bg-[#0062FF] text-white font-semibold shadow-[0_4px_12px_rgba(0,98,255,0.3)]' 
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

          {/* UTILITY CONTROLS */}
          <div className="flex items-center gap-1 shrink-0">
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
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] text-xs text-zinc-500 font-medium">
              <span>Chapter Navigation</span>
              <span>SIES GST</span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
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
                    className={`flex items-center justify-between text-sm py-3 px-4 rounded-xl transition-all border ${
                      isActive
                        ? 'bg-[#0062FF] text-white border-blue-500 shadow-sm font-semibold'
                        : 'text-zinc-700 hover:text-zinc-950 hover:bg-black/[0.03] border-transparent font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-white' : 'text-zinc-500'} />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight size={14} className={isActive ? 'text-white' : 'text-zinc-400'} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="max-w-md mx-auto w-full space-y-3 pt-4 border-t border-black/[0.06] text-xs text-zinc-500 font-medium">
            <div className="flex items-center justify-between text-xs">
              <span>SIES GST, Navi Mumbai</span>
              <span>Department of ECS</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
