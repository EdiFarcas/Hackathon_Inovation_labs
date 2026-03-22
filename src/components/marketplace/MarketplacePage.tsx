"use client";

import { useMemo, useState } from "react";
import { Space_Mono } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { baseKit, storeModules } from "@/content/site";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function MarketplacePage() {
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
    <section className={`${spaceMono.className} min-h-screen bg-black px-4 py-28 text-white sm:px-8`}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 xl:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <header className="space-y-4">
            <p className="text-xs tracking-[0.2em] text-[#5CC596] uppercase">Store / Marketplace</p>
            <h1 className="text-3xl leading-tight font-bold tracking-tight text-white md:text-5xl">
              COVA Marketplace - Build Your Perfect Mouse
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[#A0A0A0] md:text-base">
              Start with the magnetic core, then stack upgrades that fit your
              playstyle. Build once. Evolve forever.
            </p>
            {presetName && (
              <p className="inline-block border border-[#2a3f34] bg-[#0c1712] px-3 py-2 text-xs tracking-[0.15em] text-[#5CC596] uppercase">
                Preset Loaded: {presetName}
              </p>
            )}
          </header>

          <section aria-labelledby="starter-kit-title" className="space-y-4">
            <h2 id="starter-kit-title" className="text-xl font-bold tracking-[0.1em] text-[#5CC596] uppercase">
              The Starter Kit
            </h2>

            <article className="rounded-none border border-[#1f1f1f] bg-[#070707] p-6 shadow-[0_0_0_1px_rgba(92,197,150,0.25)] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{baseKit.name}</h3>
                  <p className="text-sm text-[#A0A0A0] md:text-base">
                    {baseKit.description}
                  </p>
                  <p className="text-lg font-bold text-[#5CC596]">${baseKit.price}</p>
                </div>

                <button
                  type="button"
                  className="w-full border border-[#5CC596] bg-[#5CC596] px-5 py-3 text-sm font-bold tracking-[0.18em] text-black uppercase transition hover:brightness-110 md:w-auto"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          </section>

          <section aria-labelledby="modules-title" className="space-y-4">
            <h2 id="modules-title" className="text-xl font-bold tracking-[0.1em] text-[#5CC596] uppercase">
              Swappable Modules (The Ecosystem)
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {storeModules.map((module) => {
                const isSelected = selectedModules.includes(module.id);

                return (
                  <article
                    key={module.id}
                    className="flex h-full flex-col justify-between border border-[#1f1f1f] bg-[#060606] p-5"
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold leading-snug text-white">{module.name}</h3>
                      <p className="text-sm text-[#A0A0A0]">{module.description}</p>
                      <p className="text-base font-bold text-[#5CC596]">${module.price}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className={`mt-6 border px-4 py-2 text-xs font-bold tracking-[0.16em] uppercase transition ${
                        isSelected
                          ? "border-[#5CC596] bg-[#0e2018] text-[#5CC596]"
                          : "border-[#2a2a2a] bg-transparent text-white hover:border-[#5CC596]"
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

        <aside className="h-fit border border-[#1f1f1f] bg-[#050505] p-6 xl:sticky xl:top-28" aria-label="Cart summary">
          <p className="text-xs tracking-[0.2em] text-[#5CC596] uppercase">Cart Summary</p>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between text-white">
              <span>COVA Base Kit</span>
              <span>${baseKit.price}</span>
            </div>

            {selectedModuleItems.length === 0 && (
              <p className="text-xs text-[#A0A0A0]">No modules selected yet.</p>
            )}

            {selectedModuleItems.map((module) => (
              <div key={module.id} className="flex items-center justify-between text-[#A0A0A0]">
                <span>{module.name}</span>
                <span>${module.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#1f1f1f] pt-4">
            <div className="flex items-center justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span className="text-[#5CC596]">${totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full border border-[#5CC596] bg-[#5CC596] px-4 py-3 text-xs font-bold tracking-[0.2em] text-black uppercase transition hover:brightness-110"
          >
            Checkout
          </button>
        </aside>
      </div>
    </section>
  );
}
