import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { defaultSiteMetadata } from "@/config/site";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-hero-display",
  subsets: ["latin"],
  weight: ["700", "800"],
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
      className={`${poppins.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased bg-[#EEF4FB]`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#EEF4FB]">
        <Navbar />
        <div className="pt-16 flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
