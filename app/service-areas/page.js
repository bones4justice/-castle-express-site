import Link from "next/link";
import { CITY_DATA } from "@/lib/cityData";
import { COMPANY } from "@/content";
import { MapPin } from "@/components/Icons";

export const metadata = {
  title: "Service Areas | Castle Express Moving & Storage  -  CT & MA",
  description: "Castle Express Moving serves 82 towns across Hartford County CT, Western Massachusetts, and beyond. Find your town and get a free moving quote today.",
  alternates: { canonical: "/service-areas/" },
  openGraph: {
    title: "Service Areas | Castle Express Moving & Storage",
    description: "Serving 82 towns across Hartford County CT and Western Massachusetts.",
    url: "/service-areas/",
  },
};

const tiers = [
  { key: "Tier 1 - Priority", label: "Primary Service Area", desc: "Our home turf  -  fastest response, deepest local knowledge" },
  { key: "Tier 2 - Core", label: "Core Service Area", desc: "Regularly serviced areas across CT and Western MA" },
  { key: "Tier 3 - Extended", label: "Extended Service Area", desc: "Extended coverage across Connecticut and Massachusetts" },
  { key: "Tier 4 - Outer Reach", label: "Outer Service Area", desc: "We travel further for the right move" },
];

export default function ServiceAreasPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/truck-tobacco-barn.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div className="section-label" style={{ justifyContent: "center" }}><span>Where We Serve</span></div>
          <h1 className="heading-2 text-white">Moving Services Across Connecticut &amp; Massachusetts</h1>
          <p className="body-md text-white-muted" style={{ maxWidth: 600, margin: "8px auto 0" }}>
            Castle Express Moving &amp; Storage serves 82 towns from our Enfield, CT home base. Find your town below for local pricing, availability, and a free quote.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-md">
          {tiers.map(tier => {
            const cities = CITY_DATA.filter(c => c.tier === tier.key);
            if (cities.length === 0) return null;
            return (
              <div key={tier.key} style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontStyle: "italic", fontSize: 22, color: "#1A1A2E", marginBottom: 8 }}>
                  <span className="text-gold">●</span> {tier.label}
                </h2>
                <p className="body-sm text-gray" style={{ marginBottom: 16 }}>{tier.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                  {cities.map(city => (
                    <Link key={city.slug} href={`/${city.slug}`} className="card" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", textDecoration: "none", cursor: "pointer", transition: "border-color 0.2s" }}>
                      <span className="text-gold"><MapPin size={18} /></span>
                      <div>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "#1A1A2E", display: "block" }}>{city.town}, {city.state}</span>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{city.drive} from Enfield</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="card" style={{ marginTop: 32 }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#1A1A2E", marginBottom: 8 }}>Don&apos;t see your town?</h3>
            <p className="body-sm text-gray" style={{ lineHeight: 1.6 }}>
              We serve all of Hartford County, Tolland County, and Middlesex County in Connecticut, plus much of Western Massachusetts. If you&apos;re in the area, chances are we can help. Give us a call at{" "}
              <a href={COMPANY.phoneLink} style={{ color: "#D4A017", fontWeight: 600 }}>{COMPANY.phone}</a> and we&apos;ll confirm coverage for your location.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
