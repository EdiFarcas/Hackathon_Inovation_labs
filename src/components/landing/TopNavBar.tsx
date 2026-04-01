"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSiteCopy } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

const siteCopy = getSiteCopy("en");

export function TopNavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black bg-white px-4 py-4 sm:px-6 md:px-8 md:py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-bold tracking-tighter text-primary"
          onClick={() => {
            trackEvent("nav_brand_click");
            closeMobileMenu();
          }}
        >
          <Image
            src="/kova_logo_full.png"
            alt="KOVA logo"
            width={90}
            height={34}
            className="rounded-none object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-12 text-sm uppercase tracking-tight text-on-surface-variant md:flex">
          {siteCopy.nav.map((link) => (
            <Link
              key={link.label}
              className={`transition-all duration-100 hover:text-primary/70 ${
                pathname === link.href
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : ""
              }`}
              href={link.href}
              onClick={() => trackEvent("nav_link_click", { label: link.label })}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/waitlist"
            className="rounded-md hidden border border-black bg-transparent px-8 py-3 text-xs font-bold tracking-widest uppercase text-black transition-all hover:bg-black hover:text-white md:inline-block"
            onClick={() => trackEvent("cta_nav_waitlist_click")}
          >
            Join Waitlist
          </Link>

          <button
            type="button"
            className="border-outline-variant text-on-surface inline-flex h-10 w-10 items-center justify-center border md:hidden"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="text-lg">{isMobileMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-nav-menu" className="border-outline-variant/40 mt-3 border-t pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {siteCopy.nav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-2 py-2 text-sm tracking-wide uppercase transition-colors ${
                  pathname === link.href ? "bg-black text-white" : "text-black hover:bg-gray-100"
                }`}
                onClick={() => {
                  trackEvent("nav_link_click", { label: link.label, viewport: "mobile" });
                  closeMobileMenu();
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/waitlist"
              className="rounded-md mt-2 border border-black bg-black px-4 py-3 text-center text-xs font-bold tracking-widest text-white uppercase hover:bg-transparent hover:text-black transition-colors"
              onClick={() => {
                trackEvent("cta_nav_waitlist_click", { viewport: "mobile" });
                closeMobileMenu();
              }}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
