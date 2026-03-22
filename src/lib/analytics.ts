"use client";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event,
    timestamp: Date.now(),
    ...payload,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  if (process.env.NODE_ENV !== "production") {
    // Keeps analytics visible during development without an external provider.
    console.info("[analytics]", eventPayload);
  }
}
