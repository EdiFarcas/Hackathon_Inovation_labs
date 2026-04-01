import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { SiteShell } from "@/components/common/SiteShell";
import { HubSetupCard } from "@/components/hub/HubSetupCard";
import { hubSetups, storeModules } from "@/content/site";

export const metadata: Metadata = {
  title: "KOVA Hub",
  description: "Browse and share community configuration presets.",
};

export default function HubPage() {
  const moduleMap = new Map(storeModules.map((module) => [module.id, module]));

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Community"
        title="Preset Exchange For Competitive Players"
        description="Clone proven sensor-switch combinations from pro players and adapt them to your style."
      />
      <section className="py-20">
        <div className="container mx-auto grid gap-5 px-8 md:grid-cols-2">
          {hubSetups.map((setup) => {
            const modulesInSetup = setup.moduleIds
              .map((moduleId) => moduleMap.get(moduleId))
              .filter((module) => module !== undefined);

            return (
              <HubSetupCard key={setup.id} setup={setup} modulesInSetup={modulesInSetup} />
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
