"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import AnimatedNumber from "@/components/AnimatedNumber";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";
import { generatePins } from "@/lib/slovakiaPins";

/* ── animation variants ── */

const pinContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.003,
      delayChildren: 0.8,
    },
  },
};

const pinDrop = {
  hidden: { opacity: 0, scale: 0, y: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 22 },
  },
};

export default function Slide06Proof() {
  const pins = useMemo(() => generatePins(), []);

  return (
    <SlideContainer variant="dark">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="h-full flex flex-col justify-center"
      >
        {/* ── Main two-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-8 lg:gap-10 items-center">
          {/* ── Left column ── */}
          <div className="flex flex-col">
            {/* Badge — uses clamp() so it scales fluidly and never wraps */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-block rounded-full bg-gradient-to-r from-wattiva-primary to-wattiva-accent -rotate-[4deg] whitespace-nowrap"
                style={{
                  padding: "clamp(0.375rem, 0.8vw, 0.625rem) clamp(1.25rem, 2.5vw, 1.75rem)",
                }}
              >
                <span
                  className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-light whitespace-nowrap"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 4.5rem)",
                  }}
                >
                  Live in Slovakia.
                </span>
              </span>
            </motion.div>

            {/* Big numbers — stack vertically, each stat is self-contained */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 md:gap-x-10 lg:gap-x-12 mt-6 md:mt-8 lg:mt-10">
              <motion.div variants={fadeUp}>
                <AnimatedNumber
                  value={1500}
                  suffix="+"
                  className="font-[family-name:var(--font-clash)] font-bold text-wattiva-light leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 6rem)",
                  }}
                />
                <p className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-light text-sm lg:text-lg mt-1">
                  households connected
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <AnimatedNumber
                  value={10}
                  suffix=" MWh"
                  className="font-[family-name:var(--font-clash)] font-bold text-wattiva-light leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 6rem)",
                  }}
                />
                <p className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-light text-sm lg:text-lg mt-1">
                  shifted daily
                </p>
              </motion.div>
            </div>

            {/* Supporting text */}
            <motion.div variants={fadeIn} className="mt-5 md:mt-6 lg:mt-8 max-w-xl">
              <p className="text-wattiva-light text-sm sm:text-base lg:text-lg leading-relaxed">
                Wattiva deployed its own B2C smart charging app for EV owners
                in Slovakia to prove the platform at scale. We built the app.
                We signed the customers. We paid the rewards. 1,500 households
                earning money for charging when prices are low and the grid
                needs it.
              </p>
            </motion.div>
          </div>

          {/* ── Right column — Slovakia map with animated pins ── */}
          <motion.div
            variants={fadeUp}
            className="relative w-full flex items-center justify-center md:scale-[1.15] md:origin-center lg:scale-100"
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "7001 / 3375" }}
            >
              <Image
                src="/images/map_slovakia.svg"
                alt="Map of Slovakia"
                fill
                className="object-contain"
                priority
              />

              {/* Pin overlay */}
              <motion.div
                className="absolute inset-0"
                variants={pinContainer}
                initial="hidden"
                animate="visible"
              >
                {pins.map((pin, i) => (
                  <motion.div
                    key={i}
                    variants={pinDrop}
                    className="absolute w-[5px] h-[5px] lg:w-[6px] lg:h-[6px] xl:w-[7px] xl:h-[7px] rounded-full bg-wattiva-dark shadow-sm"
                    style={{
                      left: `${pin.x}%`,
                      top: `${pin.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SlideContainer>
  );
}
