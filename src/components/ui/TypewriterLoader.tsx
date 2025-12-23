import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterLoaderProps {
  onComplete: () => void;
}

export const TypewriterLoader = ({ onComplete }: TypewriterLoaderProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const loadingText = "Loading my portfolio...";
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    let progress = 0;
    let animationFrame: number;

    // Function to get speed multiplier with dramatic variations
    const getSpeedMultiplier = (currentProgress: number): number => {
      // Add random variation (±30%)
      const randomVariation = 0.7 + Math.random() * 0.6;

      if (currentProgress < 15) {
        // Fast start - very quick
        return 3.0 * randomVariation;
      } else if (currentProgress < 35) {
        // Major slowdown (feels like loading heavy assets)
        return 0.3 * randomVariation;
      } else if (currentProgress < 70) {
        // Recovery to normal speed
        return 1.5 * randomVariation;
      } else if (currentProgress < 85) {
        // Another hang/struggle
        return 0.4 * randomVariation;
      } else {
        // Final dramatic sprint
        return 3.5 * randomVariation;
      }
    };

    const animate = () => {
      // Get speed multiplier for current progress
      const speedMultiplier = getSpeedMultiplier(progress);

      // Base increment per frame (calibrated for roughly 4-5 seconds total)
      const baseIncrement = 0.4;
      const increment = baseIncrement * speedMultiplier;

      progress = Math.min(progress + increment, 100);
      setLoadingProgress(progress);

      // Update displayed characters faster - complete text by 30% progress
      const textProgress = Math.min(progress / 30, 1);
      const charsToShow = Math.floor(textProgress * loadingText.length);
      setDisplayedChars(charsToShow);

      if (progress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Ensure we hit exactly 100%
        setLoadingProgress(100);
        setTimeout(() => onComplete(), 200);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [onComplete]);

  return (
    <div
      className="fixed bg-black z-50"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="relative inline-block" style={{ paddingBottom: '3rem' }}>
        {/* Typewriter text above the line */}
        <div className="font-mono whitespace-nowrap mb-4" style={{ fontSize: '2rem' }}>
          {loadingText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index < displayedChars ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              style={{ color: '#00ffff' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          style={{
            height: '2px',
            backgroundColor: '#00ffff',
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          animate={{
            width: `${loadingProgress}vw`
          }}
          transition={{
            duration: 0.05,
            ease: "linear"
          }}
        />

        {/* Percentage below the line */}
        <motion.div
          className="font-mono pointer-events-none text-center"
          style={{
            color: '#00ffff',
            fontSize: '1.5rem',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(loadingProgress)}%
        </motion.div>
      </div>
    </div>
  );
};
