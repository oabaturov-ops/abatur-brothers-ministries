"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

interface Comment {
  id: number;
  slug: string;
  name: string;
  text: string;
  created_at: string;
}

export default function Comments({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("slug", slug)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setComments(data);
    }
    setLoading(false);
  };

  const addComment = async () => {
    if (!name.trim() || !text.trim() || sending) return;
    setSending(true);

    const { error } = await supabase
      .from("comments")
      .insert([{ slug, name: name.trim(), text: text.trim() }]);

    if (!error) {
      setName("");
      setText("");
      fetchComments();
    }
    setSending(false);
  };

  const label = lang === "ru"
    ? { title: "Комментарии", namePh: "Ваше имя", textPh: "Ваш комментарий", btn: "Отправить", load: "Загрузка...", empty: "Пока нет комментариев. Будьте первым!" }
    : { title: "Comments", namePh: "Your name", textPh: "Your comment", btn: "Submit", load: "Loading...", empty: "No comments yet. Be the first!" };

  return (
    <div style={{ marginTop: 60, padding: "40px 0", borderTop: "1px solid #222" }}>
      <h3 style={{ color: "#d4af37", fontSize: 24, marginBottom: 30 }}>{label.title}</h3>

      {loading ? (
        <p style={{ color: "#888" }}>{label.load}</p>
      ) : comments.length === 0 ? (
        <p style={{ color: "#555", fontStyle: "italic", marginBottom: 30 }}>{label.empty}</p>
      ) : (
        <div style={{ marginBottom: 30 }}>
          {comments.map((c) => (
            <div key={c.id} style={{
              background: "#111", border: "1px solid #222", borderRadius: 8,
              padding: "16px 20px", marginBottom: 12
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong style={{ color: "#d4af37", fontSize: 15 }}>{c.name}</strong>
                <span style={{ color: "#555", fontSize: 13 }}>
                  {new Date(c.created_at).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </span>
              </div>
              <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={label.namePh}
          style={{
            background: "#111", border: "1px solid #333", borderRadius: 6,
            padding: "12px 16px", color: "#fff", fontSize: 15, outline: "none"
          }}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={label.textPh}
          rows={4}
          style={{
            background: "#111", border: "1px solid #333", borderRadius: 6,
            padding: "12px 16px", color: "#fff", fontSize: 15, outline: "none",
            resize: "vertical", fontFamily: "inherit"
          }}
        />
        <button
          onClick={addComment}
          disabled={sending || !name.trim() || !text.trim()}
          style={{
            background: name.trim() && text.trim() ? "#d4af37" : "#333",
            color: name.trim() && text.trim() ? "#000" : "#666",
            border: "none", borderRadius: 6, padding: "12px 24px",
            fontSize: 15, fontWeight: 600, cursor: name.trim() && text.trim() ? "pointer" : "not-allowed",
            transition: "background 0.3s", alignSelf: "flex-start"
          }}
        >
          {sending ? "..." : label.btn}
        </button>
      </div>
    </div>
  );
}