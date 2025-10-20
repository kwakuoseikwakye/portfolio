import "./globals.css";

import { cn } from "@/lib/utils";
import { nunito } from "./fonts/fonts";
import { constructMetadata } from "@/lib/metadata";
import {ThemeProvider} from "@/context/ThemeContext";
export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", nunito.variable)}
      >
       <ThemeProvider>
        {children}
       </ThemeProvider>
      </body>
    </html>
  );
}
