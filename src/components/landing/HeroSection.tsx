import Image from "next/image";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

const stats = [
  { value: "0.12ms", label: "Click Latency" },
  { value: "∞", label: "Lifecycle" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="from-primary-container/20 absolute top-1/4 right-0 h-full w-1/2 bg-gradient-to-l to-transparent blur-[120px]" />
        <div className="bg-surface-container-highest/10 absolute bottom-0 left-0 h-1/2 w-1/3 blur-[80px]" />
      </div>

      <div className="container mx-auto grid items-center gap-16 px-8 lg:grid-cols-2">
        <div className="relative z-10 space-y-8">
          <div className="bg-surface-container-high inline-flex items-center gap-3 border-l-2 border-primary px-3 py-1">
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
              v.01 Prototype Live
            </span>
          </div>

          <h1 className="text-6xl leading-[0.9] font-bold tracking-tighter text-on-surface md:text-8xl">
            The last mouse <br />you&apos;ll <span className="text-primary text-glow">ever</span> buy.
          </h1>

          <p className="text-on-surface-variant max-w-lg text-xl leading-relaxed font-light">
            A precision-engineered kinetic system. Magnetic modularity allows you
            to swap sensors, switches, and shells in seconds. Future-proof
            hardware for elite performance.
          </p>

          <WaitlistForm
            source="hero"
            layout="inline"
            placeholder="ENTER ACCESS CODE OR EMAIL"
          />

          <div className="flex gap-12 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold tracking-tighter text-on-surface">
                  {stat.value}
                </div>
                <div className="text-on-surface-variant text-[10px] tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="group relative">
          <div className="bg-primary/5 absolute -inset-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <Image
            className="border-outline-variant/20 h-auto w-full border object-cover grayscale shadow-2xl transition-all duration-700 hover:grayscale-0"
            alt="High-tech minimalist modular gaming mouse parts exploding view"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzZ5Y1SNZEZ2fm8JFG8flBgQu3D9ZYLWWkbD0Vzb2mngv20d3z7SpkTxhNET3vMXhAiv20zHwq2pbEeLD2Smvef2_Z2PFi2u35baA6TA5ELh96h06AyKlUXdcGa3nY2Q-j1rWTyL6Gq2kVbDrCJ4a1kKWxtqO7vGUMH7Vd2gs57Q9wmH1wxKdAyrKVEADEP0GtVvBGO-lFR7vOHhKzVE_X7ESK3h6PJFwJWt7qfz2sY8VFibpA7hxKosUXjW8FaZDnqwKaXJ6tCAo"
            width={1200}
            height={900}
            priority
          />
          <div className="glass-panel border-primary absolute bottom-4 left-4 border-l-2 p-4">
            <div className="text-primary text-[10px] font-bold tracking-widest uppercase">
              Assembly: X-1 Core
            </div>
            <div className="text-on-surface-variant mt-1 text-xs">
              Status: Calibrated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
