"use client";

import { motion } from "framer-motion";
import { charReveal, charContainer, fadeIn } from "@/lib/animations";

interface WordConfig {
  text: string;
  delayChildren: number;
  fontSize: string;
  italic?: boolean;
}

const words: WordConfig[] = [
  { text: "The", delayChildren: 0.3, fontSize: "clamp(2.5rem, 10vw, 8rem)" },
  { text: "Unconfined", delayChildren: 0.5, fontSize: "clamp(3rem, 13vw, 11rem)", italic: true },
  { text: "Cinema", delayChildren: 0.7, fontSize: "clamp(2.5rem, 10vw, 8rem)" },
];

export function Hero() {
  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden bg-cinema-black">
      <div
        className="absolute inset-0 animate-gradient opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, var(--hero-grad-1) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, var(--hero-grad-2) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, var(--hero-grad-3) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(ellipse at center, transparent 40%, var(--hero-vignette) 100%)`,
        }}
        aria-hidden="true"
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[10px] uppercase tracking-[0.5em] text-cinema-muted/20 hidden md:block"
        aria-hidden="true"
      >
        Est. 2020 — Manila, Philippines
      </motion.span>

      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 h-px w-32 origin-center bg-cinema-gold/50 md:w-48"
          aria-hidden="true"
        />

        <h1 className="font-display font-light uppercase leading-[0.85] tracking-[-0.02em]">
          {words.map((word, wordIndex) => (
            <motion.div
              key={word.text}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.025,
                    delayChildren: word.delayChildren,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="flex justify-center overflow-hidden"
              style={{
                transform: `translateY(${wordIndex * -4}px)`,
              }}
            >
              {word.text.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={charReveal}
                  className={`inline-block text-cinema-warm ${word.italic ? "italic tracking-[0.05em]" : ""}`}
                  style={{ fontSize: word.fontSize }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </h1>

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
