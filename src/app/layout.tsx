import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// One weight on purpose. A second mono file is ~18 KB for a difference
// nobody sees at label sizes.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${profile.name}, ${profile.role}`;
const description =
  "Software / AI Engineer in Takamatsu, Japan. I build automation services, internal tools and dashboards, and I've been doing it for about seven years.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Font variables belong on <html>: Tailwind's preflight sets font-family
    // there, so variables scoped to <body> resolve to nothing and text falls
    // back to the browser serif.
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
