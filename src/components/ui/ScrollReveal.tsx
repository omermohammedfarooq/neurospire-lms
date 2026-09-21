"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms delay
  duration?: number; // ms duration
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 800,
  animation = "fade-up"
}: ScrollRevealProps) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px" // Trigger slightly before the viewport boundary
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getAnimationClass = () => {
    if (hasRevealed) {
      return "opacity-100 translate-x-0 translate-y-0 scale-100";
    }
    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-10";
      case "fade-down":
        return "opacity-0 -translate-y-10";
      case "fade-left":
        return "opacity-0 translate-x-10";
      case "fade-right":
        return "opacity-0 -translate-x-10";
      case "zoom-in":
        return "opacity-0 scale-95";
      default:
        return "opacity-0 translate-y-10";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity"
      }}
    >
      {children}
    </div>
  );
}
