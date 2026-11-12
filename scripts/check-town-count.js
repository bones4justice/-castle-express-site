#!/usr/bin/env node
// Prebuild guard: TOWN_COUNT in content.js must equal the number of town
// pages in lib/cityData.js (the "We cover N towns" FAQ answers read it).
// Counts slug entries textually so it needs no ESM loader.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const content = fs.readFileSync(path.join(root, "content.js"), "utf8");
const cities = fs.readFileSync(path.join(root, "lib", "cityData.js"), "utf8");
const m = content.match(/export const TOWN_COUNT = (\d+);/);
if (!m) { console.error("check-town-count: TOWN_COUNT not found in content.js"); process.exit(1); }
const declared = Number(m[1]);
const actual = new Set(cities.match(/"slug":\s*"movers-[a-z-]+"|slug:\s*"movers-[a-z-]+"/g) || []).size;
if (declared !== actual) {
  console.error(`check-town-count: TOWN_COUNT is ${declared} but lib/cityData.js has ${actual} town pages. Update TOWN_COUNT in content.js.`);
  process.exit(1);
}
console.log(`check-town-count: OK (${actual} towns)`);
