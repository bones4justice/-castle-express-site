import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/content";
import { Check, Phone, Star, Shield, ArrowRight, MapPin } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

export const metadata = {
  title: "Piano Movers in Connecticut | Castle Express Moving & Storage",
  description: "Professional piano moving in Hartford County and Western Massachusetts. Upright and grand pianos moved safely by experienced crews. Free estimates. Call (888) 553-4503.",
  alternates: { canonical: "/piano-moving/" },
  openGraph: {
    title: "Piano Movers in Connecticut | Castle Express Moving & Storage",
    description: "Professional piano moving in Hartford County and Western Massachusetts. Upright, baby grand, and grand pianos moved safely.",
    url: "/piano-moving/",
    images: [{ url: "/images/truck-tobacco-barn.jpg", alt: "Piano Moving" }],
  },
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.castleexpressmoving.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.castleexpressmoving.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "Piano Moving" },
  ],
};

const FAQS = [
  {
    q: "How much does it cost to move a piano in Connecticut?",
    a: "Piano moves in Connecticut in 2026 typically run from $300 to $800 for a local move. The price depends on the type of piano, number of stairs, carry distance, and whether the route has tight turns or narrow doorways. Grand pianos and moves involving multiple flights of stairs can go higher. We provide free estimates after a walkthrough so you know exactly what to expect.",
  },
  {
    q: "Can movers move a grand piano up stairs?",
    a: "Yes, but it takes the right crew and the right equipment. Grand pianos are turned on their side, secured to a piano board, and carried by four or five experienced movers. We do a pre-move assessment to confirm the staircase can safely accommodate the piano. If the path is too tight, we will tell you honestly and discuss alternatives like hoisting through a window.",
  },
  {
    q: "Do I need to tune my piano after moving?",
    a: "Yes. Almost every piano needs to be tuned after a move. The change in location, temperature, and humidity shifts the instrument even when it is handled carefully. We recommend waiting 2 to 3 weeks after the move so the piano has time to acclimate to its new environment, then bringing in a tuner to bring it back into proper pitch.",
  },
  {
    q: "How far in advance should I book piano movers?",
    a: "For a standalone piano move, 1 to 2 weeks is usually enough notice. For a full household move that includes a piano, book as soon as you have a move date. Piano moves require crew scheduling and specialty equipment, so the earlier we know, the better we can plan. If you are on a tight timeline, call us and we will do our best to fit you in.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
};

export default function PianoMovingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      {/* ─── HERO ─── */}
      <section className="section-dark" style={{ padding: "70px 24px 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-tobacco-barn.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <Link href="/services" style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Services</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "#D4A017" }}>Piano Moving</span>
          </div>
          <h1 className="heading-1" style={{ color: "#fff", marginBottom: 16, fontSize: "clamp(28px, 4vw, 44px)" }}>
            Piano Moving Services in Connecticut
          </h1>
          <p className="body-lg text-white-muted" style={{ maxWidth: 640, marginBottom: 24 }}>
            Upright, grand, baby grand - we move them all safely. Experienced piano movers serving Hartford County and Western Massachusetts since 2013.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Get Free Estimate <ArrowRight /></Link>
            <a href={COMPANY.phoneLink} className="btn btn-outline-light"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="trust-bar">
        {[
          { icon: <Shield size={18} />, label: "Licensed & Insured" },
          { icon: <Star />, label: `${COMPANY.reviewAvg}★ Google (${COMPANY.reviewCount} Reviews)` },
          { icon: <MapPin size={18} />, label: "Hartford County CT & Western MA" },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ color: "#D4A017" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            {/* Section 1: Why Piano Moving Is Different */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                Why Piano Moving Is Different
              </h2>
              <p className="body-md" style={{ color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
                Pianos are not furniture. They are precision instruments weighing anywhere from 300 to 1,200 pounds, with delicate internal components that can be damaged by vibration, tipping, or temperature changes. Moving a piano requires specialty equipment, experienced handling, and a plan for every doorway, staircase, and tight corner between point A and point B.
              </p>
              <p className="body-md" style={{ color: "#374151", lineHeight: 1.8 }}>
                In Connecticut, that last part matters more than most places. Older homes in towns like <Link href="/movers-wethersfield-ct" style={{ color: "#D4A017", fontWeight: 600 }}>Wethersfield</Link>, <Link href="/movers-glastonbury-ct" style={{ color: "#D4A017", fontWeight: 600 }}>Glastonbury</Link>, and <Link href="/movers-west-hartford-ct" style={{ color: "#D4A017", fontWeight: 600 }}>West Hartford</Link> often have narrow hallways, steep staircases, and tight turns that make piano moving especially challenging. Our crews handle these situations regularly.
              </p>
            </div>

            {/* Section 2: What We Move */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                What We Move
              </h2>
              {[
                "Upright pianos (300 to 500 lbs)",
                "Baby grand pianos (500 to 600 lbs)",
                "Grand pianos (600 to 1,200 lbs)",
                "Digital pianos and keyboards",
                "Organs",
              ].map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check />
                  </div>
                  <span className="body-md" style={{ color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Section 3: Our Process */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                Our Process
              </h2>
              {[
                { n: "1", title: "Free estimate", desc: "We assess the piano, the path, and any obstacles before giving you a number." },
                { n: "2", title: "Preparation", desc: "The piano is wrapped, padded, and secured to a piano board or skid." },
                { n: "3", title: "Transport", desc: "Climate-controlled truck, strapped and secured for transit." },
                { n: "4", title: "Delivery", desc: "Placed exactly where you want it in your new home." },
                { n: "5", title: "Tuning recommendation", desc: "We recommend having your piano tuned 2 to 3 weeks after the move so it has time to acclimate." },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#D4A017", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>
                    {step.n}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 4 }}>{step.title}</div>
                    <p className="body-sm" style={{ color: "#374151", lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Callout */}
            <div style={{ background: "#FFF9EC", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, padding: "24px 28px", marginBottom: 36 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#1A1A2E", lineHeight: 1.7 }}>
                We do not claim to be the cheapest piano movers in Connecticut. We claim to do it right. If you have a piano that matters to you, that is what should matter most. Piano moving is part of our <Link href="/services/specialty-moving" style={{ color: "#D4A017", fontWeight: 700 }}>specialty moving</Link> service.
              </p>
            </div>

            {/* Section 4: Service Area */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                Service Area
              </h2>
              <p className="body-md" style={{ color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
                We move pianos throughout Hartford County, CT and Western Massachusetts. Our crews are in and out of these towns every week:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { slug: "movers-west-hartford-ct", label: "West Hartford" },
                  { slug: "movers-glastonbury-ct", label: "Glastonbury" },
                  { slug: "movers-wethersfield-ct", label: "Wethersfield" },
                  { slug: "movers-simsbury-ct", label: "Simsbury" },
                  { slug: "movers-avon-ct", label: "Avon" },
                  { slug: "movers-enfield-ct", label: "Enfield" },
                ].map(t => (
                  <Link key={t.slug} href={`/${t.slug}`} className="location-chip">
                    <MapPin size={14} /> {t.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 36 }}>
              <div style={{ position: "relative", height: 200, borderRadius: 10, overflow: "hidden" }}>
                <Image src="/images/truck-tobacco-barn.jpg" alt="Castle Express Moving truck" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", height: 200, borderRadius: 10, overflow: "hidden" }}>
                <Image src="/images/truck-aframe.jpg" alt="Castle Express Moving at a residential home" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
            </div>

            {/* FAQ */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                Frequently Asked Questions
              </h2>
              {FAQS.map((item, i) => (
                <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 6 }}>{item.q}</h3>
                  <p className="body-sm text-gray">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Estimate Form */}
          <div style={{ position: "sticky", top: 96 }}>
            <EstimateForm />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section section-dark text-center">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="heading-2 text-white">Get a Free Piano Moving Estimate</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 28 }}>
            Call today for a free, no-obligation estimate. We will walk you through every step.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Get Your Free Estimate</Link>
            <a href={COMPANY.phoneLink} className="btn btn-white"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
