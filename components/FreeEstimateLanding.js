"use client";
import Image from "next/image";
import { COMPANY, REVIEWS } from "@/content";
import { Phone, Star, Shield, Truck, Clock, MapPin, Check, ArrowRight } from "@/components/Icons";
import LandingEstimateForm from "@/components/LandingEstimateForm";

const GOLD = "#FBCB0B";
const GRAY = "#969a9d";
const LIGHT = "#ebeced";

function scrollToForm() {
  const el = document.getElementById("estimate");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CallButton({ label = `Call (888) 553-4503`, block = false }) {
  return (
    <a href={COMPANY.phoneLink} style={{
      display: block ? "flex" : "inline-flex", width: block ? "100%" : "auto",
      alignItems: "center", justifyContent: "center", gap: 9,
      background: GOLD, color: "#000000", fontFamily: "var(--font-heading)",
      fontWeight: 700, fontSize: 16, padding: "13px 22px", borderRadius: 8,
      textDecoration: "none", minHeight: 46, boxSizing: "border-box",
    }}>
      <Phone size={17} /> {label}
    </a>
  );
}

export default function FreeEstimateLanding({ headline, subhead }) {
  const whyUs = [
    { icon: <Shield size={22} />, title: "Family owned since 2011", desc: "You are dealing with the owner and an experienced crew, not a call center." },
    { icon: <Clock size={22} />, title: "Fast, honest estimates", desc: "We usually respond in about 20 minutes with a clear estimate and no surprises." },
    { icon: <Truck size={22} />, title: "Fully equipped and insured", desc: "5 trucks and 5,000 sq ft of climate-controlled storage across Connecticut and Massachusetts." },
  ];
  const steps = [
    { n: "1", title: "Get your estimate", desc: "Fill out the short form or call. We will get you a clear, honest estimate." },
    { n: "2", title: "Pick your date", desc: "Lock in the day that works for you and your family." },
    { n: "3", title: "We get you taken care of", desc: "Our experienced crew shows up on time and handles your move with care." },
  ];

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "#000000", background: "#FFFFFF" }}>
      <style>{`
        .fe-hero { display: grid; grid-template-columns: 1fr; gap: 20px;
          padding: 18px 16px 28px; max-width: 1120px; margin: 0 auto; }
        .fe-copy h1 { font-family: var(--font-heading); font-weight: 700;
          font-size: 26px; line-height: 1.2; margin: 0 0 10px; color: #000; }
        .fe-copy p.sub { font-size: 15px; line-height: 1.5; color: #333; margin: 0 0 14px; }
        .fe-badges { display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: 13px; color: #333; }
        .fe-badge { display: inline-flex; align-items: center; gap: 6px; }
        @media (min-width: 900px) {
          .fe-hero { grid-template-columns: 1.05fr 0.95fr; gap: 44px; align-items: center;
            padding: 48px 24px 56px; }
          .fe-copy h1 { font-size: 42px; }
          .fe-copy p.sub { font-size: 18px; }
          .fe-form-col { position: sticky; top: 84px; }
        }
        .fe-section { max-width: 1120px; margin: 0 auto; padding: 32px 16px; }
        .fe-grid3 { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 720px) { .fe-grid3 { grid-template-columns: repeat(3, 1fr); } }
        .fe-card { background: #FFFFFF; border: 1px solid ${LIGHT}; border-radius: 12px; padding: 20px; }
        .fe-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: ${GOLD}; color: #000; border: none; border-radius: 8px;
          font-family: var(--font-heading); font-weight: 700; font-size: 17px;
          padding: 15px 30px; min-height: 52px; cursor: pointer; }
      `}</style>

      {/* Top bar: logo + click-to-call only. No nav. */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, background: "#FFFFFF",
        borderBottom: `1px solid ${LIGHT}`, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "8px 14px",
      }}>
        <Image src="/images/logo.png" alt="Castle Express Moving & Storage"
          width={72} height={44} priority style={{ height: 40, width: "auto" }} />
        <CallButton label="Call now" />
      </header>

      {/* Hero: form above the fold on mobile */}
      <section className="fe-hero">
        <div className="fe-copy">
          <h1>{headline}</h1>
          <p className="sub">{subhead}</p>
          <div className="fe-badges">
            <span className="fe-badge"><Star size={15} fill={GOLD} stroke={GOLD} /> {COMPANY.reviewAvg} from {COMPANY.reviewCount} reviews</span>
            <span className="fe-badge"><MapPin size={15} /> Based in Enfield, CT</span>
            <span className="fe-badge"><Shield size={15} /> Family owned since 2011</span>
          </div>
        </div>
        <div className="fe-form-col" id="estimate">
          <LandingEstimateForm />
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ background: "#000000", color: "#FFFFFF" }}>
        <div className="fe-section" style={{ padding: "16px", textAlign: "center", fontSize: 14, lineHeight: 1.7 }}>
          <strong style={{ fontFamily: "var(--font-heading)" }}>Castle Express Moving &amp; Storage</strong>
          {" "}&middot; Family owned since 2011 &middot; Enfield, CT &middot; 5 trucks &middot; 5,000 sq ft climate-controlled storage &middot; Serving Connecticut &amp; Massachusetts
        </div>
      </div>

      {/* Why us */}
      <section className="fe-section">
        <div className="fe-grid3">
          {whyUs.map((w, i) => (
            <div key={i} className="fe-card">
              <div style={{ color: GOLD, marginBottom: 8 }}>{w.icon}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, margin: "0 0 6px" }}>{w.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "#333", margin: 0 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews (real, from site content) */}
      <section style={{ background: LIGHT }}>
        <div className="fe-section">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ display: "inline-flex", gap: 3, marginBottom: 6 }}>
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={20} fill={GOLD} stroke={GOLD} />)}
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, margin: 0 }}>
              Rated {COMPANY.reviewAvg} from {COMPANY.reviewCount} reviews
            </h2>
          </div>
          <div className="fe-grid3">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div key={i} className="fe-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                  {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={15} fill={GOLD} stroke={GOLD} />)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#000", margin: "0 0 10px", fontStyle: "italic" }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13 }}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="fe-section">
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, textAlign: "center", margin: "0 0 24px" }}>How it works</h2>
        <div className="fe-grid3">
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: GOLD, color: "#000",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, marginBottom: 10,
              }}>{s.n}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, margin: "0 0 6px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "#333", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ background: "#000000", color: "#FFFFFF" }}>
        <div className="fe-section" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, margin: "0 0 8px", color: "#FFFFFF" }}>
            Ready to get your free estimate?
          </h2>
          <p style={{ fontSize: 15, color: LIGHT, margin: "0 0 20px" }}>
            Tell us about your move and we will get you taken care of.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <button type="button" className="fe-cta-btn" onClick={scrollToForm}>
              Get my free estimate <ArrowRight />
            </button>
            <CallButton label="Call (888) 553-4503" />
          </div>
        </div>
      </section>

      {/* Minimal footer: name + phone only, no link farm */}
      <footer style={{ background: "#FFFFFF", borderTop: `1px solid ${LIGHT}`, padding: "20px 16px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}>Castle Express Moving &amp; Storage</div>
        <div style={{ fontSize: 13, color: GRAY, marginTop: 4 }}>
          {COMPANY.fullAddress} &middot; <a href={COMPANY.phoneLink} style={{ color: "#000", fontWeight: 700, textDecoration: "none" }}>(888) 553-4503</a>
        </div>
      </footer>
    </div>
  );
}
