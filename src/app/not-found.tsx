import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-surface-container-lowest flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-primary text-[10px] tracking-[0.3em] uppercase">404</p>
      <h1 className="mt-4 text-5xl font-bold tracking-tighter text-on-surface md:text-6xl">
        Signal Lost
      </h1>
      <p className="text-on-surface-variant mt-4 max-w-md text-base">
        The route you requested is not wired yet. Return to base and continue
        exploring the modular system.
      </p>
      <Link
        href="/"
        className="bg-primary-container text-on-primary mt-8 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase"
      >
        Back To Home
      </Link>
    </main>
  );
}
