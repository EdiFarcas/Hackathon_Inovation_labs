import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { SiteShell } from "@/components/common/SiteShell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for KOVA Kinetic.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we process waitlist information and product analytics data."
      />
      <section className="py-20">
        <div className="container mx-auto max-w-3xl space-y-6 px-8 text-sm leading-relaxed text-secondary">
          <p>
            We collect your email address to manage launch communications and
            product release notifications.
          </p>
          <p>
            We do not sell personal data. Operational analytics are used only to
            improve conversion and usability.
          </p>
          <p>
            To request data deletion, email support@kova-kinetic.com from the
            address you used when joining the waitlist.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
