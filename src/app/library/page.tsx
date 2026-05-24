"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { books } from "@/data/books";

const categories = ["all", "prayer", "faith", "bible", "christianLife"] as const;

export default function Library() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = books.filter((book) => {
    const title = lang === "ru" ? book.titleRu : book.titleEn;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || book.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1a", color: "#fff" }}>
      {/* Заголовок */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "60px 20px 40px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: 36, marginBottom: 8, color: "#fbbf24" }}>
          📚 {t.library.title}
        </h1>
        <p style={{ color: "#9ca3af", fontSize: 16 }}>
          {t.library.subtitle}
        </p>
      </div>

      {/* Поиск */}
      <div style={{ maxWidth: 500, margin: "0 auto 20px", padding: "0 20px" }}>
        <input
          type="text"
          placeholder={t.library.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "12px 18px", borderRadius: 10,
            border: "1px solid #1e2d3d", backgroundColor: "#111827",
            color: "#fff", fontSize: 15, outline: "none",
          }}
        />
      </div>

      {/* Категории */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 8,
        marginBottom: 40, flexWrap: "wrap", padding: "0 20px",
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 18px", borderRadius: 20, border: "1px solid #1e2d3d",
              cursor: "pointer", fontSize: 13, fontWeight: 500,
              backgroundColor: activeCategory === cat ? "#fbbf24" : "#111827",
              color: activeCategory === cat ? "#0a0f1a" : "#9ca3af",
              transition: "all 0.2s",
            }}
          >
            {t.library[cat]}
          </button>
        ))}
      </div>

      {/* Список книг */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px",
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 24,
      }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#556677", gridColumn: "1/-1", padding: 40 }}>
            {t.library.noResults}
          </p>
        ) : (
          filtered.map((book) => (
            <div key={book.id} style={{
              backgroundColor: "#111827", border: "1px solid #1e2d3d",
              borderRadius: 12, overflow: "hidden",
              transition: "border-color 0.2s",
            }}>
              {/* Обложка */}
              <div style={{
                height: 160, backgroundColor: "#0d1520",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 48,
              }}>
                📖
              </div>

              {/* Информация */}
              <div style={{ padding: 18 }}>
                <h3 style={{ fontSize: 17, marginBottom: 4, color: "#fff" }}>
                  {lang === "ru" ? book.titleRu : book.titleEn}
                </h3>
                <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 10 }}>
                  {lang === "ru" ? book.authorRu : book.authorEn}
                </p>
                <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>
                  {lang === "ru" ? book.descriptionRu : book.descriptionEn}
                </p>

                {/* Кнопки */}
                <div style={{ display: "flex", gap: 8 }}>
                  {book.pdfUrl && (
                    <a href={book.pdfUrl}
                      style={{
                        flex: 1, textAlign: "center", padding: "9px 0",
                        backgroundColor: "#fbbf24", color: "#0a0f1a",
                        borderRadius: 8, textDecoration: "none", fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      📥 {t.library.download}
                    </a>
                  )}
                  {book.externalUrl && (
                    <a href={book.externalUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        flex: 1, textAlign: "center", padding: "9px 0",
                        backgroundColor: "#1e2d3d", color: "#8899aa",
                        borderRadius: 8, textDecoration: "none", fontSize: 13,
                      }}
                    >
                      🌐 {t.library.readOnline}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Навигация назад */}
      <div style={{ textAlign: "center", paddingBottom: 60 }}>
        <a href="/" style={{
                   color: "#fbbf24", fontSize: 15, textDecoration: "none",
          borderBottom: "1px solid #fbbf24", paddingBottom: 2,
        }}>
          ← {lang === "ru" ? "На главную" : "Back to Home"}
        </a>
      </div>
    </div>
  );
}