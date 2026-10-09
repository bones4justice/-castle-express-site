#!/usr/bin/env node
// Plain-node tests for lib/utm.js (no test framework). Runs in prebuild
// after check-dashes, so a regression in the query parsing or landing
// version picking fails the build instead of shipping.
//
// lib/utm.js is ESM syntax inside a CommonJS package, so plain node cannot
// require() or import() it directly. Instead we strip the "export " keywords
// and evaluate the module in a vm sandbox; that also lets each case run with
// a fresh fake window + sessionStorage so captureAttribution and
// getSmartMovingAttribution are exercised end to end, exactly as the browser
// runs them.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const UTM_SOURCE = fs
  .readFileSync(path.join(__dirname, "..", "lib", "utm.js"), "utf8")
  .replace(/^export /gm, "");

function makeWindow(search) {
  const store = new Map();
  return {
    location: { search, pathname: "/free-estimate/" },
    sessionStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
    },
  };
}

// Fresh sandbox per call: module-level state cannot leak between cases.
function loadUtm(search) {
  const sandbox = { URLSearchParams, Date, JSON };
  if (search !== undefined) sandbox.window = makeWindow(search);
  vm.createContext(sandbox);
  vm.runInContext(UTM_SOURCE, sandbox);
  return sandbox;
}

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

// Runs a landing URL search string through the same code paths the site
// uses: parseTrackedParams + pickVersion (server), then captureAttribution +
// getSmartMovingAttribution (browser). Returns everything the cases assert.
function run(search) {
  const utm = loadUtm(search);
  const params = utm.parseTrackedParams(search);
  const version = utm.pickVersion(search);
  utm.captureAttribution();
  const sm = utm.getSmartMovingAttribution();
  return { params, version, sm };
}

const MANGLED =
  "?https://www.castleexpressmoving.com/free-estimate/?utm_source=google" +
  "&utm_medium=cpc&utm_campaign=long-distance-ct" +
  "&utm_term=professional%20movers%20long%20distance" +
  "&utm_source=google&utm_medium=cpc&utm_campaign=24214412327" +
  "&utm_content=823421406149&utm_term=professional%20movers%20long%20distance" +
  "&utm_adgroup=196830087261&gad_source=1&gad_campaignid=24214412327" +
  "&gbraid=TESTGBRAID";

const CLEAN =
  "?utm_source=google&utm_medium=cpc&utm_campaign=long-distance-ct" +
  "&utm_term=professional%20movers%20long%20distance&gclid=TESTGCLID";

check("(a) clean URL", () => {
  const r = run(CLEAN);
  assert.strictEqual(r.params.utm_source, "google");
  assert.strictEqual(r.params.utm_medium, "cpc");
  assert.strictEqual(r.params.utm_campaign, "long-distance-ct");
  assert.strictEqual(r.params.utm_term, "professional movers long distance");
  assert.strictEqual(r.sm.UtmSource, "google");
  assert.strictEqual(r.sm.UtmMedium, "cpc");
  assert.strictEqual(r.sm.UtmCampaign, "long-distance-ct");
  assert.strictEqual(r.sm.UtmKeyword, "professional movers long distance");
  assert.strictEqual(r.sm.UtmCustomTracking, "TESTGCLID");
  assert.strictEqual(r.version, "longdistance");
});

check("(b) mangled production URL", () => {
  const r = run(MANGLED);
  assert.strictEqual(r.params.utm_source, "google");
  assert.strictEqual(r.params.utm_medium, "cpc");
  // First value wins: the human campaign name, not the numeric id.
  assert.strictEqual(r.params.utm_campaign, "long-distance-ct");
  assert.strictEqual(r.params.utm_term, "professional movers long distance");
  assert.strictEqual(r.params.utm_content, "823421406149");
  assert.strictEqual(r.params.utm_adgroup, "196830087261");
  assert.strictEqual(r.params.gbraid, "TESTGBRAID");
  assert.strictEqual(r.params.gad_source, undefined);
  assert.strictEqual(r.sm.UtmSource, "google");
  assert.strictEqual(r.sm.UtmMedium, "cpc");
  assert.strictEqual(r.sm.UtmCampaign, "long-distance-ct");
  assert.strictEqual(r.sm.UtmKeyword, "professional movers long distance");
  assert.strictEqual(r.sm.UtmAdGroup, "196830087261");
  assert.strictEqual(r.sm.UtmCustomTracking, "TESTGBRAID");
  assert.strictEqual(r.version, "longdistance");
});

check("(c) repeated utm_campaign only", () => {
  const r = run("?utm_campaign=long-distance-ct&utm_campaign=24214412327");
  assert.strictEqual(r.params.utm_campaign, "long-distance-ct");
  assert.strictEqual(r.params.utm_source, undefined);
  assert.strictEqual(r.sm.UtmCampaign, "long-distance-ct");
  assert.strictEqual(r.sm.UtmSource, undefined);
  assert.strictEqual(r.sm.UtmCustomTracking, undefined);
  assert.strictEqual(r.version, "longdistance");
});

check("(d) gclid only, no utm at all", () => {
  const r = run("?gclid=TESTGCLID2");
  assert.strictEqual(r.params.gclid, "TESTGCLID2");
  assert.strictEqual(r.params.utm_source, undefined);
  // Paid click with no manual tags: source/medium synthesized for SmartMoving.
  assert.strictEqual(r.sm.UtmSource, "google");
  assert.strictEqual(r.sm.UtmMedium, "cpc");
  assert.strictEqual(r.sm.UtmCampaign, undefined);
  assert.strictEqual(r.sm.UtmCustomTracking, "TESTGCLID2");
  assert.strictEqual(r.version, "residential");
});

check("(e) utm_source=facebook", () => {
  const r = run("?utm_source=facebook&utm_medium=paid_social&utm_campaign=long-distance-ct&fbclid=TESTFBCLID");
  assert.strictEqual(r.params.utm_source, "facebook");
  assert.strictEqual(r.params.utm_medium, "paid_social");
  assert.strictEqual(r.sm.UtmSource, "facebook");
  assert.strictEqual(r.sm.UtmMedium, "paid_social");
  assert.strictEqual(r.sm.UtmCustomTracking, "TESTFBCLID");
  // Channel beats campaign name: social even though the campaign says long distance.
  assert.strictEqual(r.version, "social");
});

check("pickVersion covers all four ad groups + Next searchParams objects", () => {
  const utm = loadUtm();
  assert.strictEqual(utm.pickVersion("?utm_campaign=long-distance-ct"), "longdistance");
  assert.strictEqual(utm.pickVersion("?utm_campaign=commercial-office"), "commercial");
  assert.strictEqual(utm.pickVersion("?utm_campaign=local-residential"), "residential");
  assert.strictEqual(utm.pickVersion("?utm_campaign=Movers+Near+you"), "residential");
  assert.strictEqual(utm.pickVersion("?utm_source=instagram"), "social");
  assert.strictEqual(utm.pickVersion(""), "residential");
  assert.strictEqual(utm.pickVersion(undefined), "residential");
  // Next 14 server shape: repeated param arrives as an array under one key.
  assert.strictEqual(
    utm.pickVersion({ utm_campaign: ["long-distance-ct", "24214412327"] }),
    "longdistance"
  );
  // Next 14 server shape of the mangled URL: pasted-URL prefix on the key.
  assert.strictEqual(
    utm.pickVersion({
      "https://www.castleexpressmoving.com/free-estimate/?utm_campaign": "commercial-office",
      utm_campaign: "24214412327",
    }),
    "commercial"
  );
  assert.strictEqual(utm.pickVersion({ utm_campaign: 42 }), "residential");
});

check("first-touch wins: second navigation does not overwrite attribution", () => {
  const utm = loadUtm(CLEAN);
  utm.captureAttribution();
  utm.window.location.search = "?utm_source=bing&utm_medium=cpc";
  utm.captureAttribution();
  assert.strictEqual(utm.getAttribution().utm_source, "google");
});

if (failures) {
  console.error(`\ntest-utm: ${failures} case(s) failed`);
  process.exit(1);
}
console.log("test-utm: all cases passed");
