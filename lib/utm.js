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

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const found = {};
    for (const key of TRACKED_PARAMS) {
      const v = params.get(key);
      if (v) found[key] = v;
    }
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
