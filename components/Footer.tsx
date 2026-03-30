import { LogoMark } from "./Nav";

const FOOTER_LINKS = {
  Platforma: ["Forecasting", "Burn Intelligence", "Scenario Engine", "Integracje"],
  Firma: ["O nas", "Blog", "Kariera", "Kontakt"],
  Zasoby: ["Docs", "API", "Changelog", "Status"],
};

export function Footer() {
  return (
    <footer className="bg-ink text-bg border-t-2 border-ink px-page py-section">
      <div className="flex flex-wrap gap-16 mb-10">
        {/* Brand */}
        <div className="flex-shrink-0 max-w-[220px]">
          <div className="flex items-center gap-2.5 font-display font-extrabold text-[18px] tracking-[-0.04em] mb-3">
            <LogoMark size={24} />
            LedgerOS
          </div>
          <p className="text-[13px] text-bg/40 leading-[1.7]">
            Cashflow intelligence dla startupów, które nie mogą sobie pozwolić na niespodzianki.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex flex-wrap gap-12 flex-1">
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col} className="min-w-[100px]">
              <p className="font-mono text-[9px] tracking-[.14em] uppercase text-bg/30 mb-3.5">
                {col}
              </p>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-[13px] text-bg/50 hover:text-bg mb-2.5 transition-colors"
                >
                  {link}
                </a>
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
        <span className="font-mono text-[9.5px] text-bg/25">
          Polityka prywatności · Warunki użytkowania
        </span>
      </div>
    </footer>
  );
}
