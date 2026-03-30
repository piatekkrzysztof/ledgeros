"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";

export function Features() {
  return (
    <section id="platforma" className="section-pad border-t-2 border-ink">
      <span className="tag">Możliwości platformy</span>
      <motion.h2
        className="display-h text-fluid-3xl mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Każda warstwa<br />Twoich finansów.
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-2 border-ink">
        {FEATURES.map((feat, i) => (
          <motion.div
            key={feat.title}
            className="relative p-7 border-r-2 border-b-2 border-ink transition-colors hover:bg-blue/[0.03] group"
            style={{
              borderRight: (i + 1) % 3 === 0 ? "none" : undefined,
              borderBottom: i >= FEATURES.length - 3 ? "none" : undefined,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tag */}
            <em className="not-italic absolute top-3.5 right-3.5 font-mono text-[8px] tracking-[.1em] border border-ledger-border text-ledger-muted px-1.5 py-0.5">
              {feat.tag}
            </em>

            {/* Icon */}
            <div className="text-[22px] mb-3.5 leading-none group-hover:scale-110 transition-transform duration-200">
              {feat.icon}
            </div>

            <h3 className="font-display font-extrabold text-[17px] tracking-[-0.03em] mb-2">
              {feat.title}
            </h3>
            <p className="text-[13px] text-ledger-muted leading-[1.7]">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
