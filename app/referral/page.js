import { COMPANY } from "@/content";
import { Phone, Check, ArrowRight } from "@/components/Icons";
import ReferralForm from "./ReferralForm";

export const metadata = {
  title: "Referral Program | Castle Express Moving & Storage",
  description: "Refer a friend, client, or tenant to Castle Express and earn 10% of their completed move. Property managers, realtors, and restoration companies welcome.",
  alternates: { canonical: "/referral/" },
  openGraph: {
    title: "Referral Program | Castle Express Moving & Storage",
    description: "Refer a friend, client, or tenant to Castle Express and earn 10% of their completed move.",
    url: "/referral/",
  },
};

const AUDIENCES = [
  { emoji: "\uD83C\uDFE2", title: "Property Managers", desc: "Tenants move in and out. Send them our way." },
  { emoji: "\uD83C\uDFE0", title: "Realtors", desc: "Closing a deal? We make your clients' move seamless." },
  { emoji: "\uD83D\uDD25", title: "Restoration Companies", desc: "Water, fire, mold displacement moves are our specialty." },
  { emoji: "\uD83C\uDFE5", title: "Senior Living Facilities", desc: "We handle senior relocations with extra care and patience." },
  { emoji: "\u2696\uFE0F", title: "Estate Attorneys", desc: "Probate and estate moves handled professionally." },
  { emoji: "\u2B50", title: "Past Customers", desc: "Loved your move? Your referral earns you real money." },
];

const STEPS = [
  { num: "1", title: "Submit the form below", desc: "Tell us who you are and who you're referring. Takes 2 minutes." },
  { num: "2", title: "We take care of them", desc: "Our team reaches out, handles the move, and delivers 5-star service." },
  { num: "3", title: "You get paid", desc: "10% of the completed invoice, sent by check to your address within 30 days of the completed move." },
];

const FAQS = [
  { q: "When do I get paid?", a: "Within 30 days of the referred customer's completed move. We send a check to your mailing address on file." },
  { q: "Is there a limit to how many referrals I can submit?", a: "No limit. Refer as many people as you'd like - every completed move earns you 10%." },
  { q: "What if the person I referred doesn't end up moving with you?", a: "The commission only applies to completed moves. If they book with another company, no payout is issued." },
  { q: "Can I refer someone who already got a quote from you?", a: "The referral must be submitted before the move is booked. We can't retroactively apply the commission." },
];

export default function ReferralPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark" style={{ padding: "70px 24px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <h1 className="heading-1" style={{ color: "#fff", marginBottom: 16, fontSize: "clamp(28px, 4vw, 44px)" }}>
            Get Paid to Refer. It&apos;s That Simple.
          </h1>
          <p className="body-lg text-white-muted" style={{ maxWidth: 560, margin: "0 auto 24px" }}>
            Send us a move. We take great care of them. You earn 10% of the completed invoice - paid by check within 30 days.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 20, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017" }}>
              10% Commission
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 20, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017" }}>
              Paid Within 30 Days
            </span>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section section-light">
        <div className="container-md">
          <div className="section-label" style={{ justifyContent: "center", marginBottom: 8 }}><span>Who This Is For</span></div>
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 32 }}>
            Built for People Who See Moving Needs Every Day
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {AUDIENCES.map((a, i) => (
              <div key={i} className="card" style={{ padding: "24px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{a.emoji}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#1A1A2E", marginBottom: 8 }}>{a.title}</h3>
                <p className="body-sm text-gray">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container-md">
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 32 }}>
            How the Program Works
          </h2>
          <div className="grid-3" style={{ marginBottom: 24 }}>
            {STEPS.map((s) => (
              <div key={s.num} className="card" style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  width: 28, height: 28, borderRadius: "50%", background: "#D4A017",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 14,
                }}>{s.num}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#1A1A2E", marginBottom: 8, marginTop: 8 }}>{s.title}</h3>
                <p className="body-sm text-gray">{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            {[
              "Referral must be submitted before the move is booked",
              "Payout on completed moves only",
              "All referrals must come through this form to be tracked",
              "Commission paid by check to your nominated mailing address",
            ].map((note, i) => (
              <p key={i} className="body-sm" style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 4, textAlign: "center" }}>
                * {note}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section section-light">
        <div className="container-md">
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 8 }}>
            Submit a Referral
          </h2>
          <p className="body-md text-gray" style={{ textAlign: "center", marginBottom: 32 }}>
            Fill out both sections below. We&apos;ll take it from there.
          </p>
          <ReferralForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-sm">
          <h2 className="heading-2" style={{ textAlign: "center", marginBottom: 24 }}>
            Common Questions
          </h2>
          {FAQS.map((faq, i) => (
            <details key={i} style={{ marginBottom: 12, padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, border: "1px solid #E5E7EB" }}>
              <summary style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "#1A1A2E", cursor: "pointer" }}>{faq.q}</summary>
              <p className="body-sm" style={{ color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark text-center">
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <h2 className="heading-2 text-white">Questions About the Program?</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 24 }}>
            Call us directly or email <a href="mailto:joe@cemoving.com" style={{ color: "#D4A017", fontWeight: 600 }}>joe@cemoving.com</a> - we&apos;ll get you taken care of.
          </p>
          <a href={COMPANY.phoneLink} className="btn btn-primary"><Phone size={18} /> {COMPANY.phone}</a>
        </div>
      </section>
    </>
  );
}
