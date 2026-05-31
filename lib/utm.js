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
