import React, { useEffect, useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * ScrollReveal - Component that animates children into view on scroll
 * Uses IntersectionObserver for performance
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  as: Component = 'div',
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            
            // Unobserve after revealing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin]);

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: `reveal ${className}`,
      'data-scroll-reveal': 'true',
    },
    children
  );
};

export default ScrollReveal;
