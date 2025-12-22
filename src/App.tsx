import { useState, useCallback } from 'react';
import { SpaceBackground } from './components/canvas/SpaceBackground';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { useCustomScroll } from './hooks/useCustomScroll';

function App() {
  const [scrollTrigger, setScrollTrigger] = useState(0);

  const handleScrollStart = useCallback(() => {
    setScrollTrigger(prev => prev + 1);
  }, []);

  useCustomScroll(handleScrollStart);

  return (
    <div className="relative h-screen overflow-y-auto snap-y">
      <SpaceBackground scrollTrigger={scrollTrigger} />

      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
