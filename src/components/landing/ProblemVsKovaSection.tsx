import { kovaAdvantages, legacyPainPoints } from "@/content/site";

export function ProblemVsKovaSection() {
  return (
    <section className="bg-white py-48">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2">
          <div className="rounded-l-md border border-black p-16 space-y-12">
            <h3 className="text-4xl font-light tracking-tighter text-black">
              Legacy Hardware
            </h3>
            <p className="max-w-xs text-lg leading-relaxed text-gray-700 font-light">
              Sensors age. Switches fail. Shells wear down. The traditional
              cycle forces you into planned obsolescence.
            </p>
            <ul className="space-y-6 pt-8 border-t border-black">
              {legacyPainPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-xs tracking-widest uppercase text-black"
                >
                  <span className="text-sm">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-r-md border border-black border-l-0 bg-black text-white p-16 space-y-12">
            <h3 className="text-4xl font-light tracking-tighter text-white">
              The KOVA Kinetic
            </h3>
            <p className="max-w-xs text-lg leading-relaxed text-gray-300 font-light">
              A living ecosystem. Upgrade individual components as technology
              evolves. Your muscle memory, preserved forever.
            </p>
            <ul className="space-y-6 pt-8 border-t border-white/20">
              {kovaAdvantages.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-xs tracking-widest uppercase text-white"
                >
                  <span className="text-sm text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
