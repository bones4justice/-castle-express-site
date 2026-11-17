import { isAdsTraffic } from "./lpAbTest";

// 50/50 split test of the /get-estimate/ step form against the homepage, run
// on the site so nothing changes in Google Ads: ad clicks land on
// /get-estimate/ and middleware.js either lets the step form render ("form")
// or 307-redirects to "/" with the full query string ("home"). Only Google Ads
// traffic enters the test (same rule as the /free-estimate/ test: manual
// utm_source=google or a Google click id gclid/gbraid/wbraid); everyone else
// always gets the step form, no cookie, no redirect.
//
// Both sides send ge_variant to GA4 and Formspree on every lead (StepEstimateForm
// and the sitewide EstimateForm), so lead rates can be compared per group.
// Pure and window-free so middleware (edge runtime) and scripts/test-ge-ab.js
// (plain node) can both use it.

export const GE_AB_COOKIE = "ge_ab";
export const GE_AB_VARIANTS = ["form", "home"];

export function isGeTestTraffic(params) {
  return isAdsTraffic(params);
}

export function pickGeVariant(random = Math.random()) {
  return random < 0.5 ? "form" : "home";
}

// Accepts a Cookie request header or document.cookie. Returns "form",
// "home", or null for missing/invalid values.
export function readGeVariantCookie(cookieHeaderOrDocumentCookie) {
  try {
    if (typeof cookieHeaderOrDocumentCookie !== "string") return null;
    for (const part of cookieHeaderOrDocumentCookie.split(";")) {
      const eq = part.indexOf("=");
      if (eq === -1) continue;
      if (part.slice(0, eq).trim() === GE_AB_COOKIE) {
        const value = part.slice(eq + 1).trim();
        return GE_AB_VARIANTS.includes(value) ? value : null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// The value sent with every lead: the visitor's group, or "not_in_test".
export function geVariantForLead(documentCookie) {
  return readGeVariantCookie(documentCookie) || "not_in_test";
}
