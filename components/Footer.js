import Link from "next/link";
import { COMPANY } from "@/content";
import { Shield } from "@/components/Icons";

export default function Footer() {
  return (
    <footer style={{ background: "#1A1A2E", color: "#fff", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/images/logo.png" alt="Castle Express" style={{ height: 40, width: "auto", filter: "brightness(0) invert(1)" }} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              Family-owned & operated since {COMPANY.founded}. Serving Hartford County, CT and Western Massachusetts with professional moving, packing, and climate-controlled storage.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Services</h4>
            {["Residential Moving", "Commercial Moving", "Packing Services", "Climate-Controlled Storage", "Specialty Moving"].map(s => (
              <Link key={s} href="/services" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, textDecoration: "none" }}>{s}</Link>
            ))}
            <a href="/princess-packing.html" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "#F72585", fontWeight: 600, marginBottom: 8, textDecoration: "none", marginTop: 4 }}>Princess Packing™</a>
            <Link href="/referral" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, textDecoration: "none" }}>Referral Program</Link>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact</h4>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2 }}>
              <div>{COMPANY.address}</div>
              <div>{COMPANY.city}, {COMPANY.state} {COMPANY.zip}</div>
              <a href={COMPANY.phoneLink} style={{ display: "block", color: "#D4A017", fontWeight: 600, marginTop: 4, textDecoration: "none" }}>{COMPANY.phone}</a>
              <div style={{ marginTop: 4 }}>{COMPANY.hours}</div>
            </div>
          </div>

          {/* Licensing */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#D4A017", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Licensing</h4>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
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
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            &copy; {COMPANY.founded}–{new Date().getFullYear()} {COMPANY.name} LLC. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/privacy" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
