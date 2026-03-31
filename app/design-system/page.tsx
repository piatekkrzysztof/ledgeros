"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TokenGrid } from "@/components/ds/TokenGrid";
import { TypographyPlayground } from "@/components/ds/TypographyPlayground";
import { GridSystem } from "@/components/ds/GridSystem";
import { UIStates } from "@/components/ds/UIStates";

// ─── Sections ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "tokens", label: "Color Tokens", icon: "◈" },
  { id: "typography", label: "Typography", icon: "T" },
  { id: "grid", label: "Grid & Spacing", icon: "⊞" },
  { id: "components", label: "UI Components", icon: "◉" },
  { id: "motion", label: "Motion Patterns", icon: "◬" },
];

// ─── Active section tracker ───────────────────────────────────────────────────
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  return active;
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-blue origin-left z-[200]"
      style={{ scaleX }}
    />
  );
}

// ─── Section wrapper with GSAP-style reveal ───────────────────────────────────
function Section({ id, label, icon, children }: {
  id: string; label: string; icon: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t-2 border-ink px-6 md:px-10 py-14 scroll-mt-[58px]">
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="w-10 h-10 border-2 border-ink flex items-center justify-center font-mono text-[16px] bg-ink text-lime flex-shrink-0">
          {icon}
        </span>
        <div>
          <h2 className="font-display font-extrabold text-[22px] tracking-[-0.04em] leading-none">
            {label}
          </h2>
        </div>
        <span className="font-mono text-[9px] text-ledger-muted ml-auto hidden sm:block">
          #{id}
        </span>
      </motion.div>
      {children}
    </section>
  );
}

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
function SideNav({ activeId }: { activeId: string }) {
  return (
    <aside className="hidden lg:block w-52 flex-shrink-0 border-r-2 border-ink">
      <div className="sticky top-[58px] flex flex-col">
        {/* Status bar */}
        <div className="px-5 py-4 border-b-2 border-ink bg-ink">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-livepulse" />
            <span className="font-mono text-[9px] tracking-[.12em] uppercase text-bg/50">v1.0 · current</span>
          </div>
        </div>

        <nav className="px-4 py-5" aria-label="Design system navigation">
          <p className="font-mono text-[8.5px] tracking-[.16em] uppercase text-ledger-muted mb-4 px-1">
            Sections
          </p>
          <ul className="space-y-0.5">
            {SECTIONS.map((s) => {
              const isActive = activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-3 py-2 px-2 font-mono text-[11px] transition-all border-l-2"
                    style={{
                      borderLeftColor: isActive ? "#0047FF" : "transparent",
                      color: isActive ? "#0047FF" : "#6E6B62",
                      background: isActive ? "#EBF0FF" : "transparent",
                    }}
                  >
                    <span className="text-[13px]">{s.icon}</span>
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Stack badge */}
        <div className="px-5 py-4 border-t-2 border-ink mt-auto">
          <p className="font-mono text-[8.5px] tracking-[.12em] uppercase text-ledger-muted mb-3">
            Stack
          </p>
          {["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Recharts"].map((t) => (
            <span key={t} className="block font-mono text-[9px] text-ink/50 mb-1">{t}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Hero banner ──────────────────────────────────────────────────────────────
function DSHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative border-b-2 border-ink overflow-hidden" style={{ minHeight: 280 }}>
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#0C0C0A 1px, transparent 1px), linear-gradient(90deg, #0C0C0A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <motion.div
        style={{ y, opacity }}
        className="relative px-page py-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
      >
        <div>
          <span className="font-mono text-[9px] tracking-[.2em] uppercase text-ledger-muted block mb-5">
            Design System · LedgerOS · v1.0
          </span>
          <h1 className="font-display font-extrabold text-[clamp(36px,5vw,72px)] tracking-[-0.05em] leading-[.9] mb-4">
            Every token.<br />Every state.<br />Every pattern.
          </h1>
          <p className="text-[14px] text-ledger-muted max-w-md leading-[1.75]">
            The single source of truth for LedgerOS UI. Interactive playground — edit live,
            copy tokens, test Motion patterns.
          </p>
        </div>
        {/* Stats */}
        <div className="flex gap-0 border-2 border-ink flex-shrink-0">
          {[
            { n: "12", l: "Color tokens" },
            { n: "8", l: "Type styles" },
            { n: "6", l: "Components" },
          ].map((s, i) => (
            <div key={s.l} className={`px-5 py-4 ${i < 2 ? "border-r-2 border-ink" : ""}`}>
              <p className="font-mono font-bold text-[28px] leading-none text-blue">{s.n}</p>
              <p className="font-mono text-[9px] text-ledger-muted mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Accent bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-16 bg-lime" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const sectionIds = SECTIONS.map((s) => s.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <ReadingProgress />
      <Nav />
      <DSHero />

      <div className="flex">
        <SideNav activeId={activeId} />

        <main className="flex-1 min-w-0">
          <Section id="tokens" label="Color Tokens" icon="◈">
            <TokenGrid />
          </Section>

          <Section id="typography" label="Typography" icon="T">
            <TypographyPlayground />
          </Section>

          <Section id="grid" label="Grid & Spacing" icon="⊞">
            <GridSystem />
          </Section>

          <Section id="components" label="UI Components & States" icon="◉">
            <UIStates />
          </Section>

          {/* Motion patterns są wbudowane w UIStates → MotionShowcase */}
          <section id="motion" className="border-t-2 border-ink px-6 md:px-10 py-14 scroll-mt-[58px]">
            <div className="border-2 border-ink p-8 bg-ink text-bg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[9px] tracking-[.14em] uppercase text-bg/40 mb-3">Motion</p>
                <h2 className="font-display font-extrabold text-[28px] tracking-[-0.04em] mb-2">
                  Motion patterns w sekcji UI Components ↑
                </h2>
                <p className="text-[13px] text-bg/50 max-w-md leading-[1.75]">
                  Stagger reveal, spring physics, AnimatePresence, layout animation —
                  wszystko w sekcji UI Components → Motion Patterns.
                </p>
              </div>
              <a href="#components" className="btn border-bg text-bg hover:bg-bg hover:text-ink flex-shrink-0">
                Przejdź do Motion →
              </a>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
