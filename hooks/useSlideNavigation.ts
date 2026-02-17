"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const TOTAL_SLIDES = 12;
const TRANSITION_LOCK_MS = 700;

export function useSlideNavigation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating.current) return;
    if (index < 0 || index >= TOTAL_SLIDES || index === currentSlide) return;

    isAnimating.current = true;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);

    setTimeout(() => {
      isAnimating.current = false;
    }, TRANSITION_LOCK_MS);
  }, [currentSlide]);

  const goNext = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "Backspace":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) goNext();
        else goPrev();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  return {
    currentSlide,
    direction,
    totalSlides: TOTAL_SLIDES,
    goToSlide,
    goNext,
    goPrev,
  };
}
