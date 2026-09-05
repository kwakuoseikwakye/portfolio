import type { Metadata } from "next";
import { Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Pixel wordmark in the header, nothing else.
const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-pixel",
  display: "swap",
});

const title = `${profile.name}, ${profile.role}`;
const description =
  "Software / AI Engineer in Takamatsu, Japan. I build automation services, internal tools and dashboards, and I've been doing it for about seven years.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  applicationName: `${profile.name} Portfolio`,
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
    <html
      lang="en"
      className={`${mono.variable} ${pixel.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#ffffff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#0a0a0a"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        {/* Satoshi lives on Fontshare, not Google Fonts. */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.theme;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  );
}
