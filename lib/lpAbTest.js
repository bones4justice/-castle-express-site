import { parseTrackedParams, first } from "./utm";

// 50/50 split test of the Google Ads landing page, run on the site so
// nothing changes in Google Ads: ad clicks land on /free-estimate/ and
// middleware.js either lets the page render ("landing") or 307-redirects to
// the matching service page ("service"). Only Google Ads traffic enters the
// test; everyone else always gets the landing page, no cookie, no redirect.
// Everything here is pure and window-free so middleware (edge runtime) and
// scripts/test-lp-ab.js (plain node) can both use it.

export const LP_AB_COOKIE = "lp_ab";
export const LP_AB_VARIANTS = ["landing", "service"];

// Google Ads traffic: manual utm_source=google tagging OR any Google click
// id (auto-tagging sends gclid/gbraid/wbraid with no utm params at all).
// parseTrackedParams handles both the clean URL shape and the mangled
// pasted-URL shape the Ads account served through Oct 2026.
export function isAdsTraffic(params) {
  try {
    const p = parseTrackedParams(params);
    if (first(p.utm_source).toLowerCase() === "google") return true;
    return Boolean(p.gclid || p.gbraid || p.wbraid);
  } catch {
    return false;
  }
}

// Which service page the "service" variant lands on, by campaign name. Same
// substring spirit as pickVersion in lib/utm.js. movers-near-you and anything
// unrecognized go to the homepage. Never throws.
export function servicePathForCampaign(campaign) {
  try {
    const c = first(campaign).toLowerCase();
    if (/long|distance/.test(c)) return "/services/long-distance-moving/";
    if (/commercial|office/.test(c)) return "/services/commercial-moving/";
    if (/residential/.test(c)) return "/services/residential-moving/";
    return "/";
  } catch {
    return "/";
  }
}

export function pickVariant(random = Math.random()) {
  return random < 0.5 ? "landing" : "service";
}

// Accepts a Cookie request header or document.cookie. Returns "landing",
// "service", or null for missing/invalid values.
export function readVariantCookie(cookieHeaderOrDocumentCookie) {
  try {
    if (typeof cookieHeaderOrDocumentCookie !== "string") return null;
    for (const part of cookieHeaderOrDocumentCookie.split(";")) {
      const eq = part.indexOf("=");
      if (eq === -1) continue;
      if (part.slice(0, eq).trim() === LP_AB_COOKIE) {
        const value = part.slice(eq + 1).trim();
        return LP_AB_VARIANTS.includes(value) ? value : null;
      }
    }
    return null;
  } catch {
    return null;
  }
}
