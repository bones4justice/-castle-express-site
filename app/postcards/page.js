import Image from "next/image";
import { COMPANY } from "@/content";
import { Phone, Check } from "@/components/Icons";
import PostcardForm from "./PostcardForm";
import OfferCards from "./OfferCards";

export const metadata = {
  title: "Welcome! Claim Your Moving Offers | Castle Express Moving CT",
  description: "You found us! Claim your exclusive moving offers from Castle Express Moving & Storage. Free boxes, free storage, and more. Serving Hartford County CT & Western MA.",
  alternates: { canonical: "/postcards/" },
};

const navy = "#1a1d2e";

export default function PostcardsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: "#1a1d2e", minHeight: 560, padding: "72px 24px 0", position: "relative", overflow: "hidden" }}>
        {/* Background photo */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-aframe.webp)", backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }} />
        {/* Lighter, warmer gradient overlay — keeps text readable without feeling stormy */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26, 29, 46, 0.55) 0%, rgba(26, 29, 46, 0.35) 100%)", pointerEvents: "none" }} />
        {/* Yellow triangle accent bottom left */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: 200, height: 200, pointerEvents: "none", zIndex: 1 }} viewBox="0 0 200 200"><polygon points="0,200 200,200 0,0" fill="#FBCB0B" opacity="0.08" /></svg>

        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "45% 55%", alignItems: "end" }} className="postcard-hero-grid">
          {/* Left column */}
          <div style={{ paddingBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 16 }}><span style={{ color: "#FBCB0B" }}>Thanks for Scanning!</span></div>
            <h1 style={{ fontFamily: "Merriweather, serif", fontWeight: 900, fontStyle: "normal", fontSize: "clamp(32px, 4.5vw, 46px)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
              You Found the <span style={{ color: "#FBCB0B" }}>Perfect Mover</span>.
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 24, maxWidth: 500 }}>
              Hi, I'm Joe, owner of Castle Express since 2013. You picked up our postcard and we appreciate that. As a thank-you, here are three exclusive offers just for you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {["Licensed & Insured", "Accurate Flat-Rate Estimates", `${COMPANY.reviewCount} 5-Star Reviews`].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBCB0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontFamily: "Merriweather, serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={COMPANY.phoneLink} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#FBCB0B", color: "#000", fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none" }}><Phone size={18} /> {COMPANY.phone}</a>
              <a href="#offers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", background: "transparent", color: "#FBCB0B", fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none", border: "2px solid #FBCB0B" }}>Claim Your Offer Below ↓</a>
            </div>
          </div>

          {/* Right column - rectangular card with Joe circle overlay */}
          <div className="postcard-hero-photo" style={{ position: "relative", alignSelf: "center" }}>
            <div style={{ position: "relative", width: "100%", height: 420, borderRadius: 20, overflow: "hidden" }}><Image src="/images/truck-loading.jpg" alt="Castle Express crew loading truck" fill priority style={{ objectFit: "cover", objectPosition: "center" }} /></div>
            <div style={{ position: "absolute", bottom: -20, right: 20, width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "4px solid #000000" }}>
              <Image src="/images/truck-sale-pending.jpg" alt="Castle Express moving truck at Connecticut home" fill style={{ objectFit: "cover", objectPosition: "center" }} />
              <Image src="/images/joe-caronna.png" alt="Joe Caronna, Owner of Castle Express Moving" fill style={{ objectFit: "contain", objectPosition: "bottom center" }} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .postcard-hero-grid { grid-template-columns: 1fr !important; }
            .postcard-hero-photo { display: none !important; }
          }
        `}</style>
      </section>

      {/* OFFERS */}
      <section id="offers" style={{ background: "#fafafa", padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Merriweather, serif", fontWeight: 900, fontSize: "clamp(24px, 3.5vw, 36px)", color: "#1A1A2E", textAlign: "center", marginBottom: 8 }}>
            Your Exclusive Postcard Offers
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#777", textAlign: "center", marginBottom: 36 }}>
            Tap an offer below to claim it. We'll take you straight to the estimate form.
          </p>

          <OfferCards />

          <p style={{ fontFamily: "Merriweather, serif", fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20 }}>
            Offers valid for 30 days from postcard delivery. Lock in yours today.
          </p>

          <div style={{ background: "#FBCB0B", borderRadius: 8, padding: "14px 20px", textAlign: "center" }}>
            <p style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 14, color: "#000", margin: 0 }}>
              You're in. Just mention your postcard when you call or submit the form.
            </p>
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section style={{ background: "#fff", padding: "48px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {[
            { src: "/images/crew-furniture.jpg", alt: "Castle Express crew moving furniture", caption: "Specialty piece moves — handled like our own.", objectPosition: "center top" },
            { src: "/images/truck-residential.jpg", alt: "Castle Express truck at customer home", caption: "Local moves across Hartford County.", objectPosition: "center top" },
            { src: "/images/joe-with-customers.jpg", alt: "Joe with happy customers", caption: "Senior moves with patience and care.", objectPosition: "center top" },
          ].map((p) => (
            <div key={p.src}>
              <div style={{ position: "relative", height: 260, borderRadius: 12, overflow: "hidden" }}>
                <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover", objectPosition: p.objectPosition }} />
              </div>
              <p style={{ fontFamily: "Merriweather, serif", fontStyle: "italic", fontSize: 13, color: "#666", textAlign: "center", marginTop: 10 }}>{p.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: "#fff", padding: "16px 24px 56px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Merriweather, serif", fontWeight: 900, fontSize: 24, color: "#1A1A2E", textAlign: "center", marginBottom: 28 }}>
            Trusted by Families Across CT &amp; MA Since {COMPANY.founded}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 36 }}>
            {[
              { num: COMPANY.truckCount, label: "Trucks" },
              { num: COMPANY.reviewCount, label: "Reviews" },
              { num: `${COMPANY.reviewAvg}\u2605`, label: "Google Rating" },
              { num: "A+", label: "BBB Rating" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: 16, background: "#fafafa", borderRadius: 10 }}>
                <div style={{ fontFamily: "Merriweather, serif", fontWeight: 900, fontSize: 28, color: "#1A1A2E" }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#999" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fafafa", borderRadius: 12, padding: "28px 32px", borderLeft: "4px solid #FBCB0B" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#333", fontStyle: "italic", lineHeight: 1.7, marginBottom: 12 }}>
              "Castle Express did a fantastic job. They were on time, hard working, courteous and most helpful. I would highly recommend using this company."
            </p>
            <p style={{ fontFamily: "Merriweather, serif", fontSize: 13, color: "#999", fontWeight: 600 }}>
              - Verified Google Review
            </p>
          </div>
        </div>
      </section>

      {/* ESTIMATE FORM */}
      <section id="estimate" style={{ background: "#f5f5f7", padding: "64px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Merriweather, serif", fontWeight: 900, fontSize: "clamp(24px, 3.5vw, 36px)", color: "#1A1A2E", textAlign: "center", marginBottom: 8 }}>
            Get Your Free Estimate
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#777", textAlign: "center", marginBottom: 32 }}>
            Fill out the form and we will get back to you within one business day. Don't forget to mention your postcard offers!
          </p>
          <PostcardForm />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: navy, padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
          Prefer to call? We'd love to hear from you.
        </p>
        <a href={COMPANY.phoneLink} style={{ fontFamily: "Merriweather, serif", fontWeight: 900, fontSize: "clamp(28px, 4vw, 40px)", color: "#FBCB0B", textDecoration: "none", display: "block", marginBottom: 8 }}>
          {COMPANY.phone}
        </a>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          Available 7 days a week
        </p>
      </section>
    </>
  );
}
