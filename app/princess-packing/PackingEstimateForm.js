"use client";
import { useRef, useState } from "react";
import { getSmartMovingAttribution, getAttribution } from "@/lib/utm";
import { sendGenerateLead } from "@/lib/leadEvents";

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

const PACKAGE_LABELS = {
  pro: "Pro, 25 Box Bundle ($595)",
  plus: "Plus, 50 Box Bundle ($995)",
  premium: "Premium, 100 Box Bundle ($1,895)",
  unsure: "Not sure yet",
};

const REQUIRED = ["fname", "lname", "phone", "email", "address", "movedate", "pkg"];

export default function PackingEstimateForm() {
  const [values, setValues] = useState({ fname: "", lname: "", phone: "", email: "", address: "", movedate: "", pkg: "", notes: "" });
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());

  const set = (k) => (e) => setValues(v => ({ ...v, [k]: e.target.value }));

  // One submission at a time: a double tap must not send two leads. Same
  // lock the estimate forms use.
  const inFlight = useRef(false);
  async function handleSubmit() {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      await submitLead();
    } finally {
      inFlight.current = false;
    }
  }

  async function submitLead() {
    const bad = {};
    REQUIRED.forEach(k => { if (!values[k].trim()) bad[k] = true; });
    setInvalid(bad);
    if (Object.keys(bad).length > 0) return;

    setStatus("sending");
    setErrorMsg("");
    try {
      // Leads go through /api/lead (server-side spam filter + Formspree +
      // SmartMoving), same as the estimate forms, so packing requests land in
      // the CRM instead of only in an inbox.
      const smPayload = {
        FullName: `${values.fname} ${values.lname}`.trim(),
        PhoneNumber: values.phone,
        Email: values.email,
        UserOptIn: true,
        OriginAddressFull: values.address,
        MoveDate: values.movedate.replace(/-/g, ""),
        Notes: `PRINCESS PACKING - Package: ${PACKAGE_LABELS[values.pkg] || values.pkg}${values.notes ? " | Notes: " + values.notes : ""}`,
      };
      Object.assign(smPayload, getSmartMovingAttribution());

      const oaiEventId = crypto.randomUUID();
      const response = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "packing",
          hp: honeypot,
          elapsedMs: Date.now() - openedAt.current,
          formspree: { ...values, ...getAttribution(), package: values.pkg, formType: "Princess Packing" },
          smartmoving: smPayload,
          oaiEventId,
          pageUrl: window.location.href,
        }),
      });
      const res = await response.json().catch(() => ({}));
      if (!response.ok || res.ok === false) {
        // A fixable typo (phone, email, date) comes back with its own message.
        setErrorMsg(res.error || "");
        setStatus("error");
        return;
      }
      // res.s = quietly discarded as spam: normal confirmation, no conversions.
      // Non-estimate form: Contact, not Lead (keeps the estimate campaign clean).
      if (!res.s) {
        if (typeof window.fbq === "function") window.fbq("track", "Contact");
        if (typeof window.oaiq === "function") window.oaiq("measure", "lead_created", { type: "customer_action" }, { event_id: oaiEventId });
        sendGenerateLead(oaiEventId, { event_category: "form", event_label: "packing_form", packing_package: values.pkg });
      }
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
      {/* Honeypot: invisible to humans, bots auto-fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", height: 0, overflow: "hidden" }}>
        <label htmlFor="pp-website-field">Website</label>
        <input id="pp-website-field" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
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
        aria-describedby={errorMsg ? "pp-error" : undefined}
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
        {status === "error" && (errorMsg ? "Fix and Resubmit →" : "Something went wrong. Tap to try again, or call 1-888-553-4503.")}
      </button>
      {status === "error" && errorMsg && (
        <p id="pp-error" role="alert" style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: 14, color: "#FCA5A5", fontFamily: "var(--font-body)" }}>{errorMsg}</p>
      )}
      <p style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: 12.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
        By submitting this form, you'll be contacted by a Castle Express Moving &amp; Storage team member within one business day.<br />
        No commitment required. Limited dates available.
      </p>
    </div>
  );
}
