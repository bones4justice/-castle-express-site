import { COMPANY } from "@/content";

export const metadata = {
  title: "Terms of Service",
  description: "Castle Express Moving & Storage terms of service. Terms and conditions for our moving, packing, and storage services.",
  alternates: { canonical: "/terms/" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <section className="section-dark" style={{ padding: "60px 24px", textAlign: "center" }}>
        <h1 className="heading-2 text-white">Terms of Service</h1>
        <p className="body-md text-white-muted" style={{ marginTop: 8 }}>Last updated: February 2026</p>
      </section>

      <section className="section" style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.8 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Services</h2>
          <p style={{ marginBottom: 24 }}>
            Castle Express Moving & Storage provides residential and commercial moving, packing, storage, and specialty
            moving services in Connecticut and Western Massachusetts. All services are subject to these terms and the
            specific terms outlined in your moving estimate and bill of lading.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Estimates & Pricing</h2>
          <p style={{ marginBottom: 24 }}>
            We provide detailed estimates based on the information you provide about your move. Final pricing may be
            adjusted if the actual move differs significantly from the estimate (e.g., additional items, access
            issues, or services not originally quoted). Any changes will be communicated before work begins.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Liability & Insurance</h2>
          <p style={{ marginBottom: 24 }}>
            Castle Express is fully licensed (MC-1377498, USDOT 4192498, CT Permit MH-2658) and insured. Basic
            valuation coverage is included with every move. Additional full-value protection is available upon request.
            Claims must be filed within 9 months of delivery per federal regulations.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Cancellation Policy</h2>
          <p style={{ marginBottom: 24 }}>
            Cancellations made 48 hours or more before your scheduled move date incur no charge. Cancellations within
            48 hours may be subject to a cancellation fee. Please contact us as soon as possible if your plans change.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Payment</h2>
          <p style={{ marginBottom: 24 }}>
            Payment is due upon completion of services unless otherwise agreed in writing. We accept cash, check, and
            major credit cards. A deposit may be required to secure your moving date.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Contact</h2>
          <p>
            Questions about these terms? Call us at{" "}
            <a href={`tel:${COMPANY.phone}`} style={{ color: "#D4A017", fontWeight: 600 }}>{COMPANY.phone}</a> or
            visit us at {COMPANY.address}, {COMPANY.city}, {COMPANY.state} {COMPANY.zip}.
          </p>
        </div>
      </section>
    </>
  );
}
