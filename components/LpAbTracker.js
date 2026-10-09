"use client";
import { useEffect } from "react";
import { readVariantCookie } from "@/lib/lpAbTest";

// Reports the landing page split test variant to GA4 once per session, so
// variant exposure can be compared against generate_lead counts. Only
// visitors the middleware put in the test have the lp_ab cookie; everyone
// else fires nothing. If gtag is not ready yet (hydration can beat the
// afterInteractive analytics script), skip WITHOUT setting the session flag
// so the next full page load reports it.
export default function LpAbTracker() {
  useEffect(() => {
    try {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      const variant = readVariantCookie(document.cookie);
      if (!variant) return;
      if (window.sessionStorage.getItem("lp_ab_reported")) return;
      if (typeof window.gtag !== "function") return;
      window.gtag("event", "lp_ab_test", { lp_variant: variant });
      window.sessionStorage.setItem("lp_ab_reported", "1");
    } catch {}
  }, []);
  return null;
}
