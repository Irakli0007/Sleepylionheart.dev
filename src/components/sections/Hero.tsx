import { motion } from 'framer-motion';

export const Hero = () => {
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

      <div className="relative z-10" style={{ width: '700px', height: '450px' }}>
        {/* Connecting Lines */}
        {/* North Line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 pulseLineVerticalDown"
          style={{
            top: '100px',
            height: '60px',
            width: '2px'
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 3.7, ease: "easeOut" }}
        />

        {/* East Line */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 pulseLineBgLeft"
          style={{
            right: '160px',
            width: '60px',
            height: '2px'
          }}
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 4.2, ease: "easeOut" }}
        />

        {/* South Line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 pulseLineVerticalUp"
          style={{
            bottom: '100px',
            height: '60px',
            width: '2px'
          }}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 4.7, ease: "easeOut" }}
        />

        {/* West Line */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 pulseLineBgRight"
          style={{
            left: '160px',
            width: '60px',
            height: '2px'
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 5.2, ease: "easeOut" }}
        />

        {/* North - Tech Enthusiast */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{ top: '30px', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
        >
          <span className="text-lg font-mono">Tech Enthusiast</span>
        </motion.div>

        {/* East - Creative Problem Solver */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 text-center"
          style={{ right: '-80px', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 4.0, ease: "easeOut" }}
        >
          <span className="text-lg font-mono">Creative Problem Solver</span>
        </motion.div>

        {/* South - Gamer */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{ bottom: '30px', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 4.5, ease: "easeOut" }}
        >
          <span className="text-lg font-mono">Gamer</span>
        </motion.div>

        {/* West - Full Stack Dev */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 text-center"
          style={{ left: '0px', color: 'rgba(0, 255, 255, 0.8)' }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 5.0, ease: "easeOut" }}
        >
          <span className="text-lg font-mono">Full Stack Dev</span>
        </motion.div>

        {/* Center - Name */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#00ffff' }}>
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
