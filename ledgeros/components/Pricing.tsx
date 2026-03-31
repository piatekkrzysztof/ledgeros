"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLANS } from "@/lib/constants";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="cennik" className="section-pad border-t-2 border-ink">
      <span className="tag">Cennik</span>
      <h2 className="display-h text-fluid-3xl mb-10">
        Transparentny.<br />Bez niespodzianek.
      </h2>

      {/* Billing toggle */}
      <div className="flex items-center gap-4 mb-9">
        <div className="inline-flex border-2 border-ink" role="group" aria-label="Cykl rozliczeniowy">
          {["Miesięczny", "Roczny"].map((label, i) => {
            const isActive = i === 0 ? !annual : annual;
            return (
              <button
                key={label}
                onClick={() => setAnnual(i === 1)}
                className="px-5 py-2.5 font-body text-[12px] font-semibold flex items-center gap-1.5 transition-colors"
                style={{
                  background: isActive ? "#0C0C0A" : "transparent",
                  color: isActive ? "#EDE8DB" : "#0C0C0A",
                }}
              >
                {label}
                {i === 1 && (
                  <span className="bg-lime text-ink font-mono text-[8px] px-1.5">−20%</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {PLANS.map((plan, i) => {
          const price = annual ? plan.priceA : plan.priceM;
          return (
            <motion.div
              key={plan.name}
              className="border-2 border-ink p-7 relative"
              style={plan.featured ? { boxShadow: "7px 7px 0 #0047FF", background: "#F0F4FF" } : {}}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-[13px] left-1/2 -translate-x-1/2 bg-lime border-2 border-ink
                             font-mono text-[8.5px] tracking-[.08em] px-3 py-0.5 whitespace-nowrap"
                >
                  NAJPOPULARNIEJSZY
                </div>
              )}

              <p className="font-mono text-[9px] tracking-[.13em] uppercase text-ledger-muted mb-2">
                {plan.tier}
              </p>
              <h3 className="font-display font-extrabold text-[24px] tracking-[-0.04em] mb-1.5">
                {plan.name}
              </h3>

              {/* Animated price */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${plan.name}-${annual}`}
                  className="font-mono font-bold text-[42px] leading-none mb-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  ${price}
                  <em className="not-italic text-[13px] text-ledger-muted font-normal">/mies.</em>
                </motion.div>
              </AnimatePresence>

              <p className="text-[13px] text-ledger-muted leading-[1.7] mb-4 pt-4 border-t border-ledger-subtle">
                {plan.desc}
              </p>

              {plan.features.map((feat) => (
                <div
                  key={feat}
                  className="text-[12px] py-1.5 border-b border-ledger-subtle flex items-center gap-1.5 last:border-b-0 last:mb-5"
                >
                  <span className="text-blue text-[11px] font-bold">✓</span>
                  {feat}
                </div>
              ))}

              <button
                className={`btn w-full justify-center mt-1 ${plan.featured ? "btn-lime" : "btn-ghost"}`}
              >
                {plan.cta} {plan.featured && "→"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
