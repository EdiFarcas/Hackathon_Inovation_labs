"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { HubSetup, StoreModule } from "@/content/site";

type HubSetupCardProps = {
  setup: HubSetup;
  modulesInSetup: StoreModule[];
};

export function HubSetupCard({ setup, modulesInSetup }: HubSetupCardProps) {
  const [copied, setCopied] = useState(false);

  const settingsText = useMemo(() => {
    const settingsLines = setup.settings.map(
      (setting) => `${setting.label}: ${setting.value}`,
    );

    return `${setup.title}\n${settingsLines.join("\n")}`;
  }, [setup]);

  async function copySettings() {
    try {
      await navigator.clipboard.writeText(settingsText);
      setCopied(true);
      trackEvent("hub_copy_settings_click", { setup: setup.id });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const modulesQuery = setup.moduleIds.join(",");

  return (
    <article
      className={`bg-surface-container-low border-l-2 p-8 ${
        setup.featured ? "border-primary" : "border-outline-variant"
      }`}
    >
      <p className="text-primary text-[10px] tracking-[0.2em] uppercase">Verified Setup</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tighter text-white">{setup.title}</h2>

      <div className="mt-5 border-t border-[#283029] pt-4">
        <p className="text-primary text-[10px] tracking-[0.2em] uppercase">Store Modules Used</p>
        <ul className="mt-3 space-y-2">
          {modulesInSetup.map((module) => (
            <li key={module.id} className="flex items-center justify-between gap-4 text-sm text-[#d0d0d0]">
              <span>{module.name}</span>
              <span className="text-[#5CC596]">${module.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-[#283029] pt-4">
        <p className="text-primary text-[10px] tracking-[0.2em] uppercase">Settings</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {setup.settings.map((setting) => (
            <div key={setting.label} className="bg-[#0a0a0a] px-3 py-2">
              <p className="text-[10px] tracking-[0.15em] text-[#8a8a8a] uppercase">{setting.label}</p>
              <p className="mt-1 text-sm text-white">{setting.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={copySettings}
          className="border-outline-variant text-on-surface border px-3 py-2 text-xs tracking-[0.15em] uppercase hover:border-primary hover:text-primary"
        >
          {copied ? "Copied" : "Copy Settings"}
        </button>

        <Link
          href={`/store?preset=${setup.id}&modules=${modulesQuery}`}
          className="bg-primary-container text-on-primary px-3 py-2 text-center text-xs font-bold tracking-[0.15em] uppercase"
          onClick={() => trackEvent("hub_apply_to_cart_click", { setup: setup.id })}
        >
          Apply To Cart
        </Link>
      </div>
    </article>
  );
}
