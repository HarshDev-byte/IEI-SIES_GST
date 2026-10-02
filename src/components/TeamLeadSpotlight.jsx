import React, { useState, useRef, useCallback } from 'react';
import { audioEngine } from '../utils/audioEngine';
import './TeamLeadSpotlight.css';

/**
 * ==========================================================================
 * IEI SIES GST — TEAM LEAD SPOTLIGHT (EXPERIMENTAL PROTOTYPE)
 * Monochrome 3-person group photograph with pixel-perfect, person-specific
 * color reveal, restrained typography, and emerging portrait transitions.
 * ==========================================================================
 */

const PROTOTYPE_LEADS = [
  {
    id: "123A8001",
    name: "A S Lakshanya",
    position: "Event and Community Manager",
    council: "Senior Council",
    branch: "AIDS",
    maskId: "mask-lakshanya",
    maskUrl: "/assets/team-hero/mask-lakshanya.png",
    portraitUrl: "/assets/team-hero/portrait-lakshanya.jpg",
    hitAreaLeft: "3%",
    hitAreaWidth: "32%",
    centerPercentX: 19.5,
  },
  {
    id: "124A7051",
    name: "Nimish Roge",
    position: "Design & Media Head",
    council: "Junior Council",
    branch: "ECS",
    maskId: "mask-nimish",
    maskUrl: "/assets/team-hero/mask-nimish.png",
    portraitUrl: "/assets/team-hero/portrait-nimish.jpg",
    hitAreaLeft: "35%",
    hitAreaWidth: "30%",
    centerPercentX: 50.5,
  },
  {
    id: "124A7028",
    name: "Maadeshselvan Chidambarakuthala",
    position: "Creative Head",
    council: "Junior Council",
    branch: "ECS",
    maskId: "mask-maadesh",
    maskUrl: "/assets/team-hero/mask-maadesh.png",
    portraitUrl: "/assets/team-hero/portrait-maadesh.jpg",
    hitAreaLeft: "65%",
    hitAreaWidth: "32%",
    centerPercentX: 81.5,
  }
];

export default function TeamLeadSpotlight() {
  const [activeId, setActiveId] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isEmerging, setIsEmerging] = useState(false);
  const isNavigatingRef = useRef(false);
  const hitButtonsRef = useRef([]);

  // Check if reduced motion is requested by user
  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Execute selection and emerging portrait navigation
  const triggerSelection = useCallback((person) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    if (audioEngine?.playClick) {
      audioEngine.playClick();
    }

    setSelectedPerson(person);
    setActiveId(person.id);

    // If user prefers reduced motion, navigate immediately without animation
    if (prefersReducedMotion()) {
      window.location.hash = `#/member/${person.id}`;
      return;
    }

    // Trigger emerging portrait card animation
    requestAnimationFrame(() => {
      setIsEmerging(true);
    });

    // Navigate to member profile after transition finishes
    setTimeout(() => {
      window.location.hash = `#/member/${person.id}`;
    }, 560);
  }, [prefersReducedMotion]);

  const activeIdRef = useRef(null);

  // Activate a person's color state
  const handleActivate = (id) => {
    if (selectedPerson) return;
    activeIdRef.current = id;
    setActiveId(id);
    if (audioEngine?.playHover) {
      audioEngine.playHover();
    }
  };

  const handleDeactivate = () => {
    if (selectedPerson) return;
    const timeSinceTouch = Date.now() - lastTouchTimeRef.current;
    if (timeSinceTouch < 4000) {
      return;
    }
    activeIdRef.current = null;
    setActiveId(null);
  };

  const lastTouchTimeRef = useRef(0);

  const handleTouchStart = () => {
    lastTouchTimeRef.current = Date.now();
  };

  // Click & Mobile Tap Handler
  const handleHitClick = (person) => {
    if (selectedPerson) return;

    // Detect if this click originated from a touch tap
    const isTouchTap = (Date.now() - lastTouchTimeRef.current) < 700;
    const isAlreadyActive = activeIdRef.current === person.id;

    if (isTouchTap && !isAlreadyActive) {
      handleActivate(person.id);
      return;
    }

    // Mouse click on desktop or second mobile tap on active person
    triggerSelection(person);
  };

  // Keyboard Navigation: Tab, Enter, Space, Arrow keys
  const handleKeyDown = (e, index, person) => {
    if (selectedPerson) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % PROTOTYPE_LEADS.length;
      hitButtonsRef.current[nextIndex]?.focus();
      handleActivate(PROTOTYPE_LEADS[nextIndex].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + PROTOTYPE_LEADS.length) % PROTOTYPE_LEADS.length;
      hitButtonsRef.current[prevIndex]?.focus();
      handleActivate(PROTOTYPE_LEADS[prevIndex].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerSelection(person);
    }
  };

  return (
    <section 
      className="team-spotlight-root max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8"
      aria-label="Student Leadership Visual Spotlight"
    >
      {/* Editorial Section Header */}
      <div className="team-spotlight-header">
        <div>
          <span className="team-spotlight-eyebrow">
            Executive Prototype • IEI SIES GST
          </span>
          <h2 className="team-spotlight-title">
            Student Leadership
          </h2>
        </div>
        <p className="team-spotlight-hint">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0062FF] inline-block shrink-0" aria-hidden="true" />
          <span>Hover or tap an executive to focus • Select to open profile</span>
        </p>
      </div>

      {/* Primary Visual Stage Container */}
      <div className="team-spotlight-stage">
        {/* Layer A: Grayscale Base Layer (100% Crisp Monochrome) */}
        <img
          src="/assets/team-hero/group.jpg"
          alt="IEI SIES GST Student Leadership Group Photograph"
          className={`spotlight-layer-base ${selectedPerson ? 'is-dimmed' : ''}`}
        />

        {/* Layer B: Person-Specific Full-Color Reveals (Pixel-Perfect Alignment via Universal Alpha/Luminance Masks) */}
        {PROTOTYPE_LEADS.map((person) => {
          const isPersonActive = activeId === person.id;
          return (
            <div
              key={`color-${person.id}`}
              className={`spotlight-layer-color ${isPersonActive ? 'is-active' : ''}`}
              style={{
                WebkitMaskImage: `url('${person.maskUrl}')`,
                maskImage: `url('${person.maskUrl}')`,
              }}
              aria-hidden="true"
            >
              <img
                src="/assets/team-hero/group.jpg"
                alt=""
                draggable={false}
              />
            </div>
          );
        })}

        {/* Interactive Hit Areas Layer (No scroll blocking, native accessibility) */}
        <div 
          className={`spotlight-hit-layer ${selectedPerson ? 'has-selection' : ''}`} 
          role="group" 
          aria-label="Leadership Selection"
        >
          {PROTOTYPE_LEADS.map((person, index) => {
            const isActive = activeId === person.id;
            const isSelected = selectedPerson?.id === person.id;

            return (
              <button
                key={person.id}
                ref={(el) => (hitButtonsRef.current[index] = el)}
                type="button"
                className={`spotlight-hit-button ${isActive ? 'is-active' : ''} ${isSelected ? 'is-selected' : ''}`}
                style={{
                  left: person.hitAreaLeft,
                  width: person.hitAreaWidth,
                }}
                aria-label={`${person.name}, ${person.position}. ${isActive ? 'Currently focused. Click to open full member profile.' : 'Click to inspect.'}`}
                aria-pressed={isActive}
                onMouseEnter={() => handleActivate(person.id)}
                onMouseLeave={handleDeactivate}
                onPointerEnter={() => handleActivate(person.id)}
                onFocus={() => handleActivate(person.id)}
                onBlur={handleDeactivate}
                onTouchStart={handleTouchStart}
                onClick={() => handleHitClick(person)}
                onKeyDown={(e) => handleKeyDown(e, index, person)}
              >
                {/* Keyboard Focus Ring */}
                <span className="spotlight-focus-ring" aria-hidden="true" />

                {/* Restrained Identity Label (Fade / Translate 4-6px, strictly no badges) */}
                <div className="spotlight-label-wrap" aria-hidden="true">
                  <div className="spotlight-label-name">{person.name}</div>
                  <div className="spotlight-label-role">{person.position}</div>
                  <div className="spotlight-label-council">{person.council}</div>
                  <div className="spotlight-mobile-hint">Tap again to view profile</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Emerging Individual Portrait Transition */}
        {selectedPerson && (
          <div 
            className="spotlight-emerging-portal"
            style={{ left: `${selectedPerson.centerPercentX}%` }}
            aria-live="polite"
          >
            <div className={`spotlight-emerging-card ${isEmerging ? 'is-emerging' : ''}`}>
              <img 
                src={selectedPerson.portraitUrl} 
                alt={selectedPerson.name}
                className="spotlight-emerging-image"
              />
              <div className="spotlight-emerging-caption">
                <div className="spotlight-emerging-title">{selectedPerson.name}</div>
                <div className="spotlight-emerging-sub">{selectedPerson.position}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
