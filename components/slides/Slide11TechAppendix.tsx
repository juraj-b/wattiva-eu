"use client";

import { motion } from "framer-motion";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp } from "@/lib/animations";

const columns = [
  {
    title: "INTEGRATION",
    items: [
      "Cloud-to-cloud REST API",
      "100+ OEM integrations",
      "EVs, heat pumps, batteries, PV",
      "White-label or API-only",
      "No hardware",
    ],
  },
  {
    title: "OPTIMIZATION",
    items: [
      "Day-ahead and intraday signals",
      "PV forecast integration",
      "Departure time constraints",
      "Grid constraint awareness",
      "Automated EDC (EIC OOM)",
    ],
  },
  {
    title: "MARKETS",
    items: [
      "Day-ahead bidding",
      "Intraday trading",
      "Balancing services",
      "Negative price absorption",
      "V2G ready",
    ],
  },
  {
    title: "SECURITY",
    items: [
      "SOC 2 Type II",
      "GDPR compliant",
      "No SCADA required",
      "Parallel layer architecture",
    ],
  },
];

export default function Slide11TechAppendix() {
  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.08, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full"
      >
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight mb-8 md:mb-12"
        >
          How the platform works
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {columns.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <h3 className="font-[family-name:var(--font-clash)] font-semibold text-xs md:text-sm tracking-widest text-wattiva-dark mb-3 md:mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-wattiva-dark/60 text-xs md:text-sm leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideContainer>
  );
}
