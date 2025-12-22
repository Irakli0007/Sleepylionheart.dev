import { useState, useEffect } from 'react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        isScrolled ? 'bg-space-dark/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20" style={{ gap: '3rem' }}>
          <div
            onClick={() => scrollToSection('hero')}
            className="font-bold hover:text-aqua-light transition-colors tracking-wider cursor-pointer leading-none"
            style={{ fontSize: '2.5rem', color: '#00ffff' }}
          >
            IG
          </div>

          <div className="flex ml-auto" style={{ gap: '3rem' }}>
            <div
              onClick={() => scrollToSection('projects')}
              className="font-bold hover:text-aqua-light transition-colors tracking-wider cursor-pointer leading-none"
              style={{ fontSize: '2.5rem', color: '#00ffff' }}
            >
              Projects
            </div>
            <div
              onClick={() => scrollToSection('about')}
              className="font-bold hover:text-aqua-light transition-colors tracking-wider cursor-pointer leading-none"
              style={{ fontSize: '2.5rem', color: '#00ffff' }}
            >
              About
            </div>
            <div
              onClick={() => scrollToSection('contact')}
              className="font-bold hover:text-aqua-light transition-colors tracking-wider cursor-pointer leading-none"
              style={{ fontSize: '2.5rem', color: '#00ffff' }}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
