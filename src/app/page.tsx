"use client";

import { useState } from 'react';
function ContactForm() {
  const [form, setForm]: any = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="max-w-lg mx-auto bg-[#111] border border-[#d4af37]/30 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✝️</div>
        <h3 className="text-2xl font-bold text-[#d4af37] mb-3">Спасибо!</h3>
        <p className="text-gray-400">Ваше сообщение получено. Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <input name="name" placeholder="Ваше имя" onChange={handleChange} required
          className="bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#d4af37] outline-none transition-colors" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required
          className="bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#d4af37] outline-none transition-colors" />
      </div>
      <input name="subject" placeholder="Тема" onChange={handleChange} required
        className="bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#d4af37] outline-none transition-colors" />
      <textarea name="message" placeholder="Ваше сообщение" onChange={handleChange} required rows={5}
        className="bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#d4af37] outline-none transition-colors resize-none"></textarea>
      <button type="submit"
        className="bg-[#d4af37] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e6c248] transition-all hover:scale-[1.02] cursor-pointer border-none">
        Отправить сообщение
      </button>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-[#111] border border-[#222] rounded-xl p-5 text-center">
          <div className="text-[#d4af37] text-xl mb-1">📧</div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-white font-medium text-sm">contact@abaturbrothers.org</p>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-xl p-5 text-center">
          <div className="text-[#d4af37] text-xl mb-1">📱</div>
          <p className="text-gray-400 text-sm">Telegram</p>
          <p className="text-white font-medium text-sm">@AbaturBrothers</p>
        </div>
      </div>
    </form>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#333]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-[#d4af37]">
            ABATUR BROTHERS
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-gray-300 hover:text-[#d4af37] transition-colors">Главная</a>
            <a href="#about" className="text-gray-300 hover:text-[#d4af37] transition-colors">О нас</a>
            <a href="#mission" className="text-gray-300 hover:text-[#d4af37] transition-colors">Миссия</a>
            <a href="#contacts" className="text-gray-300 hover:text-[#d4af37] transition-colors">Контакты</a>
            <a href="#contacts" className="bg-[#d4af37] text-black px-5 py-2 rounded-full font-bold hover:bg-[#e6c248] transition-colors">
              Связаться
            </a>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-white text-2xl cursor-pointer bg-transparent border-none"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-6">
            <a href="#home" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#d4af37]">Главная</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#d4af37]">О нас</a>
            <a href="#mission" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#d4af37]">Миссия</a>
            <a href="#contacts" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#d4af37]">Контакты</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0a]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[120px]"></div>
        <div className="relative text-center max-w-3xl">
          <div className="text-[#d4af37] text-sm font-bold tracking-[6px] uppercase mb-6">
            Ministry
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Abatur Brothers
            <span className="block text-[#d4af37]">Ministries</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            Несём свет и надежду в мир. Наша миссия — служить людям,
            укреплять веру и строить мосты между сердцами.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#mission" className="bg-[#d4af37] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#e6c248] transition-all hover:scale-105">
              Наша миссия
            </a>
            <a href="#about" className="border-2 border-[#d4af37] text-[#d4af37] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d4af37] hover:text-black transition-all">
              Узнать больше
            </a>
          </div>
        </div>
      </section>

      {/* О нас */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#d4af37] text-sm font-bold tracking-[4px] uppercase mb-4">About Us</div>
            <h2 className="text-4xl font-bold mb-6">О нас</h2>
            <div className="w-20 h-1 bg-[#d4af37] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🙏', title: 'Вера', desc: 'Мы верим в силу единства и любовь, которая объединяет людей независимо от их происхождения.' },
              { icon: '📖', title: 'Служение', desc: 'Наше служение направлено на поддержку духовного роста и благополучия каждой личности.' },
              { icon: '🌍', title: 'Единство', desc: 'Мы объединяем людей разных культур и традиций в общую цель служения миру.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#111] border border-[#222] rounded-2xl p-8 text-center hover:border-[#d4af37]/50 transition-colors">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#d4af37] mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* События */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#d4af37] text-sm font-bold tracking-[4px] uppercase mb-4">Events</div>
            <h2 className="text-4xl font-bold mb-6">Ближайшие события</h2>
            <div className="w-20 h-1 bg-[#d4af37] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                date: '21',
                month: 'ИЮН',
                title: 'Вечер молитвы',
                desc: 'Еженедельное молитвенное собрание для всех желающих.',
                time: '19:00',
                tag: 'Каждую неделю',
              },
              {
                date: '05',
                month: 'ИЮЛ',
                title: 'Молодёжная конференция',
                desc: 'Конференция для молодёжи с музыкой, выступлениями и общением.',
                time: '10:00 - 18:00',
                tag: 'Конференция',
              },
              {
                date: '12',
                month: 'ИЮЛ',
                title: 'Благотворительный концерт',
                desc: 'Музыкальный вечер в поддержку нуждающихся семей.',
                time: '18:00',
                tag: 'Благотворительность',
              },
            ].map((event, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden hover:border-[#d4af37]/30 transition-colors group">
                <div className="bg-[#d4af37]/10 p-6 flex items-center gap-4 group-hover:bg-[#d4af37]/20 transition-colors">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#d4af37]">{event.date}</div>
                    <div className="text-[#d4af37] text-xs font-bold tracking-wider">{event.month}</div>
                  </div>
                  <div>
                    <span className="bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold px-3 py-1 rounded-full">{event.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{event.desc}</p>
                  <div className="text-gray-500 text-sm flex items-center gap-2">
                    <span>🕐</span> {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* Наша команда */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#d4af37] text-sm font-bold tracking-[4px] uppercase mb-4">Our Team</div>
            <h2 className="text-4xl font-bold mb-6">Наша команда</h2>
            <div className="w-20 h-1 bg-[#d4af37] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Олег Абатуров',
                role: 'Основатель',
                desc: 'Призван нести Евангелие. Толкование снов. Более 30 лет в служении.',
                initial: 'ОА',
              },
              {
                name: 'Всеволод Абатуров',
                role: 'Основатель',
                desc: 'Призван нести Евангелие. Учить Слову Божию. Более 30 лет в служении.',
                initial: 'ВА',
              },
            ].map((member, i) => (
              <div key={i} className="bg-[#111] border border-[#222] rounded-2xl p-8 flex gap-6 items-start hover:border-[#d4af37]/30 transition-colors">
                <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37] font-bold text-xl flex-shrink-0">
                  {member.initial}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#d4af37] text-sm font-bold mb-3">{member.role}</p>
                  <p className="text-gray-400 leading-relaxed text-sm">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Миссия */}
      <section id="mission" className="py-24 px-6 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#d4af37] text-sm font-bold tracking-[4px] uppercase mb-4">Our Mission</div>
          <h2 className="text-4xl font-bold mb-6">Наша миссия</h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-12"></div>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Мы призваны нести свет Евангелия, служить сообществу и поддерживать тех,
            кто нуждается в помощи. Через молитву, служение и любовь мы стремимся
            изменить мир к лучшему — одно сердце за раз.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {[
              'Еженедельные собрания и молитвы',
              'Помощь нуждающимся',
              'Образовательные программы',
              'Молодёжные инициативы',
              'Поддержка семей',
              'Международное сотрудничество',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-left bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
                <div className="w-2 h-2 bg-[#d4af37] rounded-full flex-shrink-0"></div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Отзывы */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#d4af37] text-sm font-bold tracking-[4px] uppercase mb-4">Testimonials</div>
            <h2 className="text-4xl font-bold mb-6">Что говорят о нас</h2>
            <div className="w-20 h-1 bg-[#d4af37] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: 'Благодаря этому служению моя жизнь изменилась. Я нашёл веру, друзей и цель. Благодарю Бога за братьев Абатур!',
                name: 'Алексей',
                city: 'Москва',
              },
              {
                text: 'Молодёжные конференции — это невероятная атмосфера. Здесь чувствуешь настоящую любовь и поддержку.',
                name: 'Мария',
                city: 'Санкт-Петербург',
              },
              {
                text: 'Каждое собрание наполнено светом и надеждой. Это место, куда хочется возвращаться снова и снова.',
                name: 'Дмитрий',
                city: 'Казань',
              },
            ].map((review, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 hover:border-[#d4af37]/30 transition-colors">
                <div className="text-[#d4af37] text-3xl mb-4">&ldquo;</div>
                <p className="text-gray-300 leading-relaxed mb-6">{review.text}</p>
                <div className="border-t border-[#222] pt-4">
                  <div className="font-bold">{review.name}</div>
                  <div className="text-gray-500 text-sm">{review.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* Контакты */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[#d4af37] text-sm font-bold tracking-[4px] uppercase mb-4">Contact</div>
          <h2 className="text-4xl font-bold mb-6">Связаться с нами</h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-12"></div>
        </div>
        <ContactForm />
      </section>
      {/* Писание дня */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#111] border border-[#d4af37]/20 rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/5 rounded-full blur-[60px]"></div>
            <div className="text-[#d4af37] text-sm font-bold tracking-[4px] uppercase mb-6">Daily Scripture</div>
            <blockquote className="text-2xl md:text-3xl text-gray-200 leading-relaxed mb-6 italic">
              &ldquo;Ибо Я знаю мысли, какие думаю о вас, говорит Господь,
              мысли о мире, а не о зле, чтобы дать вам будущее и надежду.&rdquo;
            </blockquote>
            <div className="text-[#d4af37] font-bold text-lg mb-2">Иеремия 29:11</div>
            <div className="w-12 h-[2px] bg-[#d4af37]/50 mx-auto my-6"></div>
            <p className="text-gray-500 text-sm">
              Каждый день — новая надежда и новая возможность служить.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-[#222] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[#d4af37] font-bold">ABATUR BROTHERS MINISTRIES</div>
          <div className="text-gray-500 text-sm">© 2026 Все права защищены</div>
        </div>
      </footer>
    </div>
  );
}