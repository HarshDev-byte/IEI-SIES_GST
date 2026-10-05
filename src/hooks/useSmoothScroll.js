/**
 * ==========================================================================
 * IEI SIES GST — 240Hz SMOOTH SCROLL ENGINE
 * Time-independent exponential lerp (identical feel at 60/120/240Hz)
 * Desktop-only. Mobile uses OS momentum scroll (better battery + feel).
 * ==========================================================================
 */

import { useEffect } from 'react';

const LERP_LAMBDA = 10;     // spring strength — 10 = critically damped
const WHEEL_SCALE = 1.0;    // 1 = native 1:1 distance, >1 = amplify
const SNAP_THRESHOLD = 0.5; // pixels — snap to int when nearly settled

export function useSmoothScroll() {
  useEffect(() => {
    // Only on pointer devices — mobile OS momentum is already excellent
    const isTouchOnly = ('ontouchstart' in window) && window.innerWidth < 1024;
    if (isTouchOnly) return;

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId = null;
    let isRunning = false;
    let lastTime = performance.now();

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clampTarget = () => {
      targetY = Math.max(0, Math.min(targetY, getMaxScroll()));
    };

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.064);
      lastTime = now;

      // Exponential decay lerp — time-independent
      const alpha = 1 - Math.exp(-LERP_LAMBDA * dt);
      currentY += (targetY - currentY) * alpha;

      if (Math.abs(targetY - currentY) < SNAP_THRESHOLD) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isRunning = false;
        return;
      }

      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(tick);
    };

    const scheduleRaf = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 32;
      if (e.deltaMode === 2) delta *= window.innerHeight;
      targetY += delta * WHEEL_SCALE;
      clampTarget();
      scheduleRaf();
    };

    const syncScroll = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', syncScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', syncScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
