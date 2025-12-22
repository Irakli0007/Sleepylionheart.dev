import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center px-4 snap-start">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 6.0, ease: "easeOut" }}
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: '90%' }}
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

      <div className="text-center z-10 max-w-md mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#00ffff' }}>
          <div className="flex justify-center items-center">
            <motion.span
              initial={{ x: '-100vw', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay:2, ease: "easeOut" }}
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

        <p className="text-xl md:text-2xl mb-8" style={{ color: 'rgba(0, 255, 255, 0.8)' }}>
          <motion.span
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
            style={{ display: 'inline-block', marginRight: '0.5rem' }}
          >
            Full Stack Developer
          </motion.span>
          <motion.span
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.0, ease: "easeOut" }}
            style={{ display: 'inline-block', marginRight: '0.5rem' }}
          >
            {' | '}
          </motion.span>
          <motion.span
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.5, ease: "easeOut" }}
            style={{ display: 'inline-block', marginRight: '0.5rem' }}
          >
            Creative Problem Solver
          </motion.span>
          <motion.span
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 5.0, ease: "easeOut" }}
            style={{ display: 'inline-block', marginRight: '0.5rem' }}
          >
            {' | '}
          </motion.span>
          <motion.span
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 5.5, ease: "easeOut" }}
            style={{ display: 'inline-block' }}
          >
            Tech Enthusiast
          </motion.span>
        </p>
      </div>
    </section>
  );
};
