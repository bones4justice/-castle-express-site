import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, CITY_PAGES, SERVICES } from "@/content";
import { MapPin, Phone, Check, Star, Shield, ArrowRight, ChevronRight } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

export function generateStaticParams() {
  return Object.keys(CITY_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const city = CITY_PAGES[params.slug];
  if (!city) return {};
  return {
    title: `Movers in ${city.fullName} — Castle Express Moving & Storage`,
    description: `Professional moving services in ${city.fullName}. Flat-rate pricing, licensed & insured, A+ BBB rated. Family-owned since 2008. Call ${COMPANY.phone} for a free estimate.`,
  };
}

export default function CityPage({ params }) {
  const city = CITY_PAGES[params.slug];
  if (!city) notFound();

  const nearbySlugs = city.nearby.map(n => {
    const match = Object.entries(CITY_PAGES).find(([, v]) => v.name === n);
    return match ? { name: n, slug: match[0], state: match[1].state } : null;
  }).filter(Boolean);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="section-dark" style={{ padding: "70px 24px 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-residential.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <Link href="/service-areas" style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Service Areas</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "#D4A017" }}>{city.fullName}</span>
          </div>
          <h1 className="heading-1" style={{ color: "#fff", marginBottom: 16, fontSize: "clamp(28px, 4vw, 44px)" }}>
            {city.headline}
          </h1>
          <p className="body-lg text-white-muted" style={{ maxWidth: 640, marginBottom: 24 }}>
            {city.intro}
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
          { icon: <Shield size={18} />, label: "A+ BBB Rating" },
          { icon: <Star />, label: `${COMPANY.reviewAvg}★ Google (${COMPANY.reviewCount} Reviews)` },
          { icon: <MapPin size={18} />, label: `Serving ${city.fullName}` },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ color: "#D4A017" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          {/* Left — Content */}
          <div>
            <div className="section-label"><span>Why Choose Castle Express</span></div>
            <h2 className="heading-2" style={{ marginBottom: 24 }}>
              Professional Moving in <span className="text-gold">{city.name}</span>
            </h2>

            <div style={{ marginBottom: 32 }}>
              {city.features.map((feat, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check />
                  </div>
                  <span className="body-md" style={{ color: "#1A1A2E" }}>{feat}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 12 }}>
              Services Available in {city.name}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
              {SERVICES.map(svc => (
                <Link key={svc.id} href="/services" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#F9FAFB", borderRadius: 8, textDecoration: "none", border: "1px solid #E5E7EB", transition: "border-color 0.2s" }}>
                  <span style={{ color: "#D4A017", fontSize: 14 }}>→</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "#1A1A2E" }}>{svc.title}</span>
                </Link>
              ))}
            </div>

            {/* Photo grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 32 }}>
              <img src="/images/truck-aframe.jpg" alt={`Castle Express moving truck in ${city.name}`} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10 }} />
              <img src="/images/truck-brick-building.jpg" alt={`Professional movers near ${city.name}`} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10 }} />
            </div>

            {/* Nearby Cities */}
            {nearbySlugs.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 14 }}>
                  Also Serving Nearby
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {nearbySlugs.map(n => (
                    <Link key={n.slug} href={`/service-areas/${n.slug}`} className="location-chip">
                      <MapPin size={14} /> {n.name}, {n.state}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link href="/service-areas" className="btn btn-ghost" style={{ marginTop: 8 }}>
              <ChevronRight style={{ transform: "rotate(180deg)" }} /> View All Service Areas
            </Link>
          </div>

          {/* Right — Estimate Form */}
          <div style={{ position: "sticky", top: 96 }}>
            <EstimateForm />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section section-dark text-center">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="heading-2 text-white">Ready to Move in {city.name}?</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 28 }}>
            Call today for a free, no-obligation moving estimate. We'll walk you through every step.
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
