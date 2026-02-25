import Link from "next/link";
import { COMPANY, ABOUT_TEXT } from "@/content";
import { ArrowRight } from "@/components/Icons";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center" }}><span>Our Story</span></div>
        <h1 className="heading-2 text-white">Family Values, Professional Results</h1>
      </section>

      <section className="section">
        <div className="container-sm">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40, borderRadius: 12, overflow: "hidden" }}>
            <img src="/images/truck-residential.jpg" alt="Castle Express truck at customer home" style={{ width: "100%", height: 220, objectFit: "cover" }} />
            <img src="/images/joe-with-customers.jpg" alt="Joe with happy customers" style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "#1A1A2E", lineHeight: 1.8, marginBottom: 24 }}>{ABOUT_TEXT.intro}</p>
          <p className="body-md text-gray" style={{ lineHeight: 1.8, marginBottom: 24 }}>{ABOUT_TEXT.middle}</p>
          <p className="body-md text-gray" style={{ lineHeight: 1.8, marginBottom: 24 }}>{ABOUT_TEXT.growth}</p>
          <p className="body-md text-gray" style={{ lineHeight: 1.8, marginBottom: 40 }}>{ABOUT_TEXT.values}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { num: String(COMPANY.founded), label: "Year Founded" },
              { num: COMPANY.truckCount, label: "Trucks in Fleet" },
              { num: `${COMPANY.facilitySize} ft²`, label: "Storage Facility" },
              { num: `${COMPANY.reviewAvg}★`, label: `${COMPANY.reviewCount} Google Reviews` },
            ].map((s, i) => (
              <div key={i} className="card-gold" style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 28, color: "#D4A017" }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 40, borderRadius: 12, overflow: "hidden" }}>
            <img src="/images/truck-aframe.jpg" alt="Moving truck at home" style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <img src="/images/truck-brick-building.jpg" alt="Castle Express at commercial building" style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <img src="/images/truck-tobacco-barn.jpg" alt="Castle Express in Connecticut" style={{ width: "100%", height: 160, objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <section className="section section-light" style={{ textAlign: "center" }}>
        <div className="container-sm">
          <h2 className="heading-2">Our Mission</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "#1A1A2E", lineHeight: 1.8, fontStyle: "italic", marginBottom: 32 }}>
            {ABOUT_TEXT.mission}
          </p>
          <Link href="/contact" className="btn btn-primary">Get a Free Estimate <ArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
