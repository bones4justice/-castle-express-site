import Link from "next/link";
import { CITY_DATA } from "@/lib/cityData";
import { MapPin, ChevronRight } from "@/components/Icons";

// Priority towns for internal linking. Homepage shows the first 12;
// service pages show all 15. Order = rough priority.
export const PRIORITY_TOWN_SLUGS = [
  "movers-enfield-ct",
  "movers-windsor-ct",
  "movers-windsor-locks-ct",
  "movers-east-windsor-ct",
  "movers-suffield-ct",
  "movers-somers-ct",
  "movers-south-windsor-ct",
  "movers-granby-ct",
  "movers-simsbury-ct",
  "movers-bloomfield-ct",
  "movers-west-hartford-ct",
  "movers-hartford-ct",
  "movers-manchester-ct",
  "movers-glastonbury-ct",
  "movers-longmeadow-ma",
];

export default function TownsWeServe({ limit = PRIORITY_TOWN_SLUGS.length, light = false }) {
  const towns = PRIORITY_TOWN_SLUGS.slice(0, limit)
    .map(slug => CITY_DATA.find(c => c.slug === slug))
    .filter(Boolean);

  return (
    <section className={light ? "section section-light" : "section"} aria-label="Towns we serve">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ justifyContent: "center" }}><span>Towns We Serve</span></div>
          <h2 className="heading-2" style={{ fontFamily: "Merriweather, serif", fontWeight: 700, fontStyle: "normal" }}>Local Movers Across Hartford County &amp; Western MA</h2>
          <p className="body-md text-gray" style={{ maxWidth: 600, margin: "12px auto 0" }}>
            Castle Express Moving &amp; Storage has served these communities from our Enfield, CT facility since 2011. Find your town for local details and a free estimate.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {towns.map(city => (
            <Link key={city.slug} href={`/${city.slug}/`} className="location-chip" style={{ textDecoration: "none" }}>
              <MapPin size={16} />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "#1A1A2E" }}>
                Movers in {city.town}, {city.state}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 32 }}>
          <Link href="/service-areas" className="btn btn-outline">View All Service Areas <ChevronRight /></Link>
        </div>
      </div>
    </section>
  );
}
