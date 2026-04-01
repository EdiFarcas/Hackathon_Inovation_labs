import { WaitlistForm } from "@/components/forms/WaitlistForm";

export function FinalCtaSection() {
  return (
    <section className="bg-white py-64">
      <div className="container mx-auto px-8 text-center flex flex-col items-center">
        <h2 className="mb-12 text-7xl font-light tracking-tighter text-black md:text-[8rem] leading-[0.9]">
          READY FOR THE <br />NEXT STAGE?
        </h2>
        <p className="mx-auto mb-20 max-w-2xl text-2xl font-light text-gray-500">
          Production starts Q3 2026. Secure your place in the waitlist for
          early access to the Modular Alpha Kits.
        </p>
        <div className="w-full max-w-2xl">
          <WaitlistForm source="final-cta" layout="stacked" />
        </div>
      </div>
    </section>
  );
}
