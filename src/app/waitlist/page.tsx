import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { SiteShell } from "@/components/common/SiteShell";
import { getSiteCopy } from "@/content/site";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Join the KOVA Kinetic launch waitlist.",
};

export default function WaitlistPage() {
  const copy = getSiteCopy("en");

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Early Access"
        title={copy.waitlist.title}
        description={copy.waitlist.subtitle}
      />
      <section className="py-20">
        <div className="container mx-auto max-w-2xl px-8">
          <div className="bg-surface-container border-outline-variant/30 border p-8">
            <h2 className="text-2xl font-bold tracking-tighter text-on-surface">Join The Priority Queue</h2>
            <p className="text-on-surface-variant mt-3 text-sm leading-relaxed">
              We only ship in controlled production waves. Leave your email and
              we will notify you when your batch opens.
            </p>
            <div className="mt-8">
              <WaitlistForm source="waitlist-page" layout="stacked" />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
