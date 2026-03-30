"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

const LogoMark = ({ size = 28 }: { size?: number }) => (
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

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  return (
    <motion.header
      className={clsx(
        "sticky top-0 z-50 flex items-center justify-between h-[58px]",
        "px-page border-b-2 border-ink bg-bg",
        "transition-shadow duration-300",
        scrolled && "shadow-[0_4px_0_0_#0C0C0A]"
      )}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 group" aria-label="LedgerOS home">
        <LogoMark />
        <span className="font-display font-extrabold text-[17px] tracking-[-0.04em] leading-none">
          LedgerOS
        </span>
      </a>

      {/* Links — hidden on mobile */}
      <nav aria-label="Główna nawigacja" className="hidden md:flex items-center gap-7">
        {["Platforma", "Scenariusze", "Cennik", "Docs"].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[13px] font-medium text-ink opacity-55 hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      {/* CTA */}
      <motion.button
        className="btn btn-ink text-[13px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        Zacznij za darmo →
      </motion.button>
    </motion.header>
  );
}

export { LogoMark };
