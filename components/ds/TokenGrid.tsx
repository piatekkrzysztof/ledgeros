"use client";

import { useEffect, useRef, useState } from "react";

const TOKENS = [
  { name: "--color-bg", label: "Surface", hex: "#EDE8DB", usage: "Page background, default surface", group: "base" },
  { name: "--color-ink", label: "Ink", hex: "#0C0C0A", usage: "Primary text, borders, fills", group: "base" },
  { name: "--color-blue", label: "Electric Blue", hex: "#0047FF", usage: "Primary CTA, links, info states", group: "accent" },
  { name: "--color-lime", label: "Acid Lime", hex: "#C8FF00", usage: "Secondary CTA, success, highlights", group: "accent" },
  { name: "--color-danger", label: "Danger", hex: "#FF3B30", usage: "Burn alerts, error states", group: "semantic" },
  { name: "--color-success", label: "Success", hex: "#28A745", usage: "Positive delta, revenue up", group: "semantic" },
  { name: "--color-muted", label: "Muted", hex: "#6E6B62", usage: "Secondary text, labels", group: "neutral" },
  { name: "--color-border", label: "Border", hex: "#C0BAB0", usage: "Subdued borders, dividers", group: "neutral" },
  { name: "--color-surface", label: "Surface Alt", hex: "#E8E2D3", usage: "Chart panels, right columns", group: "neutral" },
  { name: "--color-card", label: "Card BG", hex: "#F2EDE0", usage: "Card backgrounds, callouts", group: "neutral" },
  { name: "--color-blue-light", label: "Blue Tint", hex: "#EBF0FF", usage: "Badge backgrounds, hover fills", group: "tints" },
  { name: "--color-lime-light", label: "Lime Tint", hex: "#F5FFB0", usage: "Positive badge backgrounds", group: "tints" },
] as const;

const GROUP_LABELS: Record<string, string> = {
  base: "Base",
  accent: "Accents",
  semantic: "Semantic",
  neutral: "Neutrals",
  tints: "Tints",
};

export function TokenGrid() {
  const [copied, setCopied] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1600);
  };

  const groups = Array.from(new Set(TOKENS.map((t) => t.group)));

  return (
    <div ref={gridRef} className="space-y-8">
      {groups.map((group) => (
        <div key={group}>
          <p className="font-mono text-[9px] tracking-[.18em] uppercase text-ledger-muted mb-3">
            {GROUP_LABELS[group]}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-2 border-ink">
            {TOKENS.filter((t) => t.group === group).map((token, i) => {
              const delay = i * 60;
              const isDark = ["#0C0C0A", "#0047FF", "#FF3B30", "#28A745", "#6E6B62"].includes(token.hex);
              return (
                <button
                  key={token.name}
                  onClick={() => copy(token.hex)}
                  className="group text-left border-r-2 border-b-2 border-ink focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2"
                  title={`Copy ${token.hex}`}
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
                  }}
                >
                  {/* Swatch */}
                  <div
                    className="relative w-full border-b-2 border-ink"
                    style={{ background: token.hex, paddingBottom: "60%" }}
                  >
                    <span
                      className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ color: isDark ? "#EDE8DB" : "#0C0C0A" }}
                    >
                      {copied === token.hex ? "✓ copied" : "copy"}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="p-3 bg-white group-hover:bg-ledger-card transition-colors">
                    <p className="font-mono text-[9px] text-ledger-muted mb-0.5 truncate">{token.name}</p>
                    <p className="font-mono text-[12px] font-bold">{token.hex}</p>
                    <p className="font-mono text-[9px] text-ledger-muted mt-1 leading-tight">{token.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
