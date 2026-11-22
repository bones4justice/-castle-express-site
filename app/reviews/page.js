import Link from "next/link";
import { COMPANY, FAQ, GOOGLE_REVIEWS, GOOGLE_PLACE_ID } from "@/content";
import { Star, Phone, ArrowRight } from "@/components/Icons";
import { InteriorHero, EstimateBand } from "@/components/InteriorKit";

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
    <div className="ip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── HERO ─── */}
      <InteriorHero compact eyebrow="Customer Reviews" title="Castle Express Moving Reviews">
        <div className="ip-rating">
          <span className="ip-stars">{[1,2,3,4,5].map(i => <Star key={i} />)}</span>
          <span className="ip-rating-num">{COMPANY.reviewAvg}</span>
          <span>from {COMPANY.reviewCount} Google Reviews</span>
        </div>
        <p>
          Real, verified reviews from Castle Express Moving &amp; Storage customers across Hartford County, CT and Western Massachusetts. Family-owned and operated since {COMPANY.founded}.
        </p>
      </InteriorHero>

      {/* ─── GOOGLE REVIEWS ─── */}
      <section className="section section-light" aria-label="Google reviews">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>What Our Customers Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 32 }}>
            {GOOGLE_REVIEWS.map((r, i) => (
              <article key={i} className="ip-card ip-review" style={{ display: "flex", flexDirection: "column" }}>
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
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="ip-btn ip-btn-primary">
              Read All {COMPANY.reviewCount} Reviews on Google <ArrowRight />
            </a>
            <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="ip-btn ip-btn-outline">
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
          <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="ip-btn ip-btn-primary">
            Follow on Instagram <ArrowRight />
          </a>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <EstimateBand eyebrow="Ready to Move?" title="Get Your Free Estimate" buttonLabel={<>Get Free Estimate <ArrowRight /></>}>
        Join {COMPANY.reviewCount} satisfied Castle Express customers. We typically respond within 20 minutes.
      </EstimateBand>
    </div>
  );
}
