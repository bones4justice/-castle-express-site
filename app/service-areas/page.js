import { COMPANY, SERVICE_AREAS } from "@/content";
import { MapPin } from "@/components/Icons";

export const metadata = { title: "Service Areas" };

export default function ServiceAreasPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-tobacco-barn.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
        <div className="section-label" style={{ justifyContent: "center" }}><span>Where We Serve</span></div>
        <h1 className="heading-2 text-white">Hartford County, CT & Western MA</h1>
        <p className="body-md text-white-muted" style={{ maxWidth: 560, margin: "8px auto 0" }}>
          Dispatching from our Enfield and Glastonbury locations, we proudly serve families and businesses across Connecticut and Western Massachusetts.
        </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-md">
          {Object.entries(SERVICE_AREAS).map(([region, cities]) => (
            <div key={region} style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 22, color: "#1A1A2E", marginBottom: 16 }}>
                <span className="text-gold">●</span> {region}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {cities.map(city => (
                  <div key={city} className="card" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px" }}>
                    <span className="text-gold"><MapPin size={18} /></span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "#1A1A2E" }}>{city}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="card" style={{ marginTop: 32 }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#1A1A2E", marginBottom: 8 }}>Don't see your town?</h3>
            <p className="body-sm text-gray" style={{ lineHeight: 1.6 }}>
              We serve all of Hartford County, Tolland County, and Middlesex County in Connecticut, plus much of Western Massachusetts. If you're in the area, chances are we can help. Give us a call at{" "}
              <a href={COMPANY.phoneLink} style={{ color: "#D4A017", fontWeight: 600 }}>{COMPANY.phone}</a> and we'll confirm coverage for your location.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
