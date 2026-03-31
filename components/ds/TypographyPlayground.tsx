"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONTS = [
  { id: "display", label: "Display — Syne", class: "font-display font-extrabold", cssVar: "var(--font-syne)" },
  { id: "mono", label: "Mono — Space Mono", class: "font-mono", cssVar: "var(--font-space-mono)" },
  { id: "body", label: "Body — DM Sans", class: "font-body", cssVar: "var(--font-dm-sans)" },
];

const SIZES = [
  { label: "Hero", size: "clamp(40px,5.6vw,88px)", tracking: "-0.05em", lh: "0.9" },
  { label: "H1", size: "clamp(30px,4.2vw,58px)", tracking: "-0.045em", lh: "0.92" },
  { label: "H2", size: "clamp(24px,2.8vw,36px)", tracking: "-0.04em", lh: "1.0" },
  { label: "H3", size: "17px", tracking: "-0.03em", lh: "1.2" },
  { label: "Body", size: "clamp(13px,1.1vw,16px)", tracking: "0", lh: "1.75" },
  { label: "Mono/Data", size: "clamp(22px,2.8vw,36px)", tracking: "-0.02em", lh: "1.0" },
  { label: "Label", size: "9px", tracking: "0.18em", lh: "1.5" },
];

const SCALE_ROWS = [
  { name: "Display / Hero", tag: "h1", size: "clamp(40px,5.6vw,88px)", tracking: "-0.05em", weight: "800", font: "display", sample: "Know your burn." },
  { name: "H1 Section", tag: "h1", size: "clamp(30px,4.2vw,58px)", tracking: "-0.045em", weight: "800", font: "display", sample: "Cashflow Intelligence" },
  { name: "H2 Subsection", tag: "h2", size: "clamp(24px,2.8vw,36px)", tracking: "-0.04em", weight: "800", font: "display", sample: "Runway Extended" },
  { name: "H3 Card", tag: "h3", size: "17px", tracking: "-0.03em", weight: "800", font: "display", sample: "Scenario Engine" },
  { name: "Body Base", tag: "p", size: "clamp(13px,1.1vw,16px)", tracking: "0", weight: "400", font: "body", sample: "Real-time cashflow intelligence for startups." },
  { name: "Body Small", tag: "p", size: "13px", tracking: "0", weight: "500", font: "body", sample: "Monthly burn rate, from actual transactions." },
  { name: "Mono Data", tag: "span", size: "clamp(22px,2.8vw,36px)", tracking: "-0.02em", weight: "700", font: "mono", sample: "$47,320 / mo" },
  { name: "Mono Label", tag: "span", size: "9px", tracking: "0.18em", weight: "400", font: "mono", sample: "BURN RATE · LIVE" },
];

const FONT_CLASSES: Record<string, string> = {
  display: "font-display",
  body: "font-body",
  mono: "font-mono",
};

export function TypographyPlayground() {
  const [activeFont, setActiveFont] = useState("display");
  const [testText, setTestText] = useState("Know your burn.");
  const [testSize, setTestSize] = useState(72);

  return (
    <div className="space-y-10">
      {/* ── Interactive tester ─────────────────────────────────────── */}
      <div className="border-2 border-ink">
        <div className="border-b-2 border-ink px-5 py-3 bg-ink flex flex-wrap items-center gap-3">
          <span className="font-mono text-[9px] tracking-[.15em] uppercase text-bg/50">
            Type Tester
          </span>
          <div className="flex gap-1 ml-auto flex-wrap">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFont(f.id)}
                className="font-mono text-[9px] tracking-[.06em] px-3 py-1.5 border transition-colors"
                style={{
                  background: activeFont === f.id ? "#C8FF00" : "transparent",
                  color: activeFont === f.id ? "#0C0C0A" : "rgba(237,232,219,0.5)",
                  borderColor: activeFont === f.id ? "#C8FF00" : "rgba(237,232,219,0.2)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size slider */}
        <div className="border-b border-ledger-subtle px-5 py-3 flex items-center gap-4 bg-ledger-card">
          <span className="font-mono text-[9px] text-ledger-muted">SIZE</span>
          <input
            type="range" min={12} max={120} value={testSize} step={2}
            onChange={(e) => setTestSize(Number(e.target.value))}
            className="flex-1 accent-blue h-[3px]"
          />
          <span className="font-mono text-[11px] font-bold min-w-[42px] text-right">{testSize}px</span>
        </div>

        {/* Live preview */}
        <div className="px-6 py-10 min-h-[140px] flex items-center overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFont}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setTestText(e.currentTarget.textContent || "")}
              className={`outline-none w-full leading-none cursor-text ${FONT_CLASSES[activeFont]}`}
              style={{
                fontSize: testSize,
                fontWeight: activeFont === "body" ? 400 : activeFont === "mono" ? 700 : 800,
                letterSpacing: activeFont === "display" ? "-0.045em" : activeFont === "mono" ? "-0.02em" : 0,
                lineHeight: activeFont === "body" ? 1.5 : 0.92,
              }}
            >
              {testText}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="px-5 py-2 border-t border-ledger-subtle font-mono text-[9px] text-ledger-muted">
          Kliknij tekst żeby edytować ↑
        </p>
      </div>

      {/* ── Type scale table ───────────────────────────────────────── */}
      <div className="border-2 border-ink divide-y-2 divide-ink">
        {SCALE_ROWS.map((row, i) => (
          <motion.div
            key={row.name}
            className="grid md:grid-cols-[180px_1fr_160px] items-stretch"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Meta */}
            <div className="p-4 border-r-2 border-ink bg-ledger-card flex flex-col justify-center">
              <p className="font-mono text-[10px] font-bold">{row.name}</p>
              <p className="font-mono text-[9px] text-ledger-muted mt-0.5">{row.size}</p>
              <p className="font-mono text-[9px] text-ledger-muted">w{row.weight} · track {row.tracking}</p>
            </div>
            {/* Preview */}
            <div className="px-6 py-5 flex items-center overflow-hidden border-r-2 border-ink bg-white">
              <span
                className={`${FONT_CLASSES[row.font]} block truncate`}
                style={{
                  fontSize: row.size,
                  fontWeight: row.weight,
                  letterSpacing: row.tracking,
                  lineHeight: 1.05,
                }}
              >
                {row.sample}
              </span>
            </div>
            {/* Class */}
            <div className="p-4 flex items-center bg-ledger-card hidden md:flex">
              <code className="font-mono text-[9px] text-blue bg-blue-light px-2 py-1 border border-blue/20 w-full block leading-relaxed break-all">
                {FONT_CLASSES[row.font]}
              </code>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
