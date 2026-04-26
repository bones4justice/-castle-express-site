import Link from "next/link";
import { COMPANY } from "@/content";
import { Star, Phone, ArrowRight } from "@/components/Icons";

const SITE_URL = "https://www.castleexpressmoving.com";

export const metadata = {
  title: "Reviews | Castle Express Moving & Storage — 200+ Five-Star Customers",
  description: "Read 200+ verified Google reviews from Castle Express Moving customers across Hartford County CT and Western Massachusetts. 4.9 average rating since 2013.",
  alternates: { canonical: "/reviews/" },
  openGraph: {
    title: "Castle Express Moving Reviews — 200+ Five-Star Customers",
    description: "Read verified reviews from real Castle Express Moving customers across CT and Western MA.",
    url: "/reviews/",
  },
};

export default function ReviewsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/" },
      { "@type": "ListItem", "position": 2, "name": "Reviews", "item": SITE_URL + "/reviews/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── HERO ─── */}
      <section className="section-dark" style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center" }}><span>Customer Reviews</span></div>
        <h1 className="heading-1 text-white" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, marginBottom: 16 }}>
          Castle Express Moving Reviews
        </h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 16 }}>
          {[1,2,3,4,5].map(i => <Star key={i} />)}
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "#fff", marginLeft: 6 }}>{COMPANY.reviewAvg}</span>
          <span className="body-md text-white-muted">from {COMPANY.reviewCount} Google Reviews</span>
        </div>
        <p className="body-lg text-white-muted" style={{ maxWidth: 640, margin: "0 auto" }}>
          Real, verified reviews from Castle Express Moving &amp; Storage customers across Hartford County, CT and Western Massachusetts. Family-owned and operated since {COMPANY.founded}.
        </p>
      </section>

      {/* ─── GOOGLE REVIEWS WIDGET ─── */}
      <section className="section section-light" aria-label="Google reviews">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>What Our Customers Say</h2>
          </div>
          <div className="elfsight-app-b017ae90-a962-4044-8d86-0fef65fff1db" data-elfsight-app-lazy style={{ minHeight: 600 }}></div>
        </div>
      </section>

      {/* ─── FAQ WIDGET ─── */}
      <section className="section" aria-label="Frequently asked questions">
        <div className="container-sm">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Common Questions</span></div>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>Frequently Asked Questions</h2>
          </div>
          <div className="elfsight-app-f4e21ae8-4f51-4e3e-ad56-8f2f0dba67e9" data-elfsight-app-lazy style={{ minHeight: 500 }}></div>
        </div>
      </section>

      {/* ─── INSTAGRAM WIDGET ─── */}
      <section className="section section-light" aria-label="Instagram feed">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Follow Us</span></div>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>@castleexpressmovingandstorage</h2>
          </div>
          <div className="elfsight-app-e6b831df-56db-467d-bc64-e8cbdf442d90" data-elfsight-app-lazy style={{ minHeight: 500 }}></div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section section-dark text-center" aria-label="Get a free estimate">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="section-label" style={{ justifyContent: "center" }}><span>Ready to Move?</span></div>
          <h2 className="heading-2 text-white" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>Get Your Free Estimate</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 32 }}>
            Join {COMPANY.reviewCount} satisfied Castle Express customers. We typically respond within 20 minutes.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Get Free Estimate <ArrowRight /></Link>
            <a href={COMPANY.phoneLink} className="btn btn-white"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
