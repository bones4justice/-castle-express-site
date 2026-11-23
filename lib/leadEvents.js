// The one place the estimate forms send GA4's generate_lead.
//
// generate_lead is the conversion Google Ads bids on (GTM's "Submit lead
// form" tag fires on this same push), so it must be sent exactly once for
// each lead the server accepted:
//   - never on a step change ("Next", "Continue"), a click or a page view;
//   - never when the server rejected the submission or quietly dropped it as
//     spam (the forms only call this after /api/lead/ confirms);
//   - never twice for one submission. Each submission has its own id; a
//     second call with the same id is ignored.
//
// send_to is required: GTM claims untargeted gtag() pushes and has no GA4 tag
// (container v35+), so without it the event never reaches GA4. GTM's Ads
// conversion trigger still fires on the same push; never add a second push.
export const GA4_ID = "G-97Z4EHJM63";

const sent = new Set();

export function sendGenerateLead(submissionId, params = {}) {
  if (typeof window === "undefined") return false;
  const id = String(submissionId || "");
  if (!id || sent.has(id)) return false;
  sent.add(id);
  if (typeof window.gtag !== "function") return false;
  window.gtag("event", "generate_lead", { ...params, send_to: GA4_ID });
  return true;
}
