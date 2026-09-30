import FreeEstimateLanding from "@/components/FreeEstimateLanding";

// Ads-only landing page. noindex + nofollow (overrides the sitewide
// robots:index in app/layout.js), and it is deliberately left out of
// app/sitemap.js and the nav.
export const metadata = {
  title: "Free Moving Estimate | Castle Express Moving & Storage",
  description:
    "Get a fast, free moving estimate from Castle Express Moving & Storage. Family owned since 2011, serving Connecticut and Massachusetts.",
  robots: { index: false, follow: false },
};

// Three headline sets, chosen server-side from utm_campaign so the correct
// message is in the first paint (no client flash). Plain, confident, local.
// Brand-safe copy: no "quote", no "trained", no "locked in", no em dashes.
const HEADLINES = {
  local: {
    headline: "Connecticut & Massachusetts Movers You Can Trust",
    subhead:
      "Family owned since 2011. Get your free estimate in about 20 minutes and we will get you taken care of.",
  },
  longdistance: {
    headline: "Moving Out of State? We Will Get You There.",
    subhead:
      "Experienced long distance movers based in Enfield, CT. Get your free estimate today and move with confidence.",
  },
  commercial: {
    headline: "Office & Commercial Moves, Handled with Care",
    subhead:
      "Keep your business moving with an experienced crew. Get your free commercial moving estimate today.",
  },
};

function pickHeadline(campaign) {
  const c = (campaign || "").toLowerCase();
  if (/long|distance/.test(c)) return HEADLINES.longdistance;
  if (/commercial|office/.test(c)) return HEADLINES.commercial;
  return HEADLINES.local;
}

export default function FreeEstimatePage({ searchParams }) {
  const { headline, subhead } = pickHeadline(searchParams?.utm_campaign);
  return <FreeEstimateLanding headline={headline} subhead={subhead} />;
}
