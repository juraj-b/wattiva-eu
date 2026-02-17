export const springSnappy = { type: "spring" as const, stiffness: 400, damping: 30 };
export const springGentle = { type: "spring" as const, stiffness: 200, damping: 25 };
export const springBouncy = { type: "spring" as const, stiffness: 300, damping: 20 };

export const appleEase = [0.25, 0.46, 0.45, 0.94] as const;

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const staggerContainer = (staggerDelay = 0.1, delayStart = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: delayStart,
      staggerChildren: staggerDelay,
    },
  },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springGentle,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springGentle,
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springGentle,
  },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springBouncy,
  },
};
