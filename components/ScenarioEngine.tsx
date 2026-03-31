"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCENARIOS } from "@/lib/constants";

type Scenario = (typeof SCENARIOS)[number];

// ─── Scenario Calculator Modal ────────────────────────────────────────────────
type CalcInputs = {
  cashOnHand: number;
  monthlyBurn: number;
  monthlyRevenue: number;
  burnGrowth: number;
  revenueGrowth: number;
};

type CalcResult = {
  runway: number;
  endCash: number;
  breakevenMonth: number | null;
  months: { month: number; cash: number; burn: number; revenue: number }[];
};

function calculate(inputs: CalcInputs): CalcResult {
  const { cashOnHand, monthlyBurn, monthlyRevenue, burnGrowth, revenueGrowth } = inputs;
  let cash = cashOnHand;
  let burn = monthlyBurn;
  let revenue = monthlyRevenue;
  const months: CalcResult["months"] = [];
  let runway = 0;
  let breakevenMonth: number | null = null;

  for (let m = 1; m <= 36; m++) {
    const netBurn = burn - revenue;
    cash = cash - netBurn;
    months.push({ month: m, cash: Math.max(0, cash), burn, revenue });

    if (netBurn <= 0 && breakevenMonth === null) breakevenMonth = m;
    if (cash <= 0) { runway = m; break; }
    runway = m;

    burn = burn * (1 + burnGrowth / 100);
    revenue = revenue * (1 + revenueGrowth / 100);
  }

  return { runway, endCash: months[months.length - 1]?.cash ?? 0, breakevenMonth, months };
}

// ─── Mini sparkline SVG ───────────────────────────────────────────────────────
function Sparkline({ data }: { data: { cash: number }[] }) {
  if (!data.length) return null;
  const W = 320, H = 60;
  const maxCash = Math.max(...data.map((d) => d.cash), 1);
  const pts = data
    .map((d, i) => `${(i / (data.length - 1)) * W},${H - (d.cash / maxCash) * H}`)
    .join(" ");

  const zeroIdx = data.findIndex((d) => d.cash <= 0);
  const dangerColor = zeroIdx > -1 && zeroIdx < data.length * 0.6 ? "#FF3B30" : "#0047FF";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={dangerColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={dangerColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`${pts} ${W},${H} 0,${H}`}
        fill="url(#sparkGrad)"
        stroke="none"
      />
      <polyline points={pts} fill="none" stroke={dangerColor} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Slider row ───────────────────────────────────────────────────────────────
function SliderRow({
  label, value, min, max, step, format, onChange, accent = false,
}: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void; accent?: boolean;
}) {
  return (
    <div className="border-b border-ledger-subtle py-3 grid grid-cols-[1fr_auto] gap-3 items-center">
      <div>
        <p className="font-mono text-[9px] tracking-[.1em] uppercase text-ledger-muted mb-1.5">
          {label}
        </p>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-blue h-[3px] cursor-pointer"
          style={{ accentColor: accent ? "#C8FF00" : "#0047FF" }}
        />
      </div>
      <span className="font-mono font-bold text-[15px] min-w-[70px] text-right">
        {format(value)}
      </span>
    </div>
  );
}

// ─── Calculator Modal ─────────────────────────────────────────────────────────
function CalculatorModal({ onClose }: { onClose: () => void }) {
  const [inputs, setInputs] = useState<CalcInputs>({
    cashOnHand: 650,
    monthlyBurn: 47,
    monthlyRevenue: 28,
    burnGrowth: 2,
    revenueGrowth: 8,
  });

  const set = useCallback(<K extends keyof CalcInputs>(key: K, val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  }, []);

  const result = calculate(inputs);
  const netBurn = inputs.monthlyBurn - inputs.monthlyRevenue;
  const runwayPct = Math.min((result.runway / 24) * 100, 100);
  const runwayColor = result.runway < 9 ? "#FF3B30" : result.runway < 14 ? "#EF9F27" : "#0047FF";

  const fmt = {
    k: (v: number) => `$${v}K`,
    pct: (v: number) => `${v > 0 ? "+" : ""}${v}%`,
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-ink/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl bg-bg border-2 border-ink shadow-[8px_8px_0_#0C0C0A] mx-4 mb-4 md:mb-0 overflow-hidden"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink bg-ink text-bg">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-lime border border-lime/50 animate-livepulse" />
            <span className="font-mono text-[10px] tracking-[.14em] uppercase">Scenario Calculator</span>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[18px] opacity-50 hover:opacity-100 transition-opacity leading-none"
            aria-label="Zamknij"
          >
            ×
          </button>
        </div>

        <div className="grid md:grid-cols-2">
          {/* ── LEFT: Inputs ──────────────────────────────────────────── */}
          <div className="px-6 py-5 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink">
            <p className="font-mono text-[9px] tracking-[.14em] uppercase text-ledger-muted mb-1">
              Twój startup
            </p>

            <SliderRow label="Cash on hand" value={inputs.cashOnHand} min={50} max={5000} step={50}
              format={fmt.k} onChange={(v) => set("cashOnHand", v)} />
            <SliderRow label="Monthly burn" value={inputs.monthlyBurn} min={10} max={500} step={5}
              format={fmt.k} onChange={(v) => set("monthlyBurn", v)} accent />
            <SliderRow label="Monthly revenue (MRR)" value={inputs.monthlyRevenue} min={0} max={300} step={5}
              format={fmt.k} onChange={(v) => set("monthlyRevenue", v)} />
            <SliderRow label="Burn growth / month" value={inputs.burnGrowth} min={-5} max={20} step={0.5}
              format={fmt.pct} onChange={(v) => set("burnGrowth", v)} accent />
            <SliderRow label="Revenue growth / month" value={inputs.revenueGrowth} min={0} max={30} step={0.5}
              format={fmt.pct} onChange={(v) => set("revenueGrowth", v)} />

            {/* Net burn summary */}
            <div className="mt-4 flex items-center justify-between border-t-2 border-ink pt-3">
              <span className="font-mono text-[10px] text-ledger-muted">Net burn / month</span>
              <span
                className="font-mono font-bold text-[16px]"
                style={{ color: netBurn > 0 ? "#FF3B30" : "#28A745" }}
              >
                {netBurn > 0 ? `-$${netBurn.toFixed(0)}K` : `+$${Math.abs(netBurn).toFixed(0)}K`}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Results ────────────────────────────────────────── */}
          <div className="px-6 py-5 flex flex-col gap-4">
            <p className="font-mono text-[9px] tracking-[.14em] uppercase text-ledger-muted">
              Prognoza
            </p>

            {/* Runway metric */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10px] text-ledger-muted">Runway</span>
                <span className="font-mono font-bold text-[28px] leading-none" style={{ color: runwayColor }}>
                  {result.runway >= 36 ? "36+" : result.runway} <span className="text-[13px] font-normal text-ledger-muted">mies.</span>
                </span>
              </div>
              <div className="h-2 border-2 border-ink bg-white overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: runwayColor }}
                  animate={{ width: `${runwayPct}%` }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>

            {/* Breakeven */}
            <div className="flex items-center justify-between border-2 border-ink px-4 py-2.5">
              <span className="font-mono text-[10px] text-ledger-muted">Breakeven</span>
              <span className="font-mono font-bold text-[14px]">
                {result.breakevenMonth
                  ? `Miesiąc ${result.breakevenMonth}`
                  : <span className="text-danger">Nie osiągnięty</span>
                }
              </span>
            </div>

            {/* Sparkline */}
            <div className="border-2 border-ink bg-white px-3 pt-3 pb-1">
              <p className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted mb-1">
                Cash on hand — 36 mies.
              </p>
              <Sparkline data={result.months} />
            </div>

            {/* Key callout */}
            <div
              className="border-2 border-ink px-4 py-3"
              style={{
                background: result.runway < 9 ? "#FFF5F5" : result.runway < 14 ? "#FFFBEB" : "#F0F4FF",
                borderColor: runwayColor,
              }}
            >
              <p className="font-mono text-[10px] font-bold" style={{ color: runwayColor }}>
                {result.runway < 9
                  ? "⚠ Krytyczny — potrzebna natychmiastowa akcja"
                  : result.runway < 14
                  ? "△ Ostrzeżenie — warto wdrożyć Scenario B"
                  : "✓ Stabilny — dobry moment na fundraising"}
              </p>
              <p className="font-mono text-[10px] text-ledger-muted mt-1">
                Przy obecnym tempie kończysz gotówkę za{" "}
                <strong>{result.runway >= 36 ? "ponad 36" : result.runway} miesięcy</strong>.
              </p>
            </div>

            {/* CTA */}
            <a href="/contact" className="btn btn-ink w-full justify-center mt-auto">
              Połącz dane z LedgerOS →
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ScenarioEngine section ──────────────────────────────────────────────
export function ScenarioEngine() {
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <>
      <section id="scenariusze" className="section-pad border-t-2 border-ink">
        <span className="tag">Scenario Engine</span>

        <div className="grid md:grid-cols-2 border-2 border-ink">
          {/* ── LEFT ──────────────────────────────────────────────── */}
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

            {/* ★ Interactive calculator CTA */}
            <button
              onClick={() => setCalcOpen(true)}
              className="btn btn-lime mb-6 w-full md:w-auto justify-center"
            >
              ◈ Uruchom własny scenariusz →
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

            <p className="font-mono text-[9px] text-ledger-muted mt-2 tracking-[.08em]">
              Wybierz scenariusz → aby zobaczyć zmianę runway
            </p>
          </div>

          {/* ── RIGHT: Preset scenario cards ──────────────────────── */}
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
                  <div className="text-right pl-4 flex-shrink-0">
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

      {/* Calculator modal */}
      <AnimatePresence>
        {calcOpen && <CalculatorModal onClose={() => setCalcOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
