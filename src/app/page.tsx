import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { MarketShift } from "@/components/MarketShift";
import { TheProblem } from "@/components/TheProblem";
import { Positioning } from "@/components/Positioning";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductInvestigation } from "@/components/ProductInvestigation";
import { TwoWayInvestigation } from "@/components/TwoWayInvestigation";
import { RelationshipGraph } from "@/components/RelationshipGraph";
import { HistoricalReplay } from "@/components/HistoricalReplay";
import { Benefits } from "@/components/Benefits";
import { UseCases } from "@/components/UseCases";
import { Integrations } from "@/components/Integrations";
import { WhoItsFor } from "@/components/WhoItsFor";
import { EarlyStage } from "@/components/EarlyStage";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <MarketShift />
        <TheProblem />
        <Positioning />
        <HowItWorks />
        <ProductInvestigation />
        <TwoWayInvestigation />
        <RelationshipGraph />
        <HistoricalReplay />
        <Benefits />
        <UseCases />
        <Integrations />
        <WhoItsFor />
        <EarlyStage />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
