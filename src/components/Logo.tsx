"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

const LOGO_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  textClassName?: string;
  subTextClassName?: string;
  scrolled?: boolean;
}

export default function Logo({
  className = "",
  iconSize = 40,
  showText = true,
  textClassName = "text-white",
  subTextClassName = "text-blue-200",
  scrolled,
}: LogoProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = useCallback(() => {
    const next = extIndex + 1;
    if (next >= LOGO_EXTENSIONS.length) {
      setAllFailed(true);
    } else {
      setExtIndex(next);
    }
  }, [extIndex]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {allFailed ? (
        <div
          className="rounded-xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white font-display font-bold shrink-0"
          style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.45 }}
        >
          J
        </div>
      ) : (
        <div
          className="relative shrink-0 overflow-hidden rounded-xl"
          style={{ width: iconSize, height: iconSize }}
        >
          <Image
            src={`/logo${LOGO_EXTENSIONS[extIndex]}`}
            alt="Jimon Tech Hub Academy"
            width={iconSize}
            height={iconSize}
            className="object-contain"
            onError={handleError}
          />
        </div>
      )}
      {showText && (
        <div>
          <span
            className={`font-display font-bold leading-tight transition-colors duration-400 ${
              scrolled !== undefined
                ? scrolled
                  ? "text-navy"
                  : "text-white"
                : textClassName
            }`}
            style={{ fontSize: iconSize * 0.45 }}
          >
            Jimon Tech
          </span>
          <span
            className={`block text-[10px] font-medium tracking-widest uppercase transition-colors duration-400 ${subTextClassName}`}
          >
            Academy
          </span>
        </div>
      )}
    </div>
  );
}

