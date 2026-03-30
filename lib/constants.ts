// ─── Design Tokens ────────────────────────────────────────────────────────────
export const COLORS = {
  bg: "#EDE8DB",
  ink: "#0C0C0A",
  blue: "#0047FF",
  lime: "#C8FF00",
  red: "#FF3B30",
  muted: "#6E6B62",
} as const;

// ─── Ticker data ──────────────────────────────────────────────────────────────
export const TICKER_ITEMS = [
  { label: "BRN", value: "$47K", suffix: "/mo", down: true },
  { label: "RNW", value: "14mo", suffix: "", down: false },
  { label: "MRR", value: "+23%", suffix: "", down: false },
  { label: "CASH", value: "$658K", suffix: "", down: false },
  { label: "FRCAST", value: "STABLE", suffix: "", down: false },
  { label: "ALERTS", value: "0", suffix: "", down: false },
  { label: "ARR", value: "$1.2M", suffix: "", down: false },
  { label: "CAC", value: "$340", suffix: "", down: true },
  { label: "LTV", value: "$4.2K", suffix: "", down: false },
  { label: "CHURN", value: "1.2%", suffix: "", down: true },
  { label: "NPS", value: "72", suffix: "", down: false },
  { label: "RATIO", value: "12.4x", suffix: "", down: false },
];

// ─── Hero narrative stages ────────────────────────────────────────────────────
export const HERO_STAGES = [
  {
    id: "pulse",
    label: "FINANCIAL PULSE",
    headline: ["Burn", "pod", "kontrolą."],
    sub: "Twój cashflow. Żywy, przewidywalny i zawsze o krok przed problemem.",
    metric: null,
    metricLabel: "",
    color: COLORS.blue,
  },
  {
    id: "runway",
    label: "SCENARIO ENGINE",
    headline: ["Runway", "extended."],
    sub: "Zidentyfikowaliśmy 3 obszary oszczędności. Scenariusz B przedłuża runway o 4 miesiące.",
    metric: "14 mo",
    metricLabel: "runway remaining",
    color: COLORS.lime,
  },
  {
    id: "forecast",
    label: "CASHFLOW INTEL",
    headline: ["Forecast", "stable."],
    sub: "MRR rośnie 23% miesiąc do miesiąca. Przy obecnym burn rate jesteś bezpieczny.",
    metric: "+23%",
    metricLabel: "MRR growth",
    color: COLORS.blue,
  },
  {
    id: "cash",
    label: "LIVE DATA",
    headline: ["$658K", "on hand."],
    sub: "Cash pod pełną kontrolą. Zero niespodzianek, zero paniki. Tylko dane.",
    metric: "$658K",
    metricLabel: "cash on hand",
    color: COLORS.ink,
  },
] as const;

// ─── Cashflow chart data ──────────────────────────────────────────────────────
export const CASHFLOW_DATA = [
  { month: "Jan", revenue: 62, burn: 55 },
  { month: "Feb", revenue: 71, burn: 58 },
  { month: "Mar", revenue: 58, burn: 61 },
  { month: "Apr", revenue: 84, burn: 57 },
  { month: "May", revenue: 90, burn: 63 },
  { month: "Jun", revenue: 103, burn: 59 },
  { month: "Jul", revenue: 88, burn: 65 },
  { month: "Aug", revenue: 115, burn: 62 },
  { month: "Sep", revenue: 124, burn: 60 },
  { month: "Oct", revenue: 108, burn: 64 },
  { month: "Nov", revenue: 139, burn: 58 },
  { month: "Dec", revenue: 158, burn: 47 },
];

// ─── KPI strip ────────────────────────────────────────────────────────────────
export const KPI_ITEMS = [
  {
    label: "Burn Rate",
    value: "$47K",
    badge: "↓ −3.2%",
    accent: COLORS.blue,
    badgeBg: "#EBF0FF",
    badgeColor: COLORS.blue,
  },
  {
    label: "Runway",
    value: "14 mo",
    badge: "+4 mo scenariusz B",
    accent: COLORS.lime,
    badgeBg: "#F5FFB0",
    badgeColor: "#4B6B00",
  },
  {
    label: "MRR Growth",
    value: "+23%",
    badge: "↑ tracking",
    accent: COLORS.blue,
    badgeBg: "#EBF0FF",
    badgeColor: COLORS.blue,
  },
  {
    label: "Cash on Hand",
    value: "$658K",
    badge: "stabilny",
    accent: COLORS.lime,
    badgeBg: "#F5FFB0",
    badgeColor: "#4B6B00",
  },
] as const;

// ─── Features ─────────────────────────────────────────────────────────────────
export const FEATURES = [
  {
    tag: "CORE",
    icon: "◈",
    title: "Forecasting cashflow",
    desc: "14-dniowy rolling forecast z modelowaniem scenariuszy. Znaj jutrzejsze saldo już dziś.",
  },
  {
    tag: "ALERTY",
    icon: "◉",
    title: "Burn Intelligence",
    desc: "Automatyczna detekcja anomalii burn rate z alertami zanim staną się problemem.",
  },
  {
    tag: "PLANNING",
    icon: "◫",
    title: "Runway Calculator",
    desc: "Dynamiczna projekcja runway oparta na realnych wzorcach wydatków, nie domysłach.",
  },
  {
    tag: "SCENARIUSZE",
    icon: "◬",
    title: "Scenario Engine",
    desc: "Modeluj rundę Q4, headcount lub miss przychodu — obok siebie, w czasie rzeczywistym.",
  },
  {
    tag: "SYNC",
    icon: "◭",
    title: "Integracje bankowe",
    desc: "Podłącz każde konto w 90 sekund. Real-time sync, zero opóźnień w reconciliacji.",
  },
  {
    tag: "TEAM",
    icon: "◮",
    title: "Dostęp zespołowy",
    desc: "Role-based access dla Finance, Ops i Foundera. Jedno źródło prawdy.",
  },
] as const;

// ─── Scenarios ────────────────────────────────────────────────────────────────
export const SCENARIOS = [
  {
    id: "baseline",
    name: "BASELINE",
    sub: "Obecny burn rate · $47K/mo",
    value: "$658K",
    delta: "cash on hand",
    deltaColor: COLORS.muted,
    runway: 58,
    months: "14 miesięcy",
  },
  {
    id: "raise",
    name: "SCENARIO A — Nowa runda",
    sub: "+$500K raise · Series Seed",
    value: "$1.16M",
    delta: "↑ +$502K",
    deltaColor: COLORS.blue,
    runway: 74,
    months: "18 miesięcy",
  },
  {
    id: "cut",
    name: "SCENARIO B — Cięcie kosztów",
    sub: "Burn do $32K/mo · ograniczony headcount",
    value: "+8 mo",
    delta: "↑ runway extended",
    deltaColor: "#28A745",
    runway: 86,
    months: "22 miesiące",
  },
  {
    id: "miss",
    name: "SCENARIO C — Miss przychodów",
    sub: "MRR flat · burn bez zmian",
    value: "−6 mo",
    delta: "↓ alarm runway",
    deltaColor: COLORS.red,
    runway: 34,
    months: "8 miesięcy",
  },
] as const;

// ─── Pricing ──────────────────────────────────────────────────────────────────
export const PLANS = [
  {
    tier: "Dla startupów",
    name: "Seed",
    priceM: 49,
    priceA: 39,
    desc: "Pierwsza klarowność finansowa dla wczesnego etapu.",
    features: [
      "Do 3 kont bankowych",
      "30-dniowy forecast",
      "Podstawowy burn tracking",
      "1 użytkownik",
    ],
    cta: "Zacznij za darmo",
    featured: false,
  },
  {
    tier: "Dla rosnących teamów",
    name: "Growth",
    priceM: 149,
    priceA: 119,
    desc: "Pełny Scenario Engine + alerty + team access.",
    features: [
      "Nieograniczone konta",
      "Scenario Engine",
      "Real-time alerty",
      "Do 5 użytkowników",
      "API access",
    ],
    cta: "Uruchom Growth",
    featured: true,
  },
  {
    tier: "Dla scale-upów",
    name: "Series",
    priceM: 399,
    priceA: 319,
    desc: "Pełna kontrola finansowa dla zespołów operacyjnych.",
    features: [
      "Wszystko z Growth",
      "Custom integracje",
      "White-label raporty",
      "Dedykowany CSM",
      "SLA 99.99%",
    ],
    cta: "Porozmawiaj z nami",
    featured: false,
  },
] as const;
