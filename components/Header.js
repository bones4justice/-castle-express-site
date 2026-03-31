"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/content";
import { Phone, Menu, X } from "@/components/Icons";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
  { label: "Princess Packing™", href: "/princess-packing", pink: true },
  { label: "Referral Program", href: "/referral", gold: true },
  { label: "Contact", href: "/contact" },
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

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
      WebkitBackdropFilter: "blur(8px)",
      backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${scrolled ? "#E5E7EB" : "transparent"}`,
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/images/logo.jpg" alt="Castle Express Moving & Storage" style={{ height: 48, width: "auto" }} />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const color = item.pink ? "#F72585" : item.gold ? "#D4A017" : isActive ? "#D4A017" : "#1A1A2E";
            const fontWeight = (item.pink || item.gold) ? 700 : 600;
            return (
              <Link key={item.href} href={item.href} style={{
                fontFamily: "var(--font-heading)", fontWeight, fontSize: 14,
                color, padding: "8px 14px", borderRadius: 6, textDecoration: "none", transition: "color 0.2s",
              }}>{item.label}</Link>
            );
          })}
          <a href={COMPANY.phoneLink} style={{
            marginLeft: 8, display: "flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017",
            textDecoration: "none", padding: "10px 18px", background: "#FFF9EC", borderRadius: 8,
          }}>
            <Phone size={18} /> {COMPANY.phone}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", color: "#1A1A2E",
          alignItems: "center", justifyContent: "center",
        }}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="mobile-nav" style={{ padding: "8px 24px 20px", borderTop: "1px solid #E5E7EB" }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: "block", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16,
              color: pathname === item.href ? "#D4A017" : "#1A1A2E",
              padding: "12px 0", borderBottom: "1px solid #E5E7EB", textDecoration: "none",
            }}>{item.label}</Link>
          ))}
          <a href={COMPANY.phoneLink} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12,
            fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#fff",
            textDecoration: "none", padding: "14px", background: "#D4A017", borderRadius: 8,
          }}>
            <Phone size={18} /> Call {COMPANY.phone}
          </a>
        </div>
      )}
    </header>
  );
}
