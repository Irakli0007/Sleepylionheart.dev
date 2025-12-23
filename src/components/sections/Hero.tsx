import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Direction = 'north' | 'south' | 'east' | 'west' | null;

interface HeroProps {
  onTagStateChange?: (isActive: boolean) => void;
  isMenuOpen?: boolean;
}

// Content data for each tag
const tagContent: Record<Exclude<Direction, null>, { title: string; description: string }> = {
  north: {
    title: 'Full Stack Developer',
    description: 'As a full-stack developer, I thrive on the challenge of building complete applications from the ground up. Whether I am optimizing database queries in SQL, architecting cloud solutions on Azure and AWS, or polishing pixel-perfect React components, I approach every layer of the stack with the same passion for creating exceptional software.'
  },
  east: {
    title: 'Creative Problem Solving',
    description: 'I approach every coding challenge as a puzzle waiting to be solved. Whether it\'s debugging a complex race condition, architecting a scalable microservices solution, or finding elegant ways to optimize performance, I combine analytical thinking with creative experimentation to find solutions that are both innovative and practical.'
  },
  south: {
    title: 'Gaming',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
  },
  west: {
    title: 'Tech Enthusiasm',
    description: 'My enthusiasm for technology goes beyond just using tools—I love exploring what is possible. From experimenting with Rust and Electron to diving into the latest web APIs, I am constantly pushing myself to learn and build with emerging technologies. Whether it\'s staying current with industry trends or tinkering with side projects that challenge conventional approaches, my passion for tech drives me to continuously evolve as a developer.'
  }
};

export const Hero = ({ onTagStateChange, isMenuOpen }: HeroProps = {}) => {
  const tags = ['Full Stack Dev', 'Creative Problem Solver', 'Gamer', 'Tech Enthusiast'];
  const [activeDirection, setActiveDirection] = useState<Direction>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mobile carousel state
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Map carousel index to direction for content
  const getDirectionFromIndex = (index: number): Exclude<Direction, null> => {
    const directions: Exclude<Direction, null>[] = ['north', 'east', 'south', 'west'];
    return directions[index];
  };

  // Close tag content when hamburger menu opens
  useEffect(() => {
    if (isMenuOpen && activeDirection) {
      setActiveDirection(null);
      setIsAnimating(false);
      onTagStateChange?.(false);
    }
  }, [isMenuOpen, activeDirection, onTagStateChange]);

  // Swipe handlers for mobile carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only handle swipes on mobile when content is not active
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (!isMobile || activeDirection) return;

    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Only handle swipes on mobile when content is not active
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (!isMobile || activeDirection) return;

    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    // Only handle swipes on mobile when content is not active
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (!isMobile || activeDirection || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentTagIndex < tags.length - 1) {
      setCurrentTagIndex(currentTagIndex + 1);
    }
    if (isRightSwipe && currentTagIndex > 0) {
      setCurrentTagIndex(currentTagIndex - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Mobile tag click handler
  const handleMobileTagClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const direction = getDirectionFromIndex(currentTagIndex);
    setActiveDirection(direction);
    onTagStateChange?.(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  // Desktop tag click handler
  const handleTagClick = (direction: Exclude<Direction, null>) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveDirection(direction);
    onTagStateChange?.(true);
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 1500);
  };

  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveDirection(null);
    onTagStateChange?.(false);
    // Reset animation lock after transition completes
    setTimeout(() => setIsAnimating(false), 1500);
  };

  // Calculate transform based on direction
  const getHeroTransform = () => {
    if (!activeDirection) return { x: 0, y: 0 };

    // Check if mobile (window width < 640px)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    // For mobile, always move up regardless of direction
    if (isMobile) {
      return { x: 0, y: '-100vh' };
    }

    // Desktop behavior
    switch (activeDirection) {
      case 'north':
        return { x: 0, y: '100vh' }; // Move down
      case 'south':
        return { x: 0, y: '-100vh' }; // Move up
      case 'east':
        return { x: '-100vw', y: 0 }; // Move left
      case 'west':
        return { x: '100vw', y: 0 }; // Move right
      default:
        return { x: 0, y: 0 };
    }
  };

  const heroTransform = getHeroTransform();

  return (
    <section
      id="hero"
      className="relative h-screen min-h-screen flex items-center justify-center px-4 snap-start overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Scroll indicator arrow */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: activeDirection ? 100 : 0,
          opacity: activeDirection ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
        style={{ top: '85%' }}
      >
        <svg
          className="animate-bounce"
          fill="none"
          stroke="#00ffff"
          viewBox="0 0 24 24"
          strokeWidth={3}
          style={{ width: '48px', height: '48px' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>

      {/* Main Hero Content Container - Animates as a single unit */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={heroTransform}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Mobile Layout - Carousel format */}
        <div className="sm:hidden relative z-10 text-center w-full px-4">
          <motion.h1
            className="font-bold mb-8"
            style={{
              color: '#00ffff',
              fontSize: 'clamp(2rem, 8vw, 3rem)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
          >
            Irakli Gvino
          </motion.h1>

          {/* Carousel Tag */}
          <motion.div
            className="font-mono cursor-pointer py-2 select-none relative inline-block"
            style={{
              color: '#00ffff',
              fontSize: 'clamp(0.875rem, 4vw, 1.125rem)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
            onClick={handleMobileTagClick}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTagIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tags[currentTagIndex]}
              </motion.div>
            </AnimatePresence>

            {/* Animated glowing underline */}
            <motion.div
              className="absolute bottom-2 left-0 right-0 h-0.5"
              style={{
                background: '#00ffff',
                boxShadow: '0 0 8px #00ffff'
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 4px #00ffff',
                  '0 0 12px #00ffff',
                  '0 0 4px #00ffff'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Dot Indicators */}
          <motion.div
            className="flex justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3, ease: "easeOut" }}
          >
            {tags.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTagIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-300 border-0 p-0 cursor-pointer"
                style={{
                  backgroundColor: index === currentTagIndex ? '#00ffff' : 'rgba(0, 255, 255, 0.3)',
                  transform: index === currentTagIndex ? 'scale(1.2)' : 'scale(1)'
                }}
                aria-label={`Go to tag ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        {/* Desktop Layout - Cardinal directions with lines */}
        <div className="hidden sm:block relative z-10" style={{
          width: 'clamp(500px, 50vw, 900px)',
          height: 'clamp(350px, 35vh, 600px)'
        }}>
          {/* Connecting Lines - Only visible on xl screens (1280px+) */}
          {/* North Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 pulseLineVerticalDown hidden xl:block"
            style={{
              top: '20%',
              height: '17%',
              width: '2px'
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 3.7, ease: "easeOut" }}
          />

          {/* East Line */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 pulseLineBgLeft hidden xl:block"
            style={{
              right: '25%',
              width: '8%',
              height: '2px'
            }}
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 4.2, ease: "easeOut" }}
          />

          {/* South Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 pulseLineVerticalUp hidden xl:block"
            style={{
              bottom: '20%',
              height: '17%',
              width: '2px'
            }}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 4.7, ease: "easeOut" }}
          />

          {/* West Line */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 pulseLineBgRight hidden xl:block"
            style={{
              left: '25%',
              width: '8%',
              height: '2px'
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 5.2, ease: "easeOut" }}
          />

          {/* North - Full Stack Dev */}
          <motion.button
            onClick={() => handleTagClick('north')}
            className="absolute left-1/2 transform -translate-x-1/2 text-center bg-transparent border-0 cursor-pointer p-2 transition-colors hover:opacity-70"
            style={{ top: '7%', color: '#00ffff' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
          >
            <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Full Stack Dev</span>
          </motion.button>

          {/* East - Creative Problem Solver */}
          <motion.button
            onClick={() => handleTagClick('east')}
            className="absolute top-1/2 transform -translate-y-1/2 text-center bg-transparent border-0 cursor-pointer p-2 transition-colors hover:opacity-70"
            style={{ right: '-9%', color: '#00ffff' }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.0, ease: "easeOut" }}
          >
            <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Creative Problem Solver</span>
          </motion.button>

          {/* South - Gamer */}
          <motion.button
            onClick={() => handleTagClick('south')}
            className="absolute left-1/2 transform -translate-x-1/2 text-center bg-transparent border-0 cursor-pointer p-2 transition-colors hover:opacity-70"
            style={{ bottom: '7%', color: '#00ffff' }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.5, ease: "easeOut" }}
          >
            <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Gamer</span>
          </motion.button>

          {/* West - Tech Enthusiast */}
          <motion.button
            onClick={() => handleTagClick('west')}
            className="absolute top-1/2 transform -translate-y-1/2 text-center bg-transparent border-0 cursor-pointer p-2 transition-colors hover:opacity-70"
            style={{ left: '2%', color: '#00ffff' }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 5.0, ease: "easeOut" }}
          >
            <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Tech Enthusiast</span>
          </motion.button>

          {/* Center - Name */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="font-bold" style={{
              color: '#00ffff',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
            }}>
              <div className="flex justify-center items-center">
                <motion.span
                  initial={{ x: '-100vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
                  style={{ display: 'inline-block', marginRight: '1rem' }}
                >
                  Irakli
                </motion.span>
                <motion.span
                  initial={{ x: '100vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
                  style={{ display: 'inline-block' }}
                >
                  Gvino
                </motion.span>
              </div>
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Content Display Area */}
      <AnimatePresence mode="wait">
        {activeDirection && (
          <motion.div
            key="content"
            className="absolute inset-0 flex items-center justify-center z-20 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            <div className="max-w-3xl text-center relative">
              {/* Close Button (X) - Top right of content */}
              <motion.button
                onClick={handleClose}
                className="absolute top-0 right-0 z-30 bg-transparent border-0 cursor-pointer p-0 hover:opacity-70 transition-opacity"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.3, delay: 1.3 }}
              >
                <svg
                  className="w-8 h-8 sm:w-12 sm:h-12"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="#00ffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="12" x2="36" y2="36" />
                  <line x1="36" y1="12" x2="12" y2="36" />
                </svg>
              </motion.button>

              <motion.h2
                className="font-bold mb-6"
                style={{
                  color: '#00ffff',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                {tagContent[activeDirection].title}
              </motion.h2>
              <motion.p
                className="font-mono leading-relaxed"
                style={{
                  color: 'rgba(0, 255, 255, 0.9)',
                  fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, delay: 1.25 }}
              >
                {tagContent[activeDirection].description}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
