"use client";

import { cn } from "@/lib/utils";

interface SlideContainerProps {
  variant: "dark" | "light";
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export default function SlideContainer({
  variant,
  children,
  className,
  innerClassName,
}: SlideContainerProps) {
  return (
    <div
      className={cn(
        "h-dvh w-screen overflow-hidden max-md:overflow-y-auto relative flex items-center justify-center max-md:items-start",
        variant === "dark"
          ? "bg-wattiva-dark text-wattiva-light"
          : "bg-wattiva-light text-wattiva-dark",
        className
      )}
    >
      <div
        className={cn(
          "w-full h-full max-w-[177.78dvh] max-h-[56.25vw] max-md:max-w-none max-md:max-h-none max-md:h-auto mx-auto px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col justify-center max-md:justify-start relative max-md:pt-20 max-md:pb-44",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
