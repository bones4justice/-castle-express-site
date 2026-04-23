import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/content";
import { Check, Phone, Star, Shield, ArrowRight, ChevronRight } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

export const metadata = {
  title: "Long Distance Movers in CT | Castle Express Moving & Storage",
  description: "Licensed long-distance movers from Connecticut to Florida, the Carolinas, and across the Northeast. Dedicated truck, your schedule. Call (888) 553-4503.",
  alternates: { canonical: "/services/long-distance-moving/" },
  openGraph: {
    title: "Long Distance Movers in CT | Castle Express Moving & Storage",
    description: "Licensed long-distance movers from Connecticut. Dedicated truck, your schedule, direct delivery.",
    url: "/services/long-distance-moving/",
    images: [{ url: "/images/hero-white-truck.jpg", alt: "Castle Express long-distance moving truck" }],
  },
};

const FAQS = [
  {
    q: "Do you share trucks with other customers' belongings?",
    a: "No. Every long-distance move gets its own dedicated truck. Your belongings are the only things on that truck from loading to delivery. We do not consolidate shipments or mix households.",
  },
  {
    q: "How long does delivery usually take?",
    a: "Delivery timing depends on distance. New England destinations like New Hampshire, Vermont, and Maine are typically next day. The Carolinas a couple days. Florida a few days. We give you a firm delivery date before we load the truck. No 7 to 14 day window like the national van lines.",
  },
  {
    q: "Do you handle packing or do I need to pack myself?",
    a: "We offer full packing services for every long-distance move. Our crew comes to your home, brings all materials, and packs everything professionally. This is especially recommended for long-distance moves because items are in transit longer and need proper protection. You can also pack yourself and we handle loading, transport, and unloading.",
  },
  {
    q: "Are you licensed for interstate moves?",
    a: "Yes. Castle Express Moving & Storage is a licensed interstate carrier. USDOT 2307446, MC-990616, CT Permit C-1768. You can verify our license status anytime on the FMCSA website at safer.fmcsa.dot.gov.",
  },
  {
    q: "What if my moving dates change or get delayed?",
    a: "It happens all the time, especially with real estate closings. If your dates shift, call us as soon as you know. We will work with you to reschedule. We understand that long-distance moves involve a lot of moving parts and we build flexibility into our scheduling for exactly this reason.",
  },
  {
    q: "Do you offer storage between pickup and delivery?",
    a: "Yes. We have a climate-controlled storage facility in Enfield, CT. If there is a gap between your move-out and move-in dates, we can store your belongings securely and deliver when your new home is ready. This is common with long-distance moves where closing dates do not align.",
  },
  {
    q: "How far in advance should I book a long-distance move?",
    a: "We recommend booking 4 to 8 weeks in advance, especially during peak season (May through September). Long-distance moves require more coordination than local moves, including route planning, crew scheduling, and truck availability. The earlier you book, the more flexibility we have with your preferred dates.",
  },
  {
    q: "What happens if something is damaged during the move?",
    a: "Every move includes standard cargo protection as required by federal law. For higher-value moves, we offer Castle Care valuation coverage that provides additional protection. If something is damaged, contact us immediately. We document everything and work with you to resolve it. Our goal is to move everything without a scratch, and our track record reflects that.",
  },
];

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.castleexpressmoving.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.castleexpressmoving.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "Long-Distance Moving", "item": "https://www.castleexpressmoving.com/services/long-distance-moving/" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Long-Distance Moving",
  "description": "Licensed interstate moving services from Connecticut and Western Massachusetts. Dedicated truck, direct delivery, no shared loads.",
  "provider": {
    "@type": "MovingCompany",
    "name": "Castle Express Moving & Storage",
    "url": "https://www.castleexpressmoving.com",
    "telephone": "+18885534503",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4 Niblick Rd Unit A",
      "addressLocality": "Enfield",
      "addressRegion": "CT",
      "postalCode": "06082",
      "addressCountry": "US",
    },
  },
  "areaServed": [
    { "@type": "State", "name": "Connecticut" },
    { "@type": "State", "name": "Massachusetts" },
    { "@type": "State", "name": "New Hampshire" },
    { "@type": "State", "name": "Vermont" },
    { "@type": "State", "name": "Maine" },
    { "@type": "State", "name": "Rhode Island" },
    { "@type": "State", "name": "New York" },
    { "@type": "State", "name": "New Jersey" },
    { "@type": "State", "name": "Pennsylvania" },
    { "@type": "State", "name": "South Carolina" },
    { "@type": "State", "name": "Florida" },
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200",
    "bestRating": "5",
  },
};

export default function LongDistanceMovingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }} />

      {/* ─── HERO ─── */}
      <section className="section-dark" style={{ padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }}>
          <Image src="/images/hero-white-truck.jpg" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="grid-2">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              <Link href="/services" style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Services</Link>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>/</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, color: "#D4A017" }}>Long-Distance Moving</span>
            </div>
            <h1 className="heading-1" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, color: "#fff", marginBottom: 20 }}>
              Long-Distance Moving<br /><span className="text-gold">Without the 2-Week Wait</span>
            </h1>
            <p className="body-lg text-white-muted" style={{ maxWidth: 520, marginBottom: 28 }}>
              Licensed interstate movers from Connecticut and Western Massachusetts. One dedicated truck. Your schedule. Direct delivery.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              {["USDOT 2307446", "Family-Owned Since 2013", "Dedicated Trucks Only"].map(item => (
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
          { icon: <Star size={18} />, label: `${COMPANY.reviewAvg}★ on Google` },
          { icon: <Check size={18} />, label: "Licensed Interstate Carrier" },
          { icon: <Check size={18} />, label: `Serving CT & MA Since ${COMPANY.founded}` },
        ].map((item, i) => (
          <div key={i} className="trust-item">
            <span style={{ display: "inline-flex", verticalAlign: "middle", color: "#D4A017" }}>{item.icon}</span> {item.label}
          </div>
        ))}
      </section>

      {/* ─── SERVICE MODEL ─── */}
      <section className="section section-light" aria-label="How we're different">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><span>How We're Different</span></div>
            <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700 }}>
              Not a Van Line. Not a Broker. A Moving Company.
            </h2>
            <p className="body-md text-gray" style={{ maxWidth: 600, margin: "12px auto 0" }}>
              National van lines share trucks, hand off your belongings to strangers, and give you a 2-week delivery window. We do none of that.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              {
                num: "01",
                title: "One Dedicated Truck",
                text: "Your belongings get their own truck. No shared loads. No other families' furniture mixed in with yours. When we load your home in Connecticut, we close the doors and drive directly to your new home.",
              },
              {
                num: "02",
                title: "Your Schedule, Not Ours",
                text: "Most long-distance movers give you a 7 to 14 day delivery window. We don't. You tell us when you're closing or when you need to be in. We load when you're ready and arrive in days, not weeks.",
              },
              {
                num: "03",
                title: "Our Crew Loads, Our Driver Hauls",
                text: "Our crew loads your home. Our driver hauls it. Every move is coordinated start to finish by Castle Express, including the unload at your destination. Your stuff is never handed off to strangers.",
              },
              {
                num: "04",
                title: "No Warehouse, No Waiting",
                text: "National van lines often store your belongings in a warehouse between pickup and delivery. We don't. Once we load, we head straight to you. Your things are on a truck moving toward your new home, not sitting on a shelf.",
              },
            ].map((card, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px", position: "relative" }}>
                <div style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 32, color: "rgba(212,160,23,0.15)", position: "absolute", top: 16, right: 20 }}>{card.num}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#1A1A2E", marginBottom: 10 }}>{card.title}</h3>
                <p className="body-sm text-gray" style={{ lineHeight: 1.7 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHERE WE MOVE ─── */}
      <section className="section" aria-label="Destinations">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><span>Where We Move</span></div>
            <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              Real Deliveries. Real Addresses.
            </h2>
            <p className="body-md text-gray" style={{ maxWidth: 620, margin: "12px auto 0" }}>
              Castle Express has delivered to every destination below in the last two years. This is not a coverage map. These are actual moves we completed for real families.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#D4A017", marginBottom: 4 }}>Southeast</h3>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "#1A1A2E", marginBottom: 12 }}>South Carolina &amp; Florida</p>
              <p className="body-sm text-gray" style={{ lineHeight: 1.8 }}>
                Bluffton (Hilton Head area), Simpsonville, Lexington, Laurens. Clermont (Orlando metro).
              </p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#D4A017", marginBottom: 4 }}>Northern New England</h3>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "#1A1A2E", marginBottom: 12 }}>New Hampshire, Vermont &amp; Maine</p>
              <p className="body-sm text-gray" style={{ lineHeight: 1.8 }}>
                Portsmouth, Bedford, Londonderry, Merrimack, Hopkinton, Henniker, Jaffrey, Meredith (Lakes Region), Barrington. Manchester Center, Brandon, Putney. Portland area (Westbrook, Gorham), Kennebunk.
              </p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#D4A017", marginBottom: 4 }}>Southern New England</h3>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "#1A1A2E", marginBottom: 12 }}>Massachusetts &amp; Rhode Island</p>
              <p className="body-sm text-gray" style={{ lineHeight: 1.8 }}>
                Cambridge, Boston (Fenway, Jamaica Plain, South End), Brookline, Wellesley Hills, Needham, Malden, Danvers, Harwich, Eastham, Brewster, Shrewsbury. Newport, Jamestown, Charlestown.
              </p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#D4A017", marginBottom: 4 }}>Mid-Atlantic &amp; Hudson Valley</h3>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "#1A1A2E", marginBottom: 12 }}>New York, New Jersey &amp; Pennsylvania</p>
              <p className="body-sm text-gray" style={{ lineHeight: 1.8 }}>
                Albany area (Clifton Park, Troy), Hudson Valley (High Falls, Athens), South Salem. Lebanon, Neshanic Station. Reading.
              </p>
            </div>
          </div>

          <div style={{ background: "#FFF9EC", borderRadius: 12, padding: "24px 28px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 8 }}>
              Moving from Connecticut or Western Massachusetts?
            </p>
            <p className="body-sm text-gray" style={{ lineHeight: 1.7, maxWidth: 600, margin: "0 auto 16px" }}>
              We pick up from anywhere in Hartford County and Western MA. Most of our long-distance moves originate from these towns:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {[
                { name: "Enfield", href: "/movers-enfield-ct/" },
                { name: "West Hartford", href: "/movers-west-hartford-ct/" },
                { name: "Hartford", href: "/movers-hartford-ct/" },
                { name: "Glastonbury", href: "/movers-glastonbury-ct/" },
                { name: "Simsbury", href: "/movers-simsbury-ct/" },
                { name: "Avon", href: "/movers-avon-ct/" },
                { name: "Springfield, MA", href: "/movers-springfield-ma/" },
                { name: "South Windsor", href: "/movers-south-windsor-ct/" },
              ].map(town => (
                <Link key={town.href} href={town.href} className="location-chip">
                  {town.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section section-light" aria-label="How it works">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><span>How It Works</span></div>
            <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              Four Steps. One Team. Start to Finish.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {[
              {
                num: "1",
                title: "Free In-Home or Video Walkthrough",
                text: "Penny or Monique visits your home or does a video call to see exactly what's moving. We provide an estimate based on reality, not a phone guess that balloons on move day.",
              },
              {
                num: "2",
                title: "Pack, Wrap, and Load",
                text: "Our experienced crew comes to your home, pads and wraps every piece, and loads the truck. Full packing service available if you want us to handle the boxes too.",
              },
              {
                num: "3",
                title: "Direct Drive to Destination",
                text: "Our driver leaves on your schedule and drives directly to your new home. No consolidation stops, no warehouse storage, no 2-week delivery windows.",
              },
              {
                num: "4",
                title: "Unload and Placement",
                text: "Our driver coordinates the unload at your destination with a vetted local crew. Every piece comes off the truck the same day and gets placed in your new home. Move-in ready.",
              },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "#D4A017",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                  fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#fff",
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p className="body-sm text-gray" style={{ lineHeight: 1.7, maxWidth: 280, margin: "0 auto" }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section" aria-label="Customer testimonials">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><span>Long-Distance Reviews</span></div>
            <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              From Our Long-Distance Customers
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              {
                name: "Rebecca Simonian-Luke",
                route: "Connecticut to South Carolina",
                text: "My husband and I moved from CT to SC and used Castle Express. They had our house packed up in a little over 3 hours and unpacked in a little over 2. Mel was in both locations (he drove the truck down) and excelled in both! He was fantastic. I highly recommend Castle Express and Mel!",
              },
              {
                name: "Brett Ralph",
                route: "Vermont to Connecticut",
                text: "Castle Express absolutely crushed it for us. They handled our out-of-state move from Vermont, stored everything for five months, and then delivered it all to Connecticut without a single hiccup. Their crew showed up with positive attitudes every single time, treated our belongings with real care, and stayed flexible when our plans shifted (more than once). That kind of reliability is rare. They made a complex, multi-step and multi-state move feel simple.",
              },
              {
                name: "Alan Faircloth",
                route: "Connecticut to South Carolina",
                text: "Penny will help you get things in order for your move, gets it all scheduled and off we go. Mike (driver) and two others Danny and Franky were the best guys I've ever dealt with when it comes to handling loading a truck. Timing was kind of important on this move to South Carolina from Connecticut and Mike made it happen. I just can't say enough about how much this company helped me out. They truly did make the move stress free.",
              },
            ].map((review, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(j => <Star key={j} />)}
                </div>
                <p className="body-sm" style={{ color: "#1A1A2E", lineHeight: 1.7, marginBottom: 16 }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017" }}>
                  {review.name}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                  {review.route}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <section className="section section-light" aria-label="What is included">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="grid-2">
            <div>
              <div className="section-label"><span>What's Included</span></div>
              <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: 24 }}>
                Every Long-Distance Move Includes
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  "Dedicated truck (no shared loads)",
                  "Furniture padding and shrink wrap",
                  "Mattress bags",
                  "Floor protection at both locations",
                  "Furniture disassembly and reassembly",
                  "Firm delivery date before loading",
                  "Licensed interstate transport",
                  "Standard cargo protection",
                  "Pre-move walkthrough and estimate",
                  "Direct communication with your driver",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, marginTop: 3 }}><Check /></div>
                    <span className="body-sm" style={{ color: "#1A1A2E", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, padding: "16px 20px", background: "#FFF9EC", borderRadius: 8, border: "1px solid rgba(212,160,23,0.2)" }}>
                <p className="body-sm" style={{ color: "#1A1A2E", lineHeight: 1.6 }}>
                  <strong>Optional add-ons:</strong> Full packing service, unpacking at destination, climate-controlled storage between moves, Castle Care valuation coverage.
                </p>
              </div>
            </div>
            <div style={{ position: "relative", width: "100%", height: 420, borderRadius: 12, overflow: "hidden" }}>
              <Image src="/images/packed-truck.jpg" alt="Castle Express truck loaded for a long-distance move" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── LICENSED CARRIER ─── */}
      <section className="section" aria-label="Licensed interstate carrier">
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: "#FFF9EC",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Shield size={28} />
          </div>
          <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: 16 }}>
            Licensed Interstate Carrier
          </h2>
          <p className="body-md text-gray" style={{ lineHeight: 1.8, marginBottom: 24, maxWidth: 640, margin: "0 auto 24px" }}>
            Castle Express Moving &amp; Storage is a licensed interstate moving company. Family-owned and operated in Enfield, Connecticut since 2013.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
            {[
              { label: "USDOT", value: COMPANY.usdot },
              { label: "MC", value: "990616" },
              { label: "CT Permit", value: COMPANY.ctPermit },
            ].map((cred, i) => (
              <div key={i} style={{
                background: "#FFF9EC", borderRadius: 8, padding: "12px 20px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{cred.label}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E" }}>{cred.value}</span>
              </div>
            ))}
          </div>
          <p className="body-sm text-gray">
            Verify our license anytime on the{" "}
            <a href={COMPANY.fmcsaUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#D4A017", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>
              FMCSA website
            </a>.
          </p>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="section section-light" aria-label="Pricing and estimates">
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}><span>Pricing</span></div>
          <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: 24 }}>
            Honest Pricing for a Premium Service
          </h2>
          <p className="body-md" style={{ color: "#1A1A2E", lineHeight: 1.8, marginBottom: 16, maxWidth: 640, margin: "0 auto 16px" }}>
            Long-distance moves are priced per truck and per mile. Every move is different. We can't give you an accurate number over the phone or through a web form because we need to see what's moving.
          </p>
          <p className="body-md" style={{ color: "#1A1A2E", lineHeight: 1.8, marginBottom: 16, maxWidth: 640, margin: "0 auto 16px" }}>
            Our pricing reflects what we actually do. We dedicate a truck to your move. We bring our own crew. We drive directly on your schedule. We're not the cheapest option on the route and we don't try to be. We're the option where your move happens when you need it to happen, with people who know what they're doing.
          </p>
          <p className="body-md text-gray" style={{ lineHeight: 1.8, maxWidth: 640, margin: "0 auto 32px" }}>
            Every long-distance move gets a free in-home or video walkthrough and a firm estimate before you commit to anything.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Get Free Estimate <ArrowRight /></Link>
            <a href={COMPANY.phoneLink} className="btn btn-outline"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" aria-label="Frequently asked questions">
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div className="text-center" style={{ marginBottom: 40 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span>Common Questions</span></div>
            <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div>
            {FAQS.map((item, i) => (
              <details key={i} style={{ borderBottom: "1px solid #E5E7EB", padding: "20px 0" }}>
                <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.q}
                  <ChevronRight size={18} style={{ flexShrink: 0, marginLeft: 12, transition: "transform 0.2s" }} />
                </summary>
                <p className="body-md text-gray" style={{ marginTop: 12, lineHeight: 1.8 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RELATED SERVICES ─── */}
      <section className="section section-light" aria-label="Related services">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="text-center" style={{ marginBottom: 32 }}>
            <h2 className="heading-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              Related Services
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <Link href="/services/residential-moving/" className="location-chip">Residential Moving <ChevronRight size={14} /></Link>
            <Link href="/services/packing-services/" className="location-chip">Packing Services <ChevronRight size={14} /></Link>
            <Link href="/services/storage/" className="location-chip">Climate-Controlled Storage <ChevronRight size={14} /></Link>
            <Link href="/services/specialty-moving/" className="location-chip">Specialty Moving <ChevronRight size={14} /></Link>
          </div>

          <div className="text-center" style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E" }}>
              Related Reading
            </h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/blog/how-to-move-step-by-step-guide/" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 16px", borderRadius: 8, border: "1px solid #E5E7EB",
              fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13,
              color: "#6B7280", textDecoration: "none",
            }}>
              How to Move: A Complete Step-by-Step Guide <ChevronRight size={14} />
            </Link>
            <Link href="/blog/ultimate-moving-checklist-connecticut/" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 16px", borderRadius: 8, border: "1px solid #E5E7EB",
              fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13,
              color: "#6B7280", textDecoration: "none",
            }}>
              The Ultimate Moving Checklist for Connecticut <ChevronRight size={14} />
            </Link>
            <Link href="/blog/is-u-haul-cheaper-than-movers/" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 16px", borderRadius: 8, border: "1px solid #E5E7EB",
              fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13,
              color: "#6B7280", textDecoration: "none",
            }}>
              Is U-Haul Actually Cheaper Than Hiring Movers? <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section className="section section-dark text-center" aria-label="Get a free estimate">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="section-label" style={{ justifyContent: "center" }}><span>Ready to Move?</span></div>
          <h2 className="heading-2 text-white" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
            Let's Get You Where You're Going
          </h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 32 }}>
            Call today for a free in-home or video walkthrough. We'll give you a firm estimate and a firm delivery date before you commit to anything.
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
