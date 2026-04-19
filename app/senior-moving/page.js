import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/content";
import { Check, Phone, Star, Shield, ArrowRight, MapPin } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

export const metadata = {
  title: "Senior Movers in Connecticut | Castle Express Moving & Storage",
  description: "Senior movers serving Hartford County and Western Massachusetts. Castle Express provides patient, experienced crews for downsizing, assisted living transitions, and estate moves. Free estimates. Call (888) 553-4503.",
  alternates: { canonical: "/senior-moving/" },
  openGraph: {
    title: "Senior Movers in Connecticut | Castle Express Moving & Storage",
    description: "Patient, experienced senior movers for downsizing, assisted living transitions, and estate moves throughout Hartford County and Western Massachusetts.",
    url: "/senior-moving/",
    images: [{ url: "/images/crew-furniture.jpg", alt: "Senior Moving" }],
  },
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.castleexpressmoving.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.castleexpressmoving.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "Senior Moving" },
  ],
};

const FAQS = [
  {
    q: "How much does a senior move cost in Connecticut?",
    a: "Senior moving costs depend on the size of the current home, how much is being moved versus donated or discarded, and the distance to the new location. Most senior moves in Hartford County run between $800 and $2,500 for a local move. We provide free in-home estimates and we are happy to walk through the process with the client or their family.",
  },
  {
    q: "Do you help with downsizing before the move?",
    a: "We help identify what is moving and what is not, and we can coordinate with local donation services. For packing, we offer our Princess Packing service which handles everything from wrapping dishes to boxing up an entire home. We do not offer junk removal, but we can recommend local services that do.",
  },
  {
    q: "Can you coordinate with my parent's assisted living facility?",
    a: "Yes. We regularly coordinate with assisted living facilities, retirement communities, and nursing homes on timing, elevator reservations, loading dock access, and room setup. We handle the logistics so the family can focus on their loved one.",
  },
  {
    q: "How do you handle fragile heirlooms and antiques?",
    a: "Antiques, heirlooms, and sentimental items get extra attention. We use specialty wrapping, custom padding, and careful handling for anything that cannot be replaced. If an item needs special equipment like a piano board or crate, we plan for that in advance.",
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

export default function SeniorMovingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      {/* ─── HERO ─── */}
      <section className="section-dark" style={{ padding: "70px 24px 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/crew-furniture.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <Link href="/services" style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Services</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "#D4A017" }}>Senior Moving</span>
          </div>
          <h1 className="heading-1" style={{ color: "#fff", marginBottom: 16, fontSize: "clamp(28px, 4vw, 44px)" }}>
            Senior Moving Services in Connecticut
          </h1>
          <p className="body-lg text-white-muted" style={{ maxWidth: 640, marginBottom: 24 }}>
            Patient, experienced crews for life's biggest transitions. Serving Hartford County and Western Massachusetts since 2013.
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
            {/* Section 1: Why Senior Moves Are Different */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                Why Senior Moves Are Different
              </h2>
              <p className="body-md" style={{ color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
                A senior move is not just a regular move with older clients. It is often a major life transition - downsizing from a family home of 30 or 40 years, moving into an assisted living facility, or relocating closer to family after losing a spouse. These moves carry emotional weight that a standard residential move does not.
              </p>
              <p className="body-md" style={{ color: "#374151", lineHeight: 1.8 }}>
                Our crews understand that. We move at the client's pace, we handle belongings with extra care, and we communicate clearly every step of the way. Many of our senior moves are coordinated with adult children who may not live locally, and we are comfortable being the point of contact on move day.
              </p>
            </div>

            {/* Section 2: What We Handle */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                What We Handle
              </h2>
              {[
                "Downsizing moves from larger homes to smaller spaces",
                "Assisted living and retirement community transitions",
                "Estate moves and downsizing",
                "Coordination with family members who live out of state",
                "Careful handling of antiques, heirlooms, and sentimental items",
                "Furniture placement in the new home exactly where the client wants it",
              ].map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check />
                  </div>
                  <span className="body-md" style={{ color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Section 3: Our Approach */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                Our Approach
              </h2>
              {[
                { n: "1", title: "Free in-home estimate", desc: "We walk through the home with the client or family member to understand what is involved." },
                { n: "2", title: "Planning", desc: "We help identify what is moving, what is being donated, and what needs special handling." },
                { n: "3", title: "Packing", desc: "Full-service packing available through our Princess Packing service, including fragile items and heirlooms." },
                { n: "4", title: "Moving day", desc: "Patient, experienced crew, floor protection, and careful furniture placement in the new home." },
                { n: "5", title: "Unpacking assistance", desc: "We can unpack boxes and set up the new space so it feels like home on day one." },
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
                Senior moves are some of the most important moves we do. When a family trusts us with their parent or grandparent's move, we take that seriously. Learn more about our <Link href="/princess-packing/" style={{ color: "#D4A017", fontWeight: 700 }}>Princess Packing</Link> service and our full <Link href="/services/residential-moving" style={{ color: "#D4A017", fontWeight: 700 }}>residential moving</Link> options.
              </p>
            </div>

            {/* Section 4: Service Area */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                Service Area
              </h2>
              <p className="body-md" style={{ color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
                We handle senior moves throughout Hartford County, CT and Western Massachusetts. Our crews are in and out of these towns every week:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { slug: "movers-west-hartford-ct", label: "West Hartford" },
                  { slug: "movers-glastonbury-ct", label: "Glastonbury" },
                  { slug: "movers-simsbury-ct", label: "Simsbury" },
                  { slug: "movers-avon-ct", label: "Avon" },
                  { slug: "movers-enfield-ct", label: "Enfield" },
                  { slug: "movers-wethersfield-ct", label: "Wethersfield" },
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
                <Image src="/images/crew-furniture.jpg" alt="Castle Express crew moving furniture" fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", height: 200, borderRadius: 10, overflow: "hidden" }}>
                <Image src="/images/joe-with-customers.jpg" alt="Joe Caronna with Castle Express customers" fill style={{ objectFit: "cover", objectPosition: "15% 25%" }} />
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
          <h2 className="heading-2 text-white">Get a Free Senior Moving Estimate</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 28 }}>
            Call today for a free, no-obligation estimate. We will walk through the process with you or your family member and answer any questions.
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
