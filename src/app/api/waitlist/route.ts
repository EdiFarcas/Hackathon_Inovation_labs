import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { isValidEmail } from "@/lib/validation";

type WaitlistPayload = {
  email?: string;
  source?: string;
  company?: string;
};

async function forwardToWebhook(payload: { email: string; source: string }) {
  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function POST(request: NextRequest) {
  const ipKey =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ipKey, 8, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in one minute." },
      { status: 429 },
    );
  }

  const body = (await request.json()) as WaitlistPayload;
  const email = body.email?.trim().toLowerCase() ?? "";
  const source = body.source?.trim() || "unknown";
  const company = body.company?.trim() ?? "";

  if (company) {
    // Honeypot field should stay empty for real users.
    return NextResponse.json({ success: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  await forwardToWebhook({ email, source });

  console.info("[waitlist]", { email, source, createdAt: new Date().toISOString() });

  return NextResponse.json({ success: true });
}
