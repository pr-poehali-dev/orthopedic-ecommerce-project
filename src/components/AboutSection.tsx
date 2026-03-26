import Icon from "@/components/ui/icon";

interface AboutSectionProps {
  fullPage?: boolean;
}

export default function AboutSection({ fullPage = false }: AboutSectionProps) {
  const stats = [
    { value: "15", unit: "лет", label: "на рынке медицинских товаров" },
    { value: "2000+", unit: "", label: "наименований товаров" },
    { value: "50 000+", unit: "", label: "довольных клиентов" },
    { value: "100%", unit: "", label: "сертифицированная продукция" },
  ];

  const values = [
    { icon: "Shield", title: "Надёжность", desc: "Все товары сертифицированы и прошли проверку качества" },
    { icon: "Heart", title: "Забота", desc: "Помогаем подобрать нужное изделие с учётом диагноза и рекомендаций врача" },
    { icon: "Star", title: "Экспертность", desc: "Команда специалистов с медицинским образованием и опытом работы с ФСС" },
    { icon: "Users", title: "Доступность", desc: "Работаем со всеми категориями граждан, оформляем через ФСС и фонды" },
  ];

  return (
    <section className={`py-20 ${fullPage ? "bg-gray-50" : "bg-gradient-to-b from-gray-50 to-white"}`}>
      <div className="container">
        {fullPage && (
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Icon name="Building2" size={14} />
              О компании
            </div>
            <h1 className="text-4xl font-black text-foreground mb-4">МедРеабилитация</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ведущий поставщик медицинских и реабилитационных товаров в России
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            {!fullPage && (
              <>
                <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                  <Icon name="Building2" size={14} />
                  О компании
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-foreground">
                  15 лет помогаем людям жить полноценно
                </h2>
              </>
            )}
            {fullPage && (
              <h2 className="text-3xl font-black text-foreground">
                Наша история и миссия
              </h2>
            )}
            <p className="text-muted-foreground leading-relaxed text-lg">
              С 2009 года мы обеспечиваем жителей России качественными ортопедическими,
              реабилитационными и урологическими товарами. Наша команда состоит из специалистов
              с медицинским образованием, которые понимают потребности каждого клиента.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Мы работаем напрямую с производителями России и Европы, что позволяет предлагать
              качественные товары по доступным ценам. Принимаем электронные сертификаты ФСС,
              помогаем с оформлением документов.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={18} className="text-green-500 flex-shrink-0" />
                <span>Официальный дилер ведущих производителей</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="CheckCircle" size={18} className="text-green-500 flex-shrink-0" />
              <span>Работаем с ФСС, пенсионным фондом, региональными программами</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="CheckCircle" size={18} className="text-green-500 flex-shrink-0" />
              <span>Доставка по всей России, установка и сервисное обслуживание</span>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/1de0a40e-1b6c-4a2a-afad-b836db179600.jpg"
              alt="Консультация специалиста"
              className="w-full h-[380px] object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-border hover-lift">
              <div className="text-3xl font-black text-primary mb-1">
                {stat.value}
                {stat.unit && <span className="text-xl ml-1">{stat.unit}</span>}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        {fullPage && (
          <div>
            <h2 className="text-2xl font-black text-center text-foreground mb-8">Наши ценности</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div key={val.title} className="p-6 bg-white rounded-2xl shadow-sm border border-border text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={val.icon as "Shield"} size={22} className="text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{val.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
