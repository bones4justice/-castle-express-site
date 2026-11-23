// Scroll to the estimate form and focus its first visible interactive control
// (an input/select on typed steps, or the first option card on tap steps).
// Used by "Get Free Estimate" buttons and the mobile sticky bar. Returns false
// when there is no form on the page so callers can fall back to a normal link.
export function scrollToEstimate() {
  if (typeof document === "undefined") return false;
  const form = document.getElementById("estimate-form");
  if (!form) {
    const wrap = document.querySelector(".hero-form");
    if (wrap) { wrap.scrollIntoView({ behavior: "smooth", block: "start" }); return true; }
    return false;
  }
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  const first = Array.from(form.querySelectorAll("input, select, button.isf-opt")).find(
    (el) => el.type !== "hidden" && el.tabIndex !== -1 && el.offsetParent !== null && !el.disabled
  );
  if (first) {
    try { first.focus({ preventScroll: true }); } catch { first.focus(); }
  }
  return true;
}
