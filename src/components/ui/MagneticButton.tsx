"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "outline",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseStyles =
    "relative inline-flex min-h-[44px] items-center justify-center px-8 py-3 font-body text-sm uppercase tracking-[0.2em] transition-colors duration-300";

  const variantStyles =
    variant === "primary"
      ? "bg-cinema-gold text-cinema-black hover:bg-cinema-gold-hover"
      : "border border-cinema-gold/40 text-cinema-gold hover:bg-cinema-gold/10";

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
