"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { baseKits, buttonModules, shellModules, extraModules } from "@/content/site";

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const presetName = searchParams.get("preset");

  const [step, setStep] = useState<number>(1);
  const [selectedKitId, setSelectedKitId] = useState<string>(baseKits[0].id);
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [selectedShellId, setSelectedShellId] = useState<string | null>(null);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);

  // Find actual objects from selected IDs
  const selectedKit = useMemo(() => baseKits.find(k => k.id === selectedKitId) || baseKits[0], [selectedKitId]);
  const selectedButton = useMemo(() => buttonModules.find(b => b.id === selectedButtonId), [selectedButtonId]);
  const selectedShell = useMemo(() => shellModules.find(s => s.id === selectedShellId), [selectedShellId]);
  const selectedExtrasList = useMemo(() => extraModules.filter(e => selectedExtraIds.includes(e.id)), [selectedExtraIds]);

  const totalPrice = useMemo(() => {
    let total = selectedKit.price;
    // Switches and shells are included in the kit — only extras add cost
    selectedExtrasList.forEach(e => total += e.price);
    return total;
  }, [selectedKit, selectedExtrasList]);

  const toggleExtra = (id: string) => {
    setSelectedExtraIds(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const [hideBanner, setHideBanner] = useState(false);

  const stepsInfo = [
    { num: 1, label: "Base Kit" },
    { num: 2, label: "Switches" },
    { num: 3, label: "Shell" },
    { num: 4, label: "Extras" }
  ];

  return (
    <section className="min-h-screen bg-white px-4 py-32 text-black sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 xl:grid-cols-[1fr_360px]">
        {/* BUILDER AREA */}
        <div className="space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl font-light tracking-tighter text-black md:text-5xl">
              Configurator
            </h1>
            <p className="max-w-xl text-lg font-light leading-relaxed text-gray-600">
              Build your KOVA loadout from the ground up or expand your existing ecosystem. Start with a chassis, pick your acoustics, and finalize with pro attachments.
            </p>

            {presetName && !hideBanner && (
              <div className="mt-4 flex items-center justify-between rounded-md border border-black bg-gray-50 px-4 py-3">
                <span className="text-sm font-bold text-black">Loaded config: {presetName}</span>
                <button aria-label="Dismiss" onClick={() => setHideBanner(true)} className="text-black hover:opacity-70">✕</button>
              </div>
            )}
          </header>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {stepsInfo.map(s => (
              <div key={s.num} className="flex items-center gap-3">
                <div 
                  onClick={() => { if (step > s.num) setStep(s.num); }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-all ${
                    step === s.num 
                      ? 'border-black bg-black text-white' 
                      : step > s.num 
                        ? 'border-black bg-white cursor-pointer hover:bg-gray-100 text-black' 
                        : 'border-gray-200 bg-transparent text-gray-400'
                  }`}
                >
                  {s.num}
                </div>
                <span 
                  onClick={() => { if (step > s.num) setStep(s.num); }}
                  className={`text-xs tracking-widest uppercase transition-colors md:block hidden ${
                    step === s.num 
                      ? 'font-bold text-black' 
                      : step > s.num 
                        ? 'text-black cursor-pointer hover:text-gray-600' 
                        : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
                {s.num !== 4 && <div className="h-px w-6 lg:w-12 bg-gray-200 mx-1 lg:mx-2 hidden sm:block" />}
              </div>
            ))}
          </div>

          <div className="min-h-[500px]">
            {/* STEP 1: KIT */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-xl font-light tracking-tight text-black">1. Choose your Foundation</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {baseKits.map(kit => (
                    <div 
                      key={kit.id} 
                      onClick={() => setSelectedKitId(kit.id)}
                      className={`cursor-pointer rounded-md border p-8 transition-all duration-200 ${selectedKitId === kit.id ? 'border-2 border-black bg-gray-50/50 shadow-sm' : 'border-gray-200 bg-white hover:border-black'}`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-light">{kit.name}</h3>
                          <span className="text-lg font-medium">${kit.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-8 flex-grow">{kit.description}</p>
                        <ul className="space-y-2 border-t border-gray-200 pt-6">
                          {kit.includes.map(inc => (
                            <li key={inc} className="text-xs text-gray-500 tracking-wide uppercase">• {inc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setStep(2)} className="rounded-md border border-black bg-black px-12 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase hover:bg-transparent hover:text-black transition">Next Step</button>
                </div>
              </div>
            )}

            {/* STEP 2: SWITCHES */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-xl font-light tracking-tight text-black">2. Main Button Actions</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {buttonModules.map(btn => (
                    <div 
                      key={btn.id} 
                      onClick={() => setSelectedButtonId(btn.id)}
                      className={`cursor-pointer rounded-md border p-8 transition-all duration-200 ${selectedButtonId === btn.id ? 'border-2 border-black bg-gray-50/50 shadow-sm' : 'border-gray-200 bg-white hover:border-black'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-light">{btn.name}</h3>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Included</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-6">{btn.description}</p>
                      <ul className="flex gap-2">
                        {btn.specs.map(spec => (
                          <li key={spec} className="rounded-sm bg-gray-100 px-2 py-1 text-[10px] uppercase tracking-widest text-gray-600">{spec}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(1)} className="rounded-md border border-gray-300 px-8 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase hover:border-black transition">Back</button>
                  <button onClick={() => setStep(3)} disabled={!selectedButtonId} className="rounded-md border border-black bg-black px-12 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase hover:bg-transparent hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
                </div>
              </div>
            )}

            {/* STEP 3: SHELL */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-xl font-light tracking-tight text-black">3. Outer Shell Geometry</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {shellModules.map(shell => (
                    <div 
                      key={shell.id} 
                      onClick={() => setSelectedShellId(shell.id)}
                      className={`cursor-pointer rounded-md border p-8 transition-all duration-200 ${selectedShellId === shell.id ? 'border-2 border-black bg-gray-50/50 shadow-sm' : 'border-gray-200 bg-white hover:border-black'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-light">{shell.name}</h3>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Included</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-6">{shell.description}</p>
                      <ul className="flex flex-wrap gap-2">
                        {shell.specs.map(spec => (
                          <li key={spec} className="rounded-sm bg-gray-100 px-2 py-1 text-[10px] uppercase tracking-widest text-gray-600">{spec}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(2)} className="rounded-md border border-gray-300 px-8 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase hover:border-black transition">Back</button>
                  <button onClick={() => setStep(4)} disabled={!selectedShellId} className="rounded-md border border-black bg-black px-12 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase hover:bg-transparent hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
                </div>
              </div>
            )}

            {/* STEP 4: EXTRAS */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-xl font-light tracking-tight text-black">4. Eco-System & Extra Modules</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {extraModules.map(extra => {
                    const isSelected = selectedExtraIds.includes(extra.id);
                    return (
                      <div 
                        key={extra.id} 
                        className={`rounded-md border p-6 transition-all duration-200 flex flex-col justify-between ${isSelected ? 'border-2 border-black bg-gray-50/50 shadow-sm' : 'border-gray-200 bg-white'}`}
                      >
                        <div>
                          <p className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400 mb-2">{extra.category}</p>
                          <h3 className="text-lg font-light mb-3 text-black">{extra.name}</h3>
                          <p className="text-xs text-gray-600 mb-6 leading-relaxed">{extra.description}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                          <span className="text-sm font-medium text-black">${extra.price}</span>
                          <button onClick={() => toggleExtra(extra.id)} className={`rounded-sm border px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition ${isSelected ? 'border-black bg-black text-white hover:bg-transparent hover:text-black' : 'border-gray-300 bg-transparent text-black hover:border-black'}`}>
                            {isSelected ? 'Remove' : 'Add'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-12 flex justify-between border-t border-gray-200 pt-8">
                  <button onClick={() => setStep(3)} className="rounded-md border border-gray-300 px-8 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase hover:border-black transition">Back</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CART SUMMARY STICKY */}
        <aside className="h-fit rounded-md border border-black bg-white p-8 shadow-sm lg:sticky lg:top-32" aria-label="Cart summary">
          <p className="text-[10px] tracking-[0.3em] font-bold text-black uppercase">Live Configuration</p>
          
          <div className="mt-8 space-y-5 text-sm">
            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
              <div>
                <p className="font-bold text-black">{selectedKit.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Base Kit</p>
              </div>
              <span className="font-medium text-black">${selectedKit.price}</span>
            </div>

            <div className={`flex justify-between items-start pb-4 border-b border-gray-100 transition-opacity ${!selectedButton ? 'opacity-30' : ''}`}>
              <div>
                <p className="font-bold text-black">{selectedButton?.name || 'Select Switches'}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Actions</p>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{selectedButton ? 'Included' : '--'}</span>
            </div>

            <div className={`flex justify-between items-start pb-4 border-b border-gray-100 transition-opacity ${!selectedShell ? 'opacity-30' : ''}`}>
              <div>
                <p className="font-bold text-black">{selectedShell?.name || 'Select Shell'}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Body</p>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{selectedShell ? 'Included' : '--'}</span>
            </div>

            {selectedExtrasList.length > 0 && (
              <div className="pt-2 space-y-3">
                <p className="text-[10px] tracking-[0.3em] font-bold text-gray-400 uppercase mb-4">Extra Modules</p>
                {selectedExtrasList.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-gray-600 text-xs">
                    <span>{item.name}</span>
                    <span className="text-black font-medium">${item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-black pt-6">
            <div className="flex items-center justify-between text-2xl font-light tracking-tighter text-black">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedShell || !selectedButton || step < 4}
            className="mt-8 w-full rounded-md border border-black bg-black px-4 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition hover:bg-transparent hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
          >
            Checkout Loadout
          </button>
          
          {(!selectedShell || !selectedButton || step < 4) && (
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest transition-opacity">
              Complete setup to checkout
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

export function MarketplacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-black p-8">Loading configurator...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
