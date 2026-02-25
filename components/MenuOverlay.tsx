"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DARK_SLIDES = [0, 6, 11, 12];

/* ── Menu data ── */

const PRODUCT_ITEMS: { label: string; slideIndex: number }[] = [
  { label: "What is this?", slideIndex: 0 },
  { label: "Why should I care right now?", slideIndex: 1 },
  { label: "How big is this for me?", slideIndex: 2 },
  { label: "What\u2019s the economics?", slideIndex: 3 },
  { label: "How does that actually work?", slideIndex: 4 },
  { label: "What do you actually do?", slideIndex: 5 },
  { label: "Does it work?", slideIndex: 6 },
  { label: "Show me the data.", slideIndex: 7 },
  { label: "What do I get?", slideIndex: 8 },
  { label: "Why can\u2019t we do this ourselves?", slideIndex: 9 },
  { label: "Why now?", slideIndex: 10 },
  { label: "What\u2019s under the hood?", slideIndex: 13 },
];

const COMPANY_ITEMS: { label: string; slideIndex: number }[] = [
  { label: "About Us", slideIndex: 12 },
  { label: "Contact Us", slideIndex: 11 },
];

const BLOG_URL = "https://blog.wattiva.eu";

/* ── Overlay animation variants ── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const panelVariants = {
  hidden: { y: "-8%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
  exit: {
    y: "-4%",
    opacity: 0,
    transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.1 } },
};

/* ── Component ── */

interface MenuOverlayProps {
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export default function MenuOverlay({
  currentSlide,
  goToSlide,
}: MenuOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = DARK_SLIDES.includes(currentSlide);

  const close = useCallback(() => setIsOpen(false), []);

  const handleNavigate = useCallback(
    (index: number) => {
      close();
      // Small delay to let close animation start before slide transition
      setTimeout(() => goToSlide(index), 100);
    },
    [close, goToSlide]
  );

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen, close]);

  return (
    <>
      {/* ── Hamburger trigger ── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "fixed top-5 right-5 md:top-7 md:right-8 z-[60] flex flex-col justify-center items-center w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md transition-colors duration-300 cursor-pointer",
          isOpen
            ? "bg-white/10"
            : isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-wattiva-dark/10 hover:bg-wattiva-dark/20"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {/* Three bars → X animation (absolute positioning for pixel-perfect X) */}
        <div className="w-5 h-[14px] relative">
          <span
            className={cn(
              "absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 origin-center",
              isOpen
                ? "top-[6px] bg-white rotate-45"
                : cn(
                    "top-0",
                    isDark ? "bg-white/80" : "bg-wattiva-dark/70"
                  )
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-[6px] h-[2px] rounded-full transition-all duration-300",
              isOpen
                ? "w-full bg-white opacity-0 scale-x-0"
                : cn(
                    "w-3.5",
                    isDark ? "bg-white/80" : "bg-wattiva-dark/70"
                  )
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 origin-center",
              isOpen
                ? "top-[6px] bg-white -rotate-45"
                : cn(
                    "top-[12px]",
                    isDark ? "bg-white/80" : "bg-wattiva-dark/70"
                  )
            )}
          />
        </div>
      </button>

      {/* ── Full-screen overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[55] bg-wattiva-dark/95 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-16"
            >
              {/* Desktop: three columns | Mobile: stacked */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16 lg:gap-24 max-w-6xl mx-auto w-full">
                {/* ── Product column ── */}
                <div>
                  <motion.p
                    variants={itemVariants}
                    className="font-[family-name:var(--font-clash)] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-wattiva-light/40 mb-5 md:mb-6"
                  >
                    Product
                  </motion.p>
                  <div className="space-y-1">
                    {PRODUCT_ITEMS.map((item) => (
                      <motion.button
                        key={item.slideIndex}
                        variants={itemVariants}
                        onClick={() => handleNavigate(item.slideIndex)}
                        className={cn(
                          "block w-full text-left font-[family-name:var(--font-clash)] font-medium text-lg md:text-xl lg:text-2xl py-1.5 md:py-2 transition-colors duration-200 cursor-pointer",
                          item.slideIndex === currentSlide
                            ? "text-wattiva-accent"
                            : "text-wattiva-light/70 hover:text-wattiva-light"
                        )}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* ── Company column ── */}
                <div className="max-md:order-2">
                  <motion.p
                    variants={itemVariants}
                    className="font-[family-name:var(--font-clash)] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-wattiva-light/40 mb-5 md:mb-6"
                  >
                    Company
                  </motion.p>
                  <div className="space-y-1">
                    {COMPANY_ITEMS.map((item) => (
                      <motion.button
                        key={item.label}
                        variants={itemVariants}
                        onClick={() => handleNavigate(item.slideIndex)}
                        className={cn(
                          "block w-full text-left font-[family-name:var(--font-clash)] font-medium text-lg md:text-xl lg:text-2xl py-1.5 md:py-2 transition-colors duration-200 cursor-pointer",
                          item.slideIndex === currentSlide
                            ? "text-wattiva-accent"
                            : "text-wattiva-light/70 hover:text-wattiva-light"
                        )}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* ── Insights column ── */}
                <div className="max-md:order-1">
                  <motion.p
                    variants={itemVariants}
                    className="font-[family-name:var(--font-clash)] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-wattiva-light/40 mb-5 md:mb-6"
                  >
                    Insights
                  </motion.p>
                  <div className="space-y-1">
                    <motion.a
                      variants={itemVariants}
                      href={BLOG_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-[family-name:var(--font-clash)] font-medium text-lg md:text-xl lg:text-2xl py-1.5 md:py-2 text-wattiva-light/70 hover:text-wattiva-light transition-colors duration-200"
                    >
                      Blog
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-wattiva-light/40 group-hover:text-wattiva-light transition-colors duration-200"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.line
                          x1="5" y1="12" x2="19" y2="12"
                          animate={{ x1: [5, 7, 5] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.polyline
                          points="14 7 19 12 14 17"
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
