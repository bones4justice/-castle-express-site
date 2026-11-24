import Link from "next/link";
import { SERVICES, SERVICE_PAGES, FAQ } from "@/content";
import { Check, ArrowRight } from "@/components/Icons";
import { IconResidential, IconCommercial, IconPacking, IconStorage, IconPiano, IconLongDistance } from "@/components/BrandIcons";
import TownsWeServe from "@/components/TownsWeServe";
import { InteriorHero } from "@/components/InteriorKit";

export const metadata = {
  title: "Our Moving Services | Castle Express Moving & Storage",
  description: "Residential moving, commercial relocations, packing, climate-controlled storage & specialty moving. Accurate estimates, no hidden fees. CT & Western MA.",
  alternates: { canonical: "/services/" },
  openGraph: { title: "Moving Services | Castle Express Moving & Storage", description: "Residential, commercial, packing, storage, and specialty moving in CT & MA.", url: "/services/" },
};

const ICONS = {
  residential: <IconResidential size={96} />,
  commercial: <IconCommercial size={96} />,
  packing: <IconPacking size={96} />,
  storage: <IconStorage size={96} />,
  specialty: <IconPiano size={96} />,
  longdistance: <IconLongDistance size={96} />,
};

export default function ServicesPage() {
  return (
    <div className="ip">
      <InteriorHero
        compact
        eyebrow="Our Services"
        title="Everything You Need for a Stress-Free Move"
        image="/images/truck-loading.webp"
        imageAlt="Castle Express crew loading a moving truck"
      >
        <p>Accurate estimates. No hidden fees. Professional crews. Every time.</p>
      </InteriorHero>

      <section className="ip-svc-section">
        <div className="ip-svc-grid">
          {SERVICES.map((svc) => {
            return (
              <Link key={svc.id} href={`/services/${svc.slug}/`} className="ip-svc">
                <div className="ip-svc-top">
                  <div className="ip-svc-icon">{ICONS[svc.id]}</div>
                  <h2>{svc.title}</h2>
                </div>
                <p className="ip-svc-desc">{svc.fullDesc}</p>
                <h3>What's Included</h3>
                <div className="ip-svc-feats">
                  {svc.features.map((f, j) => (
                    <div key={j}><Check /> <span>{f}</span></div>
                  ))}
                </div>
                <span className="ip-svc-more">Learn More <ArrowRight /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section ip-svc-also">
        <div className="container-md text-center">
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 8 }}>More Moving Services</h2>
          <p className="body-sm text-gray" style={{ marginBottom: 20 }}>Looking for something more specific? These pages cover our most requested moves.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Apartment Movers", href: "/services/apartment-movers/" },
              { label: "House Movers", href: "/services/house-movers/" },
              { label: "Local Moving", href: "/services/local-moving/" },
              { label: "Packing & Moving", href: "/services/packing-and-moving/" },
              { label: "Moving & Storage", href: "/services/moving-and-storage/" },
              { label: "White Glove Movers & Delivery", href: "/services/white-glove-moving/" },
              { label: "Piano Moving", href: "/piano-moving/" },
              { label: "Senior Moving", href: "/senior-moving/" },
              { label: "Princess Packing™", href: "/princess-packing/" },
            ].map(s => (
              <Link key={s.href} href={s.href} className="location-chip">{s.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light ip-body">
        <div className="container-sm">
          <h2 className="heading-2">How Our Pricing Works</h2>
          <p className="body-md text-gray" style={{ lineHeight: 1.8, marginBottom: 24 }}>
            We believe in transparent, upfront pricing. Your estimate is based on the size of your home, distance, and any special services you need. Once we assess your move, you get a clear, detailed estimate accurate within 10% - no surprises, no hidden fees.
          </p>
          {FAQ.map((faq, i) => (
            <div key={i} className="ip-qa">
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#1A1A2E", marginBottom: 6 }}>{faq.q}</h3>
              <p className="body-sm text-gray">{faq.a}</p>
            </div>
          ))}
          <div className="text-center" style={{ marginTop: 32 }}>
            <Link href="/contact/" className="ip-btn ip-btn-primary">Get Your Free Estimate <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <TownsWeServe />
    </div>
  );
}
