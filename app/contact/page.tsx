"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

type FormState = "idle" | "loading" | "success" | "error";

const FIELDS = [
  { id: "name", label: "full_name", type: "text", placeholder: "Ada Lovelace", required: true },
  { id: "company", label: "company", type: "text", placeholder: "Acme Corp", required: true },
  { id: "email", label: "work_email", type: "email", placeholder: "ada@acme.io", required: true },
  { id: "stage", label: "funding_stage", type: "select", required: true,
    options: ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B+"] },
  { id: "arr", label: "current_arr", type: "select", required: false,
    options: ["< $100K", "$100K–$500K", "$500K–$2M", "$2M–$10M", "$10M+"] },
  { id: "message", label: "message", type: "textarea", placeholder: "What are you trying to solve?", required: false },
] as const;

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1600));
    setState("success");
  };

  return (
    <main>
      <Nav />

      <PageHeader
        tag="Contact"
        title={<>Let's talk<br />numbers.</>}
        sub="Tell us about your company and we'll reach out within one business day. No spam, no pitch decks — just a conversation."
      />

      <div className="grid md:grid-cols-[1fr_360px] border-b-2 border-ink">
        {/* ── FORM — terminal aesthetic ────────────────────────────────── */}
        <div className="border-r-0 md:border-r-2 border-ink">
          {/* Terminal top bar */}
          <div className="border-b-2 border-ink px-5 py-2.5 bg-ink flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/60 border border-danger/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-lime/60 border border-lime/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue/60 border border-blue/30" />
            <span className="font-mono text-[10px] text-bg/30 ml-2 tracking-widest">
              ledgeros — contact_form.sh
            </span>
          </div>

          {state === "success" ? (
            <div className="px-8 py-16 font-mono">
              <p className="text-lime text-[12px] mb-1">$ submit --status</p>
              <p className="text-[24px] font-bold mb-3">✓ Message received.</p>
              <p className="text-ledger-muted text-[13px]">
                We'll be in touch within one business day.
              </p>
              <button
                onClick={() => { setState("idle"); setValues({}); }}
                className="btn btn-ghost mt-8 text-[12px]"
              >
                ← Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-8 py-10 space-y-0">
              {FIELDS.map((field, i) => (
                <div key={field.id} className="border-b border-ledger-subtle py-4 flex flex-col sm:flex-row sm:items-start gap-3">
                  {/* Label */}
                  <label
                    htmlFor={field.id}
                    className="font-mono text-[11px] tracking-[.06em] text-blue sm:w-36 flex-shrink-0 pt-1"
                  >
                    <span className="text-ledger-muted">$</span> {field.label}
                    {field.required && <span className="text-danger ml-0.5">*</span>}
                  </label>

                  {/* Input */}
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      rows={3}
                      placeholder={(field as any).placeholder}
                      value={values[field.id] || ""}
                      onChange={(e) => set(field.id, e.target.value)}
                      className="flex-1 bg-transparent border-0 border-b-2 border-ledger-border
                                 font-mono text-[13px] outline-none resize-none
                                 focus:border-blue transition-colors placeholder:text-ledger-border/60"
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.id}
                      value={values[field.id] || ""}
                      onChange={(e) => set(field.id, e.target.value)}
                      className="flex-1 bg-transparent border-0 border-b-2 border-ledger-border
                                 font-mono text-[13px] outline-none cursor-pointer
                                 focus:border-blue transition-colors appearance-none"
                    >
                      <option value="">— select —</option>
                      {(field as any).options.map((o: string) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={(field as any).placeholder}
                      required={field.required}
                      value={values[field.id] || ""}
                      onChange={(e) => set(field.id, e.target.value)}
                      className="flex-1 bg-transparent border-0 border-b-2 border-ledger-border
                                 font-mono text-[13px] outline-none
                                 focus:border-blue transition-colors placeholder:text-ledger-border/60"
                    />
                  )}
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn btn-ink"
                >
                  {state === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-bg/40 border-t-bg rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    "$ submit →"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── SIDEBAR ─────────────────────────────────────────────── */}
        <div className="px-8 py-10 bg-ledger-surface flex flex-col gap-10">
          <div>
            <p className="tag">Response time</p>
            <p className="font-mono font-bold text-[28px] leading-none mb-1">≤ 1 day</p>
            <p className="text-[13px] text-ledger-muted">Business days, EU timezone.</p>
          </div>

          <div>
            <p className="tag">Direct email</p>
            <a href="mailto:hello@ledgeros.io" className="font-mono text-[13px] text-blue hover:underline">
              hello@ledgeros.io
            </a>
          </div>

          <div>
            <p className="tag">What to expect</p>
            <div className="space-y-3 mt-2">
              {[
                "30-min intro call",
                "Live product walkthrough",
                "Custom scenario for your company",
                "Pricing tailored to your stage",
              ].map((s, i) => (
                <div key={s} className="flex items-start gap-3 font-mono text-[11px]">
                  <span className="text-ledger-muted">{String(i + 1).padStart(2, "0")}.</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="tag">Trusted by</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Finstart", "Novaflow", "CashIQ", "RunwayAI", "Paylane", "Vestro"].map((c) => (
                <div key={c} className="border-2 border-ink px-3 py-1.5 bg-white font-mono text-[10px] text-center">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
