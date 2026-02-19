"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

/* ── Bar colors ── */
const COMMODITY = "rgba(140, 33, 248, 0.35)";
const MARGIN_FLEX = "#8C21F8";
const MARGIN_TRAD = "#8C21F8";
const CUSTOMER = "rgba(20, 184, 166, 0.55)";

/*
 * Tooltip dot colors — opaque equivalents of each bar's perceived
 * color on the light slide background. Rendering rgba on the tooltip's
 * dark bg would produce wrong perceived colors.
 */
const DOT_COMMODITY = "#B98DF5";
const DOT_MARGIN = "#8C21F8";
const DOT_CUSTOMER = "#6DD4C8";

/* ── Apple ease ── */
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Tooltip data ── */
const TOOLTIP_DATA: Record<string, { text: string; dotColor: string }> = {
  commodityTrad: {
    text: "Commodity costs you can\u2019t control",
    dotColor: DOT_COMMODITY,
  },
  marginTrad: {
    text: "€10 margin \u2014 squeezed by commodity costs you can\u2019t control",
    dotColor: DOT_MARGIN,
  },
  commodityFlex: {
    text: "Lower procurement cost from smarter buying",
    dotColor: DOT_COMMODITY,
  },
  marginFlex: {
    text: "€30 margin \u2014 3\u00D7 expansion from smarter procurement",
    dotColor: DOT_MARGIN,
  },
  customer: {
    text: "Discount & rewards that drive retention \u2014 value you couldn\u2019t offer before",
    dotColor: DOT_CUSTOMER,
  },
};

/* ── Hover info ── */
interface HoverInfo {
  key: string;
  top: number;
  height: number;
}

/*
 * Left bar:  commodity 90 + margin 10 = 100   (margin is 1×)
 * Right bar: commodity 50 + margin 30 + customer 20 = 100  (margin is 3×)
 *
 * To make right margin visually 3× left margin across breakpoints,
 * keep the percentages as the single source of truth: 10% vs 30%.
 * Both bars share the same fluid height, so 30/10 = 3× always holds.
 */

/* ── Bar section ── */
function BarSection({
  percentage,
  color,
  label,
  labelColor,
  phase,
  showAt,
  growDuration = 1.2,
  tooltipKey,
  animationDone,
  onHover,
  onLeave,
  pulseLabel,
}: {
  percentage: number;
  color: string;
  label?: string;
  labelColor?: string;
  phase: number;
  showAt: number;
  growDuration?: number;
  tooltipKey?: string;
  animationDone: boolean;
  onHover?: (info: HoverInfo) => void;
  onLeave?: () => void;
  pulseLabel?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!animationDone || !tooltipKey || !sectionRef.current) return;
    const el = sectionRef.current;
    const container = el.closest("[data-bar-container]") as HTMLElement | null;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    onHover?.({
      key: tooltipKey,
      top: eRect.top - cRect.top,
      height: eRect.height,
    });
  };

  return (
    <motion.div
      ref={sectionRef}
      className="relative w-full flex items-center justify-center"
      initial={{ height: "0%" }}
      animate={{ height: phase >= showAt ? `${percentage}%` : "0%" }}
      transition={{ duration: growDuration, ease: EASE }}
      style={{
        backgroundColor: color,
        minHeight: 0,
        cursor: animationDone ? "pointer" : "default",
        overflow: "hidden",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => onLeave?.()}
    >
      {label && (
        <motion.span
          className="font-semibold uppercase tracking-wider text-center px-1 inline-block"
          style={{
            fontSize: "clamp(0.55rem, 0.9vw, 0.85rem)",
            color: labelColor ?? "#27153C",
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: phase >= showAt ? 1 : 0,
            ...(pulseLabel && animationDone
              ? { scale: [1, 1.18, 1] }
              : {}),
          }}
          transition={
            pulseLabel && animationDone
              ? { duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }
              : { delay: growDuration * 0.6, duration: 0.4 }
          }
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

/* ── Tooltip — width: max-content clamped, natural word wrap ── */
function BarTooltip({
  hoverInfo,
  side,
}: {
  hoverInfo: HoverInfo | null;
  side: "left" | "right";
}) {
  return (
    <AnimatePresence>
      {hoverInfo && TOOLTIP_DATA[hoverInfo.key] && (
        <motion.div
          key={hoverInfo.key}
          className={`absolute ${
            side === "left" ? "right-full mr-4" : "left-full ml-4"
          } z-50 bg-wattiva-dark text-wattiva-light rounded-lg px-4 py-3 shadow-xl pointer-events-none`}
          style={{
            width: "max-content",
            maxWidth: "22rem",
            top: hoverInfo.top + hoverInfo.height / 2,
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0, scale: 0.97, x: side === "left" ? 6 : -6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.97, x: side === "left" ? 6 : -6 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <span className="flex items-center gap-2.5 text-[0.8125rem] leading-normal">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: TOOLTIP_DATA[hoverInfo.key].dotColor }}
            />
            <span>{TOOLTIP_DATA[hoverInfo.key].text}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Slide04bEconomicsDetail() {
  const [phase, setPhase] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const [bottomRevealed, setBottomRevealed] = useState(false);
  const [hoveredTrad, setHoveredTrad] = useState<HoverInfo | null>(null);
  const [hoveredFlex, setHoveredFlex] = useState<HoverInfo | null>(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const startAnimation = useCallback(() => {
    setPhase(0);
    setAnimationDone(false);
    const timers = [
      setTimeout(() => {
        setIsReplaying(false);
        setPhase(1);
      }, 300),
      setTimeout(() => setPhase(1.5), 1100),
      /* Phase 2: €10 + "You accept the cost." */
      setTimeout(() => setPhase(2), 2000),
      /* Phase 3: Right bar commodity */
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(3.5), 3500),
      setTimeout(() => setPhase(3.7), 4200),
      /* Phase 4: €30 + "You shape the cost." + 3× (symmetric to phase 2) */
      setTimeout(() => setPhase(4), 5000),
      /* Phase 5: bottom line — eases in shortly after captions settle */
      setTimeout(() => setPhase(5), 5600),
      setTimeout(() => {
        setAnimationDone(true);
        setBottomRevealed(true);
      }, 6800),
    ];
    timersRef.current = timers;
    return timers;
  }, []);

  useEffect(() => {
    const timers = startAnimation();
    return () => timers.forEach(clearTimeout);
  }, [startAnimation]);

  const handleReplay = () => {
    timersRef.current.forEach(clearTimeout);
    setAnimationDone(false);
    setIsReplaying(true);
    setTimeout(() => {
      setPhase(0);
      setTimeout(() => {
        startAnimation();
      }, 300);
    }, 600);
  };

  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full max-md:h-auto"
      >
        {/* Headline — extra top margin to clear the question island */}
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold leading-[1.15] tracking-tight md:mt-8"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 4rem)" }}
        >
          Same kWh. Smarter buying.{" "}
          <span className="text-wattiva-primary">Everyone wins.</span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          variants={fadeIn}
          className="text-wattiva-dark font-medium slide-copy mt-2 md:mt-5 leading-relaxed"
          style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.6rem)" }}
        >
          Flexibility turns demand from a fixed cost into a controllable trading
          asset.
        </motion.p>

        {/* ── Bars section ── */}
        <motion.div
          variants={fadeUp}
          className="flex items-end justify-center gap-[clamp(2rem,5vw,7rem)] mt-6 md:mt-6 lg:mt-8"
          style={{ height: "clamp(14rem, 52vh, 40rem)" }}
          animate={{ opacity: isReplaying ? 0 : 1 }}
          transition={{ duration: isReplaying ? 0.5 : 0.3 }}
        >
          {/* ── Traditional bar column ── */}
          <div className="relative flex flex-col items-center h-full">
            <motion.p
              className="font-[family-name:var(--font-clash)] font-bold uppercase tracking-widest text-wattiva-dark mb-3"
              style={{ fontSize: "clamp(0.65rem, 1vw, 1rem)" }}
              animate={{ opacity: 1 }}
            >
              Traditional
            </motion.p>

            <div
              data-bar-container
              className="relative flex flex-col-reverse rounded-lg overflow-hidden flex-1"
              style={{ width: "clamp(4.5rem, 14vw, 14rem)" }}
            >
              {/* Commodity 90% */}
              <BarSection
                percentage={90}
                color={COMMODITY}
                label="Cost of commodity"
                phase={phase}
                showAt={1}
                growDuration={1.2}
                tooltipKey="commodityTrad"
                animationDone={animationDone}
                onHover={setHoveredTrad}
                onLeave={() => setHoveredTrad(null)}
              />
              {/* Margin 10% (1×) */}
              <BarSection
                percentage={10}
                color={MARGIN_TRAD}
                label="Margin"
                labelColor="#F5EAFE"
                phase={phase}
                showAt={1.5}
                growDuration={0.8}
                tooltipKey="marginTrad"
                animationDone={animationDone}
                onHover={setHoveredTrad}
                onLeave={() => setHoveredTrad(null)}
              />
            </div>

            <BarTooltip hoverInfo={hoveredTrad} side="left" />

            {/* €10 + caption — phase 2 */}
            <motion.div
              className="flex items-center mt-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase >= 2 ? 1 : 0,
                y: phase >= 2 ? 0 : 8,
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span
                className="font-[family-name:var(--font-clash)] font-bold text-wattiva-dark"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.75rem)" }}
              >
                €10
              </span>
              <span
                className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark ml-2"
                style={{ fontSize: "clamp(0.85rem, 1.2vw, 1.15rem)" }}
              >
                margin
              </span>
            </motion.div>

            <motion.p
              className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark mt-2 text-center"
              style={{ fontSize: "clamp(0.85rem, 1.15vw, 1.1rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              You accept the cost.
            </motion.p>
          </div>

          {/* ── 3× indicator — phase 4 (hidden on mobile to save space) ── */}
          <motion.div
            className="flex flex-col items-center justify-center self-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase >= 4 ? 1 : 0,
              scale: phase >= 4 ? 1 : 0.8,
            }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.span
              className="font-[family-name:var(--font-clash)] font-bold text-wattiva-primary inline-block"
              style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)" }}
              initial={{ scale: 1 }}
              animate={
                phase >= 4 && animationDone
                  ? { scale: [1, 1.18, 1] }
                  : { scale: 1 }
              }
              transition={
                phase >= 4 && animationDone
                  ? { duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }
                  : { duration: 0.3 }
              }
            >
              3×
            </motion.span>
            <span
              className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark"
              style={{ fontSize: "clamp(0.75rem, 1.1vw, 1.05rem)" }}
            >
              margin
            </span>
          </motion.div>

          {/* ── Flexibility bar column ── */}
          <div className="relative flex flex-col items-center h-full">
            <motion.p
              className="font-[family-name:var(--font-clash)] font-bold uppercase tracking-widest text-wattiva-dark mb-3"
              style={{ fontSize: "clamp(0.65rem, 1vw, 1rem)" }}
              animate={{ opacity: 1 }}
            >
              Flexibility
            </motion.p>

            <div
              data-bar-container
              className="relative flex flex-col-reverse rounded-lg overflow-hidden flex-1"
              style={{ width: "clamp(4.5rem, 14vw, 14rem)" }}
            >
              {/* Commodity 50% */}
              <BarSection
                percentage={50}
                color={COMMODITY}
                label="Cost of commodity"
                phase={phase}
                showAt={3}
                growDuration={0.7}
                tooltipKey="commodityFlex"
                animationDone={animationDone}
                onHover={setHoveredFlex}
                onLeave={() => setHoveredFlex(null)}
              />
              {/* Margin 30% (3×) — with pulse label */}
              <BarSection
                percentage={30}
                color={MARGIN_FLEX}
                label="Margin"
                labelColor="#F5EAFE"
                phase={phase}
                showAt={3.5}
                growDuration={0.8}
                tooltipKey="marginFlex"
                animationDone={animationDone}
                onHover={setHoveredFlex}
                onLeave={() => setHoveredFlex(null)}
                pulseLabel
              />
              {/* Customer benefit 20% */}
              <BarSection
                percentage={20}
                color={CUSTOMER}
                label="Customer benefit"
                phase={phase}
                showAt={3.7}
                growDuration={0.8}
                tooltipKey="customer"
                animationDone={animationDone}
                onHover={setHoveredFlex}
                onLeave={() => setHoveredFlex(null)}
              />
            </div>

            <BarTooltip hoverInfo={hoveredFlex} side="right" />

            {/* €30 + caption — phase 4 (symmetric to left bar phase 2) */}
            <motion.div
              className="flex items-center mt-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase >= 4 ? 1 : 0,
                y: phase >= 4 ? 0 : 8,
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span
                className="font-[family-name:var(--font-clash)] font-bold text-wattiva-primary"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.75rem)" }}
              >
                €30
              </span>
              <span
                className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark ml-2"
                style={{ fontSize: "clamp(0.85rem, 1.2vw, 1.15rem)" }}
              >
                margin
              </span>
            </motion.div>

            {/* "You shape the cost." at phase 4, matching left bar's pattern */}
            <motion.p
              className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark mt-2 text-center"
              style={{ fontSize: "clamp(0.85rem, 1.15vw, 1.1rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 4 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              You shape the cost.
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom line */}
        <motion.p
          className="font-[family-name:var(--font-clash)] font-semibold text-wattiva-dark max-w-3xl mx-auto text-center mt-4 md:mt-5 lg:mt-6 leading-relaxed"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.65rem)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: phase >= 5 || bottomRevealed ? 1 : 0,
            y: phase >= 5 || bottomRevealed ? 0 : 12,
          }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Shift load into cheap hours → lower procurement cost → split the
          savings: discount for customers, expanded margin for you.
        </motion.p>

        {/* Replay button — fixed bottom-right to avoid nav overlap */}
        <motion.button
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 text-wattiva-dark/40 hover:text-wattiva-primary transition-colors cursor-pointer focus:outline-none"
          style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.9rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: animationDone && !isReplaying ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleReplay}
          aria-label="Replay animation"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Replay
        </motion.button>
      </motion.div>
    </SlideContainer>
  );
}
