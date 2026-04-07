"use client";

import { motion } from "framer-motion";
import { revealVariants, type RevealVariant } from "@/lib/animations";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
}: SectionRevealProps) {
  const variants = revealVariants[variant];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
