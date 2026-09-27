import React, { useState, useEffect, useRef } from 'react';
import { Magnet, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ClassifiedOverdrive() {
  const [isZeroG, setIsZeroG] = useState(false);
  const [justFixed, setJustFixed] = useState(false);
  const physicsItemsRef = useRef([]);
  const animFrameRef = useRef(null);
  const draggingItemRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Mouse tracking for physics repulsion and dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (draggingItemRef.current) {
        const item = draggingItemRef.current;
        item.x = e.clientX - dragOffsetRef.current.x;
        item.y = e.clientY - dragOffsetRef.current.y;
        item.vx = (e.movementX || 0) * 0.7;
        item.vy = (e.movementY || 0) * 0.7;
      }
    };

    const handleMouseUp = () => {
      if (draggingItemRef.current) {
        if (draggingItemRef.current.el) {
          draggingItemRef.current.el.style.cursor = 'grab';
        }
        draggingItemRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // START ZERO-GRAVITY
  const startZeroG = () => {
    // Prevent double initialization
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    audioEngine.playChapterPulse();
    setIsZeroG(true);
    setJustFixed(false);

    // 1. Gather potential target elements
    const rawCandidates = Array.from(document.querySelectorAll(
      'main section article, main section .minimal-card, main section .minimal-card-elevated, main section > div > div > div.rounded-2xl, main section > div > div > div.rounded-3xl'
    ));

    // 2. CRITICAL FILTER: Select ONLY top-level cards, NEVER nested child elements!
    const candidateSet = new Set(rawCandidates);
    const topLevelElements = rawCandidates.filter((el) => {
      // Exclude navigation, fixed elements, controllers, headers, footers
      if (
        el.closest('aside') || 
        el.closest('header') || 
        el.closest('footer') ||
        el.closest('#gravity-controller') ||
        el.closest('#classified-dock') ||
        el.tagName === 'NAV'
      ) {
        return false;
      }

      // Check if any ancestor is already in candidateSet
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        if (candidateSet.has(parent)) {
          return false; // Skip nested child to prevent compound tearing!
        }
        parent = parent.parentElement;
      }
      return true;
    });

    const items = [];
    topLevelElements.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      // Skip invisible or zero-dimension elements
      if (rect.width === 0 || rect.height === 0) return;

      const initialAngle = (Math.random() - 0.5) * 14;
      const speed = Math.random() * 1.5 + 0.6;
      const dir = Math.random() * Math.PI * 2;

      el.setAttribute('data-zero-g', 'true');
      el.style.willChange = 'transform';
      el.style.zIndex = '30';
      el.style.cursor = 'grab';

      const item = {
        el,
        x: 0,
        y: 0,
        vx: Math.cos(dir) * speed,
        vy: Math.sin(dir) * speed,
        rot: initialAngle,
        vrot: (Math.random() - 0.5) * 0.8,
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      };

      // Fling and drag interaction
      const onMouseDown = (e) => {
        // Do not intercept interactive buttons or links
        if (['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
        
        e.stopPropagation();
        audioEngine.playTone(400 + (idx % 8) * 45, 0.08, 'sine', 0.04);
        draggingItemRef.current = item;
        dragOffsetRef.current = {
          x: e.clientX - item.x,
          y: e.clientY - item.y
        };
        el.style.cursor = 'grabbing';
      };

      el.addEventListener('mousedown', onMouseDown);
      item.cleanListener = () => el.removeEventListener('mousedown', onMouseDown);

      items.push(item);
    });

    physicsItemsRef.current = items;

    // 60FPS physics loop
    const updatePhysics = () => {
      const mouse = mousePosRef.current;

      physicsItemsRef.current.forEach((item) => {
        if (draggingItemRef.current === item) {
          item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0px) rotate(${item.rot}deg) scale(1.02)`;
          return;
        }

        // Apply drift velocity
        item.x += item.vx;
        item.y += item.vy;
        item.rot += item.vrot;

        // Viewport soft boundary collision
        const currentLeft = item.left + item.x;
        const currentTop = item.top + item.y;

        if (currentLeft < -40 || currentLeft + item.width > window.innerWidth + 40) {
          item.vx *= -0.85;
          item.vrot *= -0.7;
        }
        if (currentTop < -40 || currentTop + item.height > window.innerHeight + 40) {
          item.vy *= -0.85;
          item.vrot *= -0.7;
        }

        // Gentle mouse gravitational repulsion
        const centerX = item.left + item.width / 2 + item.x;
        const centerY = item.top + item.height / 2 + item.y;
        const dx = centerX - mouse.x;
        const dy = centerY - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 180 && dist > 1) {
          const force = (180 - dist) / 180 * 1.4;
          item.vx += (dx / dist) * force;
          item.vy += (dy / dist) * force;
        }

        // Friction decay
        item.vx *= 0.99;
        item.vy *= 0.99;

        // Apply smooth transform to real DOM card
        item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0px) rotate(${item.rot}deg)`;
      });

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);
  };

  // RESTORE NORMAL GRAVITY: 100% COMPLETE RESET OF ALL CARDS
  const fixGravity = () => {
    // 1. Immediately stop the physics loop
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    audioEngine.playSuccessChime();
    setJustFixed(true);

    // 2. Smoothly animate all tracked elements back to (0, 0, 0)
    physicsItemsRef.current.forEach((item) => {
      if (item.cleanListener) item.cleanListener();
      
      // Smooth cubic-bezier snap back
      item.el.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      item.el.style.transform = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
      item.el.style.cursor = '';
    });

    // 3. Clear inline styles completely after animation finishes so DOM is 100% pristine
    setTimeout(() => {
      // Primary cleanup on tracked items
      physicsItemsRef.current.forEach((item) => {
        item.el.style.transform = '';
        item.el.style.transition = '';
        item.el.style.willChange = '';
        item.el.style.zIndex = '';
        item.el.style.cursor = '';
        item.el.removeAttribute('data-zero-g');
      });

      // Emergency sweep: Clean ANY element that might have had data-zero-g or inline transforms
      document.querySelectorAll('[data-zero-g]').forEach((el) => {
        el.style.transform = '';
        el.style.transition = '';
        el.style.willChange = '';
        el.style.zIndex = '';
        el.style.cursor = '';
        el.removeAttribute('data-zero-g');
      });

      physicsItemsRef.current = [];
      setIsZeroG(false);
      
      setTimeout(() => {
        setJustFixed(false);
      }, 1500);
    }, 680);
  };

  // Cleanup physics loop on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div id="gravity-controller" className="fixed top-4 right-4 sm:top-5 sm:right-6 z-[99999] select-none">
      {isZeroG ? (
        /* PROMINENT BUTTON: FIX GRAVITY */
        <button
          type="button"
          onClick={fixGravity}
          className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-[#0066CC] text-white font-mono text-xs font-bold shadow-[0_12px_40px_rgba(0,0,0,0.25),_0_0_0_1px_rgba(255,255,255,0.25)_inset] hover:shadow-[0_16px_50px_rgba(0,102,204,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer animate-bounce"
          title="Restore standard 9.8 m/s² gravitational alignment"
        >
          <Magnet className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform animate-pulse" />
          <span className="tracking-wider">FIX GRAVITY</span>
          <span className="text-[10px] text-zinc-400 group-hover:text-white font-normal hidden sm:inline">
            [9.8 m/s²]
          </span>
        </button>
      ) : justFixed ? (
        /* CONFIRMATION PILL: GRAVITY RESTORED */
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white font-mono text-xs font-bold shadow-md animate-fadeIn">
          <CheckCircle2 size={14} />
          <span>GRAVITY RESTORED (100%)</span>
        </div>
      ) : (
        /* DISENGAGE TOGGLE */
        <button
          type="button"
          onClick={startZeroG}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 hover:bg-white text-zinc-800 border border-black/10 shadow-sm hover:shadow-md backdrop-blur-md font-mono text-xs font-semibold transition-all cursor-pointer"
          title="Disengage gravity and float cards in 3D physics"
        >
          <span className="w-2 h-2 rounded-full bg-[#0066CC] group-hover:animate-ping" />
          <span>ZERO GRAVITY</span>
        </button>
      )}
    </div>
  );
}
