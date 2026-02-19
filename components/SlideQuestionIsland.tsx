"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DARK_SLIDES = [0, 6, 11];

const SLIDE_QUESTIONS = [
  "What is this?",
  "Why should I care right now?",
  "How big is this for me?",
  "What\u2019s the economics?",
  "How does that actually work?",
  "What do you actually do?",
  "Does it work?",
  "Show me the data.",
  "What do I get?",
  "Why can\u2019t we do this ourselves?",
  "Why now?",
  "What\u2019s the next step?",
  "What\u2019s under the hood?",
];

const EASE = [0.25, 0.46, 0.45, 0.94];

interface SlideQuestionIslandProps {
  currentSlide: number;
}

export default function SlideQuestionIsland({
  currentSlide,
}: SlideQuestionIslandProps) {
  const [showIsland, setShowIsland] = useState(false);
  const isDark = DARK_SLIDES.includes(currentSlide);
  const question = SLIDE_QUESTIONS[currentSlide] ?? "";

  // Reset on slide change, then show after 1s delay
  useEffect(() => {
    setShowIsland(false);
    const timer = setTimeout(() => setShowIsland(true), 1000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {showIsland && (
          <motion.div
            key={currentSlide}
            className={cn(
              "rounded-b-2xl backdrop-blur-md px-6 py-2.5 pointer-events-auto whitespace-nowrap",
              isDark ? "bg-white/10" : "bg-wattiva-dark/10"
            )}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span
              className={cn(
                "font-[family-name:var(--font-clash)] font-semibold",
                isDark ? "text-white/70" : "text-wattiva-dark/60"
              )}
              style={{ fontSize: "clamp(0.7rem, 1vw, 0.95rem)" }}
            >
              {question}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
