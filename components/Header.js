"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/content";
import { Phone, Menu, X } from "@/components/Icons";

// Darker gold for header text: #D4A017 on white is 2.3:1, this is 5.4:1.
const GOLD_TEXT = "#8A6400";

const NAV_ITEMS = [
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Blog", href: "/blog/" },
  { label: "Princess Packing™", href: "/princess-packing/", gold: true },
  { label: "Referral Program", href: "/referral/", gold: true },
  { label: "Contact", href: "/contact/" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Escape closes the compact menu and returns focus to its button.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        document.querySelector(".mobile-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
      WebkitBackdropFilter: "blur(8px)",
      backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${scrolled ? "#E5E7EB" : "transparent"}`,
      transition: "all 0.3s ease",
    }}>
      <div className="site-header-row" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {/* Wordmark cropped to its ink (no white margin) so it can be read
              larger without a taller header. Height set in globals.css. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="site-logo" src="/images/logo-header-120.webp"
            srcSet="/images/logo-header-120.webp 251w, /images/logo-header-180.webp 377w"
            sizes="(max-width: 1199px) 105px, 126px"
            width={251} height={120} alt="Castle Express Moving & Storage" />
        </Link>

        {/* Mobile phone CTA - visible only on mobile, between logo and hamburger */}
        <a href={COMPANY.phoneLink} className="mobile-phone-cta" aria-label={`Call Castle Express at ${COMPANY.phone}`} style={{
          display: "none", alignItems: "center", gap: 6,
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: GOLD_TEXT,
          textDecoration: "none", padding: "8px 14px", background: "#FFF9EC", borderRadius: 8, marginLeft: "auto", marginRight: 8,
        }}>
          <Phone size={18} /> <span className="mpc-short">Call</span><span className="mpc-long">{COMPANY.phone}</span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {NAV_ITEMS.map(item => {
            const base = item.href.replace(/\/$/, "");
            const isActive = pathname === base || pathname.startsWith(base + "/");
            const color = item.gold ? GOLD_TEXT : isActive ? GOLD_TEXT : "#1A1A2E";
            const fontWeight = item.gold ? 700 : 600;
            const Tag = item.static ? "a" : Link;
            return (
              <Tag key={item.href} href={item.href} style={{
                fontFamily: "var(--font-heading)", fontWeight, fontSize: 14,
                color, padding: "8px 12px", borderRadius: 6, textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap",
              }}>{item.label}</Tag>
            );
          })}
          <a href={COMPANY.phoneLink} style={{
            marginLeft: 8, display: "flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: GOLD_TEXT,
            textDecoration: "none", padding: "10px 16px", background: "#FFF9EC", borderRadius: 8, whiteSpace: "nowrap",
          }}>
            <Phone size={18} /> {COMPANY.phone}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-nav" style={{
          display: "none", background: "none", border: "none", cursor: "pointer", color: "#1A1A2E",
          alignItems: "center", justifyContent: "center",
        }}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav id="mobile-nav" className="mobile-nav" style={{ padding: "8px 24px 20px", borderTop: "1px solid #E5E7EB" }}>
          {NAV_ITEMS.map(item => {
            const MobileTag = item.static ? "a" : Link;
            return (
              <MobileTag key={item.href} href={item.href} style={{
                display: "block", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16,
                color: pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "") ? GOLD_TEXT : "#1A1A2E",
                padding: "12px 0", borderBottom: "1px solid #E5E7EB", textDecoration: "none",
              }}>{item.label}</MobileTag>
            );
          })}
          <a href={COMPANY.phoneLink} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12,
            fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E",
            textDecoration: "none", padding: "14px", background: "#FBCB0B", borderRadius: 8,
          }}>
            <Phone size={18} /> Call {COMPANY.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
