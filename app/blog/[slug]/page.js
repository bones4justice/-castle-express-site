import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blogData";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/Icons";
import { parseInline } from "@/lib/parseInline";
import imageDims from "@/lib/imageDims.json";
import { InteriorHero, EstimateBand } from "@/components/InteriorKit";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const shareImage = post.image || "/images/truck-residential.jpg";
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: post.canonical },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://www.castleexpressmoving.com/blog/${post.slug}/`,
      siteName: "Castle Express Moving & Storage",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images: [{ url: shareImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [shareImage],
    },
  };
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const renderBody = (body) => {
    const blocks = body.trim().split("\n\n");
    const firstImgIdx = blocks.findIndex((b) => /^!\[(.*?)\]\((.*?)\)$/.test(b));
    return blocks.map((block, i) => {
      const imgMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const dims = imageDims[imgMatch[2]];
        return (
          <img
            key={i}
            src={imgMatch[2]}
            alt={imgMatch[1]}
            width={dims?.w}
            height={dims?.h}
            loading={i === firstImgIdx ? "eager" : "lazy"}
            fetchPriority={i === firstImgIdx ? "high" : undefined}
            className="ip-blog-img"
          />
        );
      }
      if (block.startsWith("## ")) {
        return <h2 key={i} className="ip-blog-h2">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("### ")) {
        return <h3 key={i} className="ip-blog-h3">{block.replace("### ", "")}</h3>;
      }
      if (block === "---") {
        return <hr key={i} className="ip-blog-hr" />;
      }
      const lines = block.split("\n");
      if (lines.length > 1 && lines.some((l) => /^(- |\d+\. )/.test(l))) {
        const out = [];
        let items = null, ordered = false;
        const flush = () => {
          if (!items) return;
          const Tag = ordered ? "ol" : "ul";
          out.push(
            <Tag key={`${i}-${out.length}`} className="ip-blog-list">
              {items.map((it, j) => <li key={j}>{parseInline(it)}</li>)}
            </Tag>
          );
          items = null;
        };
        lines.forEach((l) => {
          const m = l.match(/^(- |(\d+)\. )(.*)$/);
          if (m) {
            const isOrdered = m[2] !== undefined;
            if (items && ordered !== isOrdered) flush();
            if (!items) { items = []; ordered = isOrdered; }
            items.push(m[3]);
          } else {
            flush();
            if (l.trim()) out.push(<p key={`${i}-${out.length}`} className="ip-blog-p">{parseInline(l)}</p>);
          }
        });
        flush();
        return <div key={i}>{out}</div>;
      }
      if (block.startsWith("**") && block.endsWith("**")) {
        return <p key={i} className="ip-blog-lead">{block.replace(/\*\*/g, "")}</p>;
      }
      return <p key={i} className="ip-blog-p">{parseInline(block)}</p>;
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
      url: "https://www.castleexpressmoving.com/about/",
    },
    publisher: {
      "@type": "Organization",
      name: "Castle Express Moving & Storage",
      logo: {
        "@type": "ImageObject",
        url: "https://www.castleexpressmoving.com/images/logo.jpg",
      },
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.castleexpressmoving.com/blog/${post.slug}/`,
    },
    image: post.image
      ? `https://www.castleexpressmoving.com${post.image}`
      : "https://www.castleexpressmoving.com/images/truck-residential.jpg",
  };

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="ip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <InteriorHero
        compact
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog/" },
          { label: post.category },
        ]}
        eyebrow={post.category}
        title={post.title}
      >
        <div className="ip-blog-byline">
          <span>By Joe Caronna</span>
          <span aria-hidden="true">·</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
      </InteriorHero>

      <section className="section ip-blog-post-section">
        <div className="container" style={{ maxWidth: 740, margin: "0 auto" }}>
          <div className="ip-blog-back-wrap">
            <Link href="/blog/" className="ip-blog-back">&larr; All Moving Guides</Link>
          </div>
          <article className="ip-blog-article">
            {renderBody(post.body)}
          </article>
        </div>
      </section>

      <EstimateBand
        eyebrow="Ready to Move?"
        title="Ready to Get Moving?"
        buttonLabel={<>Get Free Estimate <ArrowRight /></>}
      >
        Castle Express Moving &amp; Storage in Enfield, CT. Serving Hartford County and Western MA since 2011.
      </EstimateBand>

      {related.length > 0 && (
        <section className="section section-light ip-blog-related">
          <div className="container" style={{ maxWidth: 1080, margin: "0 auto" }}>
            <h2 className="ip-blog-related-title">You Might Also Like</h2>
            <div className="ip-blog-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}/`} className="ip-blog-link">
                  <article className="ip-card ip-blog-card">
                    <span className="ip-blog-cat">{r.category}</span>
                    <h3 className="ip-blog-title">{r.title}</h3>
                    <p className="ip-blog-excerpt">{r.excerpt}</p>
                    <div className="ip-blog-meta">
                      <span>{r.readTime}</span>
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
      )}
    </div>
  );
}
