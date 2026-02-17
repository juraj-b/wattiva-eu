"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedNumber({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  className,
  style,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(v) {
        setDisplayValue(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  const formatted = displayValue.toLocaleString("en-US");

  const finalFormatted = value.toLocaleString("en-US");

  return (
    <span ref={ref} className={className} style={{ ...style, display: "inline-grid" }}>
      {/* Ghost layer reserves the final width so layout never shifts */}
      <span style={{ gridArea: "1 / 1", visibility: "hidden" }} aria-hidden>
        {prefix}
        {finalFormatted}
        {suffix}
      </span>
      {/* Visible animated value, same grid cell */}
      <span style={{ gridArea: "1 / 1" }}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
