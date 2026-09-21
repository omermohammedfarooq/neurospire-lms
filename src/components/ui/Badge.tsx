import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  icon?: string;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  icon,
  className = "",
}: BadgeProps) {
  const variantClasses = {
    default:
      "bg-surface-container-high text-on-surface-variant border border-outline-variant/20",
    primary:
      "bg-primary/10 text-primary border border-primary/20",
    success:
      "bg-success/10 text-success border border-success/20",
    warning:
      "bg-warning/10 text-warning border border-warning/20",
    error:
      "bg-error/10 text-error border border-error/20",
    outline:
      "bg-transparent text-on-surface-variant border border-outline-variant/30",
  };

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[14px]">{icon}</span>
      )}
      {children}
    </span>
  );
}
