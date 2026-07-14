"use client";
import { useState } from "react";

const FIELD_STYLE = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  padding: "13px 16px",
  outline: "none",
  width: "100%",
  borderRadius: 0,
  WebkitAppearance: "none",
  appearance: "none",
};

const LABEL_STYLE = {
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  fontWeight: 600,
  fontFamily: "var(--font-heading)",
  display: "block",
  marginBottom: 8,
};

const REQUIRED = ["fname", "lname", "phone", "email", "address", "movedate", "pkg"];

export default function PackingEstimateForm() {
  const [values, setValues] = useState({ fname: "", lname: "", phone: "", email: "", address: "", movedate: "", pkg: "", notes: "" });
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (k) => (e) => setValues(v => ({ ...v, [k]: e.target.value }));

  async function handleSubmit() {
    const bad = {};
    REQUIRED.forEach(k => { if (!values[k].trim()) bad[k] = true; });
    setInvalid(bad);
    if (Object.keys(bad).length > 0) return;

    setStatus("sending");
    try {
      await fetch("https://formspree.io/f/xpqjkjga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, package: values.pkg }),
      });
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  }

  const field = (key, label, props = {}) => (
    <div>
      <label htmlFor={`pp-${key}`} style={LABEL_STYLE}>{label}</label>
      <input
        id={`pp-${key}`}
        value={values[key]}
        onChange={set(key)}
        style={{ ...FIELD_STYLE, borderColor: invalid[key] ? "#F72585" : "rgba(255,255,255,0.12)" }}
        {...props}
      />
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
      {field("fname", "First Name", { type: "text", placeholder: "Jane" })}
      {field("lname", "Last Name", { type: "text", placeholder: "Smith" })}
      {field("phone", "Phone Number", { type: "tel", placeholder: "(860) 555-0100" })}
      {field("email", "Email Address", { type: "email", placeholder: "jane@email.com" })}
      <div style={{ gridColumn: "1 / -1" }}>
        <label htmlFor="pp-address" style={LABEL_STYLE}>Home Address to Be Packed</label>
        <input id="pp-address" type="text" placeholder="123 Main St, Enfield, CT" value={values.address} onChange={set("address")}
          style={{ ...FIELD_STYLE, borderColor: invalid.address ? "#F72585" : "rgba(255,255,255,0.12)" }} />
      </div>
      {field("movedate", "Estimated Move Date", { type: "date" })}
      <div>
        <label htmlFor="pp-pkg" style={LABEL_STYLE}>Package of Interest</label>
        <select id="pp-pkg" value={values.pkg} onChange={set("pkg")}
          style={{ ...FIELD_STYLE, borderColor: invalid.pkg ? "#F72585" : "rgba(255,255,255,0.12)" }}>
          <option value="">Select a Package</option>
          <option value="pro">Pro: 25 Box Bundle ($595)</option>
          <option value="plus">Plus: 50 Box Bundle ($995) ⭐</option>
          <option value="premium">Premium: 100 Box Bundle ($1,895)</option>
          <option value="unsure">Not Sure Yet</option>
        </select>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label htmlFor="pp-notes" style={LABEL_STYLE}>Anything Else We Should Know?</label>
        <textarea id="pp-notes" rows={4} placeholder="Rooms of concern, fragile items, tight timeline, etc." value={values.notes} onChange={set("notes")}
          style={{ ...FIELD_STYLE, resize: "vertical", minHeight: 110 }} />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "sending" || status === "done"}
        style={{
          gridColumn: "1 / -1",
          background: status === "done" ? "#1a7a4a" : status === "error" ? "#c0392b" : "#F72585",
          color: "#fff",
          fontFamily: "var(--font-heading)",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          border: "none",
          padding: "18px",
          cursor: status === "sending" || status === "done" ? "default" : "pointer",
          marginTop: 4,
        }}
      >
        {status === "idle" && "Submit Packing Estimate Request →"}
        {status === "sending" && "Submitting..."}
        {status === "done" && "✓ Request Received. We'll Get You Taken Care Of."}
        {status === "error" && "Something went wrong. Please call 1-888-553-4503."}
      </button>
      <p style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: 12.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
        By submitting this form, you'll be contacted by a Castle Express Moving &amp; Storage team member within one business day.<br />
        No commitment required. Limited dates available.
      </p>
    </div>
  );
}
