// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import CursorGlow from "@/components/CursorGlow";
import { Header } from "@/components/Header";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ✅ Metadata without themeColor
export const metadata: Metadata = {
  title: {
    default: "Gemechis Mulisa | Fullstack & React Developer",
    template: "%s | Gemechis Mulisa",
  },
  description:
    "Fullstack/React Developer from Addis Ababa with 2+ years building modern web apps — Netflix/Amazon clones, e-commerce, forums & more.",
  keywords: [
    "React Developer",
    "Fullstack Developer",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "E-commerce",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "Web Apps",
    "Gemechis Mulisa",
  ],
  authors: [{ name: "Gemechis Mulisa", url: "https://gammey.com" }],
  creator: "Gemechis Mulisa",
  publisher: "Gemechis Mulisa",
  robots: "index, follow", // SEO: ensures crawling
  alternates: {
    canonical: "https://gammey.com", // canonical URL
    languages: {
      "en-US": "https://gammey.com",
    },
  },
  openGraph: {
    title: "Gemechis Mulisa | Fullstack & React Developer",
    description:
      "Building scalable, beautiful web experiences with React, Next.js, Node.js and modern tools.",
    url: "https://gammey.com",
    siteName: "Gemechis Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gemechis Mulisa - Fullstack Developer Portfolio",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemechis Mulisa | React & Fullstack Developer",
    description:
      "2+ years crafting clones (Netflix, Amazon) & real apps — let's build something great.",
    images: ["/og-image.jpg"],
    site: "@gammey", // optional: your Twitter handle
    creator: "@gammey",
  },
  icons: {
    icon: "/vite.png", // your custom favicon
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://gammey.com"),
};

// ✅ Viewport: add themeColor here
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff", // now valid and removes warning
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          geistSans.variable +
          " " +
          geistMono.variable +
          " antialiased min-h-screen bg-background text-foreground"
        }
      >
        <Providers>
          <Header />
          <main className="flex-1 pt-24">{children}</main>
          <CursorGlow />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
