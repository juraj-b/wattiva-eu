"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp, slideFromLeft, slideFromRight, fadeIn } from "@/lib/animations";

export default function Slide04Economics() {
  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full max-md:h-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
        >
          3× margin. 30% lower customer price.{" "}
          <span className="text-wattiva-primary">Both at once.</span>
        </motion.h2>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-12">
          {/* Traditional — muted */}
          <motion.div
            variants={slideFromLeft}
            className="rounded-2xl bg-wattiva-dark p-4 md:p-8 lg:p-10"
          >
            <p className="text-wattiva-light text-xs font-semibold uppercase tracking-widest">
              Traditional MWh
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <span className="font-[family-name:var(--font-clash)] font-bold text-3xl md:text-4xl text-wattiva-light">
                  1×
                </span>
                <p className="text-wattiva-light text-sm mt-1">margin</p>
              </div>
              <div>
                <p className="text-wattiva-light text-base md:text-lg font-medium">
                  Standard price
                </p>
              </div>
            </div>
          </motion.div>

          {/* Flexible — vibrant */}
          <motion.div
            variants={slideFromRight}
            className="rounded-2xl bg-gradient-to-br from-wattiva-primary to-wattiva-accent text-wattiva-light p-4 md:p-8 lg:p-10 shadow-lg shadow-wattiva-primary/20"
          >
            <p className="text-wattiva-light/70 text-xs font-semibold uppercase tracking-widest">
              Flexible MWh
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ delay: 1.2, duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
                  className="inline-block font-[family-name:var(--font-clash)] font-bold text-4xl md:text-5xl lg:text-6xl"
                >
                  3×
                </motion.span>
                <p className="text-wattiva-light/80 text-sm mt-1">margin</p>
              </div>
              <div>
                <p className="text-lg md:text-xl font-medium">
                  30% lower price
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <Image src="/images/check_dark.svg" alt="" width={20} height={20} className="w-5 h-5" />
                  <span className="text-sm text-wattiva-light/90">Better for you</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/images/check_dark.svg" alt="" width={20} height={20} className="w-5 h-5" />
                  <span className="text-sm text-wattiva-light/90">Better for customer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          variants={fadeIn}
          className="text-wattiva-dark font-medium text-sm md:text-[1.5em] slide-copy mt-4 md:mt-8 leading-relaxed"
        >
          A flexible MWh sells at roughly 3× the margin of a traditional MWh.
          And you can offer it to customers at 30% lower price than standard rates.
          Better margins for you. Lower bills for them.
        </motion.p>
      </motion.div>
    </SlideContainer>
  );
}
