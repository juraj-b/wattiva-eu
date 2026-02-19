"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

/* ── Staggered phone animation for CONNECT card ── */
const phoneContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6,
    },
  },
};

const phoneSlide = {
  hidden: { opacity: 0, x: 20, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const PHONE_MOCKUPS = [
  "/images/app mockup first.png",
  "/images/app mockup second.png",
  "/images/app mockup third.png",
  "/images/app mockup fourth.png",
];

export default function Slide05Solution() {
  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.14, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full max-md:h-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
        >
          <span className="text-gradient">Connect.</span>{" "}
          <span className="text-gradient">Aggregate.</span>{" "}
          <span className="text-gradient">Optimize.</span>
        </motion.h2>

        {/* Three step cards — equal height via grid stretch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-6 md:mt-12">
          {/* ── 1. CONNECT ── */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-wattiva-dark text-wattiva-light overflow-hidden flex flex-col"
          >
            {/* Text zone — flex-1 equalizes height across grid siblings */}
            <div className="flex-1 pt-6 px-6 pb-5 md:pt-7 md:px-7 md:pb-6 lg:pt-8 lg:px-8">
              <div className="mb-4">
                <Image
                  src="/images/setup.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-14 md:h-14 opacity-80"
                />
              </div>
              <h3 className="font-[family-name:var(--font-clash)] font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight text-wattiva-light">
                CONNECT
              </h3>
              <ul className="mt-3 space-y-1.5">
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  Cloud APIs to 1,500+ device types.
                </li>
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  No hardware.
                </li>
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  No home installations.
                </li>
              </ul>
            </div>

            {/* Phone mockups — horizontally aligned with AGGREGATE image */}
            <div className="relative overflow-hidden pb-4">
              <motion.div
                variants={phoneContainer}
                initial="hidden"
                animate="visible"
                className="flex items-end justify-center w-full px-2"
              >
                {PHONE_MOCKUPS.map((src, i) => (
                  <motion.div
                    key={i}
                    variants={phoneSlide}
                    className="relative flex-shrink-0"
                    style={{
                      width: "28%",
                      marginLeft: i > 0 ? "-5%" : 0,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`App screen ${i + 1}`}
                      width={200}
                      height={407}
                      className="w-full h-auto rounded-t-lg shadow-lg"
                    />
                  </motion.div>
                ))}
              </motion.div>
              {/* Fade overlay — z-10 so it sits above all phones */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(to bottom, transparent, #27153C)",
                }}
              />
            </div>
          </motion.div>

          {/* ── 2. AGGREGATE ── */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-wattiva-dark text-wattiva-light overflow-hidden flex flex-col"
          >
            {/* Text zone — flex-1 equalizes height across grid siblings */}
            <div className="flex-1 pt-6 px-6 pb-5 md:pt-7 md:px-7 md:pb-6 lg:pt-8 lg:px-8">
              <div className="mb-4">
                <Image
                  src="/images/load 1.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-14 md:h-14 opacity-80"
                />
              </div>
              <h3 className="font-[family-name:var(--font-clash)] font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight text-wattiva-light">
                AGGREGATE
              </h3>
              <ul className="mt-3 space-y-1.5">
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  Individual devices become one VPP.
                </li>
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  Forecast flexibility by hour, by day.
                </li>
              </ul>
            </div>

            {/* Dashboard — bottom fade + same pb-4 gap as CONNECT */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden pb-4"
            >
              <div className="relative px-[7.5%]">
                <Image
                  src="/images/wattiva_dash.png"
                  alt="Wattiva dashboard"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
                {/* Fade covers only the image, not the pb-4 gap */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none z-10"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #27153C)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ── 3. OPTIMIZE ── */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-wattiva-dark text-wattiva-light overflow-hidden flex flex-col"
          >
            {/* Text zone — flex-1 equalizes height across grid siblings */}
            <div className="flex-1 pt-6 px-6 pb-5 md:pt-7 md:px-7 md:pb-6 lg:pt-8 lg:px-8">
              <div className="mb-4">
                <Image
                  src="/images/charge.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-14 md:h-14 opacity-80"
                />
              </div>
              <h3 className="font-[family-name:var(--font-clash)] font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight text-wattiva-light">
                OPTIMIZE
              </h3>
              <ul className="mt-3 space-y-1.5">
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  You set the objective. We execute.
                </li>
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  Day-ahead. Intraday.
                </li>
                <li className="text-wattiva-light text-sm md:text-base leading-relaxed">
                  Balancing. Curtailment.
                </li>
              </ul>
            </div>

            {/* Dashboard — same structure as AGGREGATE card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden pb-4"
            >
              <div className="relative px-[7.5%]">
                <Image
                  src="/images/wattiva_dash_optimize.png"
                  alt="Wattiva optimization dashboard"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
                {/* Fade covers only the image, not the pb-4 gap */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none z-10"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #27153C)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div variants={fadeIn} className="mt-10 md:mt-14">
          <p className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark text-lg md:text-xl lg:text-2xl text-center">
            You tell the VPP what to do. Our system figures out how.
          </p>
        </motion.div>
      </motion.div>
    </SlideContainer>
  );
}
