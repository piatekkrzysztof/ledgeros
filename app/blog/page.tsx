import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { POSTS } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — LedgerOS",
  description: "Cashflow strategy, runway thinking, and financial operations for startups.",
};

function PostCard({ post, featured = false }: { post: (typeof POSTS)[0]; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block border-2 border-ink bg-white hover:bg-ledger-surface
                  transition-colors relative overflow-hidden
                  ${featured ? "md:col-span-2" : ""}`}
    >
      {/* Accent top bar */}
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-blue group-hover:bg-lime transition-colors" />

      <div className={`p-7 flex flex-col ${featured ? "md:flex-row md:items-end md:gap-12" : ""}`}>
        <div className={featured ? "flex-1" : ""}>
          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[8.5px] tracking-[.12em] border border-blue text-blue px-1.5 py-0.5">
              {post.category}
            </span>
            <span className="font-mono text-[9px] text-ledger-muted">{post.date}</span>
            <span className="font-mono text-[9px] text-ledger-muted">{post.readTime} read</span>
          </div>

          {/* Title — typography IS the visual */}
          <h2
            className="font-display font-extrabold tracking-[-0.04em] leading-[.92] mb-4
                       group-hover:text-blue transition-colors"
            style={{ fontSize: featured ? "clamp(24px,3.2vw,44px)" : "clamp(18px,2vw,26px)" }}
          >
            {post.title}
          </h2>

          <p className="text-[13px] text-ledger-muted leading-[1.75] mb-6 max-w-2xl">
            {post.excerpt}
          </p>
        </div>

        {/* Author + arrow */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-ink bg-blue flex items-center justify-center
                            font-mono text-[10px] font-bold text-bg">
              {post.author.initials}
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold">{post.author.name}</p>
              <p className="font-mono text-[9px] text-ledger-muted">{post.author.role}</p>
            </div>
          </div>
          <span
            className="font-mono text-[20px] opacity-30 group-hover:opacity-100 group-hover:translate-x-1
                       group-hover:-translate-y-1 transition-all duration-200"
          >
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <main>
      <Nav />

      <PageHeader
        tag="Journal"
        title={<>Thinking about<br />startup finance.</>}
        sub="Cashflow strategy, runway mechanics, and financial operations — for operators building in the open."
        accent="blue"
      />

      <section className="px-page py-14 border-b-2 border-ink">
        {/* Grid — bento style */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <PostCard post={featured} featured />
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>

        {/* Coming soon placeholder */}
        <div className="border-2 border-dashed border-ledger-border p-8 text-center">
          <p className="font-mono text-[10px] tracking-[.14em] uppercase text-ledger-muted mb-2">
            More coming
          </p>
          <p className="text-[13px] text-ledger-muted">
            New posts on the first and third Tuesday of every month.
          </p>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-page py-14 border-b-2 border-ink grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="tag">Newsletter</span>
          <h2 className="font-display font-extrabold text-fluid-2xl tracking-[-0.04em] mb-3">
            Cashflow intel,<br />straight to your inbox.
          </h2>
          <p className="text-[13px] text-ledger-muted leading-[1.75]">
            Bi-monthly. Operator-focused. No fluff. Unsubscribe in one click.
          </p>
        </div>
        <div className="flex gap-0 border-2 border-ink">
          <input
            type="email"
            placeholder="you@company.io"
            className="flex-1 px-4 py-3 font-mono text-[13px] outline-none bg-white
                       placeholder:text-ledger-border border-r-2 border-ink"
          />
          <button className="btn btn-ink border-0 shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 px-6">
            Subscribe →
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
