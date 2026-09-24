import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import SwRegister from "./SwRegister";

export const metadata: Metadata = {
  title: "Abatur Brothers Ministries",
  description: "... и узрит Его всякое око... (Откр.1:7). Сайт - Онлайн Служение. Sola scriptura (лат.) Только Писание.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fbbf24" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <LanguageProvider>
                  {/* Верхняя плашка: назад на основной сайт */}
        <div
          style={{
            backgroundColor: "#0a0a0a",
            borderBottom: "1px solid #d4af3733",
            position: "relative",
            zIndex: 50,
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 20px" }}>
            <a
              href="https://abaturministry.org"
              style={{
                color: "#d4af37",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ← На сайт
            </a>
          </div>
        </div>
          {children}
        </LanguageProvider>
        <Analytics />
        <SwRegister />
      </body>
    </html>
  );
}