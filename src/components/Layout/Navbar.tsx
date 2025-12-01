import React, { useState, useEffect } from 'react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="container mx-auto px-6">
        <div className={`rounded-2xl transition-all duration-300 flex items-center justify-between px-6 py-3 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border border-black/5 shadow-sm' : 'bg-transparent'}`}>

          {/* Logo & Socials */}
          <div className="flex items-center">
            <a href="/" aria-label="Jude Tejada Logo" className="font-bold text-2xl cursor-pointer mr-6 tracking-tighter">
              JD.
            </a>
            <div className="flex items-center gap-4 border-l border-gray-200 pl-6 hidden md:flex">
              <a
                title="Github"
                href="https://github.com/JudeTejada"
                rel="noreferrer"
                target="_blank"
                className="opacity-60 hover:opacity-100 transition-opacity"
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
                className="opacity-60 hover:opacity-100 transition-opacity"
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
                className="opacity-60 hover:opacity-100 transition-opacity"
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
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="/contact">
              <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
                Contact me
              </button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={isMobileMenuOpen ? "/icon/close.svg" : "/icon/menu.svg"}
              alt={isMobileMenuOpen ? "Close" : "Menu"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 md:hidden shadow-xl mx-6 rounded-2xl mt-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex items-center justify-center gap-4 pb-2">
              <a href="https://github.com/JudeTejada" target="_blank" rel="noreferrer"><img src="/icon/github.svg" alt="GitHub" className="w-5 h-5 opacity-60" /></a>
              <a href="https://www.linkedin.com/in/jude-tejada-696051199/" target="_blank" rel="noreferrer"><img src="/icon/linkedin.svg" alt="LinkedIn" className="w-5 h-5 opacity-60" /></a>
              <a href="https://twitter.com/JudeTejada2" target="_blank" rel="noreferrer"><img src="/icon/twitter.svg" alt="Twitter" className="w-5 h-5 opacity-60" /></a>
            </div>
            <a href="/contact" className="bg-black text-white text-center py-3 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
