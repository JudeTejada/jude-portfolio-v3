import React, { useState, useEffect } from 'react';
import CommandPanel from './CommandPanel';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Project', href: '/project' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled ? 'py-3' : 'py-6'}`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-between px-6 py-3 ${
            isScrolled
              ? 'bg-white/85 backdrop-blur-xl border border-black/[0.04] shadow-[0_1px_3px_0_rgb(0,0,0,0.03),0_1px_2px_-1px_rgb(0,0,0,0.03)]'
              : 'bg-transparent border border-transparent'
          }`}
        >

          {/* Logo & Socials */}
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Jude Tejada Logo"
              className="font-bold text-2xl cursor-pointer mr-6 tracking-tighter transition-transform duration-300 ease-out hover:scale-[1.02]"
            >
              JD.
            </a>
            <div className="flex items-center gap-4 border-l border-gray-200/80 pl-6 hidden md:flex">
              <a
                title="Github"
                href="https://github.com/JudeTejada"
                rel="noreferrer"
                target="_blank"
                className="opacity-50 hover:opacity-100 transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                <img
                  src="/icon/github.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                />
              </a>
              <a
                title="LinkedIn"
                href="https://www.linkedin.com/in/jude-tejada-696051199/"
                rel="noreferrer"
                target="_blank"
                className="opacity-50 hover:opacity-100 transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                <img
                  src="/icon/linkedin.svg"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>
              <a
                title="Twitter"
                href="https://twitter.com/JudeTejada2"
                rel="noreferrer"
                target="_blank"
                className="opacity-50 hover:opacity-100 transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                <img
                  src="/icon/twitter.svg"
                  alt="Twitter"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-500 hover:text-gray-900 transition-all duration-300 ease-out hover:-translate-y-[1px] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 after:ease-out hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
            <CommandPanel />
            <a href="/contact">
              <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out hover:bg-gray-800 hover:shadow-[0_8px_20px_-4px_rgb(0,0,0,0.2)] hover:-translate-y-[1px] active:translate-y-0 active:shadow-[0_4px_12px_-4px_rgb(0,0,0,0.2)]">
                Contact me
              </button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 transition-transform duration-200 ease-out active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={isMobileMenuOpen ? "/icon/close.svg" : "/icon/menu.svg"}
              alt={isMobileMenuOpen ? "Close" : "Menu"}
              className={`w-6 h-6 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute top-full left-0 right-0 mx-6 mt-2 md:hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 p-6 rounded-2xl shadow-[0_8px_30px_-4px_rgb(0,0,0,0.08)]">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-out"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.name}
              </a>
            ))}
            <div className="h-px bg-gray-100 my-3" />
            <div className="flex items-center justify-center gap-5 py-2">
              <a href="https://github.com/JudeTejada" target="_blank" rel="noreferrer" className="opacity-50 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5"><img src="/icon/github.svg" alt="GitHub" className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/jude-tejada-696051199/" target="_blank" rel="noreferrer" className="opacity-50 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5"><img src="/icon/linkedin.svg" alt="LinkedIn" className="w-5 h-5" /></a>
              <a href="https://twitter.com/JudeTejada2" target="_blank" rel="noreferrer" className="opacity-50 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5"><img src="/icon/twitter.svg" alt="Twitter" className="w-5 h-5" /></a>
            </div>
            <a
              href="/contact"
              className="bg-gray-900 text-white text-center py-3 rounded-xl font-medium mt-2 transition-all duration-200 ease-out hover:bg-gray-800 active:scale-[0.98]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
