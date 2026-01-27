import React, { useRef, useCallback, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

/**
 * MagneticButton - A button that subtly follows the cursor
 * Inspired by awwwards sites, adapted for minimalist design
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    if (!buttonRef.current) return;

    const currentX = positionRef.current.x;
    const currentY = positionRef.current.y;

    positionRef.current.x = lerp(currentX, 0, 0.15);
    positionRef.current.y = lerp(currentY, 0, 0.15);

    buttonRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

    if (Math.abs(positionRef.current.x) > 0.01 || Math.abs(positionRef.current.y) > 0.01) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = null;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || !boundingRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = boundingRef.current;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    positionRef.current.x = distanceX * strength;
    positionRef.current.y = distanceY * strength;

    buttonRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [strength, animate]);

  const handleMouseEnter = useCallback(() => {
    if (buttonRef.current) {
      boundingRef.current = buttonRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    positionRef.current = { x: 0, y: 0 };
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0, 0)';
      buttonRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    // Remove transition after animation completes
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transition = '';
      }
    }, 400);
  }, [animate]);

  const baseClasses = 'magnetic-button inline-flex items-center justify-center';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={combinedClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={combinedClasses}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
