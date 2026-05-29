import { NextResponse } from "next/server";

// WordPress hack-scan probes (/wp-admin, /wp-content, /wp-login.php, ...) and a
// stale random-string spam path (/p5y7czn1/*) left over from the old Bluehost
// site. Return 410 Gone so Google de-indexes them faster than a soft 301 would.
// Legit old WordPress taxonomy (/tag/*, /category/*) is intentionally NOT here —
// those keep their 301s to /blog/ in next.config.js to preserve link equity.
export function middleware() {
  return new NextResponse("410 Gone", {
    status: 410,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  matcher: [
    "/wp-:path*", // single-segment probes: /wp-login.php, /wp-config.php, ...
    "/wp-admin/:path*",
    "/wp-content/:path*",
    "/wp-includes/:path*",
    "/p5y7czn1/:path*",
  ],
};
