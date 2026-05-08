"use client";

import { Suspense, useMemo, useState } from "react";
import { buttonModules } from "@/content/site";

const COLOR_NAMES: Record<string, string> = {
  // Grayscale / Industriale
  "#000000": "Deep Carbon",
  "#333333": "Space Gray",
  "#666666": "Steel Matte",
  "#999999": "Titanium Raw",
  "#CCCCCC": "Anodized Silver",
  "#FFFFFF": "Ghost White",

  // Roșu / Oxide
  "#FF0000": "Racing Red",
  "#CC0000": "Crimson Bolt",
  "#990000": "Blood Cell",
  "#FF6666": "Coral Circuit",
  "#FFCCCC": "Soft Blossom",
  "#800000": "Dark Oxide",

  // Verde / Kinetic
  "#00FF00": "Neon Kinetic",
  "#00CC00": "Signal Green",
  "#009900": "Cyber Moss",
  "#66FF66": "Bio Hazard",
  "#CCFFCC": "Mint Logic",
  "#008000": "Forest Protocol",

  // Albastru / Sonic
  "#0000FF": "Sonic Blue",
  "#0000CC": "Electric Pulse",
  "#000099": "Deep Sea Core",
  "#6666FF": "Plasma Blue",
  "#CCCCFF": "Cloud Buffer",
  "#000080": "Midnight Navy",

  // Galben / Cyber
  "#FFFF00": "Cyber Yellow",
  "#CCCC00": "Industrial Gold",
  "#999900": "Acid Olive",
  "#FFFF66": "Laser Lemon",
  "#FFFFCC": "Pale Voltage",
  "#808000": "Antique Brass",

  // Cyan / Aqua
  "#00FFFF": "Hyper Cyan",
  "#00CCCC": "Turquoise Link",
  "#22D3EE": "Sky Matrix",
  "#66FFFF": "Ice Flow",
  "#CCFFFF": "Static Mist",
  "#008080": "Dark Teal",

  // Magenta / Purple
  "#FF00FF": "Digital Violet",
  "#CC00CC": "Ultra Magenta",
  "#990099": "Deep Orchid",
  "#FF66FF": "Synth Wave",
  "#FFCCFF": "Pink Nebula",
  "#800080": "Void Purple"
};

// Am eliminat duplicatele pentru a scapa de eroarea de consola 
const PRESET_HUES = [
  "#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF",
  "#FF0000", "#CC0000", "#990000", "#FF6666", "#FFCCCC", "#800000",
  "#00FF00", "#00CC00", "#009900", "#66FF66", "#CCFFCC", "#008000",
  "#0000FF", "#0000CC", "#000099", "#6666FF", "#CCCCFF", "#000080",
  "#FFFF00", "#CCCC00", "#999900", "#FFFF66", "#FFFFCC", "#808000",
  "#00FFFF", "#00CCCC", "#22D3EE", "#66FFFF", "#CCFFFF", "#008080", // Am pus un Cyan diferit aici
  "#FF00FF", "#CC00CC", "#990099", "#FF66FF", "#FFCCFF", "#800080"
];

const ARTWORK_OPTIONS = [
  { id: "solid", name: "Solid Minimal" },
  { id: "honeycomb", name: "Hex-Grid" },
  { id: "cyber", name: "Cyber-Lines" },
  { id: "pro-grip", name: "Pro Texture" },
];

const ALL_SWITCHES = [
  ...buttonModules,
  { id: "btn-kailh", name: "Kailh GM 8.0", description: "The king of crispness. Heavy tactile click." },
  { id: "btn-ttc", name: "TTC Gold Dust", description: "Ultra-fast rebound, great for spam clicking." },
  { id: "btn-silent", name: "Silent Stealth", description: "Tactile feel without the acoustic signature." }
];

function MarketplaceContent() {
  // Dacă găsește codul în listă, pune numele. Dacă e o culoare custom, pune "Custom Hue"
  const [step, setStep] = useState<number>(1);
  const [customColor, setCustomColor] = useState("#9B2222");
  const [isSaving, setIsSaving] = useState(false);

  const colorDisplayName = COLOR_NAMES[customColor.toUpperCase()] || "Kinetic Custom Hue";
  
  const [selectedButtonId, setSelectedButtonId] = useState<string>(ALL_SWITCHES[0].id);
  const [moduleArtwork, setModuleArtwork] = useState({
    left: "solid",
    right: "honeycomb",
    back: "cyber",
  });

  const activeButton = useMemo(() => 
    ALL_SWITCHES.find(b => b.id === selectedButtonId) || ALL_SWITCHES[0]
  , [selectedButtonId]);

  async function handleOrder() {
    setIsSaving(true);
    const payload = {
      baseColor: customColor,
      switchType: activeButton.name,
      modules: moduleArtwork
    };

    try {
      const response = await fetch("/api/kinetic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("KINETIC BUILD SECURED! Configurația a fost salvată în baza de date.");
      } else {
        alert("Eroare la salvare. Verifică baza de date.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="min-h-screen bg-white px-4 py-32 text-black sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 xl:grid-cols-[1fr_400px]">
        <div className="space-y-12">
          <header className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter italic uppercase">Kinetic Builder</h1>
          </header>

          <div className="flex gap-8 border-b border-black pb-8 text-[10px] font-black uppercase tracking-[0.3em]">
            <div className={step === 1 ? "text-black" : "text-gray-300"}>01. Base Color</div>
            <div className={step === 2 ? "text-black" : "text-gray-300"}>02. Switches</div>
            <div className={step === 3 ? "text-black" : "text-gray-300"}>03. Modules</div>
          </div>

          <div className="min-h-[500px]">
            {step === 1 && (
              <div className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  
                  {/* Selector Grid fara erori */}
                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Foundation Color:</p>
                    <div className="grid grid-cols-6 gap-2 p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {PRESET_HUES.map((h, index) => (
                        <div 
                          key={`${h}-${index}`} // Cheie unica garantata 
                          onClick={() => setCustomColor(h)}
                          style={{ backgroundColor: h }}
                          className={`aspect-square cursor-pointer border-2 transition-transform hover:scale-105 ${customColor === h ? 'border-black scale-110' : 'border-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Previzualizare Centrata corect */}
                  <div className="flex flex-col items-center justify-center p-12 border-2 border-black bg-gray-50 relative">
                    <p className="absolute top-4 text-[10px] font-black uppercase text-gray-400">Live View</p>
                    
                    {/* Cercul cu umbra drop-shadow centrat */}
                    <div 
                      className="w-48 h-48 rounded-full border-4 border-black transition-all duration-300"
                      style={{ 
                        backgroundColor: customColor,
                        filter: "drop-shadow(12px 12px 0px #000000)" 
                      }}
                    />
                    
                    <div className="mt-16 text-center">
                       <input 
                        type="text" 
                        value={customColor} 
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-32 bg-transparent text-center text-2xl font-black italic uppercase tracking-tighter focus:outline-none border-b-2 border-black"
                       />
                    </div>
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="mt-16 bg-black text-white px-12 py-5 text-xs font-black uppercase tracking-[0.2em] hover:invert transition">
                  Confirm Selection
                </button>
              </div>
            )}
            
            {step === 2 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="mb-8 text-2xl font-light uppercase tracking-tighter">Tactical Response (Switch Selection)</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {ALL_SWITCHES.map(btn => (
                    <div 
                      key={btn.id} 
                      onClick={() => setSelectedButtonId(btn.id)}
                      className={`cursor-pointer border-2 p-8 transition-all ${selectedButtonId === btn.id ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-black'}`}
                    >
                      <h3 className="text-xl font-black uppercase italic tracking-tighter">{btn.name}</h3>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{btn.description}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-12">
                  <button onClick={() => setStep(1)} className="border-2 border-black px-10 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition">Back</button>
                  <button onClick={() => setStep(3)} className="bg-black text-white flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition hover:invert">Next: Module Artwork</button>
                </div>
              </div>
            )}

            {/* PASUL 3: MODULES (Rămâne la fel, dar curățat) */}
            {step === 3 && (
              <div className="animate-in fade-in duration-500 space-y-12">
                <h2 className="text-2xl font-light uppercase tracking-tighter">Magnetic Module Finish</h2>
                {['left', 'right', 'back'].map(pos => (
                  <div key={pos} className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{pos} Panel</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {ARTWORK_OPTIONS.map(art => (
                        <button 
                          key={art.id}
                          onClick={() => setModuleArtwork({...moduleArtwork, [pos]: art.id})}
                          className={`p-4 border-2 text-[10px] font-black uppercase tracking-tighter transition-all ${moduleArtwork[pos as keyof typeof moduleArtwork] === art.id ? 'bg-black text-white border-black' : 'border-gray-100 hover:border-black'}`}
                        >
                          {art.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={() => setStep(2)} className="border-2 border-black px-10 py-5 text-[10px] font-black uppercase tracking-widest">Back</button>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY SIDEBAR */}
        <aside className="h-fit border-2 border-black p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] lg:sticky lg:top-32 bg-white">
          <p className="text-[10px] font-black tracking-[0.4em] text-black uppercase border-b border-black pb-4 mb-10">Live Configuration</p>
          <div className="space-y-8">
           <div>
  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Foundation</p>
  <div className="flex items-center gap-3 mt-3">
    <div 
      className="w-5 h-5 rounded-full border-2 border-black" 
      style={{ 
        backgroundColor: customColor,
        filter: "drop-shadow(3px 3px 0px #000000)" // Aceasta este umbra care lipsea
      }} 
    />
    <p className="text-sm font-black uppercase tracking-tighter">{colorDisplayName}</p>
  </div>
</div> 
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Switches</p>
              <p className="mt-2 text-sm font-black uppercase italic">{activeButton.name}</p>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Artwork Profile</p>
              {Object.entries(moduleArtwork).map(([pos, val]) => (
                <div key={pos} className="flex justify-between text-[11px] font-black border-b border-gray-100 pb-2">
                  <span className="text-gray-400 uppercase">{pos}</span>
                  <span className="uppercase">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 pt-8 border-t-2 border-black">
             <div className="flex justify-between text-4xl font-black italic tracking-tighter">
                <span>TOTAL</span>
                <span>$129</span>
             </div>
          </div>
          <button
  disabled={step < 3 || isSaving}
  onClick={handleOrder} // Am adăugat funcția de click aici
  className="mt-10 w-full bg-black text-white py-6 text-xs font-black tracking-[0.3em] uppercase border-2 border-black transition hover:invert disabled:opacity-20"
>
  {isSaving ? "SYNCING..." : "ORDER KINETIC BUILD"}
</button>
        </aside>
      </div>
    </section>
  );
}

export function MarketplacePage() {
  return (
    <Suspense fallback={<div className="p-20 font-black uppercase tracking-[0.5em]">Syncing Kinetic...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}