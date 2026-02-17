"use client";

import { cn } from "@/lib/utils";

interface SlideContainerProps {
  variant: "dark" | "light";
  children: React.ReactNode;
  className?: string;
}

export default function SlideContainer({
  variant,
  children,
  className,
}: SlideContainerProps) {
  return (
    <div
      className={cn(
        "h-dvh w-screen overflow-hidden relative flex items-center justify-center",
        variant === "dark"
          ? "bg-wattiva-dark text-wattiva-light"
          : "bg-wattiva-light text-wattiva-dark",
        className
      )}
    >
      <div className="w-full h-full max-w-[177.78dvh] max-h-[56.25vw] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col justify-center relative">
        {children}
      </div>
    </div>
  );
}
