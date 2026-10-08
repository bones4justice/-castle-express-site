"use client";
import Image from "next/image";
import { COMPANY, REVIEWS } from "@/content";
import { Phone, Star, Check } from "@/components/Icons";
import LandingEstimateForm from "@/components/LandingEstimateForm";

const GOLD = "#FBCB0B";
const GRAY = "#969a9d";
const LIGHT = "#ebeced";

// ─── Version content ───
// Review indices point into REVIEWS in content.js (real reviews only; the
// stored reviews carry first name + last initial, towns are not in the data).
// FAQs: factual claims already published on the site. No prices.

const FAQ = {
  estimate: {
    q: "How does the free estimate work?",
    a: "Tell us about your move with the short form or a quick call. We review the details, follow up with any questions, and send you a clear written estimate. We aim to be within 10% of every estimate, with no hidden fees and no fuel surcharges.",
  },
  included: {
    q: "What's included in my estimate?",
    a: "Loading, transport, and unloading at your new home. Packing and storage are available as add-on services.",
  },
  storage: {
    q: "Do you offer storage?",
    a: "Yes. We operate a secure, climate-controlled storage facility in Enfield, CT with short-term and long-term options. It is ideal between closings or during renovations.",
  },
  coverage: {
    q: "What areas do you serve?",
    a: "All of Hartford County and Tolland County in Connecticut, plus Western Massachusetts including Springfield and Agawam. We dispatch from our Enfield, CT headquarters.",
  },
  interstate: {
    q: "Are you licensed for out-of-state moves?",
    a: `Yes. Castle Express Moving & Storage is licensed for interstate moves (USDOT ${COMPANY.usdot}, ${COMPANY.mc}) and fully insured.`,
  },
  ldPricing: {
    q: "How does long distance pricing work?",
    a: "Long distance moves are priced flat-rate from a detailed estimate, so you know the cost before moving day. No surprises.",
  },
  commercialHours: {
    q: "Can you move our office outside business hours?",
    a: "Yes. We offer after-hours and weekend scheduling, plus IT equipment coordination and custom move planning, to keep your downtime to a minimum.",
  },
  commercialIncluded: {
    q: "What's included in a commercial move?",
    a: "Loading, transport, and unloading at the new location, planned around your schedule. Packing and storage are available as add-on services.",
  },
};

const VERSIONS = {
  residential: {
    headline: "Connecticut & Massachusetts Movers You Can Trust",
    subhead: "Family owned since 2011. Tell us about your move and we will usually respond in about 20 minutes with your free estimate.",
    bullets: [
      "Honest estimates with no hidden fees",
      "Experienced crews who treat your home with care",
      "Licensed, insured, and A+ BBB rated",
    ],
    reviewIdx: [0, 3, 2],
    faqs: [FAQ.estimate, FAQ.included, FAQ.storage, FAQ.coverage],
  },
  longdistance: {
    headline: "Moving Out of State? We Will Get You There.",
    subhead: "Licensed interstate movers based in Enfield, CT. Flat-rate long distance pricing and experienced crews, since 2011.",
    bullets: [
      `Licensed for interstate moves (USDOT ${COMPANY.usdot}, ${COMPANY.mc})`,
      "Flat-rate long distance pricing with no surprises",
      "Full packing and storage available",
    ],
    reviewIdx: [1, 4, 5],
    faqs: [FAQ.interstate, FAQ.ldPricing, FAQ.storage, FAQ.included],
  },
  commercial: {
    headline: "Office & Commercial Moves with Minimal Downtime",
    subhead: "Keep your business running. After-hours and weekend scheduling from an experienced commercial crew.",
    bullets: [
      "After-hours and weekend scheduling",
      "IT equipment coordination and custom move planning",
      "Licensed, insured, and A+ BBB rated",
    ],
    reviewIdx: [5, 0, 3],
    faqs: [FAQ.commercialHours, FAQ.estimate, FAQ.commercialIncluded, FAQ.coverage],
  },
  // Social visitors are not actively searching: friendlier hook, shorter page
  // (tighter copy, three FAQs instead of four).
  social: {
    headline: "Moving Soon? We Will Get You Taken Care Of.",
    subhead: "Family owned in Enfield, CT since 2011. Tell us a little about your move and we will handle the rest.",
    bullets: [
      "Free estimate, no pressure, no obligation",
      "Friendly, experienced local crews",
      "Serving Connecticut & Massachusetts",
    ],
    reviewIdx: [4, 2, 3],
    faqs: [FAQ.estimate, FAQ.storage, FAQ.coverage],
  },
};

const PHOTOS = [
  { src: "/images/crew-commercial.webp", w: 864, h: 1080, alt: "Castle Express crew on a commercial move" },
  { src: "/images/truck-loading.webp", w: 1200, h: 1200, alt: "Castle Express crew loading a moving truck" },
  { src: "/images/packed-truck.webp", w: 900, h: 1200, alt: "A carefully packed Castle Express moving truck" },
];

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

function Stars({ size = 15 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, verticalAlign: "middle" }}>
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={size} fill={GOLD} stroke={GOLD} />)}
    </span>
  );
}

export default function FreeEstimateLanding({ version = "residential" }) {
  const v = VERSIONS[version] || VERSIONS.residential;
  const reviews = v.reviewIdx.map((i) => REVIEWS[i]).filter(Boolean);
  const steps = [
    { n: "1", title: "Get your estimate", desc: "Fill out the short form or call. We will get you a clear, honest estimate." },
    { n: "2", title: "Pick your date", desc: "Choose the day that works for you and your family. We will confirm it with you." },
    { n: "3", title: "We get you taken care of", desc: "Our experienced crew shows up on time and handles your move with care." },
  ];

  return (
    <div className="fe-page" style={{ fontFamily: "var(--font-body)", color: "#000000", background: "#FFFFFF" }}>
      <style>{`
        .fe-hero { display: grid; grid-template-columns: 1fr; gap: 14px;
          padding: 12px 16px 24px; max-width: 1120px; margin: 0 auto; }
        .fe-copy h1 { font-family: var(--font-heading); font-weight: 700;
          font-size: 23px; line-height: 1.22; margin: 0 0 8px; color: #000; }
        .fe-copy p.sub { font-size: 14px; line-height: 1.45; color: #333; margin: 0 0 10px; }
        .fe-bullets { list-style: none; margin: 0 0 10px; padding: 0;
          display: grid; gap: 5px; font-size: 13.5px; color: #000; }
        .fe-bullets li { display: flex; align-items: flex-start; gap: 7px; line-height: 1.35; }
        .fe-google-badge { display: inline-flex; align-items: center; gap: 7px;
          border: 1px solid ${LIGHT}; border-radius: 8px; padding: 5px 10px;
          font-size: 12.5px; color: #000; background: #FFFFFF; }
        @media (min-width: 900px) {
          .fe-hero { grid-template-columns: 1.05fr 0.95fr; gap: 44px; align-items: center;
            padding: 48px 24px 56px; }
          .fe-copy h1 { font-size: 40px; }
          .fe-copy p.sub { font-size: 18px; }
          .fe-bullets { font-size: 15.5px; gap: 8px; }
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
        .fe-joe { display: grid; grid-template-columns: 92px 1fr; gap: 16px; align-items: start; }
        @media (min-width: 720px) { .fe-joe { grid-template-columns: 140px 1fr; gap: 24px; } }
        .fe-faq details { border: 1px solid ${LIGHT}; border-radius: 10px;
          padding: 0 16px; background: #FFFFFF; }
        .fe-faq details + details { margin-top: 10px; }
        .fe-faq summary { font-family: var(--font-heading); font-weight: 700;
          font-size: 15px; padding: 14px 0; cursor: pointer; }
        .fe-faq p { font-size: 14px; line-height: 1.6; color: #333; margin: 0 0 14px; }
        /* Sticky mobile bar: Call + scroll to form. Page bottom padding keeps
           the footer readable above it. Hidden on wider screens. */
        .fe-stickybar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60;
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 8px;
          padding: 8px 10px calc(8px + env(safe-area-inset-bottom));
          background: #FFFFFF; border-top: 1px solid ${LIGHT};
          box-shadow: 0 -6px 18px rgba(0,0,0,0.08); }
        .fe-page { padding-bottom: 74px; }
        @media (min-width: 720px) {
          .fe-stickybar { display: none; }
          .fe-page { padding-bottom: 0; }
        }
      `}</style>

      {/* Top bar: logo + click-to-call only. No nav. */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, background: "#FFFFFF",
        borderBottom: `1px solid ${LIGHT}`, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "6px 14px",
      }}>
        <Image src="/images/logo-wordmark.png" alt="Castle Express Moving & Storage"
          width={300} height={143} priority quality={90}
          style={{ height: 42, width: "auto" }} />
        <CallButton label="Call now" />
      </header>

      {/* Hero: headline, bullets, Google rating badge, form. Above the fold on a phone. */}
      <section className="fe-hero">
        <div className="fe-copy">
          <h1>{v.headline}</h1>
          <p className="sub">{v.subhead}</p>
          <ul className="fe-bullets">
            {v.bullets.map((b, i) => (
              <li key={i}><Check size={16} stroke={GOLD} style={{ flexShrink: 0, marginTop: 2 }} /> {b}</li>
            ))}
          </ul>
          <span className="fe-google-badge">
            <Image src="/images/icons/icon-google.png" alt="Google" width={18} height={18} />
            <strong style={{ fontFamily: "var(--font-heading)" }}>{COMPANY.reviewAvg}</strong>
            <Stars size={13} />
            {COMPANY.reviewCount} Google reviews
          </span>
        </div>
        <div className="fe-form-col" id="estimate">
          <LandingEstimateForm idPrefix="top" version={version} />
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ background: "#000000", color: "#FFFFFF" }}>
        <div className="fe-section" style={{ padding: "16px", textAlign: "center", fontSize: 13.5, lineHeight: 1.8 }}>
          <strong style={{ fontFamily: "var(--font-heading)" }}>Castle Express Moving &amp; Storage</strong>
          {" "}&middot; Family owned since 2011 &middot; Enfield, CT &middot; Licensed &amp; insured ({COMPANY.mc}, USDOT {COMPANY.usdot}, CT Permit {COMPANY.ctPermit})
          {" "}&middot; {COMPANY.truckCount} trucks &middot; Climate-controlled storage &middot; Serving Connecticut &amp; Massachusetts
        </div>
      </div>

      {/* A note from the owner */}
      <section className="fe-section">
        <div className="fe-card fe-joe">
          <Image src="/images/joe-caronna.webp" alt="Joe Caronna, owner of Castle Express Moving & Storage"
            width={599} height={800} loading="lazy"
            style={{ width: "100%", height: "auto", borderRadius: 10 }} />
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, margin: "0 0 8px" }}>
              A note from Joe
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#333", margin: "0 0 10px" }}>
              I started this company in 2011, loading PODS containers in a storage yard.
              Today we run {COMPANY.truckCount} trucks out of our Enfield facility, and my
              family and I still treat every move like it is our own. Fill out the form or
              give us a call, and we will get you taken care of.
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, margin: 0 }}>
              Joe Caronna, Owner
            </p>
          </div>
        </div>
      </section>

      {/* Real crew and truck photos */}
      <section className="fe-section" style={{ paddingTop: 0 }}>
        <div className="fe-grid3">
          {PHOTOS.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy"
              style={{ width: "100%", height: "auto", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 12 }} />
          ))}
        </div>
      </section>

      {/* Reviews (real, from site content, matched to this version) */}
      <section style={{ background: LIGHT }}>
        <div className="fe-section">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ marginBottom: 6 }}><Stars size={20} /></div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, margin: 0 }}>
              Rated {COMPANY.reviewAvg} from {COMPANY.reviewCount} Google reviews
            </h2>
          </div>
          <div className="fe-grid3">
            {reviews.map((r, i) => (
              <div key={i} className="fe-card">
                <div style={{ marginBottom: 8 }}><Stars /></div>
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

      {/* FAQ for this version */}
      <section className="fe-section fe-faq" style={{ maxWidth: 760, paddingTop: 0 }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, textAlign: "center", margin: "0 0 20px" }}>
          Common questions
        </h2>
        {v.faqs.map((f, i) => (
          <details key={i}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      {/* Final form + call button */}
      <section style={{ background: "#000000" }}>
        <div className="fe-section" style={{ maxWidth: 560 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, margin: "0 0 8px", color: "#FFFFFF", textAlign: "center" }}>
            Ready to get your free estimate?
          </h2>
          <p style={{ fontSize: 15, color: LIGHT, margin: "0 0 20px", textAlign: "center" }}>
            Tell us about your move and we will get you taken care of.
          </p>
          <LandingEstimateForm idPrefix="bottom" version={version} />
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <CallButton label="Or call (888) 553-4503" />
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

      {/* Sticky mobile bar */}
      <div className="fe-stickybar">
        <a href={COMPANY.phoneLink} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          background: "#FFFFFF", color: "#000000", border: `2px solid #000000`,
          borderRadius: 8, fontFamily: "var(--font-heading)", fontWeight: 700,
          fontSize: 15, minHeight: 48, textDecoration: "none",
        }}>
          <Phone size={16} /> Call
        </a>
        <button type="button" onClick={scrollToForm} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          background: GOLD, color: "#000000", border: "none", borderRadius: 8,
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15,
          minHeight: 48, cursor: "pointer",
        }}>
          Get My Free Estimate
        </button>
      </div>
    </div>
  );
}
