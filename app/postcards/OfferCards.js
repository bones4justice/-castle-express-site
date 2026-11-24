"use client";
import { OFFERS } from "./offers";
import BrandSetIcon from "@/components/BrandSetIcon";

const CARDS = [
  { icon: <BrandSetIcon name="truck-storage" size={60} />, title: "Free Night of Truck Storage", desc: "Moving with a double closing? We'll store your belongings in our truck overnight at no charge so your move stays on schedule.", slug: OFFERS[0].slug, label: OFFERS[0].label },
  { icon: <BrandSetIcon name="free-storage-month" size={60} />, title: "Free First Month of Storage", desc: "Need a little extra time before moving in? Get your first month of climate-controlled storage completely free when you book your move with us.", slug: OFFERS[1].slug, label: OFFERS[1].label },
  { icon: <BrandSetIcon name="full-service-packing" size={60} />, title: "20 Free Boxes + Roll of Tape", desc: "Schedule a free walk-through estimate and we'll bring you 20 boxes and a roll of tape, on us. No obligation, no pressure.", slug: OFFERS[2].slug, label: OFFERS[2].label },
];

export default function OfferCards() {
  const handleClick = (slug, label) => {
    window.dispatchEvent(new CustomEvent("postcard:select-offer", { detail: { slug, label } }));
    document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "select_offer", { event_category: "postcard", event_label: label, offer_slug: slug, send_to: "G-97Z4EHJM63" });
    }
  };

  return (
    <div className="postcard-offer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 32 }}>
      {CARDS.map((c) => (
        <button
          key={c.slug}
          type="button"
          onClick={() => handleClick(c.slug, c.label)}
          className="postcard-offer-card"
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 28,
            border: "1px solid #eee",
            textAlign: "center",
            cursor: "pointer",
            font: "inherit",
            color: "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
          }}
        >
          <div style={{ marginBottom: 16 }}>{c.icon}</div>
          <h3 style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 10 }}>{c.title}</h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
          <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 13, color: "#1A1A2E", borderBottom: "2px solid #FBCB0B", paddingBottom: 2 }}>
            Claim This Offer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </button>
      ))}
      <style>{`
        .postcard-offer-card:hover {
          transform: translateY(-3px);
          border-color: #FBCB0B !important;
          box-shadow: 0 8px 24px rgba(26, 29, 46, 0.08);
        }
        .postcard-offer-card:focus-visible {
          outline: 3px solid #FBCB0B;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
