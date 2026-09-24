"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const SUPABASE_URL = "https://yzreudrlcapyolwsqgaq.supabase.co";
const SUPABASE_KEY = "sb_publishable_0id05fbNZIpqbOhbCzS1-A_zzovDpsQ";

type Review = {
  id: number;
  name: string;
  text: string;
  created_at: string;
};

export default function HomeReviews() {
  const { lang } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/comments?slug=eq.home&order=created_at.desc&limit=30`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch {
      // отзывы не критичны для страницы — молча игнорируем сбой
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          slug: "home",
          name: name.trim(),
          text: text.trim(),
        }),
      });
      if (!res.ok) throw new Error("insert failed");
      setName("");
      setText("");
      setStatus("done");
      loadReviews();
    } catch {
      setStatus("error");
    }
  }

  const t = {
    title: lang === "ru" ? "Отзывы" : "Testimonials",
    subtitle:
      lang === "ru"
        ? "Оставьте отзыв о служении — он появится на этой странице"
        : "Leave a review about the ministry — it will appear on this page",
    name: lang === "ru" ? "Ваше имя" : "Your name",
    nameHint:
      lang === "ru"
        ? "Можно указать псевдоним, например «Сергей К.»"
        : "You may use a pseudonym, e.g. \"John D.\"",
    message: lang === "ru" ? "Ваш отзыв" : "Your review",
    send: lang === "ru" ? "Отправить отзыв" : "Send review",
    sending: lang === "ru" ? "Отправляем..." : "Sending...",
    done: lang === "ru" ? "Спасибо! Отзыв опубликован." : "Thank you! Your review is published.",
    error: lang === "ru" ? "Ошибка отправки. Попробуйте ещё раз." : "Something went wrong. Please try again.",
    empty:
      lang === "ru"
        ? "Пока нет отзывов — станьте первым!"
        : "No reviews yet — be the first!",
  };

  return (
    <section style={{ backgroundColor: "#0a0a0a", padding: "70px 20px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ color: "#d4af37", fontSize: 30, textAlign: "center", marginBottom: 10 }}>
          {t.title}
        </h2>
        <p style={{ color: "#888", textAlign: "center", marginBottom: 40 }}>{t.subtitle}</p>

        {reviews.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", marginBottom: 40 }}>{t.empty}</p>
        ) : (
          <div style={{ display: "grid", gap: 16, marginBottom: 40 }}>
            {reviews.map((r) => (
              <div
                key={r.id}
                style={{
                  backgroundColor: "#111",
                  border: "1px solid #222",
                  borderRadius: 12,
                  padding: "20px 22px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: "#d4af37", fontWeight: 600 }}>{r.name}</span>
                  <span style={{ color: "#555", fontSize: 13 }}>
                    {new Date(r.created_at).toLocaleDateString(
                      lang === "ru" ? "ru-RU" : "en-US",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </span>
                </div>
                <p style={{ color: "#ccc", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#111",
            border: "1px solid #222",
            borderRadius: 12,
            padding: "24px 22px",
            display: "grid",
            gap: 14,
          }}
        >
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.name}
              maxLength={60}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "#0a0a0a",
                border: "1px solid #333",
                borderRadius: 8,
                padding: "12px 14px",
                color: "#fff",
                fontSize: 15,
                outline: "none",
              }}
            />
            <p style={{ color: "#666", fontSize: 12, margin: "6px 2px 0" }}>{t.nameHint}</p>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.message}
            maxLength={500}
            required
            rows={4}
            style={{
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "#0a0a0a",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "12px 14px",
              color: "#fff",
              fontSize: 15,
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              backgroundColor: "#d4af37",
              color: "#0a0a0a",
              border: "none",
              borderRadius: 8,
              padding: "13px 20px",
              fontSize: 15,
              fontWeight: 600,
              cursor: status === "sending" ? "wait" : "pointer",
            }}
          >
            {status === "sending" ? t.sending : t.send}
          </button>
          {status === "done" && (
            <p style={{ color: "#4caf50", margin: 0, fontSize: 14 }}>{t.done}</p>
          )}
          {status === "error" && (
            <p style={{ color: "#f44336", margin: 0, fontSize: 14 }}>{t.error}</p>
          )}
        </form>
      </div>
    </section>
  );
}