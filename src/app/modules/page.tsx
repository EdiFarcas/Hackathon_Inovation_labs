import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/common/PageIntro";
import { SiteShell } from "@/components/common/SiteShell";
import { baseKits, buttonModules, shellModules, extraModules } from "@/content/site";

const baseKit = baseKits[0];
const storeModules = [...buttonModules, ...shellModules, ...extraModules];
export const metadata: Metadata = {
  title: "Modules",
  description: "Detailed breakdown of KOVA Base Kit and modular upgrade ecosystem.",
};

export default function ModulesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Catalog"
        title="Base Kit + Swappable Modules"
        description="Understand exactly what ships in the KOVA core kit and how each module extends your performance profile."
      />
      <section className="py-32 bg-white">
        <div className="container mx-auto space-y-24 px-8">
          <article className="rounded-md border border-black p-12 lg:p-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] tracking-[0.3em] font-bold text-black uppercase">Starter Kit</p>
                <h2 className="mt-4 text-4xl lg:text-5xl font-light tracking-tighter text-black">{baseKit.name}</h2>
                <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-700">
                  {baseKit.description}
                </p>
              </div>
              <div className="text-3xl font-light text-black">${baseKit.price}</div>
            </div>

            <div className="rounded-md mt-12 grid gap-px bg-black border border-black overflow-hidden sm:grid-cols-2">
              {baseKit.includes.map((item) => (
                <div key={item} className="bg-white px-6 py-4 text-sm font-light text-black">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div>
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-bold tracking-[0.2em] text-black uppercase">
                Upgrade Modules
              </h3>
              <Link
                href="/store"
                className="rounded-md border border-black bg-black text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition hover:bg-transparent hover:text-black inline-flex justify-center"
              >
                View In Store
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {storeModules.map((module) => (
                <article key={module.id} className="rounded-md border border-black p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] font-bold text-black uppercase">{module.category} Module</p>
                    <h4 className="mt-4 text-2xl font-light tracking-tight text-black">{module.name}</h4>
                    <p className="mt-4 text-gray-600 font-light leading-relaxed">{module.description}</p>

                    <ul className="mt-8 space-y-3 text-xs font-light text-gray-700">
                      {module.specs.map((spec) => (
                        <li key={spec}>• {spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-black pt-6 text-xl font-light text-black">
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
