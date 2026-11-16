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
export const HERO_VARIANT_SCRIPT = `(function(){try{
if(location.pathname!=="/")return;
var v=null,c=document.cookie.split(";");
for(var i=0;i<c.length;i++){var p=c[i].trim().split("=");if(p[0]==="hero_ab_test"){v=p[1];break;}}
if(v===null){v=Math.random()<0.5?"A":"B";var e=new Date();e.setDate(e.getDate()+30);
document.cookie="hero_ab_test="+v+";expires="+e.toUTCString()+";path=/;SameSite=Lax";}
var h=v==="B"?"B":"A",d=document.documentElement;d.setAttribute("data-hero",h);
var n=h.toLowerCase(),add=function(href,media){var l=document.createElement("link");l.rel="preload";l.as="image";l.href=href;l.media=media;l.setAttribute("fetchpriority","high");document.head.appendChild(l);};
add("/images/hero-"+n+"-mobile.webp","(max-width: 768px)");add("/images/hero-"+n+"-desktop.webp","(min-width: 769px)");
}catch(_){document.documentElement.setAttribute("data-hero","A");}})();`;

