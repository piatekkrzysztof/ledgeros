"use client";

import { useState } from "react";

// ─── Section wrapper ──────────────────────────────────────────────────────────
function DsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-ink">
      <div className="border-b-2 border-ink px-5 py-3 bg-ledger-card">
        <span className="font-mono text-[9px] tracking-[.15em] uppercase text-ledger-muted">
          {title}
        </span>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────────────────
function Buttons() {
  const [loading, setLoading] = useState(false);

  const triggerLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DsSection title="Buttons — States">
      <div className="flex flex-wrap gap-4 items-start">
        <div className="flex flex-col gap-1.5 items-start">
          <span className="font-mono text-[9px] tracking-widest uppercase text-ledger-muted">Default</span>
          <button className="btn btn-ink">Get started</button>
        </div>
        <div className="flex flex-col gap-1.5 items-start">
          <span className="font-mono text-[9px] tracking-widest uppercase text-ledger-muted">Ghost</span>
          <button className="btn btn-ghost">Learn more ↗</button>
        </div>
        <div className="flex flex-col gap-1.5 items-start">
          <span className="font-mono text-[9px] tracking-widest uppercase text-ledger-muted">Lime CTA</span>
          <button className="btn btn-lime">Try for free →</button>
        </div>
        <div className="flex flex-col gap-1.5 items-start">
          <span className="font-mono text-[9px] tracking-widest uppercase text-ledger-muted">Loading</span>
          <button
            className="btn btn-ink min-w-[140px] justify-center"
            onClick={triggerLoad}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-bg/40 border-t-bg rounded-full animate-spin" />
                Processing…
              </span>
            ) : (
              "Click to test"
            )}
          </button>
        </div>
        <div className="flex flex-col gap-1.5 items-start">
          <span className="font-mono text-[9px] tracking-widest uppercase text-ledger-muted">Disabled</span>
          <button className="btn btn-ink opacity-35 cursor-not-allowed" disabled>
            Unavailable
          </button>
        </div>
        <div className="flex flex-col gap-1.5 items-start">
          <span className="font-mono text-[9px] tracking-widest uppercase text-ledger-muted">Danger</span>
          <button className="btn border-danger text-danger hover:bg-danger hover:text-bg transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </DsSection>
  );
}

// ─── Inputs ──────────────────────────────────────────────────────────────────
function Inputs() {
  return (
    <DsSection title="Form Elements">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Text input */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted">
            Text Input — Default
          </label>
          <input
            type="text"
            placeholder="company@example.com"
            className="border-2 border-ink bg-white px-4 py-2.5 font-mono text-[13px]
                       placeholder:text-ledger-border outline-none
                       focus:border-blue focus:shadow-[0_0_0_3px_rgba(0,71,255,0.12)]
                       transition-all"
          />
        </div>

        {/* Error state */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-danger">
            Text Input — Error
          </label>
          <input
            type="text"
            defaultValue="invalid-value"
            className="border-2 border-danger bg-white px-4 py-2.5 font-mono text-[13px] outline-none
                       focus:shadow-[0_0_0_3px_rgba(255,59,48,0.12)] transition-all"
          />
          <p className="font-mono text-[10px] text-danger">Invalid format. Expected: $NNN,NNN</p>
        </div>

        {/* Select */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted">
            Select
          </label>
          <select
            className="border-2 border-ink bg-white px-4 py-2.5 font-mono text-[13px]
                       outline-none focus:border-blue transition-all appearance-none cursor-pointer"
          >
            <option>Seed Stage</option>
            <option>Series A</option>
            <option>Series B+</option>
          </select>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted">
            Textarea
          </label>
          <textarea
            rows={3}
            placeholder="Describe your use case…"
            className="border-2 border-ink bg-white px-4 py-2.5 font-mono text-[13px]
                       placeholder:text-ledger-border outline-none resize-none
                       focus:border-blue focus:shadow-[0_0_0_3px_rgba(0,71,255,0.12)]
                       transition-all"
          />
        </div>

        {/* Checkbox row */}
        <div className="flex flex-col gap-3">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted mb-1">
            Checkboxes
          </label>
          {["Enable real-time alerts", "Weekly digest email", "Scenario Engine access"].map((label) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked={label.includes("real-time")}
                className="w-4 h-4 border-2 border-ink accent-blue cursor-pointer"
              />
              <span className="font-body text-[13px] group-hover:text-blue transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>

        {/* Radio group */}
        <div className="flex flex-col gap-3">
          <label className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted mb-1">
            Radio Group — Billing
          </label>
          {["Monthly ($149/mo)", "Annual ($119/mo · −20%)", "Enterprise (custom)"].map((label, i) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="billing"
                defaultChecked={i === 1}
                className="w-4 h-4 border-2 border-ink accent-blue cursor-pointer"
              />
              <span className="font-body text-[13px] group-hover:text-blue transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </DsSection>
  );
}

// ─── Badges & Status ─────────────────────────────────────────────────────────
function Badges() {
  const items = [
    { label: "↑ tracking", bg: "#EBF0FF", color: "#0047FF", border: "#0047FF" },
    { label: "↓ −3.2%", bg: "#FEE", color: "#FF3B30", border: "#FF3B30" },
    { label: "stable", bg: "#F5FFB0", color: "#4B6B00", border: "#C8FF00" },
    { label: "LIVE", bg: "#0C0C0A", color: "#C8FF00", border: "#0C0C0A" },
    { label: "BETA", bg: "transparent", color: "#6E6B62", border: "#C0BAB0" },
    { label: "NEW", bg: "#C8FF00", color: "#0C0C0A", border: "#0C0C0A" },
  ];

  return (
    <DsSection title="Badges & Status Indicators">
      <div className="flex flex-wrap gap-3 items-center">
        {items.map((b) => (
          <span
            key={b.label}
            className="font-mono text-[9px] tracking-[.1em] px-2 py-1 border"
            style={{ background: b.bg, color: b.color, borderColor: b.border }}
          >
            {b.label}
          </span>
        ))}
        {/* Live dot */}
        <div className="flex items-center gap-2 border-2 border-ink px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-lime border-[1.5px] border-ink animate-livepulse" />
          <span className="font-mono text-[9px] tracking-[.12em] uppercase">Live</span>
        </div>
      </div>
    </DsSection>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────
function Cards() {
  return (
    <DsSection title="Card Variants">
      <div className="grid md:grid-cols-3 gap-4">
        {/* KPI card */}
        <div className="border-2 border-ink p-5 relative overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-[3px] bg-blue" />
          <p className="font-mono text-[8.5px] tracking-[.13em] uppercase text-ledger-muted mb-2">
            Burn Rate
          </p>
          <p className="font-mono font-bold text-[32px] leading-none mb-2">$47K</p>
          <span className="font-mono text-[9px] px-1.5 py-0.5 border border-blue text-blue bg-blue-light">
            ↓ −3.2%
          </span>
        </div>

        {/* Feature card */}
        <div className="border-2 border-ink p-5 bg-white hover:bg-bg transition-colors group">
          <div className="text-[22px] mb-3 group-hover:scale-110 transition-transform duration-200">◈</div>
          <p className="font-display font-extrabold text-[17px] tracking-[-0.03em] mb-2">
            Cashflow Forecast
          </p>
          <p className="text-[13px] text-ledger-muted leading-[1.7]">
            14-day rolling forecast with scenario modeling built in.
          </p>
        </div>

        {/* Alert card */}
        <div className="border-2 border-danger p-5 bg-[#FFF5F5]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[9px] tracking-[.1em] border border-danger text-danger px-1.5 py-0.5">
              ALERT
            </span>
          </div>
          <p className="font-display font-extrabold text-[15px] tracking-[-0.02em] mb-1.5">
            Burn Spike Detected
          </p>
          <p className="font-mono text-[11px] text-ledger-muted">
            Oct spend +18% above 3-month avg. Review before month-end.
          </p>
        </div>
      </div>
    </DsSection>
  );
}

// ─── Spacing scale ─────────────────────────────────────────────────────────
function SpacingScale() {
  const steps = [
    { token: "1", px: "4px" },
    { token: "2", px: "8px" },
    { token: "3", px: "12px" },
    { token: "4", px: "16px" },
    { token: "6", px: "24px" },
    { token: "8", px: "32px" },
    { token: "10", px: "40px" },
    { token: "12", px: "48px" },
    { token: "16", px: "64px" },
    { token: "20", px: "80px" },
    { token: "24", px: "96px" },
  ];

  return (
    <DsSection title="Spacing Scale">
      <div className="space-y-2">
        {steps.map((s) => (
          <div key={s.token} className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-ledger-muted w-8 text-right">{s.token}</span>
            <span className="font-mono text-[10px] text-ledger-muted w-10">{s.px}</span>
            <div
              className="h-4 bg-blue opacity-40 border border-blue"
              style={{ width: s.px, minWidth: "4px" }}
            />
          </div>
        ))}
      </div>
    </DsSection>
  );
}

export function ComponentShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <Buttons />
      <Inputs />
      <Badges />
      <Cards />
      <SpacingScale />
    </div>
  );
}
