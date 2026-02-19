"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import WattivaCharacter from "@/components/WattivaCharacter";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeUp, fadeIn, scaleUp } from "@/lib/animations";

export default function Slide10CTA() {
  return (
    <SlideContainer variant="dark">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full max-md:h-auto py-10 md:py-16"
      >
        {/* Mobile mascot — stacked above content, hidden on desktop */}
        <motion.div
          variants={fadeIn}
          className="md:hidden flex justify-center mb-4"
        >
          <WattivaCharacter
            className=""
            style={{ width: "12rem" }}
          />
        </motion.div>

        {/* Logo */}
        <motion.div variants={fadeIn} className="mb-6 md:mb-12">
          <Image
            src="/images/wattiva logomark white.svg"
            alt="Wattiva"
            width={280}
            height={49}
            className="w-48 md:w-64 lg:w-72"
          />
        </motion.div>

        {/* Main */}
        <div>
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
          >
            Your customers own the flexibility.
            <br className="max-md:hidden" />
            {" "}
            <span className="text-wattiva-accent">We will help you monetize it.</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 md:mt-10">
            <p className="font-[family-name:var(--font-clash)] text-wattiva-light text-lg md:text-2xl lg:text-3xl font-semibold">
              Next step: 30-minute platform demo
            </p>
            <ul className="mt-4 space-y-2 text-wattiva-light text-sm md:text-base">
              <li>We&apos;ll show you the optimization engine live.</li>
              <li>Real data from our Slovakia deployment.</li>
              <li>Scope what a pilot looks like for your customer base.</li>
            </ul>
          </motion.div>

          <motion.div variants={scaleUp} className="mt-8">
            <a href="mailto:hello@wattiva.eu">
              <Button
                size="lg"
                className="animate-pulse-glow text-base px-10"
              >
                Schedule a demo →
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Lottie character */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { delay: 0.8, duration: 0.8 },
          y: { delay: 1.2, duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-0 pointer-events-none hidden md:block"
        style={{ right: "clamp(1rem, 3vw, 5rem)" }}
      >
        <WattivaCharacter
          className=""
          style={{ width: "clamp(18.7rem, 24.2vw, 37.4rem)" }}
        />
      </motion.div>
    </SlideContainer>
  );
}
