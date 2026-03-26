import { Section } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface CatalogSectionProps {
  onNavigate: (section: Section) => void;
}

const categories = [
  {
    icon: "Bone",
    title: "Ортопедические товары",
    desc: "Стельки, бандажи, корсеты, ортопедическая обувь",
    count: "480+ товаров",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "Activity",
    title: "Протезы и ортезы",
    desc: "Протезы конечностей, ортезы суставов, тутора",
    count: "320+ товаров",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: "Accessibility",
    title: "Товары для инвалидов",
    desc: "Коляски, ходунки, трости, костыли, подъёмники",
    count: "560+ товаров",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: "Droplets",
    title: "Урологические товары",
    desc: "Катетеры, мочеприёмники, средства гигиены",
    count: "240+ товаров",
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    icon: "HeartPulse",
    title: "Реабилитационное оборудование",
    desc: "Тренажёры, массажёры, аппараты физиотерапии",
    count: "180+ товаров",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: "BedDouble",
    title: "Товары для ухода",
    desc: "Матрасы, подушки, противопролежневые системы",
    count: "220+ товаров",
    color: "bg-blue-50 text-blue-700",
  },
];

export default function CatalogSection({ onNavigate }: CatalogSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Icon name="Grid3X3" size={14} />
            Каталог товаров
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
            Всё для реабилитации и здоровья
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Более 2000 наименований сертифицированных медицинских изделий от ведущих производителей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => onNavigate("catalog")}
              className="group text-left p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all bg-white hover-lift"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={cat.icon as "Bone"} size={22} />
              </div>
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                {cat.desc}
              </p>
              <span className="text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate("catalog")}
            className="inline-flex items-center gap-2 bg-primary hover:bg-brand-blue-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Icon name="Package" size={18} />
            Смотреть весь каталог
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
