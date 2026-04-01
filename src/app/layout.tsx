import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kova-kinetic.com"),
  title: {
    default: "KOVA Kinetic",
    template: "%s | KOVA Kinetic",
  },
  description: "Modular performance hardware platform for competitive players.",
  icons: {
    icon: "/square.png",
    shortcut: "/square.png",
    apple: "/square.png",
  },
  openGraph: {
    title: "KOVA Kinetic",
    description: "Future-proof mouse hardware with modular sensors, switches, and shells.",
    type: "website",
    url: "https://kova-kinetic.com",
    siteName: "KOVA Kinetic",
    images: [
      {
        url: "/square.png",
        width: 1200,
        height: 1200,
        alt: "KOVA Kinetic logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOVA Kinetic",
    description: "Future-proof mouse hardware with modular sensors, switches, and shells.",
    images: ["/square.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="font-body min-h-full bg-background text-on-surface selection:bg-primary-container selection:text-on-primary">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
