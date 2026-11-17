#!/usr/bin/env node
// Plain-node tests for lib/geAbTest.js (the /get-estimate/ vs homepage split
// test), same vm loading approach as scripts/test-lp-ab.js: evaluate lib/utm.js,
// lib/lpAbTest.js and lib/geAbTest.js in one sandbox with export/import
// stripped. Runs in prebuild.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

function readLib(name) {
  return fs
    .readFileSync(path.join(__dirname, "..", "lib", name), "utf8")
    .replace(/^export /gm, "")
    .replace(/^import [\s\S]*?;\s*$/gm, "");
}

const sandbox = { URLSearchParams, Math };
vm.createContext(sandbox);
vm.runInContext(readLib("utm.js"), sandbox);
vm.runInContext(readLib("lpAbTest.js"), sandbox);
vm.runInContext(readLib("geAbTest.js"), sandbox);
const lib = Object.assign(
  vm.runInContext("({ GE_AB_COOKIE, GE_AB_VARIANTS })", sandbox),
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

check("isGeTestTraffic: Google Ads only", () => {
  assert.strictEqual(lib.isGeTestTraffic("?gclid=abc"), true, "gclid");
  assert.strictEqual(lib.isGeTestTraffic("?utm_source=google&utm_medium=cpc"), true, "utm_source=google");
  assert.strictEqual(lib.isGeTestTraffic("?UTM_SOURCE=google"), false, "keys are case sensitive");
  assert.strictEqual(lib.isGeTestTraffic("?utm_source=Google"), true, "value is case-insensitive");
  assert.strictEqual(lib.isGeTestTraffic("?gbraid=x"), true, "gbraid (iOS Google click id)");
  assert.strictEqual(lib.isGeTestTraffic("?utm_source=facebook"), false, "facebook");
  assert.strictEqual(lib.isGeTestTraffic(""), false, "no params");
  assert.strictEqual(lib.isGeTestTraffic("?fbclid=1"), false, "meta click id");
});

check("readGeVariantCookie", () => {
  assert.strictEqual(lib.readGeVariantCookie("ge_ab=form"), "form");
  assert.strictEqual(lib.readGeVariantCookie("a=1; ge_ab=home; b=2"), "home");
  assert.strictEqual(lib.readGeVariantCookie("ge_ab=landing"), null, "invalid value");
  assert.strictEqual(lib.readGeVariantCookie("lp_ab=landing"), null, "other test's cookie");
  assert.strictEqual(lib.readGeVariantCookie("xge_ab=form"), null, "prefix mismatch");
  assert.strictEqual(lib.readGeVariantCookie(null), null, "null");
});

check("pickGeVariant + constants", () => {
  assert.strictEqual(lib.pickGeVariant(0.2), "form");
  assert.strictEqual(lib.pickGeVariant(0.7), "home");
  assert.ok(lib.GE_AB_VARIANTS.includes(lib.pickGeVariant()));
  assert.strictEqual(lib.GE_AB_COOKIE, "ge_ab");
});

check("geVariantForLead", () => {
  assert.strictEqual(lib.geVariantForLead("ge_ab=home"), "home");
  assert.strictEqual(lib.geVariantForLead(""), "not_in_test");
  assert.strictEqual(lib.geVariantForLead("ge_ab=junk"), "not_in_test");
});

if (failures) {
  console.error(`\ntest-ge-ab: ${failures} case(s) failed`);
  process.exit(1);
}
console.log("test-ge-ab: all cases passed");
