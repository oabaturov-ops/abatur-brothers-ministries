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
    titleRu: "Библейский путь к принятию Святого Духа",
    titleEn: "The Biblical Way to Receive the Holy Spirit",
    authorRu: "Кеннет Хейгин",
    authorEn: "Kenneth Hagin",
    descriptionRu: "Кенет Е. Хейгин показывает из Библии, как человек принимает крещение Святого Духом.",
    descriptionEn: "Kenneth E. Hagin shows from the Bible how a person receives the baptism of the Holy Spirit.",
    category: "faith",
    coverUrl: "/covers/prayer.jpg",
    pdfUrl: "/books/hagin-holy-spirit.pdf",
  },

  {
    id: 2,
    titleRu: "Восстановление сути пятидесятницы",
    titleEn: "Restoration of Pentecostal Essence",
    authorRu: "Б. Кленденнен",
    authorEn: "B. Clendenen",
    descriptionRu: "Книга о возвращении к первоначальному опыту ранней церкви и силе Святого Духа.",
    descriptionEn: "A book about returning to the original experience of the early church and the power of the Holy Spirit.",
    category: "christianLife",
    coverUrl: "/covers/faith.jpg",
    pdfUrl: "/books/klendennen-revival.pdf",
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