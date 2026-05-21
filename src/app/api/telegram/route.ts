import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export async function POST(req: NextRequest) {
  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ success: false, error: "Bot not configured" });
    }

    const { name, message } = await req.json();

    const text = `📩 Сообщение с сайта abaturministry.org\n\n👤 Имя: ${name}\n💬 Сообщение: ${message}`;

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: data.description });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}