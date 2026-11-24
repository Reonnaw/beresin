import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StoreHydration } from "@/components/store-hydration";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    // data-theme is only the server default: the head script corrects it before paint, hence suppressHydrationWarning.
    <html
      lang="id"
      data-theme="light"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} font-sans h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <StoreHydration />
      </body>
    </html>
  );
}
