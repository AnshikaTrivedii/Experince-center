"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const baseField =
  "peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-accent-cyan/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent-cyan/20";

const labelBase =
  "pointer-events-none absolute left-4 top-3 text-sm text-white/40 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-ink-card peer-focus:px-1.5 peer-focus:text-xs peer-focus:text-accent-cyan peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-ink-card peer-[:not(:placeholder-shown)]:px-1.5 peer-[:not(:placeholder-shown)]:text-xs";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          id={id}
          ref={ref}
          placeholder={label}
          className={cn(
            baseField,
            error && "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        <label htmlFor={id} className={labelBase}>
          {label}
        </label>
        {error && <p className="mt-1 pl-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
InputField.displayName = "InputField";

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, id, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          id={id}
          ref={ref}
          placeholder={label}
          className={cn(baseField, "min-h-[110px] resize-none", className)}
          {...props}
        />
        <label htmlFor={id} className={labelBase}>
          {label}
        </label>
        {error && <p className="mt-1 pl-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
TextareaField.displayName = "TextareaField";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, options, error, className, value, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          id={id}
          ref={ref}
          value={value}
          className={cn(
            "w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-accent-cyan/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent-cyan/20",
            !value && "text-white/40",
            error && "border-red-500/60",
            className
          )}
          {...props}
        >
          <option value="" disabled className="bg-ink-card text-white/40">
            {label}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-ink-card text-white">
              {opt}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        {error && <p className="mt-1 pl-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
SelectField.displayName = "SelectField";
