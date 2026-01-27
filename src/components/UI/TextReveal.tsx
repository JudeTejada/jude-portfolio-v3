import React, { useEffect, useRef, type ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * TextReveal - Animates text by revealing from below
 * Creates a dramatic entrance effect for headings
 */
const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  as: Component = 'span',
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: `text-reveal ${className}`,
    },
    React.createElement(
      'span',
      {
        className: 'text-reveal-inner',
        'data-text-reveal': 'true',
      },
      children
    )
  );
};

export default TextReveal;
