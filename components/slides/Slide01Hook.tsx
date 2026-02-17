"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import PhoneMockups from "@/components/PhoneMockups";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

const mobileScreens = [
  "/images/app mockup first.png",
  "/images/app mockup second.png",
  "/images/app mockup third.png",
  "/images/app mockup fourth.png",
];

export default function Slide01Hook() {
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % mobileScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SlideContainer variant="dark">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex items-center h-full py-10 md:py-16"
      >
        {/* Left column — text content */}
        <div className="flex flex-col justify-center w-full lg:w-[55%] shrink-0">
          {/* Logo + tagline */}
          <motion.div variants={fadeIn} className="mb-8 md:mb-12">
            <Image
              src="/images/wattiva logomark white.svg"
              alt="Wattiva"
              width={280}
              height={49}
              className="w-48 md:w-64 lg:w-72"
              priority
            />
            <p
              className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-light/60 tracking-wide mt-3"
              style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.125rem)" }}
            >
              DERMS for Innovative Energy Companies.
            </p>
          </motion.div>

          {/* Main content */}
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-clash)] font-semibold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(1.875rem, 4.5vw, 4.5rem)" }}
            >
              Your customers{" "}
              <br className="hidden lg:inline" />
              own the flexibility.
              <br />
              <span className="text-wattiva-accent">
                We will help you{" "}
                <br className="hidden lg:inline" />
                monetize it.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-light mt-6 md:mt-8 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.75rem)" }}
            >
              Wattiva aggregates EVs, batteries, heat pumps, and solar
              into one virtual power plant you control.
            </motion.p>
          </div>
        </div>

        {/* Right column — phone mockups (desktop only) */}
        <PhoneMockups className="hidden lg:block w-[45%] h-full relative" />
      </motion.div>

      {/* Mobile fallback: cycling phone, bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="lg:hidden absolute bottom-4 right-4 w-32 sm:w-40 md:w-48 pointer-events-none"
      >
        <div className="relative w-full aspect-[200/433]">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIndex}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <Image
                src={mobileScreens[mobileIndex]}
                alt="Wattiva app"
                fill
                className="object-contain drop-shadow-[0_15px_35px_rgba(140,33,248,0.2)]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </SlideContainer>
  );
}
