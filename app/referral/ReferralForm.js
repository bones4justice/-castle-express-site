"use client";
import { useState } from "react";
import { Check, ArrowRight } from "@/components/Icons";

const ROLES = [
  "Property Manager",
  "Realtor / Real Estate Agent",
  "Restoration Company",
  "Senior Living Facility",
  "Estate Attorney / Probate",
  "Past Castle Express Customer",
  "Other",
];

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #D1D5DB",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "var(--font-body)",
  color: "#1A1A2E",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-heading)",
  fontWeight: 600,
  fontSize: 13,
  color: "#374151",
  marginBottom: 6,
};

const initialForm = {
  referrerFirstName: "",
  referrerLastName: "",
  referrerEmail: "",
  referrerPhone: "",
  referrerCompany: "",
  referrerType: "",
  referredFirstName: "",
  referredLastName: "",
  referredPhone: "",
  referredEmail: "",
  moveDate: "",
  notes: "",
};

export default function ReferralForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    // 1. Formspree  -  email notifications
    try {
      const response = await fetch("https://formspree.io/f/xnjojwly", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setError(true);
        setSubmitting(false);
        return;
      }
    } catch {
      setError(true);
      setSubmitting(false);
      return;
    }

    // 2. SmartMoving  -  create lead from referred person's info
    try {
      const smPayload = {
        FullName: (formData.referredFirstName + " " + formData.referredLastName).trim(),
        PhoneNumber: formData.referredPhone,
        ReferralSource: "Referral Program",
        UserOptIn: true,
      };
      if (formData.referredEmail) smPayload.Email = formData.referredEmail;
      if (formData.moveDate) smPayload.MoveDate = formData.moveDate.replace(/-/g, "");
      smPayload.Notes = `REFERRAL - Referred by: ${formData.referrerFirstName} ${formData.referrerLastName} | Phone: ${formData.referrerPhone} | Email: ${formData.referrerEmail} | Company: ${formData.referrerCompany} | Role: ${formData.referrerType}${formData.notes ? " | Notes: " + formData.notes : ""}`;

      const smRes = await fetch("https://api.smartmoving.com/api/leads/from-provider/v2?providerKey=d1cc3234-4fdc-4b3d-ad89-b0ec010a0ee8&branchId=352498a1-e171-40cd-8b35-ac5d011720d0", {
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

    setSubmitted(true);
    setSubmitting(false);
  };

  const reset = () => {
    setFormData(initialForm);
    setSubmitted(false);
    setError(false);
  };

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Check size={28} style={{ color: "#059669" }} />
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "#1A1A2E", marginBottom: 8 }}>
          Referral Submitted!
        </h3>
        <p className="body-md text-gray" style={{ maxWidth: 440, margin: "0 auto 24px", lineHeight: 1.6 }}>
          We received your referral and will reach out to {formData.referredFirstName || "your contact"} within 24 hours. Your commission will be processed within 30 days of their completed move.
        </p>
        <button onClick={reset} className="btn btn-outline" style={{ cursor: "pointer" }}>
          Submit another referral
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* LEFT COLUMN - Your Info */}
        <div className="referral-col">
          <div style={{ borderLeft: "3px solid #D4A017", paddingLeft: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "#D4A017", textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Information</span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>First Name *</label>
            <input type="text" name="referrerFirstName" required value={formData.referrerFirstName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Last Name *</label>
            <input type="text" name="referrerLastName" required value={formData.referrerLastName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email *</label>
            <input type="email" name="referrerEmail" required value={formData.referrerEmail} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Phone *</label>
            <input type="tel" name="referrerPhone" required value={formData.referrerPhone} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Company / Organization</label>
            <input type="text" name="referrerCompany" value={formData.referrerCompany} onChange={handleChange} placeholder="Property management co., realty office, etc." style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Your Role *</label>
            <select name="referrerType" required value={formData.referrerType} onChange={handleChange} style={{ ...inputStyle, appearance: "auto" }}>
              <option value="">Select your role...</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        {/* RIGHT COLUMN - Referred Person */}
        <div className="referral-col">
          <div style={{ borderLeft: "3px solid #D4A017", paddingLeft: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "#D4A017", textTransform: "uppercase", letterSpacing: "0.05em" }}>Person You&apos;re Referring</span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Their First Name *</label>
            <input type="text" name="referredFirstName" required value={formData.referredFirstName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Their Last Name *</label>
            <input type="text" name="referredLastName" required value={formData.referredLastName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Their Phone *</label>
            <input type="tel" name="referredPhone" required value={formData.referredPhone} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Their Email</label>
            <input type="email" name="referredEmail" value={formData.referredEmail} onChange={handleChange} placeholder="Optional but helpful" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Estimated Move Date</label>
            <input type="date" name="moveDate" value={formData.moveDate} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Notes</label>
            <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} placeholder="Any details about their move - size, location, special needs" style={{ ...inputStyle, resize: "vertical" }} />
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <div style={{ marginTop: 24 }}>
        {error && (
          <p style={{ color: "#EF4444", fontSize: 14, textAlign: "center", marginBottom: 12 }}>
            Something went wrong. Please try again or call us directly.
          </p>
        )}
        <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: "100%", cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.7 : 1 }}>
          {submitting ? "Submitting..." : "Submit Referral"} {!submitting && <ArrowRight />}
        </button>
        <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>
          By submitting, you confirm this referral has not been previously booked with Castle Express.
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </form>
  );
}
