"use client";

import { useState } from "react";

const TOKENS = [
  { name: "--color-bg", label: "Surface / Background", hex: "#EDE8DB", dark: false },
  { name: "--color-ink", label: "Primary Text / Border", hex: "#0C0C0A", dark: true },
  { name: "--color-blue", label: "Accent — Electric Blue", hex: "#0047FF", dark: true },
  { name: "--color-lime", label: "Accent — Acid Lime", hex: "#C8FF00", dark: false },
  { name: "--color-danger", label: "Danger / Burn Alert", hex: "#FF3B30", dark: true },
  { name: "--color-success", label: "Success / Positive", hex: "#28A745", dark: true },
  { name: "--color-muted", label: "Secondary Text", hex: "#6E6B62", dark: true },
  { name: "--color-border", label: "Border Subdued", hex: "#C0BAB0", dark: false },
  { name: "--color-surface", label: "Surface Raised", hex: "#E8E2D3", dark: false },
  { name: "--color-card", label: "Card Background", hex: "#F2EDE0", dark: false },
  { name: "--color-blue-light", label: "Blue Tint", hex: "#EBF0FF", dark: false },
  { name: "--color-lime-light", label: "Lime Tint", hex: "#F5FFB0", dark: false },
];

export function ColorTokens() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-2 border-ink">
      {TOKENS.map((t) => (
        <button
          key={t.name}
          onClick={() => copy(t.hex)}
          className="group flex flex-col border-r-2 border-b-2 border-ink text-left
                     transition-transform hover:-translate-x-px hover:-translate-y-px focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          title={`Click to copy ${t.hex}`}
        >
          {/* Swatch */}
          <div
            className="w-full aspect-[4/2.5] border-b-2 border-ink"
            style={{ background: t.hex }}
          />
          {/* Info */}
          <div className="p-3 flex-1 bg-white group-hover:bg-bg transition-colors">
            <p className="font-mono text-[9px] tracking-[.08em] text-ledger-muted mb-0.5">
              {t.name}
            </p>
            <p className="font-mono text-[11px] font-bold leading-tight mb-1">{t.hex}</p>
            <p className="text-[11px] text-ledger-muted leading-tight">{t.label}</p>
            <p className="font-mono text-[9px] mt-2 text-blue opacity-0 group-hover:opacity-100 transition-opacity">
              {copied === t.hex ? "copied!" : "click to copy"}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
