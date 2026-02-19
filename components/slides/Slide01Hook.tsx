"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import PhoneMockups from "@/components/PhoneMockups";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

export default function Slide01Hook() {
  return (
    <SlideContainer variant="dark">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row items-center h-full max-md:h-auto py-10 md:py-16"
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
              style={{ fontSize: "clamp(1.5rem, 4.5vw, 4.5rem)" }}
            >
              Your customers{" "}
              <br className="hidden lg:inline" />
              own the flexibility.
              <br className="max-md:hidden" />
              {" "}
              <span className="text-wattiva-accent">
                We will help you{" "}
                <br className="hidden lg:inline" />
                monetize it.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-light mt-6 md:mt-8 leading-relaxed lg:max-w-[min(80%,48rem)]"
              style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.75rem)" }}
            >
              Wattiva aggregates EVs, batteries, heat pumps, and solar
              into one virtual power plant you control.
            </motion.p>
          </div>
        </div>

        {/* Right column — phone mockups (desktop) */}
        <PhoneMockups className="hidden lg:block w-[45%] h-full relative" />

        {/* Phone mockups (mobile/tablet) — same carousel, smaller container */}
        <PhoneMockups className="lg:hidden w-full h-80 sm:h-96 md:h-[28rem] relative mt-6" />
      </motion.div>
    </SlideContainer>
  );
}
