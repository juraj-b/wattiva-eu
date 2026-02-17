"use client";

import { motion } from "framer-motion";
import SlideContainer from "@/components/SlideContainer";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

const stats = [
  {
    value: 300,
    prefix: "€",
    suffix: "/year",
    label: "per household",
    sublabel: "proven today",
  },
  {
    value: null,
    display: "10–20 kW",
    label: "steerable load",
    sublabel: "per household",
  },
  {
    value: 30,
    prefix: "€",
    suffix: "M",
    label: "per 100K households",
    sublabel: "conservative estimate",
  },
];

export default function Slide03Opportunity() {
  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full"
      >
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
        >
          €300 per household.{" "}
          <span className="text-wattiva-primary">Already in your network.</span>
        </motion.h2>

        {/* Three stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
            >
              <Card className="bg-wattiva-dark h-full">
                <CardContent className="p-6 md:p-8">
                  <div className="font-[family-name:var(--font-clash)] font-bold text-3xl md:text-4xl lg:text-5xl text-wattiva-light">
                    {stat.value !== null ? (
                      <AnimatedNumber
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    ) : (
                      stat.display
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-clash)] text-wattiva-light text-sm md:text-base mt-2 font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-wattiva-light/70 font-medium text-xs md:text-sm mt-0.5">
                    {stat.sublabel}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Supporting text */}
        <motion.p
          variants={fadeIn}
          className="text-wattiva-dark font-medium text-[1.5em] max-w-xl mt-6 md:mt-8 leading-relaxed"
        >
          In mature markets like the Netherlands, leading aggregators
          see €500–1,000+ per household. The value is real and growing.
        </motion.p>

        <motion.p
          variants={fadeIn}
          className="text-wattiva-dark/30 text-xs mt-3"
        >
          Source: Wattiva deployment data
        </motion.p>
      </motion.div>
    </SlideContainer>
  );
}
