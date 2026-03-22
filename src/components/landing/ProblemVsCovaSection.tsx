import { covaAdvantages, legacyPainPoints } from "@/content/site";

export function ProblemVsCovaSection() {
  return (
    <section className="bg-surface-container-lowest py-32">
      <div className="container mx-auto px-8">
        <div className="grid gap-1 px-8 md:grid-cols-2">
          <div className="group relative space-y-8 overflow-hidden bg-black p-12">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-9xl">⌫</span>
            </div>
            <h3 className="text-on-surface-variant text-3xl font-bold tracking-tighter">
              Legacy Hardware
            </h3>
            <p className="text-outline max-w-xs text-sm leading-relaxed">
              Sensors age. Switches fail. Shells wear down. The traditional
              cycle forces you into planned obsolescence.
            </p>
            <ul className="space-y-4 pt-4">
              {legacyPainPoints.map((item) => (
                <li
                  key={item}
                  className="text-error/60 flex items-center gap-3 text-xs tracking-widest uppercase"
                >
                  <span className="text-sm">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-low border-primary/30 relative space-y-8 overflow-hidden border-l p-12">
            <div className="text-primary absolute top-0 right-0 p-4 opacity-20">
              <span className="text-9xl">◌</span>
            </div>
            <h3 className="text-primary text-3xl font-bold tracking-tighter">
              The COVA Kinetic
            </h3>
            <p className="text-on-surface-variant max-w-xs text-sm leading-relaxed">
              A living ecosystem. Upgrade individual components as technology
              evolves. Your muscle memory, preserved forever.
            </p>
            <ul className="space-y-4 pt-4">
              {covaAdvantages.map((item) => (
                <li
                  key={item}
                  className="text-primary flex items-center gap-3 text-xs tracking-widest uppercase"
                >
                  <span className="text-sm">✓</span>
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
