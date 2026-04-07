"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════════
   FILM HOVER TEXT — DOM-based text with word-level
   VHS scramble on hover. Lighter alternative to
   FilmCanvas for shorter text blocks.
   ═══════════════════════════════════════════════ */

const FILM_GLYPHS = "▶■●▬║░▒▓█▄▀▐▌╬╠╣╦╩═─│┤├┬┴┼◆◇○◎";

function scrambleWord(word: string, progress: number): string {
  return word
    .split("")
    .map((char, i) => {
      const charProgress = progress * word.length - i;
      if (charProgress > 1) return char;
      if (charProgress > 0) {
        return Math.random() > 0.5 ? char : FILM_GLYPHS[Math.floor(Math.random() * FILM_GLYPHS.length)];
      }
      return FILM_GLYPHS[Math.floor(Math.random() * FILM_GLYPHS.length)];
    })
    .join("");
}

interface FilmWordProps {
  word: string;
}

function FilmWord({ word }: FilmWordProps) {
  const [display, setDisplay] = useState(word);
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  const animate = useCallback(() => {
    const elapsed = performance.now() - startTimeRef.current;
    const duration = 600; // ms for full scramble cycle
    const progress = Math.min(elapsed / duration, 1);

    if (progress < 0.5) {
      // Scrambling phase — characters randomize
      setDisplay(scrambleWord(word, 1 - progress * 2));
    } else {
      // Resolve phase — characters settle back
      setDisplay(scrambleWord(word, (progress - 0.5) * 2));
    }

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      setDisplay(word);
    }
  }, [word]);

  const handleEnter = useCallback(() => {
    setIsHovered(true);
    startTimeRef.current = performance.now();
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <span
      className={`relative inline-block transition-colors duration-300 ${
        isHovered
          ? "text-cinema-gold [text-shadow:_-1px_0_#ff444466,_1px_0_#4444ff66]"
          : "text-cinema-warm/80"
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ cursor: "default" }}
    >
      {display}
    </span>
  );
}

interface FilmHoverTextProps {
  text: string;
  className?: string;
}

export function FilmHoverText({ text, className = "" }: FilmHoverTextProps) {
  const words = text.split(/(\s+)/);

  return (
    <p className={className}>
      {words.map((segment, i) =>
        /^\s+$/.test(segment) ? (
          <span key={i}>{segment}</span>
        ) : (
          <FilmWord key={i} word={segment} />
        )
      )}
    </p>
  );
}
