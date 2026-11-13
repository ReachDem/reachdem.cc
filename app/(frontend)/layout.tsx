import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const siteUrl = "https://reachdem.cc";
const siteName = "ReachDem";
const siteDescription =
  "ReachDem helps SMEs, restaurants, logistics companies, and tech teams centralize contacts, launch SMS and email campaigns, track links, and connect customer messaging workflows through API.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "ReachDem | Customer Messaging, SMS, Email & Link Tracking for SMEs",
    template: "%s | ReachDem",
  },
  description: siteDescription,
  keywords: [
    "ReachDem",
    "customer messaging platform",
    "SMS marketing Africa",
    "email marketing Africa",
    "WhatsApp customer communication",
    "PME marketing automation",
    "restaurant customer messaging",
    "logistics customer notifications",
    "link tracking",
    "audience segmentation",
    "customer engagement API",
    "Afrique francophone CRM",
  ],
  authors: [{ name: "ReachDem" }],
  creator: "ReachDem",
  publisher: "ReachDem",
  category: "Business Software",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "fr-CM": "/",
      "fr-FR": "/",
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/app/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "ReachDem | Customer Messaging, SMS, Email & Link Tracking for SMEs",
    description: siteDescription,
    locale: "en_US",
    alternateLocale: ["fr_CM", "fr_FR"],
    images: [
      {
        url: "/images/reachdem.png",
        width: 1200,
        height: 630,
        alt: "ReachDem customer messaging platform dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachDem | Customer Messaging, SMS, Email & Link Tracking for SMEs",
    description: siteDescription,
    images: ["/images/reachdem.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
