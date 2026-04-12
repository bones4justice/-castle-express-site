// A/B Test utility - cookie-based 50/50 split
// Returns 'A' or 'B' consistently for each visitor

export function getHeroVariant() {
  if (typeof window === "undefined") return "A"; // SSR default

  const cookieName = "hero_ab_test";

  // Check for existing cookie
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) return value;
  }

  // Assign random variant
  const variant = Math.random() < 0.5 ? "A" : "B";

  // Set cookie for 30 days
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  document.cookie = `${cookieName}=${variant};expires=${expires.toUTCString()};path=/;SameSite=Lax`;

  return variant;
}

export function trackHeroVariant(variant) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "hero_ab_test", {
      hero_variant: variant,
      event_category: "ab_test",
      event_label: `hero_version_${variant}`,
    });
  }
}
