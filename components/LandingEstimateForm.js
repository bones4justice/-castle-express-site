"use client";
import { useState, useEffect, useRef } from "react";
import { COMPANY } from "@/content";
import { Check, ArrowRight, Phone } from "@/components/Icons";
import { getSmartMovingAttribution, getAttribution } from "@/lib/utm";

// Short, ad-only estimate form for /free-estimate. Submission is IDENTICAL to
// the sitewide EstimateForm: it POSTs to /api/lead/ (server spam filter ->
// Formspree + SmartMoving) with the same payload shape, so leads land in the
// exact same pipeline. The only differences are the shorter field set, the
// UTM/click-id passthrough as explicit hidden fields, and a compact thank-you
// state built for a phone screen.

const SIZES = [
  "Studio / 1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4+ Bedrooms",
  "Office / Commercial",
];

const GOLD = "#FBCB0B";
const BORDER = "#969a9d";

export default function LandingEstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", moveDate: "",
    moveFrom: "", moveTo: "", moveSize: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const smPayload = {
        FullName: formData.name,
        PhoneNumber: formData.phone,
        Email: formData.email,
        UserOptIn: true,
      };
      if (formData.moveDate) smPayload.MoveDate = formData.moveDate.replace(/-/g, "");
      if (formData.moveSize) smPayload.MoveSize = formData.moveSize;
      if (formData.moveFrom) smPayload.OriginAddressFull = formData.moveFrom;
      if (formData.moveTo) smPayload.DestinationAddressFull = formData.moveTo;
      Object.assign(smPayload, getSmartMovingAttribution());

      // UTM + gclid/fbclid ride along to Formspree as explicit hidden fields
      // (they already reach SmartMoving via getSmartMovingAttribution above).
      const attribution = getAttribution();

      const oaiEventId = crypto.randomUUID();

      const leadRes = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "estimate",
          hp: honeypot,
          elapsedMs: Date.now() - openedAt.current,
          formspree: { ...formData, ...attribution, landing: "free-estimate" },
          smartmoving: smPayload,
          oaiEventId,
          pageUrl: window.location.href,
        }),
      });

      // Same conversion signals the sitewide form fires. Meta Lead fires ONLY
      // on an accepted estimate submit (HTTP 2xx), never on clicks/page views.
      if (leadRes.ok && typeof fbq === "function") fbq("track", "Lead");
      if (typeof window.oaiq === "function")
        window.oaiq("measure", "lead_created", { type: "customer_action" }, { event_id: oaiEventId });
      if (typeof window.gtag !== "undefined")
        window.gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "free_estimate_landing",
        });
    } catch (err) {
      console.error("Lead submission error:", err);
    }
    setLoading(false);
    setSubmitted(true);
  };

  const successTracked = useRef(false);
  useEffect(() => {
    if (!submitted || successTracked.current) return;
    successTracked.current = true;
    if (window.gtag)
      window.gtag("event", "form_submission_success", { form_location: "/free-estimate" });
    if (window.clarity) window.clarity("set", "form_completed", "true");
  }, [submitted]);

  const inputStyle = {
    width: "100%", padding: "11px 12px", borderRadius: 6,
    border: `1px solid ${BORDER}`, background: "#FFFFFF",
    color: "#000000", fontFamily: "var(--font-body)", fontSize: 16,
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle = {
    display: "block", fontFamily: "var(--font-heading)", fontSize: 11,
    fontWeight: 700, color: "#000000", marginBottom: 3,
    textTransform: "uppercase", letterSpacing: "0.03em",
  };
  const optionStyle = { background: "#FFFFFF", color: "#000000" };

  if (submitted) {
    return (
      <div style={{
        background: "#FFFFFF", borderRadius: 12, padding: "28px 22px",
        border: `1px solid #ebeced`, textAlign: "center",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: GOLD,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 14,
        }}>
          <Check size={32} stroke="#000" />
        </div>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontWeight: 700,
          fontSize: 24, color: "#000000", margin: "0 0 8px",
        }}>
          Got it. We will call you shortly.
        </h2>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5,
          color: "#000000", margin: "0 0 20px",
        }}>
          Your estimate request is in. A member of the Castle Express Moving &amp; Storage
          team will reach out, usually within about 20 minutes, to get you taken care of.
        </p>
        <a href={COMPANY.phoneLink} style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: GOLD, color: "#000000", fontFamily: "var(--font-heading)",
          fontWeight: 700, fontSize: 17, padding: "15px 30px", borderRadius: 8,
          textDecoration: "none", minHeight: 48,
        }}>
          <Phone size={18} /> Call now: (888) 553-4503
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#FFFFFF", borderRadius: 12, padding: "18px 16px",
      border: `1px solid #ebeced`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    }}>
      <h2 style={{
        fontFamily: "var(--font-heading)", fontWeight: 700,
        fontSize: 19, color: "#000000", margin: "0 0 2px",
      }}>Get Your Free Estimate</h2>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 12.5,
        color: "#969a9d", margin: "0 0 12px",
      }}>Typically responds in about 20 minutes</p>

      {/* Honeypot: hidden from humans, bots auto-fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="le-website">Website</label>
        <input id="le-website" name="website" type="text" tabIndex={-1} autoComplete="off"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label htmlFor="le-name" style={labelStyle}>Name</label>
          <input id="le-name" name="name" style={inputStyle} placeholder="Full name"
            value={formData.name} onChange={update("name")} required aria-label="Name" />
        </div>
        <div>
          <label htmlFor="le-phone" style={labelStyle}>Phone</label>
          <input id="le-phone" name="phone" type="tel" style={inputStyle} placeholder="(860) 555-0123"
            value={formData.phone} onChange={update("phone")} required aria-label="Phone" />
        </div>
        <div>
          <label htmlFor="le-email" style={labelStyle}>Email</label>
          <input id="le-email" name="email" type="email" style={inputStyle} placeholder="you@email.com"
            value={formData.email} onChange={update("email")} required aria-label="Email" />
        </div>
        <div>
          <label htmlFor="le-date" style={labelStyle}>Move Date</label>
          <input id="le-date" name="moveDate" type="date" style={inputStyle}
            value={formData.moveDate} onChange={update("moveDate")} aria-label="Move Date" />
        </div>
        <div>
          <label htmlFor="le-from" style={labelStyle}>Moving From</label>
          <input id="le-from" name="moveFrom" style={inputStyle} placeholder="Town or ZIP"
            value={formData.moveFrom} onChange={update("moveFrom")} aria-label="Moving From" />
        </div>
        <div>
          <label htmlFor="le-to" style={labelStyle}>Moving To</label>
          <input id="le-to" name="moveTo" style={inputStyle} placeholder="Town or ZIP"
            value={formData.moveTo} onChange={update("moveTo")} aria-label="Moving To" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="le-size" style={labelStyle}>Move Size</label>
          <select id="le-size" name="moveSize" style={{ ...inputStyle, appearance: "auto" }}
            value={formData.moveSize} onChange={update("moveSize")} aria-label="Move Size">
            <option value="" style={optionStyle}>Select size...</option>
            {SIZES.map((s) => <option key={s} value={s} style={optionStyle}>{s}</option>)}
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} style={{
        width: "100%", marginTop: 14, minHeight: 52,
        background: GOLD, color: "#000000", border: "none", borderRadius: 8,
        fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17,
        cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        {loading ? "Submitting..." : <>Get My Free Estimate <ArrowRight /></>}
      </button>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 10.5, color: "#969a9d",
        marginTop: 8, textAlign: "center",
      }}>No obligation. We will get you taken care of.</p>
    </form>
  );
}
