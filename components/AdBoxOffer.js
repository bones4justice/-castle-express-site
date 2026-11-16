"use client";
import { useEffect, useState } from "react";
import { COMPANY } from "@/content";
import { isGoogleAdsVisitor } from "@/lib/utm";

// Free boxes offer, shown in the homepage hero ONLY to Google Ads visitors
// (gclid / gbraid / wbraid or google + cpc tags, on the URL or captured earlier
// this session). Organic and direct visitors get the homepage exactly as
// before: this renders nothing on the server and nothing for them.
// Decided by Joe 2026-11-12: limit the offer's cost to paid clicks.
export const BOX_OFFER = "Book a free walk-through estimate and pick up 20 free moving boxes at our Enfield facility.";
export const BOX_PICKUP_HOURS = "Monday to Friday, 7am to 3pm";
// Phone one-liner. Same offer, shortened; full terms sit behind "Details".
export const BOX_OFFER_SHORT = "Free walk-through estimate + 20 free moving boxes";
const BOX_OFFER_TERMS = `20 free boxes per booked walk-through estimate. Pick up at ${COMPANY.fullAddress}, ${BOX_PICKUP_HOURS}.`;

const VIEW_FLAG = "castle_box_offer_viewed";

// Lead marker: true when the offer was actually shown earlier this session.
// EstimateForm reads it to add a line to the SmartMoving lead notes and a
// box_offer param on generate_lead, so reps see it on the lead itself.
export const BOX_OFFER_NOTE = "Saw free box offer (Google ad): 20 free boxes with a booked walk-through estimate.";
export function boxOfferSeen() {
  try {
    return typeof window !== "undefined" && window.sessionStorage.getItem(VIEW_FLAG) === "1";
  } catch {
    return false;
  }
}

export default function AdBoxOffer() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isGoogleAdsVisitor()) return;
    setShow(true);
    // One GA4 view event per session, so ad-visitor conversion can be
    // compared before and after the offer went live.
    try {
      if (window.sessionStorage.getItem(VIEW_FLAG)) return;
      window.sessionStorage.setItem(VIEW_FLAG, "1");
    } catch {}
    try {
      if (typeof window.gtag !== "undefined") {
        // send_to is required: GTM swallows untargeted gtag() events.
        window.gtag("event", "box_offer_view", { offer: "20_free_boxes", send_to: "G-97Z4EHJM63" });
      }
    } catch {}
  }, []);

  if (!show) return null;
  // Desktop: the full offer box. Phones (<=768px, globals.css .abo-*): one
  // short line above the form plus a "Details" toggle for the full terms and
  // pickup info, so step 1 of the form stays in the first screen.
  return (
    <>
      <div className="abo-full" style={{
        borderLeft: "4px solid #D4A017", background: "rgba(212,160,23,0.12)",
        borderRadius: 8, padding: "12px 16px", marginBottom: 24, maxWidth: 520,
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, lineHeight: 1.4, color: "#fff", margin: 0 }}>
          {BOX_OFFER}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.5, color: "rgba(255,255,255,0.7)", margin: "6px 0 0" }}>
          {BOX_OFFER_TERMS}
        </p>
      </div>
      <div className="abo-short">
        <div className="abo-line">
          <span className="abo-text">{BOX_OFFER_SHORT}</span>
          <button type="button" className="abo-toggle" aria-expanded={open} aria-controls="abo-details" onClick={() => setOpen(o => !o)}>
            {open ? "Hide" : "Details"}
          </button>
        </div>
        <div id="abo-details" className="abo-details" hidden={!open}>
          <p>{BOX_OFFER}</p>
          <p>{BOX_OFFER_TERMS}</p>
        </div>
      </div>
    </>
  );
}
