"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

export default function Slide12AboutUs() {
  return (
    <SlideContainer variant="dark">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="h-full max-md:h-auto flex flex-col justify-center"
      >
        {/* Two-column grid — text left, image right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 md:gap-8 lg:gap-10 items-center">
          {/* ── Left column — text content ── */}
          <div className="flex flex-col">
            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
            >
              Born from 15 years of putting EVs on European roads.
            </motion.h2>

            {/* Logo block */}
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-4 mt-5 md:mt-6"
            >
              <Image
                src="/images/wattiva-logo-small-light.svg"
                alt="Wattiva"
                width={120}
                height={32}
                className="h-10 md:h-12 w-auto"
              />
              <span className="text-wattiva-light/40 text-xs md:text-sm">
                is a brand of
              </span>
              <Image
                src="/images/voltia-logo-small.svg"
                alt="Voltia"
                width={100}
                height={28}
                className="h-9 md:h-11 w-auto"
              />
            </motion.div>

            {/* Body copy */}
            <motion.p
              variants={fadeIn}
              className="text-wattiva-light text-sm md:text-base leading-relaxed mt-4 md:mt-5"
            >
              Wattiva comes from Voltia — 15 years of working in the EV
              industry. Electric fleets showed us something most utilities miss:
              every connected vehicle one of the flexible assets waiting to be
              used. We built the platform to unlock their potential for your
              margins.
            </motion.p>

            {/* Contact details */}
            <motion.div
              variants={fadeIn}
              className="mt-4 md:mt-5 space-y-1.5 text-xs md:text-sm text-wattiva-light/60"
            >
              <p className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                <span>
                  N&aacute;mestie slobody 11, 811 06 Bratislava, Slovakia
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a
                  href="mailto:sales@wattiva.eu"
                  className="hover:text-wattiva-accent transition-colors"
                >
                  sales@wattiva.eu
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2z" />
                </svg>
                <a
                  href="tel:+421948244538"
                  className="hover:text-wattiva-accent transition-colors"
                >
                  +421 948 244 538
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <a
                  href="https://www.linkedin.com/company/wattiva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-wattiva-accent transition-colors"
                >
                  linkedin.com/company/wattiva
                </a>
              </p>
            </motion.div>

            {/* CEO Quote */}
            <motion.blockquote
              variants={fadeUp}
              className="mt-5 md:mt-6 rounded-2xl bg-wattiva-light/[0.06] backdrop-blur-sm p-5 md:p-6"
            >
              <p className="text-wattiva-light/90 text-sm md:text-base italic leading-relaxed">
                &ldquo;Your customers are buying EVs, batteries, heat pumps. The
                question is whether that becomes your problem or your
                product.&rdquo;
              </p>
              <footer className="mt-2 text-xs md:text-sm text-wattiva-light/50 font-medium">
                — Martin Gonda, CEO
              </footer>
            </motion.blockquote>
          </div>

          {/* ── Right column — floating image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: {
                delay: 0.4,
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              scale: {
                delay: 0.4,
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              y: {
                delay: 1.3,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative w-full flex items-center justify-center"
          >
            <Image
              src="/images/wattiva-ders.webp"
              alt="Wattiva distributed energy resources"
              width={1250}
              height={1000}
              className="w-full h-auto max-md:max-w-[320px] max-md:mx-auto"
              style={{ maxWidth: "none" }}
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </SlideContainer>
  );
}
