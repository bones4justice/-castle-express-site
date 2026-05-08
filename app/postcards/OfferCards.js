"use client";
import { OFFERS } from "./offers";

const TruckIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FBCB0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
);

const BoxIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FBCB0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);

const GiftIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FBCB0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
);

const CARDS = [
  { icon: <TruckIcon />, title: "Free Night of Truck Storage", desc: "Moving with a double closing? We'll store your belongings in our truck overnight at no charge so your move stays on schedule.", offer: OFFERS[0] },
  { icon: <BoxIcon />, title: "Free First Month of Storage", desc: "Need a little extra time before moving in? Get your first month of climate-controlled storage completely free when you book your move with us.", offer: OFFERS[1] },
  { icon: <GiftIcon />, title: "20 Free Boxes + Roll of Tape", desc: "Schedule a free walk-through estimate and we'll bring you 20 boxes and a roll of tape, on us. No obligation, no pressure.", offer: OFFERS[2] },
];

export default function OfferCards() {
  const handleClick = (offer) => {
    window.dispatchEvent(new CustomEvent("postcard:select-offer", { detail: { offer } }));
    document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "select_offer", { event_category: "postcard", event_label: offer });
    }
  };

  return (
    <div className="postcard-offer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 32 }}>
      {CARDS.map((c) => (
        <button
          key={c.offer}
          type="button"
          onClick={() => handleClick(c.offer)}
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
