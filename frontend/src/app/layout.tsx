import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CallBar } from "@/components/CallBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

import "./globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Fridge, freezer and cold room repairs. Fast callouts, honest pricing, and a proper diagnosis before anything is replaced.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} h-full`}>
      {/* suppressHydrationWarning: browser extensions edit <body> before React runs. */}
      {/* The bottom padding is the height of the phone call bar, so the last
          line of the footer is never hidden underneath it. */}
      <body
        className="flex min-h-full flex-col pb-[4.75rem] lg:pb-0"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallBar />
        <WhatsAppButton />
      </body>
    </html>
  );
}
