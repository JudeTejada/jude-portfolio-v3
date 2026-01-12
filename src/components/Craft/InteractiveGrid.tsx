import { useEffect, useRef } from 'react';

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--x', `${x}px`);
        containerRef.current.style.setProperty('--y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Subtle base grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Interactive highlight grid */}
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          WebkitMaskImage: `radial-gradient(circle 200px at var(--x, -1000px) var(--y, -1000px), black, transparent)`,
          maskImage: `radial-gradient(circle 200px at var(--x, -1000px) var(--y, -1000px), black, transparent)`
        }}
      />
      
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
    </div>
  );
};

export default InteractiveGrid;
