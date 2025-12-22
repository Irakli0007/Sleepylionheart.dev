import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterLoaderProps {
  onComplete: () => void;
  sentences: string[];
}

export const TypewriterLoader = ({ onComplete, sentences }: TypewriterLoaderProps) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (currentSentenceIndex >= sentences.length) {
      // All sentences complete, button already shown
      return;
    }

    const currentSentence = sentences[currentSentenceIndex];
    const isLastSentence = currentSentenceIndex === sentences.length - 1;
    let charIndex = 0;

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (charIndex < currentSentence.length) {
          setDisplayedText(currentSentence.slice(0, charIndex + 1));
          charIndex++;
        } else {
          // Finished typing current sentence
          clearInterval(typingInterval);
          setIsTyping(false);

          // Pause for 3 seconds, then fade out
          setTimeout(() => {
            setIsFading(true);

            // After fade completes, move to next sentence or show button
            setTimeout(() => {
              if (!isLastSentence) {
                setDisplayedText('');
                setIsFading(false);
                setIsTyping(true);
                setCurrentSentenceIndex(prev => prev + 1);
              } else {
                // Show button only after fade is complete - add extra delay
                setTimeout(() => {
                  setShowButton(true);
                }, 100);
              }
            }, 500); // Fade duration
          }, 3000);
        }
      }, 80); // Typing speed (80ms per character)

      return () => clearInterval(typingInterval);
    }
  }, [currentSentenceIndex, isTyping, sentences]);

  useEffect(() => {
    if (isTakingOff) {
      const duration = 3000; // 3 seconds
      const intervalTime = 50; // Update every 50ms
      const steps = duration / intervalTime;
      let currentStep = 0;

      const progressInterval = setInterval(() => {
        currentStep++;
        const progress = (currentStep / steps) * 100;
        setLoadingProgress(Math.min(progress, 100));

        if (currentStep >= steps) {
          clearInterval(progressInterval);
          // Call onComplete after animation finishes
          setTimeout(() => onComplete(), 200);
        }
      }, intervalTime);

      return () => clearInterval(progressInterval);
    }
  }, [isTakingOff, onComplete]);

  const handleTakeoffClick = () => {
    setIsTakingOff(true);
  };

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
      <AnimatePresence mode="wait">
        {!showButton && (
          <motion.div
            key={currentSentenceIndex}
            initial={{ opacity: 1 }}
            animate={{ opacity: isFading ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="font-mono whitespace-nowrap" style={{ fontSize: '1.5rem' }}>
              {sentences[currentSentenceIndex].split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index < displayedText.length ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  style={{ color: '#00ffff' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showButton && (
        <div className="relative inline-block pb-2">
          {!isTakingOff && (
            <motion.div
              className="font-mono cursor-pointer"
              style={{
                color: '#00ffff',
                fontSize: '2rem'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleTakeoffClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Takeoff
            </motion.div>
          )}
          {isTakingOff && (
            <motion.div
              className="font-mono pointer-events-none"
              style={{
                color: '#00ffff',
                fontSize: '2rem'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {Math.round(loadingProgress)}%
            </motion.div>
          )}
          <motion.div
            style={{
              height: '2px',
              backgroundColor: '#00ffff',
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            animate={{
              width: isTakingOff ? `${loadingProgress}vw` : (isHovered ? '100%' : '0%')
            }}
            transition={{
              duration: isTakingOff ? 0.05 : 0.4,
              ease: isTakingOff ? "linear" : "easeOut"
            }}
          />
        </div>
      )}
    </div>
  );
};
