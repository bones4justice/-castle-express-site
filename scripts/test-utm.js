#!/usr/bin/env node
// Plain-node tests for lib/utm.js (no test framework). Runs in prebuild
// after check-dashes, so a regression in the query parsing or landing
// version picking fails the build instead of shipping.
//
// lib/utm.js is ESM syntax inside a CommonJS package, so plain node cannot
// require() or import() it directly. Instead we strip the "export " keywords
// and evaluate the module in a vm sandbox; that also lets each case run with
// a fresh fake window + storage so captureAttribution and
// getSmartMovingAttribution are exercised end to end, exactly as the browser
// runs them.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const UTM_SOURCE = fs
  .readFileSync(path.join(__dirname, "..", "lib", "utm.js"), "utf8")
  .replace(/^export /gm, "");

function makeStorage(store = new Map()) {
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
}

// local: pass a Map to share one "browser profile" (localStorage) between
// sandboxes, the way a returning visitor's new session sees the old data.
// Pass null for a browser with localStorage blocked.
function makeWindow(search, local = new Map()) {
  const win = {
    location: { search, pathname: "/free-estimate/" },
    sessionStorage: makeStorage(),
  };
  if (local) win.localStorage = makeStorage(local);
  return win;
}

// Fresh sandbox per call: module-level state cannot leak between cases.
function loadUtm(search, { local, now } = {}) {
  // now: fixed clock (ms) so the 30-day expiry can be tested.
  let clock = Date;
  if (now !== undefined) {
    clock = class extends Date {
      constructor(...args) { args.length ? super(...args) : super(now); }
      static now() { return now; }
    };
  }
  const sandbox = { URLSearchParams, Date: clock, JSON, Number };
  if (search !== undefined) sandbox.window = makeWindow(search, local);
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

check("last ad click wins: landing again with tags replaces the stored attribution", () => {
  const utm = loadUtm(CLEAN);
  utm.captureAttribution();
  utm.window.location.search = "?utm_source=bing&utm_medium=cpc&msclkid=M1";
  utm.captureAttribution();
  assert.strictEqual(utm.getAttribution().utm_source, "bing");
  assert.strictEqual(utm.getAttribution().gclid, undefined);
});

check("tags survive moving to another page: an untagged page view keeps them", () => {
  const utm = loadUtm("?utm_source=google&utm_medium=cpc&utm_campaign=c&utm_content=x&utm_term=t&utm_adgroup=g&gclid=G1&gbraid=B1&wbraid=W1&fbclid=F1");
  utm.captureAttribution();
  utm.window.location.search = "";
  utm.window.location.pathname = "/contact/";
  utm.captureAttribution();
  const a = utm.getAttribution();
  for (const [k, v] of Object.entries({
    utm_source: "google", utm_medium: "cpc", utm_campaign: "c", utm_content: "x",
    utm_term: "t", utm_adgroup: "g", gclid: "G1", gbraid: "B1", wbraid: "W1", fbclid: "F1",
  })) assert.strictEqual(a[k], v, k);
  assert.strictEqual(a._landing_path, "/free-estimate/");
  assert.strictEqual(utm.getSmartMovingAttribution().UtmAdGroup, "g");
  assert.strictEqual(utm.getSmartMovingAttribution().UtmCustomTracking, "G1");
});

const DAY = 24 * 60 * 60 * 1000;
const T0 = Date.UTC(2026, 10, 1);

check("30 days: a returning visitor in a new session keeps their ad attribution", () => {
  const profile = new Map();
  const first = loadUtm("?utm_source=google&utm_medium=cpc&gclid=G30", { local: profile, now: T0 });
  first.captureAttribution();
  // New session 29 days later: fresh sessionStorage, same localStorage, no tags.
  const later = loadUtm("", { local: profile, now: T0 + 29 * DAY });
  later.captureAttribution();
  assert.strictEqual(later.getAttribution().gclid, "G30");
  assert.strictEqual(later.getSmartMovingAttribution().UtmSource, "google");
});

check("30 days: attribution older than 30 days is dropped", () => {
  const profile = new Map();
  loadUtm("?utm_source=google&utm_medium=cpc&gclid=GOLD", { local: profile, now: T0 }).captureAttribution();
  const later = loadUtm("", { local: profile, now: T0 + 31 * DAY });
  assert.deepStrictEqual({ ...later.getAttribution() }, {});
  assert.deepStrictEqual({ ...later.getSmartMovingAttribution() }, {});
  assert.strictEqual(profile.size, 0);
});

check("localStorage blocked: falls back to the session copy", () => {
  const utm = loadUtm("?gclid=GS", { local: null });
  utm.captureAttribution();
  utm.window.location.search = "";
  assert.strictEqual(utm.getAttribution().gclid, "GS");
});

check("box offer check stays per visit: a 30-day-old ad click does not qualify", () => {
  const profile = new Map();
  loadUtm("?gclid=GB", { local: profile, now: T0 }).captureAttribution();
  const later = loadUtm("", { local: profile, now: T0 + 3 * DAY });
  assert.strictEqual(later.getAttribution().gclid, "GB");
  assert.strictEqual(later.isGoogleAdsVisitor(), false);
});

check("isGoogleAdsVisitor: gclid, gbraid, google/cpc, and stored session qualify", () => {
  assert.strictEqual(loadUtm(CLEAN).isGoogleAdsVisitor(), true);
  assert.strictEqual(loadUtm(MANGLED).isGoogleAdsVisitor(), true);
  // Auto-tagged ads to the plain homepage arrive with ONLY a click id.
  assert.strictEqual(loadUtm("?gclid=test").isGoogleAdsVisitor(), true);
  assert.strictEqual(loadUtm("?gbraid=test").isGoogleAdsVisitor(), true);
  assert.strictEqual(loadUtm("?wbraid=test").isGoogleAdsVisitor(), true);
  assert.strictEqual(loadUtm("?utm_source=Google&utm_medium=CPC").isGoogleAdsVisitor(), true);
  const utm = loadUtm(CLEAN);
  utm.captureAttribution();
  utm.window.location.search = "";
  assert.strictEqual(utm.isGoogleAdsVisitor(), true);
});

check("isGoogleAdsVisitor: organic, direct, Meta, and SSR do not qualify", () => {
  assert.strictEqual(loadUtm("").isGoogleAdsVisitor(), false);
  assert.strictEqual(loadUtm("?utm_source=google&utm_medium=organic").isGoogleAdsVisitor(), false);
  assert.strictEqual(loadUtm("?utm_source=facebook&utm_medium=paid_social&fbclid=F").isGoogleAdsVisitor(), false);
  assert.strictEqual(loadUtm("?utm_source=bing&utm_medium=cpc&msclkid=M").isGoogleAdsVisitor(), false);
  assert.strictEqual(loadUtm().isGoogleAdsVisitor(), false);
});

if (failures) {
  console.error(`\ntest-utm: ${failures} case(s) failed`);
  process.exit(1);
}
console.log("test-utm: all cases passed");
