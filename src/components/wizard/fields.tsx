"use client";

import type { ReactNode } from "react";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-ink-soft">{hint}</span> : null}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none ring-sage/30 focus:ring-2";

export function StepShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink md:text-3xl">{title}</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
        {description}
      </p>
      <div className="mt-8 space-y-5">{children}</div>
    </div>
  );
}

export function CheckboxRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-white px-3 py-3">
      <input
        type="checkbox"
        className="mt-1"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}
