import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { ScrollProgress } from "@/components/effects/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://orion-led.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Welcome OAC 2026 Visitors | Orion LED Experience Centres — Mumbai & Delhi",
    template: "%s | Orion LED",
  },
  description:
    "An exclusive invitation from Orion LED for OAC 2026 visitors. Experience premium LED displays at our Mumbai or Delhi Experience Centre and unlock FREE site survey, consultation, 3D mockup, installation layout and feasibility report.",
  keywords: [
    "OAC 2026",
    "Orion LED",
    "Experience Centre Mumbai",
    "Experience Centre Delhi",
    "LED display demo",
    "book LED visit",
    "FREE LED consultation",
  ],
  authors: [{ name: "Orion LED" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Welcome, OAC 2026 Visitors! | Orion LED Experience Centres",
    description:
      "Register your visit and unlock exclusive OAC privileges for your next LED project — Mumbai or Delhi.",
    siteName: "Orion LED",
  },
  twitter: {
    card: "summary_large_image",
    title: "OAC 2026 · Orion LED Experience Centres",
    description:
      "Book your visit to Mumbai or Delhi and unlock exclusive OAC benefits.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} dark`}>
      <body className="relative min-h-screen bg-ink font-sans antialiased">
        <AmbientBackground />
        <ScrollProgress />
        <CursorGlow />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
