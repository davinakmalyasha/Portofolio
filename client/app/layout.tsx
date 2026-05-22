import React from "react";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Davin | Portfolio",
  description: "Futuristic Monochrome 3D Helix Portfolio Landing Page",
  openGraph: {
    title: "Davin | Portfolio",
    description: "Futuristic Monochrome 3D Helix Portfolio Landing Page",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davin | Portfolio",
    description: "Futuristic Monochrome 3D Helix Portfolio Landing Page",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
