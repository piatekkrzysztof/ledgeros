import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { POSTS, getPost } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — LedgerOS Blog`,
    description: post.excerpt,
  };
}

// Simple markdown-ish body renderer
function renderBody(body: string) {
  return body
    .trim()
    .split("\n\n")
    .map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Bold heading (line starting with **)
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <h3 key={i} className="font-display font-extrabold text-[20px] tracking-[-0.03em] mt-10 mb-3">
            {trimmed.slice(2, -2)}
          </h3>
        );
      }

      // Inline bold within paragraphs
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-[15px] leading-[1.85] text-ledger-muted mb-0">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="text-ink font-semibold">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    })
    .filter(Boolean);
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const otherPosts = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <main>
      <Nav />

      {/* Back link */}
      <div className="px-page py-4 border-b-2 border-ink">
        <Link
          href="/blog"
          className="font-mono text-[10px] tracking-[.1em] text-ledger-muted hover:text-ink transition-colors flex items-center gap-1"
        >
          ← All posts
        </Link>
      </div>

      <article className="grid md:grid-cols-[1fr_280px]">
        {/* ── Main content ──────────────────────────────────────────── */}
        <div className="border-r-0 md:border-r-2 border-ink">
          {/* Post header */}
          <header className="px-page py-14 border-b-2 border-ink">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[8.5px] tracking-[.12em] border-2 border-blue text-blue px-2 py-0.5">
                {post.category}
              </span>
              <span className="font-mono text-[9px] text-ledger-muted">{post.date}</span>
              <span className="font-mono text-[9px] text-ledger-muted">{post.readTime} read</span>
            </div>

            <h1
              className="font-display font-extrabold tracking-[-0.045em] leading-[.92] mb-8"
              style={{ fontSize: "clamp(30px,4.5vw,62px)", maxWidth: "18ch" }}
            >
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4 pt-6 border-t-2 border-ink">
              <div className="w-10 h-10 border-2 border-ink bg-blue flex items-center justify-center
                              font-mono text-[11px] font-bold text-bg flex-shrink-0">
                {post.author.initials}
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold">{post.author.name}</p>
                <p className="font-mono text-[9px] text-ledger-muted">{post.author.role}</p>
              </div>
            </div>
          </header>

          {/* Excerpt pull quote */}
          <div className="px-page py-8 border-b-2 border-ink bg-ledger-surface">
            <p className="font-display font-extrabold text-[19px] tracking-[-0.03em] leading-[1.3] max-w-2xl">
              "{post.excerpt}"
            </p>
          </div>

          {/* Body */}
          <div className="px-page py-12 space-y-5 max-w-3xl">
            {renderBody(post.body)}
          </div>

          {/* Bottom CTA */}
          <div className="px-page py-12 border-t-2 border-ink bg-ink text-bg">
            <p className="font-mono text-[9px] tracking-[.14em] uppercase text-bg/40 mb-3">
              Try it yourself
            </p>
            <h2 className="font-display font-extrabold text-[28px] tracking-[-0.04em] mb-4">
              See your own burn rate, live.
            </h2>
            <p className="text-[13px] text-bg/50 mb-6 max-w-md leading-[1.75]">
              Connect your accounts in 90 seconds. LedgerOS does the rest.
            </p>
            <a href="/contact" className="btn border-bg text-bg hover:bg-bg hover:text-ink">
              Get early access →
            </a>
          </div>
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────── */}
        <aside className="hidden md:block">
          <div className="sticky top-[58px] p-7 space-y-8">
            {/* Table of contents (static) */}
            <div>
              <p className="tag mb-3">In this post</p>
              <ul className="space-y-1.5">
                {post.body
                  .split("\n\n")
                  .filter((b) => b.startsWith("**") && b.endsWith("**"))
                  .map((b) => (
                    <li key={b}>
                      <span className="font-mono text-[10px] text-ledger-muted leading-relaxed block hover:text-ink transition-colors cursor-pointer">
                        {b.slice(2, -2)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Other posts */}
            {otherPosts.length > 0 && (
              <div>
                <p className="tag mb-3">More posts</p>
                <div className="space-y-3">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="block border-2 border-ink p-4 hover:bg-ledger-surface transition-colors group"
                    >
                      <span className="font-mono text-[8px] tracking-[.1em] border border-blue text-blue px-1 py-0.5 mb-2 inline-block">
                        {p.category}
                      </span>
                      <p className="font-display font-extrabold text-[13px] tracking-[-0.03em] leading-tight group-hover:text-blue transition-colors">
                        {p.title}
                      </p>
                      <p className="font-mono text-[9px] text-ledger-muted mt-1">{p.readTime} read</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div>
              <p className="tag mb-3">Share</p>
              <div className="flex gap-2">
                {["Twitter / X", "LinkedIn"].map((s) => (
                  <button key={s} className="btn btn-ghost text-[10px] px-3 py-1.5 font-mono">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </article>

      <Footer />
    </main>
  );
}
