import { WaitlistForm } from "@/components/forms/WaitlistForm";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-48">
      <div className="from-primary-container/10 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="container relative z-10 mx-auto px-8 text-center">
        <h2 className="mb-8 text-6xl font-bold tracking-tighter text-white md:text-8xl">
          READY FOR THE <br />NEXT STAGE?
        </h2>
        <p className="text-on-surface-variant mx-auto mb-12 max-w-xl text-xl font-light">
          Production starts Q3 2024. Secure your place in the waitlist for
          early access to the Modular Alpha Kits.
        </p>
        <div className="mx-auto max-w-xl">
          <WaitlistForm source="final-cta" layout="stacked" />
        </div>
      </div>
    </section>
  );
}
