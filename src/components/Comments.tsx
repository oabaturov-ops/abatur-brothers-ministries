"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
}

export default function Comments({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("comments_" + slug);
      if (saved) setComments(JSON.parse(saved));
    } catch {}
  }, [slug]);

  const addComment = () => {
    if (!name.trim() || !text.trim()) return;
    const newComment = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US"),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem("comments_" + slug, JSON.stringify(updated));
    } catch {}
    setText("");
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <h3 style={{ color: "#d4af37", marginBottom: 20, fontSize: 24 }}>
        {lang === "ru" ? "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438" : "Comments"}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 30 }}>
        <input
          placeholder={lang === "ru" ? "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F" : "Your name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%", padding: "12px 14px", backgroundColor: "#111",
            border: "1px solid #333", borderRadius: 8, color: "#fff",
            fontSize: 14, outline: "none"
          }}
        />
        <textarea
          placeholder={lang === "ru" ? "\u0412\u0430\u0448 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439..." : "Your comment..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          style={{
            width: "100%", padding: "12px 14px", backgroundColor: "#111",
            border: "1px solid #333", borderRadius: 8, color: "#fff",
            fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit"
          }}
        />
        <button
          onClick={addComment}
          style={{
            padding: "12px 24px", backgroundColor: "#d4af37", color: "#000",
            border: "none", borderRadius: 8, fontWeight: "bold", fontSize: 14,
            cursor: "pointer", alignSelf: "flex-start"
          }}
        >
          {lang === "ru" ? "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" : "Send"}
        </button>
      </div>
      {comments.length === 0 && (
        <p style={{ color: "#555", textAlign: "center" }}>
          {lang === "ru" ? "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432. \u0411\u0443\u0434\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u043C!" : "No comments yet. Be the first!"}
        </p>
      )}
      {comments.map((c) => (
        <div key={c.id} style={{
          backgroundColor: "#111", border: "1px solid #222", borderRadius: 8,
          padding: "16px", marginBottom: 12
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <strong style={{ color: "#d4af37" }}>{c.name}</strong>
            <span style={{ color: "#555", fontSize: 13 }}>{c.date}</span>
          </div>
          <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{c.text}</p>
        </div>
      ))}
    </div>
  );
}