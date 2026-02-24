"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DARK_SLIDES = [0, 6, 11];
const HIDE_DELAY = 3000;

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onGoToSlide: (index: number) => void;
}

export default function SlideNavigation({
  currentSlide,
  totalSlides,
  onGoToSlide,
}: SlideNavigationProps) {
  const isDark = DARK_SLIDES.includes(currentSlide);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      if (!isHoveringRef.current) setVisible(false);
    }, HIDE_DELAY);
  }, [clearTimer]);

  // Show on slide change, then auto-hide after 3s
  useEffect(() => {
    setVisible(true);
    scheduleHide();
    return clearTimer;
  }, [currentSlide, scheduleHide, clearTimer]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    clearTimer();
    setVisible(true);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    scheduleHide();
  };

  return (
    <div
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      /* Generous hover target so mouse can reach dots even when faded */
      style={{ padding: "12px 24px", margin: "-12px -24px" }}
    >
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 8,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md",
          isDark ? "bg-white/10" : "bg-wattiva-dark/10"
        )}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative p-1 cursor-pointer focus:outline-none"
          >
            <motion.div
              className={cn(
                "rounded-full transition-colors duration-300",
                i === currentSlide
                  ? "w-2.5 h-2.5"
                  : "w-1.5 h-1.5",
                i === currentSlide
                  ? isDark
                    ? "bg-white"
                    : "bg-wattiva-primary"
                  : isDark
                    ? "bg-white/30"
                    : "bg-wattiva-dark/25"
              )}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
