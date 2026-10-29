import { CITY_DATA } from "@/lib/cityData";
import { SERVICE_PAGES } from "@/content";
import { getAllPosts } from "@/lib/blogData";
import { SUBPAGE_TOWNS, SUBPAGE_SERVICES } from "@/lib/serviceSubpages";

const BASE = "https://www.castleexpressmoving.com";

export default function sitemap() {
  // Last content change, derived at build time from git (last commit touching
  // content dirs) — a frozen date tells Google nothing changed and suppresses
  // recrawl of exactly the pages we want re-evaluated. The constant is the
  // fallback if git isn't available in the build environment.
  let CONTENT_UPDATED = "2026-10-29";
  try {
    const { execSync } = require("node:child_process");
    const d = execSync("git log -1 --format=%cs -- app components content lib public", {
      encoding: "utf8", timeout: 5000,
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) CONTENT_UPDATED = d;
  } catch {}

  // Static pages
  const staticPages = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/service-areas/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/reviews/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/referral/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/giving-back/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/postcards/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/princess-packing/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/storage-offer/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/piano-moving/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/senior-moving/`, changeFrequency: "monthly", priority: 0.8 },
    // AI assistant reference page (OIAA) — listed so crawlers/AI bots can discover it
    // without a visible nav link. Canonical 200 URL is the static .html file.
    { url: `${BASE}/oiaa.html`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/services/long-distance-moving/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms/`, changeFrequency: "yearly", priority: 0.3 },
  ].map(p => ({ ...p, lastModified: CONTENT_UPDATED }));

  // Service pages
  const servicePages = Object.keys(SERVICE_PAGES).map(slug => ({
    url: `${BASE}/services/${slug}/`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // City pages - one per CITY_DATA town (76 after the 2026-08-25 consolidation)
  const cityPages = CITY_DATA.map(city => ({
    url: `${BASE}/${city.slug}/`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: city.tier === "Tier 1 - Priority" ? 0.9 :
              city.tier === "Tier 2 - Core" ? 0.8 :
              city.tier === "Tier 3 - Extended" ? 0.7 : 0.6,
  }));

  // Blog pages
  // "monthly" matches the real posting cadence (batches every few weeks) —
  // declaring "weekly" while the newest post ages just erodes crawler trust.
  const blogIndex = [{ url: `${BASE}/blog/`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.7 }];
  const blogPosts = getAllPosts().map(post => ({
    url: `${BASE}/blog/${post.slug}/`,
    lastModified: post.updated || post.date || CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Service subpages (SUBPAGE_TOWNS x SUBPAGE_SERVICES - counts live in lib/serviceSubpages.js)
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
