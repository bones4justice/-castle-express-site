import Link from "next/link";
import { COMPANY, FAQ, GOOGLE_REVIEWS, GOOGLE_PLACE_ID } from "@/content";
import { Star, Phone, ArrowRight } from "@/components/Icons";

const SITE_URL = "https://www.castleexpressmoving.com";
const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;
const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

export const metadata = {
  title: "Reviews | Castle Express Moving & Storage",
  description: "Read 220+ verified Google reviews from Castle Express Moving customers across Hartford County CT and Western Massachusetts. 4.9 average rating since 2011.",
  alternates: { canonical: "/reviews/" },
  openGraph: {
    title: "Castle Express Moving Reviews | 220+ Five-Star Customers",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

      {/* ─── GOOGLE REVIEWS ─── */}
      <section className="section section-light" aria-label="Google reviews">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>What Our Customers Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 32 }}>
            {GOOGLE_REVIEWS.map((r, i) => (
              <article key={i} style={{ background: "#fff", borderRadius: 12, padding: "28px 24px", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: r.rating }).map((_, s) => <Star key={s} size={16} />)}
                </div>
                <p className="body-sm text-gray" style={{ flexGrow: 1, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#1A1A2E" }}>{r.author}</div>
                  <div className="body-sm text-gray" style={{ fontSize: 13 }}>{r.date} &middot; Posted on Google</div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Read All {COMPANY.reviewCount} Reviews on Google <ArrowRight />
            </a>
            <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn btn-white">
              Write a Review
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" aria-label="Frequently asked questions">
        <div className="container-sm">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Common Questions</span></div>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>Frequently Asked Questions</h2>
          </div>
          {FAQ.map((item, i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 6 }}>{item.q}</h3>
              <p className="body-sm text-gray">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INSTAGRAM ─── */}
      <section className="section section-light text-center" aria-label="Instagram">
        <div className="container-sm">
          <div className="section-label" style={{ justifyContent: "center" }}><span>Follow Us</span></div>
          <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, marginBottom: 16 }}>@castleexpressmovingandstorage</h2>
          <p className="body-md text-gray" style={{ maxWidth: 520, margin: "0 auto 24px" }}>
            Follow our crews on Instagram for moving-day photos, packing tips, and a behind-the-scenes look at Castle Express.
          </p>
          <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Follow on Instagram <ArrowRight />
          </a>
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
            <Link href="/contact/" className="btn btn-primary">Get Free Estimate <ArrowRight /></Link>
            <a href={COMPANY.phoneLink} className="btn btn-white"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
