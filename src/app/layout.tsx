import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://vittagroup.uy";
const siteName = "Vitta Group";
const defaultTitle = "Vitta Group | Negocios inmobiliarios en Montevideo";
const defaultDescription =
  "Compra, venta, alquiler e inversión inmobiliaria en Montevideo, Uruguay. Propiedades seleccionadas y asesoramiento profesional con enfoque cercano, claro y confiable.";
const ogImage = `${siteUrl}/brand/og.jpeg`;
const logoUrl = `${siteUrl}/brand/logo-light.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: "%s | Vitta Group",
  },

  description: defaultDescription,

  applicationName: siteName,
  referrer: "origin-when-cross-origin",

  keywords: [
    "inmobiliaria en Montevideo",
    "negocios inmobiliarios",
    "compra de propiedades en Montevideo",
    "venta de propiedades en Montevideo",
    "alquiler de propiedades en Montevideo",
    "inversión inmobiliaria en Uruguay",
    "apartamentos en Montevideo",
    "casas en Montevideo",
    "propiedades en Uruguay",
    "Vitta Group",
  ],

  authors: [{ name: "Vitta Group", url: siteUrl }],
  creator: "Vitta Group",
  publisher: "Vitta Group",
  category: "Real Estate",

  alternates: {
    canonical: "/",
    languages: {
      "es-UY": "/",
    },
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

  icons: {
    icon: "/icon.jpeg",
    apple: "/icon.jpeg",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "es_UY",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Vitta Group - Negocios inmobiliarios en Montevideo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  name: "Vitta Group",
  url: siteUrl,
  logo: logoUrl,
  image: ogImage,
  description: defaultDescription,
  areaServed: {
    "@type": "City",
    name: "Montevideo",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montevideo",
    addressCountry: "UY",
  },
  sameAs: ["https://www.instagram.com/vittagroupuy"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+59892112466",
      areaServed: "UY",
      availableLanguage: ["es", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-UY" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}