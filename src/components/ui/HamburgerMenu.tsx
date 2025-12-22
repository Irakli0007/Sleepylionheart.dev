import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HamburgerMenuProps {
  sections: { id: string; label: string }[];
  onMenuStateChange: (isOpen: boolean) => void;
}

export const HamburgerMenu = ({ sections, onMenuStateChange }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Notify parent component when menu state changes
  useEffect(() => {
    onMenuStateChange(isOpen);
  }, [isOpen, onMenuStateChange]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (isOpen) {
      // Prevent wheel scrolling
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    };
  }, [isOpen]);

  const handleNavigate = (sectionId: string) => {
    // Close the menu
    setIsOpen(false);

    // Wait for the closing animation to complete, then scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // Match the circle animation duration
  };

  return (
    <>
      {/* Hamburger Button - Fixed in top right */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-8 right-8 z-50 flex flex-col items-center justify-center w-15 h-15 gap-2 bg-transparent border-0 cursor-pointer p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 6.5 }}
      >
        <motion.span
          className="block w-10 h-0.5"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 11 : 0,
            backgroundColor: isOpen ? '#0a0a0f' : '#00ffff',
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-10 h-0.5"
          animate={{
            opacity: isOpen ? 0 : 1,
            backgroundColor: isOpen ? '#0a0a0f' : '#00ffff',
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-10 h-0.5"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -11 : 0,
            backgroundColor: isOpen ? '#0a0a0f' : '#00ffff',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Expanding Circle Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full screen aqua overlay - positioned at button center */}
            <motion.div
              className="fixed rounded-full z-40"
              style={{
                backgroundColor: '#00ffff',
                width: '240vmax',
                height: '240vmax',
                top: '50%',
                left: '50%',
                marginLeft: '-120vmax',
                marginTop: '-120vmax',
                pointerEvents: 'none',
              }}
              initial={{
                scale: 0,
                x: 'calc(50vw - 62px)',
                y: 'calc(62px - 50vh)',
              }}
              animate={{
                scale: 1,
                x: 'calc(50vw - 62px)',
                y: 'calc(62px - 50vh)',
              }}
              exit={{
                scale: 0,
                x: 'calc(50vw - 62px)',
                y: 'calc(62px - 50vh)',
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
            />

            {/* Invisible overlay to block scrolling */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{
                pointerEvents: 'auto',
                touchAction: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed top-30 right-8 z-50 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <nav className="flex flex-col gap-6 items-end">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className="font-bold transition-colors bg-transparent border-0 cursor-pointer p-0 text-6xl text-black hover:text-gray-800"
                    whileHover={{ color: '#333333' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
