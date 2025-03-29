import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import Providers from "@/components/providers";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const DM_Sans_init = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.METADATA_BASE_URL || ""),
  title: {
    default: "CandyBlinks | Candy Machine BLink Generator",
    template: "%s | CandyBlinks",
  },
  description:
    "Create and manage your Candy Machine BLinks effortlessly with our intuitive platform. Simplify NFT distribution and minting with ease.",
  openGraph: {
    title: "CandyBlinks - Candy Machine BLink Generator",
    description: "Easily generate Candy Machine BLinks",
    siteName: "CandyBlinks",
    type: "website",
  },
  other: {
    "dscvr:canvas:version": "vNext",
    "og:image": "https://i.imgur.com/sMQhSGP.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${DM_Sans_init.className} antialiased`}
      >
        <Providers>
          <div className="min-h-[100vh] bg-black-80 z-0">{children}</div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
