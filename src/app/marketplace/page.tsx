import type { Metadata } from "next";
import { SiteShell } from "@/components/common/SiteShell";
import { MarketplacePage } from "@/components/marketplace/MarketplacePage";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "COVA Marketplace - build your perfect modular gaming mouse.",
};

export default function MarketplaceRoute() {
  return (
    <SiteShell>
      <MarketplacePage />
    </SiteShell>
  );
}
