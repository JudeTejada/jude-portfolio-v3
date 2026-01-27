import React, { useEffect, useRef, useState } from 'react';

/**
 * CursorGlow - A subtle glow effect that follows the cursor
 * Adds depth and interactivity to the page
 * Only visible on desktop devices
 */
const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let timeout: ReturnType<typeof setTimeout>;

    const lerp = (start: number, end: number, factor: number): number => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      if (!glowRef.current) return;

      positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, 0.08);
      positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, 0.08);

      glowRef.current.style.left = `${positionRef.current.x}px`;
      glowRef.current.style.top = `${positionRef.current.y}px`;

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        setIsVisible(true);
      }

      // Clear existing timeout
      clearTimeout(timeout);
      
      // Hide after mouse stops moving for a while
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  // Don't render on server or touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      className="cursor-glow hidden lg:block"
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: 'left, top, opacity',
      }}
    />
  );
};

export default CursorGlow;
