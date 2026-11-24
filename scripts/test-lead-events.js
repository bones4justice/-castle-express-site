#!/usr/bin/env node
// Plain-node tests (no framework) for the two pieces that decide what GA4
// counts as a lead and where tags load. Runs in prebuild, so a regression
// fails the build instead of shipping.
//
//   lib/leadEvents.js          generate_lead: exactly once per accepted lead
//   lib/trackerLoaderScript.js tags load on the production host only, and
//                              late unless the visitor arrived on an ad link
//   source scan                no form sends generate_lead on its own again
//
// Both libs are ESM inside a CommonJS package, so they are evaluated in a vm
// sandbox with the "export " keywords stripped (same trick as test-utm.js).
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const ROOT = path.join(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const strip = (src) => src.replace(/^export /gm, "");

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

// ── lib/leadEvents.js ──
function loadLeadEvents({ withGtag = true } = {}) {
  const calls = [];
  const sandbox = { Set, String, window: {} };
  if (withGtag) sandbox.window.gtag = (...args) => calls.push(args);
  vm.createContext(sandbox);
  vm.runInContext(strip(read("lib/leadEvents.js")), sandbox);
  return { ...sandbox, calls };
}

check("generate_lead: one accepted submission sends one event, targeted at GA4", () => {
  const m = loadLeadEvents();
  assert.strictEqual(m.sendGenerateLead("sub-1", { event_label: "estimate_form" }), true);
  assert.strictEqual(m.calls.length, 1);
  const [kind, name, params] = m.calls[0];
  assert.strictEqual(kind, "event");
  assert.strictEqual(name, "generate_lead");
  assert.strictEqual(params.send_to, "G-97Z4EHJM63");
  assert.strictEqual(params.event_label, "estimate_form");
});

check("generate_lead: the same submission can never send it twice", () => {
  const m = loadLeadEvents();
  m.sendGenerateLead("sub-1", {});
  assert.strictEqual(m.sendGenerateLead("sub-1", {}), false);
  assert.strictEqual(m.sendGenerateLead("sub-1", { event_label: "other" }), false);
  assert.strictEqual(m.calls.length, 1);
});

check("generate_lead: two different leads send two events", () => {
  const m = loadLeadEvents();
  m.sendGenerateLead("sub-1", {});
  m.sendGenerateLead("sub-2", {});
  assert.strictEqual(m.calls.length, 2);
});

check("generate_lead: no submission id, no event; missing gtag never throws", () => {
  const m = loadLeadEvents();
  assert.strictEqual(m.sendGenerateLead("", {}), false);
  assert.strictEqual(m.sendGenerateLead(undefined, {}), false);
  assert.strictEqual(m.calls.length, 0);
  assert.strictEqual(loadLeadEvents({ withGtag: false }).sendGenerateLead("sub-1", {}), false);
});

// ── source scan: one sender only ──
// The three estimate forms must go through sendGenerateLead. The promo forms
// below still push it themselves (one push, after their own accepted
// submit); they are listed so any NEW sender has to be added here on purpose.
const ALLOWED_DIRECT_SENDERS = new Set([
  "lib/leadEvents.js",
  "app/postcards/PostcardForm.js",
  "app/referral/ReferralForm.js",
  "app/storage-offer/page.js",
  "app/princess-packing/PackingEstimateForm.js",
]);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${ent.name}`;
    if (ent.isDirectory()) walk(rel, out);
    else if (/\.(js|jsx|mjs)$/.test(ent.name)) out.push(rel);
  }
  return out;
}

check("source: only the listed files push generate_lead themselves", () => {
  const offenders = [];
  for (const rel of [...walk("app"), ...walk("components"), ...walk("lib")]) {
    // A push looks like gtag("event", "generate_lead" or track("generate_lead".
    if (/["']generate_lead["']/.test(read(rel).replace(/\/\/.*$/gm, "")) && !ALLOWED_DIRECT_SENDERS.has(rel))
      offenders.push(rel);
  }
  assert.deepStrictEqual(offenders, []);
});

check("source: each estimate form calls sendGenerateLead exactly once", () => {
  for (const rel of ["components/EstimateForm.js", "components/LandingEstimateForm.js", "components/StepEstimateForm.js"]) {
    const n = (read(rel).match(/sendGenerateLead\(/g) || []).length;
    assert.strictEqual(n, 1, `${rel}: ${n} calls`);
    assert.ok(/inFlight\.current = true/.test(read(rel)), `${rel}: no in-flight lock`);
  }
});

check("source: step buttons are not submit buttons", () => {
  // Intermediate "Continue" buttons in the inline step form (EstimateForm) and
  // /free-estimate (LandingEstimateForm) must be type="button" so they can
  // never submit the form or reach the lead code.
  for (const [rel, label] of [["components/EstimateForm.js", "Continue"], ["components/LandingEstimateForm.js", "Continue"]]) {
    const src = read(rel);
    const at = src.indexOf(label);
    assert.ok(at > 0, `${rel}: label "${label}" not found`);
    const open = src.lastIndexOf("<button", at);
    assert.ok(/type="button"/.test(src.slice(open, at)), `${rel}: "${label}" is not type="button"`);
  }
});

// ── lib/trackerLoaderScript.js ──
function loadTrackerModule() {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(strip(read("lib/trackerLoaderScript.js")), sandbox);
  return vm.runInContext("({ TRACKER_LOADER_SCRIPT, PROD_HOST, DEFER_MS })", sandbox);
}

// Minimal browser: records injected script URLs, listeners and timers.
function runLoader({ host, search = "", ua = "Mozilla/5.0 (iPhone) Safari", webdriver = false, readyState = "complete" }) {
  const { TRACKER_LOADER_SCRIPT } = loadTrackerModule();
  const injected = [];
  const listeners = {};
  const timers = [];
  const window = {
    location: { hostname: host, search },
    navigator: { userAgent: ua, webdriver },
    addEventListener: (type, fn) => { (listeners[type] = listeners[type] || []).push(fn); },
    removeEventListener: (type, fn) => { listeners[type] = (listeners[type] || []).filter((f) => f !== fn); },
    setTimeout: (fn, ms) => { timers.push({ fn, ms }); return timers.length; },
  };
  const document = {
    readyState,
    cookie: "",
    head: { appendChild: (el) => injected.push(el.src) },
    createElement: () => ({}),
  };
  const sandbox = { window, document, Date };
  vm.createContext(sandbox);
  vm.runInContext(TRACKER_LOADER_SCRIPT, sandbox);
  const fire = (type) => (listeners[type] || []).slice().forEach((fn) => fn());
  const runTimers = () => { while (timers.length) timers.shift().fn(); };
  const has = (needle) => injected.some((src) => src.includes(needle));
  return { window, injected, listeners, timers, fire, runTimers, has };
}

const PROD = "www.castleexpressmoving.com";

check("host gate: previews and localhost load no tags at all", () => {
  for (const host of ["castle-express-site-abc123.vercel.app", "castle-express-si-git-x-team.vercel.app", "localhost", "castleexpressmoving.com.evil.example"]) {
    const b = runLoader({ host, search: "?gclid=abc" });
    b.fire("pointerdown");
    b.runTimers();
    assert.deepStrictEqual(b.injected, [], host);
    assert.strictEqual(b.window.__ceTrackers, "off", host);
    assert.strictEqual(typeof b.window.gtag, "function", `${host}: gtag shim missing`);
    assert.strictEqual(b.window.fbq, undefined, host);
    assert.strictEqual(b.window.clarity, undefined, host);
  }
});

check("production, untagged visit: GA4 loads at once, everything else waits for the first tap", () => {
  const b = runLoader({ host: PROD });
  assert.strictEqual(b.injected.length, 1);
  assert.ok(b.has("gtag/js?id=G-97Z4EHJM63"));
  assert.strictEqual(typeof b.window.fbq, "function"); // queues exist from the start
  b.fire("pointerdown");
  assert.ok(b.has("gtm.js?id=GTM-KLR2TQC"));
  assert.ok(b.has("gtag/js?id=G-97Z4EHJM63"));
  b.runTimers();
  assert.ok(b.has("fbevents.js") && b.has("clarity.ms/tag/wcqd0mksz9") && b.has("oaiq.min.js"));
  assert.strictEqual(b.injected.length, 5, "each tag exactly once");
});

check("production, untagged visit with no interaction: loads after the delay", () => {
  const { DEFER_MS } = loadTrackerModule();
  const b = runLoader({ host: PROD });
  assert.strictEqual(b.timers.length, 1);
  assert.strictEqual(b.timers[0].ms, DEFER_MS);
  assert.ok(!b.has("gtm.js"), "Tag Manager must wait on an untagged visit");
  b.runTimers();
  assert.strictEqual(b.injected.length, 5);
  b.fire("scroll"); // a later interaction must not load anything twice
  b.runTimers();
  assert.strictEqual(b.injected.length, 5);
});

check("production, ad click: Tag Manager and GA4 load right away", () => {
  for (const search of ["?gclid=abc", "?utm_source=google&utm_medium=cpc", "?gbraid=x", "?wbraid=x"]) {
    const b = runLoader({ host: PROD, search });
    assert.ok(b.has("gtm.js?id=GTM-KLR2TQC"), search);
    assert.ok(b.has("gtag/js?id=G-97Z4EHJM63"), search);
    assert.ok(!b.has("fbevents.js"), `${search}: Meta should wait`);
    assert.ok(!b.has("clarity.ms"), `${search}: Clarity should wait`);
  }
  assert.ok(runLoader({ host: PROD, search: "?fbclid=F" }).has("fbevents.js"), "Meta click loads Meta");
});

check("production: a phone tap before Tag Manager loads is still queued for it", () => {
  // The site pushes click_phone to the dataLayer itself (app/layout.js), so
  // GA4 gets it directly and Tag Manager finds it in the queue when it loads.
  const b = runLoader({ host: PROD });
  b.window.gtag("event", "click_phone", { send_to: "G-97Z4EHJM63" });
  assert.ok(!b.has("gtm.js"));
  b.fire("pointerdown");
  const dl = Array.from(b.window.dataLayer);
  const tap = dl.findIndex((a) => a && a[0] === "event" && a[1] === "click_phone");
  const gtmStart = dl.findIndex((a) => a && a.event === "gtm.js");
  assert.ok(tap >= 0 && gtmStart > tap, "click_phone must already be in the dataLayer when Tag Manager starts");
  const layout = read("app/layout.js");
  assert.ok(/gtag\('event', 'click_phone'/.test(layout), "click_phone is no longer pushed by the site");
});

check("production: GA4 config is pushed once and only on production", () => {
  const b = runLoader({ host: PROD, search: "?gclid=abc" });
  b.fire("pointerdown");
  b.runTimers();
  const configs = Array.from(b.window.dataLayer).filter((a) => a && a[0] === "config");
  assert.strictEqual(configs.length, 1);
  assert.strictEqual(configs[0][1], "G-97Z4EHJM63");
  assert.strictEqual(configs[0][2], undefined);
  const gtmStarts = Array.from(b.window.dataLayer).filter((a) => a && a.event === "gtm.js");
  assert.strictEqual(gtmStarts.length, 1);
});

check("production: Meta Contact for a phone tap is sent once, even when Tag Manager sends its own", () => {
  const b = runLoader({ host: PROD });
  const contacts = () => Array.from(b.window.fbq.queue).filter((a) => a[0] === "track" && a[1] === "Contact").length;
  b.window.fbq("track", "Contact"); // the site, on the tap
  b.window.fbq("track", "Contact"); // Tag Manager's tag, a moment later
  assert.strictEqual(contacts(), 1);
  b.window.fbq("track", "Lead"); // other events are never dropped
  b.window.fbq("track", "Lead");
  assert.strictEqual(Array.from(b.window.fbq.queue).filter((a) => a[1] === "Lead").length, 2);
  assert.ok(/window\.fbq\('track', 'Contact'\)/.test(read("app/layout.js")), "site no longer sends Contact on phone taps");
});

check("production, headless bot: GA4 is skipped, other tags still load", () => {
  const b = runLoader({ host: PROD, webdriver: true });
  b.fire("pointerdown");
  b.runTimers();
  assert.ok(!b.has("gtag/js?id=G-97Z4EHJM63"));
  assert.ok(b.has("gtm.js?id=GTM-KLR2TQC"));
});

check("speed-test switch: ?ce_trackers=on works on a preview, marked internal; ignored elsewhere", () => {
  const b = runLoader({ host: "castle-express-site-abc123.vercel.app", search: "?ce_trackers=on" });
  b.runTimers();
  assert.strictEqual(b.window.__ceTrackers, "forced");
  assert.strictEqual(b.injected.length, 5);
  const config = Array.from(b.window.dataLayer).find((a) => a && a[0] === "config");
  assert.strictEqual(config[2].traffic_type, "internal");
  const other = runLoader({ host: "example.com", search: "?ce_trackers=on" });
  other.runTimers();
  assert.deepStrictEqual(other.injected, []);
});

check("layout: tags are loaded by the loader only", () => {
  const layout = read("app/layout.js");
  assert.ok(layout.includes("TRACKER_LOADER_SCRIPT"));
  for (const needle of ["gtm.js?id=", "gtag/js?id=", "fbevents.js", "clarity.ms/tag", "oaiq.min.js"])
    assert.ok(!layout.includes(needle), `app/layout.js loads ${needle} directly`);
});

if (failures) {
  console.error(`\ntest-lead-events: ${failures} case(s) failed`);
  process.exit(1);
}
console.log("test-lead-events: all cases passed");
