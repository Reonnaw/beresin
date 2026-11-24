import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { StoreHydration } from "@/components/store-hydration";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Display face for showroom headlines only; body copy stays on Plus Jakarta Sans.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Beresin",
    template: "%s · Beresin",
  },
  description:
    "Diagnostik kerusakan laptop modular dalam 3D, katalog spare part, dan booking servis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <StoreHydration />
      </body>
    </html>
  );
}
