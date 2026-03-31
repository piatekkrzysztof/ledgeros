# LedgerOS — Cashflow Intelligence

Platforma fintech zbudowana na pełnym stacku: **Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Recharts**

---

## Stack

| Technologia | Rola |
|---|---|
| Next.js 14 (App Router) | Framework, routing, SSR/SSG, `next/font` |
| TypeScript | Pełne typowanie, DX |
| Tailwind CSS | Design system, utility-first CSS |
| Framer Motion | Micro-interakcje, AnimatePresence, whileInView |
| GSAP + ScrollTrigger | Scroll-driven hero narrative (Wow Factor) |
| Recharts | Cashflow chart z custom tooltip i animacją |

---

## Uruchomienie lokalne

```bash
# 1. Wejdź do folderu
cd ledgeros

# 2. Zainstaluj zależności
npm install

# 3. Uruchom dev server
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

---

## Deploy na Render (bezpłatny)

### Opcja A — Static Export (najszybsze)

1. Dodaj do `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  output: "export",   // <-- dodaj tę linię
};
```

2. Wrzuć folder na GitHub jako nowe repo

3. Na [render.com](https://render.com):
   - **New → Static Site**
   - Połącz repo
   - Build Command: `npm install && npm run build`
   - Publish Directory: `out`
   - Kliknij **Deploy**

### Opcja B — Node.js Server (pełny SSR)

1. Na [render.com](https://render.com):
   - **New → Web Service**
   - Połącz repo
   - Runtime: **Node**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Kliknij **Deploy**

> Render automatycznie wykrywa Next.js i ustawia `PORT`.

---

## Struktura projektu

```
ledgeros/
├── app/
│   ├── layout.tsx          # Root layout + next/font (Syne, Space Mono, DM Sans)
│   ├── page.tsx            # Strona główna — kompozycja sekcji
│   └── globals.css         # Tailwind base + custom animations
├── components/
│   ├── Nav.tsx             # Sticky nav z Motion entrance
│   ├── Ticker.tsx          # Live metrics marquee
│   ├── Hero.tsx            # ★ Scroll-driven narrative (GSAP ScrollTrigger)
│   │                         AnimatePresence headline transitions
│   │                         Animated metric counter (requestAnimationFrame)
│   ├── CashflowChart.tsx   # Recharts AreaChart + custom tooltip
│   ├── KpiStrip.tsx        # 4 KPI z whileInView stagger
│   ├── Features.tsx        # Grid 6 capabilities z hover
│   ├── ScenarioEngine.tsx  # Interactive scenario selector
│   ├── Pricing.tsx         # Billing toggle + animated price
│   └── Footer.tsx          # Dark footer
├── lib/
│   └── constants.ts        # Wszystkie dane i design tokeny
├── tailwind.config.ts      # Custom design system
├── next.config.ts
└── tsconfig.json
```

---

## Wow Factor — jak działa Hero

`components/Hero.tsx` implementuje **scroll-driven financial narrative**:

1. **GSAP ScrollTrigger** — kontener hero ma `min-height: 400vh`. Panel jest `sticky`. Przy każdym progu scrollu (25%, 50%, 75%) zmienia się stage narracji.

2. **Framer Motion AnimatePresence** — nagłówki i subtext wychodzą/wchodzą z `mode="wait"` dla płynnych przejść.

3. **Animated counter** — metryki liczą się od 40% wartości docelowej do 100% po zmianie stage (custom hook `useCounter` z `requestAnimationFrame`).

4. **Auto-advance fallback** — jeśli użytkownik nie scrolluje, narracja przesuwa się automatycznie co 4.5s.

5. **Recharts breathe** — wykres ma klasę `chart-breathe` z CSS `scaleY` keyframe — delikatnie "oddycha".

---

## Dopracowywanie

- **Nowe kolory** → `tailwind.config.ts` → `theme.extend.colors`
- **Nowe etapy narracji** → `lib/constants.ts` → `HERO_STAGES`
- **Dane wykresu** → `lib/constants.ts` → `CASHFLOW_DATA`
- **Scroll timing** → `Hero.tsx` → `ScrollTrigger.create({ start: ... })`
- **Animacje** → dostosuj `duration` i `ease` w komponentach Motion
