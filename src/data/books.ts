export interface Book {
  id: number;
  titleRu: string;
  titleEn: string;
  authorRu: string;
  authorEn: string;
  descriptionRu: string;
  descriptionEn: string;
  category: "prayer" | "faith" | "bible" | "christianLife";
  coverUrl: string;
  pdfUrl?: string;
  externalUrl?: string;
}

export const books: Book[] = [
  {
    id: 1,
    titleRu: "Сила молитвы",
    titleEn: "The Power of Prayer",
    authorRu: "Всеволод Абатуров",
    authorEn: "Vsevolod Abaturov",
    descriptionRu: "Практическое руководство к молитвенной жизни. Узнайте, как молитва меняет обстоятельства и сердца.",
    descriptionEn: "A practical guide to prayer life. Learn how prayer changes circumstances and hearts.",
    category: "prayer",
    coverUrl: "/covers/prayer.jpg",
    pdfUrl: "/books/prayer.pdf",
  },
  {
    id: 2,
    titleRu: "Основы веры",
    titleEn: "Foundations of Faith",
    authorRu: "Всеволод Абатуров",
    authorEn: "Vsevolod Abaturov",
    descriptionRu: "Основные доктрины христианской веры, изложенные простым и понятным языком для каждого верующего.",
    descriptionEn: "Essential doctrines of Christian faith, explained in simple language for every believer.",
    category: "faith",
    coverUrl: "/covers/faith.jpg",
    pdfUrl: "/books/faith.pdf",
  },
  {
    id: 3,
    titleRu: "Изучение Библии",
    titleEn: "Bible Study Guide",
    authorRu: "Всеволод Абатуров",
    authorEn: "Vsevolod Abaturov",
    descriptionRu: "Пошаговое руководство к глубокому изучению Священного Писания и применению его в повседневной жизни.",
    descriptionEn: "A step-by-step guide to deep Bible study and applying it to everyday life.",
    category: "bible",
    coverUrl: "/covers/bible.jpg",
    pdfUrl: "/books/bible-study.pdf",
  },
  {
    id: 4,
    titleRu: "Христианская жизнь",
    titleEn: "Christian Living",
    authorRu: "Олег Абатуров",
    authorEn: "Oleg Abaturov",
    descriptionRu: "Как жить по Слову Божьему каждый день. Практические советы для духовного роста.",
    descriptionEn: "How to live by God's Word every day. Practical advice for spiritual growth.",
    category: "christianLife",
    coverUrl: "/covers/life.jpg",
    pdfUrl: "/books/christian-life.pdf",
  },
];