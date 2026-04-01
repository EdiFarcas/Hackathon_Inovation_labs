import type { Metadata } from "next";
import { SiteShell } from "@/components/common/SiteShell";
import { MouseWebPage } from "@/components/mouse-web/MouseWebPage";

export const metadata: Metadata = {
  title: "Mouse Web",
  description: "Browser companion app for KOVA modular gaming mouse using WebHID.",
};

export default function MouseWebRoute() {
  return (
    <SiteShell>
      <MouseWebPage />
    </SiteShell>
  );
}
