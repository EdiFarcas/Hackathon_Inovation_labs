import Link from "next/link";
import { getSiteCopy } from "@/content/site";

const siteCopy = getSiteCopy("en");

export function SiteFooter() {
  return (
    <footer className="border-outline-variant/20 flex w-full flex-col items-center justify-between gap-8 border-t bg-surface-container-lowest px-12 py-16 md:flex-row">
      <div className="font-headline text-xl font-black text-primary">
        COVA KINETIC
      </div>

      <div className="flex flex-wrap justify-center gap-12 text-[10px] tracking-[0.2em] uppercase">
        {siteCopy.footerLinks.map((link) => (
          <Link
            key={link.label}
            className="text-secondary opacity-80 transition-opacity hover:text-primary hover:opacity-100"
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="text-[10px] tracking-[0.2em] text-secondary uppercase">
        {siteCopy.legalCopy}
      </div>
    </footer>
  );
}
