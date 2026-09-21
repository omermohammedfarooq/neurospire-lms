import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-primary text-on-primary hover:bg-primary-fixed-dim",
    secondary:
      "border border-outline-variant/30 text-on-surface hover:bg-surface-container glass-panel",
    ghost:
      "text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
    danger:
      "bg-error-container text-on-error-container hover:bg-error/20",
  };

  const sizeClasses = {
    sm: "text-label-sm px-3 py-1.5 text-xs",
    md: "text-label-caps px-5 py-2.5 text-sm",
    lg: "text-label-caps px-7 py-3.5 text-sm",
  };

  const iconEl = icon ? (
    <span className="material-symbols-outlined text-[18px]">{icon}</span>
  ) : null;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && iconEl}
      {children}
      {icon && iconPosition === "right" && iconEl}
    </button>
  );
}
