"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { MOVE_SIZES, LEAD_SOURCES, COMPANY } from "@/content";
import { Check, ArrowRight, Phone } from "@/components/Icons";

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
    // 1. Formspree  -  sends leads to your email
    // ──────────────────────────────────────────────────
    try {
      await fetch("https://formspree.io/f/xpqjkjga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (typeof fbq === "function") fbq("track", "Lead");
      if (typeof window.gtag !== "undefined") { const hv = document.cookie.split('; ').find(c => c.startsWith('hero_ab_test='))?.split('=')[1] || 'not_set'; window.gtag("event", "generate_lead", { event_category: "form", event_label: "estimate_form", hero_variant: hv }); }
    } catch (err) {
      console.error("Formspree submission error:", err);
    }

    // ──────────────────────────────────────────────────
    // 2. SmartMoving  -  POST to leads API
    // ──────────────────────────────────────────────────
    try {
      const smPayload = {
        FullName: formData.name,
        PhoneNumber: formData.phone,
        Email: formData.email,
        UserOptIn: true,
      };
      if (formData.moveDate) smPayload.MoveDate = formData.moveDate.replace(/-/g, "");
      if (formData.moveSize) smPayload.MoveSize = formData.moveSize;
      if (formData.source) smPayload.ReferralSource = formData.source;
      if (formData.moveFrom) smPayload.OriginAddressFull = formData.moveFrom;
      if (formData.moveTo) smPayload.DestinationAddressFull = formData.moveTo;

      const smRes = await fetch("https://api.smartmoving.com/api/leads/from-provider/v2?providerKey=8f882454-9968-445e-8f50-ac5d011a33fc&branchId=352498a1-e171-40cd-8b35-ac5d011720d0", {
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
  const successTracked = useRef(false);
  useEffect(() => {
    if (!submitted || successTracked.current) return;
    successTracked.current = true;
    const hv = (document.cookie.match(/hero_ab_test=([^;]+)/) || [])[1] || "(not set)";
    const loc = window.location.pathname === "/" ? "homepage" : "contact";
    if (window.gtag) {
      window.gtag("event", "form_submission_success", { hero_variant: hv, form_location: loc });
    }
    if (window.clarity) {
      window.clarity("set", "form_completed", "true");
    }
  }, [submitted]);

  if (submitted) {
    const textColor = dark ? "#fff" : "#1A1A2E";
    const mutedColor = dark ? "rgba(255,255,255,0.6)" : "#6B7280";
    const cardBg = dark ? "rgba(255,255,255,0.06)" : "#fff";
    const cardBorder = dark ? "rgba(255,255,255,0.1)" : "#E5E7EB";
    const confirmBg = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.02)";
    const confirmBorder = dark ? "rgba(255,255,255,0.15)" : "#E5E7EB";

    const blogCards = [
      { icon: "\uD83D\uDCCB", title: "What Happens Next", desc: "A step-by-step walk-through of our estimate process from your request to move day", href: "/blog/what-happens-after-you-request-an-estimate/" },
      { icon: "\uD83D\uDCE6", title: "Moving Supplies Checklist", desc: "The 12 supplies worth buying before move day, and what you can skip", href: "/blog/moving-supplies-checklist/" },
      { icon: "\uD83C\uDFE1", title: "New to Connecticut?", desc: "Everything you need to know about relocating to CT from someone who moves families here", href: "/blog/relocating-to-connecticut-guide/" },
    ];

    return (
      <div style={{
        background: bg, borderRadius: 12, padding: "32px 24px",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E5E7EB",
      }}>
        <style>{`
          @keyframes checkEntrance {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          .checkmark-entrance {
            animation: checkEntrance 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @media (prefers-reduced-motion: reduce) {
            .checkmark-entrance { animation: none; transform: scale(1); opacity: 1; }
          }
          .blog-card-link { transition: transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease; }
          .blog-card-link:hover, .blog-card-link:active { transform: translateY(-2px); }
          .blog-card-link .card-arrow { transition: transform 150ms ease; }
          .blog-card-link:hover .card-arrow { transform: translateX(3px); }
        `}</style>

        {/* Confirmation Card */}
        <div style={{
          textAlign: "center", marginBottom: 28, padding: "32px 24px",
          background: confirmBg, border: `1px solid ${confirmBorder}`, borderRadius: 16,
        }}>
          <div className="checkmark-entrance" style={{
            width: 72, height: 72, borderRadius: "50%", background: "#16A34A",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            marginBottom: 16, filter: "drop-shadow(0 4px 12px rgba(22, 163, 74, 0.4))",
          }}>
            <Check size={36} stroke="#fff" />
          </div>
          <h3 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(26px, 4vw, 34px)", color: textColor, marginBottom: 8,
          }}>
            Estimate Request Received!
          </h3>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5,
            color: textColor, marginBottom: 20,
          }}>
            We will reach out to you usually within 20 minutes.
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 13, color: mutedColor, marginBottom: 14,
          }}>
            Need help right now?
          </p>
          <a href={COMPANY.phoneLink} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#FBCB0B", color: "#000", fontFamily: "var(--font-heading)",
            fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 8,
            textDecoration: "none", minHeight: 44,
          }}>
            <Phone size={18} /> (888) 553-4503
          </a>
        </div>

        {/* Divider */}
        <div style={{ textAlign: "center", margin: "0 0 20px", position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: cardBorder }} />
          <span style={{
            position: "relative", background: bg, padding: "0 12px",
            fontFamily: "var(--font-body)", fontSize: 12, color: mutedColor,
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>While you wait</span>
        </div>

        {/* Blog Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {blogCards.map((card, i) => (
            <Link key={i} href={card.href} className="blog-card-link" style={{
              display: "flex", alignItems: "center", gap: 16,
              background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 10,
              padding: "18px 16px", textDecoration: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#D4A017"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.boxShadow = "none"; }}
            >
              <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{card.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: textColor, marginBottom: 3 }}>{card.title}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: mutedColor, lineHeight: 1.5 }}>{card.desc}</div>
              </div>
              <span className="card-arrow" style={{ color: "#D4A017", fontSize: 20, flexShrink: 0, fontWeight: 700 }}>&rsaquo;</span>
            </Link>
          ))}
        </div>
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
        fontFamily: "var(--font-heading)", fontWeight: 800,
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
