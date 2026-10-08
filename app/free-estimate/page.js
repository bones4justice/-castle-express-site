import FreeEstimateLanding from "@/components/FreeEstimateLanding";

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

// Next 14 passes a repeated query param (?utm_campaign=a&utm_campaign=b) as an
// ARRAY. Our Google Ads links repeat utm_campaign, so calling a string method
// on the raw value crashed the page server-side. Always read params through
// first(): string, array, or missing all collapse to a plain string.
function first(value) {
  if (Array.isArray(value)) value = value[0];
  return typeof value === "string" ? value : "";
}

// Four versions, chosen server-side so the matched message is in the first
// paint (no client flash). Content lives in FreeEstimateLanding's VERSIONS map.
// Channel beats campaign name: Meta/social visitors are not actively searching,
// so they get the friendlier, shorter version even if the campaign name says
// long distance or commercial.
function pickVersion(searchParams) {
  try {
    const campaign = first(searchParams?.utm_campaign).toLowerCase();
    const source = first(searchParams?.utm_source).toLowerCase();
    const medium = first(searchParams?.utm_medium).toLowerCase();
    if (source === "facebook" || source === "instagram" || medium === "paid_social") return "social";
    if (/long|distance/.test(campaign)) return "longdistance";
    if (/commercial|office/.test(campaign)) return "commercial";
    return "residential";
  } catch {
    // Whatever arrives in the query string, this page must render.
    return "residential";
  }
}

export default function FreeEstimatePage({ searchParams }) {
  return <FreeEstimateLanding version={pickVersion(searchParams)} />;
}
