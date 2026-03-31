"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { JOBS, type Job } from "@/lib/careers";

const DEPARTMENTS = ["All", "Engineering", "Product", "Design", "Sales", "Customer Success"];

function JobRow({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 border-ink last:border-b-0 group">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-6 py-5 flex items-center gap-4 hover:bg-ledger-surface
                   transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-inset"
        aria-expanded={open}
      >
        {/* Dept pill */}
        <span className="font-mono text-[8.5px] tracking-[.1em] border border-ledger-border text-ledger-muted px-2 py-0.5 whitespace-nowrap hidden sm:block">
          {job.department}
        </span>

        {/* Title */}
        <span className="font-display font-extrabold text-[17px] tracking-[-0.03em] flex-1 group-hover:text-blue transition-colors">
          {job.title}
        </span>

        {/* Meta */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-mono text-[10px] text-ledger-muted hidden md:block">{job.location}</span>
          <span className="font-mono text-[10px] text-ledger-muted hidden md:block">{job.type}</span>
          <span
            className="font-mono text-[20px] leading-none transition-transform duration-200"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px" }}
        aria-hidden={!open}
      >
        <div className="px-6 pb-6 grid md:grid-cols-[1fr_200px] gap-6 border-t-2 border-ledger-subtle pt-5">
          <div>
            <p className="text-[14px] text-ledger-muted leading-[1.8] mb-5">{job.description}</p>
            <a
              href={`mailto:jobs@ledgeros.io?subject=Application: ${job.title}`}
              className="btn btn-ink inline-flex"
            >
              Apply now →
            </a>
          </div>
          <div className="space-y-3">
            {[
              { l: "Level", v: job.level },
              { l: "Location", v: job.location },
              { l: "Type", v: job.type },
              { l: "Department", v: job.department },
            ].map((d) => (
              <div key={d.l}>
                <p className="font-mono text-[9px] tracking-[.12em] uppercase text-ledger-muted">{d.l}</p>
                <p className="font-mono text-[12px] font-bold">{d.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [dept, setDept] = useState("All");
  const filtered = dept === "All" ? JOBS : JOBS.filter((j) => j.department === dept);

  return (
    <main>
      <Nav />

      <PageHeader
        tag="Careers"
        title={<>Work on a problem<br />that matters.</>}
        sub="We're building the financial OS every startup needs but nobody built yet. We're a small team that ships fast, argues well, and cares about craft."
        accent="lime"
      />

      {/* Perks */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-ink">
        {[
          { icon: "◈", label: "Remote-first", sub: "EU / US timezones" },
          { icon: "◉", label: "Equity package", sub: "Day-one ownership" },
          { icon: "◫", label: "Learning budget", sub: "$3K / year" },
          { icon: "◬", label: "Async by default", sub: "Deep work protected" },
        ].map((p, i) => (
          <div key={p.label} className={`px-6 py-8 ${i < 3 ? "border-r-2 border-ink" : ""}`}>
            <div className="text-[20px] mb-3">{p.icon}</div>
            <p className="font-display font-extrabold text-[15px] tracking-[-0.03em] mb-1">{p.label}</p>
            <p className="font-mono text-[10px] text-ledger-muted">{p.sub}</p>
          </div>
        ))}
      </section>

      {/* Filter + list */}
      <section className="px-page py-14">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="font-display font-extrabold text-fluid-2xl tracking-[-0.04em]">
            Open positions
          </h2>
          {/* Dept filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by department">
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className="font-mono text-[9.5px] tracking-[.08em] border-2 border-ink px-3 py-1.5
                           transition-all"
                style={
                  dept === d
                    ? { background: "#0C0C0A", color: "#EDE8DB" }
                    : { background: "transparent", color: "#0C0C0A" }
                }
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="border-2 border-ink">
          {filtered.length === 0 ? (
            <p className="px-6 py-10 font-mono text-[12px] text-ledger-muted">
              No open positions in this department right now. Check back soon.
            </p>
          ) : (
            filtered.map((job) => <JobRow key={job.id} job={job} />)
          )}
        </div>
      </section>

      {/* Spontaneous */}
      <section className="px-page py-12 border-t-2 border-ink bg-ink text-bg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] tracking-[.14em] uppercase text-bg/40 mb-2">
              Don't see your role?
            </p>
            <h2 className="font-display font-extrabold text-[24px] tracking-[-0.04em]">
              Send a speculative application.
            </h2>
            <p className="text-[13px] text-bg/50 mt-1 max-w-md">
              If you're exceptional at something we care about, we read every email.
            </p>
          </div>
          <a href="mailto:jobs@ledgeros.io" className="btn border-bg text-bg hover:bg-bg hover:text-ink flex-shrink-0">
            jobs@ledgeros.io →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
