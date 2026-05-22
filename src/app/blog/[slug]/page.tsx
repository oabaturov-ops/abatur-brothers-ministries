"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { posts } from "@/data/posts";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const { lang } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={{ backgroundColor: "#0a0a0a", color: "#fff", minHeight: "100vh", paddingTop: 120, textAlign: "center" }}>
        <h1 style={{ color: "#d4af37" }}>
          {lang === "ru" ? "Статья не найдена" : "Post not found"}
        </h1>
        <Link href="/blog" style={{ color: "#d4af37", marginTop: 20, display: "inline-block" }}>
          ← {lang === "ru" ? "Вернуться в блог" : "Back to blog"}
        </Link>
      </div>
    );
  }

  const title = lang === "ru" ? post.titleRu : post.titleEn;
  const content = lang === "ru" ? post.contentRu : post.contentEn;
  const category = lang === "ru" ? post.categoryRu : post.categoryEn;

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "#fff", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px" }}>
        {/* Back button */}
        <Link href="/blog" style={{
          color: "#d4af37", textDecoration: "none", fontSize: 14,
          display: "inline-block", marginBottom: 30
        }}>
          ← {lang === "ru" ? "Вернуться в блог" : "Back to blog"}
        </Link>

        {/* Category + Date */}
        <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
          <span style={{
            fontSize: 12, padding: "4px 10px", backgroundColor: "#d4af3715",
            color: "#d4af37", borderRadius: 20, border: "1px solid #d4af3733"
          }}>
            {category}
          </span>
          <span style={{ fontSize: 12, color: "#555", padding: "4px 0" }}>
            {post.date} · {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ color: "#fff", fontSize: 32, lineHeight: 1.3, marginBottom: 30 }}>
          {title}
        </h1>

        {/* Content */}
        <div style={{ color: "#ccc", lineHeight: 1.9, fontSize: 16 }}>
          {content.split("\n\n").map((paragraph, i) => (
            <p key={i} style={{ marginBottom: 20, margin: 0 }}>{paragraph}</p>
          ))}
        </div>

        {/* Share */}
        <div style={{
          marginTop: 50, paddingTop: 30, borderTop: "1px solid #222",
          display: "flex", gap: 15, flexWrap: "wrap"
        }}>
          <span style={{ color: "#888", fontSize: 14 }}>
            {lang === "ru" ? "Поделиться:" : "Share:"}
          </span>
          <a
            href={`https://t.me/share/url?url=abaturministry.org/blog/${slug}&text=${title}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px", backgroundColor: "#0088cc", color: "#fff",
              borderRadius: 6, textDecoration: "none", fontSize: 13
            }}
          >
            Telegram
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${title} - abaturministry.org/blog/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px", backgroundColor: "#25D366", color: "#fff",
              borderRadius: 6, textDecoration: "none", fontSize: 13
            }}
          >
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=abaturministry.org/blog/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px", backgroundColor: "#1877F2", color: "#fff",
              borderRadius: 6, textDecoration: "none", fontSize: 13
            }}
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}