const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'next.config.js');
let content = fs.readFileSync(file, 'utf8');
const originalLineCount = content.split('\n').length;

// 1. Fix trailing slashes on all /movers-X-ct and /movers-X-ma destinations
const before1 = content;
content = content.replace(
  /destination: '\/movers-([a-z-]+)-(ct|ma)',/g,
  "destination: '/movers-$1-$2/',"
);
const movers = (before1.match(/destination: '\/movers-[a-z-]+-(ct|ma)',/g) || []).length;
console.log(`[1] Town destinations fixed: ${movers}`);

// 2. Fix trailing slashes on static page destinations (exact-match string replacements)
const staticFixes = [
  ["destination: '/about',", "destination: '/about/',"],
  ["destination: '/contact',", "destination: '/contact/',"],
  ["destination: '/services',", "destination: '/services/',"],
  ["destination: '/blog',", "destination: '/blog/',"],
  ["destination: '/referral',", "destination: '/referral/',"],
  ["destination: '/terms',", "destination: '/terms/',"],
  ["destination: '/services/residential-moving',", "destination: '/services/residential-moving/',"],
  ["destination: '/services/specialty-moving',", "destination: '/services/specialty-moving/',"],
  ["destination: '/services/packing-services',", "destination: '/services/packing-services/',"],
  ["destination: '/blog/how-to-transport-a-mattress-safely',", "destination: '/blog/how-to-transport-a-mattress-safely/',"],
];
let staticCount = 0;
for (const [from, to] of staticFixes) {
  const occurrences = content.split(from).length - 1;
  staticCount += occurrences;
  content = content.split(from).join(to);
}
console.log(`[2] Static destinations fixed: ${staticCount}`);

// 3. Change lines 197-198 destination from /services/ to /piano-moving/ (per user's modification)
//    Note: by step 3, destination has already been normalized to '/services/' by step 2
const piano1 = "{ source: '/services/piano-moving', destination: '/services/', permanent: true },";
const piano1New = "{ source: '/services/piano-moving', destination: '/piano-moving/', permanent: true },";
const piano2 = "{ source: '/services/piano-moving/', destination: '/services/', permanent: true },";
const piano2New = "{ source: '/services/piano-moving/', destination: '/piano-moving/', permanent: true },";
if (!content.includes(piano1)) throw new Error("piano1 source line not found - check normalization");
if (!content.includes(piano2)) throw new Error("piano2 source line not found - check normalization");
content = content.replace(piano1, piano1New);
content = content.replace(piano2, piano2New);
console.log(`[3] Piano-moving destinations re-pointed to /piano-moving/`);

// 4. Remove kill-redirects: /services/commercial-moving (lines 205-206 originally)
const commercial1 = "      { source: '/services/commercial-moving', destination: '/services/', permanent: true },\n";
const commercial2 = "      { source: '/services/commercial-moving/', destination: '/services/', permanent: true },\n";
if (!content.includes(commercial1)) throw new Error("commercial1 line not found");
if (!content.includes(commercial2)) throw new Error("commercial2 line not found");
content = content.replace(commercial1, "");
content = content.replace(commercial2, "");
console.log(`[4] Removed /services/commercial-moving kill-redirects (2 lines)`);

// 5. Remove kill-redirects: /services/packing-services (lines 239-240 originally)
const packing1 = "      { source: '/services/packing-services', destination: '/princess-packing/', permanent: true },\n";
const packing2 = "      { source: '/services/packing-services/', destination: '/princess-packing/', permanent: true },\n";
if (!content.includes(packing1)) throw new Error("packing1 line not found");
if (!content.includes(packing2)) throw new Error("packing2 line not found");
content = content.replace(packing1, "");
content = content.replace(packing2, "");
console.log(`[5] Removed /services/packing-services kill-redirects (2 lines)`);

// 6. Add Semrush block before the closing ];
const semrushBlock = `      // Semrush-detected 404s (April 2026)
      { source: '/feed/', destination: '/', permanent: true },
      { source: '/comments/feed/', destination: '/', permanent: true },
      { source: '/piano-moving-why-handling-your-own-piano-move-isnt-advisable/', destination: '/piano-moving/', permanent: true },
      { source: '/the-curse-of-the-overloaded-truck-why-try-to-stuff-everything-in/', destination: '/blog/', permanent: true },
      { source: '/how-to-avoid-damage-when-loading-unloading/', destination: '/blog/', permanent: true },
      { source: '/weather-surprises-moving-in-rain-heat-or-snow-risks-best-practices-to-stay-safe/', destination: '/blog/', permanent: true },
      { source: '/over-promised-under-delivered-how-to-spot-a-moving-company-red-flag/', destination: '/blog/', permanent: true },
      { source: '/after-the-move-common-issues-at-the-new-place-and-how-to-handle-them/', destination: '/blog/', permanent: true },
      { source: '/insurance-blindspots-what-moving-insurance-doesnt-always-cover-and-what-you-need-to-know/', destination: '/blog/', permanent: true },
    ];`;

const closingMarker = "    ];";
if (!content.includes(closingMarker)) throw new Error("Closing ]; marker not found");
content = content.replace(closingMarker, semrushBlock);
console.log(`[6] Added 9 Semrush redirects before closing ];`);

fs.writeFileSync(file, content);
const newLineCount = content.split('\n').length;
console.log(`\nLine count: ${originalLineCount} -> ${newLineCount} (delta: ${newLineCount - originalLineCount})`);
console.log("Done.");
