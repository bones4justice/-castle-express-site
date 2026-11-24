import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CITY_DATA, getCityBySlug } from "@/lib/cityData";
import { SERVICE_SUBPAGES, TOWN_SERVICE_INTROS, SUBPAGE_TOWNS, SUBPAGE_SERVICES } from "@/lib/serviceSubpages";
import { COMPANY } from "@/content";
import { MapPin, Phone, Check, Star, Shield, ArrowRight, ChevronRight } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";
import { InteriorHero, HeroActions, EstimateBand } from "@/components/InteriorKit";
import { TOWN_HERO_PHOTOS, DEFAULT_TOWN_HERO_PHOTO } from "@/lib/interiorDesign";

// Header photo by service type (Enfield keeps its own town photo).
const SERVICE_PHOTOS = {
  "residential-movers": "/images/truck-residential.webp",
  "commercial-movers": "/images/truck-brick-building.webp",
  "packing-services": "/images/truck-loading.webp",
};

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

  const title = `${svc.serviceTitle} in ${city.town}, ${city.state} | Castle Express`;
  const description = `Professional ${svc.serviceTitle.toLowerCase()} in ${city.town}, ${city.stateFull} from Castle Express. Experienced crews, free estimates. Call ${COMPANY.phone}.`;

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
    // Hours intentionally omitted until confirmed — see HOURS_CONFIRMED in lib/structuredData.js
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
    <div className="ip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <InteriorHero
        crumbs={[{ label: "Home", href: "/" }, { label: `Movers in ${city.town}, ${city.state}`, href: `/${city.slug}/` }, { label: svc.serviceTitle }]}
        title={`${svc.serviceTitle} in ${city.town}, ${city.stateFull}`}
        image={TOWN_HERO_PHOTOS[city.slug] || SERVICE_PHOTOS[params.service] || DEFAULT_TOWN_HERO_PHOTO}
        imageAlt={`Castle Express moving truck on a job near ${city.town}, ${city.state}`}
        actions={<HeroActions scrollToForm />}
      >
        <p>
          Castle Express Moving &amp; Storage provides professional {svc.serviceTitle.toLowerCase()} in {city.town} and throughout {city.stateFull}. Family-owned since {COMPANY.founded}. {city.slug === "movers-enfield-ct" ? "Based right here in Enfield." : `Located in Enfield, CT, just ${city.drive} away.`}
        </p>
      </InteriorHero>

      {/* TRUST BAR */}
      <section className="trust-bar tb-v2">
        {[
          { icon: <Shield size={18} />, label: "A+ BBB Rating" },
          { icon: <Star />, label: `${COMPANY.reviewAvg}\u2605 Google (${COMPANY.reviewCount} Reviews)` },
          { icon: <MapPin size={18} />, label: `Serving ${city.town}, ${city.state}` },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ color: "#D4A017" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* MAIN CONTENT */}
      <section className="section ip-body">
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
                    <div className="ip-check" style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
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
                  <div className="ip-check" style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
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
            <Link href={`/${city.slug}/`} className="btn btn-ghost" style={{ marginBottom: 24 }}>
              <ChevronRight style={{ transform: "rotate(180deg)" }} /> All Moving Services in {city.town}
            </Link>

            {nearbyCities.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 14 }}>
                  Also Serving Nearby
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {nearbyCities.map(n => (
                    <Link key={n.slug} href={`/${n.slug}/`} className="location-chip">
                      <MapPin size={14} /> {n.town}, {n.state}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right - Estimate Form */}
          <div className="ip-estimate">
            <EstimateForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <EstimateBand scrollToForm title={city.cta}>
        Call us at <a href={COMPANY.phoneLink}>{COMPANY.phone}</a> or fill out the form above. We typically respond in 20 minutes or less.
      </EstimateBand>
    </div>
  );
}
