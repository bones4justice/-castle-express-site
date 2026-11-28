import Link from "next/link";
import { COMPANY } from "@/content";
import { CITY_DATA } from "@/lib/cityData";
import { Phone, MapPin, Clock, Shield } from "@/components/Icons";
import EstimateForm from "@/components/EstimateForm";
import { InteriorHero } from "@/components/InteriorKit";

export const metadata = {
  title: "Contact Us | Castle Express Moving & Storage",
  description: "Get a free moving estimate from Castle Express. Call 1-888-553-4503 or fill out our form. Serving Hartford County CT & Western MA.",
  alternates: { canonical: "/contact/" },
  openGraph: { title: "Contact Us | Castle Express Moving & Storage", description: "Get a free moving estimate. Call 1-888-553-4503 or fill out our form.", url: "/contact/", images: [{ url: "/images/truck-residential.jpg", alt: "Castle Express Moving & Storage" }] },
};

export default function ContactPage() {
  return (
    <div className="ip">
      <InteriorHero
        compact
        eyebrow="Get In Touch"
        title="Request Your Free Estimate"
        actions={<a href="tel:+18885534503" className="ip-btn ip-btn-outline ip-contact-call"><Phone size={18} /> {COMPANY.phone}</a>}
      >
        <p>
          Fill out the form below or call us directly. We typically respond within 20 minutes. Based in <Link href="/movers-enfield-ct/">Enfield, CT</Link>, we serve <Link href="/movers-hartford-ct/">Hartford</Link>, <Link href="/movers-springfield-ma/">Springfield</Link>, and <Link href="/service-areas/">{CITY_DATA.length} towns across CT &amp; MA</Link>.
        </p>
      </InteriorHero>

      <section className="section section-light ip-body ip-contact">
        <div className="container-md grid-2" style={{ alignItems: "start" }}>
          <div className="ip-estimate ip-estimate-inline">
            <EstimateForm />
          </div>
          <div>
            <div className="card" style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "#1A1A2E", marginBottom: 16 }}>Contact Information</h2>
              {[
                { icon: <Phone size={18} />, label: "Phone", value: COMPANY.phone, href: "tel:+18885534503", bold: true },
                { icon: <MapPin size={18} />, label: "Address", value: COMPANY.fullAddress, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.fullAddress)}` },
                { icon: <Clock size={18} />, label: "Availability", value: COMPANY.hours, href: "tel:+18885534503" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                  <div className="icon-badge icon-badge-sm">{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={item.bold ? "ip-contact-phone" : "ip-contact-link"} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#1A1A2E", fontWeight: 600, textDecoration: "none" }}>{item.value}</a>
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
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E" }}>Licensed & Insured</h3>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280", lineHeight: 1.8 }}>
                {COMPANY.mc} · USDOT {COMPANY.usdot} · CT Permit {COMPANY.ctPermit}<br />
                A+ BBB Rating · {COMPANY.reviewCount} Google Reviews ({COMPANY.reviewAvg} avg)<br />
                <Link href="/services/" className="ip-contact-link" style={{ fontWeight: 700, fontSize: 13 }}>View our services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
