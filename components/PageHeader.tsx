import { ReactNode } from "react";

type Props = {
  tag: string;
  title: ReactNode;
  sub?: string;
  accent?: "blue" | "lime";
};

export function PageHeader({ tag, title, sub, accent = "blue" }: Props) {
  return (
    <div className="px-page pt-16 pb-14 border-b-2 border-ink">
      <span className="font-mono text-[9px] tracking-[.2em] uppercase text-ledger-muted block mb-5">
        {tag}
      </span>
      <h1
        className="font-display font-extrabold tracking-[-0.045em] leading-[.9] text-fluid-3xl mb-0"
        style={{ maxWidth: "14ch" }}
      >
        {title}
      </h1>
      {sub && (
        <p className="mt-6 text-fluid-base text-ledger-muted leading-[1.75] max-w-xl">
          {sub}
        </p>
      )}
      {/* Accent line */}
      <div
        className="mt-8 h-[3px] w-16"
        style={{ background: accent === "lime" ? "#C8FF00" : "#0047FF" }}
      />
    </div>
  );
}
