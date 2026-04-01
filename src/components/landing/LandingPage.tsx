import { FeaturesSection } from "./FeaturesSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { ProblemVsKovaSection } from "./ProblemVsKovaSection";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProblemVsKovaSection />
      <FeaturesSection />
      <FinalCtaSection />
    </>
  );
}
