"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

interface SafeImageProps {
  basePath: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  style?: React.CSSProperties;
}

export default function SafeImage({
  basePath,
  alt,
  className = "",
  fallback,
  fill,
  width,
  height,
  priority,
  style,
}: SafeImageProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = useCallback(() => {
    const next = extIndex + 1;
    if (next >= EXTENSIONS.length) {
      setAllFailed(true);
    } else {
      setExtIndex(next);
    }
  }, [extIndex]);

  if (allFailed) {
    return fallback ? <>{fallback}</> : null;
  }

  const src = `${basePath}${EXTENSIONS[extIndex]}`;

  const commonProps = {
    src,
    alt,
    className,
    onError: handleError,
    style,
  };

  if (fill) {
    return (
      <Image
        {...commonProps}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
    );
  }

  return (
    <Image
      {...commonProps}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
    />
  );
}

