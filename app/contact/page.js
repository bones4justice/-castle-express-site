import { COMPANY } from "@/content";
import { Phone, MapPin, Clock, Shield } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";

export const metadata = {
  title: "Contact Us",
  description: "Get a free moving estimate from Castle Express. Call 1-888-553-4503 or fill out our form. Serving Hartford County CT and Western MA with flat-rate pricing.",
  alternates: { canonical: "/contact/" },
  openGraph: { title: "Contact Us | Castle Express Moving & Storage", description: "Get a free moving estimate. Call 1-888-553-4503 or fill out our form.", url: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center" }}><span>Get In Touch</span></div>
        <h1 className="heading-2 text-white">Request Your Free Estimate</h1>
        <p className="body-md text-white-muted" style={{ maxWidth: 480, margin: "8px auto 0" }}>
          Fill out the form below or call us directly. We typically respond within 20 minutes.
        </p>
      </section>

      <section className="section section-light">
        <div className="container-md grid-2" style={{ alignItems: "start" }}>
          <EstimateForm />
          <div>
            <div className="card" style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 16 }}>Contact Information</h3>
              {[
                { icon: <Phone size={18} />, label: "Phone", value: COMPANY.phone, href: COMPANY.phoneLink, bold: true },
                { icon: <MapPin size={18} />, label: "Address", value: COMPANY.fullAddress },
                { icon: <Clock size={18} />, label: "Availability", value: COMPANY.hours },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                  <div className="icon-badge icon-badge-sm">{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#1A1A2E", fontWeight: 600, textDecoration: "none" }}>{item.value}</a>
                    ) : (
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#1A1A2E" }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="card-gold">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Shield size={20} style={{ color: "#D4A017" }} />
                <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E" }}>Licensed & Insured</h4>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280", lineHeight: 1.8 }}>
                {COMPANY.mc} · USDOT {COMPANY.usdot} · CT Permit {COMPANY.ctPermit}<br />
                A+ BBB Rating · {COMPANY.reviewCount} Google Reviews ({COMPANY.reviewAvg} avg)
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
