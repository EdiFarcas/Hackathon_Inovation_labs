import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/common/PageIntro";
import { SiteShell } from "@/components/common/SiteShell";
import { baseKit, storeModules } from "@/content/site";

export const metadata: Metadata = {
  title: "Modules",
  description: "Detailed breakdown of COVA Base Kit and modular upgrade ecosystem.",
};

export default function ModulesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Catalog"
        title="Base Kit + Swappable Modules"
        description="Understand exactly what ships in the COVA core kit and how each module extends your performance profile."
      />
      <section className="py-20">
        <div className="container mx-auto space-y-14 px-8">
          <article className="bg-surface-container-low border-primary/40 border p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-primary text-[10px] tracking-[0.2em] uppercase">Starter Kit</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tighter text-on-surface">{baseKit.name}</h2>
                <p className="text-on-surface-variant mt-3 max-w-2xl text-sm leading-relaxed">
                  {baseKit.description}
                </p>
              </div>
              <div className="text-primary text-2xl font-bold">${baseKit.price}</div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {baseKit.includes.map((item) => (
                <div key={item} className="bg-surface-container border-outline-variant/20 border px-4 py-3 text-sm text-on-surface">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h3 className="text-primary text-lg font-bold tracking-[0.1em] uppercase">
                Upgrade Modules
              </h3>
              <Link
                href="/store"
                className="bg-primary-container text-on-primary inline-flex w-full items-center justify-center px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase md:w-auto"
              >
                View In Store
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {storeModules.map((module) => (
                <article key={module.id} className="bg-surface-container-low border-outline-variant/30 border p-6">
                  <p className="text-primary text-[10px] tracking-[0.2em] uppercase">{module.category} Module</p>
                  <h4 className="mt-2 text-xl font-bold tracking-tight text-on-surface">{module.name}</h4>
                  <p className="text-on-surface-variant mt-3 text-sm leading-relaxed">{module.description}</p>

                  <ul className="mt-4 space-y-2 text-xs text-secondary">
                    {module.specs.map((spec) => (
                      <li key={spec}>• {spec}</li>
                    ))}
                  </ul>

                  <div className="mt-5 border-outline-variant/20 border-t pt-4 text-lg font-bold text-primary">
                    ${module.price}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
