import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/content";
import { Phone, ArrowRight } from "@/components/Icons";

// Reusable pieces for interior pages (design v2). Styles: "INTERIOR PAGES v2"
// in app/globals.css. Wrap the page in <div className="ip"> so headings, body
// text and the estimate form pick up the homepage's sans-serif face.

// Page header: warm white band, breadcrumb, main heading, intro, optional
// buttons, and an optional real photo on the right (under the copy on phones,
// or hidden on phones with compact).
export function InteriorHero({ crumbs = [], eyebrow, title, children, actions, image, imageAlt = "", imagePosition, compact = false }) {
  return (
    <section className={`ip-hero${compact ? " ip-hero-compact" : ""}${image ? "" : " ip-hero-noimg"}`}>
      <div className="ip-hero-grid">
        <div className="ip-hero-copy">
          {crumbs.length > 0 && (
            <nav className="ip-crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={i}>
                  {i > 0 && <span className="ip-crumb-sep" aria-hidden="true">/</span>}
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <div className="ip-eyebrow">{eyebrow}</div>}
          <h1 className="ip-h1">{title}</h1>
          <div className="ip-hero-intro">{children}</div>
          {actions && <div className="ip-actions">{actions}</div>}
        </div>
        {image && (
          <div className="ip-hero-media">
            <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: "cover", objectPosition: imagePosition || "center" }} />
          </div>
        )}
      </div>
    </section>
  );
}

// The standard pair of header buttons (same destinations as the old headers).
export function HeroActions() {
  return (
    <>
      <Link href="/contact/" className="ip-btn ip-btn-primary">Get Free Estimate <ArrowRight /></Link>
      <a href={COMPANY.phoneLink} className="ip-btn ip-btn-outline"><Phone size={18} /> {COMPANY.phone}</a>
    </>
  );
}

// Closing estimate band: charcoal, yellow button, white phone button.
export function EstimateBand({ title, children, buttonLabel = "Get Your Free Estimate" }) {
  return (
    <section className="ip-cta">
      <div className="ip-cta-inner">
        <h2 className="ip-cta-title">{title}</h2>
        <p className="ip-cta-text">{children}</p>
        <div className="ip-actions ip-actions-center">
          <Link href="/contact/" className="ip-btn ip-btn-primary">{buttonLabel}</Link>
          <a href={COMPANY.phoneLink} className="ip-btn ip-btn-white"><Phone size={18} /> {COMPANY.phone}</a>
        </div>
      </div>
    </section>
  );
}
