import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

// Chapter Photographic Archive Items
const GALLERY_ITEMS = [
  {
    id: "archive-01",
    title: "Technical Conclave",
    category: "Symposium & Plenary",
    location: "Main Auditorium, SIES GST",
    date: "Annual Academic Session",
    desc: "Plenary assembly of 400+ engineering students, distinguished national fellows, and department faculty inaugurating the annual chapter symposium.",
    // Wide cinematic background
    bgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80",
    // 4:5 foreground detail
    maskUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "archive-02",
    title: "Hardware Testbench",
    category: "ARM Cortex RTOS Lab",
    location: "Hardware Lab 3, ECS Department",
    date: "Fall Semester Sprint",
    desc: "Oscilloscope and logic analyzer telemetry debugging during an intensive 32-bit ARM Cortex embedded systems sprint.",
    bgUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    maskUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "archive-03",
    title: "Collegiate Hackathon",
    category: "Rapid Prototyping Sprint",
    location: "Central Computing Arena",
    date: "Annual Flagship",
    desc: "36-hour sprint with collegiate teams fabricating embedded firmware, mobile architectures, and machine learning inference pipelines.",
    bgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80",
    maskUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "archive-04",
    title: "Robotics Testbed",
    category: "Autonomous Sensor Arrays",
    location: "IoT & Robotics Cell",
    date: "Innovation Division",
    desc: "Hands-on calibration of multi-axis robotic actuators and real-time industrial telemetry buses across student project tracks.",
    bgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1920&q=80",
    maskUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "archive-05",
    title: "Council Investiture",
    category: "Executive Governance",
    location: "Seminar Hall, SIES GST",
    date: "Session 2026–2027",
    desc: "Formal investiture of student council executives, faculty advisors, and domain coordinators leading student chapter operations.",
    bgUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80",
    maskUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
  }
];

const AUTOPLAY_DURATION = 5000; // 5 seconds per slide

export default function SmoothChapterGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Drag tracking
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Autoplay progress percentage (0 to 100)
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const count = GALLERY_ITEMS.length;
  const currentItem = GALLERY_ITEMS[activeIndex];

  // Measure container width
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Navigation handlers
  const goTo = useCallback((delta) => {
    setActiveIndex((prev) => (prev + delta + count) % count);
    setProgress(0);
    audioEngine.playClick();
  }, [count]);

  const goToIndex = useCallback((index) => {
    setActiveIndex(index);
    setProgress(0);
    audioEngine.playClick();
  }, []);

  const handlePrev = useCallback(() => goTo(-1), [goTo]);
  const handleNext = useCallback(() => goTo(1), [goTo]);

  // Autoplay timer
  useEffect(() => {
    if (isHovered || isDragging || isLightboxOpen) return;

    const intervalTime = 50;
    const increment = (intervalTime / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovered, isDragging, isLightboxOpen, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        return;
      }
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  // Touch & Pointer Gesture Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setDragOffset((currentX - dragStartX) * 0.7);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -35) {
      handleNext();
    } else if (dragOffset > 35) {
      handlePrev();
    }
    setDragOffset(0);
  };

  // Dimensions for Layered Slider math
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  
  // Foreground 4:5 mask dimensions
  const maskWidth = isMobile ? 220 : isTablet ? 270 : 320;
  const maskHeight = Math.round(maskWidth * 1.25); // 4:5 aspect ratio

  // Title spacing step
  const titleStep = isMobile ? 320 : isTablet ? 480 : 620;

  return (
    <section id="gallery" className="relative py-16 sm:py-24 z-10 select-none" aria-label="Chapter Photographic Archive">
      
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER (CLEAN EDITORIAL PRESENTATION) */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-black/[0.08]">
        <div>
          <h3 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight uppercase leading-none">
            GALLERY
          </h3>
          <p className="font-display text-xl sm:text-2xl text-zinc-600 font-bold mt-1 tracking-tight">
            Chapter Photographic Archive
          </p>
          <p className="text-zinc-600 text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
            Visual documentation of hands-on laboratory testbenches, technical symposiums, hackathons, and collegiate investitures at SIES GST.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsLightboxOpen(true);
              audioEngine.playClick();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:border-black/25 text-xs font-semibold text-zinc-700 hover:text-zinc-950 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <span>Fullscreen View</span>
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LAYERED SLIDER (INSPIRED BY OSMO LAYERED SLIDER REFERENCE) */}
      {/* ========================================================================= */}
      <div 
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-950 cursor-grab active:cursor-grabbing"
        style={{
          // Extra bottom padding to allow foreground 4:5 mask card to overlap the edge
          paddingBottom: `${Math.round(maskHeight * 0.35)}px`
        }}
      >
        
        {/* STAGE CONTAINER */}
        <div className="relative w-full min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden">
          
          {/* --------------------------------------------------------------------- */}
          {/* LAYER 0: BACKGROUND IMAGES (FULL BLEED CROSSFADE WITH CINEMATIC ZOOM) */}
          {/* --------------------------------------------------------------------- */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {GALLERY_ITEMS.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={`bg-${item.id}`}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1)' : 'scale(1.04)',
                    willChange: 'opacity, transform'
                  }}
                >
                  <img 
                    src={item.bgUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 1: DARK SCRIM OVERLAY (FOR CONTRAST AND EDITORIAL MOOD) */}
          {/* --------------------------------------------------------------------- */}
          <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 2: GIANT EDITORIAL HORIZONTAL TITLES (SANDWICHED IN MIDDLE) */}
          {/* --------------------------------------------------------------------- */}
          <div className="relative z-2 w-full flex items-center justify-center py-20 pointer-events-none">
            <div className="relative w-full flex items-center justify-center">
              {GALLERY_ITEMS.map((item, idx) => {
                let offset = idx - activeIndex;
                while (offset > count / 2) offset -= count;
                while (offset < -count / 2) offset += count;

                const isCenter = offset === 0;
                const tx = offset * titleStep + dragOffset;

                return (
                  <div
                    key={`title-${item.id}`}
                    onClick={() => {
                      if (!isCenter) goToIndex(idx);
                    }}
                    style={{
                      transform: `translate3d(${tx}px, 0, 0)`,
                      opacity: isCenter ? 1 : 0.35,
                      transition: isDragging 
                        ? 'none' 
                        : 'transform 850ms cubic-bezier(0.625, 0.05, 0, 1), opacity 850ms ease',
                      willChange: 'transform, opacity'
                    }}
                    className={`absolute text-center whitespace-nowrap transition-colors pointer-events-auto select-none ${
                      isCenter 
                        ? 'cursor-default' 
                        : 'cursor-pointer hover:opacity-75'
                    }`}
                  >
                    <div className="text-white">
                      <div className="font-mono text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-[#0062FF] mb-1">
                        {item.category}
                      </div>
                      <h4 className="font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-ultra-tight uppercase leading-none drop-shadow-lg">
                        {item.title}
                      </h4>
                      <div className="font-mono text-[10px] sm:text-xs text-white/60 tracking-wider mt-1.5 flex items-center justify-center gap-3">
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 3: FOREGROUND 4:5 MASK CARD (OVERLAPS TITLE TEXT AT BOTTOM) */}
          {/* --------------------------------------------------------------------- */}
          <div 
            className="absolute bottom-0 left-1/2 z-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.7)] group cursor-pointer"
            style={{
              width: `${maskWidth}px`,
              height: `${maskHeight}px`,
              transform: `translate(-50%, 30%)`,
              willChange: 'transform'
            }}
            onClick={() => {
              setIsLightboxOpen(true);
              audioEngine.playClick();
            }}
            title="Click to expand fullscreen photograph"
          >
            {/* Sliding Mask Gallery Track */}
            <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
              {GALLERY_ITEMS.map((item, idx) => {
                let offset = idx - activeIndex;
                while (offset > count / 2) offset -= count;
                while (offset < -count / 2) offset += count;

                const tx = offset * maskWidth + dragOffset;

                return (
                  <div
                    key={`mask-${item.id}`}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transform: `translate3d(${tx}px, 0, 0)`,
                      transition: isDragging 
                        ? 'none' 
                        : 'transform 850ms cubic-bezier(0.625, 0.05, 0, 1)',
                      willChange: 'transform'
                    }}
                  >
                    <img 
                      src={item.maskUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover" 
                      draggable={false}
                    />
                  </div>
                );
              })}

              {/* Minimal Expand Badge on Active Mask Card */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-zinc-950 font-sans text-[10px] font-bold tracking-wide shadow-md group-hover:bg-[#0062FF] group-hover:text-white transition-colors">
                  <span>EXPAND →</span>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 4: TOP / BOTTOM UI OVERLAY (PROGRESS + NAVIGATION CONTROLS) */}
          {/* --------------------------------------------------------------------- */}
          <div className="absolute inset-0 z-4 pointer-events-none p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
            
            {/* Top Row: Chapter Badge + Progress Bar with Running Fill */}
            <div className="w-full flex items-center justify-between">
              {/* Chapter Tag */}
              <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/70 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0062FF] animate-pulse" />
                <span>IEI SIES GST ARCHIVE</span>
              </div>

              {/* Progress Bar & Slide Counter */}
              <div className="pointer-events-auto flex items-center gap-3 font-mono text-xs text-white">
                <span className="font-bold text-[#0062FF]">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                
                {/* Horizontal Progress Bar */}
                <div className="w-16 sm:w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0062FF] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <span className="text-white/50">
                  {String(count).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Bottom Controls Row: Previous & Next Arrow Buttons */}
            <div className="w-full flex items-center justify-between pointer-events-auto">
              <div className="font-mono text-[10px] text-white/50 hidden sm:block">
                Drag / Swipe or use ← → arrow keys
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0062FF] border border-white/20 hover:border-[#0062FF] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-md"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photograph"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0062FF] border border-white/20 hover:border-[#0062FF] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-md"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen lightbox"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50"
          >
            <X size={20} />
          </button>

          {/* Left Navigation */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous photograph"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#0062FF] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Navigation */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next photograph"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#0062FF] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50"
          >
            <ChevronRight size={24} />
          </button>

          {/* Photograph Container */}
          <div 
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={currentItem.bgUrl} 
              alt={currentItem.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {/* Lightbox Caption Bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-4 text-white text-xs gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#0062FF] font-bold">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <span className="font-display font-bold text-base text-white">
                  {currentItem.title}
                </span>
                <span className="text-white/60 hidden sm:inline">•</span>
                <span className="text-white/70 hidden sm:inline">
                  {currentItem.category}
                </span>
              </div>

              <div className="font-mono text-[11px] text-white/50 flex items-center gap-3">
                <span>{currentItem.location}</span>
                <span>•</span>
                <span>{currentItem.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
