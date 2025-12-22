import type { StarLayerConfig } from '../types';

export const ANIMATION_CONFIG = {
  lightspeed: {
    duration: 3500, // ms
    initialSpeed: 15, // speed multiplier
    easing: 'cubic.out' as const,
  },
  idle: {
    baseSpeed: 0.2, // slow drift speed
  },
  parallax: {
    scrollStrength: 0.3, // how much scroll affects stars
    mouseStrength: 0.05, // optional mouse parallax
  },
  starLayers: [
    { count: 1000, depth: 100, size: 0.2, speed: 0.1, parallax: 0.5 },
    { count: 800, depth: 75, size: 0.3, speed: 0.15, parallax: 0.7 },
    { count: 600, depth: 50, size: 0.4, speed: 0.2, parallax: 0.9 },
    { count: 400, depth: 25, size: 0.5, speed: 0.3, parallax: 1.2 },
  ] as StarLayerConfig[],
};

export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};
