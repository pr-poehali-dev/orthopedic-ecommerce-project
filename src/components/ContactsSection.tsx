import Icon from "@/components/ui/icon";

export default function ContactsSection() {
  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Icon name="MapPin" size={14} />
            Контакты
          </div>
          <h1 className="text-4xl font-black text-foreground mb-4">Как с нами связаться</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Работаем с 9:00 до 18:00 по московскому времени, кроме выходных
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: "Phone",
              title: "Телефон",
              lines: ["8-800-555-00-00", "(бесплатно по России)", "+7 (495) 000-00-00", "(Москва и МО)"],
              cta: "Позвонить",
              ctaHref: "tel:88005550000",
              color: "bg-blue-50 text-blue-600",
            },
            {
              icon: "Mail",
              title: "Электронная почта",
              lines: ["info@medrehab.ru", "(общие вопросы)", "zakaz@medrehab.ru", "(заказы и сертификаты)"],
              cta: "Написать",
              ctaHref: "mailto:info@medrehab.ru",
              color: "bg-sky-50 text-sky-600",
            },
            {
              icon: "MapPin",
              title: "Адрес",
              lines: ["г. Москва,", "ул. Примерная, д. 1", "Шоу-рум: 1 этаж", "Пн–Пт: 9:00–18:00"],
              cta: "Построить маршрут",
              ctaHref: "#",
              color: "bg-indigo-50 text-indigo-600",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-3xl p-8 shadow-sm border border-border hover-lift">
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                <Icon name={item.icon as "Phone"} size={26} />
              </div>
              <h3 className="font-black text-xl mb-4">{item.title}</h3>
              <div className="space-y-1 mb-6">
                {item.lines.map((line, i) => (
                  <p key={i} className={i % 2 === 0 ? "font-semibold text-foreground" : "text-sm text-muted-foreground"}>
                    {line}
                  </p>
                ))}
              </div>
              <a
                href={item.ctaHref}
                className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
              >
                {item.cta}
                <Icon name="ArrowRight" size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Messengers */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-border mb-8">
          <h2 className="font-black text-xl mb-6 text-center">Мессенджеры и соцсети</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "MessageCircle", name: "WhatsApp", handle: "+7 (495) 000-00-00", color: "bg-green-50 text-green-600" },
              { icon: "Send", name: "Telegram", handle: "@medrehab_ru", color: "bg-sky-50 text-sky-600" },
              { icon: "Phone", name: "Viber", handle: "+7 (495) 000-00-00", color: "bg-purple-50 text-purple-600" },
              { icon: "MessageSquare", name: "ВКонтакте", handle: "vk.com/medrehab", color: "bg-blue-50 text-blue-700" },
            ].map((m) => (
              <div key={m.name} className={`rounded-2xl p-4 ${m.color} text-center`}>
                <div className="flex items-center justify-center mb-2">
                  <Icon name={m.icon as "MessageCircle"} size={24} />
                </div>
                <div className="font-bold text-sm mb-1">{m.name}</div>
                <div className="text-xs opacity-70">{m.handle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Work hours */}
        <div className="bg-primary rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Clock" size={24} />
              </div>
              <div>
                <h3 className="font-black text-lg">Время работы</h3>
                <p className="text-blue-100 text-sm">Мы всегда на связи в рабочее время</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              {[
                { day: "Понедельник–Пятница", hours: "9:00 – 18:00" },
                { day: "Суббота", hours: "10:00 – 15:00" },
                { day: "Воскресенье", hours: "Выходной" },
              ].map((w) => (
                <div key={w.day} className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-xs text-blue-200 mb-1">{w.day}</div>
                  <div className="font-bold">{w.hours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
