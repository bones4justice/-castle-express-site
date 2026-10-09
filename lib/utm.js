const STORAGE_KEY = "castle_attribution";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_adgroup",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
];

// Collapse a query value to a plain string. Next 14 passes a repeated query
// param (?utm_campaign=a&utm_campaign=b) as an ARRAY, and calling a string
// method on the raw value crashed /free-estimate/ server-side (Oct 2-8 2026).
// String, array, or missing all collapse to a string; the FIRST value wins.
export function first(value) {
  if (Array.isArray(value)) value = value[0];
  return typeof value === "string" ? value : "";
}

// Recover the real param key from the pasted-URL mangling. A Google Ads
// misconfiguration (full landing URL pasted into the ad groups' "Final URL
// suffix") made served clicks arrive with the whole URL glued onto the first
// param key, e.g.
//   "https://www.castleexpressmoving.com/free-estimate/?utm_source" = "google"
// For any key that itself contains a "?utm_" / "?gclid" / "?gbraid" prefix,
// strip everything up to and including the last "?". Plain keys pass through
// untouched, so this keeps working after the Ads account is cleaned up.
function cleanKey(key) {
  if (typeof key !== "string") return "";
  if (key.includes("?utm_") || key.includes("?gclid") || key.includes("?gbraid")) {
    return key.slice(key.lastIndexOf("?") + 1);
  }
  return key;
}

// Pure, window-free parser shared by the browser-side capture below and the
// server-rendered /free-estimate/ page. Accepts a query string ("?a=b" or
// "a=b") or a Next searchParams object (values may be arrays). Returns only
// TRACKED_PARAMS keys; mangled pasted-URL keys are cleaned first; the first
// value wins when a key repeats; empty values are dropped.
export function parseTrackedParams(input) {
  const out = {};
  const add = (rawKey, rawValue) => {
    const key = cleanKey(rawKey);
    if (!TRACKED_PARAMS.includes(key)) return;
    const value = first(rawValue);
    if (!value) return;
    if (!(key in out)) out[key] = value;
  };
  try {
    if (input && typeof input === "object" && !(input instanceof URLSearchParams)) {
      for (const k of Object.keys(input)) add(k, input[k]);
    } else {
      for (const [k, v] of new URLSearchParams(input || "")) add(k, v);
    }
  } catch {}
  return out;
}

// Four /free-estimate/ versions, chosen server-side so the matched message is
// in the first paint (no client flash). Content lives in FreeEstimateLanding's
// VERSIONS map. Channel beats campaign name: Meta/social visitors are not
// actively searching, so they get the friendlier, shorter version even if the
// campaign name says long distance or commercial. Never throws; whatever
// arrives in the query string, the page must render.
export function pickVersion(searchParams) {
  try {
    const p = parseTrackedParams(searchParams);
    const campaign = first(p.utm_campaign).toLowerCase();
    const source = first(p.utm_source).toLowerCase();
    const medium = first(p.utm_medium).toLowerCase();
    if (source === "facebook" || source === "instagram" || medium === "paid_social") return "social";
    if (/long|distance/.test(campaign)) return "longdistance";
    if (/commercial|office/.test(campaign)) return "commercial";
    return "residential";
  } catch {
    return "residential";
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const found = parseTrackedParams(window.location.search);
    if (Object.keys(found).length === 0) return;

    found._captured_at = new Date().toISOString();
    found._landing_path = window.location.pathname;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {}
}

export function getAttribution() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Maps stored attribution onto SmartMoving lead fields.
//
// Critical: with Google Ads auto-tagging ON, paid clicks land with a gclid and
// NO utm_* params, so without this every paid lead would arrive with a blank
// UtmSource. When there is no manual utm_source, we synthesize source/medium
// from whichever click id is present. Manual utm tags always win (they carry
// the real campaign and keyword names). Only ever adds fields that are already
// proven to be accepted by the SmartMoving leads/from-provider API.
export function getSmartMovingAttribution() {
  const a = getAttribution();
  const out = {};

  if (a.utm_source)   out.UtmSource   = a.utm_source;
  if (a.utm_medium)   out.UtmMedium   = a.utm_medium;
  if (a.utm_campaign) out.UtmCampaign = a.utm_campaign;
  if (a.utm_content)  out.UtmContent  = a.utm_content;
  if (a.utm_term)     out.UtmKeyword  = a.utm_term;
  if (a.utm_adgroup)  out.UtmAdGroup  = a.utm_adgroup;

  // Always preserve the raw click id for offline-conversion import.
  const clickId = a.gclid || a.gbraid || a.wbraid || a.fbclid || a.msclkid;
  if (clickId) out.UtmCustomTracking = clickId;

  // Fallback: no manual source, but we have a paid click id.
  if (!out.UtmSource) {
    if (a.gclid || a.gbraid || a.wbraid) {
      out.UtmSource = "google";
      out.UtmMedium = out.UtmMedium || "cpc";
    } else if (a.fbclid) {
      out.UtmSource = "facebook";
      out.UtmMedium = out.UtmMedium || "paid_social";
    } else if (a.msclkid) {
      out.UtmSource = "bing";
      out.UtmMedium = out.UtmMedium || "cpc";
    }
  }
  return out;
}
