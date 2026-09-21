import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  icon,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-label-md text-on-surface-variant"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-body-sm text-on-surface placeholder:text-outline transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(68,143,255,0.15)] ${
            icon ? "pl-10" : ""
          } ${
            error ? "border-error focus:border-error focus:shadow-[0_0_0_2px_rgba(255,180,171,0.15)]" : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[12px] text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="text-[12px] text-on-surface-variant">{helperText}</span>
      )}
    </div>
  );
}
