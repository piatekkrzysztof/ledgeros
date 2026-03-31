"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPACING_SCALE = [
  { token: "1", px: 4 }, { token: "2", px: 8 }, { token: "3", px: 12 },
  { token: "4", px: 16 }, { token: "5", px: 20 }, { token: "6", px: 24 },
  { token: "8", px: 32 }, { token: "10", px: 40 }, { token: "12", px: 48 },
  { token: "16", px: 64 }, { token: "20", px: 80 }, { token: "24", px: 96 },
];

const BREAKPOINTS = [
  { name: "mobile", label: "Mobile", width: "< 640px", cols: 1, icon: "▬" },
  { name: "sm", label: "SM", width: "640px+", cols: 2, icon: "▬▬" },
  { name: "md", label: "MD", width: "768px+", cols: 2, icon: "▬▬" },
  { name: "lg", label: "LG", width: "1024px+", cols: 3, icon: "▬▬▬" },
  { name: "xl", label: "XL", width: "1280px+", cols: 4, icon: "▬▬▬▬" },
];

export function GridSystem() {
  const [activeCols, setActiveCols] = useState(3);
  const [showSpacing, setShowSpacing] = useState(false);

  return (
    <div className="space-y-10">
      {/* ── Grid visualizer ────────────────────────────────────────── */}
      <div className="border-2 border-ink">
        <div className="border-b-2 border-ink px-5 py-3 bg-ink flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[9px] tracking-[.15em] uppercase text-bg/50">
            Grid Visualizer
          </span>
          <div className="flex gap-1 ml-auto">
            {[1, 2, 3, 4, 6].map((n) => (
              <button
                key={n}
                onClick={() => setActiveCols(n)}
                className="font-mono text-[9px] w-8 h-7 border transition-colors"
                style={{
                  background: activeCols === n ? "#C8FF00" : "transparent",
                  color: activeCols === n ? "#0C0C0A" : "rgba(237,232,219,0.5)",
                  borderColor: activeCols === n ? "#C8FF00" : "rgba(237,232,219,0.2)",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 bg-ledger-surface">
          <motion.div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${activeCols}, 1fr)` }}
            layout
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {Array.from({ length: activeCols * 2 }).map((_, i) => (
              <motion.div
                key={`${activeCols}-${i}`}
                className="border-2 border-ink bg-blue/10 flex items-center justify-center"
                style={{ height: 64 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <span className="font-mono text-[9px] text-blue opacity-60">
                  col {(i % activeCols) + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <p className="font-mono text-[9px] text-ledger-muted mt-3">
            grid-template-columns: repeat({activeCols}, 1fr) · gap: 12px
          </p>
        </div>
      </div>

      {/* ── Breakpoints ────────────────────────────────────────────── */}
      <div className="border-2 border-ink">
        <div className="border-b-2 border-ink px-5 py-3 bg-ledger-card">
          <span className="font-mono text-[9px] tracking-[.15em] uppercase text-ledger-muted">
            Breakpoints — Mobile First
          </span>
        </div>
        <div className="divide-y divide-ledger-subtle">
          {BREAKPOINTS.map((bp, i) => (
            <motion.div
              key={bp.name}
              className="grid grid-cols-[80px_1fr_80px] items-center px-5 py-4 gap-4 hover:bg-ledger-surface transition-colors"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
            >
              <div>
                <p className="font-mono text-[10px] font-bold">{bp.label}</p>
                <p className="font-mono text-[9px] text-ledger-muted">{bp.width}</p>
              </div>
              {/* Width bar */}
              <div className="relative h-8 border-2 border-ink bg-white overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue/15 border-r-2 border-blue/30 flex items-center pl-2"
                  style={{ width: `${(i + 1) * 18}%`, minWidth: 40 }}
                >
                  <span className="font-mono text-[9px] text-blue/70">{bp.icon}</span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-right text-ledger-muted">
                {bp.cols} col{bp.cols > 1 ? "s" : ""}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Spacing scale ──────────────────────────────────────────── */}
      <div className="border-2 border-ink">
        <button
          onClick={() => setShowSpacing((s) => !s)}
          className="w-full border-b-2 border-ink px-5 py-3 bg-ledger-card flex items-center justify-between hover:bg-ledger-surface transition-colors"
        >
          <span className="font-mono text-[9px] tracking-[.15em] uppercase text-ledger-muted">
            Spacing Scale — Tailwind tokens
          </span>
          <span className="font-mono text-[14px] opacity-40" style={{ transform: showSpacing ? "rotate(45deg)" : "none", display: "inline-block", transition: "transform .2s" }}>+</span>
        </button>

        <AnimatePresence>
          {showSpacing && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 py-5 space-y-2.5">
                {SPACING_SCALE.map((s, i) => (
                  <motion.div
                    key={s.token}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <span className="font-mono text-[10px] text-ledger-muted w-6 text-right flex-shrink-0">{s.token}</span>
                    <span className="font-mono text-[10px] text-ledger-muted w-8 flex-shrink-0">{s.px}px</span>
                    <div className="flex items-center gap-1 flex-1">
                      <div
                        className="h-5 bg-blue border border-blue/40 flex-shrink-0"
                        style={{ width: Math.min(s.px * 2.5, 320) }}
                      />
                    </div>
                    <code className="font-mono text-[9px] text-blue bg-blue-light px-1.5 py-0.5 hidden sm:block">
                      p-{s.token} / m-{s.token}
                    </code>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


