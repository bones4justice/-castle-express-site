#!/usr/bin/env node
// Plain-node tests for lib/lpAbTest.js (no test framework), same vm loading
// approach as scripts/test-utm.js: both libs are ESM syntax in a CJS
// package, so strip "export "/"import " and evaluate lib/utm.js then
// lib/lpAbTest.js in one sandbox (lpAbTest's functions resolve
// parseTrackedParams/first from the shared context). Runs in prebuild.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

function readLib(name) {
  return fs
    .readFileSync(path.join(__dirname, "..", "lib", name), "utf8")
    .replace(/^export /gm, "")
    .replace(/^import .*$/gm, "");
}

const sandbox = { URLSearchParams, Math };
vm.createContext(sandbox);
vm.runInContext(readLib("utm.js"), sandbox);
vm.runInContext(readLib("lpAbTest.js"), sandbox);
// Top-level consts live in the vm's global lexical scope, not on the sandbox
// object (unlike function declarations), so read them out via an expression.
const lib = Object.assign(
  vm.runInContext("({ LP_AB_COOKIE, LP_AB_VARIANTS })", sandbox),
  sandbox
);

let failures = 0;
function check(name, fn) {
  try {
    fn();
    console.log(`  ok: ${name}`);
  } catch (e) {
    failures++;
    console.error(`FAIL: ${name}`);
    console.error(`  ${e.message}`);
  }
}

const MANGLED =
  "?https://www.castleexpressmoving.com/free-estimate/?utm_source=google" +
  "&utm_medium=cpc&utm_campaign=long-distance-ct" +
  "&utm_term=professional%20movers%20long%20distance" +
  "&utm_source=google&utm_medium=cpc&utm_campaign=24214412327" +
  "&utm_content=823421406149&utm_term=professional%20movers%20long%20distance" +
  "&utm_adgroup=196830087261&gad_source=1&gad_campaignid=24214412327" +
  "&gbraid=TESTGBRAID";

check("isAdsTraffic", () => {
  assert.strictEqual(
    lib.isAdsTraffic("?utm_source=google&utm_medium=cpc&utm_campaign=long-distance-ct&utm_term=x&gclid=abc"),
    true, "clean URL");
  assert.strictEqual(lib.isAdsTraffic(MANGLED), true, "mangled production URL");
  assert.strictEqual(lib.isAdsTraffic("?gclid=abc"), true, "gclid only");
  assert.strictEqual(lib.isAdsTraffic("?gbraid=xyz"), true, "gbraid only");
  assert.strictEqual(lib.isAdsTraffic("?wbraid=xyz"), true, "wbraid only");
  assert.strictEqual(lib.isAdsTraffic("?utm_source=Google"), true, "case-insensitive source");
  assert.strictEqual(lib.isAdsTraffic("?utm_source=facebook&utm_medium=paid_social"), false, "Meta traffic");
  assert.strictEqual(lib.isAdsTraffic(""), false, "no params");
  assert.strictEqual(lib.isAdsTraffic(undefined), false, "undefined");
  assert.strictEqual(lib.isAdsTraffic({ utm_source: ["google", "x"] }), true, "searchParams object");
});

check("servicePathForCampaign", () => {
  assert.strictEqual(lib.servicePathForCampaign("long-distance-ct"), "/services/long-distance-moving/");
  assert.strictEqual(lib.servicePathForCampaign("local-residential"), "/services/residential-moving/");
  assert.strictEqual(lib.servicePathForCampaign("commercial-office"), "/services/commercial-moving/");
  assert.strictEqual(lib.servicePathForCampaign("movers-near-you"), "/");
  assert.strictEqual(lib.servicePathForCampaign("Movers Near you"), "/");
  assert.strictEqual(lib.servicePathForCampaign(undefined), "/");
  assert.strictEqual(lib.servicePathForCampaign(""), "/");
  assert.strictEqual(lib.servicePathForCampaign(42), "/");
  assert.strictEqual(lib.servicePathForCampaign("LONG-DISTANCE-CT"), "/services/long-distance-moving/");
  assert.strictEqual(lib.servicePathForCampaign("24214412327"), "/");
});

check("readVariantCookie", () => {
  assert.strictEqual(lib.readVariantCookie("lp_ab=landing"), "landing");
  assert.strictEqual(lib.readVariantCookie("foo=1; lp_ab=service; bar=2"), "service");
  assert.strictEqual(lib.readVariantCookie("lp_ab=bogus"), null, "invalid value");
  assert.strictEqual(lib.readVariantCookie("hero_ab_test=A"), null, "missing");
  assert.strictEqual(lib.readVariantCookie(""), null, "empty");
  assert.strictEqual(lib.readVariantCookie(null), null, "null");
  assert.strictEqual(lib.readVariantCookie(undefined), null, "undefined");
  assert.strictEqual(lib.readVariantCookie("xlp_ab=landing"), null, "prefix mismatch");
});

check("pickVariant", () => {
  assert.strictEqual(lib.pickVariant(0.2), "landing");
  assert.strictEqual(lib.pickVariant(0.7), "service");
  assert.ok(lib.LP_AB_VARIANTS.includes(lib.pickVariant()), "default random yields a valid variant");
  assert.strictEqual(lib.LP_AB_COOKIE, "lp_ab");
});

if (failures) {
  console.error(`\ntest-lp-ab: ${failures} case(s) failed`);
  process.exit(1);
}
console.log("test-lp-ab: all cases passed");
