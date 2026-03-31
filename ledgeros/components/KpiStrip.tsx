"use client";

import { motion } from "framer-motion";
import { KPI_ITEMS } from "@/lib/constants";

export function KpiStrip() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-ink"
      aria-label="Kluczowe wskaźniki"
    >
      {KPI_ITEMS.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          className="relative px-page py-8 border-r-2 border-ink last:border-r-0 overflow-hidden"
          style={{ borderRightColor: i % 2 === 1 && i !== 3 ? "#0C0C0A" : undefined }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Accent bar */}
          <span
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: kpi.accent }}
            aria-hidden="true"
          />
          <p className="font-mono text-[8.5px] tracking-[.13em] uppercase text-ledger-muted mb-2.5">
            {kpi.label}
          </p>
          <p className="font-mono font-bold text-fluid-2xl mb-2.5">{kpi.value}</p>
          <span
            className="font-mono text-[9px] px-1.5 py-0.5 border inline-flex items-center gap-1"
            style={{
              color: kpi.badgeColor,
              borderColor: kpi.accent,
              background: kpi.badgeBg,
            }}
          >
            {kpi.badge}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
