import React, { useState, useEffect } from 'react';
import { 
  CrazySexyLoader, 
  Navbar, 
  Footer, 
  SearchModal, 
  LoginModal, 
  VerifyModal, 
  MembershipModal 
} from '@/components';

import { 
  HomePage, 
  ActivitiesPage, 
  EventsPage, 
  TeamPage, 
  ResourcesPage, 
  StudentHubPage 
} from '@/pages';

import { audioEngine } from '@/utils';

export default function App() {
  // Loader state
  const [showLoader, setShowLoader] = useState(true);

  // Identity Theme state ('default' | 'signature')
  const [identityTheme, setIdentityTheme] = useState('default');

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [selectedMembershipTier, setSelectedMembershipTier] = useState(null);

  // Router: Determine active route from URL hash
  const getRouteFromHash = () => {
    const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (!rawHash || rawHash === 'about' || rawHash === 'about-iei' || rawHash === 'what-we-do' || rawHash === 'membership' || rawHash === 'gallery' || rawHash === 'contact') {
      return 'home';
    }
    if (rawHash === 'activities' || rawHash === 'programs') return 'activities';
    if (rawHash === 'events' || rawHash === 'symposia') return 'events';
    if (rawHash === 'team' || rawHash === 'governance' || rawHash === 'faculty') return 'team';
    if (rawHash === 'resources' || rawHash === 'publications' || rawHash === 'downloads') return 'resources';
    if (rawHash === 'hub' || rawHash === 'student-hub' || rawHash === 'pass') return 'hub';
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const route = getRouteFromHash();
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

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

  // Forward all membership requests directly to Campus Headquarters (Communication Desk)
  const handleOpenMembership = (tier = 'Student Member (SMIE)') => {
    if (currentRoute !== 'home') {
      setCurrentRoute('home');
      window.location.hash = '#contact';
    }
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
      window.dispatchEvent(
        new CustomEvent('iei-open-inquiry', {
          detail: {
            category: 'Student Membership (SMIE)',
            tier: tier || 'Student Member (SMIE)',
            query: `I would like to apply for the ${tier || 'Student Member (SMIE)'} membership at SIES GST. Please guide me through the registration and fee verification process.`
          }
        })
      );
    }, 80);
  };

  // Event registration handler
  const handleRegisterEvent = (eventName) => {
    audioEngine.playClick();
    alert(`Attendance registered for "${eventName}". Official SIES GST chapter confirmation pass has been scheduled to your email.`);
  };

  return (
    <div className="min-h-screen text-zinc-950 bg-white relative selection:bg-[#0062FF] selection:text-white">
      
      {/* Professional Architectural Loading Screen */}
      {showLoader && (
        <CrazySexyLoader onComplete={() => setShowLoader(false)} />
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

      {/* Unified Floating Top Architectural Navbar */}
      <Navbar 
        currentRoute={currentRoute}
        identityTheme={identityTheme}
        onToggleTheme={() => {
          audioEngine.playSuccessChime();
          setIdentityTheme(prev => prev === 'default' ? 'signature' : 'default');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMembership={() => handleOpenMembership()}
      />

      {/* Main Dynamic Viewport Stream */}
      <main className="relative z-10 min-h-[85vh] pb-32 sm:pb-40">
        {currentRoute === 'home' && (
          <HomePage 
            onOpenMembership={() => handleOpenMembership()}
            onOpenVerify={() => setIsVerifyOpen(true)}
          />
        )}

        {currentRoute === 'activities' && (
          <ActivitiesPage 
            onOpenMembership={() => handleOpenMembership()}
          />
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

        {currentRoute === 'hub' && (
          <StudentHubPage 
            onApplyStudentMembership={(details) => handleOpenMembership(details)}
          />
        )}
      </main>

      {/* Clean Official Chapter Footer */}
      <Footer 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenVerify={() => setIsVerifyOpen(true)}
        onReplayLoader={() => setShowLoader(true)}
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

      <MembershipModal 
        isOpen={isMembershipOpen}
        selectedTier={selectedMembershipTier}
        onClose={() => setIsMembershipOpen(false)}
      />

    </div>
  );
}
