"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SlideContainer from "@/components/SlideContainer";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";
import { generateEVChargingData } from "@/lib/evChargingData";
import type { ChargingDataPoint } from "@/lib/evChargingData";

const PURPLE = "#8C21F8";
const RED = "#FF6B6B";
const AMBER = "#F59E0B";

const TICK_DAYS = [1, 6, 12, 18, 24, 30];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; payload: ChargingDataPoint }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-wattiva-dark text-wattiva-light rounded-lg px-3.5 py-2.5 shadow-xl text-xs leading-relaxed">
      <p className="font-semibold mb-1.5">
        {d.day}.11.2025 {d.hour.toString().padStart(2, "0")}:00
      </p>
      <p className="flex items-center gap-2">
        <span
          className="inline-block w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: PURPLE }}
        />
        Availability: {d.availability.toFixed(1)} kWh
      </p>
      <p className="flex items-center gap-2">
        <span
          className="inline-block w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: RED }}
        />
        Charging: {d.charging.toFixed(1)} kWh
      </p>
      <p className="flex items-center gap-2">
        <span
          className="inline-block w-4 h-0.5 rounded"
          style={{ backgroundColor: AMBER }}
        />
        Price: {d.price.toFixed(1)} EUR/MWh
      </p>
    </div>
  );
}

function CustomLegend() {
  return (
    <div className="flex items-center justify-center gap-5 md:gap-8 text-[10px] md:text-xs text-wattiva-dark/70 mb-1">
      <span className="flex items-center gap-1.5">
        <span
          className="inline-block w-3 h-3 rounded-sm"
          style={{ backgroundColor: PURPLE, opacity: 0.6 }}
        />
        EV Availability (kWh per 15 min)
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="inline-block w-3 h-3 rounded-sm"
          style={{ backgroundColor: RED, opacity: 0.7 }}
        />
        EV Charging (kWh per 15 min)
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="inline-block w-4 h-0.5 rounded"
          style={{ backgroundColor: AMBER }}
        />
        Day Ahead Price EUR/MWh
      </span>
    </div>
  );
}

const stats = [
  {
    category: "Unmanaged",
    style: "rounded-xl bg-wattiva-dark/5 border border-wattiva-dark/10 p-4 md:p-5",
    labelColor: "text-wattiva-dark/50",
    numColor: "text-wattiva-dark",
    descColor: "text-wattiva-dark/60",
    rows: [
      { num: "1,300 kW", desc: "peak during expensive hours" },
      { num: "410 MWh/mo", desc: "consumed at random times" },
      { num: "670 kW", desc: "average charging load — unbalanced" },
    ],
  },
  {
    category: "Managed",
    style: "rounded-xl bg-wattiva-dark text-wattiva-light p-4 md:p-5",
    labelColor: "text-wattiva-light/60",
    numColor: "text-wattiva-light",
    descColor: "text-wattiva-light/70",
    rows: [
      { num: "2.6 MW", desc: "flexible power on call" },
      { num: "62 MWh", desc: "shifted to cheap windows" },
      { num: "Charge load", desc: "modulated actively" },
    ],
  },
  {
    category: "Result",
    style: "rounded-xl bg-gradient-to-br from-wattiva-primary to-wattiva-accent text-wattiva-light p-4 md:p-5",
    labelColor: "text-wattiva-light/60",
    numColor: "text-wattiva-light",
    descColor: "text-wattiva-light/80",
    rows: [
      { num: "50%", desc: "energy cost reduction" },
      { num: "Zero", desc: "impact on users" },
    ],
  },
];

export default function Slide06bEVCharging() {
  const data = useMemo(() => generateEVChargingData(), []);

  // Indices for X-axis ticks (first sample of each tick day)
  const tickIndices = TICK_DAYS.map((d) => data.findIndex((p) => p.day === d));

  return (
    <SlideContainer variant="light">
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center h-full py-6 md:py-10"
      >
        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          className="font-[family-name:var(--font-clash)] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
        >
          From 1.3 MW problem to{" "}
          <span className="text-wattiva-primary">2.6 MW asset.</span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          variants={fadeIn}
          className="text-wattiva-dark/50 text-xs md:text-sm font-medium tracking-wide mt-1.5 md:mt-2"
        >
          1,000 EVs &middot; November 2025 &middot; Slovakia
        </motion.p>

        {/* Chart */}
        <motion.div
          variants={fadeUp}
          className="mt-4 md:mt-6 w-full flex-1 min-h-0 outline-none [&_svg]:outline-none [&_svg]:focus:outline-none"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
              style={{ outline: "none" }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#00000010"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                ticks={tickIndices.map((i) => data[i]?.label)}
                tick={{ fontSize: 10, fill: "#27153C80" }}
                axisLine={{ stroke: "#27153C20" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 700]}
                tick={{ fontSize: 10, fill: "#27153C80" }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "kWh per 15 min",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { fontSize: 9, fill: "#27153C60" },
                }}
              />
              <YAxis
                yAxisId="price"
                orientation="right"
                domain={[0, 450]}
                tick={{ fontSize: 10, fill: "#F59E0B90" }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "EUR/MWh",
                  angle: 90,
                  position: "insideRight",
                  offset: 10,
                  style: { fontSize: 9, fill: "#F59E0B90" },
                }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#27153C30", strokeWidth: 1 }}
              />
              <Legend content={<CustomLegend />} verticalAlign="top" />
              {/* Charging first (bottom SVG layer) — animates in first */}
              <Area
                type="monotone"
                dataKey="charging"
                fill={RED}
                fillOpacity={0.5}
                stroke={RED}
                strokeWidth={1.5}
                isAnimationActive
                animationBegin={300}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              {/* Availability on top — animates in second */}
              <Area
                type="monotone"
                dataKey="availability"
                fill={PURPLE}
                fillOpacity={0.35}
                stroke={PURPLE}
                strokeWidth={1.5}
                isAnimationActive
                animationBegin={1200}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              {/* Price line last — draws across third */}
              <Line
                type="monotone"
                dataKey="price"
                yAxisId="price"
                stroke={AMBER}
                strokeWidth={2}
                dot={false}
                isAnimationActive
                animationBegin={2100}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6"
        >
          {stats.map((s) => (
            <div key={s.category} className={s.style}>
              <p
                className={`font-[family-name:var(--font-clash)] font-bold text-[10px] md:text-xs uppercase tracking-widest ${s.labelColor} mb-2`}
              >
                {s.category}
              </p>
              {s.rows.map((row) => (
                <div key={row.num} className="mt-1.5 first:mt-0">
                  <span
                    className={`font-[family-name:var(--font-clash)] font-bold text-lg md:text-xl ${s.numColor}`}
                  >
                    {row.num}
                  </span>
                  <span className={`text-xs md:text-sm ml-1.5 ${s.descColor}`}>
                    {row.desc}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Bottom line */}
        <motion.p
          variants={fadeIn}
          className="font-[family-name:var(--font-clash)] font-semibold text-base md:text-lg lg:text-xl text-wattiva-dark mt-3 md:mt-5"
        >
          Same energy. Different timing. Half the cost.
        </motion.p>

        {/* Source */}
        <motion.p
          variants={fadeIn}
          className="text-wattiva-dark/30 text-[10px] md:text-xs mt-1"
        >
          Source: Wattiva platform data, November 2025
        </motion.p>
      </motion.div>
    </SlideContainer>
  );
}
