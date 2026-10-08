"use client";
import { useState, useEffect, useRef } from "react";
import { COMPANY } from "@/content";
import { Check, ArrowRight, Phone } from "@/components/Icons";
import { getSmartMovingAttribution, getAttribution } from "@/lib/utm";

// Two-step, ad-only estimate form for /free-estimate. Submission is IDENTICAL
// to the sitewide EstimateForm: it POSTs to /api/lead/ (server spam filter ->
// Formspree + SmartMoving) with the same payload shape, so leads land in the
// exact same pipeline. Step 1 asks about the move (size, date, from, to);
// step 2 asks for contact details. NO conversion events fire on the step 1
// advance; Meta Lead / gtag generate_lead / oaiq fire only after the server
// confirms acceptance, same as before.
//
// idPrefix keeps element ids unique when the page renders two instances
// (hero + final CTA).

const SIZES = [
  "Studio / 1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4+ Bedrooms",
  "Office / Commercial",
];

const GOLD = "#FBCB0B";
const BORDER = "#969a9d";

export default function LandingEstimateForm({ idPrefix = "le", version = "" }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", moveDate: "",
    moveFrom: "", moveTo: "", moveSize: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const continueToStep2 = () => {
    if (!formData.moveSize) {
      setError("Please pick a move size so we can estimate accurately.");
      return;
    }
    if (!formData.moveFrom.trim() || !formData.moveTo.trim()) {
      setError("Please tell us where you are moving from and to (town or ZIP).");
      return;
    }
    setError("");
    setStep(2);
  };

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
          formspree: { ...formData, ...attribution, landing: "free-estimate", version },
          smartmoving: smPayload,
          oaiEventId,
          pageUrl: window.location.href,
        }),
      });
      const res = await leadRes.json().catch(() => ({}));
      // Success only when the server confirms acceptance; on failure keep the
      // entered details on screen so the customer can retry.
      if (!leadRes.ok || res.ok === false) {
        setError(res.error || "Something went wrong sending your request. Please try again, or call us at 1-888-553-4503.");
        setLoading(false);
        return;
      }
      // Same conversion signals the sitewide form fires - ONLY on a confirmed
      // accepted submit, never on step changes, clicks, page views, or failed sends.
      if (typeof fbq === "function") fbq("track", "Lead");
      if (typeof window.oaiq === "function")
        window.oaiq("measure", "lead_created", { type: "customer_action" }, { event_id: oaiEventId });
      if (typeof window.gtag !== "undefined")
        window.gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "free_estimate_landing",
        });
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setError("We could not send your request (connection problem). Please try again, or call us at 1-888-553-4503.");
    }
    setLoading(false);
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
  const buttonStyle = (disabled) => ({
    width: "100%", marginTop: 14, minHeight: 52,
    background: GOLD, color: "#000000", border: "none", borderRadius: 8,
    fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17,
    cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.7 : 1,
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  });

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
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontWeight: 700,
          fontSize: 19, color: "#000000", margin: "0 0 2px",
        }}>Get Your Free Estimate</h2>
        <span style={{
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 11,
          color: "#969a9d", whiteSpace: "nowrap", textTransform: "uppercase",
          letterSpacing: "0.03em",
        }}>Step {step} of 2</span>
      </div>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 12.5,
        color: "#969a9d", margin: "0 0 12px",
      }}>Typically responds in about 20 minutes</p>

      {/* Honeypot: hidden from humans, bots auto-fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {step === 1 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor={`${idPrefix}-size`} style={labelStyle}>Move Size</label>
              <select id={`${idPrefix}-size`} name="moveSize" style={{ ...inputStyle, appearance: "auto" }}
                value={formData.moveSize} onChange={update("moveSize")} aria-label="Move Size">
                <option value="" style={optionStyle}>Select size...</option>
                {SIZES.map((s) => <option key={s} value={s} style={optionStyle}>{s}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor={`${idPrefix}-date`} style={labelStyle}>Move Date <span style={{ color: "#969a9d", textTransform: "none" }}>(if known)</span></label>
              <input id={`${idPrefix}-date`} name="moveDate" type="date" style={inputStyle}
                value={formData.moveDate} onChange={update("moveDate")} aria-label="Move Date" />
            </div>
            <div>
              <label htmlFor={`${idPrefix}-from`} style={labelStyle}>Moving From</label>
              <input id={`${idPrefix}-from`} name="moveFrom" style={inputStyle} placeholder="Town or ZIP"
                value={formData.moveFrom} onChange={update("moveFrom")} aria-label="Moving From" />
            </div>
            <div>
              <label htmlFor={`${idPrefix}-to`} style={labelStyle}>Moving To</label>
              <input id={`${idPrefix}-to`} name="moveTo" style={inputStyle} placeholder="Town or ZIP"
                value={formData.moveTo} onChange={update("moveTo")} aria-label="Moving To" />
            </div>
          </div>

          {error && (
            <p role="alert" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 12px", margin: "12px 0 0 0" }}>
              {error}
            </p>
          )}
          <button type="button" onClick={continueToStep2} style={buttonStyle(false)}>
            Continue <ArrowRight />
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            <div>
              <label htmlFor={`${idPrefix}-name`} style={labelStyle}>Name</label>
              <input id={`${idPrefix}-name`} name="name" style={inputStyle} placeholder="Full name"
                value={formData.name} onChange={update("name")} required aria-label="Name" />
            </div>
            <div>
              <label htmlFor={`${idPrefix}-phone`} style={labelStyle}>Phone</label>
              <input id={`${idPrefix}-phone`} name="phone" type="tel" style={inputStyle} placeholder="(860) 555-0123"
                value={formData.phone} onChange={update("phone")} required aria-label="Phone" />
            </div>
            <div>
              <label htmlFor={`${idPrefix}-email`} style={labelStyle}>Email</label>
              <input id={`${idPrefix}-email`} name="email" type="email" style={inputStyle} placeholder="you@email.com"
                value={formData.email} onChange={update("email")} required aria-label="Email" />
            </div>
          </div>

          {error && (
            <p role="alert" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 12px", margin: "12px 0 0 0" }}>
              {error}
            </p>
          )}
          <button type="submit" disabled={loading} style={buttonStyle(loading)}>
            {loading ? "Submitting..." : <>Get My Free Estimate <ArrowRight /></>}
          </button>
          <button type="button" onClick={() => { setError(""); setStep(1); }} style={{
            background: "none", border: "none", width: "100%", marginTop: 8,
            fontFamily: "var(--font-body)", fontSize: 12.5, color: "#969a9d",
            cursor: "pointer", textDecoration: "underline",
          }}>
            Back to move details
          </button>
        </>
      )}

      <p style={{
        fontFamily: "var(--font-body)", fontSize: 10.5, color: "#969a9d",
        marginTop: 8, textAlign: "center",
      }}>No obligation. We will get you taken care of.</p>
    </form>
  );
}
