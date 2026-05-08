import { ReactNode } from "react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { TopNavBar } from "@/components/landing/TopNavBar";
import { CartDrawer } from "./CartDrawer";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <TopNavBar />
      <CartDrawer />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </>
  );
}
