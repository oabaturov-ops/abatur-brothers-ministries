import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Abatur Brothers Ministries",
  description: "Несём свет и надежду в мир. Служение, вера, единство.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 0 }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}