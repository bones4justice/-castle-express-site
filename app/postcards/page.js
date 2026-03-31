import { COMPANY } from "@/content";
import { Phone, Check } from "@/components/Icons";
import PostcardForm from "./PostcardForm";

export const metadata = {
  title: "Welcome! Claim Your Moving Offers | Castle Express Moving CT",
  description: "You found us! Claim your exclusive moving offers from Castle Express Moving & Storage. Free boxes, free storage, and more. Serving Hartford County CT & Western MA.",
  alternates: { canonical: "/postcards/" },
  robots: { index: false, follow: true },
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
      <section className="section-dark" style={{ padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-residential.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "linear-gradient(135deg, transparent 40%, rgba(212,160,23,0.07) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: 16 }}><span>Thanks for Scanning!</span></div>
          <h1 className="heading-1" style={{ color: "#fff", marginBottom: 20 }}>
            Looking for the <span className="text-gold">Perfect Mover</span>?
          </h1>
          <p className="body-lg text-white-muted" style={{ marginBottom: 28, maxWidth: 580 }}>
            We appreciate you checking us out. As a thank-you for scanning our postcard, here are three exclusive offers reserved for you.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            {["Licensed & Insured", "Accurate Estimates", `${COMPANY.reviewCount} 5-Star Reviews`].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Check />
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#offers" className="btn btn-primary">Claim Your Offer Below</a>
            <a href={COMPANY.phoneLink} className="btn btn-outline-light"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" style={{ background: "#fafafa", padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(24px, 3.5vw, 36px)", color: "#1A1A2E", textAlign: "center", marginBottom: 8 }}>
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
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 10 }}>{offer.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#666", lineHeight: 1.6 }}>{offer.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#FBCB0B", borderRadius: 8, padding: "14px 20px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#000", margin: 0 }}>
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
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: 24, color: "#1A1A2E", textAlign: "center", marginBottom: 28 }}>
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
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 28, color: "#1A1A2E" }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#999" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fafafa", borderRadius: 12, padding: "28px 32px", borderLeft: "4px solid #FBCB0B" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#333", fontStyle: "italic", lineHeight: 1.7, marginBottom: 12 }}>
              "Castle Express did a fantastic job. They were on time, hard working, courteous and most helpful. I would highly recommend using this company."
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 13, color: "#999", fontWeight: 600 }}>
              - Verified Google Review
            </p>
          </div>
        </div>
      </section>

      {/* ESTIMATE FORM */}
      <section id="estimate" style={{ background: "#fafafa", padding: "64px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(24px, 3.5vw, 36px)", color: "#1A1A2E", textAlign: "center", marginBottom: 8 }}>
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
        <a href={COMPANY.phoneLink} style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 40px)", color: "#FBCB0B", textDecoration: "none", display: "block", marginBottom: 8 }}>
          {COMPANY.phone}
        </a>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          Available 7 days a week
        </p>
      </section>
    </>
  );
}
