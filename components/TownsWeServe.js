import Link from "next/link";
import { CITY_DATA } from "@/lib/cityData";
import { MapPin, ChevronRight } from "@/components/Icons";

// Default order for service-page town links.
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

export default function TownsWeServe({ limit = PRIORITY_TOWN_SLUGS.length, light = false, slugs = PRIORITY_TOWN_SLUGS }) {
  const towns = slugs.slice(0, limit)
    .map(slug => CITY_DATA.find(c => c.slug === slug))
    .filter(Boolean);

  return (
    <section className={light ? "section section-light" : "section"} aria-label="Towns we serve">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ justifyContent: "center" }}><span>Towns We Serve</span></div>
          <h2 className="heading-2 towns-title">Local Movers Across Hartford County &amp; Western MA</h2>
          <p className="body-md text-gray" style={{ maxWidth: 600, margin: "12px auto 0" }}>
            Castle Express Moving &amp; Storage has served these communities since 2011. We are{" "}
            <Link href="/movers-enfield-ct/" style={{ color: "inherit", fontWeight: 600 }}>Enfield movers</Link>{" "}
            first, working from our own facility in town. Find your town for local details and a free estimate.
          </p>
        </div>
        <div className="towns-grid">
          {towns.map(city => (
            <Link key={city.slug} href={`/${city.slug}/`} className="location-chip" style={{ textDecoration: "none" }}>
              <MapPin size={16} />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "#1A1A2E" }}>
                {city.town}, {city.state}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 32 }}>
          <Link href="/service-areas/" className="btn btn-outline">View All Service Areas <ChevronRight /></Link>
        </div>
      </div>
    </section>
  );
}
