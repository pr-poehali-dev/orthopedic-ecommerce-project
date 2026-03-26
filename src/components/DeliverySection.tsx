import Icon from "@/components/ui/icon";

export default function DeliverySection() {
  const methods = [
    {
      icon: "Truck",
      title: "Курьерская доставка",
      desc: "Доставка на дом в удобное время. Москва и МО — 1–2 дня, регионы — 3–7 дней",
      price: "от 350 ₽",
      free: "Бесплатно от 5 000 ₽",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: "Package",
      title: "Транспортные компании",
      desc: "СДЭК, Деловые линии, ПЭК. Для крупногабаритных изделий (коляски, тренажёры)",
      price: "от 450 ₽",
      free: "Расчёт по тарифу ТК",
      color: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      icon: "MapPin",
      title: "Самовывоз",
      desc: "Из нашего шоу-рума в Москве. Можно примерить и получить консультацию специалиста",
      price: "Бесплатно",
      free: "Работаем Пн–Пт 9:00–18:00",
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      icon: "Globe",
      title: "Доставка в регионы",
      desc: "Доставляем во все регионы России включая Сибирь, Дальний Восток и Крайний Север",
      price: "Индивидуально",
      free: "Рассчитает менеджер",
      color: "bg-teal-50",
      iconColor: "text-teal-600",
    },
  ];

  const steps = [
    { step: "01", title: "Оформите заказ", desc: "Выберите товары, укажите адрес доставки и способ оплаты" },
    { step: "02", title: "Подтверждение", desc: "Менеджер свяжется с вами в течение 30 минут для подтверждения" },
    { step: "03", title: "Сборка и отправка", desc: "Товар проходит проверку качества и упаковывается для доставки" },
    { step: "04", title: "Доставка", desc: "Получайте заказ удобным способом — курьером или в точке выдачи" },
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Icon name="Truck" size={14} />
            Доставка и самовывоз
          </div>
          <h1 className="text-4xl font-black text-foreground mb-4">Доставляем по всей России</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите удобный способ получения заказа. Крупногабаритные товары доставляем на этаж
          </p>
        </div>

        {/* Methods */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {methods.map((m) => (
            <div key={m.title} className={`rounded-2xl p-6 ${m.color} border border-white hover-lift`}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Icon name={m.icon as "Truck"} size={22} className={m.iconColor} />
              </div>
              <h3 className="font-bold text-foreground mb-2">{m.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{m.desc}</p>
              <div className="space-y-1">
                <div className="text-base font-black text-primary">{m.price}</div>
                <div className="text-xs text-muted-foreground">{m.free}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-border mb-12">
          <h2 className="text-2xl font-black text-center text-foreground mb-10">Как проходит доставка</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-black text-lg mb-4 shadow-lg">
                  {s.step}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 w-full h-px bg-primary/20 ml-4" />
                  )}
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important info */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: "AlertCircle", title: "Крупногабаритные товары", desc: "Инвалидные коляски, ходунки, медицинские кровати доставляем только курьером или ТК с подъёмом на этаж." },
            { icon: "FileText", title: "Документы для ФСС", desc: "При оформлении через электронный сертификат подготовим все необходимые документы и накладные." },
            { icon: "RotateCcw", title: "Возврат и обмен", desc: "Товар надлежащего качества можно вернуть в течение 14 дней. Медицинские изделия — по условиям закона." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as "AlertCircle"} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
