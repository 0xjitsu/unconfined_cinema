"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/* ═══════════════════════════════════════════════
   FILM CANVAS — Canvas-rendered text with
   VHS scramble decode on scroll + RGB split
   hover effect. Uses @chenglou/pretext for
   precise text measurement.
   ═══════════════════════════════════════════════ */

const FILM_GLYPHS = "▶■●▬║░▒▓█▄▀▐▌╬╠╣╦╩═─│┤├┬┴┼◆◇○◎▲△▼▽♦♢⬤⊕⊗⊞";
const TIMECODE_CHARS = "0123456789:;";

interface FilmCanvasProps {
  text: string;
  className?: string;
}

interface WordInfo {
  text: string;
  x: number;
  y: number;
  width: number;
  lineIndex: number;
  charWidths: number[];
}

function getRandomGlyph(): string {
  return FILM_GLYPHS[Math.floor(Math.random() * FILM_GLYPHS.length)];
}

function getTimecode(progress: number, totalChars: number): string {
  const frame = Math.floor(progress * totalChars);
  const sec = Math.floor(frame / 24);
  const fr = frame % 24;
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(min).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(fr).padStart(2, "0")}`;
}

export function FilmCanvas({ text, className = "" }: FilmCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const wordsRef = useRef<WordInfo[]>([]);
  const hoveredWordRef = useRef<number>(-1);
  const scrambleStateRef = useRef<number[]>([]);
  const progressRef = useRef(0);
  const lastRenderRef = useRef(0);
  const grainOffsetRef = useRef(0);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  // Scroll progress for the scramble reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.15"],
  });

  // Track scroll progress in a ref for the render loop
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  // Measure text and compute word positions using Canvas measureText
  const measureWords = useCallback(
    (ctx: CanvasRenderingContext2D, maxWidth: number, fontSize: number, lineHeight: number): WordInfo[] => {
      const words = text.split(/\s+/);
      const result: WordInfo[] = [];
      let x = 0;
      let y = 0;
      let lineIndex = 0;
      const spaceWidth = ctx.measureText(" ").width;

      for (const word of words) {
        const wordWidth = ctx.measureText(word).width;

        // Wrap to next line if needed
        if (x > 0 && x + wordWidth > maxWidth) {
          x = 0;
          y += lineHeight;
          lineIndex++;
        }

        // Measure individual characters
        const charWidths: number[] = [];
        for (const char of word) {
          charWidths.push(ctx.measureText(char).width);
        }

        result.push({ text: word, x, y, width: wordWidth, lineIndex, charWidths });
        x += wordWidth + spaceWidth;
      }

      return result;
    },
    [text]
  );

  // Initialize scramble state
  useEffect(() => {
    const totalChars = text.replace(/\s/g, "").length;
    scrambleStateRef.current = new Array(totalChars).fill(0);
  }, [text]);

  // Setup canvas and start render loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;

      // Measure text to determine height
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const isMobile = w < 768;
      const fontSize = isMobile ? 28 : w < 1024 ? 40 : 52;
      const lineHeight = fontSize * 1.35;
      const font = `300 ${fontSize}px "Cormorant Garamond", serif`;

      ctx.font = font;
      const words = measureWords(ctx, w - 2, fontSize, lineHeight);
      wordsRef.current = words;

      // Calculate total height
      const lastWord = words[words.length - 1];
      const textHeight = lastWord ? lastWord.y + lineHeight : lineHeight;
      const totalHeight = textHeight + lineHeight * 1.5; // padding for timecode

      canvas.width = w * dpr;
      canvas.height = totalHeight * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${totalHeight}px`;
      ctx.scale(dpr, dpr);
      setCanvasSize({ w, h: totalHeight });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [text, measureWords]);

  // Mouse tracking for hover effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Find hovered word
      const words = wordsRef.current;
      let found = -1;
      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        const isMobile = rect.width < 768;
        const fontSize = isMobile ? 28 : rect.width < 1024 ? 40 : 52;
        const lineHeight = fontSize * 1.35;
        if (mx >= w.x - 4 && mx <= w.x + w.width + 4 && my >= w.y && my <= w.y + lineHeight) {
          found = i;
          break;
        }
      }
      hoveredWordRef.current = found;
    };

    const handleLeave = () => {
      hoveredWordRef.current = -1;
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = (time: number) => {
      if (!running) return;
      const dt = time - lastRenderRef.current;
      lastRenderRef.current = time;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      if (w === 0 || h === 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const isMobile = w < 768;
      const fontSize = isMobile ? 28 : w < 1024 ? 40 : 52;
      const lineHeight = fontSize * 1.35;
      const font = `300 ${fontSize}px "Cormorant Garamond", serif`;
      const monoFont = `400 ${Math.max(10, fontSize * 0.22)}px "JetBrains Mono", monospace`;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      // Remeasure words with current font
      ctx.font = font;
      const words = wordsRef.current;
      const progress = progressRef.current;
      const hoveredWord = hoveredWordRef.current;

      // Update scramble state — characters resolve based on scroll progress
      let charIndex = 0;
      const totalChars = text.replace(/\s/g, "").length;
      const resolvedUpTo = Math.floor(progress * totalChars * 1.15); // slight overshoot

      for (let wi = 0; wi < words.length; wi++) {
        const word = words[wi];
        for (let ci = 0; ci < word.text.length; ci++) {
          if (charIndex < resolvedUpTo) {
            // Resolved — quickly ramp to 1
            scrambleStateRef.current[charIndex] = Math.min(
              1,
              (scrambleStateRef.current[charIndex] || 0) + dt * 0.008
            );
          } else {
            // Not yet resolved — stay scrambled
            scrambleStateRef.current[charIndex] = 0;
          }
          charIndex++;
        }
      }

      // Grain offset for film texture
      grainOffsetRef.current = (grainOffsetRef.current + 1) % 256;

      // Draw each word
      charIndex = 0;
      for (let wi = 0; wi < words.length; wi++) {
        const word = words[wi];
        const isHovered = wi === hoveredWord;
        let cx = word.x;

        for (let ci = 0; ci < word.text.length; ci++) {
          const resolved = scrambleStateRef.current[charIndex] || 0;
          const char = resolved > 0.8 ? word.text[ci] : getRandomGlyph();
          const charWidth = word.charWidths[ci];

          if (isHovered && resolved > 0.5) {
            // VHS RGB split effect on hover
            const splitAmount = 2 + Math.sin(time * 0.003 + ci) * 1.5;
            const yJitter = Math.sin(time * 0.01 + ci * 0.5) * 1;

            // Red channel
            ctx.font = font;
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#ff4444";
            ctx.globalCompositeOperation = "lighter";
            ctx.fillText(char, cx - splitAmount, word.y + fontSize + yJitter);

            // Green channel
            ctx.fillStyle = "#44ff44";
            ctx.fillText(char, cx, word.y + fontSize + yJitter * 0.5);

            // Blue channel
            ctx.fillStyle = "#4444ff";
            ctx.fillText(char, cx + splitAmount, word.y + fontSize - yJitter);

            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 1;
          } else {
            // Normal rendering with opacity based on resolve state
            ctx.font = font;
            const alpha = progress < 0.01 ? 0.12 : Math.max(0.12, resolved);
            ctx.globalAlpha = alpha;

            if (resolved < 0.8) {
              // Scrambled — use gold tint
              ctx.fillStyle = "#C8A97E";
            } else {
              // Resolved — warm white
              ctx.fillStyle = "#F5F0EB";
            }

            ctx.fillText(char, cx, word.y + fontSize);
            ctx.globalAlpha = 1;
          }

          cx += charWidth;
          charIndex++;
        }
      }

      // Film timecode — bottom right
      ctx.font = monoFont;
      ctx.fillStyle = "#C8A97E";
      ctx.globalAlpha = 0.4;
      const timecode = getTimecode(progress, totalChars);
      const tcWidth = ctx.measureText(timecode).width;
      ctx.fillText(timecode, w - tcWidth - 8, h - 8);

      // Frame counter hash marks — top right
      const frameNum = Math.floor(progress * 24);
      ctx.fillStyle = "#C8A97E";
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 4; i++) {
        const markX = w - 40 + i * 8;
        ctx.fillRect(markX, 4, 2, (frameNum + i) % 3 === 0 ? 12 : 8);
      }

      // Scanline effect — subtle horizontal lines
      ctx.globalAlpha = 0.03;
      ctx.fillStyle = "#F5F0EB";
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }

      // Noise grain — random dots
      ctx.globalAlpha = 0.04;
      const grainDensity = Math.floor(w * h * 0.001);
      for (let i = 0; i < grainDensity; i++) {
        const gx = Math.random() * w;
        const gy = Math.random() * h;
        ctx.fillStyle = Math.random() > 0.5 ? "#F5F0EB" : "#C8A97E";
        ctx.fillRect(gx, gy, 1, 1);
      }

      // Projector flicker — very subtle brightness pulse
      const flicker = 0.02 * Math.sin(time * 0.002) * Math.sin(time * 0.007);
      if (Math.abs(flicker) > 0.01) {
        ctx.globalAlpha = Math.abs(flicker);
        ctx.fillStyle = flicker > 0 ? "#F5F0EB" : "#0A0A0A";
        ctx.fillRect(0, 0, w, h);
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [text, canvasSize]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ cursor: hoveredWordRef.current >= 0 ? "pointer" : "default" }}
      />
      {/* Accessible hidden text for screen readers */}
      <p className="sr-only">{text}</p>
    </div>
  );
}
