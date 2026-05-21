export type Language = "ru" | "en";

export const translations = {
  ru: {
    nav: {
      brand: "ABATUR MINISTRIES",
      about: "О нас",
      events: "События",
      team: "Команда",
      mission: "Миссия",
      contacts: "Контакты",
      comments: "Комментарии",
    },
    hero: {
      title1: "Abatur Brothers",
      titleHighlight: "Ministries",
      subtitle: "Несём свет и надежду в мир. Служение, вера, единство.",
      cta1: "Узнать больше",
      cta2: "Связаться с нами",
    },
    about: {
      heading: "О нас",
      faith: {
        title: "Вера",
        text: "Мы верим в силу молитвы и единство верующих. Наша вера — это фундамент всего, что мы делаем.",
      },
      ministry: {
        title: "Служение",
        text: "Мы служим людям через слово, молитву и дела. Каждое служение — это возможность прикоснуться к сердцу.",
      },
      unity: {
        title: "Единство",
        text: "В единстве — сила. Мы строим сообщество, где каждый важен и каждый услышан.",
      },
    },
    events: {
      heading: "События",
      items: [
        { date: "15 июня", title: "Вечер молитвы", tag: "Молитва" },
        { date: "22 июня", title: "Молодёжная встреча", tag: "Молодёжь" },
        { date: "29 июня", title: "Библейское изучение", tag: "Обучение" },
      ],
    },
    team: {
      heading: "Наша команда",
      members: [
        {
          name: "Олег Абатуров",
          role: "Основатель служения",
          desc: "Призван нести Евангелие. Толкование снов на основании Библии согласно учению Джона Пола Джексона.",
        },
        {
          name: "Всеволод Абатуров",
          role: "Основатель служения",
          desc: "Призван учить Слову Божьему. Статьи, лекции, онлайн-встречи",
        },
      ],
    },
    mission: {
      heading: "Наша миссия",
      text: "Наша миссия — нести свет Евангелия каждому сердцу, строить крепкую веру и поддерживать друг друга на пути служения.",
      items: [
        "Проповедь Слова Божьего",
        "Молитвенная поддержка",
        "Молодёжное служение",
        "Обучение и духовный рост",
        "Помощь нуждающимся",
        "Единство братьев и сестёр",
      ],
    },
    contacts: {
      heading: "Напишите нам",
      subtitle: "Заполните форму и выберите, куда отправить сообщение",
      namePlaceholder: "Ваше имя",
      emailPlaceholder: "Email",
      messagePlaceholder: "Ваше сообщение",
      chooseChannel: "Выберите, куда отправить:",
      sendVia: "Отправить через",
      channels: {
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
        facebook: "Facebook",
      },
      info: [
        { label: "WhatsApp", value: "+1 (555) 123-4567" },
        { label: "Telegram", value: "@abaturministries" },
        { label: "Email", value: "info@abaturministries.org" },
        { label: "Facebook", value: "Abatur Brothers" },
      ],
    },
    comments: {
      heading: "Комментарии",
      subtitle: "Поделитесь вашими мыслями и пожеланиями",
      namePlaceholder: "Ваше имя",
      commentPlaceholder: "Ваш комментарий...",
      submit: "Добавить комментарий",
      delete: "Удалить",
      noComments: "Пока нет комментариев. Будьте первым!",
      messageLabel: "сообщение",
    },
      // Чат-виджет
    chat: {
      title: "Чат с нами",
      welcome: "Здравствуйте! Напишите нам, и мы ответим в Telegram.",
      namePlaceholder: "Ваше имя",
      messagePlaceholder: "Ваше сообщение...",
      send: "Отправить",
      sending: "Отправка...",
      sent: "Сообщение отправлено!",
      error: "Ошибка. Попробуйте позже.",
    },
    scripture: {
      quote: "Ибо где двое или трое собраны во имя Моё, там Я посреди них.",
      source: "Матфея 18:20",
    },
    footer: "© 2026 Abatur Brothers Ministries. Все права защищены.",
    
  },

  en: {
    nav: {
      brand: "ABATUR MINISTRIES",
      about: "About",
      events: "Events",
      team: "Team",
      mission: "Mission",
      contacts: "Contacts",
      comments: "Comments",
    },
    hero: {
      title1: "Abatur Brothers",
      titleHighlight: "Ministries",
      subtitle: "Bringing light and hope to the world. Ministry, faith, unity.",
      cta1: "Learn More",
      cta2: "Contact Us",
    },
    about: {
      heading: "About Us",
      faith: {
        title: "Faith",
        text: "We believe in the power of prayer and the unity of believers. Our faith is the foundation of everything we do.",
      },
      ministry: {
        title: "Ministry",
        text: "We serve people through the Word, prayer, and deeds. Every ministry is an opportunity to touch a heart.",
      },
      unity: {
        title: "Unity",
        text: "There is strength in unity. We build a community where everyone matters and everyone is heard.",
      },
    },
    events: {
      heading: "Events",
      items: [
        { date: "June 15", title: "Prayer Evening", tag: "Prayer" },
        { date: "June 22", title: "Youth Gathering", tag: "Youth" },
        { date: "June 29", title: "Bible Study", tag: "Study" },
      ],
    },
    team: {
      heading: "Our Team",
      members: [
        {
          name: "Oleg Abaturov",
          role: "Founder",
          desc: "The founder of the ministry. Evangelization. Interpretation of dreams based on the Bible according to the teachings of John Paul Jackson.",
        },
        {
          name: "Vsevolod Abaturov",
          role: "Founder",
          desc: "The founder of the ministry. He is called to teach the Word of God. Articles, lectures, online meetings.",
        },
      ],
    },
    mission: {
      heading: "Our Mission",
      text: "Our mission is to bring the light of the Gospel to every heart, build strong faith, and support each other on the path of ministry.",
      items: [
        "Preaching the Word of God",
        "Prayer support",
        "Youth ministry",
        "Teaching and spiritual growth",
        "Helping those in need",
        "Unity of brothers and sisters",
      ],
    },
    contacts: {
      heading: "Write to Us",
      subtitle: "Fill out the form and choose where to send your message",
      namePlaceholder: "Your name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Your message",
      chooseChannel: "Choose where to send:",
      sendVia: "Send via",
      channels: {
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
        facebook: "Facebook",
      },
      info: [
        { label: "WhatsApp", value: "+1 (555) 123-4567" },
        { label: "Telegram", value: "@abaturministries" },
        { label: "Email", value: "info@abaturministries.org" },
        { label: "Facebook", value: "Abatur Brothers" },
      ],
    },
    comments: {
      heading: "Comments",
      subtitle: "Share your thoughts and wishes",
      namePlaceholder: "Your name",
      commentPlaceholder: "Your comment...",
      submit: "Add Comment",
      delete: "Delete",
      noComments: "No comments yet. Be the first!",
      messageLabel: "message",
    },
        // Chat widget
    chat: {
      title: "Chat with us",
      welcome: "Hello! Write to us and we will reply in Telegram.",
      namePlaceholder: "Your name",
      messagePlaceholder: "Your message...",
      send: "Send",
      sending: "Sending...",
      sent: "Message sent!",
      error: "Error. Please try again later.",
    },
    scripture: {
      quote: "For where two or three gather in my name, there am I with them.",
      source: "Matthew 18:20",
    },
    footer: "© 2026 Abatur Brothers Ministries. All rights reserved.",
  },
};