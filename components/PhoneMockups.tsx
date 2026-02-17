"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

const screens = [
  { src: "/images/app mockup first.png", alt: "Wattiva MyHouse app — home overview" },
  { src: "/images/app mockup second.png", alt: "Wattiva MyHouse app — devices in use" },
  { src: "/images/app mockup third.png", alt: "Wattiva app — EV charging status" },
  { src: "/images/app mockup fourth.png", alt: "Wattiva app — charging details" },
];

// Extended track: [clone-last, 0, 1, 2, 3, clone-0, clone-1] = 7 items
const extendedScreens = [
  screens[3], // 0: clone of last
  screens[0], // 1: HOME
  screens[1], // 2
  screens[2], // 3
  screens[3], // 4
  screens[0], // 5: clone of first (wrap target)
  screens[1], // 6: buffer
];

const HOME_INDEX = 1;
const WRAP_INDEX = 5;

const IMG_ASPECT = 867 / 1767;
const PHONE_HEIGHT_RATIO = 0.75;
const OVERLAP_RATIO = 0.30;

export default function PhoneMockups({ className }: { className?: string }) {
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  const measureRef = useRef<HTMLDivElement>(null);
  const trackIndexRef = useRef(HOME_INDEX);
  const [, forceRender] = useState(0);
  const x = useMotionValue(0);
  const isAnimatingRef = useRef(false);
  const isWrappingRef = useRef(false);

  const { w: nominalWidth, h: nominalHeight } = dims;

  // Phone dimensions derived from HEIGHT
  const phoneW = nominalHeight * PHONE_HEIGHT_RATIO * IMG_ASPECT;
  const overlap = phoneW * OVERLAP_RATIO;
  const step = phoneW - overlap;

  const componentCenter = nominalWidth / 2;

  const getTrackX = useCallback(
    (trackIdx: number) => {
      if (nominalWidth === 0) return 0;
      return componentCenter - (trackIdx * step + phoneW / 2);
    },
    [nominalWidth, phoneW, step, componentCenter]
  );

  // Measure component dimensions
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Snap to current position on resize
  const prevDimsRef = useRef("");
  useEffect(() => {
    const key = `${nominalWidth},${nominalHeight}`;
    if (nominalWidth > 0 && key !== prevDimsRef.current) {
      prevDimsRef.current = key;
      x.set(getTrackX(trackIndexRef.current));
    }
  }, [nominalWidth, nominalHeight, getTrackX, x]);

  // Start immediately
  useEffect(() => {
    setHasEntered(true);
  }, []);

  // Advance to next track position
  const advanceToNext = useCallback(() => {
    if (isAnimatingRef.current || nominalWidth === 0) return;

    const next = trackIndexRef.current + 1;
    isAnimatingRef.current = true;

    trackIndexRef.current = next;
    forceRender((n) => n + 1);

    animate(x, getTrackX(next), {
      type: "spring",
      stiffness: 120,
      damping: 28,
      mass: 1.2,
    }).then(() => {
      isAnimatingRef.current = false;

      if (next >= WRAP_INDEX) {
        isWrappingRef.current = true;
        trackIndexRef.current = HOME_INDEX;
        x.set(getTrackX(HOME_INDEX));
        forceRender((n) => n + 1);
        requestAnimationFrame(() => {
          isWrappingRef.current = false;
          forceRender((n) => n + 1);
        });
      }
    });
  }, [nominalWidth, getTrackX, x]);

  // Auto-advance interval
  useEffect(() => {
    if (!hasEntered || nominalWidth === 0) return;
    const interval = setInterval(advanceToNext, 3000);
    return () => clearInterval(interval);
  }, [hasEntered, nominalWidth, advanceToNext]);

  return (
    <div className={className}>
      <div ref={measureRef} className="absolute inset-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full h-full relative"
        style={{ overflow: "visible" }}
      >
        {/* Sliding track — no clip wrapper. Per-phone opacity hides non-visible phones. */}
        <motion.div
          className="absolute inset-0"
          style={{ x, willChange: "transform" }}
        >
          {extendedScreens.map((screen, i) => {
            const isCenterPhone = i === trackIndexRef.current;
            const isVisible = Math.abs(i - trackIndexRef.current) <= 1;
            const leftEdge = i * step;

            return (
              <div
                key={i}
                className="absolute flex items-center justify-center"
                style={{
                  width: phoneW > 0 ? phoneW : 100,
                  left: leftEdge,
                  top: 0,
                  bottom: 0,
                  zIndex: isCenterPhone ? 20 : 10,
                  opacity: isVisible ? (isCenterPhone ? 1 : 0.7) : 0,
                  transform: `scale(${isCenterPhone ? 1.0 : 0.88})`,
                  filter: isCenterPhone ? "none" : "brightness(0.7)",
                  transition: isWrappingRef.current
                    ? "none"
                    : "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "867 / 1767" }}
                >
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    className={`object-contain ${
                      isCenterPhone
                        ? "drop-shadow-[0_25px_60px_rgba(140,33,248,0.25)]"
                        : "drop-shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
                    }`}
                    priority
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
