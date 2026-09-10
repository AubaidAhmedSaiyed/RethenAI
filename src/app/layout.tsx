import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rethen AI — Infrastructure for autonomous software",
  description:
    "Rethen connects agent activity across models, tools, workflows, and external systems. Follow AI work from execution to outcome.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Rethen AI",
    description: "Follow AI work across systems, from execution to outcome.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
