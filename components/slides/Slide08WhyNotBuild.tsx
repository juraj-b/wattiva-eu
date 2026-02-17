"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp, slideFromLeft, slideFromRight, fadeIn } from "@/lib/animations";

const buildRows = [
  "18–24 months to production",
  "35% failure rate",
  "150–200% cost overrun typical",
  "OEM integrations you maintain",
];

const deployRows = [
  "Weeks to production",
  "Already proven at 1,500+ households",
  "Zero CAPEX — SaaS model",
  "100+ OEMs maintained for you",
];

export default function Slide08WhyNotBuild() {
  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.14, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full"
      >
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
        >
          <span className="text-wattiva-primary">Few weeks</span> vs 18 months.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
          {/* Build in-house — muted */}
          <motion.div
            variants={slideFromLeft}
            className="rounded-2xl bg-gray-50 border border-gray-200 p-6 md:p-8"
          >
            <p className="font-[family-name:var(--font-clash)] text-gray-400 font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight mb-5">
              Build in-house
            </p>
            <ul className="space-y-3.5">
              {buildRows.map((row, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-bold">✕</span>
                  </span>
                  <span className="text-gray-400 text-sm md:text-base">
                    {row}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Deploy Wattiva — vibrant */}
          <motion.div
            variants={slideFromRight}
            className="rounded-2xl bg-wattiva-dark text-wattiva-light p-6 md:p-8 shadow-lg shadow-wattiva-primary/10"
          >
            <p className="font-[family-name:var(--font-clash)] text-wattiva-light font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight mb-5">
              Deploy Wattiva
            </p>
            <ul className="space-y-3.5">
              {deployRows.map((row, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Image
                    src="/images/check.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-wattiva-light text-sm md:text-base">
                    {row}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          variants={fadeIn}
          className="font-[family-name:var(--font-clash)] font-semibold text-lg md:text-xl lg:text-2xl text-wattiva-dark mt-6 md:mt-8"
        >
          The build-vs-buy math has changed.
        </motion.p>
      </motion.div>
    </SlideContainer>
  );
}
