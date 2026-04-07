"use client";

import { motion } from "framer-motion";
import { heroTitle, heroWord, fadeIn } from "@/lib/animations";

const words = ["The", "Unconfined", "Cinema"];

export function Hero() {
  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden bg-cinema-black">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #1a1a2e 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #2d1b3d 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, #1a0a0a 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.8) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="font-display font-light uppercase leading-[0.85] tracking-[-0.02em]"
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              variants={heroWord}
              className="block text-cinema-warm"
              style={{
                fontSize: "clamp(3rem, 12vw, 10rem)",
                transform: `translateY(${i * -4}px)`,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
          className="mx-auto mt-8 max-w-md font-body text-base font-light tracking-wide text-cinema-muted md:text-lg"
        >
          Exploring what cinema is — and what else it could be.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cinema-muted/60">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-cinema-muted/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
