import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: "sm" | "md" | "lg";
}

export default function Card({
  children,
  className = "",
  hover = false,
  glass = true,
  padding = "md",
}: CardProps) {
  const paddingClasses = {
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };

  const baseClasses = `rounded-xl border border-outline-variant/10 ${paddingClasses[padding]}`;
  const glassClasses = glass
    ? "glass-panel"
    : "bg-surface-container";
  const hoverClasses = hover ? "card-hover cursor-pointer" : "";

  return (
    <div className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
