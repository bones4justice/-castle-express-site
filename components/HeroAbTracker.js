"use client";
import { useEffect } from "react";
import { getHeroVariant, trackHeroVariant } from "@/lib/abtest";
import { HOME_DESIGN } from "@/lib/homeDesign";

// Homepage hero A/B exposure event, unchanged from when app/page.js was a
// client component: getHeroVariant() reads the hero_ab_test cookie (set by
// the inline script in app/layout.js, or assigns it here if that could not
// run) and trackHeroVariant() fires the hero_ab_test event, now tagged with
// home_design (lib/homeDesign.js).
//
// Preview-only ?hero=A|B inspection (window.__heroOverride, set by the inline
// script on Vercel preview builds only): show that variant, leave the cookie
// alone, and fire no exposure event.
export default function HeroAbTracker() {
  useEffect(() => {
    const override = window.__heroOverride;
    if (override === "A" || override === "B") {
      document.documentElement.setAttribute("data-hero", override);
      return;
    }
    const variant = getHeroVariant();
    // On in-app navigation to "/" the inline script does not run, so make
    // sure the page shows the variant the visitor is assigned to.
    document.documentElement.setAttribute("data-hero", variant === "B" ? "B" : "A");
    trackHeroVariant(variant, { home_design: HOME_DESIGN });
    try { if (typeof window.clarity === "function") window.clarity("set", "home_design", HOME_DESIGN); } catch {}
  }, []);
  return null;
}
