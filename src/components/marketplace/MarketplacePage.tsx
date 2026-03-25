"use client";

import { Suspense, useMemo, useState } from "react";
import { Space_Mono } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { baseKit, storeModules } from "@/content/site";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const presetName = searchParams.get("preset");
  const modulesParam = searchParams.get("modules");

  const initialModulesFromHub = useMemo(() => {
    if (!modulesParam) {
      return [] as string[];
    }

    const allowedIds = new Set(storeModules.map((module) => module.id));

    return modulesParam
      .split(",")
      .map((item) => item.trim())
      .filter((id) => allowedIds.has(id));
  }, [modulesParam]);

  const [selectedModules, setSelectedModules] = useState<string[]>(() => initialModulesFromHub);

  const selectedModuleItems = useMemo(
    () => storeModules.filter((module) => selectedModules.includes(module.id)),
    [selectedModules],
  );

  const totalPrice = useMemo(
    () =>
      baseKit.price +
      selectedModuleItems.reduce((total, module) => total + module.price, 0),
    [selectedModuleItems],
  );

  function toggleModule(moduleId: string) {
    setSelectedModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  }

  return (
    <section className={`${spaceMono.className} min-h-screen bg-surface px-4 py-28 text-on-surface sm:px-8`}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 xl:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <header className="space-y-4">
            <p className="text-xs tracking-[0.2em] text-primary uppercase">Store / Marketplace</p>
            <h1 className="text-3xl leading-tight font-bold tracking-tight text-on-surface md:text-5xl">
              COVA Marketplace - Build Your Perfect Mouse
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
              Start with the magnetic core, then stack upgrades that fit your
              playstyle. Build once. Evolve forever.
            </p>
            {presetName && (
              <p className="inline-block border border-outline bg-surface-container-high px-3 py-2 text-xs tracking-[0.15em] text-primary uppercase">
                Preset Loaded: {presetName}
              </p>
            )}
          </header>

          <section aria-labelledby="starter-kit-title" className="space-y-4">
            <h2 id="starter-kit-title" className="text-xl font-bold tracking-[0.1em] text-primary uppercase">
              The Starter Kit
            </h2>

            <article className="rounded-none border border-outline-variant bg-surface-container p-6 shadow-[0_0_0_1px_var(--color-primary)] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{baseKit.name}</h3>
                  <p className="text-sm text-secondary md:text-base">
                    {baseKit.description}
                  </p>
                  <p className="text-lg font-bold text-primary">${baseKit.price}</p>
                </div>

                <button
                  type="button"
                  className="w-full border border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.18em] text-on-primary uppercase transition hover:brightness-110 md:w-auto"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          </section>

          <section aria-labelledby="modules-title" className="space-y-4">
            <h2 id="modules-title" className="text-xl font-bold tracking-[0.1em] text-primary uppercase">
              Swappable Modules (The Ecosystem)
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {storeModules.map((module) => {
                const isSelected = selectedModules.includes(module.id);

                return (
                  <article
                    key={module.id}
                    className="flex h-full flex-col justify-between border border-outline-variant bg-surface-container-lowest p-5"
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold leading-snug text-on-surface">{module.name}</h3>
                      <p className="text-sm text-secondary">{module.description}</p>
                      <p className="text-base font-bold text-primary">${module.price}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className={`mt-6 border px-4 py-2 text-xs font-bold tracking-[0.16em] uppercase transition ${
                        isSelected
                          ? "border-primary bg-primary-container text-primary"
                          : "border-outline-variant bg-transparent text-on-surface hover:border-primary"
                      }`}
                    >
                      {isSelected ? "Added" : "Add Module"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="h-fit border border-outline-variant bg-surface-container-lowest p-6 xl:sticky xl:top-28" aria-label="Cart summary">
          <p className="text-xs tracking-[0.2em] text-primary uppercase">Cart Summary</p>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between text-on-surface">
              <span>COVA Base Kit</span>
              <span>${baseKit.price}</span>
            </div>

            {selectedModuleItems.length === 0 && (
              <p className="text-xs text-secondary">No modules selected yet.</p>
            )}

            {selectedModuleItems.map((module) => (
              <div key={module.id} className="flex items-center justify-between text-secondary">
                <span>{module.name}</span>
                <span>${module.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-outline-variant pt-4">
            <div className="flex items-center justify-between text-lg font-bold text-on-surface">
              <span>Total</span>
              <span className="text-primary">${totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full border border-primary bg-primary px-4 py-3 text-xs font-bold tracking-[0.2em] text-on-primary uppercase transition hover:brightness-110"
          >
            Checkout
          </button>
        </aside>
      </div>
    </section>
  );
}

export function MarketplacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface text-on-surface p-8">Loading marketplace...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
