// Scroll to the estimate form and focus its first visible field (on phones
// in step 2 that is the first step 2 field). Used by the hero "Get Free
// Estimate" button and the mobile sticky bar. Returns false when there is no
// form on the page so callers can fall back to a normal link.
export function scrollToEstimate() {
  if (typeof document === "undefined") return false;
  const form = document.getElementById("estimate-form");
  if (!form) {
    // Thank-you screen replaced the form: just bring it into view.
    const wrap = document.querySelector(".hero-form");
    if (wrap) { wrap.scrollIntoView({ behavior: "smooth", block: "start" }); return true; }
    return false;
  }
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  const first = Array.from(form.querySelectorAll("input, select")).find(
    (el) => el.type !== "hidden" && el.tabIndex !== -1 && el.offsetParent !== null
  );
  if (first) {
    try { first.focus({ preventScroll: true }); } catch { first.focus(); }
  }
  return true;
}
