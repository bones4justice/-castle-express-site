import { CITY_PAGES, SERVICE_PAGES } from "@/content";

const BASE = "https://castleexpressmoving.com";

export default function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/service-areas/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/contact/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/referral/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/princess-packing.html`, changeFrequency: "monthly", priority: 0.7 },
  ].map(p => ({ ...p, lastModified: now }));

  // Service pages
  const servicePages = Object.keys(SERVICE_PAGES).map(slug => ({
    url: `${BASE}/services/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // City pages
  const cityPages = Object.keys(CITY_PAGES).map(slug => ({
    url: `${BASE}/service-areas/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages];
}
