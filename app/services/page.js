import Link from "next/link";
import { SERVICES, SERVICE_PAGES, FAQ } from "@/content";
import { Home, Building, Box, Shield, Truck, Check, ArrowRight } from "@/components/Icons";

export const metadata = { title: "Services — Castle Express Moving & Storage", description: "Residential moving, commercial relocations, full-service packing, climate-controlled storage, and specialty moving. Flat-rate pricing, no hidden fees. Serving CT and Western MA." };

const ICONS = { residential: <Home />, commercial: <Building />, packing: <Box />, storage: <Shield />, specialty: <Truck /> };

const SERVICE_SLUGS = {
  residential: "residential-moving",
  commercial: "commercial-moving",
  packing: "packing-services",
  storage: "storage",
  specialty: "specialty-moving",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-loading.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, pointerEvents: "none" }} />
        <div className="section-label" style={{ justifyContent: "center" }}><span>Our Services</span></div>
        <h1 className="heading-2 text-white">Everything You Need for a Stress-Free Move</h1>
        <p className="body-md text-white-muted" style={{ maxWidth: 520, margin: "8px auto 0" }}>Flat-rate pricing. No hidden fees. Professional crews. Every time.</p>
      </section>

      <section className="section section-light">
        <div className="container-md" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {SERVICES.map((svc) => {
            const slug = SERVICE_SLUGS[svc.id];
            return (
              <div key={svc.id} className="card grid-2" style={{ alignItems: "start", gap: 32 }}>
                <div>
                  <div className="icon-badge" style={{ marginBottom: 16 }}>{ICONS[svc.id]}</div>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 22, color: "#1A1A2E", marginBottom: 10 }}>{svc.title}</h2>
                  <p className="body-sm text-gray" style={{ lineHeight: 1.7, marginBottom: 16 }}>{svc.fullDesc}</p>
                  {slug && (
                    <Link href={`/services/${slug}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      Learn More <ArrowRight />
                    </Link>
                  )}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "#D4A017", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>What's Included</h3>
                  {svc.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <Check />
                      <span className="body-sm" style={{ color: "#1A1A2E" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container-sm">
          <h2 className="heading-2">How Our Pricing Works</h2>
          <p className="body-md text-gray" style={{ lineHeight: 1.8, marginBottom: 24 }}>
            We believe in transparent, upfront pricing. Your estimate is based on the size of your home, distance, and any special services you need. Once we assess your move, you get a clear, flat-rate quote—no surprises, no hidden fees.
          </p>
          {FAQ.map((faq, i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 6 }}>{faq.q}</h3>
              <p className="body-sm text-gray">{faq.a}</p>
            </div>
          ))}
          <div className="text-center" style={{ marginTop: 32 }}>
            <Link href="/contact" className="btn btn-primary">Get Your Free Estimate <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
