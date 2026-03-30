export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
};

export const JOBS: Job[] = [
  {
    id: "swe-fullstack",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (EU)",
    type: "Full-time",
    level: "Senior",
    description:
      "Own core product surfaces — from data pipeline to UI. You'll work across the stack: Next.js, TypeScript, PostgreSQL, and internal financial APIs.",
  },
  {
    id: "pm-growth",
    title: "Product Manager — Growth",
    department: "Product",
    location: "Warsaw / Remote",
    type: "Full-time",
    level: "Mid–Senior",
    description:
      "Define and ship the features that move activation, retention, and expansion. You'll work directly with founders and customer-facing teams.",
  },
  {
    id: "design-product",
    title: "Product Designer",
    department: "Design",
    location: "Remote (EU)",
    type: "Full-time",
    level: "Mid",
    description:
      "Design the most precise financial UI in the market. Systems thinker first, visual craftsperson second. Figma + deep attention to data density.",
  },
  {
    id: "ae-smb",
    title: "Account Executive — SMB",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "Run the full sales cycle for Series A/B startups. You'll close deals, collect intelligence from prospects, and feed signal directly into product roadmap.",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    department: "Engineering",
    location: "Remote (EU/US)",
    type: "Full-time",
    level: "Senior",
    description:
      "Build the infrastructure that makes real-time cashflow possible. Stream processing, financial data normalization, reconciliation pipelines.",
  },
  {
    id: "cs-lead",
    title: "Customer Success Lead",
    department: "Customer Success",
    location: "Warsaw / Remote",
    type: "Full-time",
    level: "Mid–Senior",
    description:
      "Own onboarding and retention for our Series A+ customers. Turn technical users into power users and power users into advocates.",
  },
];
