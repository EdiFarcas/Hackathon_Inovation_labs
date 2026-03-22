import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { SiteShell } from "@/components/common/SiteShell";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for COVA Kinetic website.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Legal"
        title="Terms of Use"
        description="Conditions for accessing pre-launch assets and waitlist content."
      />
      <section className="py-20">
        <div className="container mx-auto max-w-3xl space-y-6 px-8 text-sm leading-relaxed text-[#c7d2ca]">
          <p>
            Content is provided for informational purposes and may change before
            commercial release.
          </p>
          <p>
            Access to alpha inventory is limited and distributed in waves based
            on product readiness and region.
          </p>
          <p>
            By using this website, you agree not to misuse forms, automation, or
            infrastructure endpoints.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
