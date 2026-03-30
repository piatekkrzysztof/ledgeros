import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#EDE8DB",
        ink: "#0C0C0A",
        blue: {
          DEFAULT: "#0047FF",
          light: "#EBF0FF",
          mid: "#C2D3FF",
        },
        lime: {
          DEFAULT: "#C8FF00",
          light: "#F5FFB0",
          dark: "#4B6B00",
        },
        ledger: {
          muted: "#6E6B62",
          border: "#C0BAB0",
          subtle: "#E4DED4",
          surface: "#E8E2D3",
          card: "#F2EDE0",
        },
        danger: "#FF3B30",
        success: "#28A745",
      },
      fontFamily: {
        display: ["var(--font-syne)", "Arial Black", "sans-serif"],
        mono: ["var(--font-space-mono)", "Courier New", "monospace"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(9px, 0.8vw, 11px)",
        "fluid-sm": "clamp(12px, 1vw, 14px)",
        "fluid-base": "clamp(13px, 1.1vw, 16px)",
        "fluid-lg": "clamp(16px, 1.5vw, 20px)",
        "fluid-xl": "clamp(20px, 2vw, 28px)",
        "fluid-2xl": "clamp(24px, 2.8vw, 36px)",
        "fluid-3xl": "clamp(30px, 4vw, 52px)",
        "fluid-4xl": "clamp(40px, 5.6vw, 88px)",
        "fluid-hero": "clamp(52px, 8vw, 120px)",
      },
      spacing: {
        "page": "clamp(16px, 5vw, 64px)",
        "section": "clamp(56px, 8vh, 104px)",
      },
      boxShadow: {
        neo: "5px 5px 0 #0C0C0A",
        "neo-sm": "3px 3px 0 #0C0C0A",
        "neo-lg": "8px 8px 0 #0C0C0A",
        "neo-blue": "7px 7px 0 #0047FF",
        "neo-hover": "7px 7px 0 #0C0C0A",
      },
      borderWidth: {
        DEFAULT: "2px",
        "1": "1px",
        "2": "2px",
      },
      keyframes: {
        scrollx: {
          to: { transform: "translateX(-50%)" },
        },
        livepulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.25", transform: "scale(0.85)" },
        },
        breathe: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.04)" },
        },
      },
      animation: {
        scrollx: "scrollx 32s linear infinite",
        livepulse: "livepulse 2.2s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
