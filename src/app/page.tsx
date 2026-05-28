"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Комментарии
  const [comments, setComments] = useState<any[]>([
    { id: 1, name: "Олег", text: "Благословенное служение! Бог благословит вашу работу.", date: "2025-01-15" },
    { id: 2, name: "Maria", text: "Wonderful ministry! God bless your work.", date: "2025-01-14" },
  ]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Чат-виджет
  const [chatOpen, setChatOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatMsg, setChatMsg] = useState("");
  const [chatStatus, setChatStatus] = useState("idle");

    const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#events", label: t.nav.events },
    { href: "#team", label: t.nav.team },
    { href: "#mission", label: t.nav.mission },
    { href: "#contacts", label: t.nav.contacts },
    { href: "#comments", label: t.nav.comments },
    { href: "/blog", label: t.nav.blog },
    { href: "/library", label: t.nav.library },
  ];

  function addComment() {
    if (!commentName.trim() || !commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      name: commentName,
      text: commentText,
      date: new Date().toISOString().slice(0, 10),
    };
    setComments([newComment, ...comments]);
    setCommentName("");
    setCommentText("");
  }

  function deleteComment(id: number) {
    setComments(comments.filter((c: any) => c.id !== id));
  }

  async function sendChatMessage() {
    if (!chatName.trim() || !chatMsg.trim()) return;
    setChatStatus("sending");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: chatName, message: chatMsg }),
      });
      const data = await res.json();
      if (data.success) {
        setChatStatus("sent");
        setChatMsg("");
      } else {
        setChatStatus("error");
      }
    } catch {
      setChatStatus("error");
    }
    setTimeout(() => setChatStatus("idle"), 3000);
  }

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      {/* NAVIGATION */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(10,10,10,0.9)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid #222", padding: "15px 30px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <a href="#" style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/favicon.png" alt="logo" style={{ width: 100, height: 100, borderRadius: "50%" }} />
          {t.nav.brand}
        </a>

        {/* Desktop menu */}
        <div style={{ display: "flex", gap: 25, alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: "#ccc", textDecoration: "none", fontSize: 14, transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af37")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
            >
              {link.label}
            </a>
          ))}

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            style={{
              padding: "6px 14px", backgroundColor: "#111", border: "1px solid #d4af37",
              borderRadius: 6, color: "#d4af37", fontSize: 13, fontWeight: "bold",
              cursor: "pointer", transition: "0.3s"
            }}
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>
        </div>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", backgroundColor: "transparent", border: "none",
            cursor: "pointer", padding: "5px"
          }}
          className="burger-btn"
        >
          <div style={{ width: 25, height: 2, backgroundColor: "#d4af37", marginBottom: 5, transition: "0.3s" }} />
          <div style={{ width: 25, height: 2, backgroundColor: "#d4af37", marginBottom: 5, transition: "0.3s" }} />
          <div style={{ width: 25, height: 2, backgroundColor: "#d4af37", transition: "0.3s" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 40,
          backgroundColor: "rgba(10,10,10,0.98)", borderBottom: "1px solid #222",
          padding: "20px 30px", display: "flex", flexDirection: "column", gap: 15
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: "#ccc", textDecoration: "none", fontSize: 16 }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setLang(lang === "ru" ? "en" : "ru"); setMenuOpen(false); }}
            style={{
              padding: "10px", backgroundColor: "#111", border: "1px solid #d4af37",
              borderRadius: 6, color: "#d4af37", fontSize: 14, fontWeight: "bold",
              cursor: "pointer", marginTop: 5
            }}
          >
            {lang === "ru" ? "EN English" : "RU Русский"}
          </button>
        </div>
      )}

           {/* HERO */}
      <section style={{
        minHeight: "200vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "20px", position: "relative", overflow: "hidden",
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.25) 0%, rgba(10,10,10,0.85) 70%)",
          backgroundAttachment: "fixed"
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "#d4af37", filter: "blur(180px)", opacity: 0.2, top: "10%", left: "50%", transform: "translateX(-50%)"
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "#d4af37", filter: "blur(150px)", opacity: 0.15, top: "20%", left: "50%", transform: "translateX(-50%)"
        }} />
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: "bold", marginBottom: 20, position: "relative" }}>
          {t.hero.title1} <span style={{ color: "#d4af37" }}>{t.hero.titleHighlight}</span>
        </h1>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "#aaa", maxWidth: 600, marginBottom: 40, position: "relative" }}>
          {t.hero.subtitle}
        </p>
        <div style={{ display: "flex", gap: 15, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          <a href="#about" style={{
            padding: "14px 30px", backgroundColor: "#d4af37", color: "#000",
            textDecoration: "none", fontWeight: "bold", borderRadius: 8, transition: "0.3s"
          }}>{t.hero.cta1}</a>
          <a href="#contacts" style={{
            padding: "14px 30px", border: "1px solid #d4af37", color: "#d4af37",
            textDecoration: "none", borderRadius: 8, transition: "0.3s"
          }}>{t.hero.cta2}</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 20px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#d4af37", fontSize: 32, marginBottom: 50 }}>{t.about.heading}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 25 }}>
          {[
            { title: t.about.faith.title, text: t.about.faith.text, icon: "✝️" },
            { title: t.about.ministry.title, text: t.about.ministry.text, icon: "🕊️" },
            { title: t.about.unity.title, text: t.about.unity.text, icon: "🤝" },
          ].map((item) => (
            <div key={item.title} style={{
              backgroundColor: "#111", border: "1px solid #222", borderRadius: 12,
              padding: "30px", textAlign: "center"
            }}>
              <div style={{ fontSize: 40, marginBottom: 15 }}>{item.icon}</div>
              <h3 style={{ color: "#d4af37", marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: "#999", lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" style={{ padding: "80px 20px", backgroundColor: "#0d0d0d" }}>
        <h2 style={{ textAlign: "center", color: "#d4af37", fontSize: 32, marginBottom: 50 }}>{t.events.heading}</h2>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 25 }}>
          {t.events.items.map((event: any) => (
            <div key={event.title} style={{
              backgroundColor: "#111", border: "1px solid #222", borderRadius: 12, padding: "25px"
            }}>
              <span style={{ color: "#d4af37", fontSize: 13, fontWeight: "bold" }}>{event.date}</span>
              <h3 style={{ marginTop: 10, marginBottom: 8 }}>{event.title}</h3>
              <span style={{
                fontSize: 12, padding: "4px 10px", backgroundColor: "#1a1a1a",
                borderRadius: 20, color: "#888", border: "1px solid #333"
              }}>{event.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: "80px 20px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#d4af37", fontSize: 32, marginBottom: 50 }}>{t.team.heading}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 25 }}>
          {t.team.members.map((member: any) => (
            <div key={member.name} style={{
              backgroundColor: "#111", border: "1px solid #222", borderRadius: 12,
              padding: "30px", textAlign: "center"
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%", backgroundColor: "#1a1a0a",
                border: "2px solid #d4af37", margin: "0 auto 15px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, color: "#d4af37", fontWeight: "bold"
              }}>
                {member.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <h3 style={{ color: "#d4af37", marginBottom: 5 }}>{member.name}</h3>
              <p style={{ color: "#888", fontSize: 13, marginBottom: 10 }}>{member.role}</p>
              <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6 }}>{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

            {/* MISSION */}
      <section id="mission" style={{ padding: "80px 20px", backgroundColor: "#0d0d0d" }}>
        <h2 style={{ textAlign: "center", color: "#d4af37", fontSize: 32, marginBottom: 20 }}>{t.mission.heading}</h2>
        <p style={{ color: "#ccc", lineHeight: 1.8, textAlign: "center", marginBottom: 30, maxWidth: 800, margin: "0 auto 30px" }}>
          {t.mission.text}
        </p>
        {/* Carousel */}
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
          <div style={{ overflow: "hidden", borderRadius: 12, border: "1px solid #222" }}>
            <div style={{ display: "flex", transition: "transform 0.5s ease", transform: `translateX(-${currentSlide * 100}%)` }}>
              {["/mission1.jpg", "/mission2.jpg", "/mission3.jpg", "/mission4.jpg"].map((src, i) => (
                <div key={i} style={{ minWidth: "100%", position: "relative" }}>
                  <img src={src} alt={`Mission ${i + 1}`} style={{ width: "100%", height: 600, objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1)} style={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.6)", color: "#d4af37", border: "1px solid #d4af37", borderRadius: "50%", width: 44, height: 44, fontSize: 20, cursor: "pointer" }}>&#8592;</button>
          <button onClick={() => setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1)} style={{ position: "absolute",
top: "50%", right: 10, transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.6)", color: "#d4af37", border: "1px solid #d4af37", borderRadius: "50%", width: 44, height: 44, fontSize: 20, cursor: "pointer" }}>→ </button>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 15 }}>
            {[0, 1, 2, 3].map((i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: currentSlide === i ? 24 : 10, height: 10, borderRadius: 5, backgroundColor: currentSlide === i ? "#d4af37" : "#333", border: "none", cursor: "pointer", transition: "0.3s" }} />
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1500, margin: "30px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15 }}>
          {t.mission.items.map((item: any) => (
            <div key={item} style={{ padding: "15px", backgroundColor: "#111", border: "1px solid #222", borderRadius: 8, color: "#ccc", fontSize: 14 }}>
              ✦ {item}
            </div>
          ))}
        </div>
      </section>
      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "80px 20px", maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#d4af37", fontSize: 32, marginBottom: 15 }}>{t.contacts.heading}</h2>
        <p style={{ textAlign: "center", color: "#888", marginBottom: 40 }}>
          {t.contacts.subtitle}
        </p>

        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            const name = (e.target as any).elements.cname.value;
            const email = (e.target as any).elements.cemail.value;
            const message = (e.target as any).elements.cmessage.value;
            const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

            const WHATSAPP_NUMBER = "15551234567";
            const TELEGRAM_USER = "Abaturministry_bot";
            const EMAIL_ADDRESS = "info@abaturministries.org";
            const FACEBOOK_PAGE = "AbaturBrothersMinistries";

            const links: any = {
              whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
              telegram: `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(text)}`,
              email: `mailto:${EMAIL_ADDRESS}?subject=Message from website&body=${encodeURIComponent(text)}`,
              facebook: `https://m.me/${FACEBOOK_PAGE}`,
            };

            window.open(links[selectedChannel], "_blank");
          }}
          style={{ display: "flex", flexDirection: "column", gap: 15 }}
        >
          <input name="cname" type="text" placeholder={t.contacts.namePlaceholder} required style={{
            padding: "12px 15px", backgroundColor: "#111", border: "1px solid #333",
            borderRadius: 8, color: "#fff", fontSize: 14, outline: "none"
          }} />
          <input name="cemail" type="email" placeholder={t.contacts.emailPlaceholder} required style={{
            padding: "12px 15px", backgroundColor: "#111", border: "1px solid #333",
            borderRadius: 8, color: "#fff", fontSize: 14, outline: "none"
          }} />
          <textarea name="cmessage" placeholder={t.contacts.messagePlaceholder} required rows={4} style={{
            padding: "12px 15px", backgroundColor: "#111", border: "1px solid #333",
            borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", resize: "vertical"
          }} />

          <p style={{ color: "#888", fontSize: 13, margin: "5px 0 0" }}>{t.contacts.chooseChannel}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { key: "whatsapp", label: t.contacts.channels.whatsapp, icon: "📱", color: "#25D366" },
              { key: "telegram", label: t.contacts.channels.telegram, icon: "💬", color: "#0088cc" },
              { key: "email", label: t.contacts.channels.email, icon: "📧", color: "#d4af37" },
              { key: "facebook", label: t.contacts.channels.facebook, icon: "📘", color: "#1877F2" },
            ].map((btn: any) => (
              <button
                key={btn.key}
                type="button"
                onClick={() => setSelectedChannel(btn.key)}
                style={{
                  padding: "14px 10px", border: selectedChannel === btn.key
                    ? `2px solid ${btn.color}`
                    : "1px solid #333",
                  borderRadius: 8, backgroundColor: selectedChannel === btn.key
                    ? `${btn.color}15`
                    : "#111",
                  color: "#ccc", fontSize: 14, cursor: "pointer",
                  transition: "0.3s", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8
                }}
              >
                <span>{btn.icon}</span> {btn.label}
              </button>
            ))}
          </div>

          <button type="submit" style={{
            padding: "14px", backgroundColor: "#d4af37", color: "#000",
            border: "none", borderRadius: 8, fontWeight: "bold", fontSize: 15,
            cursor: "pointer", transition: "0.3s", marginTop: 5
          }}>
            {t.contacts.sendVia} {t.contacts.channels[selectedChannel as keyof typeof t.contacts.channels]}
          </button>
        </form>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { label: t.contacts.info[0].label, value: t.contacts.info[0].value, icon: "📱", color: "#25D366", link: "https://wa.me/15551234567" },
            { label: t.contacts.info[1].label, value: t.contacts.info[1].value, icon: "💬", color: "#0088cc", link: "https://t.me/Abaturministry_bot" },
            { label: t.contacts.info[2].label, value: t.contacts.info[2].value, icon: "📧", color: "#d4af37", link: "mailto:info@abaturministries.org" },
            { label: t.contacts.info[3].label, value: t.contacts.info[3].value, icon: "📘", color: "#1877F2", link: "https://m.me/AbaturBrothersMinistries" },
          ].map((contact) => (
            <a
              key={contact.label}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "18px", backgroundColor: "#111", border: `1px solid ${contact.color}33`,
                borderRadius: 10, display: "flex", alignItems: "center", gap: 12, textDecoration: "none"
              }}
            >
              <span style={{ fontSize: 28 }}>{contact.icon}</span>
              <div>
                <div style={{ color: contact.color, fontSize: 12, fontWeight: "bold" }}>{contact.label}</div>
                <div style={{ color: "#999", fontSize: 12 }}>{contact.value}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* COMMENTS */}
      <section id="comments" style={{ padding: "80px 20px", backgroundColor: "#0d0d0d" }}>
        <h2 style={{ textAlign: "center", color: "#d4af37", fontSize: 32, marginBottom: 15 }}>{t.comments.heading}</h2>
        <p style={{ textAlign: "center", color: "#888", marginBottom: 40 }}>{t.comments.subtitle}</p>

        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Add comment form */}
          <div style={{
            backgroundColor: "#111", border: "1px solid #222", borderRadius: 12,
            padding: "20px", marginBottom: 30
          }}>
            <input
              type="text"
              placeholder={t.comments.namePlaceholder}
              value={commentName}
              onChange={(e: any) => setCommentName(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", backgroundColor: "#0a0a0a",
                border: "1px solid #333", borderRadius: 6, color: "#fff",
                fontSize: 14, outline: "none", marginBottom: 10
              }}
            />
            <textarea
              placeholder={t.comments.commentPlaceholder}
              value={commentText}
              onChange={(e: any) => setCommentText(e.target.value)}
              rows={3}
              style={{
                width: "100%", padding: "10px 14px", backgroundColor: "#0a0a0a",
                border: "1px solid #333", borderRadius: 6, color: "#fff",
                fontSize: 14, outline: "none", marginBottom: 10, resize: "vertical"
              }}
            />
            <button
              onClick={addComment}
              style={{
                width: "100%", padding: "12px", backgroundColor: "#d4af37",
                color: "#000", border: "none", borderRadius: 6, fontWeight: "bold",
                fontSize: 14, cursor: "pointer"
              }}
            >
              {t.comments.submit}
            </button>
          </div>

          {/* Comments list */}
          {comments.length === 0 ? (
            <p style={{ textAlign: "center", color: "#555" }}>{t.comments.noComments}</p>
          ) : (
            comments.map((c: any) => (
              <div key={c.id} style={{
                backgroundColor: "#111", border: "1px solid #222", borderRadius: 10,
                padding: "18px", marginBottom: 12
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: 14 }}>{c.name}</span>
                    <span style={{ color: "#555", fontSize: 12, marginLeft: 10 }}>{c.date}</span>
                  </div>
                  <button
                    onClick={() => deleteComment(c.id)}
                    style={{
                      padding: "4px 10px", backgroundColor: "#1a1a1a", border: "1px solid #333",
                      borderRadius: 4, color: "#888", fontSize: 12, cursor: "pointer"
                    }}
                  >
                    {t.comments.delete}
                  </button>
                </div>
                <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{c.text}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SCRIPTURE */}
      <section style={{
        padding: "60px 20px", backgroundColor: "#0d0d0d",
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a0a 100%)"
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <blockquote style={{
            color: "#d4af37", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            fontStyle: "italic", lineHeight: 1.8, marginBottom: 15
          }}>
            &ldquo;{t.scripture.quote}&rdquo;
          </blockquote>
          <cite style={{ color: "#888", fontSize: 14 }}>— {t.scripture.source}</cite>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "30px", textAlign: "center", borderTop: "1px solid #222",
        color: "#555", fontSize: 13
      }}>
        <p>{t.footer}</p>
      </footer>

      {/* TELEGRAM CHAT WIDGET — outside all sections! */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          position: "fixed", bottom: 25, right: 25, zIndex: 100,
          width: 60, height: 60, borderRadius: "50%",
          backgroundColor: "#d4af37", border: "none", cursor: "pointer",
          fontSize: 28, boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
          transition: "transform 0.3s", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}
      >
        {chatOpen ? "✕" : "💬"}
      </button>

      {chatOpen && (
        <div style={{
          position: "fixed", bottom: 100, right: 25, zIndex: 100,
          width: 340, height: 440, backgroundColor: "#111",
          border: "1px solid #333", borderRadius: 16,
          display: "flex", flexDirection: "column",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
        }}>
          {/* Chat Header */}
          <div style={{
            padding: "15px 18px", borderBottom: "1px solid #222",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#25D366" }} />
              <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: 15 }}>{t.chat.title}</span>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ backgroundColor: "transparent", border: "none", color: "#888", fontSize: 18, cursor: "pointer" }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: 15, overflowY: "auto" }}>
            <div style={{ backgroundColor: "#1a1a1a", borderRadius: 12, padding: "12px 15px", marginBottom: 10, maxWidth: "85%" }}>
              <p style={{ color: "#ccc", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{t.chat.welcome}</p>
            </div>
            {chatStatus === "sent" && (
              <div style={{ backgroundColor: "#d4af3715", borderRadius: 12, padding: "10px 15px", marginBottom: 10, maxWidth: "85%", marginLeft: "auto" }}>
                <p style={{ color: "#d4af37", fontSize: 13, margin: 0 }}>{t.chat.sent}</p>
              </div>
            )}
            {chatStatus === "error" && (
              <div style={{ backgroundColor: "#ff000015", borderRadius: 12, padding: "10px 15px", marginBottom: 10, maxWidth: "85%", marginLeft: "auto" }}>
                <p style={{ color: "#ff6666", fontSize: 13, margin: 0 }}>{t.chat.error}</p>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: 12, borderTop: "1px solid #222", display: "flex", flexDirection: "column", gap: 8 }}>
            {!chatName && (
              <input
                type="text"
                placeholder={t.chat.namePlaceholder}
                value={chatName}
                onChange={(e: any) => setChatName(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none" }}
              />
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder={t.chat.messagePlaceholder}
                value={chatMsg}
                onChange={(e: any) => setChatMsg(e.target.value)}
                onKeyDown={(e: any) => e.key === "Enter" && sendChatMessage()}
                style={{ flex: 1, padding: "10px 12px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none" }}
              />
              <button onClick={sendChatMessage} disabled={chatStatus === "sending"} style={{ padding: "10px 16px", backgroundColor: "#d4af37", border: "none", borderRadius: 8, color: "#000", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>
                {chatStatus === "sending" ? "..." : "➤"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}