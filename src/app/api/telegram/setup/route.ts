import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.BOT_TOKEN;

export async function GET() {
  try {
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: "BOT_TOKEN not set" });
    }

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`
    );

    const data = await response.json();

    if (data.ok && data.result.length > 0) {
      // Берём последнее сообщение
      const lastUpdate = data.result[data.result.length - 1];
      const chatId = lastUpdate.message?.chat?.id;
      const name = lastUpdate.message?.chat?.first_name || "Unknown";
      const username = lastUpdate.message?.chat?.username || "no username";

      return NextResponse.json({
        chat_id: chatId,
        name: name,
        username: username,
        message: "Добавь это число в CHAT_ID в файле .env.local"
      });
    } else {
      return NextResponse.json({
        error: "Нет сообщений. Сначала отправь сообщение боту @Abaturministry_bot в Telegram"
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}