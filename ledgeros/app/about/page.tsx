import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — LedgerOS",
  description: "Our mission, values, and the team building the financial OS for startups.",
};

const TEAM = [
  { name: "Daniel Osei", role: "Co-founder & CEO", prev: "ex-Revolut, ex-Stripe", initials: "DO", accent: "#0047FF" },
  { name: "Mara Kovacs", role: "Co-founder & CPO", prev: "ex-N26, ex-McKinsey", initials: "MK", accent: "#C8FF00" },
  { name: "Tom Wierzbicki", role: "CTO", prev: "ex-Cloudflare, MIT CS", initials: "TW", accent: "#0047FF" },
  { name: "Selin Arı", role: "Head of Design", prev: "ex-Linear, ex-Figma", initials: "SA", accent: "#C8FF00" },
  { name: "James Okonkwo", role: "Head of Growth", prev: "ex-Brex, ex-Ramp", initials: "JO", accent: "#0047FF" },
  { name: "Ines Meier", role: "Head of Engineering", prev: "ex-Monzo, ETH Zürich", initials: "IM", accent: "#C8FF00" },
];

const VALUES = [
  { num: "01", title: "Precision over feature count.", body: "We ship fewer things, better. Every metric, every alert, every forecast has to earn its place in the UI." },
  { num: "02", title: "Operators, not spectators.", body: "LedgerOS is built for the person who has to make the call, not the person who writes the post-mortem. Speed and clarity beat depth and completeness." },
  { num: "03", title: "Defaults that earn trust.", body: "Sensible defaults eliminate configuration overhead. If a startup has to read documentation to understand their burn rate, we failed." },
  { num: "04", title: "Transparent by design.", body: "We tell our customers exactly what our models assume, where data is estimated vs exact, and what we don't know. No black boxes." },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      <PageHeader
        tag="About LedgerOS"
        title={<>Built by operators,<br />for operators.</>}
        sub="We started LedgerOS because we kept watching smart founding teams get blindsided by cash problems that were visible three months earlier — if they'd had the right tools."
      />

      {/* Mission block */}
      <section className="grid md:grid-cols-2 border-b-2 border-ink">
        <div className="px-page py-16 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink">
          <span className="tag">Mission</span>
          <h2 className="font-display font-extrabold text-[clamp(26px,3.2vw,44px)] tracking-[-0.04em] leading-[.92] mb-6">
            Make every startup's cash position as clear as their product metrics.
          </h2>
          <p className="text-[14px] text-ledger-muted leading-[1.8] max-w-md">
            The best product teams operate from dashboards. Finance should be no different.
            LedgerOS gives operators a live, programmable view of their financial position —
            so decisions get made with data, not instinct.
          </p>
        </div>
        <div className="px-page py-16 bg-ledger-surface">
          <div className="grid grid-cols-2 gap-px border-2 border-ink bg-ink">
            {[
              { label: "Founded", value: "2023" },
              { label: "Team size", value: "18" },
              { label: "Customers", value: "340+" },
              { label: "Capital managed", value: "$2.4B" },
            ].map((s) => (
              <div key={s.label} className="bg-bg px-6 py-8">
                <p className="font-mono text-[9px] tracking-[.14em] uppercase text-ledger-muted mb-2">
                  {s.label}
                </p>
                <p className="font-mono font-bold text-[34px] leading-none">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-page py-16 border-b-2 border-ink">
        <span className="tag">Values</span>
        <h2 className="font-display font-extrabold text-fluid-2xl tracking-[-0.04em] mb-10">
          How we work.
        </h2>
        <div className="grid md:grid-cols-2 gap-px border-2 border-ink bg-ink">
          {VALUES.map((v) => (
            <div key={v.num} className="bg-bg px-7 py-8">
              <p className="font-mono text-[11px] text-ledger-muted mb-4">{v.num}</p>
              <h3 className="font-display font-extrabold text-[18px] tracking-[-0.03em] mb-3">
                {v.title}
              </h3>
              <p className="text-[13px] text-ledger-muted leading-[1.75]">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-page py-16 border-b-2 border-ink">
        <span className="tag">The Team</span>
        <h2 className="font-display font-extrabold text-fluid-2xl tracking-[-0.04em] mb-10">
          Who builds LedgerOS.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-2 border-ink">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="p-6 border-r-2 border-b-2 border-ink relative overflow-hidden group
                         hover:bg-ledger-surface transition-colors"
              style={{
                borderRight: (i + 1) % 3 === 0 ? "none" : undefined,
                borderBottom: i >= TEAM.length - 3 ? "none" : undefined,
              }}
            >
              {/* Accent bar */}
              <span
                className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-[4px]"
                style={{ background: member.accent }}
              />
              {/* Avatar */}
              <div
                className="w-12 h-12 border-2 border-ink flex items-center justify-center font-mono font-bold text-[13px] mb-4"
                style={{
                  background: member.accent,
                  color: member.accent === "#C8FF00" ? "#0C0C0A" : "#EDE8DB",
                }}
              >
                {member.initials}
              </div>
              <h3 className="font-display font-extrabold text-[16px] tracking-[-0.03em] mb-0.5">
                {member.name}
              </h3>
              <p className="font-mono text-[10px] tracking-[.08em] text-ledger-muted mb-1">
                {member.role}
              </p>
              <p className="font-mono text-[10px] text-ink/40">{member.prev}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-page py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display font-extrabold text-fluid-2xl tracking-[-0.04em] mb-2">
            We're hiring.
          </h2>
          <p className="text-[14px] text-ledger-muted">
            If this sounds like your kind of company, we'd like to hear from you.
          </p>
        </div>
        <a href="/careers" className="btn btn-ink flex-shrink-0">
          Open positions →
        </a>
      </section>

      <Footer />
    </main>
  );
}
