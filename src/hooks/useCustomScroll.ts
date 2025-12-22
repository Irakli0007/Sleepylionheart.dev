import { useEffect, useRef } from 'react';

export const useCustomScroll = (onScrollStart?: () => void) => {
  const scrollingRef = useRef(false);
  const targetScrollRef = useRef(0);

  useEffect(() => {
    // Don't attach if callback is undefined (loader is showing)
    if (!onScrollStart) return;

    const scrollContainer = document.querySelector('.snap-y') as HTMLElement;
    if (!scrollContainer) return;

    const smoothScrollTo = (targetScroll: number) => {
      // Use native smooth scroll with custom duration via CSS
      scrollContainer.style.scrollBehavior = 'smooth';
      scrollContainer.scrollTop = targetScroll;

      // Reset scroll behavior and lock after duration
      setTimeout(() => {
        scrollContainer.style.scrollBehavior = 'auto';
        scrollingRef.current = false;
      }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrollingRef.current) {
        e.preventDefault();
        return;
      }

      const viewportHeight = window.innerHeight;
      const currentSection = Math.round(scrollContainer.scrollTop / viewportHeight);
      let targetSection = currentSection;

      if (e.deltaY > 0) {
        // Scroll down
        targetSection = currentSection + 1;
      } else if (e.deltaY < 0) {
        // Scroll up
        targetSection = currentSection - 1;
      }

      const sections = document.querySelectorAll('section[id]');
      if (targetSection >= 0 && targetSection < sections.length && targetSection !== currentSection) {
        e.preventDefault();
        scrollingRef.current = true;
        targetScrollRef.current = targetSection * viewportHeight;

        // Trigger star animation immediately when scroll starts
        if (onScrollStart && targetSection !== 0) {
          onScrollStart();
        }

        smoothScrollTo(targetScrollRef.current);
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, [onScrollStart]);
};
