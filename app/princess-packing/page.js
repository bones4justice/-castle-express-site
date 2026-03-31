import Link from "next/link";
import { COMPANY } from "@/content";
import { Phone, Check } from "@/components/Icons";
import PackingForm from "./PackingForm";

export const metadata = {
  title: "Princess Packing™ | White-Glove Packing Service | Castle Express Moving CT",
  description: "Professional packing service serving Hartford County CT and Western MA. Flat-rate bundles starting at $595. All materials included. Reserve your date today.",
  alternates: { canonical: "/princess-packing/" },
  openGraph: {
    title: "Princess Packing™ | White-Glove Packing by Castle Express",
    description: "Professional packing service. Flat-rate bundles starting at $595. All materials included.",
    url: "/princess-packing/",
  },
};

const STEPS = [
  { num: "01", title: "Request a Quote", desc: "Tell us about your home, your move date, and which package interests you. We respond within 24 hours." },
  { num: "02", title: "Reserve Your Date", desc: "Capacity is limited to one major pack per day. Your date is secured upon booking confirmation." },
  { num: "03", title: "Team Arrives", desc: "A polished, experienced Princess Packing team arrives with all materials and works room by room." },
  { num: "04", title: "Move Day Ready", desc: "Your home is packed, labeled, and organized. Your moving crew arrives to a job already done." },
];

const PACKAGES = [
  {
    name: "Pro",
    boxes: "25 Box Bundle",
    price: "$595",
    popular: false,
    includes: ["Princess Packing Team", "16 Small Boxes", "5 Medium Boxes", "2 Medium-Large Boxes", "Newsprint, bubble wrap, tape", "Room-by-room labeling"],
  },
  {
    name: "Plus",
    boxes: "50 Box Bundle",
    price: "$995",
    popular: true,
    includes: ["Princess Packing Team", "28 Small Boxes", "9 Medium Boxes", "4 Medium-Large Boxes", "5 Wardrobe Boxes", "Newsprint, bubble wrap, tape", "Room-by-room labeling"],
  },
  {
    name: "Premium",
    boxes: "100 Box Bundle",
    price: "$1,895",
    popular: false,
    includes: ["Princess Packing Team", "46 Small Boxes", "28 Medium Boxes", "9 Medium-Large Boxes", "10 Wardrobe Boxes", "Newsprint, bubble wrap, tape", "Room-by-room labeling", "Priority scheduling"],
  },
];

const navy = "#1a1d2e";
const pink = "#F72585";

export default function PrincessPackingPage() {
  return (
    <>
      {/* Hide site Header and Footer */}
      <style>{`header, footer { display: none !important; }`}</style>

      {/* MINIMAL TOP BAR */}
      <div style={{ background: navy, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 16, color: "#fff" }}>
          Princess Packing<span style={{ color: pink }}>™</span>
        </span>
        <a href="https://www.castleexpressmoving.com" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
          A service by <span style={{ color: "rgba(255,255,255,0.75)" }}>CastleExpressMoving.com</span>
        </a>
      </div>

      {/* HERO */}
      <section style={{ background: navy, padding: "80px 24px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(36px, 6vw, 56px)", color: pink, marginBottom: 12, lineHeight: 1.1 }}>
            Princess Packing™
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 20, color: "rgba(255,255,255,0.85)", marginBottom: 32 }}>
            A White-Glove Packing Service by Castle Express
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <a href="#request" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#FBCB0B", color: "#000", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none" }}>Request a Quote</a>
            <a href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "transparent", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>View Packages</a>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "var(--font-body)" }}>
            <span>{COMPANY.reviewAvg}★ Google Rating</span>
            <span>|</span>
            <span>{COMPANY.reviewCount} Reviews</span>
            <span>|</span>
            <span>Est. {COMPANY.founded}</span>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section style={{ background: "#fafafa", padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, color: pink, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", marginBottom: 8 }}>What It Is</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(24px, 3.5vw, 36px)", color: "#1a1a2e", textAlign: "center", marginBottom: 16 }}>
            Your home, packed before move day.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#555", textAlign: "center", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Princess Packing™ is a boutique residential packing service, scheduled in advance, completed by an experienced team, and built around one goal: protecting what matters before the chaos of move day begins.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 48 }}>
            {[
              { title: "Completed before move day", desc: "Your crew arrives to a fully packed, labeled home." },
              { title: "All packing materials included", desc: "Newsprint, bubble wrap, tape, and boxes are part of every package." },
              { title: "Room-by-room labeling", desc: "Every box identified clearly for seamless unloading at your new home." },
              { title: "Limited availability", desc: "One major pack per day. Reserve early." },
            ].map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #eee" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#FDE8F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={13} style={{ color: pink }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 4 }}>{f.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#777", lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
            {[
              { num: "1", label: "Major Pack Per Day Max" },
              { num: "100%", label: "Materials Included" },
              { num: "0", label: "Same-Day Bookings" },
              { num: "4.9", label: "Google Star Average" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: 16 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 28, color: "#1a1a2e" }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: navy, padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, color: pink, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", marginBottom: 8 }}>How It Works</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(24px, 3.5vw, 36px)", color: "#fff", textAlign: "center", marginBottom: 40 }}>
            Four steps to a fully packed home.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {STEPS.map(s => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: pink, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 16, color: "#fff" }}>{s.num}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section style={{ background: "#fafafa", padding: "64px 24px" }} id="pricing">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, color: pink, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", marginBottom: 8 }}>Pricing</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(24px, 3.5vw, 36px)", color: "#1a1a2e", textAlign: "center", marginBottom: 36 }}>
            Choose your bundle.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PACKAGES.map(pkg => (
              <div key={pkg.name} style={{ background: "#fff", borderRadius: 12, padding: 28, position: "relative", border: pkg.popular ? `2px solid ${pink}` : "1px solid #eee" }}>
                {pkg.popular && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: pink, color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 11, padding: "4px 14px", borderRadius: 20, letterSpacing: "0.03em" }}>Most Popular</div>
                )}
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 22, color: "#1a1a2e", marginBottom: 4 }}>{pkg.name}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#999", marginBottom: 12 }}>{pkg.boxes}</p>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 36, color: pink, marginBottom: 20 }}>{pkg.price}</div>
                {pkg.includes.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "start" }}>
                    <Check size={13} style={{ color: pink, marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>{item}</span>
                  </div>
                ))}
                <a href="#request" style={{ display: "block", textAlign: "center", marginTop: 20, padding: "12px 20px", background: pkg.popular ? pink : "#1a1a2e", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none" }}>
                  Select {pkg.name}
                </a>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", textAlign: "center", marginTop: 24 }}>
            Additional boxes if bundle is exceeded: Small $10 | Medium $15 | Medium-Large $20 | Wardrobe $35
          </p>
        </div>
      </section>

      {/* WHAT TO KNOW */}
      <section style={{ background: navy, padding: "56px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: 24, color: "#fff", textAlign: "center", marginBottom: 28 }}>What to Know</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { title: "Advance Booking Required", desc: "Princess Packing is scheduled in advance. No same-day bookings." },
              { title: "Limited Capacity", desc: "We accept one major pack per day to ensure quality and focus." },
              { title: "Packing Only", desc: "This service covers packing only, not unpacking or organizing. Focused scope means exceptional results." },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section style={{ background: "#fafafa", padding: "64px 24px" }} id="request">
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, color: pink, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", marginBottom: 8 }}>Get Started</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(24px, 3.5vw, 36px)", color: "#1a1a2e", textAlign: "center", marginBottom: 8 }}>
            Reserve your packing date.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#777", textAlign: "center", marginBottom: 32 }}>
            Fill out the form below and we will get back to you within 24 hours.
          </p>
          <PackingForm />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: navy, padding: "48px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: 24, color: "#fff", marginBottom: 12 }}>Questions About Princess Packing?</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
          Call us directly or fill out the form above.
        </p>
        <a href={COMPANY.phoneLink} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#FBCB0B", color: "#000", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none" }}>
          <Phone size={18} /> {COMPANY.phone}
        </a>
      </section>

      {/* MINIMAL BOTTOM BAR */}
      <div style={{ background: navy, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>
          Princess Packing™ by Castle Express Moving &amp; Storage | Hartford County CT &amp; Western MA | USDOT {COMPANY.usdot} | CT Permit {COMPANY.ctPermit}
        </p>
      </div>
    </>
  );
}
