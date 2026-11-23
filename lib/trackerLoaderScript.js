// Third-party tag loader, inlined in <head> by app/layout.js.
//
// Two jobs:
//
// 1. HOST GATE. Tags load only on the real site. Preview deployments
//    (*.vercel.app) and localhost used to send page views, test leads and
//    A/B events into the production GA4 property (7 of the 23 generate_lead
//    events in the week of Nov 16 2026 came from previews and localhost).
//    On any other host nothing is loaded; window.gtag stays defined as a
//    harmless shim so the forms run unchanged.
//
// 2. LOAD TIMING. On a phone these tags were ~80% of the main-thread
//    blocking during page load (Google tag ~1.7 s, Meta ~1.2 s, Clarity and
//    OpenAI ~0.3 s in a local Lighthouse run). None of them is needed to
//    read the page or start the estimate form, so:
//      - GA4 loads right away for every visitor, exactly as before, so
//        page views and short visits are counted the same as always
//        (Joe, 2026-11-23);
//      - Meta, Clarity and OpenAI wait for the first tap / key press /
//        scroll, or DEFER_MS after the page finishes loading, whichever
//        comes first (Meta loads at page load on a Meta ad click);
//      - Tag Manager waits the same way on a visit WITHOUT ad or campaign
//        tags. On a visit WITH them (gclid, utm_*, fbclid ...) it loads
//        right away, exactly as before, because Google's tags read the
//        click id from the landing URL and a late load could lose it. Do
//        not defer it for ad visits.
//    The dataLayer and the fbq / oaiq / clarity queues are created up front,
//    so an event sent before a tag has loaded is queued, not lost.
//
// GA4 (G-97Z4EHJM63) is loaded here and only here. The GTM container must not
// contain a Google tag for G-97Z4EHJM63 (it was paused Oct 2026); if one is
// added back, every page view will count twice. GTM still owns the Google Ads
// tag, the call tracking, and the generate_lead conversion trigger, which
// reads the gtag() pushes, so the dataLayer shim is defined for every
// visitor, bot or not.
//
// Speed testing a preview: add ?ce_trackers=on to a *.vercel.app or localhost
// URL to load the tags there too. GA4 hits sent that way are marked
// traffic_type=internal. Has no effect on the real site.
//
// Plain ES5 on purpose: it runs before anything else and must never throw.

export const PROD_HOST = "www.castleexpressmoving.com";
export const DEFER_MS = 3500;

export const TRACKER_LOADER_SCRIPT = `
(function (w, d) {
  w.dataLayer = w.dataLayer || [];
  function gtag(){w.dataLayer.push(arguments);}
  w.gtag = w.gtag || gtag;

  var host = w.location.hostname;
  var search = w.location.search || '';
  var isProd = host === '${PROD_HOST}';
  var isTestHost = host === 'localhost' || /\\.vercel\\.app$/.test(host);
  var forced = !isProd && isTestHost && /[?&]ce_trackers=on(&|$)/.test(search);
  w.__ceTrackers = isProd ? 'on' : forced ? 'forced' : 'off';
  if (!isProd && !forced) return;

  // Data-center headless browsers (Moses Lake, Ashburn, Singapore, San Jose,
  // Des Moines) were ~200 GA4 "Direct" sessions a week. GA4 is not loaded
  // for them; the other tags load as usual.
  var ua = (w.navigator && w.navigator.userAgent) || '';
  var isBot = (w.navigator && w.navigator.webdriver === true)
    || ua.indexOf('HeadlessChrome') !== -1
    || /bot|crawler|spider|python-requests|curl/i.test(ua);

  var tagged = /[?&](gclid|gbraid|wbraid|fbclid|msclkid|utm_[a-z]+)=/i.test(search);
  var metaClick = /[?&]fbclid=/i.test(search);

  function inject(src) {
    var s = d.createElement('script');
    s.async = true;
    s.src = src;
    (d.head || d.documentElement).appendChild(s);
  }
  function once(fn) {
    var done = false;
    return function () { if (done) return; done = true; try { fn(); } catch (e) {} };
  }

  // Queues first: events sent before a library arrives are kept.
  if (!w.fbq) {
    // Phone taps: Tag Manager's "Pixel Lead" tag sends Meta a Contact on a
    // tel: link click, but only once Tag Manager is loaded, so a first tap
    // on the phone number used to be missed. The site now sends Contact
    // itself on every phone tap (app/layout.js); when Tag Manager's copy
    // arrives as well, the second one inside 2 seconds is dropped here.
    var lastContact = 0;
    var n = w.fbq = function () {
      if (arguments[0] === 'track' && arguments[1] === 'Contact') {
        var now = new Date().getTime();
        if (now - lastContact < 2000) return;
        lastContact = now;
      }
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!w._fbq) w._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    w.fbq('init', '1423378058969444');
    w.fbq('init', '893903650293022');
    w.fbq('track', 'PageView');
  }
  if (!w.oaiq) {
    var q = function () { q.q.push(arguments); };
    q.q = [];
    w.oaiq = q;
    w.oaiq('init', { pixelId: 'CPxY6DboesSjpsV4bFGcp4', debug: false });
  }
  if (!w.clarity) {
    w.clarity = function () { (w.clarity.q = w.clarity.q || []).push(arguments); };
    var hv = (d.cookie.match(/hero_ab_test=([^;]+)/) || [])[1] || 'unknown';
    w.clarity('set', 'hero_variant', hv);
  }

  var loadGtm = once(function () {
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    inject('https://www.googletagmanager.com/gtm.js?id=GTM-KLR2TQC');
  });
  var loadGa4 = once(function () {
    if (isBot) return;
    gtag('js', new Date());
    if (forced) gtag('config', 'G-97Z4EHJM63', { traffic_type: 'internal' });
    else gtag('config', 'G-97Z4EHJM63');
    inject('https://www.googletagmanager.com/gtag/js?id=G-97Z4EHJM63');
  });
  var loadMeta = once(function () { inject('https://connect.facebook.net/en_US/fbevents.js'); });
  var loadOpenAi = once(function () { inject('https://bzrcdn.openai.com/sdk/oaiq.min.js'); });
  var loadClarity = once(function () { inject('https://www.clarity.ms/tag/wcqd0mksz9'); });

  // Everything, spaced out so the tags do not all run in one long burst.
  var loadAll = once(function () {
    loadGtm();
    loadGa4();
    w.setTimeout(loadMeta, 600);
    w.setTimeout(loadClarity, 1200);
    w.setTimeout(loadOpenAi, 1800);
  });

  function afterLoad(fn) {
    if (d.readyState === 'complete') fn();
    else w.addEventListener('load', fn, { once: true });
  }

  loadGa4();
  if (tagged) {
    loadGtm();
    if (metaClick) afterLoad(loadMeta);
  }

  var events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
  function onFirstAction() {
    for (var i = 0; i < events.length; i++) w.removeEventListener(events[i], onFirstAction, true);
    loadAll();
  }
  for (var i = 0; i < events.length; i++) w.addEventListener(events[i], onFirstAction, { capture: true, passive: true });
  afterLoad(function () { w.setTimeout(loadAll, ${DEFER_MS}); });
})(window, document);
`;
