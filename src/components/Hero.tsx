import { Section } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface HeroProps {
  onNavigate: (section: Section) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
              <Icon name="Shield" size={15} />
              Официальный поставщик медицинских товаров
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight text-foreground animate-fade-in-delay-1">
              Товары для здоровья,{" "}
              <span className="text-primary">реабилитации</span>{" "}
              и активной жизни
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              Ортопедические изделия, протезы, ортезы, урологические товары и всё для
              комфортной реабилитации. Принимаем электронные сертификаты ФСС и банковские карты.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-delay-3">
              <button
                onClick={() => onNavigate("catalog")}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-brand-blue-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Icon name="Package" size={18} />
                Перейти в каталог
              </button>
              <button
                onClick={() => onNavigate("consultation")}
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all"
              >
                <Icon name="MessageCircle" size={18} />
                Получить консультацию
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-delay-4">
              {[
                { icon: "Award", text: "15 лет на рынке" },
                { icon: "Truck", text: "Доставка по России" },
                { icon: "CreditCard", text: "Электронные сертификаты" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={badge.icon as "Award"} size={14} className="text-primary" />
                  </div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative animate-fade-in-delay-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/b242ac30-2681-429e-a863-5b75e9c42a53.jpg"
                alt="Медицинский центр реабилитации"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-green-500" />
              </div>
              <div>
                <div className="font-bold text-sm">Сертификат ФСС</div>
                <div className="text-xs text-muted-foreground">принимаем к оплате</div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-white rounded-2xl shadow-xl px-4 py-3 text-center">
              <div className="font-black text-2xl">2000+</div>
              <div className="text-xs opacity-90">товаров</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
