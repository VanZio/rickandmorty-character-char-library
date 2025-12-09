import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UniverseBackground from "@/components/UniverseBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick & Morty Character Explorer",
  description: "Explore characters from the Rick and Morty TV show",
  icons: {
    icon: "/assets/rmlogo.png",
    apple: "/assets/rmlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning
      >
        <UniverseBackground />
        {children}
      </body>
    </html>
  );
}
