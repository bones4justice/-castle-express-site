import Link from "next/link";

export function parseInline(text) {
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g);
  return parts.map((part, j) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const href = linkMatch[2];
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      if (isExternal) {
        return <a key={j} href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#D4A017", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>{linkMatch[1]}</a>;
      }
      return <Link key={j} href={href} style={{ color: "#D4A017", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>{linkMatch[1]}</Link>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={j}>{part.replace(/\*\*/g, "")}</strong>;
    }
    return part;
  });
}
