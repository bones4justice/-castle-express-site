import { Nunito, Merriweather } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://castleexpressmoving.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Castle Express Moving & Storage | CT & MA Movers Since 2008",
    template: "%s | Castle Express Moving & Storage",
  },
  description: "Family-owned CT & MA movers since 2008. Residential, commercial, packing & storage. Flat-rate pricing, no hidden fees.",
  keywords: ["movers", "moving company", "Enfield CT", "Hartford CT", "Springfield MA", "storage", "packing", "local movers", "long distance movers"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Castle Express Moving & Storage",
    title: "Castle Express Moving & Storage | CT & MA Movers Since 2008",
    description: "Family-owned moving company serving Hartford County, CT and Western MA. Flat-rate pricing, professional crews, 200+ 5-star reviews.",
    images: [{ url: "/images/logo.jpg", width: 1200, height: 630, alt: "Castle Express Moving & Storage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Castle Express Moving & Storage | CT & MA Movers Since 2008",
    description: "Family-owned moving company serving Hartford County, CT and Western MA. Flat-rate pricing, professional crews, 200+ 5-star reviews.",
    images: ["/images/logo.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${merriweather.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              "name": "Castle Express Moving & Storage",
              "image": "https://castleexpressmoving.com/images/logo.jpg",
              "url": "https://castleexpressmoving.com",
              "telephone": "1-888-553-4503",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4 Niblick Rd Unit A",
                "addressLocality": "Enfield",
                "addressRegion": "CT",
                "postalCode": "06082",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.9762,
                "longitude": -72.5918
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "07:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.facebook.com/cemoving",
                "https://www.instagram.com/castleexpressmovingandstorage/",
                "https://www.tiktok.com/@castleexpressmovi",
                "https://www.linkedin.com/in/joseph-caronna-767a616",
                "https://linktr.ee/castleexpressmovingandstorage"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "200",
                "bestRating": "5"
              },
              "areaServed": [
                { "@type": "State", "name": "Connecticut" },
                { "@type": "State", "name": "Massachusetts" }
              ],
              "foundingDate": "2008",
              "founder": {
                "@type": "Person",
                "name": "Joseph Caronna"
              },
              "description": "Family-owned moving company serving Hartford County, CT and Western Massachusetts since 2008. Residential, commercial, packing, and climate-controlled storage. Flat-rate pricing, no hidden fees.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Moving Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Moving" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Moving" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Packing Services" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Climate-Controlled Storage" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Specialty Moving" } }
                ]
              }
            })
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
