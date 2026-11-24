import Link from "next/link";
import { getAllPosts } from "@/lib/blogData";
import { ArrowRight } from "@/components/Icons";
import { InteriorHero, HeroActions, EstimateBand } from "@/components/InteriorKit";

export const metadata = {
  title: "Moving Tips & Local Guides | Castle Express Moving",
  description: "Moving tips, local guides, and honest advice from Joe Caronna, owner of Castle Express Moving & Storage in Enfield, CT since 2011.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="ip">
      <InteriorHero
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow="Moving Tips & Guides"
        title="Straight Talk on Moving"
        actions={<HeroActions />}
      >
        <p>
          Honest advice, local pricing guides, and moving-day checklists from Joe Caronna, owner of Castle Express Moving &amp; Storage since 2011.
        </p>
      </InteriorHero>

      <section className="section section-light ip-blog-section">
        <div className="container" style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="ip-blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} className="ip-blog-link">
                <article className="ip-card ip-blog-card">
                  <span className="ip-blog-cat">{post.category}</span>
                  <h2 className="ip-blog-title">{post.title}</h2>
                  <p className="ip-blog-excerpt">{post.excerpt}</p>
                  <div className="ip-blog-meta">
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                      {" · "}
                      {post.readTime}
                    </span>
                    <span className="ip-blog-more">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EstimateBand
        eyebrow="Ready to Move?"
        title="Ready to Get Moving?"
        buttonLabel={<>Get Free Estimate <ArrowRight /></>}
      >
        Call us or get a free estimate online. We typically respond in 20 minutes or less.
      </EstimateBand>
    </div>
  );
}
