"use client";
import { useState } from "react";
import Script from "next/script";
import { MOVE_SIZES, LEAD_SOURCES, COMPANY } from "@/content";
import { Check, ArrowRight } from "@/components/Icons";

export default function EstimateForm({ dark = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", moveDate: "",
    moveFrom: "", moveTo: "", moveSize: "", source: "",
  });

  const update = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ──────────────────────────────────────────────────
    // 1. Formspree — sends leads to your email
    // ──────────────────────────────────────────────────
    try {
      await fetch("https://formspree.io/f/xpqjkjga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Formspree submission error:", err);
    }

    // ──────────────────────────────────────────────────
    // 2. SmartMoving — sends leads to CRM via API
    // ──────────────────────────────────────────────────
    try {
      const smPayload = {
        FullName: formData.name,
        PhoneNumber: formData.phone,
        Email: formData.email,
        BranchId: "352498a1-e171-40cd-8b35-ac5d011720d0",
        UserOptIn: true,
      };
      // Only include optional fields if they have values
      if (formData.moveDate) smPayload.MoveDate = formData.moveDate;
      if (formData.moveSize) smPayload.MoveSize = formData.moveSize;
      if (formData.source) smPayload.ReferralSource = formData.source;
      if (formData.moveFrom) smPayload.OriginAddressFull = formData.moveFrom;
      if (formData.moveTo) smPayload.DestinationAddressFull = formData.moveTo;

      const smRes = await fetch("https://api.smartmoving.com/api/leads/from-provider/v2?providerId=8f882454-9968-445e-8f50-ac5d011a33fc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(smPayload),
      });
      if (!smRes.ok) {
        const smErr = await smRes.text();
        console.error("SmartMoving API error:", smRes.status, smErr);
      }
    } catch (err) {
      console.error("SmartMoving submission error:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  // ─── Styles ───
  const bg = dark ? "rgba(255,255,255,0.06)" : "#fff";
  const inputBg = dark ? "rgba(255,255,255,0.1)" : "#F3F4F6";
  const inputColor = dark ? "#fff" : "#1A1A2E";
  const inputBorder = dark ? "rgba(255,255,255,0.15)" : "#E5E7EB";
  const labelColor = dark ? "rgba(255,255,255,0.75)" : "#6B7280";

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 6,
    border: `1px solid ${inputBorder}`, background: inputBg,
    color: inputColor, fontFamily: "var(--font-body)", fontSize: 14,
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", fontFamily: "var(--font-heading)", fontSize: 12,
    fontWeight: 600, color: labelColor, marginBottom: 4,
    textTransform: "uppercase", letterSpacing: "0.04em",
  };

  // ─── Success State ───
  if (submitted) {
    return (
      <div style={{
        background: bg, borderRadius: 12, padding: 40, textAlign: "center",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E5E7EB",
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%", background: "#D4A017",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <Check />
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: dark ? "#fff" : "#1A1A2E", marginBottom: 8 }}>
          Estimate Request Received!
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: dark ? "rgba(255,255,255,0.7)" : "#6B7280" }}>
          We typically respond within 20 minutes. Check your phone for a text from our team.
        </p>
      </div>
    );
  }

  // ─── Form ───
  return (
    <form id="smartmoving-form" onSubmit={handleSubmit} style={{
      background: bg, borderRadius: 12, padding: "28px 24px",
      border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E5E7EB",
    }}>
      <h3 style={{
        fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic",
        fontSize: 22, color: dark ? "#fff" : "#1A1A2E", margin: "0 0 4px 0",
      }}>Get Your Free Estimate</h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 13,
        color: dark ? "rgba(255,255,255,0.75)" : "#6B7280", margin: "0 0 20px 0",
      }}>Typically responds in 20 min. or less</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label htmlFor="customer-name" style={labelStyle}>Name</label>
          <input id="customer-name" name="name" style={inputStyle} placeholder="Your full name" value={formData.name} onChange={update("name")} required aria-label="Name" />
        </div>
        <div>
          <label htmlFor="phone-number" style={labelStyle}>Phone</label>
          <input id="phone-number" name="phone" style={inputStyle} placeholder="(860) 555-0123" type="tel" value={formData.phone} onChange={update("phone")} required aria-label="Phone" />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input id="email" name="email" style={inputStyle} placeholder="you@email.com" type="email" value={formData.email} onChange={update("email")} required aria-label="Email" />
        </div>
        <div>
          <label htmlFor="date" style={labelStyle}>Move Date</label>
          <input id="date" name="moveDate" style={inputStyle} type="date" value={formData.moveDate} onChange={update("moveDate")} aria-label="Move Date" />
        </div>
        <div>
          <label htmlFor="origin-full" style={labelStyle}>Moving From</label>
          <input id="origin-full" name="moveFrom" style={inputStyle} placeholder="City, State or ZIP" value={formData.moveFrom} onChange={update("moveFrom")} aria-label="Moving From" />
        </div>
        <div>
          <label htmlFor="destination-full" style={labelStyle}>Moving To</label>
          <input id="destination-full" name="moveTo" style={inputStyle} placeholder="City, State or ZIP" value={formData.moveTo} onChange={update("moveTo")} aria-label="Moving To" />
        </div>
        <div>
          <label htmlFor="move-size" style={labelStyle}>Move Size</label>
          <select id="move-size" name="moveSize" style={{ ...inputStyle, appearance: "auto" }} value={formData.moveSize} onChange={update("moveSize")} aria-label="Move Size">
            <option value="">Select size...</option>
            {MOVE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="how-did-you-hear-about-us" style={labelStyle}>How did you find us?</label>
          <select id="how-did-you-hear-about-us" name="source" style={{ ...inputStyle, appearance: "auto" }} value={formData.source} onChange={update("source")} aria-label="How did you find us?">
            <option value="">Select...</option>
            {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button type="submit" disabled={loading} className="btn btn-primary btn-full" style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? "Submitting..." : <>Get Free Estimate <ArrowRight /></>}
        </button>
      </div>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 11,
        color: dark ? "rgba(255,255,255,0.75)" : "#999",
        marginTop: 10, textAlign: "center",
      }}>
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>

      {/* SmartMoving hidden fields */}
      <input type="hidden" id="branch-id" value="352498a1-e171-40cd-8b35-ac5d011720d0" />
      <input type="hidden" id="user-opt-in" value="true" />

      {/* SmartMoving field mapping */}
      <Script id="smartmoving-mapping" strategy="afterInteractive">{`
        window.SmartMoving = window.SmartMoving || {};
        window.SmartMoving.config = window.SmartMoving.config || {};
        window.SmartMoving.config.formSelector = '#smartmoving-form';
        window.SmartMoving.mapping = {
          'customer-name': { target: 'FullName', required: true },
          'phone-number': { target: 'PhoneNumber', required: true },
          'email': { target: 'Email', required: true },
          'date': { target: 'MoveDate', required: true },
          'move-size': { target: 'MoveSize', required: false },
          'how-did-you-hear-about-us': { target: 'ReferralSource', required: false },
          'branch-id': { target: 'BranchId', required: false },
          'user-opt-in': { target: 'UserOptIn', required: true },
          'origin-full': { target: 'OriginAddressFull', required: false },
          'destination-full': { target: 'DestinationAddressFull', required: false },
        };
      `}</Script>
    </form>
  );
}
