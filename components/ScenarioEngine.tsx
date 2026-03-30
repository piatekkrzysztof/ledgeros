"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCENARIOS } from "@/lib/constants";

type Scenario = (typeof SCENARIOS)[number];

export function ScenarioEngine() {
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);

  return (
    <section id="scenariusze" className="section-pad border-t-2 border-ink">
      <span className="tag">Scenario Engine</span>

      <div className="grid md:grid-cols-2 border-2 border-ink">
        {/* ── LEFT ──────────────────────────────────────────────────── */}
        <div className="p-page border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink">
          <motion.h2
            className="display-h text-fluid-3xl mb-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Co jeśli<br />zmienisz kurs?
          </motion.h2>
          <p className="text-[14px] text-ledger-muted leading-[1.75] mb-6 max-w-sm">
            Przetestuj każdą decyzję zanim ją podejmiesz. Scenario Engine wylicza wpływ
            na runway w czasie rzeczywistym.
          </p>
          <button className="btn btn-ink mb-6">
            Uruchom własny scenariusz →
          </button>

          {/* Runway bar */}
          <div className="border-2 border-ink bg-white overflow-hidden h-11 relative">
            <motion.div
              className="h-full bg-blue opacity-15"
              animate={{ width: `${selected.runway}%` }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
            <div className="absolute inset-0 flex items-center px-4 font-mono text-[11px] font-bold pointer-events-none">
              <span>
                Runway:{" "}
                <AnimatePresence mode="wait">
                  <motion.strong
                    key={selected.months}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selected.months}
                  </motion.strong>
                </AnimatePresence>
              </span>
              <span className="ml-auto text-[16px]">{selected.runway}%</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Scenario cards ─────────────────────────────────── */}
        <div className="flex flex-col gap-3 p-page">
          {SCENARIOS.map((sc) => {
            const isActive = sc.id === selected.id;
            return (
              <motion.button
                key={sc.id}
                className="border-2 border-ink p-4 flex items-center justify-between text-left bg-white transition-colors"
                animate={
                  isActive
                    ? { x: -2, y: -2, boxShadow: "4px 4px 0 #0C0C0A", background: "#EFF3FF" }
                    : { x: 0, y: 0, boxShadow: "0 0 0 #0C0C0A", background: "#ffffff" }
                }
                whileHover={{ x: -1, y: -1, boxShadow: "3px 3px 0 #0C0C0A" }}
                transition={{ duration: 0.15 }}
                onClick={() => setSelected(sc)}
                aria-pressed={isActive}
              >
                <div>
                  <p className="font-mono text-[11px] font-bold mb-0.5">{sc.name}</p>
                  <p className="font-mono text-[9px] text-ledger-muted">{sc.sub}</p>
                </div>
                <div className="text-right pl-4">
                  <p className="font-mono text-[18px] font-bold" style={{ color: sc.deltaColor }}>
                    {sc.value}
                  </p>
                  <p className="font-mono text-[9px]" style={{ color: sc.deltaColor }}>
                    {sc.delta}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
