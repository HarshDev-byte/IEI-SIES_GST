import React, { useEffect, useState, useRef } from 'react';

export default function EngineeringCursor({ activeLabel = 'EXPLORE' }) {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState(activeLabel);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cadCoords, setCadCoords] = useState({ u: 0, v: 0 });
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Only activate on devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      setIsVisible(true);
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isPointer ? 1.4 : 1})`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      setCadCoords({
        u: ((x / window.innerWidth) * 100).toFixed(1),
        v: ((y / window.innerHeight) * 100).toFixed(1)
      });

      // Detect interactive elements
      const target = e.target;
      if (target) {
        const interactive = target.closest('button, a, input, select, [role="button"], .interactive-element');
        const customCursorText = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        
        setIsPointer(!!interactive);
        if (customCursorText) {
          setLabel(customCursorText);
        } else if (interactive) {
          setLabel('INSPECT');
        } else {
          setLabel(activeLabel);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeLabel, isPointer]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none z-[99999] fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Precision Crosshair Ring */}
      <div 
        ref={ringRef}
        className="cursor-tracker-ring"
        style={{
          borderColor: isPointer ? '#00D6FF' : 'rgba(0, 214, 255, 0.45)',
          backgroundColor: isPointer ? 'rgba(0, 214, 255, 0.08)' : 'transparent'
        }}
      />

      {/* Center Laser Point */}
      <div 
        ref={dotRef}
        className="cursor-tracker-dot"
      />

      {/* CAD Telemetry Coordinates & Dynamic Label */}
      <div 
        ref={labelRef}
        className="cursor-label flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
        <span>{label}</span>
        <span className="text-muted text-[9px] ml-1">
          {cadCoords.u}:{cadCoords.v}
        </span>
      </div>
    </div>
  );
}
