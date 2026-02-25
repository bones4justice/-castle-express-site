"use client";
import { useState } from "react";
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
    // Formspree — sends leads to your email
    // ──────────────────────────────────────────────────
    try {
      await fetch("https://formspree.io/f/xpqjkjga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Form submission error:", err);
    }
    setLoading(false);
    setSubmitted(true);
  };

  // ─── Styles ───
  const bg = dark ? "rgba(255,255,255,0.06)" : "#fff";
  const inputBg = dark ? "rgba(255,255,255,0.1)" : "#F3F4F6";
  const inputColor = dark ? "#fff" : "#1A1A2E";
  const inputBorder = dark ? "rgba(255,255,255,0.15)" : "#E5E7EB";
  const labelColor = dark ? "rgba(255,255,255,0.7)" : "#6B7280";

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
    <form onSubmit={handleSubmit} style={{
      background: bg, borderRadius: 12, padding: "28px 24px",
      border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E5E7EB",
    }}>
      <h3 style={{
        fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic",
        fontSize: 22, color: dark ? "#fff" : "#1A1A2E", margin: "0 0 4px 0",
      }}>Get Your Free Estimate</h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 13,
        color: dark ? "rgba(255,255,255,0.6)" : "#6B7280", margin: "0 0 20px 0",
      }}>Typically responds in 20 min. or less</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label htmlFor="est-name" style={labelStyle}>Name</label>
          <input id="est-name" style={inputStyle} placeholder="Your full name" value={formData.name} onChange={update("name")} required />
        </div>
        <div>
          <label htmlFor="est-phone" style={labelStyle}>Phone</label>
          <input id="est-phone" style={inputStyle} placeholder="(860) 555-0123" type="tel" value={formData.phone} onChange={update("phone")} required />
        </div>
        <div>
          <label htmlFor="est-email" style={labelStyle}>Email</label>
          <input id="est-email" style={inputStyle} placeholder="you@email.com" type="email" value={formData.email} onChange={update("email")} required />
        </div>
        <div>
          <label htmlFor="est-date" style={labelStyle}>Move Date</label>
          <input id="est-date" style={inputStyle} type="date" value={formData.moveDate} onChange={update("moveDate")} />
        </div>
        <div>
          <label htmlFor="est-from" style={labelStyle}>Moving From</label>
          <input id="est-from" style={inputStyle} placeholder="City, State or ZIP" value={formData.moveFrom} onChange={update("moveFrom")} />
        </div>
        <div>
          <label htmlFor="est-to" style={labelStyle}>Moving To</label>
          <input id="est-to" style={inputStyle} placeholder="City, State or ZIP" value={formData.moveTo} onChange={update("moveTo")} />
        </div>
        <div>
          <label htmlFor="est-size" style={labelStyle}>Move Size</label>
          <select id="est-size" style={{ ...inputStyle, appearance: "auto" }} value={formData.moveSize} onChange={update("moveSize")}>
            <option value="">Select size...</option>
            {MOVE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="est-source" style={labelStyle}>How did you find us?</label>
          <select id="est-source" style={{ ...inputStyle, appearance: "auto" }} value={formData.source} onChange={update("source")}>
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
        color: dark ? "rgba(255,255,255,0.4)" : "#999",
        marginTop: 10, textAlign: "center",
      }}>
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}
