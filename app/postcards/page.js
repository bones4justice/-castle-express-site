import { COMPANY } from "@/content";
import { Phone } from "@/components/Icons";
import PostcardForm from "./PostcardForm";

export const metadata = {
  title: "Welcome! Claim Your Moving Offers | Castle Express Moving CT",
  description: "You found us! Claim your exclusive moving offers from Castle Express Moving & Storage. Free boxes, free storage, and more. Serving Hartford County CT & Western MA.",
  alternates: { canonical: "/postcards/" },
  robots: { index: false, follow: true },
};

const navy = "#1a1d2e";

export default function PostcardsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: navy, padding: "72px 24px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span style={{ display: "inline-block", background: "rgba(251,203,11,0.15)", border: "1px solid rgba(251,203,11,0.3)", borderRadius: 20, padding: "6px 16px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "#FBCB0B", marginBottom: 20 }}>
            Thanks for scanning!
          </span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
            You Found the Right Movers.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 32 }}>
            We appreciate you checking us out. As a thank-you for scanning our postcard, here are three exclusive offers reserved for you.
          </p>
          <a href="#offers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#FBCB0B", color: "#000", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none" }}>
            Claim Your Offer Below
          </a>
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
              { icon: "\uD83D\uDE9A", title: "Free Night of Truck Storage", desc: "Moving with a double closing? We'll store your belongings in our truck overnight at no charge so your move stays on schedule." },
              { icon: "\uD83D\uDCE6", title: "Free First Month of Storage", desc: "Need a little extra time before moving in? Get your first month of climate-controlled storage completely free when you book your move with us." },
              { icon: "\uD83C\uDF81", title: "20 Free Boxes + Roll of Tape", desc: "Schedule a free walk-through estimate and we'll bring you 20 boxes and a roll of tape, on us. No obligation, no pressure." },
            ].map((offer, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #eee", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{offer.icon}</div>
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

      {/* SOCIAL PROOF */}
      <section style={{ background: "#fff", padding: "56px 24px" }}>
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
