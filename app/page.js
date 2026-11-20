// Server component: only the interactive pieces (estimate form, ad offer,
// sticky bar, hero A/B tracker, scroll button) ship as client JS, so the
// big content.js data no longer has to download and run on phones.
import Link from "next/link";
import Image from "next/image";
import { COMPANY, SERVICES, ALL_CITIES, CITY_PAGES, FAQ } from "@/content";
import { Shield, Star, Award, Clock, Check, Home, Building, Box, ArrowRight, ChevronRight, Phone, MapPin } from "@/components/Icons";
import { LineTruck, LineOffice, LineBox, LineStorage } from "@/components/ServiceLineIcons";
import { IconBBB, IconGoogle, IconLicensed, IconLocation } from "@/components/BrandIcons";
import EstimateForm from "@/components/EstimateForm";
import TownsWeServe from "@/components/TownsWeServe";
import AdBoxOffer from "@/components/AdBoxOffer";
import MobileStickyCta from "@/components/MobileStickyCta";
import EstimateScrollButton from "@/components/EstimateScrollButton";
import HeroAbTracker from "@/components/HeroAbTracker";
import { HOME_DESIGN } from "@/lib/homeDesign";
import { homepageJsonLd } from "@/lib/structuredData";
import feedingAmericaData from "@/data/feeding-america.json";

const GIVING_BACK_TOTAL_MEALS = (feedingAmericaData.months || []).reduce(
  (sum, m) => sum + Math.round(((m.donated || 0) + (m.matched || 0)) * (m.mealsPerDollar || feedingAmericaData.mealsPerDollar || 10)),
  0
);

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

export default function HomePage() {

  const serviceLineIcons = [
    <LineTruck key="t" />,
    <LineOffice key="o" />,
    <LineBox key="b" />,
    <LineStorage key="s" />,
  ];

  return (
    <>
      {/* Homepage structured data: single @graph array combining LocalBusiness
          + the full MovingCompany node (see lib/structuredData.js). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd()) }}
      />
      {/* ─── HERO (Nov 2026 redesign, lib/homeDesign.js) ─── */}
      {/* Hero A/B copy (hv-a / hv-b) is unchanged: html[data-hero] is set by
          the inline script in app/layout.js <head> before first paint.
          Layout (globals.css .hero-v2): phones keep the form-first order with
          the truck photo under the form; from 769px the photo sits in its
          own box in the copy column, beside (or above) the estimate card,
          cropped by CSS to a band framed on the truck. Headline and card
          are never laid over the photo. */}
      <section className="home-hero hero-v2" aria-label="Hero" data-home-design={HOME_DESIGN}>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-label">
              <div className="hv-a"><SectionLabel>Connecticut &amp; Massachusetts</SectionLabel></div>
              <div className="hv-b"><span className="hv2-eyebrow">Connecticut &amp; Massachusetts</span></div>
            </div>
            <h1 className="hero-h1">
              <span className="hv-a">Professional Movers in <span className="text-gold">CT &amp; MA</span></span>
              <span className="hv-b">Looking for the{" "}<br /><span className="text-gold">Perfect Mover?</span></span>
            </h1>
            <p className="hero-intro">
              <span className="hv-a">Castle Express is a family-owned moving company serving Hartford County and Western Massachusetts since 2011. Accurate estimates, no hidden fees, and professional crews who treat your belongings like their own.</span>
              <span className="hv-b">Castle Express is a family-owned moving company serving Hartford County and Western Massachusetts since 2011. Accurate estimates, no hidden fees, and experienced crews who treat your belongings like their own.</span>
            </p>
            {/* Brand promise: same line for both hero variants (outside the
                A/B copy, which stays word-for-word). */}
            <p className="hv2-promise">Thoughtful service. Clear estimates. No hidden fees.</p>
            {/* Plain proof points (not links, styled as text). Only
                "5-Star Reviews" is a link. */}
            <div className="hero-badges">
              {["Licensed & Insured", "Accurate Estimates"].map(item => (
                <span key={item} className="hv2-badge">{item}</span>
              ))}
              <Link href="/reviews/" className="hv2-badge-link">
                <Star size={14} /> 5-Star Reviews
              </Link>
            </div>
            <div className="hero-ctas">
              <EstimateScrollButton className="btn btn-primary">Get Free Estimate <ArrowRight /></EstimateScrollButton>
              <a href={COMPANY.phoneLink} className="btn hv2-call"><Phone size={18} /> (888) 553-4503</a>
            </div>
            <div className="hero-reviews">
              <Link href="/reviews/" aria-label="Read our Google reviews" className="hv2-reviews">
                <span className="hv2-stars">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} />)}</span>
                <span className="hv2-reviews-text">{COMPANY.reviewAvg} from {COMPANY.reviewCount} Google reviews</span>
              </Link>
            </div>
            <div className="hero-legal">
              <span>Family-owned, since {COMPANY.founded} · USDOT {COMPANY.usdot} · CT Permit {COMPANY.ctPermit} · {COMPANY.mc}</span>
            </div>
            {/* Hero photo (real Castle Express truck, truck on the right):
                phones get the tighter shot under the form; larger screens
                the wide yard shot, cropped by CSS to a band framed on the
                truck. Plain <picture> so each screen downloads one WebP. */}
            <picture className="hv2-media">
              <source media="(max-width: 768px)" srcSet="/images/hero-real-tight-640.webp 640w, /images/hero-real-tight-956.webp 956w" sizes="calc(100vw - 32px)" width={956} height={600} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-real-wide-1346.webp"
                srcSet="/images/hero-real-wide-800.webp 800w, /images/hero-real-wide-1346.webp 1346w"
                sizes="(min-width: 1240px) calc(50vw + 180px), (min-width: 1200px) calc(100vw - 444px), (min-width: 1024px) calc(120vw - 586px), (min-width: 769px) 720px, 100vw"
                width={1346}
                height={757}
                alt="Castle Express Moving box truck parked in the driveway of a customer's home on a sunny morning"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <div className="hero-form">
            {/* Google Ads visitors only; renders nothing for everyone else.
                On phones it sits directly above the estimate form. */}
            <div className="hero-offer"><AdBoxOffer /></div>
            <div className="hv2-card">
              <EstimateForm twoStep design={HOME_DESIGN} />
            </div>
          </div>
        </div>
      </section>
      <MobileStickyCta />
      <HeroAbTracker />

      {/* ─── TRUST BAR ─── */}
      <section className="trust-bar tb-v2" aria-label="Trust indicators">
        {[
          { icon: <IconBBB size={28} />, label: "A+ BBB Rating" },
          { icon: <IconGoogle size={28} />, label: `${COMPANY.reviewAvg}★ on Google (${COMPANY.reviewCount} reviews)`, href: "/reviews/" },
          { icon: <IconLicensed size={28} />, label: `Licensed & Insured · USDOT ${COMPANY.usdot}` },
          { icon: <IconLocation size={28} />, label: `Family-Owned Since ${COMPANY.founded}` },
        ].map((item, i) => item.href ? (
          <Link key={i} href={item.href} className="trust-item" style={{ textDecoration: "none", color: "inherit" }}>
            <span style={{ display: "inline-flex", verticalAlign: "middle" }}>{item.icon}</span> {item.label}
          </Link>
        ) : (
          <div key={i} className="trust-item"><span style={{ display: "inline-flex", verticalAlign: "middle" }}>{item.icon}</span> {item.label}</div>
        ))}
      </section>

      {/* ─── SERVICES ───
          Same four services, links and wording; restyled white cards with
          yellow line icons on an ivory band (Nov 2026 redesign). */}
      <section className="section svc-v2" aria-label="Services">
        <div className="container">
          <div className="svc-v2-head">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="svc-v2-title">Full-Service Moving Solutions</h2>
            <p className="svc-v2-intro">
              From packing your first box to placing the last piece of furniture, we handle every detail of your move.
            </p>
          </div>
          <div className="svc-v2-grid">
            {SERVICES.slice(0, 4).map((svc, i) => (
              <Link key={svc.id} href={`/services/${svc.slug}/`} className="svc-v2-card">
                <span className="svc-v2-icon">{serviceLineIcons[i]}</span>
                <span className="svc-v2-body">
                  <span className="svc-v2-name">
                    <h3>{svc.title}</h3>
                    {svc.popular && <span className="svc-v2-pill">Most Popular</span>}
                  </span>
                  <p>{svc.shortDesc}</p>
                </span>
              </Link>
            ))}
          </div>
          <div className="svc-v2-more">
            <Link href="/services/" className="btn svc-v2-all">View All Services <ChevronRight /></Link>
          </div>
          <p className="svc-v2-address"><span><MapPin size={20} /> 4 Niblick Rd, Enfield CT 06082</span></p>
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
              Whether you're moving across town in Enfield or relocating from Hartford to Springfield, our moving company handles residential moves, commercial relocations, full-service packing, <Link href="/services/storage/" style={{ color: "inherit", textDecoration: "underline" }}>climate-controlled storage in Enfield, CT</Link>, and specialty items like pianos and gun safes. Every move includes a detailed walkthrough, furniture protection, and careful placement at your new home.
            </p>
            {[
              { title: "Accurate Estimates", desc: "Detailed estimates built from a full inventory of your move. No surprise charges." },
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
            <Link href="/about/" className="btn btn-ghost">Read Our Story <ArrowRight /></Link>
          </div>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div style={{ position: "relative", width: "100%", height: 200, borderRadius: 10, overflow: "hidden" }}><Image src="/images/truck-aframe.webp" alt="Castle Express truck at A-frame home" fill sizes="(max-width: 768px) 50vw, 200px" style={{ objectFit: "cover", objectPosition: "center" }} /></div>
              <div style={{ position: "relative", width: "100%", height: 200, borderRadius: 10, overflow: "hidden" }}><Image src="/images/joe-with-customers.jpg" alt="Joe with happy customers" fill sizes="(max-width: 768px) 50vw, 200px" style={{ objectFit: "cover", objectPosition: "center 20%" }} /></div>
            </div>
            <div className="hero-stats" style={{ background: "#FFF9EC", borderRadius: 12, padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            {[
              { num: "15+", label: "Years in Business" },
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
            <Link href="/reviews/" aria-label="Read all Google reviews" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12, textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {[1,2,3,4,5].map(i => <Star key={i} />)}
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "#1A1A2E" }}>
                {COMPANY.reviewAvg} from {COMPANY.reviewCount} Google Reviews
              </div>
            </Link>
            <Link href="/reviews/" className="btn btn-outline">Read All Reviews <ChevronRight /></Link>
          </div>
        </div>
      </section>

      {/* ─── TOWNS WE SERVE ─── */}
      <TownsWeServe limit={12} />

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
            <a href="/princess-packing/" style={{ display: "inline-block", background: "#F72585", color: "#fff", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", textDecoration: "none", transition: "all 0.2s" }}>
              View Packages & Book →
            </a>
          </div>
          <a href="/princess-packing/" aria-label="View Princess Packing packages" style={{ display: "block", background: "linear-gradient(160deg, #fce4ef 0%, rgba(247,37,133,0.15) 100%)", padding: 40, textAlign: "center", border: "1px solid rgba(247,37,133,0.2)", textDecoration: "none" }}>
            <div style={{ position: "relative", width: "100%", height: 280 }}><Image src="/images/princess-packing-crew.jpg" alt="Princess Packing crew in pink polos" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "top" }} /></div>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 18, color: "#0d0d0d", marginTop: 16 }}>Professional Packing. Done Right.</div>
          </a>
        </div>
      </section>

      {/* ─── INSTAGRAM (static 3-photo grid linking to IG profile) ─── */}
      <section className="section section-light" aria-label="Instagram">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Follow Us</span></div>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal", overflowWrap: "anywhere" }}>@castleexpressmovingandstorage</h2>
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

      {/* ─── EVERY MOVE FEEDS FAMILIES ─── */}
      <section style={{ padding: "60px 24px 48px", textAlign: "center", background: "#f9f9f9" }} aria-label="Every move feeds families">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ width: 48, height: 3, background: "#FBCB0B", margin: "0 auto 20px", borderRadius: 2 }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3.5vw, 28px)", color: "#1A1A2E", lineHeight: 1.2, marginBottom: 24 }}>
            Every Move Feeds Families
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 28, flexWrap: "wrap", marginBottom: 24 }}>
            <a href="https://www.feedingamerica.org/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
              <Image src="/images/feeding-america-logo.png" alt="Feeding America" width={200} height={80} style={{ objectFit: "contain" }} />
            </a>
            <a href="https://www.enfieldfoodshelf.org/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#000000", borderRadius: 12, width: 80, height: 80 }}>
              <Image src="/images/enfield-food-shelf-logo.png" alt="Enfield Food Shelf" width={58} height={59} style={{ objectFit: "contain" }} />
            </a>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
            Every time we finish a move, Castle Express Moving &amp; Storage gives $5 to help feed families. That money goes to Feeding America and to the Enfield Food Shelf right here in our hometown. Moving is about new beginnings, and we want those new beginnings to reach more people than just our customers.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#1A1A2E", fontWeight: 700, lineHeight: 1.7, marginTop: 20 }}>
            Together with our customers, we&apos;ve provided {GIVING_BACK_TOTAL_MEALS.toLocaleString("en-US")} meals so far.
          </p>
          <Link href="/giving-back/" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#1A1A2E", textDecoration: "none", borderBottom: "2px solid #FBCB0B", paddingBottom: 2 }}>
            See Our Impact <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── GIVING BACK ─── */}
      <section style={{ padding: "40px 24px 32px", textAlign: "center" }} aria-label="Giving back">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap", marginBottom: 16 }}>
            <a href="https://www.stjude.org/" target="_blank" rel="noopener noreferrer" className="grayscale-hover">
              <Image src="/images/st-jude-logo.jpg" alt="St. Jude Children's Research Hospital" width={90} height={90} style={{ borderRadius: 8, objectFit: "contain" }} />
            </a>
            <a href="https://www.enfieldfoodshelf.org/" target="_blank" rel="noopener noreferrer" className="grayscale-hover">
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
            <Link href="/contact/" className="btn btn-primary">Get Your Free Estimate</Link>
            <a href={COMPANY.phoneLink} className="btn btn-white"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
