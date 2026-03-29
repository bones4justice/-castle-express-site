import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, SERVICE_PAGES } from "@/content";
import { Check, Phone, Star, Shield, ArrowRight, ChevronRight, MapPin } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const svc = SERVICE_PAGES[params.slug];
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDesc,
    alternates: { canonical: `/services/${params.slug}/` },
    openGraph: {
      title: `${svc.metaTitle} | Castle Express Moving & Storage`,
      description: svc.metaDesc,
      url: `/services/${params.slug}/`,
      images: svc.heroImage ? [{ url: svc.heroImage, alt: svc.title }] : undefined,
    },
  };
}

export default function ServiceDetailPage({ params }) {
  const svc = SERVICE_PAGES[params.slug];
  if (!svc) notFound();

  const related = (svc.relatedServices || []).map(slug => {
    const r = SERVICE_PAGES[slug];
    return r ? { slug, title: r.title } : null;
  }).filter(Boolean);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://castleexpressmoving.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://castleexpressmoving.com/services/" },
      { "@type": "ListItem", "position": 3, "name": svc.title },
    ]
  };

  const faqSchema = svc.faq && svc.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": svc.faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {/* ─── HERO ─── */}
      <section className="section-dark" style={{ padding: "70px 24px 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${svc.heroImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <Link href="/services" style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Services</Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "#D4A017" }}>{svc.title}</span>
          </div>
          <h1 className="heading-1" style={{ color: "#fff", marginBottom: 16, fontSize: "clamp(28px, 4vw, 44px)" }}>
            {svc.headline}
          </h1>
          <p className="body-lg text-white-muted" style={{ maxWidth: 640, marginBottom: 24 }}>
            {svc.intro}
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
          { icon: <MapPin size={18} />, label: "Hartford County CT & Western MA" },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ color: "#D4A017" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            {/* Content Sections */}
            {svc.sections.map((section, i) => (
              <div key={i} style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                  {section.heading}
                </h2>
                {section.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <Check />
                    </div>
                    <span className="body-md" style={{ color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Callout Box */}
            <div style={{ background: "#FFF9EC", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, padding: "24px 28px", marginBottom: 36 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#1A1A2E", lineHeight: 1.7, marginBottom: svc.calloutLink ? 16 : 0 }}>
                {svc.callout}
              </p>
              {svc.calloutLink && (
                <a href={svc.calloutLink} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#F72585", textDecoration: "none" }}>
                  {svc.calloutLabel || "Learn More"} →
                </a>
              )}
            </div>

            {/* Photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 36 }}>
              <img src={svc.photo1} alt={svc.title} style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center", borderRadius: 10 }} />
              <img src={svc.photo2} alt={`${svc.title} team`} style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: svc.photo2.includes("joe-with") ? "center 40%" : svc.photo2.includes("crew-commercial") ? "top" : "center", borderRadius: 10 }} />
            </div>

            {/* FAQ */}
            {svc.faq && svc.faq.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                  Frequently Asked Questions
                </h2>
                {svc.faq.map((item, i) => (
                  <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 6 }}>{item.q}</h3>
                    <p className="body-sm text-gray">{item.a}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Related Services */}
            {related.length > 0 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 12 }}>Related Services</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {related.map(r => (
                    <Link key={r.slug} href={`/services/${r.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 8, textDecoration: "none", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "#1A1A2E", transition: "border-color 0.2s" }}>
                      <span style={{ color: "#D4A017" }}>→</span> {r.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right  -  Estimate Form */}
          <div style={{ position: "sticky", top: 96 }}>
            <EstimateForm />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section section-dark text-center">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="heading-2 text-white">Ready to Get Started?</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 28 }}>
            Call today for a free, no-obligation estimate. We'll walk you through every step.
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
