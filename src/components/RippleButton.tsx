"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "link";
  target?: string;
  rel?: string;
}

export default function RippleButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  type = "link",
  target,
  rel,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const idRef = useRef(0);

  const createRipple = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = idRef.current++;
      setRipples((prev) => [...prev, { id, x, y, size }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    },
    []
  );

  const baseClass =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 overflow-hidden"
      : "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/90 font-semibold text-base hover:bg-white/10 overflow-hidden";

  const content = (
    <motion.span
      className="relative inline-flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/20 animate-scale-in pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
          }}
        />
      ))}
      {children}
    </motion.span>
  );

  if (type === "link" && href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={`${baseClass} ${className}`}
        onClick={createRipple}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type === "submit" ? "submit" : "button"}
      className={`${baseClass} ${className}`}
      onClick={(e) => {
        onClick?.();
        createRipple(e);
      }}
    >
      {content}
    </button>
  );
}

