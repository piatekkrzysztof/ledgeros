"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_STAGES } from "@/lib/constants";
import { CashflowChart } from "./CashflowChart";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Stage = (typeof HERO_STAGES)[number];

// ─── Animated number counter ──────────────────────────────────────────────────
function useCounter(target: string, active: boolean) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    // Parse numeric value from string like "$658K", "+23%", "14 mo"
    const match = target.match(/[\d.]+/);
    if (!match) { setDisplay(target); return; }

    const endVal = parseFloat(match[0]);
    const prefix = target.slice(0, target.indexOf(match[0]));
    const suffix = target.slice(target.indexOf(match[0]) + match[0].length);
    const start = endVal * 0.4;
    const duration = 900;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (endVal - start) * eased;
      const formatted = Number.isInteger(endVal)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, active]);

  return display;
}

// ─── Metric box ───────────────────────────────────────────────────────────────
function MetricBox({ metric, label, active }: { metric: string; label: string; active: boolean }) {
  const count = useCounter(metric, active);
  return (
    <motion.div
      className="inline-flex items-baseline gap-2 border-2 border-ink shadow-neo px-6 py-3 mb-7"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      aria-live="polite"
    >
      <span className="font-mono font-bold text-fluid-4xl leading-none">{count}</span>
      <span className="font-mono text-[12px] text-ledger-muted">{label}</span>
    </motion.div>
  );
}

// ─── Hero component ───────────────────────────────────────────────────────────
export function Hero() {
  const [stageIndex, setStageIndex] = useState(0);
  const [gsapReady, setGsapReady] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stage: Stage = HERO_STAGES[stageIndex];

  // ── Auto-advance fallback (non-scroll) ──────────────────────────────────────
  const startAutoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setStageIndex((i) => (i + 1) % HERO_STAGES.length);
    }, 4500);
  }, []);

  // ── GSAP ScrollTrigger ──────────────────────────────────────────────────────
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!scrollContainerRef.current || !stickyRef.current) return;

      const totalStages = HERO_STAGES.length;
      // Pin the sticky panel while the scroll container scrolls
      ctx = gsap.context(() => {
        // One ScrollTrigger per stage transition
        HERO_STAGES.forEach((_, i) => {
          if (i === 0) return;
          ScrollTrigger.create({
            trigger: scrollContainerRef.current,
            start: `${((i) / totalStages) * 100}% top`,
            onEnter: () => {
              setStageIndex(i);
              if (timerRef.current) clearInterval(timerRef.current);
            },
            onLeaveBack: () => {
              setStageIndex(i - 1);
              if (timerRef.current) clearInterval(timerRef.current);
            },
          });
        });

        // Narrative text parallax in the sticky panel
        gsap.to(".narrative-overlay", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      setGsapReady(true);
    };

    initGSAP();
    // Fallback auto-advance if GSAP not ready
    startAutoAdvance();

    return () => {
      ctx?.revert();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoAdvance]);

  const goToStage = (i: number) => {
    setStageIndex(i);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoAdvance();
  };

  return (
    /* Scroll container — tall enough for GSAP to trigger stages */
    <div
      ref={scrollContainerRef}
      className="relative"
      style={{ minHeight: gsapReady ? "400vh" : "auto" }}
    >
      {/* Sticky viewport panel */}
      <div
        ref={stickyRef}
        className={gsapReady ? "sticky top-[58px]" : "relative"}
        style={{ height: "calc(100vh - 58px - 34px)" }}
      >
        <div className="h-full grid md:grid-cols-2 border-b-2 border-ink">

          {/* ── LEFT: Narrative panel ─────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-page py-10 border-r-2 border-ink overflow-hidden">
            <div className="narrative-overlay">

              {/* Stage indicator row */}
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  className="w-2 h-2 rounded-full bg-lime border-[1.5px] border-ink flex-shrink-0 animate-livepulse"
                  aria-hidden="true"
                />
                <span className="font-mono text-[9px] tracking-[.14em] uppercase">
                  {stage.label}
                </span>
                {/* Stage dots */}
                <div
                  className="flex gap-1.5 ml-auto"
                  role="tablist"
                  aria-label="Etapy narracji"
                >
                  {HERO_STAGES.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === stageIndex}
                      aria-label={`Etap ${i + 1}`}
                      onClick={() => goToStage(i)}
                      className="h-[3px] border-none p-0 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                      style={{
                        width: i === stageIndex ? 26 : 9,
                        background: i === stageIndex ? "#0C0C0A" : "#C0BAB0",
                        borderRadius: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Headline — AnimatePresence for stage transitions */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`h-${stageIndex}`}
                  className="font-display font-extrabold tracking-[-0.05em] leading-[.9] mb-5"
                  style={{ fontSize: "clamp(40px, 5.6vw, 88px)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  {stage.headline.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </motion.h1>
              </AnimatePresence>

              {/* Subtext */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`s-${stageIndex}`}
                  className="text-fluid-base text-ledger-muted leading-[1.75] max-w-[380px] mb-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  {stage.sub}
                </motion.p>
              </AnimatePresence>

              {/* Metric box */}
              <AnimatePresence mode="wait">
                {stage.metric && (
                  <MetricBox
                    key={`m-${stageIndex}`}
                    metric={stage.metric}
                    label={stage.metricLabel}
                    active={true}
                  />
                )}
              </AnimatePresence>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2.5">
                <a href="/contact" className="btn btn-ink">Uruchom demo</a>
                <a href="#scenariusze" className="btn btn-ghost">Pokaż jak działa ↗</a>
              </div>

            </div>
          </div>

          {/* ── RIGHT: Chart panel ───────────────────────────────────────── */}
          <div
            className="hidden md:flex flex-col justify-center gap-4 px-page py-8"
            style={{ background: "#E8E2D3" }}
          >
            {/* Chart header */}
            <div className="flex justify-between items-end">
              <div>
                <p className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted mb-0.5">
                  12 miesięcy · cashflow
                </p>
                <p className="font-display font-extrabold text-[19px] tracking-[-0.03em]">
                  FY 2024
                </p>
              </div>
              <div className="flex flex-col gap-1 text-right font-mono text-[9px] text-ledger-muted">
                <span className="flex items-center gap-1 justify-end">
                  <span className="w-2.5 h-2.5 inline-block bg-blue opacity-55" />
                  Przychody
                </span>
                <span className="flex items-center gap-1 justify-end">
                  <span className="w-2.5 h-2.5 inline-block bg-danger opacity-55" />
                  Burn
                </span>
              </div>
            </div>

            {/* Recharts chart */}
            <div className="border-2 border-ink bg-white p-4">
              <CashflowChart />
            </div>

            {/* Mini KPIs */}
            <div className="grid grid-cols-3 border-2 border-ink">
              {[
                { l: "Burn/mies.", v: "$47K", c: "inherit" },
                { l: "Runway", v: "14 mo", c: "#0047FF" },
                { l: "MRR wzrost", v: "+23%", c: "#28A745" },
              ].map((k, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 ${i < 2 ? "border-r-2 border-ink" : ""}`}
                >
                  <p className="font-mono text-[8.5px] tracking-[.1em] uppercase text-ledger-muted mb-1">
                    {k.l}
                  </p>
                  <p
                    className="font-mono font-bold text-[19px] leading-tight"
                    style={{ color: k.c }}
                  >
                    {k.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Spacer content visible only when GSAP scroll is active */}
      {gsapReady && (
        <div className="absolute bottom-0 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none">
          <p className="font-mono text-[10px] tracking-[.2em] uppercase opacity-20 rotate-90">
            scroll
          </p>
        </div>
      )}
    </div>
  );
}
