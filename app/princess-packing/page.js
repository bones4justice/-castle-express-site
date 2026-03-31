import Link from "next/link";
import { COMPANY } from "@/content";
import { Phone, Star, Shield, Check } from "@/components/Icons";
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

export default function PrincessPackingPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark" style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <h1 className="heading-1" style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 12 }}>
            <span style={{ color: "#F72585" }}>Princess Packing</span>™
          </h1>
          <p className="body-lg text-white-muted" style={{ fontSize: 20, marginBottom: 28 }}>
            A White-Glove Packing Service by Castle Express
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <a href="#request" className="btn btn-primary" style={{ background: "#FBCB0B", color: "#1A1A2E", borderColor: "#FBCB0B" }}>Request a Quote</a>
            <a href="#pricing" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>View Packages</a>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
            <span>{COMPANY.reviewAvg}★ Google Rating</span>
            <span>|</span>
            <span>{COMPANY.reviewCount} Reviews</span>
            <span>|</span>
            <span>Est. {COMPANY.founded}</span>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="section">
        <div className="container-sm">
          <div className="section-label" style={{ justifyContent: "center" }}><span>What It Is</span></div>
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 16 }}>
            Your home, packed before move day.
          </h2>
          <p className="body-md text-gray" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px", lineHeight: 1.8 }}>
            Princess Packing™ is a boutique residential packing service, scheduled in advance, completed by an experienced team, and built around one goal: protecting what matters before the chaos of move day begins.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 40 }}>
            {[
              { title: "Completed before move day", desc: "Your crew arrives to a fully packed, labeled home." },
              { title: "All packing materials included", desc: "Newsprint, bubble wrap, tape, and boxes are part of every package." },
              { title: "Room-by-room labeling", desc: "Every box identified clearly for seamless unloading at your new home." },
              { title: "Limited availability", desc: "One major pack per day. Reserve early." },
            ].map((f, i) => (
              <div key={i} className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFF0F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={14} style={{ color: "#F72585" }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 4 }}>{f.title}</h3>
                    <p className="body-sm text-gray">{f.desc}</p>
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
              <div key={i} style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 28, color: "#F72585" }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-light">
        <div className="container-md">
          <div className="section-label" style={{ justifyContent: "center" }}><span>How It Works</span></div>
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 32 }}>
            Four steps to a fully packed home.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {STEPS.map(s => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#F72585", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 16, color: "#fff" }}>{s.num}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#1A1A2E", marginBottom: 8 }}>{s.title}</h3>
                <p className="body-sm text-gray" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section" id="pricing">
        <div className="container-md">
          <div className="section-label" style={{ justifyContent: "center" }}><span>Pricing</span></div>
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 32 }}>
            Choose your bundle.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="card" style={{ padding: 28, position: "relative", border: pkg.popular ? "2px solid #F72585" : "1px solid #E5E7EB" }}>
                {pkg.popular && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#F72585", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 11, padding: "4px 14px", borderRadius: 20 }}>Most Popular</div>
                )}
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 22, color: "#1A1A2E", marginBottom: 4 }}>{pkg.name}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6B7280", marginBottom: 12 }}>{pkg.boxes}</p>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 36, color: "#F72585", marginBottom: 20 }}>{pkg.price}</div>
                {pkg.includes.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "start" }}>
                    <Check size={14} style={{ color: "#F72585", marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#374151" }}>{item}</span>
                  </div>
                ))}
                <a href="#request" className="btn btn-primary btn-full" style={{ marginTop: 20, background: pkg.popular ? "#F72585" : "#1A1A2E", borderColor: pkg.popular ? "#F72585" : "#1A1A2E" }}>
                  Select {pkg.name}
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <p className="body-sm text-gray">Additional boxes if bundle is exceeded: Small $10 | Medium $15 | Medium-Large $20 | Wardrobe $35</p>
          </div>
        </div>
      </section>

      {/* WHAT TO KNOW */}
      <section className="section section-light">
        <div className="container-sm">
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 24 }}>What to Know</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { title: "Advance Booking Required", desc: "Princess Packing is scheduled in advance. No same-day bookings." },
              { title: "Limited Capacity", desc: "We accept one major pack per day to ensure quality and focus." },
              { title: "Packing Only", desc: "This service covers packing only, not unpacking or organizing. Focused scope means exceptional results." },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: 24, textAlign: "center" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 8 }}>{item.title}</h3>
                <p className="body-sm text-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="section" id="request">
        <div className="container-sm">
          <div className="section-label" style={{ justifyContent: "center" }}><span>Get Started</span></div>
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 8 }}>
            Reserve your packing date.
          </h2>
          <p className="body-md text-gray" style={{ textAlign: "center", marginBottom: 32 }}>
            Fill out the form below and we will get back to you within 24 hours with availability and next steps.
          </p>
          <PackingForm />
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark text-center">
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <h2 className="heading-2 text-white">Questions About Princess Packing?</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 24 }}>
            Call us directly or fill out the form above. We will walk you through everything.
          </p>
          <a href={COMPANY.phoneLink} className="btn btn-primary" style={{ background: "#F72585", borderColor: "#F72585" }}><Phone size={18} /> {COMPANY.phone}</a>
        </div>
      </section>
    </>
  );
}
