import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CITY_DATA, getCityBySlug } from "@/lib/cityData";
import { SERVICE_SUBPAGES, TOWN_SERVICE_INTROS, SUBPAGE_TOWNS, SUBPAGE_SERVICES } from "@/lib/serviceSubpages";
import { COMPANY } from "@/content";
import { MapPin, Phone, Check, Star, Shield, ArrowRight, ChevronRight } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

export async function generateStaticParams() {
  const params = [];
  for (const townSlug of SUBPAGE_TOWNS) {
    for (const serviceSlug of SUBPAGE_SERVICES) {
      params.push({ slug: townSlug, service: serviceSlug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const city = getCityBySlug(params.slug);
  const svc = SERVICE_SUBPAGES[params.service];
  if (!city || !svc || !SUBPAGE_TOWNS.includes(params.slug)) return {};

  const title = `${svc.serviceTitle} in ${city.town}, ${city.state} | Castle Express Moving & Storage`;
  const description = `Looking for ${svc.serviceTitle.toLowerCase()} in ${city.town}, ${city.stateFull}? Castle Express Moving & Storage provides professional ${svc.serviceTitle.toLowerCase()} with experienced crews. Free estimates. Call ${COMPANY.phone}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.castleexpressmoving.com/${city.slug}/${svc.serviceSlug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.castleexpressmoving.com/${city.slug}/${svc.serviceSlug}/`,
      siteName: "Castle Express Moving & Storage",
      type: "website",
    },
  };
}

export default function ServiceSubpage({ params }) {
  const city = getCityBySlug(params.slug);
  const svc = SERVICE_SUBPAGES[params.service];
  if (!city || !svc || !SUBPAGE_TOWNS.includes(params.slug)) notFound();

  const intro = TOWN_SERVICE_INTROS[params.slug]?.[params.service] || "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Castle Express Moving & Storage",
    url: "https://www.castleexpressmoving.com",
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
      containedInPlace: { "@type": "State", name: city.stateFull },
    },
    priceRange: "$$",
    openingHours: "Mo-Su 07:00-20:00",
    sameAs: [COMPANY.facebook, COMPANY.instagram],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.castleexpressmoving.com/" },
      { "@type": "ListItem", position: 2, name: `Movers in ${city.town}, ${city.state}`, item: `https://www.castleexpressmoving.com/${city.slug}/` },
      { "@type": "ListItem", position: 3, name: `${svc.serviceTitle} in ${city.town}` },
    ],
  };

  const nearbyCities = city.nearby
    ? city.nearby.map(slug => CITY_DATA.find(c => c.slug === slug)).filter(Boolean)
    : CITY_DATA.filter(c => c.slug !== city.slug && c.state === city.state).slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="section-dark" style={{ padding: "70px 24px 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-residential.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            <Link href="/" style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
            <Link href={`/${city.slug}`} style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Movers in {city.town}, {city.state}</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "#D4A017" }}>{svc.serviceTitle}</span>
          </div>

          <h1 className="heading-1" style={{ color: "#FFFFFF", marginBottom: 16, fontSize: "clamp(28px, 4vw, 44px)" }}>
            {svc.serviceTitle} in {city.town}, {city.stateFull}
          </h1>
          <p className="body-lg text-white-muted" style={{ maxWidth: 640, marginBottom: 24 }}>
            Castle Express Moving &amp; Storage provides professional {svc.serviceTitle.toLowerCase()} in {city.town} and throughout {city.stateFull}. Family-owned since {COMPANY.founded}. {city.slug === "movers-enfield-ct" ? "Based right here in Enfield." : `Located in Enfield, CT, just ${city.drive} away.`}
          </p>
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
          { icon: <Star />, label: `${COMPANY.reviewAvg}\u2605 Google (${COMPANY.reviewCount} Reviews)` },
          { icon: <MapPin size={18} />, label: `Serving ${city.town}, ${city.state}` },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ color: "#D4A017" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          {/* Left - Content */}
          <div>
            {/* Unique intro paragraph */}
            <div className="section-label"><span>{svc.serviceTitle} in {city.town}</span></div>
            <h2 className="heading-2" style={{ marginBottom: 24 }}>
              {svc.serviceTitle} in <span className="text-gold">{city.town}</span>
            </h2>
            <p className="body-md" style={{ color: "#1A1A2E", marginBottom: 32, lineHeight: 1.8 }}>
              {intro}
            </p>

            {/* Service sections */}
            {svc.sections.map((section, si) => (
              <div key={si} style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 16 }}>
                  {section.heading}
                </h3>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <Check size={14} />
                    </div>
                    <span className="body-md" style={{ color: "#1A1A2E" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Why Choose Us */}
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 16 }}>
              Why {city.town} Residents Choose Castle Express
            </h3>
            <div style={{ marginBottom: 32 }}>
              {[
                `Family-owned and operated since ${COMPANY.founded}`,
                `Licensed & insured: USDOT# ${COMPANY.usdot}, CT Permit ${COMPANY.ctPermit}`,
                "Accurate estimates with no hidden fees",
                `${COMPANY.reviewCount} five-star Google reviews`,
                city.slug === "movers-enfield-ct" ? "Based right here in Enfield, CT" : `Serving ${city.town} from our Enfield, CT facility, just ${city.drive} away`,
                "Climate-controlled storage available",
                "Same-day quotes, typically respond in 20 minutes",
              ].map((feat, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={14} />
                  </div>
                  <span className="body-md" style={{ color: "#1A1A2E" }}>{feat}</span>
                </div>
              ))}
            </div>

            {/* Photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 32 }}>
              <div style={{ position: "relative", height: 180, borderRadius: 10, overflow: "hidden" }}><Image src="/images/truck-aframe.webp" alt={`Castle Express ${svc.serviceTitle.toLowerCase()} in ${city.town}`} fill sizes="(max-width: 768px) 50vw, 200px" style={{ objectFit: "cover" }} /></div>
              <div style={{ position: "relative", height: 180, borderRadius: 10, overflow: "hidden" }}><Image src="/images/truck-brick-building.webp" alt={`Professional ${svc.serviceTitle.toLowerCase()} near ${city.town}`} fill sizes="(max-width: 768px) 50vw, 200px" style={{ objectFit: "cover" }} /></div>
            </div>

            {/* Back to parent + nearby */}
            <Link href={`/${city.slug}`} className="btn btn-ghost" style={{ marginBottom: 24 }}>
              <ChevronRight style={{ transform: "rotate(180deg)" }} /> All Moving Services in {city.town}
            </Link>

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
          </div>

          {/* Right - Estimate Form */}
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
