// Run: node scripts/generate-sitemap.js
const { CITY_DATA } = require('../lib/cityData');
const fs = require('fs');

const baseUrl = 'https://www.castleexpressmoving.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/service-areas/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/residential-moving/', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/commercial-moving/', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/specialty-moving/', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/packing-services/', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/storage/', priority: '0.7', changefreq: 'monthly' },
  { url: '/about/', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact/', priority: '0.7', changefreq: 'monthly' },
  { url: '/referral/', priority: '0.5', changefreq: 'monthly' },
];

const cityPages = CITY_DATA.map(city => ({
  url: `/${city.slug}/`,
  priority: city.tier === 'Tier 1 - Priority' ? '0.9' :
            city.tier === 'Tier 2 - Core' ? '0.8' :
            city.tier === 'Tier 3 - Extended' ? '0.7' : '0.6',
  changefreq: 'monthly',
}));

const allPages = [...staticPages, ...cityPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Sitemap generated with ${allPages.length} URLs`);
