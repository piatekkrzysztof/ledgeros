import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ColorTokens } from "@/components/ds/ColorTokens";
import { TypographyScale } from "@/components/ds/TypographyScale";
import { ComponentShowcase } from "@/components/ds/ComponentShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — LedgerOS",
  description: "Color tokens, typography, spacing and UI components for LedgerOS.",
};

function DsBlock({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t-2 border-ink px-page py-14">
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="font-display font-extrabold text-[22px] tracking-[-0.04em]">{label}</h2>
        <span className="font-mono text-[9px] tracking-[.14em] uppercase text-ledger-muted">
          #{id}
        </span>
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const sections = [
    { id: "colors", label: "Color Tokens" },
    { id: "typography", label: "Typography Scale" },
    { id: "components", label: "UI Components" },
  ];

  return (
    <main>
      <Nav />

      <PageHeader
        tag="Design System · v1.0"
        title={<>Every token.<br />Every component.</>}
        sub="The single source of truth for LedgerOS UI. All tokens, typography, spacing, and component states — in one place."
        accent="lime"
      />

      {/* Sticky side nav */}
      <div className="flex">
        <aside className="hidden lg:block w-48 flex-shrink-0 border-r-2 border-ink">
          <nav className="sticky top-[58px] p-5" aria-label="Design system sections">
            <p className="font-mono text-[9px] tracking-[.14em] uppercase text-ledger-muted mb-4">
              Sections
            </p>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 font-mono text-[11px] py-1.5 px-2
                               text-ledger-muted hover:text-ink hover:bg-ledger-surface
                               transition-colors border-l-2 border-transparent hover:border-blue"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <DsBlock id="colors" label="Color Tokens">
            <ColorTokens />
          </DsBlock>

          <DsBlock id="typography" label="Typography Scale">
            <TypographyScale />
          </DsBlock>

          <DsBlock id="components" label="UI Components">
            <ComponentShowcase />
          </DsBlock>
        </div>
      </div>

      <Footer />
    </main>
  );
}
