"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp } from "@/lib/animations";

const cards = [
  {
    title: "Hedge",
    icon: "/images/money drain.svg",
    body: "Shift load to price valleys. Absorb surplus during negative hours. Reduce spot exposure.",
  },
  {
    title: "Revenue",
    icon: "/images/earn.svg",
    body: "Aggregate flexibility and bid into markets. Day-ahead, intraday, balancing services. Revenue from assets you don't own.",
  },
  {
    title: "Retention",
    icon: "/images/traders.svg",
    body: "Customers see savings in your app. Switching means re-authorizing everything. In a 15% churn market, that friction is worth millions.",
  },
];

export default function Slide07WhatYouGet() {
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
          Hedge volatility. Unlock revenue.{" "}
          <span className="text-wattiva-primary">Reduce churn.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-8 md:mt-12">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-2xl bg-wattiva-dark text-wattiva-light p-6 md:p-7 lg:p-8"
            >
              <div className="mb-4">
                <Image
                  src={card.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-14 md:h-14 opacity-80"
                />
              </div>
              <h3 className="font-[family-name:var(--font-clash)] font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight text-wattiva-light">
                {card.title}
              </h3>
              <p className="text-wattiva-light text-sm md:text-base leading-relaxed mt-3">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideContainer>
  );
}
