"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const LogoMark = ({ size = 28 }: { size?: number }) => (
  <div
    aria-hidden="true"
    style={{ width: size, height: size }}
    className="bg-ink grid grid-cols-2 gap-[3px] p-1 flex-shrink-0"
  >
    <span className="bg-lime" />
    <span className="bg-white/30" />
    <span className="bg-white/30" />
    <span className="bg-blue" />
  </div>
);

const NAV_LINKS = [
  { href: "/#features", label: "Platforma" },
  { href: "/#scenariusze", label: "Scenariusze" },
  { href: "/blog", label: "Blog" },
  {
    label: "Firma",
    children: [
      { href: "/about", label: "O nas" },
      { href: "/careers", label: "Kariera" },
      { href: "/contact", label: "Kontakt" },
      { href: "/design-system", label: "Design System" },
    ],
  },
  { href: "/#cennik", label: "Cennik" },
];

function Dropdown({ items, open }: { items: { href: string; label: string }[]; open: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={open
        ? { opacity: 1, y: 0, pointerEvents: "auto" as const }
        : { opacity: 0, y: -6, pointerEvents: "none" as const }
      }
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-0 border-2 border-ink bg-bg shadow-neo min-w-[180px] z-50"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-between px-4 py-3 font-mono text-[11px] tracking-[.05em]
                     border-b border-ledger-subtle last:border-b-0 hover:bg-ledger-surface hover:text-blue
                     transition-colors"
        >
          {item.label}
          <span className="opacity-30 text-[10px]">→</span>
        </Link>
      ))}
    </motion.div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <>
      <motion.header
        ref={navRef}
        className={clsx(
          "sticky top-0 z-50 flex items-center justify-between h-[58px] px-page border-b-2 border-ink bg-bg transition-shadow duration-300",
          scrolled && "shadow-[0_4px_0_0_#0C0C0A]"
        )}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="LedgerOS home">
          <LogoMark />
          <span className="font-display font-extrabold text-[17px] tracking-[-0.04em] leading-none">
            LedgerOS
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Główna nawigacja">
          {NAV_LINKS.map((link) => {
            if ("children" in link) {
              const isOpen = openMenu === link.label;
              return (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setOpenMenu(isOpen ? null : link.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium
                               opacity-55 hover:opacity-100 transition-opacity
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                  >
                    {link.label}
                    <span className="text-[9px]" style={{ transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform .2s" }}>▾</span>
                  </button>
                  <Dropdown items={link.children ?? []} open={isOpen} />
                </div>
              );
            }
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-3 py-1.5 text-[13px] font-medium transition-opacity",
                  isActive ? "opacity-100" : "opacity-55 hover:opacity-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-ink text-[13px] hidden md:inline-flex">
            Zacznij za darmo →
          </Link>
          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 flex flex-col gap-[5px]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-[2px] bg-ink transition-all duration-200"
                style={{
                  transform: mobileOpen && i === 0 ? "rotate(45deg) translate(5px,5px)"
                    : mobileOpen && i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                    : "none",
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden border-b-2 border-ink bg-bg z-40 relative"
      >
        <nav className="py-2">
          {NAV_LINKS.map((link) => {
            if ("children" in link) {
              return (
                <div key={link.label}>
                  <p className="px-page py-2 font-mono text-[9px] tracking-[.14em] uppercase text-ledger-muted">
                    {link.label}
                  </p>
                  {(link.children ?? []).map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-page py-3 text-[14px] border-t border-ledger-subtle hover:bg-ledger-surface transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block px-page py-3 text-[15px] border-t border-ledger-subtle hover:bg-ledger-surface transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
          <div className="px-page pt-4 pb-2 border-t border-ledger-subtle">
            <Link href="/contact" className="btn btn-ink w-full justify-center">
              Zacznij za darmo →
            </Link>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
