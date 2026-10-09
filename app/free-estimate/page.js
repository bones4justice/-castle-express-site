import FreeEstimateLanding from "@/components/FreeEstimateLanding";
import { pickVersion } from "@/lib/utm";

// Ads-only landing page. noindex + nofollow (overrides the sitewide
// robots:index in app/layout.js), and it is deliberately left out of
// app/sitemap.js and the nav.
export const metadata = {
  title: "Free Moving Estimate | Castle Express Moving & Storage",
  description:
    "Get a fast, free moving estimate from Castle Express Moving & Storage. Family owned since 2011, serving Connecticut and Massachusetts.",
  // Self-canonical: without this the page inherits the root layout's
  // canonical ("/") and emits a contradictory noindex + canonical-to-homepage.
  alternates: { canonical: "/free-estimate/" },
  robots: { index: false, follow: false },
};

// Version picking and all the query-string crash protection live in
// lib/utm.js, shared with the browser-side attribution capture: first()
// collapses the arrays Next 14 produces for repeated params
// (?utm_campaign=a&utm_campaign=b crashed this page server-side Oct 2-8
// 2026), parseTrackedParams() recovers real keys from the pasted-URL Google
// Ads mangling ("https://...?utm_source" as a param key), and pickVersion()
// never throws. Whatever arrives in the query string, this page must render.
export default function FreeEstimatePage({ searchParams }) {
  return <FreeEstimateLanding version={pickVersion(searchParams)} />;
}
