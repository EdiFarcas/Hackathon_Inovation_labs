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

// Minimal brutalist interface

// Demo mode: UI remains fully interactive without physical hardware connected.
const MOCK_MODE = true;
const KOVA_VENDOR_ID = 0x1234;

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
        filters: [{ vendorId: KOVA_VENDOR_ID }],
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
      setStatusText(`Connected: ${device.productName ?? "KOVA Mouse"}`);
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
    // Simulează descărcarea unui profil din KOVA Marketplace
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
        `Senzorul tău actual (${sensorModel}) nu suportă această frecvență momentan.`,
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
    <section className="min-h-screen bg-white text-black">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[340px_1fr]">
        <aside className="border-r border-black bg-white p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h1 className="text-sm font-bold tracking-[0.2em] text-black uppercase">Mouse Web</h1>
            <button
              type="button"
              onClick={handleConnectMouse}
              disabled={connected}
              className="rounded-md border border-black bg-black px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-white uppercase transition hover:bg-white hover:text-black disabled:opacity-50"
            >
              {connected ? "Connected" : "Connect"}
            </button>
          </div>

          <h2 className="text-[10px] font-bold tracking-[0.3em] text-black uppercase">Modules</h2>

          <div className="mt-8 space-y-6">
            <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
              Active Modules (Auto-detected)
            </h3>

            <div className="rounded-md border border-black bg-white p-5 text-sm font-light">
              <p>
                <span className="text-gray-500">Sensor:</span> PAW3395
                <span className="text-black font-bold"> (4000Hz Capable)</span>
              </p>
              <p className="mt-3">
                <span className="text-gray-500">Switches:</span> Omron Optical
              </p>
            </div>

            <div className="rounded-md border border-black bg-white p-5">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">Switch Health</span>
                <span className="font-bold text-black">{switchHealth}%</span>
              </div>
              <div className="h-1 w-full bg-gray-200">
                <div className="h-full bg-black" style={{ width: `${switchHealth}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
              Passive Modules (User Selected)
            </h3>

            <label htmlFor="shell-select" className="mt-6 block text-xs font-bold text-black uppercase">
              Shell Type
            </label>
            <select
              id="shell-select"
              value={shell}
              onChange={(event) => handleShellChange(event.target.value as (typeof SHELL_OPTIONS)[number]["value"])}
              className="rounded-md mt-3 w-full border border-black bg-white p-4 text-sm font-light text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {SHELL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <p className="mt-4 text-xs font-light text-gray-500">Current shell: {shellLabel}</p>
          </div>

          <div className="mt-16 space-y-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={!connected}
              className="rounded-md w-full border border-black bg-black px-6 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition hover:bg-white hover:text-black disabled:opacity-50"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={handleImportSetup}
              className="rounded-md w-full border border-black bg-transparent px-6 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition hover:bg-black hover:text-white"
            >
              Import s1mple CS2
            </button>
          </div>
        </aside>

        <main className="bg-white p-6 md:p-12 lg:p-20">
          <h2 className="text-[10px] font-bold tracking-[0.3em] text-black uppercase">Performance Tuning</h2>

          <section className="rounded-md mt-10 border border-black bg-white p-8 md:p-12">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">DPI</h3>
              <span className="text-4xl font-light text-black">{dpi}</span>
            </div>
            <input
              type="range"
              min={400}
              max={26000}
              step={100}
              value={dpi}
              onChange={(event) => handleDpiChange(Number(event.target.value))}
              className="w-full accent-black"
            />
            <div className="mt-4 flex justify-between text-xs font-light text-gray-500">
              <span>400</span>
              <span>26000</span>
            </div>
          </section>

          <section className="rounded-md mt-10 border border-black bg-white p-8 md:p-12">
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Polling Rate</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {POLLING_OPTIONS.map((option) => {
                const isDisabled = option >= 4000 && !canUse4k;
                const isActive = pollingRate === option;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handlePollingRateChange(option)}
                    className={`rounded-md border border-black px-6 py-4 text-sm font-light transition ${
                      isDisabled
                        ? "cursor-not-allowed border-gray-200 text-gray-300"
                        : isActive
                          ? "bg-black text-white"
                          : "bg-transparent text-black hover:bg-gray-100"
                    }`}
                  >
                    {option}Hz
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-xs font-light text-gray-500">
              4000Hz and 8000Hz are automatically enabled only when a compatible sensor is detected.
            </p>
          </section>

          <section className="rounded-md mt-10 border border-black bg-white p-8 md:p-12">
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Lift-off Distance (LOD)</h3>
            <div className="flex flex-wrap gap-4">
              {LOD_OPTIONS.map((option) => {
                const isActive = lod === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleLodChange(option)}
                    className={`rounded-md border border-black px-8 py-4 text-sm font-light transition ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-transparent text-black hover:bg-gray-100"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-md mt-10 border border-black bg-white p-8 md:p-12">
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Connection Status</h3>
            <p className={`text-base font-light ${connected ? "text-black" : "text-gray-500"}`}>{statusText}</p>
          </section>
        </main>
      </div>
    </section>
  );
}
