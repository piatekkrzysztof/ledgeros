"use client";

import { TICKER_ITEMS } from "@/lib/constants";

export function Ticker() {
  // Triple the items. CSS animates translateX(-33.333%) so when
  // the first set scrolls out, the second (identical) set is already
  // in view — the loop is invisible and infinite.
  const tripled = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="h-[34px] bg-ink text-bg border-b-2 border-ink overflow-hidden flex items-center"
      role="marquee"
      aria-label="Live financial metrics"
    >
      <div className="ticker-track flex whitespace-nowrap">
        {tripled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-6 font-mono text-[9.5px] tracking-[.07em] border-r border-bg/10 flex-shrink-0"
          >
            <span className="opacity-40">{item.label}</span>
            <span style={{ color: item.down ? "#FF7070" : "#C8FF00" }}>
              {item.value}{item.suffix}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
