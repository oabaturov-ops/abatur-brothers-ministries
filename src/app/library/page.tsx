import { redirect } from "next/navigation";

// Старая страница «Библиотека» переехала в книжный магазин
// books.abaturministry.org. Все посетители автоматически
// перенаправляются туда, чтобы каждое скачивание книги
// фиксировалось (запись в базе + уведомление в Telegram).
export default function Library() {
  redirect("https://books.abaturministry.org");
}
