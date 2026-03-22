import { FeaturesSection } from "./FeaturesSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { ProblemVsCovaSection } from "./ProblemVsCovaSection";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProblemVsCovaSection />
      <FeaturesSection />
      <FinalCtaSection />
    </>
  );
}
