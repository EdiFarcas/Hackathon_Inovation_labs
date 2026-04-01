import Image from "next/image";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

const valueProps = [
  {
    icon: "⬡",
    title: "Magnetic Modularity",
    description: "Snap components in seconds. No tools, no screws, no compromise.",
  },
  {
    icon: "⚡",
    title: "Zero Latency",
    description: "0.12ms click response. Up to 8000Hz polling rate ready.",
  },
  {
    icon: "∞",
    title: "Future-Proof",
    description: "Upgrade individual parts as tech evolves. Never buy a whole new mouse.",
  },
];

export function HeroSection() {
  return (
    <>
      {/* HERO — centered, full-screen */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-white px-8 pt-32 pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="rounded-full inline-flex items-center gap-2 border border-black/20 px-5 py-2 mb-12">
            <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-black uppercase">
              v.01 Prototype Live
            </span>
          </div>

          <h1 className="text-6xl font-light tracking-tighter text-black sm:text-7xl md:text-[7rem] leading-[0.9]">
            The last mouse<br />you&apos;ll ever buy.
          </h1>

          <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-gray-500 md:text-xl">
            Precision-engineered kinetic system. Magnetic modularity lets you swap sensors, switches, and shells in seconds.
          </p>

          <div className="mt-10 w-full max-w-md">
            <WaitlistForm
              source="hero"
              layout="inline"
              placeholder="ENTER EMAIL"
            />
          </div>
        </div>

        <div className="mt-16 w-full max-w-lg mx-auto">
          <Image
            className="h-auto w-full object-contain drop-shadow-2xl"
            alt="KOVA modular gaming mouse"
            src="/kova_hero_mouse.png"
            width={800}
            height={800}
            priority
          />
        </div>
      </section>

      {/* VALUE PROPS — 3 cards */}
      <section className="bg-white pb-32 pt-8">
        <div className="container mx-auto px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="rounded-md border border-gray-200 p-10 transition-colors hover:border-black"
              >
                <span className="text-3xl">{prop.icon}</span>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-black">
                  {prop.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-gray-500">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
