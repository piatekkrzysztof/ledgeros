export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: { name: string; role: string; initials: string };
  body: string;
};

export const POSTS: Post[] = [
  {
    slug: "burn-rate-anatomy",
    title: "The Anatomy of Burn Rate: What Most Startups Get Wrong",
    excerpt:
      "Burn rate is not a single number. It's a system. Most founding teams track the wrong metric and discover the gap only when it's too late to correct course.",
    date: "2024-11-14",
    readTime: "7 min",
    category: "CASHFLOW",
    author: { name: "Mara Kovacs", role: "Head of Product", initials: "MK" },
    body: `
Burn rate is the most cited metric in startup finance — and one of the most misunderstood.

**The Gross vs Net Confusion**

Most founders report *gross burn*: total cash out the door each month. But the number that actually determines survival is *net burn* — the difference between what leaves and what comes in. A company spending $120K/month with $80K MRR has a net burn of $40K, not $120K. The distinction sounds obvious until you're in a board meeting quoting the wrong figure.

**The Three Layers of Burn**

A useful burn model separates spend into three categories:

1. **Fixed infrastructure** — rent, tooling, committed contracts. These are inertial. They don't change next month regardless of what you decide today.
2. **Team burn** — salaries, benefits, employer taxes. This is usually 65–75% of total spend and the only lever with meaningful size.
3. **Variable growth spend** — paid acquisition, events, contractors. The first thing to cut, the last thing to regret cutting.

When investors ask about burn, they want to understand which of these three levers is driving the number and which are controllable on short notice.

**The Runway Calculation Nobody Does Right**

Runway = Cash / Net Burn. Simple. But what cash? Most founders use current bank balance. The correct input is *accessible* cash: bank balance minus committed future obligations (next payroll, annual contracts due, tax liabilities). The gap between those two numbers is often 15–25% of the balance.

**Building a Burn Dashboard That Works**

A working burn dashboard has four cells:
- This month's net burn (actual)
- Rolling 3-month average net burn (trend)
- Projected runway at current burn
- Projected runway at +20% burn (stress scenario)

The second row is what most teams skip. Trend matters more than point-in-time because it tells you whether the situation is improving or deteriorating — before the bank balance confirms it.

**When to Raise vs When to Cut**

The decision to raise or cut is fundamentally a question about your burn trajectory. If net burn is falling month-over-month and runway exceeds 14 months, you're in a position to raise from strength. If burn is flat or rising and runway is under 10 months, cutting is not optional — it's the precondition for any fundraise succeeding.

LedgerOS surfaces this signal automatically, flagging when the trailing burn trend crosses a configurable threshold so the conversation happens before the crisis does.
    `,
  },
  {
    slug: "runway-extension-playbook",
    title: "The Runway Extension Playbook: 6 Levers, Ranked by Impact",
    excerpt:
      "When runway falls below 12 months, the response window is shorter than it feels. Here are the six levers that actually move the number — in order of implementation speed.",
    date: "2024-10-28",
    readTime: "9 min",
    category: "STRATEGY",
    author: { name: "Daniel Osei", role: "Co-founder & CEO", initials: "DO" },
    body: `
Twelve months of runway feels like a long time until it doesn't. The moment you recognize the constraint, the response window is already narrower than the number suggests — because fundraising takes 3–6 months, and cost changes take 30–60 days to show up in cash flow.

Here are the six levers, ranked by how quickly they move the cash position.

**Lever 1: Collect Outstanding Receivables (Impact: immediate)**

Before cutting anything, look at what's owed. Late invoices, annual contracts not yet collected, expense reimbursements pending. In B2B SaaS, 30–60 days of revenue often sits uncollected at any given time. This is the fastest cash injection available and requires no external approval.

**Lever 2: Shift Billing Cadence (Impact: 30 days)**

Moving customers from monthly to annual billing is the highest-leverage pricing change available to a SaaS company. A 10% discount on annual gets most customers over the line. On $100K MRR, shifting 40% of customers to annual billing generates ~$480K of immediate cash. Model this before you model headcount reductions.

**Lever 3: Pause Variable Spend (Impact: 30 days)**

Paid acquisition, sponsorships, conference budgets, contractor retainers not tied to core delivery. These cuts are reversible. Make them first.

**Lever 4: Vendor Renegotiation (Impact: 30–60 days)**

Most SaaS vendors would rather renegotiate than churn you. Infrastructure, tooling, data providers — ask for 20% off in exchange for a longer commitment or case study. The ask costs nothing and succeeds more often than founders expect.

**Lever 5: Headcount Restructuring (Impact: 60 days)**

The hardest lever and the one with the longest emotional recovery time. Effective headcount restructuring targets role duplication and layers of management before it touches individual contributors. A single layer of middle management removed can reduce burn by 15–20% in companies above 30 people.

**Lever 6: Revenue Acceleration (Impact: 60–90 days)**

Bringing forward deals that were expected to close in 90 days. This requires identifying your three or four best-qualified opportunities and concentrating sales effort on them exclusively. Not expanding the pipeline — compressing the timeline on the deals most likely to close.

**The Sequencing Rule**

Levers 1–4 can and should be executed in parallel. Lever 5 should only follow if the first four are insufficient to reach the target runway. Lever 6 runs in parallel throughout — but it's a forecast, not a guarantee, so don't count it until the contract is signed.

LedgerOS models all six levers in the Scenario Engine, letting you see the combined impact before you commit to any single action.
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
