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
    default: "Orion LED Experience Centers | Experience LED Like Never Before",
    template: "%s | Orion LED",
  },
  description:
    "Don't buy an LED display from a catalogue — experience it in real life. Book a visit to Orion LED's Delhi & Mumbai Experience Centers for live demos, pixel-pitch comparisons and expert consultation.",
  keywords: [
    "LED display experience center",
    "Orion LED",
    "LED wall demo Delhi",
    "LED screen Mumbai",
    "DOOH",
    "fine pitch LED",
    "book LED demo",
  ],
  authors: [{ name: "Orion LED" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Orion LED Experience Centers | Experience LED Like Never Before",
    description:
      "Book a visit to Orion LED's immersive Experience Centers in Delhi & Mumbai. See it. Feel it. Then invest.",
    siteName: "Orion LED",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orion LED Experience Centers",
    description:
      "Experience LED like never before. Book your visit to Delhi or Mumbai.",
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
