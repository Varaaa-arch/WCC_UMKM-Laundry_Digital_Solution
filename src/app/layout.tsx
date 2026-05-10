import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";

import { defaultSiteMetadata } from "@/config/site";
import PageTransition from "@/components/common/PageTransition";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultSiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
