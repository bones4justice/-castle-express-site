"use client";
import { useState } from "react";
import { Check, ArrowRight } from "@/components/Icons";

const PACKAGES = [
  "Pro: 25 Box Bundle ($595)",
  "Plus: 50 Box Bundle ($995)",
  "Premium: 100 Box Bundle ($1,895)",
  "Not Sure Yet",
];

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 6,
  border: "1px solid #E5E7EB",
  background: "#F3F4F6",
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

export default function PackingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    address: "", moveDate: "", package: "", notes: "",
  });

  const update = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formspree.io/f/xnjojwly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "Princess Packing Quote Request" }),
      });
      if (typeof window.fbq !== "undefined") window.fbq("track", "Lead");
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "generate_lead", { event_category: "form", event_label: "princess_packing_form" });
        window.gtag("event", "view_princess_packing", { event_category: "conversion", event_label: "princess_packing_form_submit" });
      }
      setSubmitted(true);
    } catch {
      // Still show success since Formspree is fire-and-forget
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
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>
          Quote Request Received!
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6B7280" }}>
          We typically respond within 24 hours. We will reach out to confirm your packing date and package details.
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
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Home Address to Be Packed *</label>
          <input style={inputStyle} placeholder="123 Main St, Enfield, CT 06082" value={formData.address} onChange={update("address")} required />
        </div>
        <div>
          <label style={labelStyle}>Estimated Move Date</label>
          <input type="date" style={inputStyle} value={formData.moveDate} onChange={update("moveDate")} />
        </div>
        <div>
          <label style={labelStyle}>Package of Interest</label>
          <select style={{ ...inputStyle, appearance: "auto" }} value={formData.package} onChange={update("package")}>
            <option value="">Select a package...</option>
            {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Anything Else We Should Know</label>
          <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Number of rooms, special items, timing preferences..." value={formData.notes} onChange={update("notes")} />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <button type="submit" disabled={loading} className="btn btn-primary btn-full" style={{ opacity: loading ? 0.7 : 1, background: "#FBCB0B", borderColor: "#FBCB0B", color: "#000000" }}>
          {loading ? "Submitting..." : <>Submit Packing Quote Request <ArrowRight /></>}
        </button>
      </div>
    </form>
  );
}
