import Link from "next/link";
import { CITY_DATA } from "@/lib/cityData";
import { COMPANY } from "@/content";
import { MapPin } from "@/components/Icons";
import { InteriorHero, EstimateBand } from "@/components/InteriorKit";

export const metadata = {
  title: "Service Areas | Castle Express Moving & Storage  -  CT & MA",
  description: `Castle Express Moving serves ${CITY_DATA.length} towns across Hartford County CT, Western Massachusetts, and beyond. Find your town and get a free moving quote today.`,
  alternates: { canonical: "/service-areas/" },
  openGraph: {
    title: "Service Areas | Castle Express Moving & Storage",
    description: `Serving ${CITY_DATA.length} towns across Hartford County CT and Western Massachusetts.`,
    url: "/service-areas/",
  },
};

const tiers = [
  { key: "Tier 1 - Priority", id: "primary", short: "Primary", label: "Primary Service Area", desc: "Our home turf  -  fastest response, deepest local knowledge" },
  { key: "Tier 2 - Core", id: "core", short: "Core", label: "Core Service Area", desc: "Regularly serviced areas across CT and Western MA" },
  { key: "Tier 3 - Extended", id: "extended", short: "Extended", label: "Extended Service Area", desc: "Extended coverage across Connecticut and Massachusetts" },
  { key: "Tier 4 - Outer Reach", id: "outer", short: "Outer", label: "Outer Service Area", desc: "We travel further for the right move" },
];

export default function ServiceAreasPage() {
  return (
    <div className="ip">
      <InteriorHero
        compact
        eyebrow="Where We Serve"
        title={<>Moving Services Across Connecticut &amp; Massachusetts</>}
        image="/images/truck-tobacco-barn.jpg"
        imageAlt="Castle Express moving truck beside a Connecticut tobacco barn"
      >
        <p>
          Castle Express Moving &amp; Storage serves {CITY_DATA.length} towns from our Enfield, CT home base. Find your town below for local pricing, availability, and a free quote.
        </p>
      </InteriorHero>

      <section className="ip-areas">
        <div className="ip-areas-inner">
          <nav className="ip-jump" aria-label="Jump to a service area">
            {tiers.map(tier => (
              CITY_DATA.some(c => c.tier === tier.key) ? <a key={tier.key} href={`#${tier.id}`}>{tier.short}</a> : null
            ))}
          </nav>

          {tiers.map(tier => {
            const cities = CITY_DATA.filter(c => c.tier === tier.key);
            if (cities.length === 0) return null;
            return (
              <div key={tier.key} id={tier.id} className="ip-tier">
                <h2 className="ip-tier-title">{tier.label} <span className="ip-tier-count">{cities.length} towns</span></h2>
                <p className="ip-tier-desc">{tier.desc}</p>
                <div className="ip-town-grid">
                  {cities.map(city => (
                    <Link key={city.slug} href={`/${city.slug}/`} className="ip-town">
                      <MapPin size={18} />
                      <span>
                        <span className="ip-town-name">{city.town}, {city.state}</span>
                        <span className="ip-town-drive">{city.drive} from Enfield</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="ip-card">
            <h3>Don&apos;t see your town?</h3>
            <p>
              We serve all of Hartford County, Tolland County, and Middlesex County in Connecticut, plus much of Western Massachusetts. If you&apos;re in the area, chances are we can help. Give us a call at{" "}
              <a href={COMPANY.phoneLink}>{COMPANY.phone}</a> and we&apos;ll confirm coverage for your location.
            </p>
          </div>
        </div>
      </section>

      <EstimateBand title="Ready for a Free Moving Estimate?">
        Call us at <a href={COMPANY.phoneLink}>{COMPANY.phone}</a> or send us your move details. We typically respond in 20 minutes or less.
      </EstimateBand>
    </div>
  );
}
