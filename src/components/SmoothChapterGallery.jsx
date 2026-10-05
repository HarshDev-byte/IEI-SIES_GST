import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { CustomEase } from 'gsap/CustomEase';
import { ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './SmoothChapterGallery.css';

// Register GSAP plugins
gsap.registerPlugin(Observer, CustomEase);
try {
  CustomEase.create("osmo", "M0,0 C0.625,0.05 0,1 1,1");
} catch {
  // Ignore if already created
}

const CHAPTER_SLIDES = [
  {
    id: "conclave",
    title: "Technical Conclave",
    category: "Symposium & Plenary",
    location: "Main Auditorium, SIES GST",
    date: "Annual Academic Session",
    desc: "Plenary assembly of 400+ engineering students, distinguished national fellows, and department faculty inaugurating the annual chapter symposium.",
    bgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=75",
    maskUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=640&q=75"
  },
  {
    id: "hardware",
    title: "Hardware Testbench",
    category: "ARM Cortex RTOS Lab",
    location: "Hardware Lab 3, ECS Department",
    date: "Fall Semester Sprint",
    desc: "Oscilloscope and logic analyzer telemetry debugging during an intensive 32-bit ARM Cortex embedded systems sprint.",
    bgUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=75",
    maskUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=640&q=75"
  },
  {
    id: "hackathon",
    title: "Collegiate Hackathon",
    category: "Rapid Prototyping Sprint",
    location: "Central Computing Arena",
    date: "Annual Flagship",
    desc: "36-hour sprint with collegiate teams fabricating embedded firmware, mobile architectures, and machine learning inference pipelines.",
    bgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=75",
    maskUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=640&q=75"
  },
  {
    id: "robotics",
    title: "Robotics Testbed",
    category: "Autonomous Sensor Arrays",
    location: "IoT & Robotics Cell",
    date: "Innovation Division",
    desc: "Hands-on calibration of multi-axis robotic actuators and real-time industrial telemetry buses across student project tracks.",
    bgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=75",
    maskUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=640&q=75"
  },
  {
    id: "investiture",
    title: "Council Investiture",
    category: "Executive Governance",
    location: "Seminar Hall, SIES GST",
    date: "Session 2026–2027",
    desc: "Formal investiture of student council executives, faculty advisors, and domain coordinators leading student chapter operations.",
    bgUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=75",
    maskUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=640&q=75"
  }
];

export default function SmoothChapterGallery() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const titles = [...root.querySelectorAll("[data-layered-slider-title]")];
    if (!titles.length) return;
    const count = titles.length;
    const backgrounds = [...root.querySelectorAll("[data-layered-slider-bg]")];
    const maskItems = [...root.querySelectorAll("[data-layered-slider-mask-item]")];
    const maskFrame = root.querySelector("[data-layered-slider-mask]");
    const fill = root.querySelector("[data-layered-slider-fill]");
    const currentEl = root.querySelector("[data-layered-slider-current]");
    const totalEl = root.querySelector("[data-layered-slider-total]");
    const prevBtn = root.querySelector("[data-layered-slider-prev]");
    const nextBtn = root.querySelector("[data-layered-slider-next]");

    // All elements that 'pause' the autoplay on hover
    const controls = [...new Set([...titles, ...root.querySelectorAll("a, button")])];

    // Autoplay, value is seconds between slides, 0 disables autoplay
    const autoplayAttr = root.getAttribute("data-layered-slider-autoplay");
    const autoplay = autoplayAttr !== null ? parseFloat(autoplayAttr) : 5;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = gsap.utils.clamp;
    const wrap = (distance) => distance - count * Math.round(distance / count);
    const transitionDuration = 1;
    const backgroundZoom = 0;
    const titleGap = 0.5;
    const titleSpacing = 40;
    if (totalEl) totalEl.textContent = String(count).padStart(2, "0");

    let titleStep = 0;
    let maskStep = 0;
    const measure = () => {
      const widestTitle = Math.max(...titles.map((title) => title.offsetWidth));
      titleStep = Math.max(root.clientWidth * titleGap, widestTitle + titleSpacing);
      maskStep = maskFrame ? maskFrame.clientWidth : root.clientWidth;
    };
    measure();

    const state = { progress: 0 };
    let activeIndex = -1;

    // The active slide has [data-active] on its background, title, and mask
    const setActive = (previousIndex, index) => {
      [backgrounds, titles, maskItems].forEach((list) => {
        if (previousIndex >= 0 && list[previousIndex]) list[previousIndex].removeAttribute("data-active");
        if (list[index]) list[index].setAttribute("data-active", "");
      });
    };

    const render = (progress) => {
      const centeredIndex = ((Math.round(progress) % count) + count) % count;
      for (let i = 0; i < count; i++) {
        // How far this slide sits from the centre: signed (left / right) and absolute.
        const offset = wrap(i - progress);
        const distance = Math.abs(offset);
        const background = backgrounds[i];
        if (background) {
          const backgroundOpacity = clamp(0, 1, 1 - distance);
          gsap.set(background, {
            opacity: backgroundOpacity,
            scale: 1 + backgroundZoom - backgroundZoom * backgroundOpacity,
            zIndex: Math.round(backgroundOpacity * 100),
          });
        }
        gsap.set(titles[i], {
          x: offset * titleStep,
          opacity: i === centeredIndex ? 1 : 0.4,
          pointerEvents: "auto",
        });
        const maskItem = maskItems[i];
        if (maskItem) {
          gsap.set(maskItem, { x: offset * maskStep });
        }
      }

      // Sync the counter and [data-active] to whichever slide is now centred.
      if (centeredIndex !== activeIndex) {
        const previousIndex = activeIndex;
        activeIndex = centeredIndex;
        setActive(previousIndex, centeredIndex);
        if (currentEl) currentEl.textContent = String(centeredIndex + 1).padStart(2, "0");
      }
    };

    let hovering = 0;
    let autoTween = null;
    const startAutoplay = () => {
      if (!autoTween) return;
      autoTween.restart();
      if (hovering > 0) autoTween.pause();
    };

    let slideTween = null;
    let current = 0;
    function goTo(delta) {
      current += delta;
      if (slideTween) slideTween.kill();
      slideTween = gsap.to(state, {
        progress: current,
        duration: reduced ? 0 : transitionDuration,
        ease: "osmo",
        onUpdate: () => render(state.progress),
      });
      startAutoplay();
    }

    // Step to a specific slide by index
    function goToIndex(i) {
      const delta = wrap(i - current);
      if (delta !== 0) goTo(delta);
    }

    // Autoplay fills the bar
    if (autoplay > 0 && !reduced && fill) {
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      autoTween = gsap.to(fill, {
        scaleX: 1,
        duration: autoplay,
        ease: "none",
        paused: true,
        onComplete: () => goTo(1),
      });
    }

    // Support horizontal swipe gesture without blocking native vertical scrolling
    let gestureUsed = false;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        gestureUsed = false;
      }
    };

    const handleTouchMove = (e) => {
      if (gestureUsed || !e.touches || !e.touches[0]) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      // Only step slide if distinctly horizontal swipe (> 45px and dx > 2 * dy)
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 2) {
        gestureUsed = true;
        if (dx < 0) goTo(1);
        else goTo(-1);
      }
    };

    root.addEventListener("touchstart", handleTouchStart, { passive: true });
    root.addEventListener("touchmove", handleTouchMove, { passive: true });

    const onPrev = () => {
      audioEngine?.playHover && audioEngine.playHover();
      goTo(-1);
    };

    const onNext = () => {
      audioEngine?.playHover && audioEngine.playHover();
      goTo(1);
    };

    if (prevBtn) prevBtn.addEventListener("click", onPrev);
    if (nextBtn) nextBtn.addEventListener("click", onNext);

    // Click a title: the active one lets its link through, any other jumps to it.
    const onTitleClick = (e) => {
      const i = titles.indexOf(e.currentTarget);
      if (i === activeIndex) return;
      e.preventDefault();
      audioEngine?.playClick && audioEngine.playClick();
      goToIndex(i);
    };
    titles.forEach((title) => title.addEventListener("click", onTitleClick));

    // Autoplay pauses only while an interactive control is hovered
    const onEnter = () => { hovering++; if (autoTween) autoTween.pause(); };
    const onLeave = () => { hovering = Math.max(0, hovering - 1); if (autoTween && hovering === 0) autoTween.resume(); };
    controls.forEach((el) => {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    const onResize = () => { measure(); render(state.progress); };
    window.addEventListener("resize", onResize);

    // Title widths change when the web font swaps in, so re-measure then too.
    if (document.fonts) document.fonts.ready.then(onResize);

    render(0);
    startAutoplay();

    return () => {
      root.removeEventListener("touchstart", handleTouchStart);
      root.removeEventListener("touchmove", handleTouchMove);
      if (slideTween) slideTween.kill();
      if (autoTween) autoTween.kill();
      window.removeEventListener("resize", onResize);
      if (prevBtn) prevBtn.removeEventListener("click", onPrev);
      if (nextBtn) nextBtn.removeEventListener("click", onNext);
      titles.forEach((title) => title.removeEventListener("click", onTitleClick));
      controls.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <section 
      id="gallery" 
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto"
      aria-label="Chapter Photographic Archive"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
            Chapter Life &amp; Labs
          </h2>
        </div>
        <p className="text-zinc-600 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
          Interactive layered showcase of technical symposiums, hardware labs, and collegiate hackathons.
        </p>
      </div>

      {/* Osmo Layered Slider Container */}
      <div className="layered-slider-wrapper">
        <section 
          ref={rootRef}
          data-layered-slider-autoplay="5" 
          data-layered-slider-init="" 
          className="layered-slider"
        >
          <div className="layered-slider__container">
            
            {/* Background Images Collection */}
            <div className="layered-slider__bg-collection">
              <div role="list" className="layered-slider__bg-list">
                {CHAPTER_SLIDES.map((slide) => (
                  <div 
                    key={slide.id}
                    data-layered-slider-bg="" 
                    role="listitem" 
                    className="layered-slider__bg-item"
                  >
                    <img 
                      src={slide.bgUrl} 
                      loading="lazy" 
                      alt={slide.title} 
                      className="layered-slider__bg-img"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Overlay */}
            <div className="layered-slider__dark" />

            {/* Text Collection (Large sliding titles) */}
            <div className="layered-slider__text-collection">
              <div role="list" className="layered-slider__text-list">
                {CHAPTER_SLIDES.map((slide) => (
                  <div 
                    key={slide.id}
                    data-layered-slider-title="" 
                    role="listitem" 
                    className="layered-slider__text-item"
                  >
                    <a 
                      href="#gallery" 
                      onClick={(e) => e.preventDefault()} 
                      className="layered-slider__text-link"
                    >
                      {slide.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Mask Collection (Center 4:5 vertical foreground cards) */}
            <div data-layered-slider-mask="" className="layered-slider__mask-collection">
              <div role="list" className="layered-slider__mask-list">
                {CHAPTER_SLIDES.map((slide) => (
                  <div 
                    key={slide.id}
                    data-layered-slider-mask-item="" 
                    role="listitem" 
                    className="layered-slider__mask-item"
                  >
                    <img 
                      src={slide.maskUrl} 
                      loading="lazy" 
                      draggable="false" 
                      alt={slide.title} 
                      className="layered-slider__mask-img"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls Overlay: Progress bar, slide counter, and navigation arrows */}
            <div className="layered-slider__overlay">
              <div className="layered-slider__progress">
                <span data-layered-slider-current="">01</span>
                <div className="layered-slider__progress-bar">
                  <div data-layered-slider-fill="" className="layered-slider__progress-fill" />
                </div>
                <span data-layered-slider-total="">05</span>
              </div>

              <div className="layered-slider__nav">
                <button 
                  type="button" 
                  data-layered-slider-prev="" 
                  className="layered-slider__button"
                  aria-label="Previous slide"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="layered-slider__nav-icon"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>

                <button 
                  type="button" 
                  data-layered-slider-next="" 
                  className="layered-slider__button"
                  aria-label="Next slide"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="layered-slider__nav-icon"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>

    </section>
  );
}
