"use client";

import { useMemo, useState } from "react";
import { Space_Mono } from "next/font/google";

// WebHID types
interface HIDDevice {
  vendorId: number;
  productId: number;
  productName: string;
  opened: boolean;
  open(): Promise<void>;
  close(): Promise<void>;
  sendReport(reportId: number, data: Uint8Array): Promise<void>;
}

interface HIDRequestOptions {
  filters?: Array<{ vendorId?: number; productId?: number }>;
}

declare global {
  interface Navigator {
    hid: {
      requestDevice(options: HIDRequestOptions): Promise<HIDDevice[]>;
    };
  }
}

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Demo mode: UI remains fully interactive without physical hardware connected.
const MOCK_MODE = true;
const COVA_VENDOR_ID = 0x1234;

const COMMANDS = {
  dpi: 0x01,
  polling: 0x02,
  lod: 0x03,
  shell: 0x04,
} as const;

const POLLING_OPTIONS = [125, 500, 1000, 4000, 8000] as const;
const LOD_OPTIONS = ["low", "medium", "high"] as const;
const SHELL_OPTIONS = [
  { value: "standard", label: "Standard" },
  { value: "honeycomb", label: "Honeycomb Lightweight" },
  { value: "ergo", label: "Ergo Large" },
] as const;

function toHexString(bytes: Uint8Array | number[]) {
  return `[${Array.from(bytes)
    .map((byte) => `0x${byte.toString(16).toUpperCase().padStart(2, "0")}`)
    .join(", ")}]`;
}

export function MouseWebPage() {
  const [hidDevice, setHidDevice] = useState<HIDDevice | null>(null);

  const [connected, setConnected] = useState(false);
  const [statusText, setStatusText] = useState("Not connected");
  const [dpi, setDpi] = useState(1600);
  const [pollingRate, setPollingRate] = useState<(typeof POLLING_OPTIONS)[number]>(1000);
  const [lod, setLod] = useState<(typeof LOD_OPTIONS)[number]>("low");
  const [shell, setShell] = useState<(typeof SHELL_OPTIONS)[number]["value"]>("standard");

  const sensorModel = "PAW3395";
  const switchHealth = 92;
  const canUse4k = sensorModel === "PAW3395";

  const shellLabel = useMemo(
    () => SHELL_OPTIONS.find((option) => option.value === shell)?.label ?? "Standard",
    [shell],
  );

  async function sendToMouse(commandId: number, valueArray: number[]) {
    if (MOCK_MODE) {
      console.log(`[WebHID] Sent byte array: ${toHexString([commandId, ...valueArray])}`);
      return;
    }

    if (!hidDevice || !hidDevice.opened) {
      console.warn("[WebHID] Device is not connected.");
      return;
    }

    try {
      const data = new Uint8Array(valueArray);
      await hidDevice.sendReport(commandId, data);
      console.log(`[WebHID] Sent byte array: ${toHexString([commandId, ...valueArray])}`);
    } catch (error) {
      console.error("[WebHID] Failed to send report", error);
    }
  }

  async function handleConnectMouse() {
    if (MOCK_MODE) {
      setConnected(true);
      setStatusText("Connected (Mock Mode)");
      console.log("[WebHID] Mock mode active. UI updates are local.");
      return;
    }

    if (!("hid" in navigator)) {
      setStatusText("WebHID is not supported in this browser");
      return;
    }

    try {
      const devices = await navigator.hid.requestDevice({
        filters: [{ vendorId: COVA_VENDOR_ID }],
      });

      if (devices.length === 0) {
        setStatusText("No device selected");
        return;
      }

      const device = devices[0];
      if (!device.opened) {
        await device.open();
      }

      setHidDevice(device);
      setConnected(true);
      setStatusText(`Connected: ${device.productName ?? "COVA Mouse"}`);
    } catch (error) {
      console.error("[WebHID] Connection failed", error);
      setStatusText("Connection failed");
      setHidDevice(null);
      setConnected(false);
    }
  }

  function handleDpiChange(nextDpi: number) {
    setDpi(nextDpi);
  }

  function handlePollingRateChange(nextPollingRate: (typeof POLLING_OPTIONS)[number]) {
    if (nextPollingRate >= 4000 && !canUse4k) {
      return;
    }

    setPollingRate(nextPollingRate);
  }

  function handleLodChange(nextLod: (typeof LOD_OPTIONS)[number]) {
    setLod(nextLod);
  }

  function handleShellChange(nextShell: (typeof SHELL_OPTIONS)[number]["value"]) {
    setShell(nextShell);
  }

  async function handleSaveChanges() {
    console.log("[WebHID] Se scrie profilul în memoria dispozitivului...");

    // Trimite DPI
    const lsb = dpi & 0xff;
    const msb = (dpi >> 8) & 0xff;
    await sendToMouse(COMMANDS.dpi, [lsb, msb]);

    // Trimite Polling Rate
    const pollingEnum: Record<number, number> = {
      125: 0x01,
      500: 0x02,
      1000: 0x03,
      4000: 0x04,
      8000: 0x05,
    };
    await sendToMouse(COMMANDS.polling, [pollingEnum[pollingRate]]);

    // Trimite LOD
    const lodEnum: Record<(typeof LOD_OPTIONS)[number], number> = {
      low: 0x01,
      medium: 0x02,
      high: 0x03,
    };
    await sendToMouse(COMMANDS.lod, [lodEnum[lod]]);

    // Trimite Shell
    const shellEnum: Record<string, number> = { standard: 0x01, honeycomb: 0x02, ergo: 0x03 };
    await sendToMouse(COMMANDS.shell, [shellEnum[shell]]);

    console.log("[WebHID] Profil salvat cu succes!");
  }

  function handleImportSetup() {
    // Simulează descărcarea unui profil din COVA Marketplace
    const importedSetup = {
      playerName: "s1mple CS2",
      dpi: 400,
      pollingRate: 4000 as const,
      lod: "low" as const,
      shell: "ergo" as const,
    };

    // Validare Hardware (Smart Check)
    if (importedSetup.pollingRate === 4000 && !canUse4k) {
      alert(
        `[Eroare Hardware] Profilul "${importedSetup.playerName}" necesită 4000Hz.\n` +
        `Senzorul tău actual (${sensorModel}) nu suportă asta.\n` +
        `Upgradează la modulul PixArt PAW3395 ($25) din magazin pentru a folosi acest profil.`,
      );
      return;
    }

    // Dacă trece validarea, aplică setările în UI
    setDpi(importedSetup.dpi);
    setPollingRate(importedSetup.pollingRate);
    setLod(importedSetup.lod);
    setShell(importedSetup.shell);

    alert(
      `Profilul "${importedSetup.playerName}" a fost importat!\n` +
      `Apasă "Save Profile" pentru a scrie pe mouse.`,
    );
  }

  return (
    <section className={`${spaceMono.className} min-h-screen bg-[#0a0a0a] text-white`}>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[340px_1fr]">
        <aside className="border-r border-zinc-900 bg-black p-5 md:p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h1 className="text-sm tracking-[0.2em] text-[#5CC596] uppercase">Mouse Web</h1>
            <button
              type="button"
              onClick={handleConnectMouse}
              disabled={connected}
              className="bg-[#5CC596] px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-black uppercase transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {connected ? "Connected" : "Connect"}
            </button>
          </div>

          <h2 className="text-[11px] tracking-[0.2em] text-[#5CC596] uppercase">Modules</h2>

          <div className="mt-6 space-y-4">
            <h3 className="text-[10px] tracking-[0.16em] text-[#A0A0A0] uppercase">
              Active Modules (Auto-detected)
            </h3>

            <div className="border border-zinc-800 bg-[#060606] p-4 text-sm">
              <p>
                <span className="text-[#A0A0A0]">Sensor:</span> PAW3395
                <span className="text-[#5CC596]"> (4000Hz Capable)</span>
              </p>
              <p className="mt-2">
                <span className="text-[#A0A0A0]">Switches:</span> Omron Optical
              </p>
            </div>

            <div className="border border-zinc-800 bg-[#060606] p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#A0A0A0]">Switch Health</span>
                <span className="font-bold text-[#5CC596]">{switchHealth}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800">
                <div className="h-full bg-[#5CC596]" style={{ width: `${switchHealth}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[10px] tracking-[0.16em] text-[#A0A0A0] uppercase">
              Passive Modules (User Selected)
            </h3>

            <label htmlFor="shell-select" className="mt-4 block text-xs text-[#A0A0A0] uppercase">
              Shell Type
            </label>
            <select
              id="shell-select"
              value={shell}
              onChange={(event) => handleShellChange(event.target.value as (typeof SHELL_OPTIONS)[number]["value"])}
              className="mt-2 w-full border border-zinc-700 bg-black p-3 text-sm text-white focus:border-[#5CC596] focus:outline-none"
            >
              {SHELL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <p className="mt-3 text-xs text-[#A0A0A0]">Current shell: {shellLabel}</p>
          </div>

          <div className="mt-10 space-y-3">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={!connected}
              className="w-full bg-[#5CC596] px-4 py-3 text-xs font-bold tracking-[0.16em] text-black uppercase transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={handleImportSetup}
              className="w-full border border-[#5CC596] bg-transparent px-4 py-3 text-xs font-bold tracking-[0.16em] text-[#5CC596] uppercase transition hover:bg-[#5CC596]/10"
            >
              Import s1mple CS2
            </button>
          </div>
        </aside>

        <main className="bg-[#0a0a0a] p-5 md:p-8">
          <h2 className="text-[11px] tracking-[0.2em] text-[#5CC596] uppercase">Performance</h2>

          <section className="mt-7 border border-zinc-800 bg-black p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[10px] tracking-[0.16em] text-[#A0A0A0] uppercase">DPI</h3>
              <span className="text-2xl font-bold text-[#5CC596]">{dpi}</span>
            </div>
            <input
              type="range"
              min={400}
              max={26000}
              step={100}
              value={dpi}
              onChange={(event) => handleDpiChange(Number(event.target.value))}
              className="w-full accent-[#5CC596]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#A0A0A0]">
              <span>400</span>
              <span>26000</span>
            </div>
          </section>

          <section className="mt-6 border border-zinc-800 bg-black p-5 md:p-6">
            <h3 className="mb-4 text-[10px] tracking-[0.16em] text-[#A0A0A0] uppercase">Polling Rate</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {POLLING_OPTIONS.map((option) => {
                const isDisabled = option >= 4000 && !canUse4k;
                const isActive = pollingRate === option;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handlePollingRateChange(option)}
                    className={`border px-4 py-3 text-sm transition ${
                      isDisabled
                        ? "cursor-not-allowed border-zinc-800 text-zinc-600"
                        : isActive
                          ? "border-[#5CC596] bg-[#5CC596]/20 text-[#5CC596]"
                          : "border-zinc-700 text-white hover:border-[#5CC596]"
                    }`}
                  >
                    {option}Hz
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-[#A0A0A0]">
              4000Hz and 8000Hz are automatically enabled only when a compatible sensor is detected.
            </p>
          </section>

          <section className="mt-6 border border-zinc-800 bg-black p-5 md:p-6">
            <h3 className="mb-4 text-[10px] tracking-[0.16em] text-[#A0A0A0] uppercase">Lift-off Distance (LOD)</h3>
            <div className="flex gap-3">
              {LOD_OPTIONS.map((option) => {
                const isActive = lod === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleLodChange(option)}
                    className={`border px-5 py-3 text-sm transition ${
                      isActive
                        ? "border-[#5CC596] bg-[#5CC596]/20 text-[#5CC596]"
                        : "border-zinc-700 text-white hover:border-[#5CC596]"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-6 border border-zinc-800 bg-black p-5 md:p-6">
            <h3 className="mb-2 text-[10px] tracking-[0.16em] text-[#A0A0A0] uppercase">Connection Status</h3>
            <p className={`text-sm ${connected ? "text-[#5CC596]" : "text-[#A0A0A0]"}`}>{statusText}</p>
          </section>
        </main>
      </div>
    </section>
  );
}
