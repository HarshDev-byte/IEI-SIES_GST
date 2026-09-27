import React, { useEffect, useState, useRef } from 'react';

export default function MagneticCrosshairCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target;
      const interactive = target.closest('a, button, input, [role="button"], canvas, .cursor-pointer');
      setIsHovered(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 60FPS Spring Damped Follow Loop for the Ring
    const followLoop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(followLoop);
    };

    animFrameId.current = requestAnimationFrame(followLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      
      {/* Outer Spring Damped Ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered 
            ? 'w-12 h-12 border-[#0062FF] bg-[#0062FF]/10 scale-110 shadow-[0_0_15px_rgba(0,98,255,0.4)]' 
            : 'w-7 h-7 border-black/25 bg-black/[0.02] scale-100'
        }`}
      >
        {/* Subtle rotating crosshair ticks when hovered */}
        {isHovered && (
          <div className="w-full h-full rounded-full border border-dashed border-[#0062FF]/40 animate-[spin_6s_linear_infinite]" />
        )}
      </div>

      {/* Immediate Micro Center Dot with Pixel Coordinates */}
      <div 
        className="fixed top-0 left-0 transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) translate(-50%, -50%)`
        }}
      >
        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
          isHovered ? 'bg-[#0062FF]' : 'bg-black/60'
        }`} />

        {/* Real-time Engineering Pixel Telemetry Label */}
        {isHovered && (
          <div className="absolute left-4 top-2 font-mono text-[8px] text-[#0062FF] bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-[#0062FF]/20 whitespace-nowrap animate-fadeIn">
            {pos.x} · {pos.y}
          </div>
        )}
      </div>

    </div>
  );
}
