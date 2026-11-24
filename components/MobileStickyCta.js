"use client";
import { useEffect, useState } from "react";
import { COMPANY } from "@/content";
import { Phone, ArrowRight } from "@/components/Icons";
import { scrollToEstimate } from "@/lib/scrollToEstimate";

// Homepage, phones only (CSS shows it at <=768px): Call + Get Free Estimate.
// Hidden while the estimate form (or its thank-you screen) is on screen so it
// never covers the submit button. While mounted it adds body.has-mobile-sticky,
// which hides the storage offer banner on phones (globals.css); the banner
// also skips itself on the homepage on phones (StorageStickyBar.js).
// click_phone: the Call link is a plain tel: link, so the one sitewide
// listener in app/layout.js tracks it like every other phone link.
export default function MobileStickyCta() {
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add("has-mobile-sticky");
    // The redesigned hero lays .hero-form out as display:contents on phones
    // (no box, so it never "intersects"); watch the card itself there.
    const target = document.querySelector(".hv2-card") || document.querySelector(".hero-form");
    let io;
    if (target && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0 });
      io.observe(target);
    } else {
      setFormVisible(false);
    }
    return () => {
      document.body.classList.remove("has-mobile-sticky");
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div className="mobile-sticky-cta" data-hidden={formVisible ? "true" : "false"} aria-hidden={formVisible ? "true" : undefined}>
      <a href={COMPANY.phoneLink} className="msc-call" tabIndex={formVisible ? -1 : undefined} aria-label={`Call Castle Express at ${COMPANY.phone}`}>
        <Phone size={18} /> Call
      </a>
      <a href="#estimate-form" className="msc-estimate" tabIndex={formVisible ? -1 : undefined}
        onClick={(e) => { if (scrollToEstimate()) e.preventDefault(); }}>
        Get Free Estimate <ArrowRight />
      </a>
    </div>
  );
}
