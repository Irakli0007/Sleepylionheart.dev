import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { StarField } from './StarField';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ANIMATION_CONFIG, easeOutCubic } from '../../utils/animation';
import type { AnimationPhase } from '../../types';

interface SpaceBackgroundProps {
  scrollTrigger?: number;
}

export const SpaceBackground = ({ scrollTrigger = 0 }: SpaceBackgroundProps) => {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('lightspeed');
  const [speedMultiplier, setSpeedMultiplier] = useState(ANIMATION_CONFIG.lightspeed.initialSpeed);
  const scrollProgress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  // Lightspeed entrance animation (initial and on scroll trigger)
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimationPhase('idle');
      setSpeedMultiplier(ANIMATION_CONFIG.idle.baseSpeed);
      return;
    }

    const startTime = Date.now();
    const duration = ANIMATION_CONFIG.lightspeed.duration;
    const initialSpeed = ANIMATION_CONFIG.lightspeed.initialSpeed;
    const finalSpeed = ANIMATION_CONFIG.idle.baseSpeed;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 0.3) {
        // Phase 1: Lightspeed (0-30%)
        setAnimationPhase('lightspeed');
        setSpeedMultiplier(initialSpeed);
      } else if (progress < 1) {
        // Phase 2: Deceleration (30-100%)
        setAnimationPhase('deceleration');
        const decelerationProgress = (progress - 0.3) / 0.7;
        const easedProgress = easeOutCubic(decelerationProgress);
        const currentSpeed = initialSpeed - (initialSpeed - finalSpeed) * easedProgress;
        setSpeedMultiplier(currentSpeed);
      } else {
        // Phase 3: Idle
        setAnimationPhase('idle');
        setSpeedMultiplier(finalSpeed);
        return;
      }

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [prefersReducedMotion, scrollTrigger]);

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-space-darker via-space-dark to-purple-950/20" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0a0a0f']} />
        {ANIMATION_CONFIG.starLayers.map((layer, index) => (
          <StarField
            key={index}
            config={layer}
            animationPhase={animationPhase}
            speedMultiplier={speedMultiplier}
            scrollProgress={scrollProgress}
            triggerAnimation={scrollTrigger}
          />
        ))}
      </Canvas>
    </div>
  );
};
