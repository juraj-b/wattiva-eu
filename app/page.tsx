"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import SlideNavigation from "@/components/SlideNavigation";
import SlideQuestionIsland from "@/components/SlideQuestionIsland";
import MenuOverlay from "@/components/MenuOverlay";
import { slideVariants } from "@/lib/animations";

import Slide01Hook from "@/components/slides/Slide01Hook";
import Slide02Problem from "@/components/slides/Slide02Problem";
import Slide03Opportunity from "@/components/slides/Slide03Opportunity";
import Slide04Economics from "@/components/slides/Slide04Economics";
import Slide04bEconomicsDetail from "@/components/slides/Slide04bEconomicsDetail";
import Slide05Solution from "@/components/slides/Slide05Solution";
import Slide06Proof from "@/components/slides/Slide06Proof";
import Slide06bEVCharging from "@/components/slides/Slide06bEVCharging";
import Slide07WhatYouGet from "@/components/slides/Slide07WhatYouGet";
import Slide08WhyNotBuild from "@/components/slides/Slide08WhyNotBuild";
import Slide09WhyNow from "@/components/slides/Slide09WhyNow";
import Slide10CTA from "@/components/slides/Slide10CTA";
import Slide12AboutUs from "@/components/slides/Slide12AboutUs";
import Slide11TechAppendix from "@/components/slides/Slide11TechAppendix";

const slides = [
  Slide01Hook,
  Slide02Problem,
  Slide03Opportunity,
  Slide04Economics,
  Slide04bEconomicsDetail,
  Slide05Solution,
  Slide06Proof,
  Slide06bEVCharging,
  Slide07WhatYouGet,
  Slide08WhyNotBuild,
  Slide09WhyNow,
  Slide10CTA,
  Slide12AboutUs,
  Slide11TechAppendix,
];

export default function Home() {
  const { currentSlide, direction, totalSlides, goToSlide } =
    useSlideNavigation();
  const hasNavigated = useRef(false);

  // After the first render, subsequent slide changes should animate
  if (direction !== 0) hasNavigated.current = true;

  const CurrentSlide = slides[currentSlide];

  return (
    <div className="h-dvh w-screen overflow-hidden relative">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial={hasNavigated.current ? "enter" : false}
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      <SlideQuestionIsland currentSlide={currentSlide} />

      <MenuOverlay currentSlide={currentSlide} goToSlide={goToSlide} />

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onGoToSlide={goToSlide}
      />
    </div>
  );
}
