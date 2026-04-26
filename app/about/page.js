import Link from "next/link";
import Image from "next/image";
import { COMPANY, ABOUT_TEXT } from "@/content";
import { ArrowRight } from "@/components/Icons";

export const metadata = {
  title: "About Us | Castle Express Moving & Storage",
  description: "Meet Joe Caronna and the Castle Express team. Family-owned moving company in Enfield, CT since 2013. 200+ five-star reviews. (888) 553-4503",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Us | Castle Express Moving & Storage", description: "Meet Joe Caronna and the Castle Express team. Family-owned since 2013.", url: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center" }}><span>Our Story</span></div>
        <h1 className="heading-2 text-white">Family Values, Professional Results</h1>
      </section>

      <section className="section">
        <div className="container-sm">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40, borderRadius: 12, overflow: "hidden", alignItems: "stretch" }}>
            <div style={{ position: "relative", overflow: "hidden", height: 300, borderRadius: 8 }}>
              <Image src="/images/truck-residential.webp" alt="Castle Express truck at customer home" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center center" }} priority />
            </div>
            <div style={{ position: "relative", overflow: "hidden", height: 300, borderRadius: 8 }}>
              <Image src="/images/joe-with-customers.jpg" alt="Joe with happy customers" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "15% 25%" }} />
            </div>
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
            <div style={{ position: "relative", height: 160 }}><Image src="/images/truck-aframe.webp" alt="Moving truck at home" fill sizes="(max-width: 768px) 33vw, 250px" style={{ objectFit: "cover" }} /></div>
            <div style={{ position: "relative", height: 160 }}><Image src="/images/truck-brick-building.webp" alt="Castle Express at commercial building" fill sizes="(max-width: 768px) 33vw, 250px" style={{ objectFit: "cover" }} /></div>
            <div style={{ position: "relative", height: 160 }}><Image src="/images/truck-tobacco-barn.jpg" alt="Castle Express in Connecticut" fill sizes="(max-width: 768px) 33vw, 250px" style={{ objectFit: "cover" }} /></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <div className="container-sm">
          <h2 className="heading-2">Giving Back</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#1A1A2E", lineHeight: 1.8, marginBottom: 16, textAlign: "left" }}>
            Castle Express Moving &amp; Storage is proud to support organizations that make a difference. We donate to St. Jude Children's Research Hospital every year and we partner with the Enfield Food Shelf by helping with their moving projects when they need us.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#1A1A2E", lineHeight: 1.8, marginBottom: 32, textAlign: "left" }}>
            For every move we complete, we also donate 50 meals to families in need through Feeding America. Giving back to our community is not something we do for attention. It is part of how we operate.
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
            <a href="https://www.stjude.org/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/st-jude-logo.jpg" alt="St. Jude Children's Research Hospital" width={160} height={160} style={{ borderRadius: 12, objectFit: "contain" }} />
            </a>
            <a href="https://www.enfieldfoodshelf.org/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/enfield-food-shelf-logo.png" alt="Enfield Food Shelf" width={160} height={160} style={{ objectFit: "contain" }} />
            </a>
            <a href="https://www.feedingamerica.org/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/feeding-america-logo.png" alt="Feeding America" width={160} height={160} style={{ objectFit: "contain" }} />
            </a>
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
