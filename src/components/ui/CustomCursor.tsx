"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.1 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.1 });

  const [variant, setVariant] = useState<"default" | "pointer" | "text">("default");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasPointer) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input[type='text'], input[type='email'], textarea")) {
        setVariant("text");
      } else if (t.closest("a, button, [role='button'], select, label[for], .cursor-pointer")) {
        setVariant("pointer");
      } else {
        setVariant("default");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [cursorX, cursorY, visible]);

  if (!enabled) return null;

  const isText = variant === "text";
  const isPointer = variant === "pointer";

  return (
    <>
      {/* Dot — precise position */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10001] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--cursor-color)",
          width: isText ? 2 : 6,
          height: isText ? 20 : 6,
          borderRadius: isText ? 1 : 999,
          opacity: visible ? (isPointer ? 0 : 1) : 0,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
      {/* Ring — spring-lagged */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid var(--cursor-ring)",
        }}
        animate={{
          width: isPointer ? 52 : isText ? 0 : 36,
          height: isPointer ? 52 : isText ? 0 : 36,
          opacity: visible && !isText ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.1 }}
      />
    </>
  );
}
