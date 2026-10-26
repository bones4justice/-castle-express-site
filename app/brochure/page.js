import Image from "next/image";
import { COMPANY } from "@/content";
import { Phone, Shield, DollarSign, Truck, Award, Check } from "@/components/Icons";
import LandingEstimateForm from "@/components/LandingEstimateForm";

// Brochure QR landing page. The printed tri-fold QR used to point at
// /Adam (a rep who left) and 404'd; /Adam and /adam now redirect here
// (see next.config.js). 100% of traffic is a phone-camera scan, so this is
// built mobile-first: a big tap-to-call sits above the fold, with the same
// /free-estimate LandingEstimateForm below so leads land in the identical
// pipeline and fire the existing GTM "Submit lead form" generate_lead
// conversion. Noindex: the page is short and overlaps our service pages, so
// only people holding the brochure should ever reach it.

export const metadata = {
  title: "Free Moving Estimate | Castle Express Moving & Storage",
  description:
    "Scan, tap, and call Castle Express Moving & Storage for a fast, free estimate. Licensed & insured movers serving Connecticut & Massachusetts since 2011.",
  alternates: { canonical: "/brochure/" },
  robots: { index: false, follow: false },
};

const TRUST = [
  { icon: Shield, title: "Licensed & Insured", desc: `MC-${COMPANY.mc.replace("MC-", "")} · USDOT ${COMPANY.usdot}` },
  { icon: DollarSign, title: "Reasonable Rates", desc: "Honest estimates, no hidden fees" },
  { icon: Truck, title: "Loading & Unloading", desc: "Experienced, careful crews" },
  { icon: Award, title: "White Glove Service", desc: "We treat your home like our own" },
];

export default function BrochurePage() {
  return (
    <div className="br-page">
      <style>{`
        .br-page { background: #FFFFFF; color: var(--dark); }
        /* ─── Hero: tap-to-call above the fold on a phone ─── */
        .br-hero {
          background: linear-gradient(135deg, var(--dark) 0%, var(--dark-soft) 100%);
          color: #FFFFFF; text-align: center;
          padding: 22px 18px 28px;
        }
        .br-hero img.br-logo { height: 46px; width: auto; margin: 0 auto 16px; }
        .br-hero h1 {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 26px; line-height: 1.2; margin: 0 0 8px;
        }
        .br-hero p.br-sub {
          font-size: 15px; line-height: 1.5; color: rgba(255,255,255,0.82);
          margin: 0 auto 20px; max-width: 30em;
        }
        /* Primary CTA: big, thumb-sized tap-to-call. */
        .br-call {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; max-width: 420px; margin: 0 auto;
          background: var(--gold); color: var(--dark);
          font-family: var(--font-heading); font-weight: 800; font-size: 22px;
          padding: 20px 24px; border-radius: 10px; min-height: 68px;
          text-decoration: none; box-shadow: 0 10px 28px rgba(0,0,0,0.3);
        }
        .br-call-note {
          font-size: 13px; color: rgba(255,255,255,0.7); margin: 12px 0 0;
        }
        .br-call-note a { color: var(--gold); font-weight: 700; }
        /* ─── Trust points ─── */
        .br-trust { max-width: 560px; margin: 0 auto; padding: 24px 16px 8px; }
        .br-trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .br-trust-card {
          background: var(--gold-bg); border: 1px solid var(--gold-light);
          border-radius: 12px; padding: 16px 14px; text-align: center;
        }
        .br-trust-card .br-ic {
          width: 42px; height: 42px; border-radius: 50%; background: var(--gold);
          display: inline-flex; align-items: center; justify-content: center;
          margin-bottom: 8px;
        }
        .br-trust-card h3 {
          font-family: var(--font-heading); font-weight: 700; font-size: 15px;
          margin: 0 0 3px; color: var(--dark);
        }
        .br-trust-card p { font-size: 12px; line-height: 1.4; color: var(--gray); margin: 0; }
        /* ─── Form ─── */
        .br-form { max-width: 480px; margin: 0 auto; padding: 20px 16px 8px; }
        .br-form h2 {
          font-family: var(--font-heading); font-weight: 800; font-size: 22px;
          text-align: center; margin: 0 0 4px; color: var(--dark);
        }
        .br-form p.br-form-sub {
          text-align: center; font-size: 14px; color: var(--gray); margin: 0 0 16px;
        }
        /* ─── Footer line ─── */
        .br-foot {
          text-align: center; padding: 20px 16px 28px;
        }
        .br-foot-line {
          font-family: var(--font-heading); font-weight: 700; font-size: 15px;
          color: var(--dark);
        }
        .br-foot-addr { font-size: 13px; color: var(--gray); margin-top: 4px; }
        @media (min-width: 720px) {
          .br-hero { padding: 48px 24px 52px; }
          .br-hero h1 { font-size: 38px; }
          .br-hero p.br-sub { font-size: 18px; }
          .br-trust-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      {/* Hero with the primary CTA (tap-to-call) above everything */}
      <section className="br-hero">
        <Image src="/images/logo-wordmark.png" alt="Castle Express Moving & Storage"
          width={300} height={143} priority quality={90} className="br-logo" />
        <h1>Connecticut & Massachusetts Movers You Can Trust</h1>
        <p className="br-sub">
          Family owned since {COMPANY.founded}. Tap below to call now for your free estimate.
        </p>
        <a href={COMPANY.phoneLink} className="br-call">
          <Phone size={24} /> Call {COMPANY.phone}
        </a>
        <p className="br-call-note">
          Prefer we reach out? <a href="#estimate">Request your free estimate below</a>
        </p>
      </section>

      {/* Trust points, matching the printed brochure */}
      <section className="br-trust">
        <div className="br-trust-grid">
          {TRUST.map(({ icon: Ic, title, desc }) => (
            <div key={title} className="br-trust-card">
              <span className="br-ic"><Ic size={22} stroke="#1A1A2E" /></span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA: the same form /free-estimate uses */}
      <section className="br-form" id="estimate">
        <h2>Get Your Free Estimate</h2>
        <p className="br-form-sub">Tell us about your move and we will get you taken care of.</p>
        <LandingEstimateForm idPrefix="brochure" version="brochure" eventLabel="brochure_landing" />
      </section>

      {/* Footer line from the printed brochure */}
      <footer className="br-foot">
        <div className="br-foot-line">Serving Connecticut & Massachusetts</div>
        <div className="br-foot-addr">
          {COMPANY.name} · {COMPANY.fullAddress} ·{" "}
          <a href={COMPANY.phoneLink} style={{ fontWeight: 700 }}>{COMPANY.phone}</a>
        </div>
      </footer>
    </div>
  );
}
