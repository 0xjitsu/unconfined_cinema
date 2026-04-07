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

      {/* Decorative side text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[10px] uppercase tracking-[0.5em] text-cinema-muted/20 hidden md:block"
        aria-hidden="true"
      >
        Est. 2020 — Manila, Philippines
      </motion.span>

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 h-px w-32 origin-center bg-cinema-gold/50 md:w-48"
          aria-hidden="true"
        />

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
              className={`block text-cinema-warm ${i === 1 ? "italic tracking-[0.05em]" : ""}`}
              style={{
                fontSize: i === 1 ? "clamp(3rem, 13vw, 11rem)" : "clamp(2.5rem, 10vw, 8rem)",
                transform: `translateY(${i * -4}px)`,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 h-px w-24 origin-center bg-cinema-gold/30 md:w-32"
          aria-hidden="true"
        />

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

      {/* Scroll indicator — positioned left for asymmetry */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0"
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

      {/* Year marker — bottom right */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-8 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-cinema-muted/30 hidden md:block"
        aria-hidden="true"
      >
        Since MMXX
      </motion.span>
    </section>
  );
}
