import { CITY_DATA } from "@/lib/cityData";
import { SERVICE_PAGES } from "@/content";
import { getAllPosts } from "@/lib/blogData";
import { SUBPAGE_TOWNS, SUBPAGE_SERVICES } from "@/lib/serviceSubpages";

const BASE = "https://www.castleexpressmoving.com";

export default function sitemap() {
  const CONTENT_UPDATED = "2026-04-17";

  // Static pages
  const staticPages = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/service-areas/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/reviews/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/referral/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/postcards/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/princess-packing/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/storage-offer/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/piano-moving/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/senior-moving/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/long-distance-moving/`, changeFrequency: "monthly", priority: 0.9 },
  ].map(p => ({ ...p, lastModified: CONTENT_UPDATED }));

  // Service pages
  const servicePages = Object.keys(SERVICE_PAGES).map(slug => ({
    url: `${BASE}/services/${slug}/`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // City pages  -  96 town landing pages
  const cityPages = CITY_DATA.map(city => ({
    url: `${BASE}/${city.slug}/`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: city.tier === "Tier 1 - Priority" ? 0.9 :
              city.tier === "Tier 2 - Core" ? 0.8 :
              city.tier === "Tier 3 - Extended" ? 0.7 : 0.6,
  }));

  // Blog pages
  const blogIndex = [{ url: `${BASE}/blog/`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.7 }];
  const blogPosts = getAllPosts().map(post => ({
    url: `${BASE}/blog/${post.slug}/`,
    lastModified: post.updated || post.date || CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Service subpages (18 towns x 3 services = 54 pages)
  const serviceSubpages = [];
  for (const townSlug of SUBPAGE_TOWNS) {
    for (const svcSlug of SUBPAGE_SERVICES) {
      serviceSubpages.push({
        url: `${BASE}/${townSlug}/${svcSlug}/`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...servicePages, ...cityPages, ...serviceSubpages, ...blogIndex, ...blogPosts];
}
