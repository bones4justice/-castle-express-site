import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/components/Icons";
import PackingEstimateForm from "./PackingEstimateForm";

const PINK = "#F72585";
const PINK_SOFT = "#fce4ef";

export const metadata = {
  title: "Princess Packing™ | White-Glove Packing | Castle Express Moving & Storage",
  description: "Princess Packing™ is the white-glove packing service from Castle Express Moving & Storage. Our experienced all-female crew handles your belongings with extra care. Serving Hartford County CT & Western MA. Call 1-888-553-4503.",
  alternates: { canonical: "/princess-packing/" },
  openGraph: {
    title: "Princess Packing™ | Castle Express Moving & Storage",
    description: "White-glove packing service by Castle Express Moving & Storage. All-female crew, extra care for your belongings.",
    url: "/princess-packing/",
    images: [{ url: "/images/princess-packing-crew.jpg", alt: "Princess Packing crew packing a kitchen in pink polos" }],
  },
};

const PACKAGES = [
  {
    tier: "Pro Package",
    name: "25 Box Bundle",
    tagline: "Pack your kitchen, the most time-consuming room in your home.",
    price: "595",
    featured: false,
    items: ["Princess Packing Team", "16 Small Boxes", "5 Medium Boxes", "2 Medium-Large Boxes", "Newsprint, bubble wrap & tape", "Room-by-room labeling"],
  },
  {
    tier: "Plus Package",
    name: "50 Box Bundle",
    tagline: "Pack your kitchen plus two additional rooms. Ideal for busy families and working professionals.",
    price: "995",
    featured: true,
    items: ["Princess Packing Team", "28 Small Boxes", "9 Medium Boxes", "4 Medium-Large Boxes", "5 Wardrobe Boxes", "Newsprint, bubble wrap & tape", "Room-by-room labeling"],
  },
  {
    tier: "Premium Package",
    name: "100 Box Bundle",
    tagline: "Pack your whole house. For households that want everything handled.",
    price: "1,895",
    featured: false,
    items: ["Princess Packing Team", "46 Small Boxes", "28 Medium Boxes", "9 Medium-Large Boxes", "10 Wardrobe Boxes", "Newsprint, bubble wrap & tape", "Room-by-room labeling", "Priority scheduling"],
  },
];

const PROCESS = [
  { num: "01", title: "Request an Estimate", desc: "Tell us about your home and move date. We'll match you to the right package and confirm availability." },
  { num: "02", title: "Reserve Your Date", desc: "Capacity is limited to one major pack per day. Your date is secured upon booking confirmation." },
  { num: "03", title: "Team Arrives", desc: "A polished, experienced Princess Packing team arrives with all materials and works room by room." },
  { num: "04", title: "Move Day Ready", desc: "Your home is packed, labeled, and organized. Your moving crew arrives to a job already done." },
];

const KNOW_ITEMS = [
  { title: "Advance Booking Required", desc: "No same-day bookings. Princess Packing™ is reserved in advance to ensure proper crew and materials allocation." },
  { title: "Limited Capacity", desc: "We accept a maximum of one major pack per day. This ensures quality, consistency, and full team attention on your home." },
  { title: "Packing Only", desc: "Princess Packing™ covers packing only, not unpacking, not organizing. Focused scope means exceptional results." },
];

export default function PrincessPackingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.castleexpressmoving.com/" },
      { "@type": "ListItem", "position": 2, "name": "Princess Packing™", "item": "https://www.castleexpressmoving.com/princess-packing/" },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Princess Packing™",
    "description": "White-glove packing service with an experienced all-female crew. Extra care for your most precious belongings.",
    "provider": {
      "@type": "MovingCompany",
      "name": "Castle Express Moving & Storage",
      "telephone": "+18885534503",
      "url": "https://www.castleexpressmoving.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4 Niblick Rd Unit A",
        "addressLocality": "Enfield",
        "addressRegion": "CT",
        "postalCode": "06082"
      }
    },
    "areaServed": [
      { "@type": "State", "name": "Connecticut" },
      { "@type": "State", "name": "Massachusetts" }
    ],
    "url": "https://www.castleexpressmoving.com/princess-packing/"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ─── HERO ─── */}
      <section style={{ background: "#0d0d0d", padding: "70px 24px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 20 }}>
              White-Glove Packing Service | Hartford County, CT &amp; Western MA
            </p>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.1, color: "#fff", marginBottom: 20 }}>
              Professional Packing.<br /><span style={{ color: PINK }}>Done Right.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.65)", maxWidth: 460, marginBottom: 32 }}>
              Reduces stress. Protects what matters. Completed by an experienced, all-female professional team before your move even begins.
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#request" style={{ background: PINK, color: "#fff", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 34px", textDecoration: "none", display: "inline-block" }}>
                Request a Packing Estimate
              </a>
              <a href="#pricing" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 2 }}>
                View Packages
              </a>
            </div>
            <div style={{ marginTop: 48, display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                { num: "4.9★", label: "Google Rating" },
                { num: "200+", label: "Reviews" },
                { num: "Since 2011", label: "Castle Express Moving & Storage" },
              ].map((t, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{t.num}</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 5, fontFamily: "var(--font-body)" }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: `linear-gradient(160deg, ${PINK_SOFT} 0%, rgba(247,37,133,0.15) 100%)`, padding: 24, border: "1px solid rgba(247,37,133,0.2)" }}>
            <div style={{ position: "relative", width: "100%", height: 440 }}>
              <Image src="/images/princess-packing-crew.jpg" alt="Princess Packing crew packing a kitchen in pink polos" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
            </div>
          </div>
        </div>
      </section>

      {/* ─── BADGE STRIP ─── */}
      <div style={{ background: PINK, padding: "14px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", fontWeight: 700, fontFamily: "var(--font-heading)", lineHeight: 2 }}>
          White-Glove Service &nbsp;·&nbsp; Professional Team &nbsp;·&nbsp; Room-by-Room Labeling &nbsp;·&nbsp; All Materials Included &nbsp;·&nbsp; Reserved in Advance &nbsp;·&nbsp; Maximum 1 Major Pack Per Day &nbsp;·&nbsp; A+ BBB Rating
        </p>
      </div>

      {/* ─── WHAT IT IS ─── */}
      <section className="section">
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "center", padding: "0 24px" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 14 }}>What It Is</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.15, color: "#1A1A2E", marginBottom: 18 }}>
              Your home, packed before move day.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.75, color: "#6b6b6b", marginBottom: 14 }}>
              Princess Packing™ is a boutique residential packing service, scheduled in advance, completed by an experienced all-female team, and built around one goal: protecting what matters before the chaos of move day begins.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.75, color: "#6b6b6b", marginBottom: 28 }}>
              This is not a last-minute rush. It is not discount packing. It is a structured, professional service worth the investment.
            </p>
            {[
              ["Completed before move day.", "Your crew arrives to a fully packed, labeled home."],
              ["All packing materials included.", "Newsprint, bubble wrap, tape, and boxes are part of every package."],
              ["Room-by-room labeling.", "Every box identified clearly for seamless unloading at your new home."],
              ["Limited availability.", "Princess Packing™ accepts one major pack per day. Reserve early."],
            ].map(([strong, rest], i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 24, height: 24, background: PINK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, fontSize: 13, fontWeight: 700 }}>✓</div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.6, color: "#1A1A2E" }}>
                  <strong>{strong}</strong> {rest}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#e8e8e8", border: "1px solid #e8e8e8" }}>
            {[
              ["1", "Major Pack Per Day Max"],
              ["100%", "Materials Included"],
              ["0", "Same-Day Bookings"],
              ["4.9", "Google Star Average"],
            ].map(([num, label], i) => (
              <div key={i} style={{ background: i % 2 === 0 ? "#f5f5f5" : "#fff", padding: "38px 28px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 42, fontWeight: 800, color: PINK, lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 12.5, letterSpacing: "0.06em", color: "#6b6b6b", textTransform: "uppercase", fontWeight: 600, lineHeight: 1.5, marginTop: 8, fontFamily: "var(--font-body)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section style={{ background: "#0d0d0d", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 14 }}>How It Works</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.15, color: "#fff" }}>
              Four steps to a fully packed home.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {PROCESS.map((step) => (
              <div key={step.num}>
                <div style={{ width: 56, height: 56, border: `1px solid ${PINK}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800, color: PINK }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="section" id="pricing">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 14 }}>Packages</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", color: "#1A1A2E", marginBottom: 14 }}>Choose your bundle.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "#6b6b6b", maxWidth: 520, margin: "0 auto" }}>
              All packages include the Princess Packing™ team, all materials, and room-by-room labeling. No hidden fees.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24, alignItems: "start" }}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.tier} style={{ border: pkg.featured ? `2px solid ${PINK}` : "1px solid #e8e8e8", padding: "44px 34px", position: "relative", background: "#fff" }}>
                {pkg.featured && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: PINK, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 18px", whiteSpace: "nowrap", fontFamily: "var(--font-heading)" }}>
                    ⭐ Most Popular
                  </div>
                )}
                <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 8 }}>{pkg.tier}</p>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 26, fontWeight: 800, color: "#1A1A2E", marginBottom: 6 }}>{pkg.name}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6b6b6b", marginBottom: 26, lineHeight: 1.55 }}>{pkg.tagline}</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "#1A1A2E", marginTop: 6 }}>$</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 52, fontWeight: 800, lineHeight: 1, color: "#1A1A2E" }}>{pkg.price}</span>
                </div>
                <p style={{ fontSize: 13, color: "#6b6b6b", marginBottom: 26, fontWeight: 500, letterSpacing: "0.04em", fontFamily: "var(--font-body)" }}>Flat-rate bundle</p>
                <div style={{ height: 1, background: "#e8e8e8", marginBottom: 22 }} />
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b6b", fontWeight: 700, marginBottom: 16, fontFamily: "var(--font-heading)" }}>Includes</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 11 }}>
                  {pkg.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14.5, color: "#1A1A2E", lineHeight: 1.4, fontFamily: "var(--font-body)" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: PINK, flexShrink: 0, marginTop: 7 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#request" style={{
                  display: "block", width: "100%", textAlign: "center", padding: "15px", fontSize: 13, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "var(--font-heading)",
                  ...(pkg.featured
                    ? { background: PINK, color: "#fff" }
                    : { background: "transparent", color: "#1A1A2E", border: "1px solid #1A1A2E" }),
                }}>
                  Request This Package
                </a>
              </div>
            ))}
          </div>

          {/* Overage */}
          <div style={{ background: "#f5f5f5", borderLeft: `3px solid ${PINK}`, padding: "28px 34px", marginTop: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 10 }}>If You Go Over</p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 700, color: "#1A1A2E", marginBottom: 10 }}>Additional Boxes: Billed Only If Bundle Is Exceeded</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "#6b6b6b", marginBottom: 10 }}>
              Small: <strong style={{ color: "#1A1A2E" }}>$10</strong> &nbsp;&nbsp; Medium: <strong style={{ color: "#1A1A2E" }}>$15</strong> &nbsp;&nbsp; Medium-Large: <strong style={{ color: "#1A1A2E" }}>$20</strong> &nbsp;&nbsp; Wardrobe: <strong style={{ color: "#1A1A2E" }}>$35</strong>
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#6b6b6b", lineHeight: 1.65, fontStyle: "italic" }}>
              Box distribution is based on typical home layouts. Final box mix may adjust based on actual contents. Your team will communicate before exceeding your selected bundle. No surprises.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PROMISE BAND ─── */}
      <section style={{ background: PINK, padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 18 }}>The Princess Packing™ Promise</p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 5vw, 50px)", color: "#fff", lineHeight: 1.12, maxWidth: 760, margin: "0 auto 18px" }}>
          Safe. Structured. Polished. Worth every dollar.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "rgba(255,255,255,0.85)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Reduces stress. Protects what matters. Before your move even begins.
        </p>
        <a href="#request" style={{ display: "inline-block", background: "#fff", color: PINK, fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "17px 44px", textDecoration: "none", fontFamily: "var(--font-heading)" }}>
          Request a Packing Estimate
        </a>
      </section>

      {/* ─── BEFORE YOU BOOK ─── */}
      <section className="section">
        <div style={{ maxWidth: 950, margin: "0 auto", textAlign: "center", padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 14 }}>Before You Book</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", color: "#1A1A2E", marginBottom: 40 }}>What to know.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 1, background: "#e8e8e8", border: "1px solid #e8e8e8" }}>
            {KNOW_ITEMS.map((item, i) => (
              <div key={i} style={{ background: "#fff", padding: "38px 26px" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "#1A1A2E", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#6b6b6b", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#6b6b6b", lineHeight: 1.7, marginTop: 32 }}>
            Looking for standard packing help on move day instead? See our full <Link href="/services/packing-services/" style={{ color: "#D4A017", fontWeight: 700 }}>packing services</Link>.
          </p>
        </div>
      </section>

      {/* ─── ESTIMATE FORM ─── */}
      <section style={{ background: "#0d0d0d", padding: "80px 24px" }} id="request">
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: PINK, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 14 }}>Request an Estimate</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 32, color: "#fff", marginBottom: 14 }}>Reserve your packing date.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
              Fill out the form below and a member of our team will follow up within one business day to confirm availability and package details.
            </p>
          </div>
          <PackingEstimateForm />
          <p style={{ textAlign: "center", marginTop: 28 }}>
            <a href="tel:18885534503" style={{ color: PINK, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Phone size={16} /> Or call 1-888-553-4503
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
