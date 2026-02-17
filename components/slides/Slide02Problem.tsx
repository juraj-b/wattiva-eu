"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import AnimatedNumber from "@/components/AnimatedNumber";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

export default function Slide02Problem() {
  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="h-full flex flex-col justify-center"
      >
        {/* Two-column grid — text left, image right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 md:gap-8 lg:gap-10 items-center">
          {/* ── Left column — text content ── */}
          <div className="flex flex-col">
            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-clash)] font-semibold leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 2.2vw, 3rem)" }}
            >
              Price valleys are deeper. Peaks are higher.{" "}
              <span className="text-wattiva-primary">
                The gap is where the money is.
              </span>
            </motion.h2>

            {/* Big number */}
            <motion.div variants={fadeUp} className="mt-5 md:mt-6 lg:mt-8">
              <AnimatedNumber
                value={534}
                className="font-[family-name:var(--font-clash)] font-bold text-wattiva-primary leading-none"
                style={{ fontSize: "clamp(3.5rem, 7vw, 11rem)" }}
              />
              <p
                className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark mt-1 md:mt-2"
                style={{ fontSize: "clamp(0.75rem, 1.1vw, 1.25rem)" }}
              >
                hours of negative or near-zero prices across major EU markets in 2025
              </p>
            </motion.div>

            {/* Supporting text */}
            <motion.p
              variants={fadeIn}
              className="text-wattiva-dark font-medium mt-4 md:mt-5 lg:mt-6 leading-relaxed"
              style={{ fontSize: "clamp(0.8rem, 1.1vw, 1.25rem)" }}
            >
              As renewables scale, expect deeper valleys and higher peaks.
              That spread is worth money — if you can shift load into valleys
              and away from peaks. Your customers already own the assets to do this.
            </motion.p>

            {/* Source */}
            <motion.p
              variants={fadeIn}
              className="text-wattiva-dark/30 text-xs mt-3"
            >
              Source: Electricity Maps &ldquo;Grid in review 2025&rdquo;, Gridio
            </motion.p>
          </div>

          {/* ── Right column — price valleys image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { delay: 1.3, duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative w-full flex items-center justify-center"
          >
            <Image
              src="/images/price_valleys.png"
              alt="Energy price valleys — isometric illustration"
              width={1200}
              height={800}
              className="w-full h-auto"
              style={{ maxWidth: "none" }}
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </SlideContainer>
  );
}
