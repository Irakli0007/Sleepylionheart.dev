import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SpaceBackground } from './components/canvas/SpaceBackground';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { TypewriterLoader } from './components/ui/TypewriterLoader';
import { HamburgerMenu } from './components/ui/HamburgerMenu';
import { useCustomScroll } from './hooks/useCustomScroll';

function App() {
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollStart = useCallback(() => {
    setScrollTrigger(prev => prev + 1);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  // Only attach scroll listener after loader is complete and menu is closed
  useCustomScroll(showLoader || isMenuOpen ? undefined : handleScrollStart);

  const sentences = [
    "Welcome to my portfolio.",
    "Let's take a ride together."
  ];

  const menuSections = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  if (showLoader) {
    return <TypewriterLoader sentences={sentences} onComplete={handleLoaderComplete} />;
  }

  return (
    <div
      className="relative h-screen snap-y"
      style={{ overflowY: isMenuOpen ? 'hidden' : 'auto' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeIn" }}
      >
        <SpaceBackground scrollTrigger={scrollTrigger} />
      </motion.div>

      {/* Hamburger Menu */}
      <HamburgerMenu sections={menuSections} onMenuStateChange={setIsMenuOpen} />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeIn" }}
      >
        <Hero />
        <Projects />
        <About />
        <Contact />
      </motion.main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeIn" }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
