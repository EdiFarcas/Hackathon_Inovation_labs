import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/common/PageIntro";
import { SiteShell } from "@/components/common/SiteShell";

export const metadata: Metadata = {
  title: "Support",
  description: "Support resources for KOVA Kinetic launch users.",
};

const supportItems = [
  { title: "Email", value: "support@kova-kinetic.com" },
  { title: "Response window", value: "Monday - Friday, 09:00 - 18:00 EET" },
  { title: "Coverage", value: "Waitlist, module compatibility, launch timeline" },
];

export default function SupportPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Support"
        title="Need Help Before Launch?"
        description="Our team can assist with waitlist status, module pairing, and shipping regions."
      />
      <section className="py-20">
        <div className="container mx-auto max-w-3xl space-y-4 px-8">
          {supportItems.map((item) => (
            <div key={item.title} className="bg-surface-container-low border-outline-variant/20 border p-6">
              <p className="text-primary text-[10px] tracking-[0.2em] uppercase">{item.title}</p>
              <p className="text-on-surface mt-2 text-sm">{item.value}</p>
            </div>
          ))}
          <Link href="/waitlist" className="bg-primary-container text-on-primary inline-block px-5 py-3 text-xs tracking-[0.2em] uppercase">
            Join Waitlist
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
