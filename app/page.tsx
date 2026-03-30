import { Nav } from "@/components/Nav";
import { Ticker } from "@/components/Ticker";
import { Hero } from "@/components/Hero";
import { KpiStrip } from "@/components/KpiStrip";
import { Features } from "@/components/Features";
import { ScenarioEngine } from "@/components/ScenarioEngine";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Ticker />
      <Hero />
      <KpiStrip />
      <Features />
      <ScenarioEngine />
      <Pricing />
      <Footer />
    </main>
  );
}
