"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Block({ title, tag, children }: { title: string; tag?: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-ink">
      <div className="border-b-2 border-ink px-5 py-3 bg-ledger-card flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[.15em] uppercase text-ledger-muted">{title}</span>
        {tag && <code className="font-mono text-[9px] text-blue bg-blue-light px-2 py-0.5 border border-blue/20">{tag}</code>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Button states ────────────────────────────────────────────────────────────
function ButtonStates() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const triggerLoad = () => {
    setLoading(true);
    setSuccess(false);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
    setTimeout(() => setSuccess(false), 3200);
  };

  return (
    <Block title="Buttons — All States" tag="<button className='btn'>">
      <div className="flex flex-wrap gap-5 items-start">
        {/* Primary */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted">Primary</span>
          <motion.button
            className="btn btn-ink"
            whileHover={{ x: -2, y: -2, boxShadow: "7px 7px 0 #0C0C0A" }}
            whileTap={{ x: 2, y: 2, boxShadow: "2px 2px 0 #0C0C0A" }}
          >
            Get started
          </motion.button>
        </div>
        {/* Ghost */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted">Ghost</span>
          <motion.button
            className="btn btn-ghost"
            whileHover={{ x: -2, y: -2, boxShadow: "7px 7px 0 #0C0C0A" }}
            whileTap={{ x: 2, y: 2, boxShadow: "2px 2px 0 #0C0C0A" }}
          >
            Learn more ↗
          </motion.button>
        </div>
        {/* Lime */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted">Accent</span>
          <motion.button
            className="btn btn-lime"
            whileHover={{ x: -2, y: -2, boxShadow: "7px 7px 0 #0C0C0A" }}
            whileTap={{ x: 2, y: 2, boxShadow: "2px 2px 0 #0C0C0A" }}
          >
            Try for free →
          </motion.button>
        </div>
        {/* Loading → Success */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted">Loading state</span>
          <motion.button
            className="btn btn-ink min-w-[160px] justify-center"
            onClick={triggerLoad}
            disabled={loading}
            whileHover={!loading ? { x: -2, y: -2, boxShadow: "7px 7px 0 #0C0C0A" } : {}}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.span key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-lime">
                  ✓ Done
                </motion.span>
              ) : loading ? (
                <motion.span key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-bg/40 border-t-bg rounded-full animate-spin" />
                  Processing…
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Click to test
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        {/* Disabled */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted">Disabled</span>
          <button className="btn btn-ink opacity-35 cursor-not-allowed" disabled>
            Unavailable
          </button>
        </div>
        {/* Danger */}
        <div className="flex flex-col gap-2 items-start">
          <span className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted">Danger</span>
          <motion.button
            className="btn border-danger text-danger"
            whileHover={{ backgroundColor: "#FF3B30", color: "#EDE8DB", x: -2, y: -2, boxShadow: "7px 7px 0 #FF3B30" }}
            whileTap={{ x: 2, y: 2 }}
          >
            Delete account
          </motion.button>
        </div>
      </div>
    </Block>
  );
}

// ─── Form inputs ──────────────────────────────────────────────────────────────
function FormInputs() {
  const [focused, setFocused] = useState<string | null>(null);
  const [checked, setChecked] = useState([true, false, false]);

  return (
    <Block title="Form Elements — All States" tag="<input> / <select>">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Default */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted">Default</label>
          <input type="text" placeholder="company@example.com"
            onFocus={() => setFocused("def")} onBlur={() => setFocused(null)}
            className="border-2 border-ink bg-white px-4 py-2.5 font-mono text-[13px]
                       placeholder:text-ledger-border/60 outline-none transition-all"
            style={focused === "def" ? { borderColor: "#0047FF", boxShadow: "0 0 0 3px rgba(0,71,255,.1)" } : {}}
          />
          <span className="font-mono text-[9px] text-ledger-muted">state: default → focus</span>
        </div>
        {/* Error */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-danger">Error state</label>
          <input type="text" defaultValue="bad-value"
            className="border-2 border-danger bg-white px-4 py-2.5 font-mono text-[13px] outline-none"
          />
          <p className="font-mono text-[9px] text-danger">Invalid format. Expected: $NNN,NNN</p>
        </div>
        {/* Select */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted">Select</label>
          <select className="border-2 border-ink bg-white px-4 py-2.5 font-mono text-[13px] outline-none cursor-pointer appearance-none">
            <option>Seed Stage</option><option>Series A</option><option>Series B+</option>
          </select>
        </div>
        {/* Checkboxes */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted">Checkboxes</label>
          <div className="space-y-2.5">
            {["Real-time alerts", "Weekly digest", "Scenario access"].map((label, i) => (
              <label key={label} className="flex items-center gap-3 cursor-pointer group">
                <motion.div
                  className="w-4 h-4 border-2 border-ink flex items-center justify-center flex-shrink-0 bg-white"
                  animate={checked[i] ? { background: "#0047FF", borderColor: "#0047FF" } : {}}
                  transition={{ duration: 0.15 }}
                  onClick={() => setChecked((c) => c.map((v, idx) => idx === i ? !v : v))}
                >
                  <AnimatePresence>
                    {checked[i] && (
                      <motion.span key="ck" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="text-white text-[10px] font-bold leading-none">✓</motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
                <span className="font-body text-[13px] group-hover:text-blue transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Block>
  );
}

// ─── Card variants ─────────────────────────────────────────────────────────────
function CardVariants() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    {
      id: "kpi",
      label: "KPI Card",
      render: () => (
        <div className="border-2 border-ink p-5 relative overflow-hidden bg-white">
          <span className="absolute top-0 left-0 right-0 h-[3px] bg-blue" />
          <p className="font-mono text-[8.5px] tracking-[.13em] uppercase text-ledger-muted mb-2">Burn Rate</p>
          <p className="font-mono font-bold text-[32px] leading-none mb-2">$47K</p>
          <span className="font-mono text-[9px] px-1.5 py-0.5 border border-blue text-blue bg-blue-light">↓ −3.2%</span>
        </div>
      ),
    },
    {
      id: "feat",
      label: "Feature Card",
      render: () => (
        <div className="border-2 border-ink p-5 bg-white">
          <div className="text-[22px] mb-3">◈</div>
          <p className="font-display font-extrabold text-[16px] tracking-[-0.03em] mb-1.5">Cashflow Forecast</p>
          <p className="text-[12px] text-ledger-muted leading-[1.7]">14-day rolling forecast with scenario modeling built in.</p>
        </div>
      ),
    },
    {
      id: "alert",
      label: "Alert Card",
      render: () => (
        <div className="border-2 border-danger p-5 bg-[#FFF5F5]">
          <span className="font-mono text-[8px] tracking-[.1em] border border-danger text-danger px-1.5 py-0.5 mb-3 inline-block">ALERT</span>
          <p className="font-display font-extrabold text-[14px] tracking-[-0.02em] mb-1.5">Burn Spike Detected</p>
          <p className="font-mono text-[11px] text-ledger-muted">Oct spend +18% above 3-month avg.</p>
        </div>
      ),
    },
  ];

  return (
    <Block title="Card Variants — Hover to interact">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col gap-2">
            <span className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted">{card.label}</span>
            <motion.div
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              animate={hoveredCard === card.id ? { x: -2, y: -2, boxShadow: "5px 5px 0 #0C0C0A" } : { x: 0, y: 0, boxShadow: "0 0 0 #0C0C0A" }}
              transition={{ duration: 0.15 }}
            >
              {card.render()}
            </motion.div>
          </div>
        ))}
      </div>
    </Block>
  );
}

// ─── Badges ────────────────────────────────────────────────────────────────────
function BadgeVariants() {
  const badges = [
    { label: "↑ tracking", bg: "#EBF0FF", color: "#0047FF", border: "#0047FF" },
    { label: "↓ −3.2%", bg: "#FEE8E8", color: "#FF3B30", border: "#FF3B30" },
    { label: "stable", bg: "#F5FFB0", color: "#4B6B00", border: "#C8FF00" },
    { label: "LIVE", bg: "#0C0C0A", color: "#C8FF00", border: "#0C0C0A" },
    { label: "BETA", bg: "transparent", color: "#6E6B62", border: "#C0BAB0" },
    { label: "NEW", bg: "#C8FF00", color: "#0C0C0A", border: "#0C0C0A" },
    { label: "ALERT", bg: "#FEE8E8", color: "#FF3B30", border: "#FF3B30" },
    { label: "CORE", bg: "transparent", color: "#6E6B62", border: "#C0BAB0" },
  ];

  return (
    <Block title="Badges & Status Indicators">
      <div className="flex flex-wrap gap-3 items-center mb-4">
        {badges.map((b, i) => (
          <motion.span
            key={b.label}
            className="font-mono text-[9px] tracking-[.1em] px-2 py-1 border cursor-default"
            style={{ background: b.bg, color: b.color, borderColor: b.border }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.08, y: -1 }}
          >
            {b.label}
          </motion.span>
        ))}
        {/* Live pulse */}
        <div className="flex items-center gap-2 border-2 border-ink px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-lime border-[1.5px] border-ink animate-livepulse" />
          <span className="font-mono text-[9px] tracking-[.12em] uppercase">Live</span>
        </div>
      </div>
    </Block>
  );
}

// ─── Motion showcase ──────────────────────────────────────────────────────────
function MotionShowcase() {
  const [played, setPlayed] = useState(false);
  const [staggerKey, setStaggerKey] = useState(0);

  const replay = () => {
    setPlayed(false);
    setTimeout(() => { setPlayed(true); setStaggerKey((k) => k + 1); }, 50);
  };

  return (
    <Block title="Motion Patterns — Framer Motion" tag="framer-motion">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Stagger reveal */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[9px] text-ledger-muted uppercase tracking-widest">Stagger reveal</p>
            <button onClick={replay} className="font-mono text-[9px] text-blue hover:underline">replay →</button>
          </div>
          <motion.div key={staggerKey} className="space-y-2">
            {["Burn rate", "Runway", "MRR Growth", "Cash on hand"].map((item, i) => (
              <motion.div
                key={item}
                className="border-2 border-ink px-4 py-2.5 bg-white font-mono text-[12px] flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {item}
                <span className="text-blue">→</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Spring counter */}
        <div>
          <p className="font-mono text-[9px] text-ledger-muted uppercase tracking-widest mb-3">Spring physics</p>
          <SpringCounter />
        </div>

        {/* Layout animation */}
        <div>
          <p className="font-mono text-[9px] text-ledger-muted uppercase tracking-widest mb-3">Layout animation</p>
          <LayoutDemo />
        </div>

        {/* AnimatePresence */}
        <div>
          <p className="font-mono text-[9px] text-ledger-muted uppercase tracking-widest mb-3">AnimatePresence</p>
          <PresenceDemo />
        </div>
      </div>
    </Block>
  );
}

function SpringCounter() {
  const [val, setVal] = useState(47);
  const spring = useSpring(val, { stiffness: 100, damping: 20 });
  const [display, setDisplay] = useState(val);
  spring.on("change", (v) => setDisplay(Math.round(v)));

  return (
    <div className="border-2 border-ink p-4 bg-white">
      <p className="font-mono font-bold text-[36px] leading-none text-blue mb-3">${display}K</p>
      <input type="range" min={10} max={200} value={val} step={5}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full accent-blue h-[3px] mb-2" />
      <p className="font-mono text-[9px] text-ledger-muted">Drag → number springs to target</p>
    </div>
  );
}

function LayoutDemo() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-2 border-ink bg-white overflow-hidden">
      <motion.div layout className="p-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px] font-bold">Burn Rate</p>
          <button onClick={() => setExpanded((e) => !e)}
            className="font-mono text-[10px] text-blue hover:underline">
            {expanded ? "collapse" : "expand"}
          </button>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-1.5 border-t border-ledger-subtle mt-3">
                {["Infrastructure: $12K", "Salaries: $28K", "Marketing: $7K"].map((l) => (
                  <p key={l} className="font-mono text-[11px] text-ledger-muted">{l}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function PresenceDemo() {
  const [step, setStep] = useState(0);
  const steps = ["Burn pod kontrolą.", "Runway extended.", "Forecast stable."];
  return (
    <div className="border-2 border-ink bg-white p-4 min-h-[100px] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          className="font-display font-extrabold text-[22px] tracking-[-0.04em] leading-tight"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {steps[step]}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => setStep((s) => (s + 1) % steps.length)}
        className="font-mono text-[9px] text-blue text-left hover:underline mt-3"
      >
        next stage →
      </button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function UIStates() {
  return (
    <div className="space-y-8">
      <ButtonStates />
      <FormInputs />
      <CardVariants />
      <BadgeVariants />
      <MotionShowcase />
    </div>
  );
}
