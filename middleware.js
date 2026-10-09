import { NextResponse } from "next/server";
import {
  LP_AB_COOKIE,
  LP_AB_VARIANTS,
  isAdsTraffic,
  pickVariant,
  readVariantCookie,
  servicePathForCampaign,
} from "./lib/lpAbTest";
import { parseTrackedParams } from "./lib/utm";

// 50/50 landing page split test for Google Ads traffic on /free-estimate/.
// "landing" renders the page as-is; "service" 307-redirects to the matching
// service page with the ENTIRE original query string forwarded unchanged
// (gclid and utm tags must survive for attribution). Assignment sticks via
// the lp_ab cookie (30 days). Only Google Ads traffic (utm_source=google or
// a gclid/gbraid/wbraid) enters the test; everyone else gets the landing
// page untouched, no cookie. ?lp_ab=landing|service is a testing override.
// Must never throw: on any error the ad click still lands on the page.
const LP_AB_MAX_AGE = 60 * 60 * 24 * 30;

function lpAbMiddleware(request) {
  try {
    const search = request.nextUrl.search;
    if (!isAdsTraffic(search)) return NextResponse.next();

    const override = request.nextUrl.searchParams.get(LP_AB_COOKIE);
    let variant;
    let setCookie = false;
    if (LP_AB_VARIANTS.includes(override)) {
      variant = override;
      setCookie = true;
    } else {
      variant = readVariantCookie(request.headers.get("cookie"));
      if (!variant) {
        variant = pickVariant();
        setCookie = true;
      }
    }

    let response;
    if (variant === "service") {
      const dest = request.nextUrl.clone();
      dest.pathname = servicePathForCampaign(parseTrackedParams(search).utm_campaign);
      // dest keeps the original query string; do not add or drop params.
      response = NextResponse.redirect(dest, 307);
    } else {
      response = NextResponse.next();
    }
    if (setCookie) {
      response.cookies.set(LP_AB_COOKIE, variant, {
        path: "/",
        maxAge: LP_AB_MAX_AGE,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    return response;
  } catch {
    return NextResponse.next();
  }
}

// WordPress hack-scan probes (/wp-admin, /wp-content, /wp-login.php, ...) and a
// stale random-string spam path (/p5y7czn1/*) left over from the old Bluehost
// site. Return 410 Gone so Google de-indexes them faster than a soft 301 would.
// Legit old WordPress taxonomy (/tag/*, /category/*) is intentionally NOT here:
// those keep their 301s to /blog/ in next.config.js to preserve link equity.
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/free-estimate")) {
    return lpAbMiddleware(request);
  }
  return new NextResponse("410 Gone", {
    status: 410,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  matcher: [
    "/free-estimate",
    "/free-estimate/",
    "/wp-:path*", // single-segment probes: /wp-login.php, /wp-config.php, ...
    "/wp-admin/:path*",
    "/wp-content/:path*",
    "/wp-includes/:path*",
    "/p5y7czn1/:path*",
  ],
};
