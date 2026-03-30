import type { Metadata } from "next";
import { Syne, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LedgerOS — Cashflow Intelligence",
  description:
    "Real-time cashflow intelligence dla startupów, które nie mogą sobie pozwolić na niespodzianki.",
  keywords: ["fintech", "cashflow", "startup", "runway", "burn rate", "SaaS"],
  openGraph: {
    title: "LedgerOS — Cashflow Intelligence",
    description: "Know your burn. Extend your runway.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
