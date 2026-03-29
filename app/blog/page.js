import Link from "next/link";
import { getAllPosts } from "@/lib/blogData";
import { COMPANY } from "@/content";
import { Phone } from "@/components/Icons";

export const metadata = {
  title: "Moving Tips & Local Guides | Castle Express Moving",
  description: "Moving tips, local guides, and honest advice from Joe Caronna - owner of Castle Express Moving & Storage in Enfield, CT since 2013.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      {/* Hero */}
      <section className="section-dark" style={{ padding: "72px 0 48px" }}>
        <div className="container" style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}><span style={{ color: "#FBCB0B" }}>Moving Tips & Guides</span></div>
          <h1 className="heading-1" style={{ marginTop: 16, color: "#FFFFFF" }}>
            Straight Talk on Moving
          </h1>
          <p className="body-lg text-white-muted" style={{ marginTop: 16 }}>
            Honest advice from Joe Caronna - owner of Castle Express Moving &amp; Storage since 2013.
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 32,
          }}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} style={{ textDecoration: "none" }}>
                <div className="card" style={{
                  padding: 28,
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.2s",
                  cursor: "pointer",
                }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#D4A017",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                    display: "block",
                  }}>{post.category}</span>
                  <h2 style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 12,
                    color: "#1A1A2E",
                    lineHeight: 1.4,
                  }}>{post.title}</h2>
                  <p className="body-sm" style={{
                    color: "#6B7280",
                    marginBottom: 16,
                    flex: 1,
                    lineHeight: 1.6,
                  }}>{post.excerpt}</p>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #F3F4F6",
                    paddingTop: 12,
                    marginTop: "auto",
                  }}>
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>
                      {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark text-center">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="heading-2 text-white">Ready to Get Moving?</h2>
          <p className="body-md text-white-muted" style={{ marginBottom: 28 }}>
            Call us or get a free estimate online. We typically respond in 20 minutes or less.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Get Free Estimate</Link>
            <a href={COMPANY.phoneLink} className="btn btn-white"><Phone size={18} /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
