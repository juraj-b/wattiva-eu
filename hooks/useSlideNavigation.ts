"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const TOTAL_SLIDES = 14;
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

  // Stable function refs — always point to the latest goNext/goPrev.
  // Used by the wheel handler so its useEffect can have [] deps
  // and never tear down (preserving inertia-detection state).
  const goNextRef = useRef(goNext);
  const goPrevRef = useRef(goPrev);
  goNextRef.current = goNext;
  goPrevRef.current = goPrev;

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

  const touchStartedInScrollable = useRef(false);

  useEffect(() => {
    // Check if a touch started inside a horizontally scrollable container.
    // If so, the swipe is for intra-element scrolling, not slide navigation.
    const isInScrollableX = (el: EventTarget | null): boolean => {
      let node = el as HTMLElement | null;
      while (node) {
        if (node.scrollWidth > node.clientWidth) {
          const style = window.getComputedStyle(node);
          const ox = style.overflowX;
          if (ox === "auto" || ox === "scroll") return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartedInScrollable.current = isInScrollableX(e.target);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartedInScrollable.current) return;
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

  // ── Wheel / trackpad navigation (desktop only) ──
  // Empty dependency array — mounts once, never tears down.
  // This is critical: local variables (accumulator, lastAbsDelta, navigatedAt)
  // must survive across slide transitions to correctly detect inertia decay.
  // Calls goNextRef/goPrevRef which always point to the latest closures.
  useEffect(() => {
    const WHEEL_THRESHOLD = 50;
    const MIN_COOLDOWN_MS = 200;
    const IDLE_RESET_MS = 300;

    let accumulator = 0;
    let lastAbsDelta = 0;
    let navigatedAt = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      e.preventDefault();

      // Normalize deltaMode: 0=pixels, 1=lines(×40), 2=pages(×800)
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 40;
      if (e.deltaMode === 2) delta *= 800;

      const absDelta = Math.abs(delta);
      const now = Date.now();
      const timeSinceNav = now - navigatedAt;

      // After navigation, ignore decaying inertia events.
      // Allow through only when |delta| spikes up (= new intentional gesture).
      // Inertia always produces strictly decreasing |deltaY|.
      if (navigatedAt > 0 && timeSinceNav < 1000) {
        if (timeSinceNav < MIN_COOLDOWN_MS || absDelta <= lastAbsDelta) {
          lastAbsDelta = absDelta;
          return;
        }
        // New gesture detected — reset and allow accumulation
        accumulator = 0;
      }

      lastAbsDelta = absDelta;
      accumulator += delta;

      // Reset accumulator after idle (catches stale partial gestures)
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        accumulator = 0;
        lastAbsDelta = 0;
      }, IDLE_RESET_MS);

      // Fire navigation when threshold crossed
      if (Math.abs(accumulator) >= WHEEL_THRESHOLD) {
        if (isAnimating.current) return;
        if (accumulator > 0) goNextRef.current();
        else goPrevRef.current();

        accumulator = 0;
        lastAbsDelta = Infinity; // force next event to be classified as decaying
        navigatedAt = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (idleTimer) clearTimeout(idleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentSlide,
    direction,
    totalSlides: TOTAL_SLIDES,
    goToSlide,
    goNext,
    goPrev,
  };
}
