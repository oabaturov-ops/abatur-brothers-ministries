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
    externalUrl: "https://drive.google.com/uc?export=download&id=1AybJbTIm992FQf7KgOlZJTriXpcLeKrB",
  },

  {    id: 2,
    titleRu: "Восстановление сути пятидесятницы",
    titleEn: "Restoration of Pentecostal Essence",
    authorRu: "Б. Кленденнен",
    authorEn: "B. Clendenen",
    descriptionRu: "Книга о возвращении к первоначальному опыту ранней церкви и силе Святого Духа.",
    descriptionEn: "A book about returning to the original experience of the early church and the power of the Holy Spirit.",
    category: "christianLife",
    coverUrl: "/covers/faith.jpg",
    externalUrl: "https://drive.google.com/uc?export=download&id=1Ftd1VsplGiTPt5MitfEkLAWQ0ATVdaf5",
  },
  
];
