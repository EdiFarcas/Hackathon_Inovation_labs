import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cova-kinetic.com"),
  title: {
    default: "COVA Kinetic",
    template: "%s | COVA Kinetic",
  },
  description: "Modular performance hardware platform for competitive players.",
  icons: {
    icon: "/square%201.png",
    shortcut: "/square%201.png",
    apple: "/square%201.png",
  },
  openGraph: {
    title: "COVA Kinetic",
    description: "Future-proof mouse hardware with modular sensors, switches, and shells.",
    type: "website",
    url: "https://cova-kinetic.com",
    siteName: "COVA Kinetic",
    images: [
      {
        url: "/square%201.png",
        width: 1200,
        height: 1200,
        alt: "COVA Kinetic logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "COVA Kinetic",
    description: "Future-proof mouse hardware with modular sensors, switches, and shells.",
    images: ["/square%201.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased dark`}>
      <body className="font-body min-h-full bg-background text-on-surface selection:bg-primary-container selection:text-on-primary">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
