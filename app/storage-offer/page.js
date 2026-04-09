"use client";
import { useState } from "react";
import Image from "next/image";
import { Check, Phone, Shield, Star, Clock, Box, Home, DollarSign } from "@/components/Icons";

/* ─── VALUE STACK DATA ─── */
const VALUE_ITEMS = [
  { label: "Climate-controlled storage, 1 month", value: "$175" },
  { label: "Professional pickup and delivery to facility", value: "$150" },
  { label: "Full inventory and item tracking", value: "$50" },
  { label: "Flexible month-to-month terms", value: "Priceless" },
  { label: "Price lock guarantee: your rate never goes up. Ever.", value: "Included" },
];

/* ─── BENEFITS DATA ─── */
const BENEFITS = [
  "Climate-controlled facility: your belongings stay safe from heat, cold, and humidity year round",
  "Secure 5,000 sq ft facility in Enfield, CT",
  "Flexible terms: month to month, no long-term contracts required",
  "Easy access: coordinate pickup and delivery with your move",
  "One company handles everything: moving AND storage under one roof",
  "Items inventoried and tracked",
  "Your price never goes up: the rate you start with is the rate you keep",
];

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  {
    text: "Castle Express stored our furniture for 3 months during our renovation. Everything came back in perfect condition.",
    name: "Sarah M.",
    location: "Enfield CT",
    source: "Google Review",
  },
  {
    text: "One company handled our entire move and storage. So much easier than coordinating two different companies.",
    name: "Mike R.",
    location: "South Windsor CT",
    source: "Google Review",
  },
  {
    text: "Joe and his team made the whole process seamless. From packing to storage to final delivery, everything was on time and nothing was damaged.",
    name: "Jennifer L.",
    location: "Springfield MA",
    source: "Google Review",
  },
];

/* ─── FAQ DATA ─── */
const FAQS = [
  { q: "Do I have to sign a long-term contract?", a: "No. Storage is month to month after your free first month. Cancel anytime." },
  { q: "What size items can you store?", a: "We store everything from a few boxes to a full household. Our facility is 5,000 sq ft with flexible space." },
  { q: "Can I access my items while they are in storage?", a: "Yes. Contact us to schedule a time and we will have your items ready." },
  { q: "What if I only need storage for one month?", a: "That is perfectly fine. You get the month free and you are done. No strings attached." },
  { q: "Is the facility climate controlled?", a: "Yes. Temperature and humidity controlled year round to protect your belongings." },
  { q: "Do I need to have a move booked to get the free month?", a: "Yes. This offer is available when you book a local or long distance move with Castle Express." },
  { q: "Will my storage price go up?", a: "Never. The rate you start with is the rate you keep. We do not raise storage prices on existing customers. Ever." },
];

/* ─── STYLES ─── */
const s = {
  page: { background: "#000000", color: "#FFFFFF", minHeight: "100vh" },
  section: { padding: "80px 24px" },
  sectionAlt: { padding: "80px 24px", background: "#0A0A0A" },
  container: { maxWidth: "800px", margin: "0 auto" },
  containerWide: { maxWidth: "1000px", margin: "0 auto" },
  gold: { color: "#FBCB0B" },
  gray: { color: "#969a9d" },
  h1: {
    fontFamily: "var(--font-heading), 'Merriweather', serif",
    fontWeight: 900,
    fontSize: "clamp(36px, 5vw, 52px)",
    lineHeight: 1.1,
    marginBottom: "24px",
  },
  h2: {
    fontFamily: "var(--font-heading), 'Merriweather', serif",
    fontWeight: 800,
    fontSize: "clamp(28px, 4vw, 40px)",
    lineHeight: 1.15,
    marginBottom: "24px",
    textAlign: "center",
  },
  body: {
    fontFamily: "var(--font-body), 'Merriweather', serif",
    fontSize: "16px",
    lineHeight: 1.75,
    color: "#ebeced",
  },
  bodyCenter: {
    fontFamily: "var(--font-body), 'Merriweather', serif",
    fontSize: "16px",
    lineHeight: 1.75,
    color: "#ebeced",
    textAlign: "center",
  },
  btn: {
    display: "inline-block",
    background: "#FBCB0B",
    color: "#000000",
    fontFamily: "var(--font-heading), 'Merriweather', serif",
    fontWeight: 700,
    fontSize: "17px",
    padding: "16px 36px",
    borderRadius: "6px",
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
    textAlign: "center",
  },
  btnFull: {
    display: "block",
    width: "100%",
    background: "#FBCB0B",
    color: "#000000",
    fontFamily: "var(--font-heading), 'Merriweather', serif",
    fontWeight: 700,
    fontSize: "17px",
    padding: "16px 36px",
    borderRadius: "6px",
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
    textAlign: "center",
  },
  label: {
    fontFamily: "var(--font-body), 'Merriweather', serif",
    fontSize: "14px",
    fontWeight: 700,
    color: "#FFFFFF",
    display: "block",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#111",
    color: "#FFFFFF",
    fontFamily: "var(--font-body), 'Merriweather', serif",
    fontSize: "15px",
  },
};

export default function StorageOfferPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    moveDate: "",
    storing: "",
    hasMove: true,
  });

  const update = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formspree.io/f/xnjojwly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          moveDate: form.moveDate,
          storing: form.storing,
          hasMove: form.hasMove,
          source: "storage-offer-popup",
        }),
      });
      if (typeof window.fbq === "function") window.fbq("track", "Lead");
      if (typeof window.gtag !== "undefined") window.gtag("event", "generate_lead", { event_category: "storage_offer", event_label: "storage_offer_form" });
      setSubmitted(true);
    } catch (err) {
      console.error("Form error:", err);
    }
    setLoading(false);
  };

  return (
    <div style={s.page}>

      {/* ─── HERO ─── */}
      <section style={{ ...s.section, paddingTop: "100px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/IMG_4734.jpg" alt="Castle Express climate-controlled storage facility in Enfield CT with numbered storage vaults" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.82), rgba(0,0,0,0.92))" }} />
        </div>
        <div style={{ ...s.container, position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <span style={{ ...s.gray, fontFamily: "var(--font-body), 'Merriweather', serif", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Limited Time Offer</span>
          </div>
          <h1 style={{ ...s.h1, textAlign: "center" }}>
            Your First Month of Storage is <span style={s.gold}>FREE</span>
          </h1>
          <p style={{ ...s.bodyCenter, maxWidth: "600px", margin: "0 auto 20px" }}>
            When you book a move with Castle Express, your first month of climate-controlled storage is on us. No hidden fees. No long-term commitment.
          </p>
          <p style={{ ...s.bodyCenter, fontWeight: 700, color: "#FBCB0B", marginBottom: "16px" }}>
            We never raise your storage price. Ever.
          </p>
          <p style={{ ...s.bodyCenter, fontSize: "14px", color: "#969a9d", marginBottom: "36px" }}>
            Limited availability. We only have space for a handful of new storage customers each month.
          </p>
          <div style={{ textAlign: "center" }}>
            <a href="#claim-form" style={s.btn}>Claim This Offer</a>
          </div>
        </div>
      </section>

      {/* ─── FACILITY IMAGE ─── */}
      <section style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ position: "relative", height: "500px", maxHeight: "50vw" }}>
            <Image src="/images/IMG_4734.jpg" alt="Castle Express climate-controlled storage facility in Enfield CT with numbered storage vaults" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section style={s.sectionAlt}>
        <div style={s.container}>
          <h2 style={s.h2}>Why Store With Castle Express</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "640px", margin: "0 auto" }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, marginTop: "4px" }}>
                  <Check />
                </div>
                <p style={{ ...s.body, fontSize: "15px" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMAGE BREAK ─── */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ position: "relative", height: "400px" }}>
            <Image src="/images/IMG_6322.jpg" alt="Forklift moving wrapped items into numbered storage vaults at Castle Express facility" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
        </div>
      </section>

      {/* ─── VALUE STACK ─── */}
      <section style={s.section}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={s.h2}>Here's Everything You Get</h2>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", overflow: "hidden" }}>
            {VALUE_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 24px",
                  borderBottom: "1px solid #222",
                  gap: "16px",
                }}
              >
                <span style={{ ...s.body, fontSize: "14px", flex: 1 }}>{item.label}</span>
                <span style={{ fontFamily: "var(--font-body), 'Merriweather', serif", fontSize: "14px", fontWeight: 700, color: "#969a9d", whiteSpace: "nowrap" }}>{item.value}</span>
              </div>
            ))}

            {/* Total value */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...s.body, fontSize: "15px", fontWeight: 700, color: "#FFFFFF" }}>Total Value</span>
              <span style={{ fontFamily: "var(--font-body), 'Merriweather', serif", fontSize: "20px", fontWeight: 700, color: "#969a9d", textDecoration: "line-through" }}>$375+</span>
            </div>

            {/* Your price */}
            <div style={{ padding: "28px 24px", background: "rgba(251, 203, 11, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-heading), 'Merriweather', serif", fontSize: "18px", fontWeight: 700, color: "#FFFFFF" }}>Your Price Today</span>
              <span style={{ fontFamily: "var(--font-heading), 'Merriweather', serif", fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 900, color: "#FBCB0B" }}>$0</span>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#969a9d", fontSize: "13px", marginTop: "12px" }}>for your first month of storage</p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={s.sectionAlt}>
        <div style={s.container}>
          <h2 style={s.h2}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", maxWidth: "800px", margin: "0 auto" }}>
            {[
              { step: "1", title: "Book Your Move", desc: "Schedule your move with Castle Express. Any local or long distance move qualifies." },
              { step: "2", title: "We Store Your Items", desc: "We pick up, inventory, and store your belongings in our climate-controlled facility." },
              { step: "3", title: "First Month Free", desc: "Your first month of storage is completely free. After that, simple monthly billing with no surprises." },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: "center" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#FBCB0B", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading), 'Merriweather', serif", fontWeight: 900, fontSize: "22px", margin: "0 auto 16px" }}>
                  {item.step}
                </div>
                <h3 style={{ fontFamily: "var(--font-heading), 'Merriweather', serif", fontWeight: 700, fontSize: "18px", color: "#FFFFFF", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ ...s.body, fontSize: "14px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section style={s.section}>
        <div style={s.containerWide}>
          <div style={{ position: "relative", height: "400px", borderRadius: "12px", overflow: "hidden", marginBottom: "48px" }}>
            <Image src="/images/IMG_5585.jpg" alt="Castle Express crew member loading items from truck into storage facility" fill style={{ objectFit: "cover", objectPosition: "top center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
          </div>
          <h2 style={s.h2}>What Our Customers Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "28px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[1,2,3,4,5].map(n => <Star key={n} />)}
                </div>
                <p style={{ ...s.body, fontSize: "15px", fontStyle: "italic", marginBottom: "20px" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p style={{ fontFamily: "var(--font-body), 'Merriweather', serif", fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>{t.name}</p>
                  <p style={{ fontSize: "13px", color: "#969a9d" }}>{t.location} &middot; {t.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RISK REVERSAL ─── */}
      <section style={s.sectionAlt}>
        <div style={{ ...s.container, maxWidth: "640px" }}>
          <h2 style={s.h2}>Zero Risk. Zero Commitment.</h2>
          <p style={{ ...s.bodyCenter, marginBottom: "20px" }}>
            No long-term contracts. No cancellation fees. No hidden charges. If you are not happy with our storage for any reason, you are free to move out anytime. We even help you move your items out. You literally have nothing to lose.
          </p>
          <p style={{ ...s.bodyCenter, fontWeight: 700, color: "#FBCB0B" }}>
            And one more thing: we never raise your storage price. The rate you start with is the rate you keep. Period.
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={s.section}>
        <div style={{ ...s.container, maxWidth: "640px" }}>
          <h2 style={s.h2}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #222" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    background: "none",
                    border: "none",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-body), 'Merriweather', serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    textAlign: "left",
                    cursor: "pointer",
                    gap: "16px",
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: "20px", color: "#FBCB0B", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ ...s.body, fontSize: "14px", paddingBottom: "20px" }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section id="claim-form" style={{ ...s.sectionAlt, scrollMarginTop: "80px" }}>
        <div style={{ ...s.container, maxWidth: "560px" }}>
          <h2 style={s.h2}>Claim Your Free Month</h2>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(22, 163, 74, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Check />
              </div>
              <p style={{ fontFamily: "var(--font-heading), 'Merriweather', serif", fontWeight: 700, fontSize: "20px", color: "#FFFFFF", marginBottom: "12px" }}>
                Thank you!
              </p>
              <p style={s.body}>
                We will be in touch within 24 hours to get you taken care of.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={s.label}>First Name *</label>
                  <input type="text" required value={form.firstName} onChange={update("firstName")} style={s.input} />
                </div>
                <div>
                  <label style={s.label}>Last Name *</label>
                  <input type="text" required value={form.lastName} onChange={update("lastName")} style={s.input} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={s.label}>Phone *</label>
                  <input type="tel" required value={form.phone} onChange={update("phone")} style={s.input} />
                </div>
                <div>
                  <label style={s.label}>Email *</label>
                  <input type="email" required value={form.email} onChange={update("email")} style={s.input} />
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={s.label}>Moving Date</label>
                <input type="date" value={form.moveDate} onChange={update("moveDate")} style={s.input} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={s.label}>What are you storing?</label>
                <textarea
                  rows={3}
                  placeholder="Furniture, boxes, appliances, etc."
                  value={form.storing}
                  onChange={update("storing")}
                  style={{ ...s.input, resize: "vertical" }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", minHeight: "auto" }}>
                  <input
                    type="checkbox"
                    required
                    checked={form.hasMove}
                    onChange={update("hasMove")}
                    style={{ width: "18px", height: "18px", minHeight: "18px", minWidth: "18px", accentColor: "#FBCB0B" }}
                  />
                  <span style={{ fontFamily: "var(--font-body), 'Merriweather', serif", fontSize: "14px", color: "#ebeced" }}>
                    I have a move to book with Castle Express
                  </span>
                </label>
              </div>
              <input type="hidden" name="source" value="storage-offer-popup" />
              <button type="submit" disabled={loading} style={{ ...s.btnFull, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Submitting..." : "Claim My Free Month"}
              </button>
              <p style={{ textAlign: "center", color: "#969a9d", fontSize: "13px", marginTop: "12px" }}>
                We respond within 24 hours. Usually much faster.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{ ...s.section, paddingBottom: "100px" }}>
        <div style={{ ...s.container, textAlign: "center" }}>
          <p style={{ ...s.bodyCenter, fontSize: "18px", fontWeight: 700, color: "#FFFFFF", marginBottom: "28px" }}>
            This offer will not last forever. Book your move today and get your first month of storage free.
          </p>
          <a href="tel:8885534503" style={{ ...s.btn, fontSize: "18px", padding: "18px 40px", marginBottom: "16px" }}>
            Call (888) 553-4503
          </a>
          <div style={{ marginTop: "16px" }}>
            <a href="#claim-form" style={{ color: "#969a9d", fontSize: "14px", textDecoration: "underline" }}>
              Or fill out the form above
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
