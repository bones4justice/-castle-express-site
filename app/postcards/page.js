import { COMPANY } from "@/content";
import { Phone, Check } from "@/components/Icons";
import PostcardForm from "./PostcardForm";

export const metadata = {
  title: "Welcome! Claim Your Moving Offers | Castle Express Moving CT",
  description: "You found us! Claim your exclusive moving offers from Castle Express Moving & Storage. Free boxes, free storage, and more. Serving Hartford County CT & Western MA.",
  alternates: { canonical: "/postcards/" },
};

const navy = "#1a1d2e";

const TruckIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FBCB0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
);

const BoxIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FBCB0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);

const GiftIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FBCB0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
);

export default function PostcardsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: "#1a1d2e", minHeight: 560, padding: "72px 24px 0", position: "relative", overflow: "hidden" }}>
        {/* Background photo */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-residential.jpg)", backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }} />
        {/* Dark gradient overlay: solid left, transparent right */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,29,46,0.95) 50%, rgba(26,29,46,0.4) 100%)", pointerEvents: "none" }} />
        {/* Yellow triangle accent bottom left */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: 200, height: 200, pointerEvents: "none", zIndex: 1 }} viewBox="0 0 200 200"><polygon points="0,200 200,200 0,0" fill="#FBCB0B" opacity="0.08" /></svg>

        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "45% 55%", alignItems: "end" }} className="postcard-hero-grid">
          {/* Left column */}
          <div style={{ paddingBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 16 }}><span style={{ color: "#FBCB0B" }}>Thanks for Scanning!</span></div>
            <h1 style={{ fontFamily: "Merriweather, serif", fontWeight: 900, fontStyle: "normal", fontSize: "clamp(32px, 4.5vw, 46px)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
              Looking for the <span style={{ color: "#FBCB0B" }}>Perfect Mover</span>?
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
              <a href="#offers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#FBCB0B", color: "#000", fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none" }}>Claim Your Offer Below</a>
              <a href={COMPANY.phoneLink} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "transparent", color: "#fff", fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}><Phone size={18} /> {COMPANY.phone}</a>
            </div>
          </div>

          {/* Right column - rectangular card with Joe circle overlay */}
          <div className="postcard-hero-photo" style={{ position: "relative", alignSelf: "center" }}>
            <img src="/images/truck-loading.jpg" alt="Castle Express crew loading truck" style={{ width: "100%", height: 420, objectFit: "cover", objectPosition: "center", borderRadius: 20, display: "block" }} />
            <div style={{ position: "absolute", bottom: -20, right: 20, width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "4px solid #000000" }}>
              <img src="/images/truck-sale-pending.jpg" alt="Castle Express moving truck at Connecticut home" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <img src="/images/joe-caronna.png" alt="Joe Caronna, Owner of Castle Express Moving" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "85%", objectFit: "contain", objectPosition: "bottom center" }} />
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
            Mention these offers when you call or fill out the estimate form below.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 32 }}>
            {[
              { icon: <TruckIcon />, title: "Free Night of Truck Storage", desc: "Moving with a double closing? We'll store your belongings in our truck overnight at no charge so your move stays on schedule." },
              { icon: <BoxIcon />, title: "Free First Month of Storage", desc: "Need a little extra time before moving in? Get your first month of climate-controlled storage completely free when you book your move with us." },
              { icon: <GiftIcon />, title: "20 Free Boxes + Roll of Tape", desc: "Schedule a free walk-through estimate and we'll bring you 20 boxes and a roll of tape, on us. No obligation, no pressure." },
            ].map((offer, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #eee", textAlign: "center" }}>
                <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>{offer.icon}</div>
                <h3 style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 10 }}>{offer.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#666", lineHeight: 1.6 }}>{offer.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#FBCB0B", borderRadius: 8, padding: "14px 20px", textAlign: "center" }}>
            <p style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontSize: 14, color: "#000", margin: 0 }}>
              These offers are for postcard recipients only. Mention your postcard when booking.
            </p>
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section style={{ background: "#fff", padding: "48px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <img src="/images/crew-furniture.jpg" alt="Castle Express crew moving furniture" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12 }} />
          <img src="/images/truck-residential.jpg" alt="Castle Express truck at customer home" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12 }} />
          <img src="/images/joe-with-customers.jpg" alt="Joe with happy customers" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12, objectPosition: "15% 25%" }} />
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
      <section id="estimate" style={{ background: "#fafafa", padding: "64px 24px" }}>
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
