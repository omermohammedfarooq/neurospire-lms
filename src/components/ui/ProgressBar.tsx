interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  variant?: "primary" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

export default function ProgressBar({
  value,
  label,
  showValue = true,
  variant = "primary",
  size = "sm",
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const variantColors = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-label-sm text-on-surface-variant">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-label-sm text-on-surface-variant">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${sizeClasses[size]} bg-surface-container-high rounded-full overflow-hidden`}
      >
        <div
          className={`${sizeClasses[size]} ${variantColors[variant]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
