import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CITY_DATA, getCityBySlug, getAllSlugs } from "@/lib/cityData";
import { COMPANY, SERVICES } from "@/content";
import { MapPin, Phone, Check, Star, Shield, ArrowRight, ChevronRight } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";
import { parseInline } from "@/lib/parseInline";

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const city = getCityBySlug(params.slug);
  if (!city) return {};
  return {
    title: city.title,
    description: city.meta,
    alternates: {
      canonical: `https://www.castleexpressmoving.com/${city.slug}/`,
    },
    openGraph: {
      title: city.title,
      description: city.meta,
      url: `https://www.castleexpressmoving.com/${city.slug}/`,
      siteName: "Castle Express Moving & Storage",
      type: "website",
    },
  };
}

export default function CityPage({ params }) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Castle Express Moving & Storage",
    url: "https://www.castleexpressmoving.com",
    logo: "https://www.castleexpressmoving.com/logo.png",
    image: "https://www.castleexpressmoving.com/og-image.jpg",
    telephone: "+18885534503",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4 Niblick Rd Unit A",
      addressLocality: "Enfield",
      addressRegion: "CT",
      postalCode: "06082",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city.town,
      containedInPlace: {
        "@type": "State",
        name: city.stateFull,
      },
    },
    priceRange: "$$",
    openingHours: "Mo-Su 07:00-20:00",
    sameAs: [
      COMPANY.facebook,
      COMPANY.instagram,
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much do movers cost in ${city.town}, ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The cost of movers in ${city.town} varies by job size and distance. Castle Express Moving & Storage offers accurate, transparent estimates with free quotes. Most local moves in ${city.town} range from $400–$1,200 depending on home size. Call us at ${COMPANY.phone} for a free estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `Is Castle Express Moving licensed and insured in ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Castle Express Moving & Storage is fully licensed and insured for moves in ${city.stateFull}${city.state === "MA" ? " and Connecticut" : ""}. USDOT# ${COMPANY.usdot}, CT Permit ${COMPANY.ctPermit}. We carry full liability coverage on every move.`,
        },
      },
      {
        "@type": "Question",
        name: `How far in advance should I book movers in ${city.town}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `We recommend booking at least 2–4 weeks in advance, especially for summer moves. However, Castle Express Moving & Storage accommodates last-minute moves when availability allows. Call ${COMPANY.phone} to check our schedule.`,
        },
      },
      {
        "@type": "Question",
        name: `Does Castle Express offer packing services in ${city.town}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. We offer full and partial packing services in ${city.town}, including our Princess Packing™ white-glove service. Our team handles all materials, packing, wrapping, and loading. Ask about our packing add-on when you request your free quote.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.castleexpressmoving.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.castleexpressmoving.com/service-areas/" },
      { "@type": "ListItem", position: 3, name: `Movers in ${city.town}`, item: `https://www.castleexpressmoving.com/${city.slug}/` },
    ],
  };

  // Find nearby cities - use curated nearby array if available, fall back to state filter
  const nearbyCities = city.nearby
    ? city.nearby.map(slug => CITY_DATA.find(c => c.slug === slug)).filter(Boolean)
    : CITY_DATA.filter(c => c.slug !== city.slug && c.state === city.state).slice(0, 6);

  const linkStyle = { color: "#D4A017", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="section-dark" style={{ padding: "70px 24px 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-residential.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <Link href="/service-areas" style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Service Areas</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "#D4A017" }}>{city.town}, {city.state}</span>
          </div>
          <h1 className="heading-1" style={{ color: "#fff", marginBottom: 16, fontSize: "clamp(28px, 4vw, 44px)" }}>
            {city.h1}
          </h1>
          <p className="body-lg text-white-muted" style={{ maxWidth: 640, marginBottom: 12 }}>
            Castle Express Moving &amp; Storage  -  family-owned, licensed &amp; insured, serving {city.town} and all of {city.stateFull} since {COMPANY.founded}. {city.slug === 'movers-enfield-ct' ? 'Based right here in Enfield.' : `Located in Enfield, CT, just ${city.drive} away.`}
          </p>
          {city.localBlurb && (
            <p className="body-md text-white-muted" style={{ maxWidth: 640, marginBottom: 24, opacity: 0.9 }}>
              {parseInline(city.localBlurb)}
            </p>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Get Free Estimate <ArrowRight /></Link>
            <a href={COMPANY.phoneLink} className="btn btn-outline-light"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        {[
          { icon: <Shield size={18} />, label: "A+ BBB Rating" },
          { icon: <Star />, label: `${COMPANY.reviewAvg}★ Google (${COMPANY.reviewCount} Reviews)` },
          { icon: <MapPin size={18} />, label: `Serving ${city.town}, ${city.state}` },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ color: "#D4A017" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          {/* Left  -  Content */}
          <div>
            {/* LOCAL MOVERS */}
            <h2 className="heading-2" style={{ marginBottom: 16 }}>
              Local Movers in {city.town}, {city.state}
            </h2>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 20 }}>
              Castle Express Moving &amp; Storage is a family-owned local moving company serving {city.town}, {city.state} and the surrounding area. Since {COMPANY.founded}, our experienced crews have helped thousands of families and businesses across {city.stateFull} with residential moves, commercial relocations, packing, specialty items, and climate-controlled storage. If you&apos;re looking for reliable local movers in {city.town}, you&apos;re in the right place.
            </p>
            {city.localStory && city.localStory.map((para, i) => (
              <p key={i} className="body-md" style={{ color: "#1A1A2E", marginBottom: 20 }}>
                {parseInline(para)}
              </p>
            ))}
            <div style={{ marginBottom: 12 }} />

            {/* LOCAL MOVING */}
            <div className="section-label"><span>{city.h2_local}</span></div>
            <h2 className="heading-2" style={{ marginBottom: 24 }}>
              Local Moving in <span className="text-gold">{city.town}</span>
            </h2>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 24 }}>
              Whether you&apos;re moving across town or to a neighboring community, our <Link href="/services/residential-moving/" style={linkStyle}>local moving team</Link> in {city.town} makes the process simple and stress-free. We show up on time, handle your belongings with care, and get you moved without the headaches. Our accurate, upfront estimates mean no surprises on move day.
            </p>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 32 }}>
              As local movers serving {city.town}, {city.state}, we bring years of experience navigating {city.stateFull} roads, buildings, and neighborhoods  -  so your move goes smoothly from start to finish.
            </p>

            {/* LONG DISTANCE */}
            <h2 className="heading-2" style={{ marginBottom: 16 }}>
              {city.h2_ld}
            </h2>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 32 }}>
              Planning a long-distance move from {city.town}? Castle Express is licensed for <Link href="/services/long-distance-moving/" style={linkStyle}>interstate and long-distance moves</Link> and handles relocations throughout New England and beyond. We coordinate every detail  -  from packing and loading to transport and delivery  -  so you can focus on your fresh start.
            </p>

            {/* SPECIALTY */}
            <h2 className="heading-2" style={{ marginBottom: 16 }}>
              {city.h2_specialty}
            </h2>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 32 }}>
              We move <Link href="/piano-moving/" style={linkStyle}>pianos</Link>, gun safes, antiques, and other <Link href="/services/specialty-moving/" style={linkStyle}>specialty items</Link> in {city.town} and throughout {city.stateFull}. Our team uses proper equipment and techniques to protect your most valuable possessions. No job is too delicate.
            </p>

            {/* PACKING */}
            <h2 className="heading-2" style={{ marginBottom: 16 }}>
              {city.h2_packing}
            </h2>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 32 }}>
              Don&apos;t have time to pack? Our professional <Link href="/services/packing-services/" style={linkStyle}>packing team</Link> comes to your {city.town} home, handles all materials, and packs everything securely. Choose full-service packing or partial  -  including our <a href="/princess-packing/" style={linkStyle}>Princess Packing™</a> white-glove option for fragile or high-value items.
            </p>

            {/* COMMERCIAL */}
            <h2 className="heading-2" style={{ marginBottom: 16 }}>
              {city.h2_commercial}
            </h2>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 32 }}>
              Castle Express handles <Link href="/services/commercial-moving/" style={linkStyle}>commercial and office relocations</Link> in {city.town} with minimal downtime and maximum efficiency. We work around your schedule to keep your business moving  -  from small offices to multi-floor commercial builds.
            </p>

            {/* WHY CHOOSE US */}
            <h2 className="heading-2" style={{ marginBottom: 16 }}>
              {city.h2_why}
            </h2>
            <div style={{ marginBottom: 32 }}>
              {[
                `Family-owned and operated since ${COMPANY.founded}`,
                `Licensed & insured  -  USDOT# ${COMPANY.usdot}, CT Permit ${COMPANY.ctPermit}`,
                "Accurate estimates  -  no hidden fees",
                `${COMPANY.reviewCount} five-star Google reviews`,
                city.slug === 'movers-enfield-ct' ? 'Based right here in Enfield, CT' : `Serving ${city.town} from our Enfield, CT facility - just ${city.drive} away`,
                "Climate-controlled storage available",
                "Same-day quotes, typically respond in 20 minutes",
              ].map((feat, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check />
                  </div>
                  <span className="body-md" style={{ color: "#1A1A2E" }}>{feat}</span>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 12 }}>
              Services Available in {city.town}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
              {[
                { title: "Residential Moving", href: "/services/residential-moving" },
                { title: "Commercial & Office Moving", href: "/services/commercial-moving" },
                { title: "Full-Service Packing", href: "/services/packing-services" },
                { title: "Climate-Controlled Storage", href: "/services/storage" },
                { title: "Specialty Moving", href: "/services/specialty-moving" },
                { title: "Long Distance Moving", href: "/services/long-distance-moving" },
              ].map(svc => (
                <Link key={svc.href} href={svc.href} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#F9FAFB", borderRadius: 8, textDecoration: "none", border: "1px solid #E5E7EB", transition: "border-color 0.2s" }}>
                  <span style={{ color: "#D4A017", fontSize: 14 }}>→</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "#1A1A2E" }}>{svc.title}</span>
                </Link>
              ))}
            </div>

            {/* Photo grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 32 }}>
              <div style={{ position: "relative", height: 180, borderRadius: 10, overflow: "hidden" }}><Image src="/images/truck-aframe.jpg" alt={`Castle Express moving truck in ${city.town}`} fill style={{ objectFit: "cover" }} /></div>
              <div style={{ position: "relative", height: 180, borderRadius: 10, overflow: "hidden" }}><Image src="/images/truck-brick-building.jpg" alt={`Professional movers near ${city.town}`} fill style={{ objectFit: "cover" }} /></div>
            </div>

            {/* FAQ */}
            <h2 className="heading-2" style={{ marginBottom: 16 }}>
              Frequently Asked Questions  -  Movers in {city.town}, {city.state}
            </h2>
            <div style={{ marginBottom: 32 }}>
              <details style={{ marginBottom: 12, padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, border: "1px solid #E5E7EB" }}>
                <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "#1A1A2E", cursor: "pointer" }}>How much do movers cost in {city.town}, {city.state}?</summary>
                <p className="body-sm" style={{ color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>The cost varies by home size and distance. Most local moves in {city.town} range from $400–$1,200. We offer free accurate estimates  -  call {COMPANY.phone} or fill out the form.</p>
              </details>
              <details style={{ marginBottom: 12, padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, border: "1px solid #E5E7EB" }}>
                <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "#1A1A2E", cursor: "pointer" }}>Is Castle Express licensed and insured in {city.state}?</summary>
                <p className="body-sm" style={{ color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>Yes. We are fully licensed for moves in {city.stateFull}{city.state === "MA" ? " and Connecticut" : ""}. USDOT# {COMPANY.usdot}, CT Permit {COMPANY.ctPermit}. Full liability coverage on every move.</p>
              </details>
              <details style={{ marginBottom: 12, padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, border: "1px solid #E5E7EB" }}>
                <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "#1A1A2E", cursor: "pointer" }}>How far in advance should I book?</summary>
                <p className="body-sm" style={{ color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>2–4 weeks is ideal, especially May–September. We do accommodate last-minute moves  -  call to check availability.</p>
              </details>
              <details style={{ marginBottom: 12, padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, border: "1px solid #E5E7EB" }}>
                <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "#1A1A2E", cursor: "pointer" }}>Do you offer packing services in {city.town}?</summary>
                <p className="body-sm" style={{ color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>Yes  -  full packing, partial packing, and our Princess Packing™ white-glove option. We bring all materials. Ask when you call.</p>
              </details>
            </div>

            {/* Nearby Cities */}
            {nearbyCities.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 14 }}>
                  Also Serving Nearby
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {nearbyCities.map(n => (
                    <Link key={n.slug} href={`/${n.slug}`} className="location-chip">
                      <MapPin size={14} /> {n.town}, {n.state}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link href="/service-areas" className="btn btn-ghost" style={{ marginTop: 8 }}>
              <ChevronRight style={{ transform: "rotate(180deg)" }} /> View All Service Areas
            </Link>
          </div>

          {/* Right  -  Estimate Form */}
          <div style={{ position: "sticky", top: 96 }}>
            <EstimateForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark text-center">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="heading-2 text-white">{city.cta}</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 28 }}>
            Call us at <a href={COMPANY.phoneLink} style={{ color: "#D4A017", fontWeight: 600 }}>{COMPANY.phone}</a> or fill out the form above. We typically respond in 20 minutes or less.
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
