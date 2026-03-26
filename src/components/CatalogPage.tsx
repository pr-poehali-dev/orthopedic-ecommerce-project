import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useCart } from "@/context/CartContext";
import { Section } from "@/pages/Index";

interface CatalogPageProps {
  onNavigate: (section: Section) => void;
}

const products = [
  {
    id: 1, category: "Ортопедия",
    name: "Ортез на коленный сустав (жёсткий)",
    price: 3490, oldPrice: 4200,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: "Хит продаж", cert: true,
  },
  {
    id: 2, category: "Протезы и ортезы",
    name: "Протез голени с силиконовым лайнером",
    price: 48000, oldPrice: null,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: "Новинка", cert: true,
  },
  {
    id: 3, category: "Реабилитация",
    name: "Инвалидное кресло-коляска складное",
    price: 12500, oldPrice: 15000,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: null, cert: true,
  },
  {
    id: 4, category: "Ортопедия",
    name: "Стельки ортопедические при плоскостопии",
    price: 890, oldPrice: 1200,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: "Скидка", cert: false,
  },
  {
    id: 5, category: "Урология",
    name: "Мочеприёмник урологический ночной 2л",
    price: 290, oldPrice: null,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: null, cert: false,
  },
  {
    id: 6, category: "Уход",
    name: "Матрас противопролежневый секционный",
    price: 4800, oldPrice: 5500,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: null, cert: true,
  },
  {
    id: 7, category: "Реабилитация",
    name: "Ходунки-роллаторы с сиденьем",
    price: 6200, oldPrice: 7000,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: "Хит продаж", cert: true,
  },
  {
    id: 8, category: "Ортопедия",
    name: "Корсет поясничный полужёсткий",
    price: 2100, oldPrice: null,
    img: "https://cdn.poehali.dev/projects/35ee6460-827f-47c5-9371-30f6b890c968/files/c84f85ae-d7c9-4584-9681-67deabfa372c.jpg",
    badge: null, cert: true,
  },
];

const categories = ["Все", "Ортопедия", "Протезы и ортезы", "Реабилитация", "Урология", "Уход"];

export default function CatalogPage({ onNavigate }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [certOnly, setCertOnly] = useState(false);
  const { addItem, items, totalCount } = useCart();

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCert = !certOnly || p.cert;
    return matchCat && matchSearch && matchCert;
  });

  const isInCart = (id: number) => items.some((i) => i.id === id);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Icon name="Package" size={14} />
            Каталог товаров
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">Все товары</h1>
          <p className="text-muted-foreground">2000+ наименований медицинских и реабилитационных изделий</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-10 h-6 rounded-full transition-colors ${certOnly ? "bg-primary" : "bg-gray-200"} relative`}
                onClick={() => setCertOnly(!certOnly)}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${certOnly ? "translate-x-5" : "translate-x-1"}`} />
              </div>
              <span className="text-sm font-medium">Только по сертификату</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">Товары не найдены</p>
            <p className="text-sm mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover-lift group">
                <div className="relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                      product.badge === "Хит продаж" ? "bg-orange-500 text-white" :
                      product.badge === "Новинка" ? "bg-green-500 text-white" :
                      product.badge === "Скидка" ? "bg-red-500 text-white" : "bg-primary text-white"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {product.cert && (
                    <span className="absolute top-3 right-3 bg-white text-primary text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Icon name="FileCheck" size={11} />
                      Сертификат
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                  <h3 className="font-semibold text-sm mb-3 leading-tight min-h-[2.5rem]">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-black text-primary">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.oldPrice.toLocaleString("ru-RU")} ₽
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      isInCart(product.id)
                        ? "bg-green-500 text-white"
                        : "bg-primary hover:bg-brand-blue-dark text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    <Icon name={isInCart(product.id) ? "Check" : "ShoppingCart"} size={15} />
                    {isInCart(product.id) ? "В корзине" : "В корзину"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating cart button */}
        {totalCount > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => onNavigate("cart")}
              className="flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm hover:bg-brand-blue-dark transition-all hover:-translate-y-1"
            >
              <Icon name="ShoppingCart" size={20} />
              Перейти в корзину
              <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-black ml-1">
                {totalCount}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
