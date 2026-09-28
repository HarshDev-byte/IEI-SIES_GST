import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const TOTAL_FRAMES = 300;

export default function CrazySexyLoader({ onComplete }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(audioEngine.isActive);
  const [isExiting, setIsExiting] = useState(false);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastPhaseRef = useRef(-1);
  const lastTickTimeRef = useRef(0);

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
      // Start playback as soon as the very first frame is ready
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

    // Safety timeout: if images haven't loaded within 6s, skip the loader entirely
    const safetyTimer = setTimeout(() => {
      if (!isCancelled && !isReadyToPlay) {
        setIsReadyToPlay(true);
        // If nothing rendered at all, just skip straight to the app
        if (loadedCount === 0) {
          if (onComplete) onComplete();
        }
      }
    }, 6000);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  // Seamless exit transition into home screen (NO button press required)
  const triggerExitToHome = useCallback(() => {
    setIsExiting((already) => {
      if (already) return already;
      try {
        audioEngine.playWarpEntry();
      } catch {
        // ignore
      }
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 450);
      return true;
    });
  }, [onComplete]);

  // Audio chimes at milestone moments across the 300 frames
  useEffect(() => {
    let phase = 0;
    if (currentFrame >= 260) phase = 5;
    else if (currentFrame >= 200) phase = 4;
    else if (currentFrame >= 130) phase = 3;
    else if (currentFrame >= 60) phase = 2;
    else if (currentFrame >= 20) phase = 1;
    else phase = 0;

    if (phase !== lastPhaseRef.current && phase > 0) {
      audioEngine.playMilestonePing(phase);
      lastPhaseRef.current = phase;
    }
  }, [currentFrame]);

  // High-DPI Canvas Rendering of all 300 frames
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

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

  // Redraw when currentFrame changes
  useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame, drawFrame]);

  // Redraw on window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrame);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame, drawFrame]);

  // Live Video Autoplay Loop (~48 FPS cinematic cadence)
  useEffect(() => {
    if (!isPlaying || !isReadyToPlay) return;

    let lastTimestamp = performance.now();
    const frameInterval = 1000 / 48; // ~48 FPS

    const videoLoop = (timestamp) => {
      const elapsed = timestamp - lastTimestamp;

      if (elapsed >= frameInterval) {
        lastTimestamp = timestamp - (elapsed % frameInterval);

        setCurrentFrame((prev) => {
          if (prev >= TOTAL_FRAMES - 1) {
            // Holds final frame ("IEI SIES GST ... LOADING 100%") briefly, then enters home page
            setTimeout(() => {
              triggerExitToHome();
            }, 350);
            return TOTAL_FRAMES - 1;
          }

          // Subtle plotter audio tick periodically
          if (timestamp - lastTickTimeRef.current > 150) {
            audioEngine.playPlotterTick();
            lastTickTimeRef.current = timestamp;
          }

          return prev + 1;
        });
      }

      animFrameRef.current = requestAnimationFrame(videoLoop);
    };

    animFrameRef.current = requestAnimationFrame(videoLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isReadyToPlay, triggerExitToHome]);

  // Scroll Trigger: Mouse wheel or trackpad scrubs through the 300 frames
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setIsPlaying(false);
    const step = Math.sign(e.deltaY) * Math.max(1, Math.round(Math.abs(e.deltaY) * 0.12));

    setCurrentFrame((prev) => {
      const next = Math.max(0, Math.min(TOTAL_FRAMES - 1, prev + step));
      if (next >= TOTAL_FRAMES - 1) {
        setTimeout(triggerExitToHome, 350);
      }
      return next;
    });
  }, [triggerExitToHome]);

  // Keyboard navigation: Escape to skip, Space to pause/resume
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        triggerExitToHome();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
        audioEngine.playClick();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentFrame(prev => Math.min(TOTAL_FRAMES - 1, prev + 4));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentFrame(prev => Math.max(0, prev - 4));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerExitToHome]);

  return (
    <div 
      onWheel={handleWheel}
      className={`fixed inset-0 z-[10000] bg-[#FFFFFF] text-zinc-950 flex flex-col justify-between select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting 
          ? '-translate-y-4 scale-[1.02] opacity-0 pointer-events-none filter blur-[2px]' 
          : 'translate-y-0 scale-100 opacity-100'
      }`}
      aria-label="IEI SIES GST Architectural Loading Animation"
    >
      {/* 1. FULL-SCREEN 1920x1080 CANVAS (All 300 Frames: frame_001.jpg - frame_300.jpg) */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF]">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      </div>

      {/* 2. MINIMAL FLOATING TOP CONTROLS (Discreet & Non-Intrusive) */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 pointer-events-none font-mono text-[11px]">
        {/* Left: Discreet Chapter Brand Pill */}
        <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/[0.06] shadow-xs pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#0052D6] animate-pulse" />
          <span className="font-bold text-zinc-950 tracking-wider">IEI SIES GST CHAPTER</span>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-500 text-[10px]">ESTD. 1920</span>
        </div>

        {/* Right: Sound Toggle & Quick Skip */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              const active = audioEngine.toggle();
              setIsAudioActive(active);
            }}
            className={`p-2 rounded-full border transition-all cursor-pointer backdrop-blur-md shadow-xs ${
              isAudioActive 
                ? 'bg-blue-50/90 border-[#0062FF]/30 text-[#0052D6]' 
                : 'bg-white/80 border-black/[0.08] text-zinc-500 hover:text-zinc-950'
            }`}
            title="Toggle Sound"
            aria-label="Toggle Sound"
          >
            {isAudioActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          <button
            type="button"
            onClick={triggerExitToHome}
            className="px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-zinc-100 backdrop-blur-md border border-black/[0.08] text-zinc-600 hover:text-zinc-950 transition-all font-mono font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Skip to Homepage [ESC]"
          >
            <span>SKIP [ESC]</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </header>

      {/* Clean Bottom Anchor (No down scroller) */}
      <div />
    </div>
  );
}
