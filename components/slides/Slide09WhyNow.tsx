"use client";

import { motion } from "framer-motion";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp } from "@/lib/animations";

const trends = [
  {
    title: "DER Growth",
    body: "EU targets by 2030: 215 GW solar, 60M heat pumps, 50M EVs. These assets will charge and discharge. Randomly or strategically.",
  },
  {
    title: "Flexibility demand",
    body: "220 TWh needed in 2025 → 450 TWh by 2030. Someone will provide this flexibility.",
  },
  {
    title: "Competitive pressure",
    body: "Octopus built Kraken. Tech-native retailers are capturing share. The window to catch up is closing.",
  },
];

export default function Slide09WhyNow() {
  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.18, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full"
      >
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
        >
          The flexibility market is forming.{" "}
          <span className="text-wattiva-primary">Now.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {trends.map((trend) => (
            <motion.div
              key={trend.title}
              variants={fadeUp}
              className="rounded-2xl bg-wattiva-dark text-wattiva-light p-6 md:p-8"
            >
              <h3 className="font-[family-name:var(--font-clash)] font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight text-wattiva-light">
                {trend.title}
              </h3>
              <p className="text-wattiva-light font-medium text-sm md:text-base leading-relaxed mt-1.5">
                {trend.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideContainer>
  );
}
