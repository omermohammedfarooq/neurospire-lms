import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export default function BrandLogo({ className = "", size = 32 }: BrandLogoProps) {
  return (
    <img
      src="/images/logo.png"
      alt="Neurospire AI Logo"
      className={`inline-block shrink-0 object-contain max-w-none ${className}`}
      style={{ height: size, width: "auto" }}
    />
  );
}
