import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowRight, Compass, 
  Layers, Calendar, Users, FolderDown, 
  Cpu, Menu, X, ChevronRight, ChevronUp, ChevronDown, Radio, Building2, Award, Camera,
  Sun, Moon
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Navbar({ 
  currentRoute = 'home',
  identityTheme = 'default',
  theme = 'light',
  onToggleTheme,
  onOpenSearch
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Collapsible Floating Navigation Orb state
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [contentSize, setContentSize] = useState({ width: 0, height: 53 });

  const navRef = useRef(null);
  const contentRef = useRef(null);
  const collapseTimerRef = useRef(null);

  // Track prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Measure content natural dimensions
  useEffect(() => {
    const updateSize = () => {
      if (contentRef.current) {
        const w = contentRef.current.scrollWidth;
        const h = contentRef.current.scrollHeight;
        if (w > 0) {
          setContentSize({ width: w, height: h || 53 });
        }
      }
    };
    updateSize();
    const t = setTimeout(updateSize, 120);
    window.addEventListener('resize', updateSize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Desktop Hover Handlers
  const handleMouseEnter = () => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isPinned) return;
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
    }
    collapseTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 600);
  };

  // Click / Tap Toggle (Pin Mode)
  const handleToggle = (e) => {
    if (e) e.stopPropagation();
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    if (!isOpen) {
      setIsOpen(true);
      setIsPinned(true);
    } else {
      setIsOpen(false);
      setIsPinned(false);
    }
  };

  // Mobile / Desktop Outside Click Detection
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsPinned(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick, { passive: true });
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isOpen]);

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

  // Keyboard shortcut: Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        audioEngine.playClick();
        onOpenSearch();
      }
      if (e.key === 'Escape') {
        if (mobileDrawerOpen) setMobileDrawerOpen(false);
        if (isOpen) {
          setIsOpen(false);
          setIsPinned(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch, mobileDrawerOpen, isOpen]);

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

      {/* 2. COLLAPSIBLE FLOATING NAVIGATION ORB & BOTTOM NAVBAR */}
      <nav 
        ref={navRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed bottom-3.5 sm:bottom-6 inset-x-0 mx-auto w-fit max-w-[96vw] z-50 select-none flex items-center justify-center pb-[env(safe-area-inset-bottom,0px)]"
        aria-label="Bottom Navigation"
      >
        <div
          className={`relative flex items-center justify-center rounded-full overflow-hidden transition-all ${
            isOpen
              ? 'bg-white/94 dark:bg-[#0A0A0C]/94 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_14px_44px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] text-zinc-950 dark:text-white'
              : 'bg-[#0062FF] border-2 border-white/90 shadow-[0_6px_24px_rgba(0,98,255,0.55),0_0_16px_rgba(0,98,255,0.4)] cursor-pointer hover:scale-110 active:scale-95'
          }`}
          style={{
            width: isOpen ? (contentSize.width ? `${contentSize.width}px` : 'max-content') : '46px',
            height: isOpen ? (contentSize.height ? `${contentSize.height}px` : '53px') : '46px',
            transitionProperty: reducedMotion ? 'none' : 'width, height, background-color, border-color, box-shadow, transform',
            transitionDuration: isOpen ? '380ms' : '280ms',
            transitionTimingFunction: isOpen ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'bottom center',
          }}
        >
          {/* A. COLLAPSED ORB INDICATOR (High-visibility 46px diameter) */}
          <button
            type="button"
            onClick={handleToggle}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            tabIndex={isOpen ? -1 : 0}
            className={`absolute inset-0 w-full h-full flex items-center justify-center bg-transparent border-none p-0 cursor-pointer transition-opacity ${
              isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{
              transitionDuration: '200ms',
            }}
          >
            <ChevronUp size={20} strokeWidth={2.5} className="text-white shrink-0 drop-shadow-xs" />
          </button>

          {/* B. EXPANDED NAVBAR CONTENT */}
          <div
            ref={contentRef}
            className={`flex items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 w-max shrink-0 transition-opacity ${
              isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              transitionDuration: isOpen ? '300ms' : '180ms',
              transitionDelay: isOpen ? '50ms' : '0ms',
            }}
          >
            {/* BRAND ANCHOR */}
            <a
              href="#/"
              onClick={() => {
                audioEngine.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
                transition: reducedMotion
                  ? 'none'
                  : isOpen
                  ? 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'opacity 180ms ease, transform 180ms ease',
                transitionDelay: isOpen ? '60ms' : '0ms',
              }}
              className="flex items-center gap-2.5 pl-1.5 sm:pl-2 pr-2.5 sm:pr-3.5 py-1.5 rounded-full hover:bg-black/[0.04] transition-colors group cursor-pointer shrink-0"
              title="IEI SIES GST — Return to About"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-black/10 p-1 flex items-center justify-center shadow-2xs group-hover:border-[#0062FF] transition-all">
                <img 
                  src="/iei-official-logo.png" 
                  alt="IEI Emblem" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="hidden md:flex flex-col text-left leading-none">
                <span className="font-display font-black text-[13px] tracking-tight text-zinc-950 dark:text-white">
                  IEI · GST
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                  Student Chapter
                </span>
              </div>
            </a>

            {/* DIVIDER */}
            <div 
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
                transition: reducedMotion ? 'none' : 'opacity 300ms ease, transform 350ms ease',
                transitionDelay: isOpen ? '90ms' : '0ms',
              }}
              className="h-6 w-[1px] bg-black/10 dark:bg-white/15 hidden sm:block shrink-0" 
            />

            {/* DESKTOP & TABLET PRIMARY NAV CHIPS */}
            <div className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link, idx) => {
                const isActive = currentRoute === link.id;
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      audioEngine.playClick();
                    }}
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
                      transition: reducedMotion
                        ? 'none'
                        : isOpen
                        ? 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'opacity 180ms ease, transform 180ms ease',
                      transitionDelay: isOpen ? `${idx * 35 + 110}ms` : '0ms',
                    }}
                    className={`px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive 
                        ? 'bg-[#0062FF] text-white font-semibold shadow-[0_4px_16px_rgba(0,98,255,0.35)]' 
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
                    }`}
                  >
                    <Icon size={15} className={isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-400'} />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* MOBILE / COMPACT SCREEN CHIPS */}
            <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[55vw] sm:max-w-[65vw] px-1">
              {navLinks.map((link, idx) => {
                const isActive = currentRoute === link.id;
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      audioEngine.playClick();
                    }}
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
                      transition: reducedMotion
                        ? 'none'
                        : isOpen
                        ? 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'opacity 180ms ease, transform 180ms ease',
                      transitionDelay: isOpen ? `${idx * 30 + 100}ms` : '0ms',
                    }}
                    className={`px-3 py-2 rounded-full text-[13px] transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                      isActive 
                        ? 'bg-[#0062FF] text-white font-semibold shadow-[0_4px_12px_rgba(0,98,255,0.3)]' 
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
                    }`}
                    title={link.label}
                  >
                    <Icon size={15} className={isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-400'} />
                    <span className="hidden sm:inline text-[12px]">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* UTILITY CONTROLS: Theme Toggle, Mobile Drawer & Close Toggle */}
            <div 
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
                transition: reducedMotion ? 'none' : 'opacity 300ms ease, transform 350ms ease',
                transitionDelay: isOpen ? `${navLinks.length * 35 + 110}ms` : '0ms',
              }}
              className="flex items-center gap-1 shrink-0"
            >
              {/* Sun / Moon Theme Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  onToggleTheme && onToggleTheme();
                }}
                className="p-2 sm:p-2.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer shrink-0"
                aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === 'dark' ? (
                  <Sun size={16} className="text-amber-400 hover:rotate-45 transition-transform duration-300" />
                ) : (
                  <Moon size={16} className="text-zinc-700 hover:-rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Mobile Expand Drawer Trigger */}
              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  setMobileDrawerOpen(!mobileDrawerOpen);
                }}
                className="lg:hidden p-2.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
                aria-label="Toggle mobile directory menu"
              >
                {mobileDrawerOpen ? <X size={17} /> : <Menu size={17} />}
              </button>

              {/* Close / Collapse Navigation Toggle */}
              <button
                type="button"
                onClick={handleToggle}
                className="p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
                aria-label="Close navigation"
                title="Close navigation"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE FULL-SCREEN SHEET OVERLAY */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 dark:bg-black/98 backdrop-blur-3xl flex flex-col justify-between p-6 pb-24 pt-12 animate-fadeIn select-none text-zinc-950 dark:text-white">
          
          <div className="space-y-4 max-w-md mx-auto w-full">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/10 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span>Chapter Navigation</span>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  onToggleTheme && onToggleTheme();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-zinc-800 dark:text-zinc-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-zinc-700 dark:text-zinc-300" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
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
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.06] border-transparent font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'} />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight size={14} className={isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="max-w-md mx-auto w-full space-y-3 pt-4 border-t border-black/[0.06] dark:border-white/10 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
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
