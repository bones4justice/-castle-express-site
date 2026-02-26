import Link from "next/link";
import { COMPANY, SERVICES, REVIEWS, ALL_CITIES, CITY_PAGES, FAQ } from "@/content";
import { Shield, Star, Award, Clock, Check, Home, Building, Box, ArrowRight, ChevronRight, MapPin, Phone } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

export default function HomePage() {
  const serviceIcons = [<Home key="h" />, <Building key="b" />, <Box key="bx" />, <Shield key="s" />];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="section-dark" aria-label="Hero" style={{ padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-residential.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "linear-gradient(135deg, transparent 40%, rgba(212,160,23,0.07) 100%)", pointerEvents: "none" }} />
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <SectionLabel>Connecticut & Massachusetts</SectionLabel>
            <h1 className="heading-1" style={{ color: "#fff", marginBottom: 20 }}>
              Professional Movers in <span className="text-gold">CT & MA</span>
            </h1>
            <p className="body-lg text-white-muted" style={{ marginBottom: 28, maxWidth: 520 }}>
              Castle Express is a family-owned moving company serving Hartford County and Western Massachusetts since 2008. Flat-rate pricing, no hidden fees, and professional crews who treat your belongings like their own.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              {["Licensed & Insured", "Flat-Rate Pricing", `${COMPANY.reviewCount} 5-Star Reviews`].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Check />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">Get Free Estimate <ArrowRight /></Link>
              <a href={COMPANY.phoneLink} className="btn btn-outline-light"><Phone size={18} /> Call Now</a>
            </div>
          </div>
          <div>
            <EstimateForm dark />
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="trust-bar" aria-label="Trust indicators">
        {[
          { icon: <Shield size={18} />, label: "A+ BBB Rating" },
          { icon: <Star />, label: `${COMPANY.reviewAvg}★ Google (${COMPANY.reviewCount} Reviews)` },
          { icon: <Award size={18} />, label: "Licensed & Insured" },
          { icon: <Clock size={18} />, label: `Serving CT & MA Since ${COMPANY.founded}` },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ color: "#D4A017" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section section-light" aria-label="Services">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="heading-2">Full-Service Moving Solutions</h2>
            <p className="body-md text-gray" style={{ maxWidth: 560, margin: "0 auto" }}>
              From packing your first box to placing the last piece of furniture, we handle every detail of your move.
            </p>
          </div>
          <div className="grid-auto">
            {SERVICES.slice(0, 4).map((svc, i) => (
              <Link key={svc.id} href="/services" className="card" style={{ textDecoration: "none", position: "relative", cursor: "pointer" }}>
                {svc.popular && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: "#FFF9EC", color: "#D4A017", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 11, padding: "4px 10px", borderRadius: 20 }}>Most Popular</div>
                )}
                <div className="icon-badge" style={{ marginBottom: 16 }}>{serviceIcons[i]}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 8 }}>{svc.title}</h3>
                <p className="body-sm text-gray">{svc.shortDesc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 32 }}>
            <Link href="/services" className="btn btn-outline">View All Services <ChevronRight /></Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CASTLE ─── */}
      <section className="section" aria-label="Why Castle Express">
        <div className="container grid-2">
          <div>
            <SectionLabel>Why Castle Express</SectionLabel>
            <h2 className="heading-2">Built on Values, Not Just Trucks</h2>
            <p className="body-md text-gray" style={{ marginBottom: 16 }}>
              Joe Caronna started Castle Express in {COMPANY.founded} with one truck and a commitment to treat every customer like family. Today we operate a fleet of {COMPANY.truckCount} trucks from our {COMPANY.facilitySize} sq ft facility in {COMPANY.city}, {COMPANY.state}—but the values haven't changed.
            </p>
            <p className="body-md text-gray" style={{ marginBottom: 28 }}>
              Whether you're moving across town in Enfield or relocating from Hartford to Springfield, our moving company handles residential moves, commercial relocations, full-service packing, climate-controlled storage, and specialty items like pianos and gun safes. Every move includes a detailed walkthrough, furniture protection, and careful placement at your new home.
            </p>
            {[
              { title: "Flat-Rate Pricing", desc: "No surprise charges. Your estimate is your price." },
              { title: "Family-Owned & Operated", desc: "Not a franchise. Real people who care about your move." },
              { title: "Professional, Vetted Crews", desc: "Respectful movers who handle your belongings like their own." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FFF9EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Check />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E" }}>{item.title}</div>
                  <div className="body-sm text-gray">{item.desc}</div>
                </div>
              </div>
            ))}
            <Link href="/about" className="btn btn-ghost">Read Our Story <ArrowRight /></Link>
          </div>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <img src="/images/truck-aframe.jpg" alt="Castle Express truck at A-frame home" style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center", borderRadius: 10 }} />
              <img src="/images/joe-with-customers.jpg" alt="Joe with happy customers" style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center 20%", borderRadius: 10 }} />
            </div>
            <div className="hero-stats" style={{ background: "#FFF9EC", borderRadius: 12, padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            {[
              { num: "17+", label: "Years in Business" },
              { num: `${COMPANY.reviewCount}`, label: "5-Star Reviews" },
              { num: COMPANY.truckCount, label: "Trucks in Fleet" },
              { num: `${COMPANY.facilitySize}`, label: "Sq Ft Facility" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "14px 8px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 22, color: "#D4A017" }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="section section-light" aria-label="Customer reviews">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <SectionLabel>Customer Reviews</SectionLabel>
            <h2 className="heading-2">Don't Take Our Word For It</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
              {[1,2,3,4,5].map(i => <Star key={i} />)}
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginLeft: 4 }}>{COMPANY.reviewAvg}</span>
              <span className="body-sm text-gray">({COMPANY.reviewCount} reviews on Google)</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>{[1,2,3,4,5].map(j => <Star key={j} />)}</div>
                <p className="body-sm" style={{ color: "#1A1A2E", lineHeight: 1.7, marginBottom: 16 }}>"{r.text}"</p>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017" }}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE GOOGLE REVIEWS ─── */}
      <section className="section" style={{ paddingTop: 0 }} aria-label="Google reviews">
        <div className="container">
          <div className="elfsight-app-b017ae90-a962-4044-8d86-0fef65fff1db" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* ─── AREAS ─── */}
      <section className="section" aria-label="Service areas">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <SectionLabel>Coverage Area</SectionLabel>
            <h2 className="heading-2">Proudly Serving CT & Western MA</h2>
            <p className="body-md text-gray" style={{ maxWidth: 600, margin: "12px auto 0" }}>
              Our moving company provides local and long-distance service throughout Hartford County, the Connecticut River Valley, and Western Massachusetts. From Suffield to Glastonbury, Manchester to West Hartford—we know every neighborhood.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {Object.entries(CITY_PAGES).map(([slug, city]) => (
              <Link key={slug} href={`/service-areas/${slug}`} className="location-chip">
                <MapPin size={16} /> {city.name}, {city.state}
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 32 }}>
            <Link href="/service-areas" className="btn btn-outline">View All Service Areas <ChevronRight /></Link>
          </div>
        </div>
      </section>

      {/* ─── PHOTO STRIP ─── */}
      <section style={{ padding: "0", overflow: "hidden" }} aria-label="Photo gallery">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0 }}>
          {[
            { src: "/images/truck-residential.jpg", pos: "center", alt: "Castle Express truck at residential home" },
            { src: "/images/truck-tobacco-barn.jpg", pos: "center", alt: "Castle Express truck at Connecticut tobacco barn" },
            { src: "/images/truck-loading.jpg", pos: "center", alt: "Castle Express truck being loaded with furniture" },
            { src: "/images/truck-brick-building.jpg", pos: "center", alt: "Castle Express at commercial building move" },
            { src: "/images/crew-commercial.jpg", pos: "top", alt: "Castle Express crew performing commercial move" },
            { src: "/images/truck-aframe.jpg", pos: "center", alt: "Castle Express moving truck at A-frame house" },
          ].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} style={{ width: "100%", height: 160, objectFit: "cover", objectPosition: img.pos }} />
          ))}
        </div>
      </section>

      {/* ─── PRINCESS PACKING CALLOUT ─── */}
      <section style={{ padding: "60px 24px", background: "#0d0d0d" }} aria-label="Princess Packing service">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F72585", marginBottom: 12 }}>NEW SERVICE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              Princess Packing<span style={{ color: "#F72585" }}>™</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
              A boutique, white-glove packing service. Your home packed before move day by a trained professional team. All materials included. Limited to one major pack per day.
            </p>
            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
              {[{ num: "$595", label: "Pro (25 boxes)" }, { num: "$995", label: "Plus (50 boxes)" }, { num: "$1,895", label: "Premium (100 boxes)" }].map((p, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 22, color: "#F72585" }}>{p.num}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.label}</div>
                </div>
              ))}
            </div>
            <a href="/princess-packing.html" style={{ display: "inline-block", background: "#F72585", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", textDecoration: "none", transition: "all 0.2s" }}>
              View Packages & Book →
            </a>
          </div>
          <div style={{ background: "linear-gradient(160deg, #fce4ef 0%, rgba(247,37,133,0.15) 100%)", padding: 40, textAlign: "center", border: "1px solid rgba(247,37,133,0.2)" }}>
            <img src="/images/princess-packing-crew.jpg" alt="Princess Packing crew in pink polos" style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "top" }} />
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 18, color: "#0d0d0d", marginTop: 16 }}>Professional Packing. Done Right.</div>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM FEED ─── */}
      <section className="section section-light" aria-label="Instagram feed">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Follow Us</span></div>
            <h2 className="heading-2">@castleexpressmovingandstorage</h2>
          </div>
          <div className="elfsight-app-e6b831df-56db-467d-bc64-e8cbdf442d90" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* ─── FAQ — Schema + Crawlable HTML + Elfsight Visual ─── */}
      <section className="section" aria-label="Frequently asked questions">
        <div className="container-sm">
          {/* FAQ Schema for Google & AI */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": FAQ.map(item => ({
                  "@type": "Question",
                  "name": item.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a,
                  },
                })),
              }),
            }}
          />

          <div className="text-center" style={{ marginBottom: 40 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Common Questions</span></div>
            <h2 className="heading-2">Frequently Asked Questions</h2>
          </div>

          {/* Elfsight visual widget */}
          <div className="elfsight-app-f4e21ae8-4f51-4e3e-ad56-8f2f0dba67e9" data-elfsight-app-lazy></div>

          {/* Crawlable HTML fallback — visible to AI/LLMs even if Elfsight doesn't load */}
          <div style={{ marginTop: 32 }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 8 }}>{item.q}</p>
                <p className="body-sm text-gray" style={{ lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section section-dark text-center" aria-label="Get a free estimate">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <SectionLabel>Ready to Move?</SectionLabel>
          <h2 className="heading-2 text-white">Let's Get You Where You're Going</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 32 }}>
            Call today for a free, no-obligation estimate. We'll walk you through every step of your move.
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
