import React, { useState, useEffect } from 'react';
import { 
  CrazySexyLoader, 
  Navbar, 
  Footer, 
  SearchModal, 
  LoginModal, 
  VerifyModal,
  GlowingDotsGrid,
  MobileFloatingSocial
} from '@/components';

import { 
  HomePage, 
  ActivitiesPage, 
  EventsPage, 
  TeamPage, 
  ResourcesPage,
  MemberProfilePage 
} from '@/pages';

import { audioEngine } from '@/utils';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  // 240Hz smooth scroll (desktop only — mobile uses native OS momentum)
  useSmoothScroll();

  // Loader state — show on page load and allow manual replay
  const [showLoader, setShowLoader] = useState(true);

  // Page transition state — bumping this key triggers the fade-in animation
  const [transitionKey, setTransitionKey] = useState(0);

  // Identity Theme state ('default' | 'signature')
  const [identityTheme, setIdentityTheme] = useState('default');

  // Enforce pure light mode across entire chapter portal
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    try {
      localStorage.removeItem('iei-theme');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#FFFFFF');
    } catch (_) {}
  }, []);

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  // Router: Determine active route and member ID from URL hash
  const getRouteState = () => {
    const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (rawHash.startsWith('member/') || rawHash.startsWith('m/') || rawHash.startsWith('profile/') || (rawHash.startsWith('team/') && rawHash.length > 5)) {
      const memberId = rawHash.replace(/^(member|m|profile|team)\//, '');
      return { route: 'member-profile', memberId };
    }
    if (!rawHash || rawHash === 'about' || rawHash === 'about-iei' || rawHash === 'what-we-do' || rawHash === 'membership' || rawHash === 'gallery' || rawHash === 'contact') {
      return { route: 'home', memberId: null };
    }
    if (rawHash === 'activities' || rawHash === 'programs') return { route: 'activities', memberId: null };
    if (rawHash === 'events' || rawHash === 'symposia') return { route: 'events', memberId: null };
    if (rawHash.startsWith('team') || rawHash === 'governance' || rawHash === 'faculty') return { route: 'team', memberId: null };
    if (rawHash === 'resources' || rawHash === 'publications' || rawHash === 'downloads') return { route: 'resources', memberId: null };
    return { route: 'home', memberId: null };
  };

  const [routeState, setRouteState] = useState(getRouteState);
  const currentRoute = routeState.route;

  useEffect(() => {
    const handleHashChange = () => {
      const nextState = getRouteState();
      setRouteState(nextState);
      // Trigger page transition animation on every route change
      setTransitionKey(k => k + 1);
      const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
      if (rawHash === 'about' || rawHash === 'about-iei') {
        setTimeout(() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else if (rawHash === 'what-we-do') {
        setTimeout(() => {
          const el = document.getElementById('what-we-do');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else if (rawHash === 'contact') {
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    // On initial mount, if URL points to #about, smooth scroll down
    const initialRaw = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (initialRaw === 'about' || initialRaw === 'about-iei') {
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    const handleKeyDown = (e) => {
      // Replay loader on pressing 'r' or 'R' if not in an input/textarea
      if (
        (e.key === 'r' || e.key === 'R') &&
        !e.ctrlKey &&
        !e.metaKey &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA' &&
        !showLoader
      ) {
        setShowLoader(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showLoader]);

  // Event registration handler
  const handleRegisterEvent = (eventName) => {
    audioEngine.playClick();
    alert(`Attendance registered for "${eventName}". Official SIES GST chapter confirmation pass has been scheduled to your email.`);
  };

  return (
    <div className="min-h-screen text-zinc-950 bg-white relative selection:bg-[#0062FF] selection:text-white">
      
      {/* Professional Architectural Loading Screen */}
      {showLoader && (
        <CrazySexyLoader 
          onComplete={() => setShowLoader(false)} 
        />
      )}

      {/* Sleek Minimal Global Light Background */}
      <div className="global-background" aria-hidden="true">
        <div className="global-noise-grain" />
        <div className="global-warm-ambient" />
        {identityTheme === 'signature' && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.035] transition-opacity duration-500"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0062FF 1px, transparent 1px),
                linear-gradient(to bottom, #0062FF 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        )}
      </div>

      {/* Global Interactive Glowing Dots Grid Canvas (Active Across Entire Website) */}
      <GlowingDotsGrid isGlobal={true} enableEmblemClearance={false} />

      {/* Unified Floating Top Architectural Navbar */}
      <Navbar 
        currentRoute={currentRoute}
        identityTheme={identityTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Dynamic Viewport Stream — smooth page transition on route change */}
      <main className="relative z-10 min-h-[85vh] pb-32 sm:pb-40">
        <div key={transitionKey} className="page-transition-enter">
          {currentRoute === 'home' && (
            <HomePage 
              onOpenVerify={() => setIsVerifyOpen(true)}
              isReady={!showLoader}
            />
          )}

          {currentRoute === 'activities' && (
            <ActivitiesPage />
          )}

          {currentRoute === 'events' && (
            <EventsPage 
              onRegisterEvent={handleRegisterEvent}
            />
          )}

          {currentRoute === 'team' && (
            <TeamPage />
          )}

          {currentRoute === 'resources' && (
            <ResourcesPage />
          )}

          {currentRoute === 'member-profile' && (
            <MemberProfilePage memberId={routeState.memberId} />
          )}
        </div>
      </main>

      {/* Clean Official Chapter Footer */}
      <Footer 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenVerify={() => setIsVerifyOpen(true)}
        onReplayLoader={() => {
          // Allow manual replay of the loader from footer (clears session flag too)
          try { sessionStorage.removeItem('iei-loader-shown'); } catch (_) {}
          setShowLoader(true);
        }}
      />

      {/* Global Interactive Modals */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <VerifyModal 
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
      />

      {/* Mobile-Only Floating Social Media Menu (<= 767px) */}
      <MobileFloatingSocial />

    </div>
  );
}
