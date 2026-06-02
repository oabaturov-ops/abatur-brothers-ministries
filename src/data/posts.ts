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
    slug: "fakel",
    titleRu: "Свет факела скорбящему",
    titleEn: "Torchlight for the Grieving",
    excerptRu: "Факел необходим тому, кто во мраке. Разберём о чём это",
    excerptEn: "A torch is essential for those in darkness. Let's look at what that means.",
    contentRu: `Так презрен по мыслям сидящего в покое факел, приготовленный для спотыкающихся ногами. (Иов.12:5)
Мудрость, высказанная человеком, который проходил путь скорби. Не потому что он был убийцей или вором или мошенником. Нет. Это был вполне благочестивый и добропорядочный человек. Его звали Иов.\n\nЕго друзья, если так можно сказать, сидели с ним и вешали на него ярлыки беззакония, хотя "дружили" с ним много лет. Неужели они не знали его как человека? Видимо можно быть рядом с человеком, но не знать его. Но в контексте всей книги хочется другое сказать про этот отрывок из Библии. Приведённый выше отрывок можно изложить другими словами. Иов имеет ввиду, что зачем человеку факел, если он идёт по дороге жизни при свете. И ему непонятны поступки человека, который ищет факел, ведь жизнь прекрасна и удивительна и вокруг светит солнце. Но ищущий факел проходит нелегкий сезон в жизни, это сезон ночи, когда факел просто необходим. Очень интересная аллегория, образ из жизни. Не хотел бы я быть таким, который судит о человеке, который ищет факел. Я могу быть при свете дня, но не хочу судить того, кто проходит путь ночи.`,
    contentEn: `How despised is a torch prepared for those who stumble with their feet, in the thoughts of him who sits quietly. (Job 12:5)
Wisdom spoken by a man who walked the path of sorrow. Not because he was a murderer, a thief, or a fraud. No. He was a completely pious and upright man. His name was Job.\n\nHis friends, so to speak, sat with him and labeled him as a wicked man, even though they had been "friends" with him for many years. Didn't they really know him as a person? Apparently, one can be close to a person and still not know them. But in the context of the entire book, I want to say something else about this Bible passage. The above passage can be put differently. Job means why a person needs a torch if he walks the path of life by light. And he doesn't understand the actions of a person who seeks a torch, after all, life is beautiful and wonderful, and the sun shines all around. But the one seeking the torch goes through a difficult season in life, a season of darkness when the torch is absolutely necessary. A very interesting allegory, a true-life image. I wouldn't want to be the one judging the man seeking a torch. I can stand in the light of day, but I don't want to judge someone who walks the path of darkness.`,
    date: "2025-06-01",
    categoryRu: "Пост",
    categoryEn: "Article",
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