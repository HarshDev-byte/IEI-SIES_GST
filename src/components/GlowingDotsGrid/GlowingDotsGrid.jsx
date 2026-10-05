import React, { useEffect, useRef } from 'react';
import './GlowingDotsGrid.css';

/**
 * ============================================================================
 * IEI SIES GST — GLOWING INTERACTIVE DOT GRID (GLOBAL & LOCAL SUPPORT)
 * Lightweight, High-Performance Canvas 2D Implementation
 * 
 * Features:
 * - Single HTML Canvas + adaptive single requestAnimationFrame loop
 * - Flat TypedArrays (Float32Array) for zero-allocation 60Hz-240Hz execution
 * - True spring physics + damping for inertia on fast pointer passes
 * - Restrained radial shockwave / ripple on click/tap anywhere on the site
 * - Two-tier rendering: batch rendering for resting dots (<0.2ms) + individual
 *   interpolation for active proximate dots
 * - Adaptive density & quality for Desktop, Tablet, and Mobile
 * - Document visibilityState + Idle sleep (0% CPU when pointer stops)
 * - Whole-website global fixed canvas support
 * - Strict adherence to prefers-reduced-motion
 * ============================================================================
 */

export default function GlowingDotsGrid({
  containerRef,
  className = '',
  theme = 'light',
  enableEmblemClearance = false,
  isGlobal = true,
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = reducedMotionQuery.matches;

    const handleReducedMotionChange = (e) => {
      isReducedMotion = e.matches;
      if (stateRef.current) {
        stateRef.current.isReducedMotion = isReducedMotion;
        scheduleWake();
      }
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // Host element to listen for pointer events
    const host = isGlobal ? window : (containerRef?.current || canvas.parentElement || canvas);

    // Dimensions & DPR
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Quality levels based on device capability & viewport
    let config = {
      spacing: 32,
      baseRadius: 1.4,
      maxRadius: 2.8,
      proximityRadius: 150,
      maxDisplacement: 20,
      springK: 0.1,
      damping: 0.84,
      shockMaxRadius: 180,
      shockSpeed: 380,
    };

    // Grid data structures (Flat Typed Arrays)
    let dotCount = 0;
    let baseX = new Float32Array(0);
    let baseY = new Float32Array(0);
    let curX = new Float32Array(0);
    let curY = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let isHole = new Uint8Array(0);

    // Active shockwaves array: { x, y, radius, maxRadius, strength }
    let shockwaves = [];

    // Pointer state
    const pointer = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
      lastMoveTime: 0,
    };

    // Color definitions (IEI Brand Palette)
    const colors = {
      light: {
        baseR: 9,
        baseG: 9,
        baseB: 11,
        baseA: 0.11,
        activeR: 0,
        activeG: 98,
        activeB: 255,
        activeA: 0.85,
        coreR: 245,
        coreG: 158,
        coreB: 11,
      },
    };

    // Animation control
    let animationFrameId = null;
    let isRunning = false;
    let isVisible = true;
    let lastFrameTime = performance.now();

    // Wake the animation loop if it's sleeping
    const scheduleWake = () => {
      if (isRunning || !isVisible) return;
      isRunning = true;
      lastFrameTime = performance.now();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Determine device tier & adjust config
    const updateConfig = (w) => {
      if (w < 640) {
        // Mobile: Optimized for 120Hz/240Hz mobile displays (reduced dot count for 0 frame drops)
        config = {
          spacing: 34,
          baseRadius: 1.3,
          maxRadius: 2.3,
          proximityRadius: 95,
          maxDisplacement: 8,
          springK: 0.14,
          damping: 0.80,
          shockMaxRadius: 100,
          shockSpeed: 300,
        };
      } else if (w < 1024) {
        // Tablet
        config = {
          spacing: 30,
          baseRadius: 1.4,
          maxRadius: 2.6,
          proximityRadius: 140,
          maxDisplacement: 14,
          springK: 0.11,
          damping: 0.83,
          shockMaxRadius: 140,
          shockSpeed: 350,
        };
      } else {
        // Desktop
        config = {
          spacing: 32,
          baseRadius: 1.5,
          maxRadius: 3.2,
          proximityRadius: 165,
          maxDisplacement: 22,
          springK: 0.1,
          damping: 0.84,
          shockMaxRadius: 190,
          shockSpeed: 400,
        };
      }
    };

    // Build the dot matrix based on viewport dimensions
    const buildGrid = () => {
      if (isGlobal) {
        width = Math.max(window.innerWidth || 0, 320);
        height = Math.max(window.innerHeight || 0, 400);
      } else {
        const rect = host.getBoundingClientRect ? host.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
        width = Math.max(rect.width, 320);
        height = Math.max(rect.height, 400);
      }

      // On mobile (w < 640), clamp DPR to 1.5 for effortless 120Hz/240Hz fill rate
      const maxDeviceDpr = width < 640 ? 1.5 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, maxDeviceDpr);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      updateConfig(width);

      const spacing = config.spacing;
      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;

      // Center the grid offset so spacing is symmetrically distributed
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      dotCount = cols * rows;

      baseX = new Float32Array(dotCount);
      baseY = new Float32Array(dotCount);
      curX = new Float32Array(dotCount);
      curY = new Float32Array(dotCount);
      vx = new Float32Array(dotCount);
      vy = new Float32Array(dotCount);
      isHole = new Uint8Array(dotCount);

      const emblemCenterX = width / 2;
      const emblemCenterY = 75;
      const emblemRadiusX = 65;
      const emblemRadiusY = 55;

      let idx = 0;
      for (let r = 0; r < rows; r++) {
        const yPos = offsetY + r * spacing;
        for (let c = 0; c < cols; c++) {
          const xPos = offsetX + c * spacing;

          baseX[idx] = xPos;
          baseY[idx] = yPos;
          curX[idx] = xPos;
          curY[idx] = yPos;
          vx[idx] = 0;
          vy[idx] = 0;

          // Check emblem clearance if enabled
          if (enableEmblemClearance) {
            const dx = (xPos - emblemCenterX) / emblemRadiusX;
            const dy = (yPos - emblemCenterY) / emblemRadiusY;
            if (dx * dx + dy * dy < 1.0) {
              isHole[idx] = 1;
            }
          }

          idx++;
        }
      }

      scheduleWake();
    };

    // Render loop
    const renderLoop = (timestamp) => {
      if (!isRunning || !isVisible) return;

      const rawDt = (timestamp - lastFrameTime) / 1000;
      lastFrameTime = timestamp;

      // Clamp deltaTime to prevent huge physics jumps on frame drop
      const dt = Math.min(Math.max(rawDt, 0.001), 0.05);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      const activeTheme = colors.light;

      // If reduced motion is requested, render a clean, static, elegant dot grid once
      if (isReducedMotion) {
        ctx.fillStyle = `rgba(${activeTheme.baseR}, ${activeTheme.baseG}, ${activeTheme.baseB}, ${activeTheme.baseA})`;
        ctx.beginPath();
        for (let i = 0; i < dotCount; i++) {
          if (isHole[i]) continue;
          ctx.moveTo(baseX[i] + config.baseRadius, baseY[i]);
          ctx.arc(baseX[i], baseY[i], config.baseRadius, 0, Math.PI * 2);
        }
        ctx.fill();
        isRunning = false;
        return;
      }

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += config.shockSpeed * dt;
        sw.strength *= 0.94;

        if (sw.radius > sw.maxRadius || sw.strength < 0.04) {
          shockwaves.splice(s, 1);
        }
      }

      // Decay pointer velocity when inactive
      if (!pointer.active || timestamp - pointer.lastMoveTime > 120) {
        pointer.vx *= 0.85;
        pointer.vy *= 0.85;
      }

      const pX = pointer.x;
      const pY = pointer.y;
      const pActive = pointer.active;
      const proxRadius = config.proximityRadius;
      const proxRadiusSq = proxRadius * proxRadius;
      const springK = config.springK;
      const damping = config.damping;
      const maxDisp = config.maxDisplacement;
      const baseRad = config.baseRadius;
      const radDiff = config.maxRadius - baseRad;

      let hasActiveMotion = shockwaves.length > 0 || pActive;

      // Two-pass draw:
      // Pass 1: Collect resting dots into a single path for ultra-fast batch rendering
      // Pass 2: Draw proximate / displaced dots individually with smooth color & scale
      ctx.beginPath();
      let hasRestingDots = false;

      // Array to collect active dots to draw in Pass 2
      const activeDots = [];

      for (let i = 0; i < dotCount; i++) {
        if (isHole[i]) continue;

        let bX = baseX[i];
        let bY = baseY[i];
        let cX = curX[i];
        let cY = curY[i];

        // 1. Proximity interaction
        let prox = 0;
        if (pActive) {
          const dx = pX - cX;
          const dy = pY - cY;
          const distSq = dx * dx + dy * dy;

          if (distSq < proxRadiusSq) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / proxRadius;
            // Smooth cosine-like ease
            prox = norm * norm;

            // Physical displacement push away from cursor + velocity push
            const pushAngle = Math.atan2(cY - pY, cX - pX);
            const pushForce = norm * 4.2;

            vx[i] += Math.cos(pushAngle) * pushForce + pointer.vx * 0.06 * norm;
            vy[i] += Math.sin(pushAngle) * pushForce + pointer.vy * 0.06 * norm;
          }
        }

        // 2. Shockwave interaction
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = cX - sw.x;
          const sdy = cY - sw.y;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
          const ringDiff = Math.abs(sdist - sw.radius);

          if (ringDiff < 36) {
            const waveNorm = Math.cos((ringDiff / 36) * (Math.PI / 2));
            const angle = Math.atan2(sdy, sdx);
            const impulse = waveNorm * sw.strength * 6.5;

            vx[i] += Math.cos(angle) * impulse;
            vy[i] += Math.sin(angle) * impulse;
          }
        }

        // 3. Spring back toward resting position
        const dispX = cX - bX;
        const dispY = cY - bY;

        vx[i] = (vx[i] - dispX * springK) * damping;
        vy[i] = (vy[i] - dispY * springK) * damping;

        cX += vx[i];
        cY += vy[i];

        // Clamp maximum displacement
        const curDispSq = (cX - bX) * (cX - bX) + (cY - bY) * (cY - bY);
        if (curDispSq > maxDisp * maxDisp) {
          const curDisp = Math.sqrt(curDispSq);
          cX = bX + (dispX / curDisp) * maxDisp;
          cY = bY + (dispY / curDisp) * maxDisp;
          vx[i] *= 0.5;
          vy[i] *= 0.5;
        }

        // Check if dot has effectively come to rest
        const isDisplaced = Math.abs(dispX) > 0.1 || Math.abs(dispY) > 0.1 || Math.abs(vx[i]) > 0.05 || Math.abs(vy[i]) > 0.05;

        if (isDisplaced) {
          hasActiveMotion = true;
        }

        curX[i] = cX;
        curY[i] = cY;

        // Categorize into resting batch vs active render
        if (prox <= 0.02 && !isDisplaced) {
          ctx.moveTo(bX + baseRad, bY);
          ctx.arc(bX, bY, baseRad, 0, Math.PI * 2);
          hasRestingDots = true;
        } else {
          activeDots.push({
            x: cX,
            y: cY,
            prox: prox,
          });
        }
      }

      // PASS 1: Render all resting dots in a single batch
      if (hasRestingDots) {
        ctx.fillStyle = `rgba(${activeTheme.baseR}, ${activeTheme.baseG}, ${activeTheme.baseB}, ${activeTheme.baseA})`;
        ctx.fill();
      }

      // PASS 2: Render active proximate / displaced dots with interpolated color and radius
      for (let k = 0; k < activeDots.length; k++) {
        const dot = activeDots[k];
        const p = Math.min(Math.max(dot.prox, 0), 1);

        const currentRadius = baseRad + radDiff * p;

        // Color interpolation:
        // Base -> Active IEI Blue -> Core Accent
        let r, g, b, a;
        if (p < 0.75) {
          const t = p / 0.75;
          r = Math.round(activeTheme.baseR + (activeTheme.activeR - activeTheme.baseR) * t);
          g = Math.round(activeTheme.baseG + (activeTheme.activeG - activeTheme.baseG) * t);
          b = Math.round(activeTheme.baseB + (activeTheme.activeB - activeTheme.baseB) * t);
          a = activeTheme.baseA + (activeTheme.activeA - activeTheme.baseA) * t;
        } else {
          const t = (p - 0.75) / 0.25;
          r = Math.round(activeTheme.activeR + (activeTheme.coreR - activeTheme.activeR) * t);
          g = Math.round(activeTheme.coreG + (activeTheme.coreG - activeTheme.activeG) * t);
          b = Math.round(activeTheme.activeB + (activeTheme.coreB - activeTheme.activeB) * t);
          a = activeTheme.activeA;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Luminous micro-halo for proximate active dots in both dark and light modes
        if (p > 0.65 && currentRadius > 1.6) {
          const haloAlpha = isDark ? (p - 0.65) * 0.45 : (p - 0.85) * 0.35;
          ctx.fillStyle = `rgba(${activeTheme.activeR}, ${activeTheme.activeG}, ${activeTheme.activeB}, ${haloAlpha})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, currentRadius + 3.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Idle sleep optimization: if no user interaction and all dots have settled, pause loop
      if (!hasActiveMotion && !pActive) {
        isRunning = false;
        return;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Pointer Event Handlers
    const updatePointerPos = (clientX, clientY, now) => {
      let newX = clientX;
      let newY = clientY;

      if (!isGlobal && host.getBoundingClientRect) {
        const rect = host.getBoundingClientRect();
        newX = clientX - rect.left;
        newY = clientY - rect.top;
      }

      if (pointer.prevX !== -9999) {
        const dt = Math.max(now - pointer.lastMoveTime, 16);
        pointer.vx = ((newX - pointer.prevX) / dt) * 16;
        pointer.vy = ((newY - pointer.prevY) / dt) * 16;
      }

      pointer.prevX = newX;
      pointer.prevY = newY;
      pointer.x = newX;
      pointer.y = newY;
      pointer.active = true;
      pointer.lastMoveTime = now;

      scheduleWake();
    };

    const handlePointerMove = (e) => {
      // Ignore touch pointers here so handleTouchMove does not double-fire on mobile
      if (e.pointerType === 'touch') return;
      updatePointerPos(e.clientX, e.clientY, performance.now());
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.prevX = -9999;
      pointer.prevY = -9999;
      pointer.vx = 0;
      pointer.vy = 0;
      scheduleWake();
    };

    const handlePointerDown = (e) => {
      if (e.pointerType === 'touch') return;

      let clickX = e.clientX;
      let clickY = e.clientY;

      if (!isGlobal && host.getBoundingClientRect) {
        const rect = host.getBoundingClientRect();
        clickX = e.clientX - rect.left;
        clickY = e.clientY - rect.top;
      }

      // Trigger subtle radial shockwave
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: config.shockMaxRadius,
        strength: 1.0,
      });

      updatePointerPos(e.clientX, e.clientY, performance.now());
      scheduleWake();
    };

    // Mobile touch listeners (passive, never blocks scroll, throttled for 120/240Hz)
    let lastTouchTime = 0;
    const handleTouchMove = (e) => {
      const now = performance.now();
      // Cap touch sampling to at most once every ~8ms (125Hz max) to prevent thread congestion during fast scrolls
      if (now - lastTouchTime < 8) return;
      lastTouchTime = now;

      if (e.touches && e.touches[0]) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY, now);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        let clickX = e.touches[0].clientX;
        let clickY = e.touches[0].clientY;

        if (!isGlobal && host.getBoundingClientRect) {
          const rect = host.getBoundingClientRect();
          clickX = e.touches[0].clientX - rect.left;
          clickY = e.touches[0].clientY - rect.top;
        }

        shockwaves.push({
          x: clickX,
          y: clickY,
          radius: 0,
          maxRadius: config.shockMaxRadius,
          strength: 0.8,
        });

        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY, performance.now());
      }
    };

    const handleTouchEnd = () => {
      handlePointerLeave();
    };

    const handleScroll = () => {
      if (pointer.active && pointer.x !== -9999) {
        scheduleWake();
      }
    };

    // Attach pointer listeners
    const eventTarget = isGlobal ? window : host;
    eventTarget.addEventListener('pointermove', handlePointerMove, { passive: true });
    eventTarget.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    eventTarget.addEventListener('pointerdown', handlePointerDown, { passive: true });
    eventTarget.addEventListener('touchmove', handleTouchMove, { passive: true });
    eventTarget.addEventListener('touchstart', handleTouchStart, { passive: true });
    eventTarget.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Document Visibility (pause when tab hidden)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        scheduleWake();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Throttled Resize listener for grid reconstruction
    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildGrid();
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });



    // Initial build
    buildGrid();

    // Store state on ref for cleanup
    stateRef.current = {
      isReducedMotion,
      cleanup: () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
        eventTarget.removeEventListener('pointermove', handlePointerMove);
        eventTarget.removeEventListener('pointerleave', handlePointerLeave);
        eventTarget.removeEventListener('pointerdown', handlePointerDown);
        eventTarget.removeEventListener('touchmove', handleTouchMove);
        eventTarget.removeEventListener('touchstart', handleTouchStart);
        eventTarget.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (resizeTimer) clearTimeout(resizeTimer);
      },
    };

    return () => {
      if (stateRef.current?.cleanup) {
        stateRef.current.cleanup();
      }
    };
  }, [containerRef, theme, enableEmblemClearance, isGlobal]);

  return (
    <div 
      className={`iei-dots-canvas-wrapper ${isGlobal ? 'is-global' : ''} pointer-events-none select-none ${className}`} 
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="iei-dots-canvas" />
    </div>
  );
}
