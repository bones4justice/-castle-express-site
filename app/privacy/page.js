import { COMPANY } from "@/content";

export const metadata = {
  title: "Privacy Policy",
  description: "Castle Express Moving & Storage privacy policy. How we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center" }}>
        <h1 className="heading-2 text-white">Privacy Policy</h1>
        <p className="body-md text-white-muted" style={{ marginTop: 8 }}>Last updated: February 2026</p>
      </section>

      <section className="section" style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Information We Collect</h2>
          <p style={{ marginBottom: 24 }}>
            When you request an estimate, contact us, or use our services, we may collect your name, email address,
            phone number, moving addresses, and move details. We collect this information to provide you with accurate
            estimates and quality moving services.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>How We Use Your Information</h2>
          <p style={{ marginBottom: 24 }}>
            We use your personal information to: provide moving estimates and services, communicate with you about your
            move, improve our services, and send relevant updates (with your consent). We do not sell your personal
            information to third parties.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Data Protection</h2>
          <p style={{ marginBottom: 24 }}>
            We implement industry-standard security measures to protect your personal information. Access to your data
            is limited to employees who need it to perform their job functions.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Cookies</h2>
          <p style={{ marginBottom: 24 }}>
            Our website uses cookies to improve your browsing experience and analyze site traffic. You can control
            cookie settings through your browser preferences.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Third-Party Services</h2>
          <p style={{ marginBottom: 24 }}>
            We use third-party services including Google Analytics, Formspree (for contact forms), and Elfsight (for
            reviews display). These services may collect data according to their own privacy policies.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Contact Us</h2>
          <p>
            If you have questions about this privacy policy, contact us at{" "}
            <a href={`tel:${COMPANY.phone}`} style={{ color: "#D4A017", fontWeight: 600 }}>{COMPANY.phone}</a> or
            visit us at {COMPANY.address}, {COMPANY.city}, {COMPANY.state} {COMPANY.zip}.
          </p>
        </div>
      </section>
    </>
  );
}
