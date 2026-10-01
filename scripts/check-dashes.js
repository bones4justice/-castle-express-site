#!/usr/bin/env node
// Brand rule: no em dashes or en dashes in anything the site renders.
// Runs as `prebuild` so a violating blog batch fails the build instead of
// shipping (the Sept 2026 batch got through with 181 of them).
// Scans content sources only - code comments elsewhere are not the concern.
const fs = require("fs");
const path = require("path");

const TARGETS = [
  "lib/blogData.js",
  "lib/cityData.js",
  "lib/serviceSubpages.js",
  "content.js",
  "public/oiaa.html",
];

let bad = 0;
for (const rel of TARGETS) {
  const file = path.join(__dirname, "..", rel);
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes("—") || line.includes("–")) {
      bad++;
      if (bad <= 20) console.error(`${rel}:${i + 1}: ${line.trim().slice(0, 120)}`);
    }
  });
}

if (bad) {
  console.error(`\ncheck-dashes: ${bad} em/en dash line(s) found. Brand rule: use commas, colons, "to", or plain hyphens instead.`);
  process.exit(1);
}
console.log("check-dashes: clean");
