#!/usr/bin/env node
// Plain-node tests for lib/salesHours.js (same vm trick as test-utm.js:
// strip "export " and evaluate, since the lib is ESM inside a CJS package).
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const src = fs
  .readFileSync(path.join(__dirname, "..", "lib", "salesHours.js"), "utf8")
  .replace(/^export /gm, "");
const ctx = { Intl, Date };
vm.createContext(ctx);
vm.runInContext(src + "\nthis.isWithinSalesHours = isWithinSalesHours; this.responseWindow = responseWindow;", ctx);
const inHours = (iso) => ctx.isWithinSalesHours(new Date(iso));

const cases = [
  ["2026-11-16T05:59:00-05:00", false, "Mon 5:59 AM ET"],
  ["2026-11-16T06:00:00-05:00", true, "Mon 6:00 AM ET"],
  ["2026-11-16T16:59:00-05:00", true, "Mon 4:59 PM ET"],
  ["2026-11-16T17:00:00-05:00", false, "Mon 5:00 PM ET"],
  ["2026-11-21T10:00:00-05:00", false, "Sat 10 AM"],
  ["2026-11-22T10:00:00-05:00", false, "Sun 10 AM"],
  ["2026-11-26T10:00:00-05:00", false, "Thanksgiving 10 AM"],
  ["2026-12-25T10:00:00-05:00", false, "Christmas 10 AM"],
  ["2027-01-01T10:00:00-05:00", false, "New Year's Day 10 AM"],
  ["2026-07-15T06:30:00-04:00", true, "summer (EDT) Wed 6:30 AM"],
  ["2026-07-15T21:30:00Z", false, "summer Wed 5:30 PM EDT given as UTC"],
  ["2026-11-16T15:00:00Z", true, "Mon 10 AM ET given as UTC"],
];
for (const [iso, want, label] of cases) {
  assert.strictEqual(inHours(iso), want, `${label} (${iso}) expected ${want}`);
}
const windows = [
  ["2026-11-17T05:30:00-05:00", "this_morning", "Tue 5:30 AM"],
  ["2026-11-17T00:00:00-05:00", "this_morning", "Tue 12:00 AM"],
  ["2026-11-17T10:00:00-05:00", "now", "Tue 10:00 AM"],
  ["2026-11-17T20:00:00-05:00", "next_business", "Tue 8:00 PM"],
  ["2026-11-20T20:00:00-05:00", "next_business", "Fri 8:00 PM"],
  ["2026-11-21T12:00:00-05:00", "next_business", "Sat noon"],
  ["2026-11-23T05:00:00-05:00", "this_morning", "Mon 5:00 AM"],
  ["2026-11-26T12:00:00-05:00", "next_business", "Thanksgiving noon"],
  ["2026-11-26T05:00:00-05:00", "next_business", "Thanksgiving 5:00 AM (closed day)"],
];
for (const [iso, want, label] of windows) {
  assert.strictEqual(ctx.responseWindow(new Date(iso)), want, `${label} (${iso}) expected ${want}`);
}
console.log(`test-sales-hours: ${cases.length + windows.length} cases passed`);
