import Link from "next/link";
import { COMPANY } from "@/content";
import { Shield } from "@/components/Icons";
import { IconFacebook, IconInstagram } from "@/components/BrandIcons";

function SocialLink({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "opacity 0.2s", opacity: 0.85 }}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#1A1A2E", color: "#fff", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/images/logo.jpg" alt="Castle Express" style={{ height: 40, width: "auto", background: "#fff", padding: "6px 10px", borderRadius: "8px" }} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 16 }}>
              Family-owned & operated since {COMPANY.founded}. Serving Hartford County, CT and Western Massachusetts with professional moving, packing, and climate-controlled storage.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <SocialLink href="https://www.facebook.com/cemoving" label="Facebook">
                <IconFacebook size={40} />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/castleexpressmovingandstorage/" label="Instagram">
                <IconInstagram size={40} />
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@castleexpressmovi" label="TikTok">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/joseph-caronna-767a616" label="LinkedIn">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </SocialLink>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Services</h4>
            {[
              { label: "Residential Moving", href: "/services/residential-moving" },
              { label: "Commercial Moving", href: "/services/commercial-moving" },
              { label: "Packing Services", href: "/services/packing-services" },
              { label: "Climate-Controlled Storage", href: "/services/storage" },
              { label: "Specialty Moving", href: "/services/specialty-moving" },
            ].map(s => (
              <Link key={s.href} href={s.href} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 8, textDecoration: "none" }}>{s.label}</Link>
            ))}
            <a href="/princess-packing.html" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "#F72585", fontWeight: 600, marginBottom: 8, textDecoration: "none", marginTop: 4 }}>Princess Packing™</a>
            <Link href="/referral" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "#D4A017", fontWeight: 600, marginBottom: 8, textDecoration: "none" }}>Referral Program</Link>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact</h4>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 2 }}>
              <div>{COMPANY.address}</div>
              <div>{COMPANY.city}, {COMPANY.state} {COMPANY.zip}</div>
              <a href={COMPANY.phoneLink} style={{ display: "block", color: "#D4A017", fontWeight: 600, marginTop: 4, textDecoration: "none" }}>{COMPANY.phone}</a>
              <div style={{ marginTop: 4 }}>{COMPANY.hours}</div>
            </div>
          </div>

          {/* Licensing */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Licensing</h4>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 2 }}>
              <div>{COMPANY.mc}</div>
              <div>USDOT {COMPANY.usdot}</div>
              <div>CT Permit {COMPANY.ctPermit}</div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, color: "#D4A017" }}>
                <Shield size={18} /> <span style={{ fontWeight: 600 }}>A+ BBB Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
            &copy; {COMPANY.founded}–{new Date().getFullYear()} {COMPANY.name} LLC. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/privacy" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
