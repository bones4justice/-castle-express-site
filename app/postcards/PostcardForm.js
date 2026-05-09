"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "@/components/Icons";
import { OFFERS } from "./offers";
import styles from "./postcard-form.module.css";

const HOME_SIZES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];

export default function PostcardForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    moveFrom: "", moveTo: "", moveDate: "", homeSize: "", notes: "",
  });
  const [selectedOffer, setSelectedOffer] = useState("");
  const firstInputRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("offer") || "storage";
    const match = OFFERS.find(o => o.slug === slug);
    if (match) setSelectedOffer(match.label);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const label = e?.detail?.label;
      if (typeof label === "string" && OFFERS.some(o => o.label === label)) {
        setSelectedOffer(label);
        setTimeout(() => firstInputRef.current?.focus({ preventScroll: true }), 600);
      }
    };
    window.addEventListener("postcard:select-offer", handler);
    return () => window.removeEventListener("postcard:select-offer", handler);
  }, []);

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
      if (typeof window.gtag !== "undefined") { const hv = document.cookie.split('; ').find(c => c.startsWith('hero_ab_test='))?.split('=')[1] || 'not_set'; window.gtag("event", "generate_lead", { event_category: "form", event_label: "postcard_form", hero_variant: hv }); }
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "postcard_submit", {
          event_category: "postcard",
          event_label: selectedOffer || "no_offer_selected",
          home_size: formData.homeSize,
        });
      }
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label}>First Name *</label>
          <input ref={firstInputRef} className={styles.input} value={formData.firstName} onChange={update("firstName")} required />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Last Name *</label>
          <input className={styles.input} value={formData.lastName} onChange={update("lastName")} required />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label}>Phone Number *</label>
          <input type="tel" className={styles.input} placeholder="(860) 555-0123" value={formData.phone} onChange={update("phone")} required />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email Address *</label>
          <input type="email" className={styles.input} placeholder="you@email.com" value={formData.email} onChange={update("email")} required />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label}>Moving From *</label>
          <input className={styles.input} placeholder="City, State" value={formData.moveFrom} onChange={update("moveFrom")} required />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Moving To *</label>
          <input className={styles.input} placeholder="City, State" value={formData.moveTo} onChange={update("moveTo")} required />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label}>Estimated Move Date *</label>
          <input type="date" className={styles.input} value={formData.moveDate} onChange={update("moveDate")} required />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Home Size *</label>
          <select className={styles.select} value={formData.homeSize} onChange={update("homeSize")} required>
            <option value="">Select size...</option>
            {HOME_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.offerSection}>
        <label className={styles.label}>Choose One Offer:</label>
        <div className={styles.offerGrid}>
          {OFFERS.map(({ slug, label }) => {
            const isSelected = selectedOffer === label;
            return (
              <label key={slug} className={`${styles.offerCard}${isSelected ? " " + styles.offerCardSelected : ""}`}>
                <input
                  type="radio"
                  name="offerSelection"
                  className={styles.offerRadioInput}
                  checked={isSelected}
                  onChange={() => setSelectedOffer(label)}
                />
                <span className={`${styles.offerRadio}${isSelected ? " " + styles.offerRadioSelected : ""}`} aria-hidden="true" />
                <span className={styles.offerLabel}>{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.field} style={{ marginTop: 16 }}>
        <label className={styles.label}>Anything Else We Should Know</label>
        <textarea className={styles.textarea} rows={3} placeholder="Special items, timing preferences, questions..." value={formData.notes} onChange={update("notes")} />
      </div>

      <button type="submit" disabled={loading} className={styles.submit}>
        {loading ? "Submitting..." : <>Send My Free Estimate Request <ArrowRight /></>}
      </button>
    </form>
  );
}
