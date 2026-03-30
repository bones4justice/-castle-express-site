import Link from "next/link";
import { COMPANY } from "@/content";
import { Shield } from "@/components/Icons";
import { IconFacebook, IconInstagram, IconTikTok, IconLinkedIn } from "@/components/BrandIcons";

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
                <IconTikTok size={40} />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/joseph-caronna-767a616" label="LinkedIn">
                <IconLinkedIn size={40} />
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
