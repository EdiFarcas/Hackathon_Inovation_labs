"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { isValidEmail } from "@/lib/validation";

type WaitlistFormProps = {
  source: string;
  layout?: "inline" | "stacked";
  submitLabel?: string;
  placeholder?: string;
};

export function WaitlistForm({
  source,
  layout = "inline",
  submitLabel = "Join Waitlist",
  placeholder = "EMAIL ADDRESS",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    trackEvent("waitlist_submit_attempt", { source });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Could not submit waitlist request.");
      }

      setEmail("");
      setCompany("");
      setStatus("success");
      setMessage("You are on the waitlist. Watch your inbox.");
      trackEvent("waitlist_submit_success", { source });
    } catch (error) {
      setStatus("error");
      const nextMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setMessage(nextMessage);
      trackEvent("waitlist_submit_error", { source });
    } finally {
      setIsLoading(false);
    }
  }

  const isInline = layout === "inline";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={isInline ? "flex w-full max-w-2xl flex-col border-b border-black sm:flex-row" : "flex w-full flex-col gap-4 sm:flex-row"}
      >
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          required
          className={
            isInline
              ? "placeholder-gray-400 w-full border-none bg-transparent px-4 py-4 text-sm tracking-widest text-black uppercase focus:ring-0"
              : "rounded-md placeholder-gray-400 w-full border border-black bg-transparent px-8 py-6 text-sm tracking-widest text-black uppercase focus:outline-none"
          }
        />

        <input
          type="text"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          name="company"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={
            isInline
              ? "rounded-md border border-black bg-black px-8 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap transition-colors hover:bg-transparent hover:text-black disabled:opacity-70"
              : "rounded-md border border-black bg-black w-full px-12 py-6 text-xs font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap transition-colors hover:bg-transparent hover:text-black disabled:opacity-70 sm:w-auto"
          }
        >
          {isLoading ? "Submitting..." : submitLabel}
        </button>
      </div>

      {status !== "idle" && (
        <p
          className={`mt-3 text-sm ${
            status === "success" ? "text-primary" : "text-error"
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
