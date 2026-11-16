"use client";
import { useEffect } from "react";
import { getHeroVariant, trackHeroVariant } from "@/lib/abtest";

// Homepage hero A/B exposure event, unchanged from when app/page.js was a
// client component: getHeroVariant() reads the hero_ab_test cookie (set by
// the inline script in app/page.js, or assigns it here if that could not
// run) and trackHeroVariant() fires the hero_ab_test event.
export default function HeroAbTracker() {
  useEffect(() => {
    const variant = getHeroVariant();
    // On in-app navigation to "/" the inline script does not run, so make
    // sure the page shows the variant the visitor is assigned to.
    document.documentElement.setAttribute("data-hero", variant === "B" ? "B" : "A");
    trackHeroVariant(variant);
  }, []);
  return null;
}
