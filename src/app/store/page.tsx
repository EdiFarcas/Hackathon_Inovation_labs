import type { Metadata } from "next";
import { SiteShell } from "@/components/common/SiteShell";
import { MarketplacePage } from "@/components/marketplace/MarketplacePage";

export const metadata: Metadata = {
  title: "Store",
  description: "KOVA Store - modular ecosystem for your gaming mouse.",
};

export default function StoreRoute() {
  return (
    <SiteShell>
      <MarketplacePage />
    </SiteShell>
  );
}
