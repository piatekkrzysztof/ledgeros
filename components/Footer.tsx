import Link from "next/link";
import { LogoMark } from "./Nav";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Platforma: [
    { label: "Forecasting", href: "/#features" },
    { label: "Burn Intelligence", href: "/#features" },
    { label: "Scenario Engine", href: "/#scenariusze" },
    { label: "Integracje", href: "/#features" },
  ],
  Firma: [
    { label: "O nas", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Kariera", href: "/careers" },
    { label: "Kontakt", href: "/contact" },
    { label: "Design System", href: "/design-system" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-bg border-t-2 border-ink px-page py-section">
      <div className="flex flex-wrap gap-16 mb-10">
        {/* Brand */}
        <div className="flex-shrink-0 max-w-[240px]">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display font-extrabold text-[18px] tracking-[-0.04em] mb-3 hover:opacity-80 transition-opacity"
          >
            <LogoMark size={24} />
            LedgerOS
          </Link>
          <p className="text-[13px] text-bg/40 leading-[1.7]">
            Cashflow intelligence dla startupów, które nie mogą sobie pozwolić na niespodzianki.
          </p>
          <a
            href="mailto:hello@ledgeros.io"
            className="block font-mono text-[11px] text-bg/30 hover:text-bg mt-4 transition-colors"
          >
            hello@ledgeros.io
          </a>
        </div>

        {/* Link columns */}
        <div className="flex flex-wrap gap-12 flex-1">
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col} className="min-w-[120px]">
              <p className="font-mono text-[9px] tracking-[.14em] uppercase text-bg/30 mb-3.5">
                {col}
              </p>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[13px] text-bg/50 hover:text-bg mb-2.5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-bg/10">
        <span className="font-mono text-[9.5px] text-bg/25">
          © 2024 LedgerOS. Wszelkie prawa zastrzeżone.
        </span>
        <div className="flex gap-4">
          <Link href="/contact" className="font-mono text-[9.5px] text-bg/25 hover:text-bg/60 transition-colors">
            Polityka prywatności
          </Link>
          <Link href="/contact" className="font-mono text-[9.5px] text-bg/25 hover:text-bg/60 transition-colors">
            Warunki użytkowania
          </Link>
        </div>
      </div>
    </footer>
  );
}
