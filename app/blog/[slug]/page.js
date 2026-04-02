import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blogData";
import { notFound } from "next/navigation";
import { COMPANY } from "@/content";
import { Phone } from "@/components/Icons";

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: post.canonical },
  };
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Parse inline markdown: [text](/url) links and **bold** text
  const parseInline = (text) => {
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g);
    return parts.map((part, j) => {
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return <Link key={j} href={linkMatch[2]} style={{ color: "#D4A017", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>{linkMatch[1]}</Link>;
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.replace(/\*\*/g, "")}</strong>;
      }
      return part;
    });
  };

  const renderBody = (body) => {
    return body
      .trim()
      .split("\n\n")
      .map((block, i) => {
        if (block.startsWith("## ")) {
          return <h2 key={i} style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 22,
            color: "#1A1A2E",
            marginTop: 36,
            marginBottom: 12,
          }}>{block.replace("## ", "")}</h2>;
        }
        if (block.startsWith("**") && block.endsWith("**")) {
          return <p key={i} style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>
            {block.replace(/\*\*/g, "")}
          </p>;
        }
        return <p key={i} className="body-md" style={{
          color: "#374151",
          lineHeight: 1.8,
          marginBottom: 16,
        }}>{parseInline(block)}</p>;
      });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: "Joe Caronna",
      url: "https://www.castleexpressmoving.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Castle Express Moving & Storage",
      logo: {
        "@type": "ImageObject",
        url: "https://www.castleexpressmoving.com/images/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.castleexpressmoving.com/blog/${post.slug}/`,
    },
    image: "https://www.castleexpressmoving.com/images/truck-residential.jpg",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="section-dark" style={{ padding: "64px 0 48px" }}>
        <div className="container" style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ marginBottom: 12 }}>
            <Link href="/blog" style={{
              color: "#D4A017",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}>&larr; Back to Blog</Link>
          </div>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#FBCB0B",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 16,
          }}>{post.category}</span>
          <h1 className="heading-1" style={{ fontSize: "clamp(24px, 3.5vw, 32px)", lineHeight: 1.3, color: "#FFFFFF" }}>{post.title}</h1>
          <div style={{
            display: "flex",
            gap: 16,
            marginTop: 20,
            color: "rgba(255,255,255,0.8)",
            fontSize: 14,
            flexWrap: "wrap",
          }}>
            <span>By Joe Caronna</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric"
            })}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: 720, margin: "0 auto" }}>
          <article style={{ paddingBottom: 48 }}>
            {renderBody(post.body)}
          </article>

          {/* CTA Card */}
          <div style={{
            background: "#1A1A2E",
            borderRadius: 12,
            padding: "32px 36px",
            marginTop: 48,
            textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 22,
              color: "#fff",
              marginBottom: 12,
            }}>Ready to Get Moving?</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 24, fontSize: 15 }}>
              Castle Express Moving &amp; Storage - Enfield, CT. Serving Hartford County and Western MA since 2013.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">Get Free Estimate</Link>
              <a href={COMPANY.phoneLink} className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
                <Phone size={18} /> {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* YOU MIGHT ALSO LIKE */}
      {(() => {
        const allPosts = getAllPosts();
        const related = allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
        if (related.length === 0) return null;
        return (
          <section className="section section-light">
            <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#1A1A2E", marginBottom: 24, textAlign: "center" }}>You Might Also Like</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
                {related.map(r => (
                  <Link key={r.slug} href={`/blog/${r.slug}/`} style={{ textDecoration: "none" }}>
                    <div className="card" style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#D4A017", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, display: "block" }}>{r.category}</span>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#1A1A2E", marginBottom: 10, lineHeight: 1.4 }}>{r.title}</h3>
                      <p className="body-sm text-gray" style={{ lineHeight: 1.5, flex: 1 }}>{r.excerpt}</p>
                      <span style={{ fontSize: 13, color: "#9CA3AF", marginTop: 12 }}>{r.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}
    </>
  );
}
