import { Nunito, Merriweather } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StorageStickyBar from "@/components/StorageStickyBar";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
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

const SITE_URL = "https://www.castleexpressmoving.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Castle Express Moving & Storage | CT & MA Movers Since 2013",
  },
  description: "Family-owned moving company serving Hartford County, CT and Western Massachusetts since 2013. 200+ five-star reviews. Accurate estimates, no hidden fees. Call (888) 553-4503.",
  keywords: ["movers", "moving company", "Enfield CT", "Hartford CT", "Springfield MA", "storage", "packing", "local movers", "long distance movers"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Castle Express Moving & Storage",
    title: "Castle Express Moving & Storage | CT & MA Movers Since 2013",
    description: "Family-owned moving company serving Hartford County, CT and Western MA. Transparent pricing, professional crews, 200+ 5-star reviews.",
    images: [{ url: "/images/logo.jpg", width: 1200, height: 630, alt: "Castle Express Moving & Storage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Castle Express Moving & Storage | CT & MA Movers Since 2013",
    description: "Family-owned moving company serving Hartford County, CT and Western MA. Transparent pricing, professional crews, 200+ 5-star reviews.",
    images: ["/images/logo.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <Script
          src="https://api.smartmoving.com/api/public/lead-provider-settings/8f882454-9968-445e-8f50-ac5d011a33fc/script"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-97Z4EHJM63"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-97Z4EHJM63');
          document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href^="tel:"]');
            if (link) {
              var section = 'page';
              var el = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('.section-dark') ? 'hero' : link.closest('.cta-section,.text-center') ? 'cta' : 'page';
              var hv = (document.cookie.match(/hero_ab_test=([^;]+)/) || [])[1] || 'not_set';
              gtag('event', 'click_phone', { event_category: 'engagement', event_label: el + '_phone', hero_variant: hv });
            }
          });
        `}</Script>
        <Script id="facebook-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1423378058969444');
          fbq('track', 'PageView');
        `}</Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wcqd0mksz9");
        `}</Script>
        <Script id="clarity-hero-tag" strategy="afterInteractive">{`
          (function(){
            var hv = (document.cookie.match(/hero_ab_test=([^;]+)/) || [])[1] || 'unknown';
            function tag(){ window.clarity('set', 'hero_variant', hv); }
            if (window.clarity) { tag(); } else {
              var i = setInterval(function(){ if (window.clarity) { clearInterval(i); tag(); } }, 200);
              setTimeout(function(){ clearInterval(i); }, 5000);
            }
          })();
        `}</Script>
      </head>
      <body>
        <noscript>
          <img height="1" width="1" style={{display:"none"}} src="https://www.facebook.com/tr?id=1423378058969444&ev=PageView&noscript=1" alt="" />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              "name": "Castle Express Moving & Storage",
              "image": "https://www.castleexpressmoving.com/images/logo.jpg",
              "url": "https://www.castleexpressmoving.com",
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
              "foundingDate": "2013",
              "founder": {
                "@type": "Person",
                "name": "Joseph Caronna"
              },
              "description": "Family-owned moving company serving Hartford County, CT and Western Massachusetts since 2013. Residential, commercial, packing, and climate-controlled storage. Accurate estimates, no hidden fees.",
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
        <StorageStickyBar />
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
