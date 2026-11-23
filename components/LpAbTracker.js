"use client";
import { useEffect } from "react";
import { readVariantCookie } from "@/lib/lpAbTest";
import { readGeVariantCookie } from "@/lib/geAbTest";

// Reports the landing page split test variant to GA4 once per session, so
// variant exposure can be compared against generate_lead counts. Only
// visitors the middleware put in the test have the lp_ab cookie; everyone
// else fires nothing. If gtag is not ready yet (hydration can beat the
// afterInteractive analytics script), poll every 250 ms for up to 10 s
// rather than giving up, so lp_ab_test still fires on the first page view.
// The once-per-session flag is only set after the event actually fires.
export default function LpAbTracker() {
  useEffect(() => {
    try {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      // Same once-per-session exposure report for the /get-estimate/ vs
      // homepage test (ge_ab). Without it the "home" group had no exposure
      // event at all (the step form's step_view only fires for "form"), so
      // lead rates per group could not be computed.
      const pending = [
        ["lp_ab_test", "lp_variant", readVariantCookie(document.cookie), "lp_ab_reported"],
        ["ge_ab_test", "ge_variant", readGeVariantCookie(document.cookie), "ge_ab_reported"],
      ].filter(([, , variant, flag]) => variant && !window.sessionStorage.getItem(flag));
      if (pending.length === 0) return;

      const report = () => {
        if (typeof window.gtag !== "function") return false;
        // send_to is required for GA4: GTM claims untargeted gtag() pushes
        // and has no GA4 tag since container v35.
        for (const [eventName, param, variant, flag] of pending) {
          window.gtag("event", eventName, { [param]: variant, send_to: "G-97Z4EHJM63" });
          window.sessionStorage.setItem(flag, "1");
        }
        return true;
      };

      if (report()) return;

      let attempts = 0;
      const RETRY_MS = 250;
      const MAX_ATTEMPTS = 40; // 40 * 250ms = 10s
      const timer = window.setInterval(() => {
        attempts += 1;
        if (report() || attempts >= MAX_ATTEMPTS) {
          window.clearInterval(timer);
        }
      }, RETRY_MS);
      return () => window.clearInterval(timer);
    } catch {}
  }, []);
  return null;
}
