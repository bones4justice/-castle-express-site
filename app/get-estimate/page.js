import StepEstimateForm from "@/components/StepEstimateForm";

// Ads-only step estimate form (one question per screen). noindex + nofollow
// (overrides the sitewide robots:index in app/layout.js), self-canonical so it
// never emits noindex + canonical-to-homepage, deliberately left out of
// app/sitemap.js and the nav. Header/Footer are hidden by components/ChromeGate.js
// (BARE_ROUTES). Not part of the /free-estimate/ split test in middleware.js.
export const metadata = {
  title: "Free Moving Estimate | Castle Express Moving & Storage",
  description:
    "Get a fast, free moving estimate from Castle Express Moving & Storage. Family owned since 2011, serving Connecticut and Massachusetts.",
  alternates: { canonical: "/get-estimate/" },
  robots: { index: false, follow: false },
};

export default function GetEstimatePage() {
  return <StepEstimateForm />;
}
