"use client";
import { scrollToEstimate } from "@/lib/scrollToEstimate";

// A link to #estimate-form that smooth-scrolls to the form and focuses its
// first field (falls back to the plain anchor if there is no form).
export default function EstimateScrollButton({ className, style, children }) {
  return (
    <a href="#estimate-form" className={className} style={style}
      onClick={(e) => { if (scrollToEstimate()) e.preventDefault(); }}>
      {children}
    </a>
  );
}
