import { motion } from 'framer-motion';

export const Hero = () => {
  const tags = ['Full Stack Dev', 'Creative Problem Solver', 'Gamer', 'Tech Enthusiast'];

  return (
    <section id="hero" className="relative h-screen min-h-screen flex items-center justify-center px-4 snap-start overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 6.0, ease: "easeOut" }}
        className="absolute left-1/2 transform -translate-x-1/2"
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

      {/* Mobile Layout - List format */}
      <div className="sm:hidden relative z-10 text-center">
        <motion.h1
          className="font-bold mb-6"
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
        <motion.p
          className="font-mono px-4"
          style={{
            color: 'rgba(0, 255, 255, 0.8)',
            fontSize: 'clamp(0.875rem, 4vw, 1.125rem)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
        >
          {tags.join(' | ')}
        </motion.p>
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
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{ top: '7%', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
        >
          <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Full Stack Dev</span>
        </motion.div>

        {/* East - Creative Problem Solver */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 text-center"
          style={{ right: '-9%', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 4.0, ease: "easeOut" }}
        >
          <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Creative Problem Solver</span>
        </motion.div>

        {/* South - Gamer */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{ bottom: '7%', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 4.5, ease: "easeOut" }}
        >
          <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Gamer</span>
        </motion.div>

        {/* West - Tech Enthusiast */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 text-center"
          style={{ left: '2%', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 5.0, ease: "easeOut" }}
        >
          <span className="font-mono" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)' }}>Tech Enthusiast</span>
        </motion.div>

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
    </section>
  );
};
