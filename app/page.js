"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY, SERVICES, ALL_CITIES, CITY_PAGES, FAQ } from "@/content";
import { CITY_DATA } from "@/lib/cityData";
import { Shield, Star, Award, Clock, Check, Home, Building, Box, ArrowRight, ChevronRight, MapPin, Phone } from "@/components/Icons";
import { IconResidential, IconCommercial, IconPacking, IconStorage, IconBBB, IconGoogle, IconLicensed, IconLocation } from "@/components/BrandIcons";
import EstimateForm from "@/components/EstimateForm";
import { getHeroVariant, trackHeroVariant } from "@/lib/abtest";

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

export default function HomePage() {
  const [heroVariant, setHeroVariant] = useState("A");

  useEffect(() => {
    const variant = getHeroVariant();
    setHeroVariant(variant);
    trackHeroVariant(variant);
  }, []);

  const serviceIcons = [
    <IconResidential key="h" size={96} />,
    <IconCommercial key="b" size={96} />,
    <IconPacking key="bx" size={96} />,
    <IconStorage key="s" size={96} />,
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="section-dark" aria-label="Hero" style={{ padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }}>
          <Image src={heroVariant === "B" ? "/images/hero-white-truck.webp" : "/images/truck-residential.webp"} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "linear-gradient(135deg, transparent 40%, rgba(212,160,23,0.07) 100%)", pointerEvents: "none" }} />
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            {heroVariant === "A" ? (
              <SectionLabel>Connecticut &amp; Massachusetts</SectionLabel>
            ) : (
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "#D4A017" }}>Connecticut &amp; Massachusetts</span>
              </div>
            )}
            <h1 className="heading-1" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal", color: "#fff", marginBottom: 20 }}>
              {heroVariant === "B" ? (
                <>Looking for the<br /><span className="text-gold">Perfect Mover?</span></>
              ) : (
                <>Professional Movers in <span className="text-gold">CT &amp; MA</span></>
              )}
            </h1>
            <p className="body-lg text-white-muted" style={{ marginBottom: 28, maxWidth: 520 }}>
              {heroVariant === "B"
                ? "Castle Express is a family-owned moving company serving Hartford County and Western Massachusetts since 2013. Accurate estimates, no hidden fees, and experienced crews who treat your belongings like their own."
                : "Castle Express is a family-owned moving company serving Hartford County and Western Massachusetts since 2013. Accurate estimates, no hidden fees, and professional crews who treat your belongings like their own."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              {["Licensed & Insured", "Accurate Estimates", "5-Star Reviews"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Check />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{item}</span>
                </div>
              ))}
            </div>
            {heroVariant === "A" && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-primary">Get Free Estimate <ArrowRight /></Link>
                <a href={COMPANY.phoneLink} className="btn btn-outline-light"><Phone size={18} /> Call Now</a>
              </div>
            )}
          </div>
          <div>
            <EstimateForm dark />
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="trust-bar" aria-label="Trust indicators">
        {[
          { icon: <IconBBB size={28} />, label: "A+ BBB Rating" },
          { icon: <IconGoogle size={28} />, label: `${COMPANY.reviewAvg}★ on Google` },
          { icon: <IconLicensed size={28} />, label: "Licensed & Insured" },
          { icon: <IconLocation size={28} />, label: `Serving CT & MA Since ${COMPANY.founded}` },
        ].map((item, i) => (
          <div key={i} className="trust-item"><span style={{ display: "inline-flex", verticalAlign: "middle" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section section-light" aria-label="Services">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal" }}>Full-Service Moving Solutions</h2>
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
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal" }}>Built on Values, Not Just Trucks</h2>
            <p className="body-md text-gray" style={{ marginBottom: 16 }}>
              Joe Caronna started Castle Express in {COMPANY.founded} with one truck and a commitment to treat every customer like family. Today we operate a fleet of {COMPANY.truckCount} trucks from our {COMPANY.facilitySize} sq ft facility in {COMPANY.city}, {COMPANY.state} - but the values haven't changed.
            </p>
            <p className="body-md text-gray" style={{ marginBottom: 28 }}>
              Whether you're moving across town in Enfield or relocating from Hartford to Springfield, our moving company handles residential moves, commercial relocations, full-service packing, climate-controlled storage, and specialty items like pianos and gun safes. Every move includes a detailed walkthrough, furniture protection, and careful placement at your new home.
            </p>
            {[
              { title: "Accurate Estimates", desc: "No surprise charges. Your estimate is your price." },
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
              <div style={{ position: "relative", width: "100%", height: 200, borderRadius: 10, overflow: "hidden" }}><Image src="/images/truck-aframe.webp" alt="Castle Express truck at A-frame home" fill sizes="(max-width: 768px) 50vw, 200px" style={{ objectFit: "cover", objectPosition: "center" }} /></div>
              <div style={{ position: "relative", width: "100%", height: 200, borderRadius: 10, overflow: "hidden" }}><Image src="/images/joe-with-customers.jpg" alt="Joe with happy customers" fill sizes="(max-width: 768px) 50vw, 200px" style={{ objectFit: "cover", objectPosition: "center 20%" }} /></div>
            </div>
            <div className="hero-stats" style={{ background: "#FFF9EC", borderRadius: 12, padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            {[
              { num: "17+", label: "Years in Business" },
              { num: "4.9★", label: "Google Reviews" },
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

      {/* ─── REVIEWS TRUST STRIP ─── */}
      <section className="section section-light" aria-label="Customer reviews summary">
        <div className="container text-center">
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {[1,2,3,4,5].map(i => <Star key={i} />)}
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "#1A1A2E" }}>
              {COMPANY.reviewAvg} from {COMPANY.reviewCount} Google Reviews
            </div>
            <Link href="/reviews" className="btn btn-outline">Read All Reviews <ChevronRight /></Link>
          </div>
        </div>
      </section>

      {/* ─── AREAS ─── */}
      <section className="section" aria-label="Service areas">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <SectionLabel>Coverage Area</SectionLabel>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal" }}>Proudly Serving CT & Western MA</h2>
            <p className="body-md text-gray" style={{ maxWidth: 600, margin: "12px auto 0" }}>
              Our moving company provides local and long-distance service throughout Hartford County, the Connecticut River Valley, and Western Massachusetts. From Suffield to Glastonbury, Manchester to West Hartford - we know every neighborhood.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {CITY_DATA.filter(c => c.tier === "Tier 1 - Priority").map(city => (
              <Link key={city.slug} href={`/${city.slug}`} className="location-chip">
                <MapPin size={16} /> {city.town}, {city.state}
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
            { src: "/images/truck-residential.webp", pos: "center", alt: "Castle Express truck at residential home" },
            { src: "/images/truck-tobacco-barn.jpg", pos: "center", alt: "Castle Express truck at Connecticut tobacco barn" },
            { src: "/images/truck-loading.webp", pos: "center", alt: "Castle Express truck being loaded with furniture" },
            { src: "/images/truck-brick-building.webp", pos: "center", alt: "Castle Express at commercial building move" },
            { src: "/images/crew-commercial.webp", pos: "top", alt: "Castle Express crew performing commercial move" },
            { src: "/images/truck-aframe.webp", pos: "center", alt: "Castle Express moving truck at A-frame house" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", width: "100%", height: 160 }}><Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 16vw" style={{ objectFit: "cover", objectPosition: img.pos }} /></div>
          ))}
        </div>
      </section>

      {/* ─── PRINCESS PACKING CALLOUT ─── */}
      <section style={{ padding: "60px 24px", background: "#0d0d0d" }} aria-label="Princess Packing service">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F72585", marginBottom: 12 }}>NEW SERVICE</div>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              Princess Packing<span style={{ color: "#F72585" }}>™</span>
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
              A boutique, white-glove packing service. Your home packed before move day by an experienced professional team. All labor, materials, and supplies included. Limited to one major pack per day.
            </p>
            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
              {[{ num: "$595", label: "Pro (25 boxes)" }, { num: "$995", label: "Plus (50 boxes)" }, { num: "$1,895", label: "Premium (100 boxes)" }].map((p, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 22, color: "#F72585" }}>{p.num}</div>
                  <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.label}</div>
                </div>
              ))}
            </div>
            <a href="/princess-packing.html" style={{ display: "inline-block", background: "#F72585", color: "#fff", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", textDecoration: "none", transition: "all 0.2s" }}>
              View Packages & Book →
            </a>
          </div>
          <div style={{ background: "linear-gradient(160deg, #fce4ef 0%, rgba(247,37,133,0.15) 100%)", padding: 40, textAlign: "center", border: "1px solid rgba(247,37,133,0.2)" }}>
            <div style={{ position: "relative", width: "100%", height: 280 }}><Image src="/images/princess-packing-crew.jpg" alt="Princess Packing crew in pink polos" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "top" }} /></div>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 18, color: "#0d0d0d", marginTop: 16 }}>Professional Packing. Done Right.</div>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM (static 3-photo grid linking to IG profile) ─── */}
      <section className="section section-light" aria-label="Instagram">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Follow Us</span></div>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal" }}>@castleexpressmovingandstorage</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { src: "/images/princess-packing-crew.jpg", alt: "Princess Packing crew in pink polos", pos: "top" },
              { src: "/images/joe-with-customers.jpg", alt: "Joe Caronna with happy Castle Express customers", pos: "center 20%" },
              { src: "/images/crew-commercial.webp", alt: "Castle Express crew performing a commercial move", pos: "top" },
            ].map((img, i) => (
              <a key={i} href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="View on Instagram" style={{ position: "relative", width: "100%", height: 320, borderRadius: 10, overflow: "hidden", display: "block" }}>
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: img.pos }} />
              </a>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 24 }}>
            <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">View on Instagram <ArrowRight /></a>
          </div>
        </div>
      </section>

      {/* ─── FAQ (native HTML + FAQPage schema) ─── */}
      <section className="section" aria-label="Frequently asked questions">
        <div className="container-sm">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": FAQ.map(item => ({
                  "@type": "Question",
                  "name": item.q,
                  "acceptedAnswer": { "@type": "Answer", "text": item.a },
                })),
              }),
            }}
          />
          <div className="text-center" style={{ marginBottom: 40 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Common Questions</span></div>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal" }}>Frequently Asked Questions</h2>
          </div>
          <div>
            {FAQ.map((item, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 8 }}>{item.q}</p>
                <p className="body-sm text-gray" style={{ lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVERY MOVE FEEDS 50 MEALS ─── */}
      <section style={{ padding: "60px 24px 48px", textAlign: "center", background: "#f9f9f9" }} aria-label="Every move feeds 50 meals">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ width: 48, height: 3, background: "#FBCB0B", margin: "0 auto 20px", borderRadius: 2 }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3.5vw, 28px)", color: "#1A1A2E", lineHeight: 1.2, marginBottom: 24 }}>
            Every Move Feeds 50 Meals
          </h2>
          <a href="https://www.feedingamerica.org/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginBottom: 24 }}>
            <Image src="/images/feeding-america-logo.png" alt="Feeding America" width={200} height={80} style={{ objectFit: "contain" }} />
          </a>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
            For every move we complete, Castle Express Moving &amp; Storage donates 50 meals to families in need through Feeding America. Moving is about new beginnings. We believe those beginnings should reach beyond just our customers.
          </p>
        </div>
      </section>

      {/* ─── GIVING BACK ─── */}
      <section style={{ padding: "40px 24px 32px", textAlign: "center" }} aria-label="Giving back">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap", marginBottom: 16 }}>
            <a href="https://www.stjude.org/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", filter: "grayscale(100%)", transition: "filter 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.filter = "grayscale(0%)"} onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%)"}>
              <Image src="/images/st-jude-logo.jpg" alt="St. Jude Children's Research Hospital" width={90} height={90} style={{ borderRadius: 8, objectFit: "contain" }} />
            </a>
            <a href="https://www.enfieldfoodshelf.org/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", filter: "grayscale(100%)", transition: "filter 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.filter = "grayscale(0%)"} onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%)"}>
              <Image src="/images/enfield-food-shelf-logo.png" alt="Enfield Food Shelf" width={90} height={90} style={{ objectFit: "contain" }} />
            </a>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#969a9d", lineHeight: 1.6 }}>
            Proud to support St. Jude Children's Research Hospital and the Enfield Food Shelf.
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section section-dark text-center" aria-label="Get a free estimate">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <SectionLabel>Ready to Move?</SectionLabel>
          <h2 className="heading-2 text-white" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal" }}>Let's Get You Where You're Going</h2>
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
