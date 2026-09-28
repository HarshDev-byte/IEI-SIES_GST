import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 300;

export default function CrazySexyLoader({ onComplete }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentSmoothFrameRef = useRef(0);
  const isPlayingRef = useRef(true);

  // Preload all 300 photos in sequence (frame_001.jpg to frame_300.jpg)
  useEffect(() => {
    let isCancelled = false;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/loading_screen_frames/frame_${String(i).padStart(3, '0')}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;

    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      // Start playback as soon as the first few frames are ready
      if (!isCancelled && loadedCount >= 1) {
        setIsReadyToPlay(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
      }
    });

    // Safety timeout: if images haven't loaded within 5s, proceed straight to the app
    const safetyTimer = setTimeout(() => {
      if (!isCancelled && !isReadyToPlay) {
        setIsReadyToPlay(true);
        if (loadedCount === 0 && onComplete) {
          onComplete();
        }
      }
    }, 5000);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  // Seamless, snappy exit transition into home screen
  const triggerExitToHome = useCallback(() => {
    setIsExiting((already) => {
      if (already) return already;
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 250);
      return true;
    });
  }, [onComplete]);

  // High-DPI, 400Hz Ultra-Smooth Canvas Rendering
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Pick target image or fallback to closest loaded image
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let s = frameIdx - 1; s >= 0; s--) {
        if (imagesRef.current[s] && imagesRef.current[s].complete) {
          img = imagesRef.current[s];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clean white architectural canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fit contain centered (1920 x 1080 native resolution)
    const imgRatio = 1920 / 1080;
    const canvasRatio = canvas.width / canvas.height;

    let drawW, drawH, drawX, drawY;
    if (canvasRatio > imgRatio) {
      drawH = canvas.height;
      drawW = drawH * imgRatio;
      drawX = (canvas.width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = canvas.width;
      drawH = drawW / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Sync ref with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Master 400Hz Continuous Animation & Smooth Scroll Lerp Loop
  useEffect(() => {
    if (!isReadyToPlay) return;

    let lastVideoTimestamp = performance.now();
    // Fast, energetic playback at ~75 FPS
    const frameInterval = 1000 / 75;

    const renderLoop = (timestamp) => {
      // 1. If autoplaying, advance targetFrame steadily
      if (isPlayingRef.current) {
        const elapsed = timestamp - lastVideoTimestamp;
        if (elapsed >= frameInterval) {
          lastVideoTimestamp = timestamp - (elapsed % frameInterval);
          targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, targetFrameRef.current + 1);

          if (targetFrameRef.current >= TOTAL_FRAMES - 1) {
            isPlayingRef.current = false;
            setIsPlaying(false);
            setTimeout(triggerExitToHome, 150);
          }
        }
      }

      // 2. High-refresh spring LERP for 400Hz-like butter-smooth motion
      const diff = targetFrameRef.current - currentSmoothFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentSmoothFrameRef.current += diff * 0.32;
        const frameToDraw = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentSmoothFrameRef.current)));
        drawFrame(frameToDraw);
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isReadyToPlay, drawFrame, triggerExitToHome]);

  // High-Speed, Ultra-Smooth Wheel Scrubbing
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    isPlayingRef.current = false;
    setIsPlaying(false);

    // Fast, responsive scrubbing multiplier (~4x faster than original)
    const delta = e.deltaY * 0.42;
    targetFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrameRef.current + delta));

    if (targetFrameRef.current >= TOTAL_FRAMES - 1) {
      setTimeout(triggerExitToHome, 120);
    }
  }, [triggerExitToHome]);

  // Keyboard navigation: Escape to skip, Space to pause/resume, Arrows to scrub
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        triggerExitToHome();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        isPlayingRef.current = false;
        setIsPlaying(false);
        targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, targetFrameRef.current + 12);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        isPlayingRef.current = false;
        setIsPlaying(false);
        targetFrameRef.current = Math.max(0, targetFrameRef.current - 12);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerExitToHome]);

  return (
    <div 
      onWheel={handleWheel}
      className={`fixed inset-0 z-[10000] bg-[#FFFFFF] text-zinc-950 flex flex-col justify-between select-none overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting 
          ? '-translate-y-2 scale-[1.01] opacity-0 pointer-events-none filter blur-[1px]' 
          : 'translate-y-0 scale-100 opacity-100'
      }`}
      aria-label="IEI SIES GST Architectural Loading Animation"
    >
      {/* 1. FULL-SCREEN 1920x1080 CANVAS */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF]">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      </div>

      {/* 2. MINIMAL TOP CONTROLS (Left corner part and sound removed; clean skip on right) */}
      <header className="relative z-20 flex items-center justify-end px-6 py-4 pointer-events-none font-mono text-[11px]">
        <button
          type="button"
          onClick={triggerExitToHome}
          className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-zinc-100 backdrop-blur-md border border-black/[0.08] text-zinc-600 hover:text-zinc-950 transition-all font-mono font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-xs"
          title="Skip to Homepage [ESC]"
        >
          <span>SKIP [ESC]</span>
          <ArrowRight size={11} />
        </button>
      </header>

      {/* Clean Bottom Anchor */}
      <div />
    </div>
  );
}
