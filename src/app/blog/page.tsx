"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { posts } from "@/data/posts";
import Link from "next/link";

export default function BlogPage() {
  const { lang, t } = useLanguage();

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "#fff", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: "#d4af37", fontSize: 14, textDecoration: "none", marginBottom: 20, display: "inline-block" }}>
          ← {lang === "ru" ? "На главную" : "Home"}
        </a>
        <h1 style={{ color: "#d4af37", fontSize: 36, marginBottom: 10 }}>
          {lang === "ru" ? "Блог" : "Blog"}
        </h1>
        <p style={{ color: "#888", marginBottom: 40, fontSize: 16 }}>
          {lang === "ru"
            ? "Статьи, размышления и учения для духовного роста"
            : "Articles, reflections and teachings for spiritual growth"}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                backgroundColor: "#111", border: "1px solid #222", borderRadius: 12,
                padding: "25px", transition: "border-color 0.3s, transform 0.2s",
                cursor: "pointer"
              }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <span style={{
                    fontSize: 12, padding: "4px 10px", backgroundColor: "#d4af3715",
                    color: "#d4af37", borderRadius: 20, border: "1px solid #d4af3733"
                  }}>
                    {lang === "ru" ? post.categoryRu : post.categoryEn}
                  </span>
                  <span style={{ fontSize: 12, color: "#555", padding: "4px 0" }}>
                    {post.date} · {post.readTime}
                  </span>
                </div>
                <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 10 }}>
                  {lang === "ru" ? post.titleRu : post.titleEn}
                </h2>
                <p style={{ color: "#999", lineHeight: 1.7, fontSize: 14, margin: 0 }}>
                  {lang === "ru" ? post.excerptRu : post.excerptEn}
                </p>
                <div style={{ marginTop: 15, color: "#d4af37", fontSize: 13, fontWeight: "bold" }}>
                  {lang === "ru" ? "Читать далее →" : "Read more →"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}