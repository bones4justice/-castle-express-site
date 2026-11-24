import { Merriweather, Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StorageStickyBar from "@/components/StorageStickyBar";
import AttributionCapture from "@/components/AttributionCapture";
import LpAbTracker from "@/components/LpAbTracker";
import ChromeGate from "@/components/ChromeGate";
import { localBusinessJsonLd } from "@/lib/structuredData";
import { heroVariantScript } from "@/lib/heroVariantScript";
import { TRACKER_LOADER_SCRIPT } from "@/lib/trackerLoaderScript";
import "./globals.css";

// Allow ?hero=A|B inspection override only on Vercel preview/dev builds.
const IS_PREVIEW = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";
const HERO_VARIANT_SCRIPT = heroVariantScript({ allowOverride: IS_PREVIEW });

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://www.castleexpressmoving.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Castle Express Moving & Storage | CT & MA Movers Since 2011",
  },
  description: "Family-owned movers in Enfield, CT serving Hartford County & Western MA since 2011. 220+ five-star reviews, honest estimates. Call (888) 553-4503.",
  // WARNING: this canonical is inherited by ANY page that doesn't set its own
  // `alternates`: a page added without one silently canonicalizes to the
  // homepage (deindexing itself). Every new page must set its own canonical.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Castle Express Moving & Storage",
    title: "Castle Express Moving & Storage | CT & MA Movers Since 2011",
    description: "Family-owned moving company serving Hartford County, CT and Western MA. Transparent pricing, professional crews, 220+ 5-star reviews.",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Castle Express moving truck at a Connecticut home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Castle Express Moving & Storage | CT & MA Movers Since 2011",
    description: "Family-owned moving company serving Hartford County, CT and Western MA. Transparent pricing, professional crews, 220+ 5-star reviews.",
    images: ["/images/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${merriweather.variable} ${cormorant.variable} ${dmSans.variable}`}>
      <head>
        {/* Homepage hero A/B variant + background preload (no-op elsewhere). */}
        <script dangerouslySetInnerHTML={{ __html: HERO_VARIANT_SCRIPT }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* Tag Manager, GA4, Meta, OpenAI and Clarity: production host only,
            and held back until they are needed. See lib/trackerLoaderScript.js. */}
        <script dangerouslySetInnerHTML={{ __html: TRACKER_LOADER_SCRIPT }} />
        <Script id="phone-click-tracking" strategy="afterInteractive">{`
          // The gtag() shim and every tag loader live in
          // lib/trackerLoaderScript.js (inlined in <head> above). This block
          // only wires the phone-link click tracking.
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href^="tel:"]');
            if (link) {
              // Meta "Contact" for the call. Tag Manager sends one too once it
              // has loaded; duplicates are dropped in lib/trackerLoaderScript.js.
              if (typeof window.fbq === 'function') window.fbq('track', 'Contact');

              var el = link.closest('.mobile-sticky-cta') ? 'sticky' : link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('.section-dark,.home-hero') ? 'hero' : link.closest('.cta-section,.text-center') ? 'cta' : 'page';
              var hv = (document.cookie.match(/hero_ab_test=([^;]+)/) || [])[1] || 'not_set';
              var lv = (document.cookie.match(/lp_ab=(landing|service)/) || [])[1] || 'not_in_test';
              var gv = (document.cookie.match(/ge_ab=(form|home)/) || [])[1] || 'not_in_test';
              // send_to is required for GA4 (GTM claims untargeted pushes and
              // has no GA4 tag since container v35). Verified live 2026-10-19:
              // GTM's Website Phone Calls tag fires the same wcm pair on this
              // push with or without send_to.
              var cp = { event_category: 'engagement', event_label: el + '_phone', hero_variant: hv, lp_variant: lv, ge_variant: gv, send_to: 'G-97Z4EHJM63' };
              // Homepage redesign marker (lib/homeDesign.js); absent on the old design.
              var hd = document.querySelector('[data-home-design]');
              if (hd) cp.home_design = hd.getAttribute('data-home-design');
              gtag('event', 'click_phone', cp);
              // Desktop fallback: tel: links don't dial on a computer with no calling
              // app, so the click feels dead. Copy the number + confirm so the CTA still
              // does something. Mobile (and desktops with a real dialer) keep dialing,
              // we never preventDefault, this only ADDS a clipboard copy + toast.
              if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                var num = '(888) 553-4503';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  try { navigator.clipboard.writeText(num); } catch (_) {}
                }
                var t = document.getElementById('phone-copy-toast');
                if (!t) {
                  t = document.createElement('div');
                  t.id = 'phone-copy-toast';
                  t.setAttribute('role', 'status');
                  t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#1A1A2E;color:#fff;font-family:var(--font-heading),sans-serif;font-weight:700;font-size:15px;padding:14px 22px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.25);z-index:9999;opacity:0;transition:opacity 0.2s ease;pointer-events:none;';
                  document.body.appendChild(t);
                }
                t.textContent = 'Number copied - call ' + num;
                requestAnimationFrame(function () { t.style.opacity = '1'; });
                clearTimeout(window.__phoneToast);
                window.__phoneToast = setTimeout(function () { t.style.opacity = '0'; }, 2800);
              }
            }
          });
        `}</Script>
      </head>
      <body>
        {!IS_PREVIEW && <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLR2TQC" height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe>
        </noscript>}
        {/* No Meta Pixel <noscript> image fallbacks: the JS pixel fires
            PageView, so the noscript images only double-counted PageView on
            normal (JS-on) loads. */}
        {/* Sitewide LocalBusiness JSON-LD. The full MovingCompany graph is
            added on the homepage only (see app/page.js + lib/structuredData.js). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <AttributionCapture />
        <LpAbTracker />
        <ChromeGate><Header /></ChromeGate>
        <main>{children}</main>
        <ChromeGate><Footer /></ChromeGate>
        <StorageStickyBar />
      </body>
    </html>
  );
}
