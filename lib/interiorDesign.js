// Interior page design v2 (Nov 2026): the homepage redesign's look (warm
// white, charcoal, Castle yellow, DM Sans) for interior pages. The shared
// templates serve ~100 towns and every service, so the new look is switched on
// per page here. To roll out further, add slugs (or flip the template to
// always-on once every page has been reviewed). /service-areas/ is its own
// page file and is always v2.
export const INTERIOR_V2_TOWNS = new Set(["movers-enfield-ct"]);
export const INTERIOR_V2_SERVICES = new Set(["residential-moving"]);

// Real Castle photos for v2 town headers. Towns not listed use the default.
export const TOWN_HERO_PHOTOS = {
  "movers-enfield-ct": "/images/hero-white-truck.webp",
};
export const DEFAULT_TOWN_HERO_PHOTO = "/images/truck-residential.webp";
