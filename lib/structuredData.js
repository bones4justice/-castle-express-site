// Centralized JSON-LD structured data for Castle Express Moving & Storage.
//
//   • LocalBusiness  -> injected SITEWIDE         (app/layout.js)
//   • MovingCompany  -> injected on the HOMEPAGE  (app/page.js), in a single
//                       @graph array alongside LocalBusiness.
//
// Edit business facts HERE so both stay in sync. Values mirror content.js
// (COMPANY) and components/Footer.js so the schema matches the visible site.

const SITE_URL = "https://www.castleexpressmoving.com";
const LOGO = `${SITE_URL}/images/logo.jpg`; // real asset: public/images/logo.jpg

// ── Shared building blocks ────────────────────────────────────────────────

const address = {
  "@type": "PostalAddress",
  streetAddress: "4 Niblick Rd Unit A",
  addressLocality: "Enfield",
  addressRegion: "CT",
  postalCode: "06082",
  addressCountry: "US",
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: 41.9762,
  longitude: -72.5918,
};

// Real social profiles used in the site footer (components/Footer.js) and
// content.js (COMPANY). Keep this list in sync with those.
const sameAs = [
  "https://www.facebook.com/cemoving",
  "https://www.instagram.com/castleexpressmovingandstorage/",
  "https://www.tiktok.com/@castleexpressmovi",
  "https://www.linkedin.com/in/joseph-caronna-767a616",
  // ⚠️ PLACEHOLDER — CONFIRM BEFORE DEPLOY:
  // There is NO canonical Google Business Profile / Google Maps URL in the
  // site footer or header today, so there is nothing to "match" yet. Paste the
  // real listing URL here (e.g. "https://maps.app.goo.gl/XXXX" or
  // "https://g.page/XXXX") and remove this comment.
];

// areaServed: two states + the requested city-level coverage. Cities carry
// containedInPlace so "Springfield" is unambiguously the MA one, etc.
const CT = { "@type": "State", name: "Connecticut" };
const MA = { "@type": "State", name: "Massachusetts" };
const city = (name, state) => ({ "@type": "City", name, containedInPlace: state });

const areaServed = [
  CT,
  MA,
  city("Enfield", CT),
  city("Hartford", CT),
  city("West Hartford", CT),
  city("Glastonbury", CT),
  city("Avon", CT),
  city("Springfield", MA),
];

// ⚠️ BUSINESS HOURS — PLACEHOLDER, DO NOT DEPLOY AS-IS.
// Per instruction, hours are NOT guessed. They are intentionally OMITTED from
// the output until Joe confirms the real hours. To enable: fill the real
// specs below and flip HOURS_CONFIRMED to true.
const HOURS_CONFIRMED = false;
const openingHoursSpecification = [
  // EXAMPLE SHAPE — replace with confirmed hours, then set HOURS_CONFIRMED=true:
  // {
  //   "@type": "OpeningHoursSpecification",
  //   dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  //   opens: "08:00",
  //   closes: "17:00",
  // },
  // { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "13:00" },
];

const maybeHours =
  HOURS_CONFIRMED && openingHoursSpecification.length ? { openingHoursSpecification } : {};

// ── Nodes ─────────────────────────────────────────────────────────────────

// Sitewide identity. Generic LocalBusiness with core NAP + geo + areaServed.
const localBusiness = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Castle Express Moving & Storage",
  url: SITE_URL,
  image: LOGO,
  logo: LOGO,
  telephone: "+1-888-553-4503",
  priceRange: "$$",
  foundingDate: "2011",
  address,
  geo,
  areaServed,
  sameAs,
  ...maybeHours,
};

// Full, homepage-only node. MovingCompany is a LocalBusiness subtype; this
// carries the richer detail (services, founder, rating, description).
const movingCompany = {
  "@type": "MovingCompany",
  "@id": `${SITE_URL}/#movingcompany`,
  name: "Castle Express Moving & Storage",
  url: SITE_URL,
  image: LOGO,
  logo: LOGO,
  telephone: "+1-888-553-4503",
  priceRange: "$$",
  foundingDate: "2011",
  founder: { "@type": "Person", name: "Joseph Caronna" },
  description:
    "Family-owned moving company serving Hartford County, CT and Western Massachusetts since 2011. Residential, commercial, specialty moving, and climate-controlled storage. Accurate estimates, no hidden fees.",
  address,
  geo,
  areaServed,
  sameAs,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: 200,
    bestRating: "5",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moving & Storage Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Moving" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Moving" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Climate-Controlled Storage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Specialty Moving" } },
    ],
  },
  ...maybeHours,
};

// ── Public builders ───────────────────────────────────────────────────────

// Sitewide (every page): LocalBusiness only.
export function localBusinessJsonLd() {
  return { "@context": "https://schema.org", "@graph": [localBusiness] };
}

// Homepage: adds ONLY the rich MovingCompany node. The generic LocalBusiness
// node (@id #localbusiness) is already injected sitewide by app/layout.js, so
// emitting it here too would duplicate the same @id on the homepage — a
// structured-data validator error. MovingCompany has its own @id
// (#movingcompany), so the two coexist cleanly with no duplication.
export function homepageJsonLd() {
  return { "@context": "https://schema.org", "@graph": [movingCompany] };
}

export { SITE_URL };
