// Homepage hero A/B test (lib/abtest.js), applied before first paint so the
// right background image and headline show from the start (no swap after the
// JS loads, which was costing mobile LCP). Inlined in app/layout.js <head> so
// the image preload starts as early as possible; it is a no-op on every page
// except "/". Same rule as getHeroVariant(): reuse the hero_ab_test cookie,
// or assign A/B 50/50 and set it for 30 days. getHeroVariant() then finds the
// cookie and the hero_ab_test exposure event fires as before.
// Runs inline before the hero paints. Keep the assignment rule identical to
// getHeroVariant() in lib/abtest.js (cookie hero_ab_test, 50/50, 30 days).
// It only adds html[data-hero] (picks the CSS background + headline) and a
// preload for that one background image, phone or desktop size.
// Nov 2026 redesign: both variants share one photo hero, so the preload is
// the redesign's desktop photo (phones show it below the form, not preloaded).
//
// allowOverride (Vercel PREVIEW builds only, never production): ?hero=A or
// ?hero=B shows that variant for inspection WITHOUT touching the visitor's
// cookie, and sets window.__heroOverride so HeroAbTracker skips the exposure
// event. On production the parameter is ignored entirely.
export function heroVariantScript({ allowOverride = false } = {}) {
  return `(function(){try{
if(location.pathname!=="/")return;
var d=document.documentElement,o=${allowOverride ? '(location.search.match(/[?&]hero=(A|B)(?:&|$)/)||[])[1]' : 'null'};
if(o){window.__heroOverride=o;d.setAttribute("data-hero",o);}else{
var v=null,c=document.cookie.split(";");
for(var i=0;i<c.length;i++){var p=c[i].trim().split("=");if(p[0]==="hero_ab_test"){v=p[1];break;}}
if(v===null){v=Math.random()<0.5?"A":"B";var e=new Date();e.setDate(e.getDate()+30);
document.cookie="hero_ab_test="+v+";expires="+e.toUTCString()+";path=/;SameSite=Lax";}
d.setAttribute("data-hero",v==="B"?"B":"A");}
var l=document.createElement("link");l.rel="preload";l.as="image";l.media="(min-width: 769px)";
l.setAttribute("imagesrcset","/images/hero-real-wide-800.webp 800w, /images/hero-real-wide-1346.webp 1346w");
l.setAttribute("imagesizes","(min-width: 1288px) 800px, (min-width: 1200px) calc(100vw - 488px), (min-width: 1024px) calc(120vw - 586px), (min-width: 769px) 720px, 100vw");
l.setAttribute("fetchpriority","high");document.head.appendChild(l);
}catch(_){document.documentElement.setAttribute("data-hero","A");}})();`;
}
