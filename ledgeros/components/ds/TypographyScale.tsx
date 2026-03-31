const SCALE = [
  { name: "Display / Hero", class: "font-display font-extrabold", size: "clamp(40px,5.6vw,88px)", tracking: "-0.05em", sample: "Know your burn." },
  { name: "H1 — Section", class: "font-display font-extrabold", size: "clamp(30px,4.2vw,58px)", tracking: "-0.045em", sample: "Cashflow Intelligence" },
  { name: "H2 — Subsection", class: "font-display font-extrabold", size: "clamp(24px,2.8vw,36px)", tracking: "-0.04em", sample: "Runway Extended" },
  { name: "H3 — Card Title", class: "font-display font-extrabold", size: "17px", tracking: "-0.03em", sample: "Scenario Engine" },
  { name: "Body — Base", class: "font-body font-normal", size: "clamp(13px,1.1vw,16px)", tracking: "0", sample: "Real-time cashflow intelligence for startups that can't afford surprises." },
  { name: "Body — Small", class: "font-body font-medium", size: "13px", tracking: "0", sample: "Monthly burn rate, calculated from actual transaction data." },
  { name: "Mono — Data", class: "font-mono font-bold", size: "clamp(22px,2.8vw,36px)", tracking: "-0.02em", sample: "$47,320 / mo" },
  { name: "Mono — Label", class: "font-mono font-normal", size: "9px", tracking: "0.18em", sample: "BURN RATE · LIVE" },
  { name: "Mono — Badge", class: "font-mono font-normal", size: "9px", tracking: "0.08em", sample: "↓ −3.2% vs forecast" },
];

export function TypographyScale() {
  return (
    <div className="divide-y-2 divide-ink border-2 border-ink">
      {SCALE.map((s) => (
        <div key={s.name} className="grid md:grid-cols-[200px_1fr_200px] border-ink">
          {/* Meta */}
          <div className="p-4 border-r-2 border-ink bg-ledger-card">
            <p className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted mb-1">
              {s.name}
            </p>
            <p className="font-mono text-[10px] text-ink/60">{s.size}</p>
            <p className="font-mono text-[10px] text-ink/60">tracking: {s.tracking}</p>
          </div>
          {/* Sample */}
          <div className="p-6 md:p-8 flex items-center overflow-hidden border-r-2 border-ink">
            <span
              className={s.class}
              style={{ fontSize: s.size, letterSpacing: s.tracking, lineHeight: 1.1 }}
            >
              {s.sample}
            </span>
          </div>
          {/* Class */}
          <div className="p-4 flex items-center hidden md:flex">
            <code className="font-mono text-[10px] text-blue bg-blue-light px-2 py-1 border border-blue/20 block w-full leading-relaxed">
              {s.class}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}
