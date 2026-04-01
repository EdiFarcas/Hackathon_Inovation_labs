"use client";

import Image from "next/image";
import Link from "next/link";
import { setupPresets } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

export function FeaturesSection() {
  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Main Feature */}
          <div className="rounded-md border border-black flex flex-col justify-between p-12 md:col-span-8 md:p-24">
            <div className="space-y-8">
              <span className="text-[10px] font-bold tracking-[0.3em] text-black uppercase">
                Architecture
              </span>
              <h4 className="max-w-xl text-5xl font-light tracking-tighter text-black md:text-6xl">
                Magnetic Assembly. Snap-on Logic.
              </h4>
              <p className="max-w-md text-lg font-light text-gray-700 leading-relaxed">
                High-grade Neodymium magnets ensure zero-rattle structural
                integrity while allowing for 2-second module swaps. No screws.
                No tools. No compromise.
              </p>
            </div>
            <div className="relative mt-24 h-[400px]">
              <Image
                className="h-full w-full object-contain grayscale"
                alt="Close up of magnetic connectors on a high-end device"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuaHSjjbp32X9XFiGBNcJwuZSTrhpewv1pwrrzu4t7R2OWvVZxr1FiJ-LNz3aJ_ULyUA7a8LPmxApZxlB_R3jKyPE1sXlAOYC_KGrJWT8BFKegxOdGXba2o9cjUGjxktxBMYJOK9ofPShw97azCr1mvjvopggZ230ofKQ6hxU3wU7RhOkGlTCCdZ5SIP0SJaCkOoVwvXg0ewEONR-TaFEIqH0Nk7GqpDSI6KLHFJddbzGlvmjPS9m20J1BCMSECLbWLJip9j-CK70"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>

          {/* Secondary Feature */}
          <div className="rounded-md md:-ml-px md:col-span-4 border border-black flex flex-col justify-between p-12 md:p-16">
            <div className="rounded-md flex aspect-square w-full items-center justify-center border border-black mb-16">
              <span className="text-black text-8xl font-light">◎</span>
            </div>
            <div className="space-y-6">
              <h4 className="text-4xl font-light tracking-tighter text-black">Esports Ready.</h4>
              <p className="text-gray-700 text-lg leading-relaxed font-light">
                Stay on the cutting edge. When a new 8K sensor drops, don&apos;t
                buy a new mouse. Just buy the module.
              </p>
            </div>
          </div>

          {/* Hub & Configurations */}
          <div className="rounded-b-md md:col-span-12 border border-black border-t-0 p-12 md:p-24 grid gap-16 md:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <span className="text-[10px] font-bold tracking-[0.3em] text-black uppercase">
                Network
              </span>
              <h4 className="text-6xl font-light tracking-tighter text-black">The KOVA Hub.</h4>
              <p className="text-gray-700 text-xl font-light leading-relaxed max-w-lg">
                Where hardware meets software. Download precision profiles from
                pro players or share your custom sensor-switch combinations.
              </p>
              <div className="pt-8">
                <Link
                  href="/hub"
                  className="rounded-md bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-bold transition-colors hover:bg-transparent hover:text-black border border-black inline-flex items-center gap-4 group"
                  onClick={() => trackEvent("cta_explore_configurations_click")}
                >
                  Explore Configurations
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {setupPresets.map((setup, index) => (
                <div
                  key={setup.title}
                  className={`rounded-md p-8 border border-black ${index === 0 || index === 2 ? 'sm:-mr-px' : ''} ${index < 2 ? 'sm:-mb-px' : ''}`}
                >
                  <div className="mb-4 text-lg font-bold text-black uppercase">
                    {setup.title}
                  </div>
                  <div className="text-gray-600 font-mono text-xs leading-relaxed">
                    {setup.details}
                    <br />
                    {setup.switchType}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
