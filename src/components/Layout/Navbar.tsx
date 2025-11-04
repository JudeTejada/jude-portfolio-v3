import React, { useState, useEffect } from 'react';
// Note: This component will be converted to use Astro native components
// For now, we'll create it with inline JSX

const useScroll = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollOffset;
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollOffset = useScroll();

  const bgStyle = scrollOffset >= 22 ? 'bg-white/90 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)]' : 'bg-white';

  return (
    <header className={`fixed w-full z-40 ${bgStyle}`}>
      <main className="container mx-auto px-6 lg:px-16">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <a href="/" aria-label="Jude Tejada Logo" className="font-black text-2xl cursor-pointer mr-6 border-2 border-gray-400">
              JD.
            </a>
            <div className="flex items-center">
              <a
                title="Github"
                href="https://github.com/JudeTejada"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src="/icon/github.svg"
                  alt="GitHub"
                  className="duration-100 ease-in cursor-pointer text-gray-400 hover:text-black focus-visible:text-black w-6 h-6"
                />
              </a>
              <a
                title="LinkedIn"
                href="https://www.linkedin.com/in/jude-tejada-696051199/"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src="/icon/linkedin.svg"
                  alt="LinkedIn"
                  className="mx-2 duration-100 ease-in cursor-pointer text-gray-400 hover:text-blue-600 focus-visible:text-blue-600 w-6 h-6"
                />
              </a>
              <a
                title="Twitter"
                href="https://twitter.com/JudeTejada2"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src="/icon/twitter.svg"
                  alt="Twitter"
                  className="duration-100 ease-in cursor-pointer text-gray-400 hover:text-blue-500 focus-visible:text-blue-500 w-6 h-6"
                />
              </a>
            </div>
          </div>
          <div className="items-center hidden lg:flex">
            <a href="/blog" className="font-light outline-none hover:text-blue-500 px-6">
              Blog
            </a>
            <a href="/project" className="font-light outline-none hover:text-blue-500 px-6">
              Project
            </a>
            <a href="/about" className="font-light outline-none hover:text-blue-500 px-6">
              About
            </a>
            <a href="/contact">
              <button className="px-6 p-2 bg-blue-500 text-white rounded-md ease-in duration-100 hover:bg-blue-600">
                Contact me
              </button>
            </a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <img
              src="/icon/menu.svg"
              alt="Menu"
              className="w-6 h-6"
            />
          </button>
        </nav>
      </main>
    </header>
  );
};

export default Navbar;