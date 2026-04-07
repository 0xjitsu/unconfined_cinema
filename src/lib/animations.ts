import type { Variants, Transition } from "framer-motion";

/* ═══════ Shared Constants ═══════ */

/** SVG noise texture for film grain overlays — used across multiple components */
export const noiseOverlay =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const cinematicTransition: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

/* ═══════ Basic Reveals ═══════ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: cinematicTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: cinematicTransition },
};

/* ═══════ Directional Slides ═══════ */

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: cinematicTransition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: cinematicTransition },
};

/* ═══════ Clip-Path Reveals ═══════ */

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const clipRevealLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const clipRevealDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════ Stagger Containers ═══════ */

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export const heroTitle: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

export const charContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.1 } },
};

/* ═══════ Text Animation ═══════ */

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const heroWord: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Character reveal — translates up within overflow:hidden parent */
export const charReveal: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Reveal variant map for SectionReveal */
export const revealVariants = {
  fadeUp,
  clipUp: clipRevealUp,
  clipLeft: clipRevealLeft,
  clipDown: clipRevealDown,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
  scale: scaleIn,
  fade: fadeIn,
} as const;

export type RevealVariant = keyof typeof revealVariants;
