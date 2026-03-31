"use client";
import { useState } from "react";
import { Check, ArrowRight } from "@/components/Icons";

const HOME_SIZES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];

const OFFERS = [
  "Free Night of Truck Storage (Double Closings)",
  "Free First Month of Storage",
  "20 Free Boxes + Roll of Tape with Walk-Through Estimate",
];

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 6,
  border: "1px solid #E5E7EB",
  background: "#fff",
  color: "#1A1A2E",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-heading)",
  fontSize: 12,
  fontWeight: 600,
  color: "#6B7280",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

export default function PostcardForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    moveFrom: "", moveTo: "", moveDate: "", homeSize: "", notes: "",
  });
  const [selectedOffer, setSelectedOffer] = useState("");

  const update = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formspree.io/f/xnjojwly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          offerSelected: selectedOffer,
          formType: "Postcard Landing Page",
        }),
      });
      if (typeof window.fbq !== "undefined") window.fbq("track", "Lead");
      if (typeof window.gtag !== "undefined") window.gtag("event", "generate_lead", { event_category: "form", event_label: "postcard_form" });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ background: "#fff", borderRadius: 12, padding: 40, textAlign: "center", border: "1px solid #E5E7EB" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#FBCB0B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Check />
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#1A1A2E", marginBottom: 8, fontSize: 20 }}>
          Thanks! We received your request.
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#6B7280", lineHeight: 1.6 }}>
          We will be in touch within one business day. Don't forget to mention your postcard offers when we call!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 12, padding: "28px 24px", border: "1px solid #E5E7EB" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>First Name *</label>
          <input style={inputStyle} value={formData.firstName} onChange={update("firstName")} required />
        </div>
        <div>
          <label style={labelStyle}>Last Name *</label>
          <input style={inputStyle} value={formData.lastName} onChange={update("lastName")} required />
        </div>
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input type="tel" style={inputStyle} placeholder="(860) 555-0123" value={formData.phone} onChange={update("phone")} required />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" style={inputStyle} placeholder="you@email.com" value={formData.email} onChange={update("email")} required />
        </div>
        <div>
          <label style={labelStyle}>Moving From *</label>
          <input style={inputStyle} placeholder="Address, City, State" value={formData.moveFrom} onChange={update("moveFrom")} required />
        </div>
        <div>
          <label style={labelStyle}>Moving To *</label>
          <input style={inputStyle} placeholder="Address, City, State" value={formData.moveTo} onChange={update("moveTo")} required />
        </div>
        <div>
          <label style={labelStyle}>Estimated Move Date *</label>
          <input type="date" style={inputStyle} value={formData.moveDate} onChange={update("moveDate")} required />
        </div>
        <div>
          <label style={labelStyle}>Home Size *</label>
          <select style={{ ...inputStyle, appearance: "auto" }} value={formData.homeSize} onChange={update("homeSize")} required>
            <option value="">Select size...</option>
            {HOME_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Offer radio buttons */}
      <div style={{ marginTop: 16 }}>
        <label style={labelStyle}>Choose One Offer:</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
          {OFFERS.map(offer => (
            <label key={offer} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "12px 14px", borderRadius: 8, border: selectedOffer === offer ? "2px solid #FBCB0B" : "1px solid #E5E7EB", background: selectedOffer === offer ? "#FFFBEB" : "#fff", transition: "all 0.15s" }}>
              <input type="radio" name="offerSelection" checked={selectedOffer === offer} onChange={() => setSelectedOffer(offer)} style={{ width: 18, height: 18, accentColor: "#FBCB0B", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#1A1A2E" }}>{offer}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={labelStyle}>Anything Else We Should Know</label>
        <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Special items, timing preferences, questions..." value={formData.notes} onChange={update("notes")} />
      </div>

      <div style={{ marginTop: 16 }}>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px 20px", background: "#FBCB0B", color: "#000", border: "none", borderRadius: 8, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading ? "Submitting..." : <>Send My Free Estimate Request <ArrowRight /></>}
        </button>
      </div>
    </form>
  );
}
