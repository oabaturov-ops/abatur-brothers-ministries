"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  // === Навигация ===
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // === Контакты ===
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  // === Комментарии ===
  const [comments, setComments] = useState<any[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentStatus, setCommentStatus] = useState("");

  // === Молитвенная нужда ===
  const [prayerName, setPrayerName] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [prayerStatus, setPrayerStatus] = useState("");
  const [prayerAnonymous, setPrayerAnonymous] = useState(false);

  // === Чат виджет ===
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: string; text: string }[]
  >([]);
  const [chatInput, setChatInput] = useState("");

  // === Текущая страница ===
  const [currentPage] = useState("home");

  // === Загрузка комментариев ===
  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setComments(data);
      })
      .catch(() => {});
  }, []);

  // === Навигационные ссылки ===
  const navLinks = [
    { href: "#home", label: t.nav?.home || "Главная" },
    { href: "#about", label: t.nav?.about || "О нас" },
    { href: "#events", label: t.nav?.events || "События" },
    { href: "#team", label: t.nav?.team || "Команда" },
    { href: "#mission", label: t.nav?.mission || "Миссия" },
    { href: "#prayer", label: t.nav?.library ? "Молитва" : "Prayer" },
    { href: "#contacts", label: t.nav?.contacts || "Контакты" },
    { href: "/library", label: t.nav?.library || "Библиотека" },
  ];

  // === Функции мессенджеров ===
  const openWhatsApp = () => {
    const msg = encodeURIComponent(`${contactName}: ${contactMessage}`);
    window.open(`https://wa.me/15551234567?text=${msg}`);
  };

  const openTelegram = () => {
    const msg = encodeURIComponent(`${contactName}: ${contactMessage}`);
    window.open(`https://t.me/Abaturministry_bot?text=${msg}`);
  };

  const openEmail = () => {
    const msg = encodeURIComponent(`${contactName}: ${contactMessage}`);
    window.open(`mailto:info@abaturministries.org?body=${msg}`);
  };

  // === Отправка комментария ===
  const handleSubmitComment = async () => {
    if (!commentName.trim() || !commentText.trim()) return;
    setCommentStatus("sending");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: commentName, text: commentText }),
      });
      if (res.ok) {
        setCommentName("");
        setCommentText("");
        setCommentStatus("success");
        const data = await res.json();
        setComments((prev) => [
          ...(Array.isArray(data.comments) ? data.comments : [data]),
        ]);
        setTimeout(() => setCommentStatus(""), 3000);
      }
    } catch {
      setCommentStatus("error");
    }
  };

  // === Отправка молитвенной нужды ===
  const handleSubmitPrayer = async () => {
    if (!prayerRequest.trim()) return;
    setPrayerStatus("sending");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: prayerAnonymous ? "Аноним" : prayerName,
          message: prayerRequest,
          topic: "prayer",
        }),
      });
      if (res.ok) {
        setPrayerName("");
        setPrayerRequest("");
        setPrayerAnonymous(false);
        setPrayerStatus("success");
        setTimeout(() => setPrayerStatus(""), 3000);
      } else {
        setPrayerStatus("error");
      }
    } catch {
      setPrayerStatus("error");
    }
  };

  // === Чат бот ===
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Chat", message: userMsg }),
      });
      if (res.ok) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text:
              "Спасибо за ваше сообщение! Мы ответим как можно скорее.",
          },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: "Ошибка отправки. Попробуйте позже." },
      ]);
    }
  };

  // ========================================
  // ОСНОВНОЙ ДИЗАЙН: ЧЁРНЫЙ / ЖЁЛТЫЙ
  // ========================================

  // === Общие стили ===
  const sectionPadding = { padding: "80px 20px" };
  const maxWidth = { maxWidth: "1200px", margin: "0 auto" };
  const sectionTitle = {
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: "50px",
    color: "#fbbf24",
  };
  const cardStyle = {
    background: "#111827",
    borderRadius: "12px",
    padding: "30px",
    border: "1px solid #1e2d3d",
  };

  // ========================================
  // РЕНДЕР
  // ========================================
  return (
    <div style={{ background: "#0a0f1a", color: "#e5e7eb", minHeight: "100vh" }}>
      {/* ============ НАВИГАЦИЯ ============ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(10, 15, 26, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #1e2d3d",
          padding: "15px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fbbf24" }}>
            Abatur Brothers
          </div>

          {/* Десктоп меню */}
          <div
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: "16px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#fbbf24")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#e5e7eb")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Бургер для мобильного */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#fbbf24",
              fontSize: "28px",
              cursor: "pointer",
              display: "none",
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              padding: "20px",
              background: "#0a0f1a",
              borderTop: "1px solid #1e2d3d",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: "18px",
                  padding: "8px 0",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section
        id="home"
        style={{
          ...sectionPadding,
          paddingTop: "150px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)",
        }}
      >
        <div style={maxWidth}>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "bold",
              color: "#fbbf24",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {t.hero?.title || "Abatur Brothers Ministries"}
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#9ca3af",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            {t.hero?.subtitle ||
              "Несём свет и надежду в мир. Служение, вера, единство."}
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#about"
              style={{
                background: "#fbbf24",
                color: "#0a0f1a",
                padding: "14px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
                transition: "transform 0.2s",
              }}
            >
              {t.hero?.cta || "Узнать больше"}
            </a>
            <a
              href="#contacts"
              style={{
                border: "2px solid #fbbf24",
                color: "#fbbf24",
                padding: "14px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
                transition: "background 0.3s",
              }}
            >
              {t.hero?.contact || "Связаться"}
            </a>
          </div>
        </div>
      </section>

      {/* ============ О НАС ============ */}
      <section id="about" style={{ ...sectionPadding, background: "#111827" }}>
        <div style={maxWidth}>
          <h2 style={sectionTitle}>{t.about?.title || "О нас"}</h2>
          <p
            style={{
              fontSize: "18px",
              color: "#9ca3af",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            {t.about?.description ||
              "Мы — братья, объединённые верой и призванием служить Богу и людям. Наше служение началось с простого желания помогать людям с ограниченными возможностями и нести Слово Божье во все концы земли."}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
              marginTop: "50px",
            }}
          >
            {[
              {
                icon: "🙏",
                title: t.about?.values?.prayer || "Молитва",
                desc: t.about?.values?.prayerDesc || "Молитва — основа нашего служения",
              },
              {
                icon: "📖",
                title: t.about?.values?.word || "Слово",
                desc: t.about?.values?.wordDesc || "Проповедь и изучение Библии",
              },
              {
                icon: "🤝",
                title: t.about?.values?.unity || "Единство",
                desc: t.about?.values?.unityDesc || "Вместе мы сильнее",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  ...cardStyle,
                  textAlign: "center",
                  transition: "transform 0.3s",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                  {item.icon}
                </div>
                <h3 style={{ color: "#fbbf24", marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "15px" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ СОБЫТИЯ ============ */}
      <section id="events" style={{ ...sectionPadding, background: "#0a0f1a" }}>
        <div style={maxWidth}>
          <h2 style={sectionTitle}>{t.events?.title || "События"}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                date: "15.06.2025",
                title: t.events?.items?.[0]?.title || "Вечер молитвы",
                desc: t.events?.items?.[0]?.desc || "Совместная молитва и поклонение",
              },
              {
                date: "22.06.2025",
                title: t.events?.items?.[1]?.title || "Библейский семинар",
                desc: t.events?.items?.[1]?.desc || "Изучение книги Притчей",
              },
              {
                date: "29.06.2025",
                title: t.events?.items?.[2]?.title || "Молодёжная встреча",
                desc: t.events?.items?.[2]?.desc || "Общение и библейское study",
              },
            ].map((event, i) => (
              <div key={i} style={cardStyle}>
                <div
                  style={{
                    color: "#fbbf24",
                    fontSize: "14px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {event.date}
                </div>
                <h3
                  style={{
                    color: "#e5e7eb",
                    marginBottom: "8px",
                    fontSize: "20px",
                  }}
                >
                  {event.title}
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "15px" }}>
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ КОМАНДА ============ */}
      <section id="team" style={{ ...sectionPadding, background: "#111827" }}>
        <div style={maxWidth}>
          <h2 style={sectionTitle}>{t.team?.title || "Наша команда"}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                name: t.team?.members?.[0]?.name || "Олег Ааатуров",
                role: t.team?.members?.[0]?.role || "Основатель",
              },
              {
                name: t.team?.members?.[1]?.name || "Всеволод Абатуров",
                role: t.team?.members?.[1]?.role || "Основатель",
              },
            ].map((member, i) => (
              <div
                key={i}
                style={{ ...cardStyle, textAlign: "center" }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "#1e2d3d",
                    margin: "0 auto 15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                  }}
                >
                  👤
                </div>
                <h3 style={{ color: "#fbbf24", marginBottom: "5px" }}>
                  {member.name}
                </h3>
                <p style={{ color: "#9ca3af" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ МИССИЯ ============ */}
      <section id="mission" style={{ ...sectionPadding, background: "#0a0f1a" }}>
        <div style={maxWidth}>
          <h2 style={sectionTitle}>{t.mission?.title || "Наша миссия"}</h2>
          <p
            style={{
              fontSize: "18px",
              color: "#9ca3af",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            {t.mission?.description ||
              "Наша миссия — нести свет Евангелия каждому человеку, поддерживать людей с ограниченными возможностями, нуждающихся и созидать общество на принципах любви и христианской веры."}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "30px",
              marginTop: "50px",
              textAlign: "center",
            }}
          >
            {/*[
              { num: "100+", label: t.mission?.stats?.[0]?.label || "Людей" },
              { num: "10+", label: t.mission?.stats?.[1]?.label || "Проектов" },
              { num: "5+", label: t.mission?.stats?.[2]?.label || "Стран" },
              { num: "∞", label: t.mission?.stats?.[3]?.label || "Любовь" },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: "bold",
                    color: "#fbbf24",
                  }}
                >
                  {stat.num}
                </div>
                <div style={{ color: "#9ca3af", marginTop: "8px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
              {/* Статистика скрыта */}
          </div>
        </div>
      </section>

      {/* ============ МОЛИТВЕННАЯ НУЖДА ============ */}
      <section
        id="prayer"
        style={{ ...sectionPadding, background: "#111827" }}
      >
        <div style={maxWidth}>
          <h2 style={sectionTitle}>
            {t.prayerRequest?.title || "Молитвенная нужда"}
          </h2>
          <p
            style={{
              color: "#9ca3af",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "16px",
            }}
          >
            {t.prayerRequest?.subtitle ||
              "Поделитесь своей молитвенной нуждой, и мы будем молиться за вас"}
          </p>
          <div
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              ...cardStyle,
            }}
          >
            {!prayerAnonymous && (
              <input
                type="text"
                placeholder={
                  t.prayerRequest?.namePlaceholder || "Ваше имя"
                }
                value={prayerName}
                onChange={(e) => setPrayerName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1e2d3d",
                  background: "#0a0f1a",
                  color: "#e5e7eb",
                  marginBottom: "15px",
                  fontSize: "16px",
                  boxSizing: "border-box" as const,
                }}
              />
            )}
            <textarea
              placeholder={
                t.prayerRequest?.requestPlaceholder || "Ваша молитвенная нужда"
              }
              value={prayerRequest}
              onChange={(e) => setPrayerRequest(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #1e2d3d",
                background: "#0a0f1a",
                color: "#e5e7eb",
                marginBottom: "15px",
                fontSize: "16px",
                resize: "vertical" as const,
                boxSizing: "border-box" as const,
              }}
            />
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#9ca3af",
                marginBottom: "15px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={prayerAnonymous}
                onChange={(e) => setPrayerAnonymous(e.target.checked)}
              />
              {t.prayerRequest?.anonymous || "Отправить анонимно"}
            </label>
            <button
              onClick={handleSubmitPrayer}
              disabled={prayerStatus === "sending"}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                background: "#fbbf24",
                color: "#0a0f1a",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: prayerStatus === "sending" ? "wait" : "pointer",
                transition: "opacity 0.3s",
              }}
            >
              {prayerStatus === "sending"
                ? "Отправка..."
                : t.prayerRequest?.submit || "Отправить просьбу"}
            </button>
            {prayerStatus === "success" && (
              <p style={{ color: "#34d399", marginTop: "15px", textAlign: "center" }}>
                {t.prayerRequest?.success ||
                  "Ваша просьба отправлена. Мы будем молиться за вас!"}
              </p>
            )}
            {prayerStatus === "error" && (
              <p style={{ color: "#f87171", marginTop: "15px", textAlign: "center" }}>
                {t.prayerRequest?.error || "Ошибка отправки. Попробуйте позже."}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============ КОНТАКТЫ ============ */}
      <section
        id="contacts"
        style={{ ...sectionPadding, background: "#0a0f1a" }}
      >
        <div style={maxWidth}>
          <h2 style={sectionTitle}>
            {t.contacts?.title || "Контакты"}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {/* Форма */}
            <div style={cardStyle}>
              <input
                type="text"
                placeholder={
                  t.contacts?.namePlaceholder || "Ваше имя"
                }
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1e2d3d",
                  background: "#0a0f1a",
                  color: "#e5e7eb",
                  marginBottom: "15px",
                  fontSize: "16px",
                  boxSizing: "border-box" as const,
                }}
              />
              <textarea
                placeholder={
                  t.contacts?.messagePlaceholder || "Ваше сообщение"
                }
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1e2d3d",
                  background: "#0a0f1a",
                  color: "#e5e7eb",
                  marginBottom: "15px",
                  fontSize: "16px",
                  resize: "vertical" as const,
                  boxSizing: "border-box" as const,
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={openWhatsApp}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "14px",
                    minWidth: "100px",
                  }}
                >
                  WhatsApp
                </button>
                <button
                  onClick={openTelegram}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#0088cc",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "14px",
                    minWidth: "100px",
                  }}
                >
                  Telegram
                </button>
                <button
                  onClick={openEmail}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#fbbf24",
                    color: "#0a0f1a",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "14px",
                    minWidth: "100px",
                  }}
                >
                  Email
                </button>
              </div>
            </div>

            {/* Информация */}
            <div style={cardStyle}>
              <h3
                style={{
                  color: "#fbbf24",
                  marginBottom: "20px",
                  fontSize: "20px",
                }}
              >
              {t.contacts?.heading || "Свяжитесь с нами"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <p style={{ color: "#9ca3af" }}>
                  📧 info@abaturministries.org
                </p>
                <p style={{ color: "#9ca3af" }}>
                  📱 +7 (902) 648-9672
                </p>
                <p style={{ color: "#9ca3af" }}>
                  🌐 abaturministry.org
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ КОММЕНТАРИИ ============ */}
      <section
        id="comments"
        style={{ ...sectionPadding, background: "#111827" }}
      >
        <div style={maxWidth}>
          <h2 style={sectionTitle}>
            {t.comments?.title || "Отзывы"}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {/* Список комментариев */}
            <div>
              {comments.length > 0 ? (
                comments.map((c: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      ...cardStyle,
                      marginBottom: "15px",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        color: "#fbbf24",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      {c.name}
                    </div>
                    <p style={{ color: "#9ca3af", fontSize: "15px" }}>
                      {c.text}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: "#9ca3af", textAlign: "center" }}>
                  {t.comments?.empty || "Пока нет отзывов. Будьте первым!"}
                </p>
              )}
            </div>

            {/* Форма комментария */}
            <div style={cardStyle}>
              <h3
                style={{
                  color: "#fbbf24",
                  marginBottom: "20px",
                  fontSize: "18px",
                }}
              >
                {t.comments?.formTitle || "Оставить отзыв"}
              </h3>
              <input
                type="text"
                placeholder={
                  t.comments?.namePlaceholder || "Ваше имя"
                }
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1e2d3d",
                  background: "#0a0f1a",
                  color: "#e5e7eb",
                  marginBottom: "15px",
                  fontSize: "16px",
                  boxSizing: "border-box" as const,
                }}
              />
              <textarea
                placeholder={
                  t.comments?.textPlaceholder || "Ваш отзыв"
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1e2d3d",
                  background: "#0a0f1a",
                  color: "#e5e7eb",
                  marginBottom: "15px",
                  fontSize: "16px",
                  resize: "vertical" as const,
                  boxSizing: "border-box" as const,
                }}
              />
              <button
                onClick={handleSubmitComment}
                disabled={commentStatus === "sending"}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#fbbf24",
                  color: "#0a0f1a",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: commentStatus === "sending" ? "wait" : "pointer",
                }}
              >
                {commentStatus === "sending"
                  ? "Отправка..."
                  : t.comments?.submit || "Отправить"}
              </button>
              {commentStatus === "success" && (
                <p style={{ color: "#34d399", marginTop: "15px", textAlign: "center" }}>
                  {t.comments?.success || "Спасибо за ваш отзыв!"}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ПИСАНИЕ ============ */}
      <section
        id="scripture"
        style={{ ...sectionPadding, background: "#0a0f1a", textAlign: "center" }}
      >
        <div style={maxWidth}>
          <h2 style={sectionTitle}>
            {t.scripture?.title || "Слово Божье"}
          </h2>
          <blockquote
            style={{
              fontSize: "22px",
              color: "#fbbf24",
              fontStyle: "italic",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
              borderLeft: "4px solid #fbbf24",
              paddingLeft: "20px",
              textAlign: "left",
            }}
          >
            &ldquo;{t.scripture?.verse ||
              "Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного, дабы всякий верующий в Него, не погиб, но имел жизнь вечную."}&rdquo;
          </blockquote>
          <p
            style={{
              color: "#9ca3af",
              marginTop: "20px",
              fontSize: "16px",
            }}
          >
            — {t.scripture?.reference || "Иоанна 3:16"}
          </p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        style={{
          background: "#111827",
          padding: "40px 20px",
          borderTop: "1px solid #1e2d3d",
        }}
      >
        <div style={maxWidth}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "30px",
            }}
          >
            <div>
              <h3 style={{ color: "#fbbf24", marginBottom: "15px" }}>
                Abatur Brothers
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                {t.footer?.description ||
                  "Служение веры и надежды для всех."}
              </p>
            </div>
            <div>
              <h3 style={{ color: "#fbbf24", marginBottom: "15px" }}>
                {t.footer?.links || "Ссылки"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a
                  href="#home"
                  style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}
                >
                  {t.nav?.home || "Главная"}
                </a>
                <a
                  href="#about"
                  style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}
                >
                  {t.nav?.about || "О нас"}
                </a>
                <a
                  href="/library"
                  style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}
                >
                  {t.nav?.library || "Библиотека"}
                </a>
              </div>
            </div>
            <div>
              <h3 style={{ color: "#fbbf24", marginBottom: "15px" }}>
                {t.footer?.social || "Соцсети"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a
                  href="https://t.me/Abaturministry_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}
                >
                  Telegram
                </a>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "1px solid #1e2d3d",
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "14px",
            }}
          >
            &copy; {new Date().getFullYear()} Abatur Brothers Ministries.{" "}
            {t.footer?.rights || "Все права защищены."}
          </div>
        </div>
      </footer>

      {/* ============ ЧАТ ВИДЖЕТ ============ */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
        }}
      >
        {chatOpen && (
          <div
            style={{
              width: "320px",
              height: "400px",
              background: "#111827",
              border: "1px solid #1e2d3d",
              borderRadius: "12px",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                background: "#fbbf24",
                color: "#0a0f1a",
                padding: "12px 16px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {t.chat?.title || "Чат"}
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "15px",
              }}
            >
              {chatMessages.length === 0 && (
                <p style={{ color: "#9ca3af", fontSize: "14px", textAlign: "center", marginTop: "50px" }}>
                  {t.chat?.greeting || "Здравствуйте! Чем можем помочь?"}
                </p>
              )}
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: msg.role === "user" ? "right" : "left",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      maxWidth: "80%",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      background:
                        msg.role === "user" ? "#fbbf24" : "#1e2d3d",
                      color: msg.role === "user" ? "#0a0f1a" : "#e5e7eb",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px",
                borderTop: "1px solid #1e2d3d",
              }}
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                placeholder={t.chat?.placeholder || "Сообщение..."}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #1e2d3d",
                  background: "#0a0f1a",
                  color: "#e5e7eb",
                  fontSize: "14px",
                }}
              />
              <button
                onClick={sendChatMessage}
                style={{
                  marginLeft: "8px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#fbbf24",
                  color: "#0a0f1a",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ➤
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background: "#fbbf24",
            color: "#0a0f1a",
            fontSize: "28px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(251, 191, 36, 0.4)",
            transition: "transform 0.2s",
          }}
        >
          {chatOpen ? "✕" : "💬"}
        </button>
      </div>
    </div>
  );
}
