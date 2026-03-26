import Icon from "@/components/ui/icon";

export default function PaymentSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-sky-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Icon name="CreditCard" size={14} />
            Способы оплаты
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Удобная оплата любым способом
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Принимаем электронные сертификаты ФСС, ЭС реабилитации, а также все банковские карты
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "FileCheck",
              title: "Электронный сертификат ФСС",
              desc: "Оплата по программе реабилитации инвалидов через фонд социального страхования",
              highlight: true,
            },
            {
              icon: "BadgeCheck",
              title: "Сертификат ГАРАНТИЯ",
              desc: "Ваучеры по региональным программам социальной поддержки граждан",
              highlight: true,
            },
            {
              icon: "CreditCard",
              title: "Банковская карта",
              desc: "Visa, Mastercard, МИР — безопасная оплата через защищённый шлюз",
              highlight: false,
            },
            {
              icon: "Smartphone",
              title: "СБП и электронные кошельки",
              desc: "Оплата через систему быстрых платежей, SberPay, T-Pay",
              highlight: false,
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl p-6 ${
                item.highlight
                  ? "bg-white shadow-xl"
                  : "bg-white/10 border border-white/20"
              } transition-all hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                item.highlight ? "bg-primary/10" : "bg-white/20"
              }`}>
                <Icon
                  name={item.icon as "FileCheck"}
                  size={24}
                  className={item.highlight ? "text-primary" : "text-white"}
                />
              </div>
              <h3 className={`font-bold mb-2 ${item.highlight ? "text-foreground" : "text-white"}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${item.highlight ? "text-muted-foreground" : "text-blue-100"}`}>
                {item.desc}
              </p>
              {item.highlight && (
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  <Icon name="CheckCircle" size={12} />
                  Доступно
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="Info" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold mb-1">Как использовать электронный сертификат?</h4>
              <p className="text-blue-100 text-sm">
                Укажите номер сертификата при оформлении заказа. Наш менеджер свяжется с вами для подтверждения
                и оформления всех необходимых документов. Помогаем с оформлением через ФСС и региональные программы.
              </p>
            </div>
            <button className="flex-shrink-0 bg-white text-primary hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
