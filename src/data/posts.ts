export interface Post {
  id: number;
  slug: string;
  titleRu: string;
  titleEn: string;
  excerptRu: string;
  excerptEn: string;
  contentRu: string;
  contentEn: string;
  date: string;
  categoryRu: string;
  categoryEn: string;
  readTime: string;
}

export const posts: Post[] = [
  {
    id: 1,
    slug: "sila-molitvy",
    titleRu: "Сила молитвы: как Бог отвечает на наши просьбы",
    titleEn: "The Power of Prayer: How God Answers Our Requests",
    excerptRu: "Молитва — это не просто слова, это разговор с Творцом Вселенной. В этой статье мы рассмотрим, как молитва меняет обстоятельства и сердца людей.",
    excerptEn: "Prayer is not just words, it is a conversation with the Creator of the Universe. In this article we explore how prayer changes circumstances and hearts.",
    contentRu: `Молитва — один из самых мощных инструментов, данных человеку. Когда мы молимся, мы не просто произносим слова — мы вступаем в общение с Богом.\n\nМногие люди задают вопрос: "Почему Бог не отвечает на мои молитвы?" Ответ кроется в нескольких важных принципах.\n\nВо-первых, молитва должна быть искренней. Бог ищет не правильных формулировок, а честное сердце. Когда мы приходим к Нему такими, какие мы есть, Он отвечает.\n\nВо-вторых, вера играет ключевую роль. Иисус говорил: "Всё, чего ни будете просить в молитве, верьте, что получите, и будет вам" (Марка 11:24).\n\nВ-третьих, нужно уметь ждать. Ответ Бога может прийти не сразу, но Он всегда отвечает в своё время. Иногда ответом является не то, что мы просили, а то, что нам действительно нужно.\n\nПрактические шаги для укрепления молитвенной жизни:\n\n1. Выделяйте время каждый день для молитвы\n2. Начинайте с благодарности\n3. Молитесь за других людей\n4. Ведите молитвенный дневник\n5. Читайте Библию перед молитвой`,
    contentEn: `Prayer is one of the most powerful tools given to humanity. When we pray, we don't just speak words — we enter into communion with God.\n\nMany people ask: "Why doesn't God answer my prayers?" The answer lies in several important principles.\n\nFirst, prayer must be sincere. God seeks not correct formulations, but an honest heart. When we come to Him as we are, He answers.\n\nSecond, faith plays a key role. Jesus said: "Whatever you ask for in prayer, believe that you have received it, and it will be yours" (Mark 11:24).\n\nThird, you need to know how to wait. God's answer may not come immediately, but He always answers in His time. Sometimes the answer is not what we asked for, but what we truly need.\n\nPractical steps for strengthening your prayer life:\n\n1. Set aside time each day for prayer\n2. Start with gratitude\n3. Pray for other people\n4. Keep a prayer journal\n5. Read the Bible before praying`,
    date: "2025-01-15",
    categoryRu: "Молитва",
    categoryEn: "Prayer",
    readTime: "5 мин",
  },
  {
    id: 2,
    slug: "vera-v-tyazhelye-momenty",
    titleRu: "Как сохранять веру в тяжёлые моменты жизни",
    titleEn: "How to Keep Faith in Difficult Times",
    excerptRu: "Жизнь полна испытаний, но именно в трудностях наша вера закаляется. Узнайте, как опираться на Божьи обетования, когда всё вокруг рушится.",
    excerptEn: "Life is full of trials, but it is in difficulties that our faith is strengthened. Learn how to lean on God's promises when everything around you is falling apart.",
    contentRu: `Каждый из нас сталкивается с моментами, когда вера подвергается испытанию. Потеря близкого человека, финансовые трудности, проблемы со здоровьем — всё это может пошатнуть даже самую крепкую веру.\n\nНо именно в такие моменты Бог ближе всего к нам. Псалмопевец Давид писал: "Близок Господь к сокрушённым сердцем и спасет смиренных духом" (Псалом 33:19).\n\nВот несколько принципов, которые помогут сохранить веру:\n\nПомните о прошлых ответах Бога. Когда мы вспоминаем, как Бог действовал в нашей жизни раньше, это даёт нам силу верить Ему и сейчас.\n\nОбщайтесь с верующими. Не изолируйте себя. Церковь, группа молитвы, духовный наставник — всё это источники поддержки.\n\nЧитайте Библию. Слова Писания — это не просто текст, это живое слово Бога, которое даёт силу и надежду.\n\nМолитесь честно. Богу не нужны красивые фразы. Скажите Ему: "Господи, мне трудно, помоги мне поверить". Такая молитва угодна Богу.\n\nВерьте, несмотря на обстоятельства. Авраам "не поколебался в обетовании Божием неверием, но пребыл твёрд в вере" (Римлянам 4:20).`,
    contentEn: `Each of us faces moments when faith is tested. The loss of a loved one, financial difficulties, health problems — all of these can shake even the strongest faith.\n\nBut it is in such moments that God is closest to us. The Psalmist David wrote: "The Lord is close to the brokenhearted and saves those who are crushed in spirit" (Psalm 34:18).\n\nHere are some principles to help you maintain your faith:\n\nRemember God's past answers. When we recall how God acted in our lives before, it gives us strength to trust Him now.\n\nFellowship with believers. Don't isolate yourself. Church, prayer group, spiritual mentor — these are all sources of support.\n\nRead the Bible. The words of Scripture are not just text, they are the living word of God that gives strength and hope.\n\nPray honestly. God doesn't need beautiful phrases. Tell Him: "Lord, it's hard for me, help me believe." Such a prayer is pleasing to God.\n\nBelieve despite circumstances. Abraham "did not waver through unbelief regarding the promise of God, but was strengthened in his faith" (Romans 4:20).`,
    date: "2025-01-10",
    categoryRu: "Вера",
    categoryEn: "Faith",
    readTime: "6 мин",
  },
  {
    id: 3,
    slug: "edinstvo-v-cerkvi",
    titleRu: "Единство в церкви: почему мы призваны быть вместе",
    titleEn: "Unity in the Church: Why We Are Called to Be Together",
    excerptRu: "Библия говорит, что где двое или трое собраны во имя Христа, там Он посреди них. Почему единство верующих так важно и как его укреплять?",
    excerptEn: "The Bible says that where two or three are gathered in the name of Christ, He is in the midst of them. Why is the unity of believers so important and how to strengthen it?",
    contentRu: `Иисус молился о единстве Своих последователей: "Да будут все едино, как Ты, Отче, во Мне, и Я в Тебе" (Иоанна 17:21). Эта молитва остаётся актуальной и сегодня.\n\nЕдинство — это не одинаковость. Мы все разные: у нас разные таланты, разные путаницы к Богу, разные характеры. Но именно в этом разнообразии проявляется красота Тела Христова.\n\nПочему единство важно?\n\nМир видит Бога через наше единство. Иисус сказал: "По тому узнают все, что вы Мои ученики, если будете иметь любовь между собою" (Иоанна 13:35).\n\nВ единстве — сила. Один человек может сделать немного, но вместе мы можем изменить мир. Раннехристианская церковь росла именно благодаря единству и взаимной поддержке.\n\nКак укреплять единство?\n\n1. Прощайте друг друга быстро\n2. Хвалите вместо критики\n3. Молитесь вместе\n4. Служите друг другу\n5. Помните, что мы одна семья`,
    contentEn: `Jesus prayed for the unity of His followers: "May they all be one, as You, Father, are in Me, and I in You" (John 17:21). This prayer remains relevant today.\n\nUnity is not uniformity. We are all different: different talents, different journeys to God, different personalities. But it is in this diversity that the beauty of the Body of Christ is revealed.\n\nWhy is unity important?\n\nThe world sees God through our unity. Jesus said: "By this everyone will know that you are my disciples, if you love one another" (John 13:35).\n\nThere is strength in unity. One person can do little, but together we can change the world. The early Christian church grew precisely because of unity and mutual support.\n\nHow to strengthen unity?\n\n1. Forgive each other quickly\n2. Praise instead of criticizing\n3. Pray together\n4. Serve one another\n5. Remember that we are one family`,
    date: "2025-01-05",
    categoryRu: "Церковь",
    categoryEn: "Church",
    readTime: "4 мин",
  },
];