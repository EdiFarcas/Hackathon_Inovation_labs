"use client";

import Image from "next/image";
import Link from "next/link";
import { setupPresets } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

export function FeaturesSection() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="bg-surface-container-low group flex flex-col justify-between p-6 sm:p-12 md:col-span-8">
            <div className="space-y-4">
              <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
                Architecture
              </span>
              <h4 className="max-w-md text-4xl font-bold tracking-tighter">
                Magnetic Assembly. Snap-on Logic.
              </h4>
              <p className="text-on-surface-variant max-w-sm text-sm font-light">
                High-grade Neodymium magnets ensure zero-rattle structural
                integrity while allowing for 2-second module swaps. No screws.
                No tools. No compromise.
              </p>
            </div>
            <div className="relative mt-12 h-64">
              <Image
                className="h-full w-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                alt="Close up of magnetic connectors on a high-end device"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuaHSjjbp32X9XFiGBNcJwuZSTrhpewv1pwrrzu4t7R2OWvVZxr1FiJ-LNz3aJ_ULyUA7a8LPmxApZxlB_R3jKyPE1sXlAOYC_KGrJWT8BFKegxOdGXba2o9cjUGjxktxBMYJOK9ofPShw97azCr1mvjvopggZ230ofKQ6hxU3wU7RhOkGlTCCdZ5SIP0SJaCkOoVwvXg0ewEONR-TaFEIqH0Nk7GqpDSI6KLHFJddbzGlvmjPS9m20J1BCMSECLbWLJip9j-CK70"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="bg-surface-container-high flex flex-col items-start gap-12 p-6 sm:p-8 md:col-span-4">
            <div className="border-outline-variant/20 group relative flex aspect-square w-full items-center justify-center overflow-hidden border bg-black p-8">
              <div className="bg-primary/5 absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              <span className="text-primary text-7xl">◎</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-bold tracking-tighter">Esports Ready.</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                Stay on the cutting edge. When a new 8K sensor drops, don&apos;t
                buy a new mouse. Just buy the module.
              </p>
            </div>
          </div>

          <div className="bg-surface-container grid items-center gap-8 p-6 sm:gap-12 sm:p-12 md:col-span-12 md:grid-cols-2">
            <div className="space-y-6">
              <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
                Network
              </span>
              <h4 className="text-5xl font-bold tracking-tighter">The COVA Hub.</h4>
              <p className="text-on-surface-variant text-lg font-light">
                Where hardware meets software. Download precision profiles from
                pro players or share your custom sensor-switch combinations.
              </p>
              <Link
                href="/hub"
                className="text-primary group flex items-center gap-4 text-xs tracking-widest uppercase"
                onClick={() => trackEvent("cta_explore_configurations_click")}
              >
                Explore Configurations
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {setupPresets.map((setup) => (
                <div
                  key={setup.title}
                  className={`bg-surface-container-lowest p-6 ${
                    setup.featured ? "border-primary" : "border-outline-variant"
                  } border-l-2`}
                >
                  <div className="mb-2 text-xl leading-tight font-bold text-white uppercase sm:text-xs">
                    {setup.title}
                  </div>
                  <div className="text-outline text-base leading-relaxed sm:font-mono sm:text-[10px]">
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
