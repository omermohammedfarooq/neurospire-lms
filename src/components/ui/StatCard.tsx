interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  className?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  change,
  changeType = "neutral",
  className = "",
}: StatCardProps) {
  const changeColors = {
    positive: "text-success",
    negative: "text-error",
    neutral: "text-on-surface-variant",
  };

  const changeIcons = {
    positive: "trending_up",
    negative: "trending_down",
    neutral: "trending_flat",
  };

  return (
    <div
      className={`glass-panel rounded-xl p-5 flex flex-col gap-3 border border-outline-variant/10 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-label-caps text-on-surface-variant">{label}</span>
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[18px]">
              {icon}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-on-surface">{value}</span>
        {change && (
          <span
            className={`text-label-sm flex items-center gap-0.5 mb-0.5 ${changeColors[changeType]}`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {changeIcons[changeType]}
            </span>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
