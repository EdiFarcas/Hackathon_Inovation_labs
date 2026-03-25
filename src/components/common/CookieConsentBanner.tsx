"use client";

import { useSyncExternalStore } from "react";

const CONSENT_KEY = "cova-cookie-consent";
const CONSENT_EVENT = "cova-consent-change";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return "accepted";
  }

  return window.localStorage.getItem(CONSENT_KEY) ?? "unset";
}

function getServerSnapshot() {
  // Keep server and first client render consistent to avoid hydration mismatch.
  return "accepted";
}

export function CookieConsentBanner() {
  const consentValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isVisible = consentValue === "unset";

  function accept() {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  function reject() {
    window.localStorage.setItem(CONSENT_KEY, "rejected");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="bg-surface-container-high/95 border-outline fixed right-4 bottom-4 z-50 max-w-sm border p-4 backdrop-blur-xl">
      <h2 className="text-sm font-semibold tracking-wide text-on-surface uppercase">
        Cookie Preferences
      </h2>
      <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
        We use essential cookies and optional analytics to improve launch
        quality. You can change this later in browser settings.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={reject}
          className="border-outline text-on-surface px-3 py-2 text-xs tracking-widest uppercase transition hover:bg-surface/40"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={accept}
          className="bg-primary-container text-on-primary px-3 py-2 text-xs tracking-widest uppercase transition hover:bg-primary-fixed"
        >
          Accept
        </button>
      </div>
    </aside>
  );
}
