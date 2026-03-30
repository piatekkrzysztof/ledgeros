"use client";

import { TICKER_ITEMS } from "@/lib/constants";

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="h-[34px] bg-ink text-bg border-b-2 border-ink overflow-hidden flex items-center"
      role="marquee"
      aria-label="Live financial metrics"
    >
      <div className="ticker-inner flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-6 font-mono text-[9.5px] tracking-[.07em] border-r border-bg/10"
          >
            <span className="opacity-40">{item.label}</span>
            <span className={item.down ? "text-[#FF7070]" : "text-lime"}>
              {item.value}{item.suffix}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
