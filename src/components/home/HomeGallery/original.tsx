'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import styles from './RadialCarousel.module.css';

// ===========================================================================
// SCROLL LOCK — Locks body scroll when lightbox is open.
// Saves scroll position, compensates scrollbar width, restores on close.
// Compatible with native scroll (no Lenis present in this app).
// ===========================================================================
function lockScroll(): () => void {
  const scrollY = window.scrollY || window.pageYOffset;

  // Measure scrollbar width to prevent layout shift when overflow:hidden hides it
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Preserve original body styles so we can fully restore them
  const originalPosition = document.body.style.position;
  const originalTop      = document.body.style.top;
  const originalWidth    = document.body.style.width;
  const originalOverflow = document.body.style.overflow;
  const originalPaddingRight = document.body.style.paddingRight;

  // Apply lock
  document.body.style.position     = 'fixed';
  document.body.style.top          = `-${scrollY}px`;
  document.body.style.width        = '100%';
  document.body.style.overflow     = 'hidden';
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  // Return a cleanup function that fully restores scroll state
  return () => {
    document.body.style.position     = originalPosition;
    document.body.style.top          = originalTop;
    document.body.style.width        = originalWidth;
    document.body.style.overflow     = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
    // Restore the exact scroll position without visible jump
    window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
  };
}

export interface GalleryItem {
  id: string | number;
  url: string;
  title?: string;
}

export type RadialCarouselItem = GalleryItem;

export interface RadialCarouselProps {
  items: GalleryItem[];
  radius?: number;
  thumbnailSize?: number;
  centerSize?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

// Autoplay interval in milliseconds
const AUTOPLAY_MS = 3500;

export const RadialCarousel: React.FC<RadialCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [mounted, setMounted] = useState(false);

  // Track whether user is hovering / dragging — pause autoplay during interaction
  const isUserInteracting = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Gesture intent & coordinate tracking for horizontal swipe detection
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const touchDeltaY = useRef<number>(0);
  const gestureIntent = useRef<'none' | 'undecided' | 'horizontal' | 'vertical'>('none');
  const isDragging = useRef<boolean>(false);
  const hasDragged = useRef<boolean>(false);
  const pointerIdRef = useRef<number | null>(null);
  const targetElementRef = useRef<HTMLElement | null>(null);

  // Activation threshold to determine intent (8–12px)
  const INTENT_THRESHOLD = 10;
  // Swipe distance threshold to advance cards
  const SWIPE_THRESHOLD = 40;

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = items.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // =========================================================================
  // SMOOTH AUTOPLAY — setInterval advances one card every AUTOPLAY_MS.
  // Paused while lightbox is open or user is interacting (hover / drag).
  // Ensures only ONE autoplay timer can exist at any time.
  // =========================================================================
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    autoplayRef.current = setInterval(() => {
      if (!isUserInteracting.current && !isLightboxOpen) {
        setActiveIndex((prev) => (prev + 1) % total);
      }
    }, AUTOPLAY_MS);
  }, [total, isLightboxOpen]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [startAutoplay]);

  // Pause when lightbox opens, resume when it closes
  useEffect(() => {
    if (isLightboxOpen) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    } else {
      startAutoplay();
    }
  }, [isLightboxOpen, startAutoplay]);

  // Card click: if clicking active card, open lightbox; side card → rotate to it.
  // Distinguishes tap from horizontal swipe and vertical page scroll.
  const handleCardClick = (index: number) => {
    if (hasDragged.current || gestureIntent.current === 'vertical' || gestureIntent.current === 'horizontal') return;
    if (index === activeIndex) {
      setIsLightboxOpen(true);
    } else {
      setActiveIndex(index);
    }
  };

  // Keyboard navigation when carousel container has focus
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLightboxOpen) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
  };

  // Hover pause
  const onMouseEnter = () => { isUserInteracting.current = true; };
  const onMouseLeave = () => {
    isUserInteracting.current = false;
    // Reset the interval timer so next advance is a full AUTOPLAY_MS from now
    startAutoplay();
  };

  // =========================================================================
  // GESTURE & HORIZONTAL-INTENT DETECTION
  // Preserves native vertical page scrolling; no preventDefault for vertical;
  // touch-action: pan-y remains intact; no mouse wheel interception.
  // =========================================================================
  const onPointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    touchDeltaX.current = 0;
    touchDeltaY.current = 0;
    gestureIntent.current = 'undecided';
    isDragging.current = false;
    hasDragged.current = false;
    pointerIdRef.current = e.pointerId;
    targetElementRef.current = e.currentTarget as HTMLElement;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (gestureIntent.current === 'vertical') {
      // Normal browser / Lenis vertical scrolling continues uninterrupted.
      // Never call preventDefault().
      return;
    }
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.clientX - touchStartX.current;
    const deltaY = e.clientY - touchStartY.current;
    touchDeltaX.current = deltaX;
    touchDeltaY.current = deltaY;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (gestureIntent.current === 'undecided') {
      // Activation threshold (8–12px)
      if (absX >= INTENT_THRESHOLD || absY >= INTENT_THRESHOLD) {
        if (absX > absY) {
          // Dominant horizontal motion: classify as HORIZONTAL CAROUSEL GESTURE
          gestureIntent.current = 'horizontal';
          isDragging.current = true;
          hasDragged.current = true;
          isUserInteracting.current = true;

          // Pause autoplay during drag
          if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
          }

          // Optional pointer capture only after horizontal intent is established
          try {
            if (targetElementRef.current && pointerIdRef.current !== null) {
              targetElementRef.current.setPointerCapture(pointerIdRef.current);
            }
          } catch {
            // Ignore if pointer capture fails
          }
        } else {
          // Dominant vertical motion: classify as VERTICAL PAGE SCROLL
          gestureIntent.current = 'vertical';
          isDragging.current = false;
          hasDragged.current = true; // Prevents accidental card click on pointer up
          touchStartX.current = null;
          touchStartY.current = null;
          // Normal vertical scrolling continues without interference
          return;
        }
      }
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    // Release pointer capture if held
    try {
      if (
        targetElementRef.current &&
        pointerIdRef.current !== null &&
        targetElementRef.current.hasPointerCapture(pointerIdRef.current)
      ) {
        targetElementRef.current.releasePointerCapture(pointerIdRef.current);
      }
    } catch {
      // Ignore
    }

    const wasHorizontal = gestureIntent.current === 'horizontal' && isDragging.current;
    const currentDeltaX = touchDeltaX.current;

    // Reset interaction states
    isDragging.current = false;
    touchStartX.current = null;
    touchStartY.current = null;
    touchDeltaX.current = 0;
    touchDeltaY.current = 0;
    pointerIdRef.current = null;
    targetElementRef.current = null;

    if (wasHorizontal) {
      if (currentDeltaX < -SWIPE_THRESHOLD) {
        handleNext();
      } else if (currentDeltaX > SWIPE_THRESHOLD) {
        handlePrev();
      }
    }

    // Small delay ensures onClick does not trigger if a drag or scroll took place
    setTimeout(() => {
      hasDragged.current = false;
      gestureIntent.current = 'none';
      isUserInteracting.current = false;
      startAutoplay();
    }, 60);
  };

  // =========================================================================
  // LIGHTBOX LOGIC, ACCESSIBILITY & SCROLL LOCK
  // =========================================================================

  // Ref to the unlock function returned by lockScroll()
  const unlockScrollRef = useRef<(() => void) | null>(null);

  // Block mouse wheel from reaching the page while lightbox is open.
  // Uses a callback ref so the listener is attached immediately when the portal
  // overlay div mounts in the DOM (useEffect runs too late for portal refs).
  const lightboxOverlayRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const blockWheel = (e: WheelEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };
    node.addEventListener('wheel', blockWheel, { passive: false, capture: true });
    // No cleanup needed: the portal node is removed from DOM when lightbox closes.
  }, []);

  // Lock / unlock body scroll when lightbox opens / closes
  useEffect(() => {
    if (isLightboxOpen) {
      // Lock — save the unlock callback
      unlockScrollRef.current = lockScroll();
    } else {
      // Unlock — restore exact scroll position
      if (unlockScrollRef.current) {
        unlockScrollRef.current();
        unlockScrollRef.current = null;
      }
    }
  }, [isLightboxOpen]);

  // Global safety cleanup: if component unmounts while lightbox is open
  useEffect(() => {
    return () => {
      if (unlockScrollRef.current) {
        unlockScrollRef.current();
        unlockScrollRef.current = null;
      }
    };
  }, []);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleLightboxKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      else if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
    };
    window.addEventListener('keydown', handleLightboxKeys);
    return () => window.removeEventListener('keydown', handleLightboxKeys);
  }, [isLightboxOpen, handleNext, handlePrev]);

  // Lightbox touch swipe
  const lightboxTouchStartX = useRef<number | null>(null);
  const onLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
  };
  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - lightboxTouchStartX.current;
    if (delta < -50) handleNext();
    else if (delta > 50) handlePrev();
    lightboxTouchStartX.current = null;
  };

  if (!items || items.length === 0) return null;

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // 16:9 landscape card dimensions (must match CSS .cylinderCard)
  const cardW = isMobile ? 320 : isTablet ? 440 : 560;
  const cardH = Math.round(cardW * (9 / 16)); // 180 / 247 / 315

  // Cylinder geometry — larger radius to give 16:9 cards room to breathe
  const cylinderRadius = isMobile ? 400 : isTablet ? 560 : 720;
  const angleStep = isMobile ? 34 : isTablet ? 30 : 27;
  const visibleCardRange = isMobile ? 1 : 2;

  const activeItem = items[activeIndex];

  return (
    <div
      className={styles.cylinderContainer}
      tabIndex={0}
      role="region"
      aria-label="Auto-rotating cylindrical gallery. Click centre card to expand fullscreen."
      onKeyDown={handleKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 3D CYLINDRICAL STAGE */}
      <div className={styles.cylinderStage}>
        {items.map((item, index) => {
          let offset = index - activeIndex;
          while (offset > total / 2) offset -= total;
          while (offset < -total / 2) offset += total;

          const isVisible = Math.abs(offset) <= visibleCardRange;
          const isCenter = offset === 0;

          const angleDeg = offset * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;
          const translateX = Math.sin(angleRad) * cylinderRadius;

          let translateZ = 0;
          let scale = 1.0;
          let opacity = 1.0;
          let zIndex = 10;

          if (isCenter) {
            translateZ = 80;
            scale = 1.0;
            opacity = 1.0;
            zIndex = 30;
          } else if (Math.abs(offset) === 1) {
            translateZ = (Math.cos(angleRad) - 1) * cylinderRadius - 60;
            scale = isMobile ? 0.82 : 0.86;
            opacity = isMobile ? 0.65 : 0.82;
            zIndex = 20;
          } else if (Math.abs(offset) === 2) {
            translateZ = (Math.cos(angleRad) - 1) * cylinderRadius - 120;
            scale = 0.72;
            opacity = 0.42;
            zIndex = 10;
          } else {
            translateZ = (Math.cos(angleRad) - 1) * cylinderRadius - 200;
            scale = 0.55;
            opacity = 0.0;
            zIndex = 1;
          }

          const rotateY = angleDeg * 0.82;

          // Absolute-pixel centering so card geometric center sits at stage center
          const cx = translateX - cardW / 2;
          const cy = -cardH / 2;
          const cardTransform = `translate3d(${cx}px, ${cy}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

          return (
            <div
              key={item.id}
              className={`${styles.cylinderCard} ${isCenter ? styles.centerCardActive : ''}`}
              style={{
                transform: cardTransform,
                opacity,
                zIndex,
                visibility: isVisible ? 'visible' : 'hidden',
                pointerEvents: isVisible ? 'auto' : 'none',
                width: cardW,
                height: cardH,
              }}
              onClick={() => handleCardClick(index)}
              role="button"
              tabIndex={isCenter ? 0 : -1}
              aria-label={`${item.title || `Gallery item ${index + 1}`}${isCenter ? '. Click to open fullscreen.' : '. Click to bring to front.'}`}
            >
              <div className={styles.cardInner}>
                <Image
                  src={item.url}
                  alt={item.title || 'Gallery image'}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 560px"
                  className={styles.cardImage}
                  draggable={false}
                  priority={isCenter}
                />

                {isCenter && (
                  <button
                    type="button"
                    className={styles.cardCenterCue}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLightboxOpen(true);
                    }}
                    aria-label="Expand photograph to fullscreen"
                  >
                    <span>EXPAND →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LARGE PHOTOGRAPHIC DISPLAY TITLE (GEOMETRIC EDITORIAL TREATMENT) */}
      {activeItem?.title && (
        <div className={styles.selectedTitleContainer}>
          <h3 className={styles.selectedTitle}>
            {activeItem.title}
          </h3>
        </div>
      )}

      {/* =====================================================================
          FULL-VIEWPORT IMAGE LIGHTBOX (PORTAL TO DOCUMENT BODY)
          ===================================================================== */}
      {mounted && isLightboxOpen && createPortal(
        <div
          ref={lightboxOverlayRef}
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Gallery Viewer"
          onTouchStart={onLightboxTouchStart}
          onTouchEnd={onLightboxTouchEnd}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <button
            type="button"
            className={styles.lightboxCloseBtn}
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen gallery"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <div className={styles.lightboxImageContainer}>
            <Image
              src={activeItem.url}
              alt={activeItem.title || 'Fullscreen gallery photograph'}
              fill
              className={styles.lightboxImg}
              draggable={false}
              priority
              sizes="90vw"
            />
          </div>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <div className={styles.lightboxCaptionBar}>
            <span className={styles.lightboxCounter}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className={styles.lightboxTitle}>{activeItem?.title}</span>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
