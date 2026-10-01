"use client";
import { usePathname } from "next/navigation";

// Hides the sitewide chrome (Header, Footer) on ad-only landing routes so those
// pages have no nav to wander off through. The wrapped children are still
// server-rendered everywhere else. StorageStickyBar already self-hides on any
// path outside its allow-list, so it needs no gating here.
const BARE_ROUTES = new Set(["/free-estimate"]);

export default function ChromeGate({ children }) {
  const pathname = usePathname() || "";
  // Normalize the trailing slash: the site runs trailingSlash:true, so the
  // live path is "/free-estimate/", but a bare "/free-estimate" is possible too.
  const normalized = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  if (BARE_ROUTES.has(normalized)) return null;
  return children;
}
