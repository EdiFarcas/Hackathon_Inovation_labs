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
    <article className="rounded-md border border-black bg-white p-8">
      <p className="text-[10px] tracking-[0.3em] font-bold text-black uppercase">Verified Setup</p>
      <h2 className="mt-4 text-4xl font-light tracking-tighter text-black">{setup.title}</h2>

      <div className="mt-8 border-t border-black pt-6">
        <p className="text-[10px] tracking-[0.3em] font-bold text-black uppercase">Store Modules Used</p>
        <ul className="mt-4 space-y-3">
          {modulesInSetup.map((module) => (
            <li key={module.id} className="flex items-center justify-between gap-4 text-sm font-light text-gray-700">
              <span>{module.name}</span>
              <span className="font-medium text-black">${module.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-black pt-6">
        <p className="text-[10px] tracking-[0.3em] font-bold text-black uppercase">Settings</p>
        <div className="rounded-md mt-4 grid gap-px bg-black border border-black overflow-hidden sm:grid-cols-2">
          {setup.settings.map((setting) => (
            <div key={setting.label} className="bg-white px-4 py-3">
              <p className="text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase">{setting.label}</p>
              <p className="mt-1 text-sm font-light text-black">{setting.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={copySettings}
          className="rounded-md border border-black bg-transparent px-4 py-3 text-xs font-bold tracking-[0.2em] text-black uppercase transition hover:bg-black hover:text-white"
        >
          {copied ? "Copied" : "Copy Settings"}
        </button>

        <Link
          href={`/store?preset=${setup.id}&modules=${modulesQuery}`}
          className="rounded-md border border-black bg-black px-4 py-3 text-center text-xs font-bold tracking-[0.2em] text-white uppercase transition hover:bg-transparent hover:text-black"
          onClick={() => trackEvent("hub_apply_to_cart_click", { setup: setup.id })}
        >
          Apply To Cart
        </Link>
      </div>
    </article>
  );
}
