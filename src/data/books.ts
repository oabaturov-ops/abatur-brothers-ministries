export interface Book {
  id: number;
  titleRu: string;
  titleEn: string;
  authorRu: string;
  authorEn: string;
  descriptionRu: string;
  descriptionEn: string;
  externalUrl: string;
  coverUrl: string;
}


export const books: Book[] = [
   {
    id: 1,
    titleRu: "Библейский способ принятия Святого Духа",
    titleEn: "The Biblical Way to Receive the Holy Spirit",
    authorRu: "Кеннет Хейгин",
    authorEn: "Kenneth Hagin",
    descriptionRu: "Подробное учение о Духе Святом, Его даровании и силе, доступной каждому верующему.",
    descriptionEn: "A detailed teaching on the Holy Spirit, His gifts, and the power available to every believer.",
    externalUrl: "https://drive.google.com/uc?export=download&id=1AybJbTIm992FQf7KgOlZJTriXpcLeKrB",
    coverUrl: "/images/book1.jpg"
  },

  {    id: 2,
    titleRu: "Восстановление сути пятидесятницы",
    titleEn: "Restoration of Pentecostal Essence",
    authorRu: "Б. Кленденнен",
    authorEn: "B. Clendenen",
    descriptionRu: "Книга о возвращении к первоначальному опыту ранней церкви и силе Святого Духа.",
    descriptionEn: "A book about returning to the original experience of the early church and the power of the Holy Spirit.",
    externalUrl: "https://drive.google.com/uc?export=download&id=1Ftd1VsplGiTPt5MitfEkLAWQ0ATVdaf5",
    coverUrl: "/covers/faith.jpg",
  },
  
];
