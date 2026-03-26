import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Section } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface CartPageProps {
  onNavigate: (section: Section) => void;
}

type PayMethod = "card" | "cert" | null;
type Step = "cart" | "payment" | "success";

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, removeItem, updateQty, totalPrice, totalCount, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [payMethod, setPayMethod] = useState<PayMethod>(null);
  const [certNum, setCertNum] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const delivery = totalPrice >= 5000 ? 0 : 350;
  const total = totalPrice + delivery;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.phone.trim()) e.phone = "Введите телефон";
    if (!form.address.trim()) e.address = "Введите адрес доставки";
    if (!payMethod) e.pay = "Выберите способ оплаты";
    if (payMethod === "cert" && !certNum.trim()) e.cert = "Введите номер сертификата";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep("success");
      clearCart();
    }
  };

  if (items.length === 0 && step !== "success") {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-16 shadow-sm border border-border">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShoppingCart" size={36} className="text-primary" />
            </div>
            <h2 className="text-2xl font-black mb-3">Корзина пуста</h2>
            <p className="text-muted-foreground mb-8">Добавьте товары из каталога, чтобы оформить заказ</p>
            <button
              onClick={() => onNavigate("catalog")}
              className="bg-primary hover:bg-brand-blue-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (step === "success") {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-16 shadow-sm border border-border animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-black mb-3 text-foreground">Заказ оформлен!</h2>
            <p className="text-muted-foreground mb-2 text-lg">
              Спасибо за покупку. Мы свяжемся с вами в течение 30 минут.
            </p>
            {payMethod === "cert" && (
              <div className="mt-4 mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-primary">
                <Icon name="Info" size={16} className="inline mr-2" />
                Для оплаты электронным сертификатом наш менеджер уточнит детали по телефону и оформит все необходимые документы.
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <button
                onClick={() => onNavigate("home")}
                className="bg-primary hover:bg-brand-blue-dark text-white px-8 py-3 rounded-xl font-bold transition-all"
              >
                На главную
              </button>
              <button
                onClick={() => onNavigate("catalog")}
                className="border-2 border-primary text-primary hover:bg-secondary px-8 py-3 rounded-xl font-bold transition-all"
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
              <Icon name="ShoppingCart" size={14} />
              Корзина
            </div>
            <h1 className="text-3xl font-black text-foreground">
              Оформление заказа
              <span className="ml-3 text-lg font-semibold text-muted-foreground">
                {totalCount} товар{totalCount > 4 ? "ов" : totalCount > 1 ? "а" : ""}
              </span>
            </h1>
          </div>
          <button
            onClick={() => onNavigate("catalog")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться в каталог
          </button>
        </div>

        <form onSubmit={handleOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Items + Form */}
            <div className="lg:col-span-2 space-y-6">

              {/* Cart items */}
              <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-black text-lg flex items-center gap-2">
                    <Icon name="Package" size={20} className="text-primary" />
                    Товары в корзине
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="p-5 flex gap-4 items-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">{item.category}</div>
                        <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2">{item.name}</h3>
                        {item.cert && (
                          <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/8 px-2 py-0.5 rounded-full font-semibold">
                            <Icon name="FileCheck" size={11} />
                            По сертификату
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-8 h-8 rounded-lg bg-muted hover:bg-secondary flex items-center justify-center transition-colors"
                        >
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-8 h-8 rounded-lg bg-muted hover:bg-secondary flex items-center justify-center transition-colors"
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-black text-primary">
                          {(item.price * item.qty).toLocaleString("ru-RU")} ₽
                        </div>
                        <div className="text-xs text-muted-foreground">{item.price.toLocaleString("ru-RU")} ₽ / шт.</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts */}
              <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-black text-lg flex items-center gap-2">
                    <Icon name="User" size={20} className="text-primary" />
                    Данные получателя
                  </h2>
                </div>
                <div className="p-6 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Имя и фамилия *</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-400 bg-red-50" : "border-border bg-muted/30"} focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition-all`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Телефон *</label>
                    <input
                      type="tel"
                      placeholder="+7 (000) 000-00-00"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400 bg-red-50" : "border-border bg-muted/30"} focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition-all`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Адрес доставки *</label>
                    <input
                      type="text"
                      placeholder="Город, улица, дом, квартира"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.address ? "border-red-400 bg-red-50" : "border-border bg-muted/30"} focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition-all`}
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-black text-lg flex items-center gap-2">
                    <Icon name="CreditCard" size={20} className="text-primary" />
                    Способ оплаты
                  </h2>
                  {errors.pay && <p className="text-xs text-red-500 mt-1">{errors.pay}</p>}
                </div>
                <div className="p-6 space-y-4">
                  {/* Card payment */}
                  <label
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      payMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="hidden"
                      checked={payMethod === "card"}
                      onChange={() => setPayMethod("card")}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      payMethod === "card" ? "border-primary" : "border-border"
                    }`}>
                      {payMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon name="CreditCard" size={20} className="text-primary" />
                        <span className="font-bold">Банковская карта</span>
                        <div className="flex gap-1 ml-auto">
                          {["VISA", "МИР", "MC"].map((n) => (
                            <span key={n} className="text-[10px] font-black border border-border px-1.5 py-0.5 rounded text-muted-foreground">
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Безопасная оплата через защищённый шлюз. Visa, Mastercard, МИР, СБП, SberPay, T-Pay
                      </p>
                    </div>
                  </label>

                  {/* Certificate payment */}
                  <label
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      payMethod === "cert" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="hidden"
                      checked={payMethod === "cert"}
                      onChange={() => setPayMethod("cert")}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      payMethod === "cert" ? "border-primary" : "border-border"
                    }`}>
                      {payMethod === "cert" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon name="FileCheck" size={20} className="text-primary" />
                        <span className="font-bold">Электронный сертификат</span>
                        <span className="ml-auto text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                          ФСС / ГАРАНТИЯ
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Программы реабилитации инвалидов. Помогаем оформить документы и провести оплату через фонд.
                      </p>

                      {payMethod === "cert" && (
                        <div className="space-y-3 animate-fade-in">
                          <div>
                            <label className="text-sm font-semibold mb-1 block">Номер сертификата *</label>
                            <input
                              type="text"
                              placeholder="XXXXXXXX-XXXX-XXXX-XXXX"
                              value={certNum}
                              onChange={(e) => setCertNum(e.target.value)}
                              className={`w-full px-4 py-3 rounded-xl border ${errors.cert ? "border-red-400 bg-red-50" : "border-border bg-white"} focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-mono`}
                            />
                            {errors.cert && <p className="text-xs text-red-500 mt-1">{errors.cert}</p>}
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-primary leading-relaxed">
                            <Icon name="Info" size={13} className="inline mr-1.5" />
                            После оформления заказа менеджер свяжется с вами для подтверждения сертификата
                            и подготовки всех необходимых документов для ФСС.
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Conditions */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-border">
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-sm">
                      <Icon name="ScrollText" size={16} className="text-primary" />
                      Условия оплаты и доставки
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { icon: "Truck", text: "Бесплатная доставка при заказе от 5 000 ₽" },
                        { icon: "RotateCcw", text: "Возврат товара надлежащего качества в течение 14 дней" },
                        { icon: "Shield", text: "Гарантия на все товары от производителя" },
                        { icon: "FileCheck", text: "Все товары сертифицированы согласно российскому законодательству" },
                        { icon: "Lock", text: "Безопасная оплата — данные карты не сохраняются" },
                      ].map((item) => (
                        <li key={item.text} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Icon name={item.icon as "Truck"} size={14} className="text-primary flex-shrink-0 mt-0.5" />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h2 className="font-black text-lg">Итого</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Товары ({totalCount} шт.)</span>
                      <span className="font-semibold">{totalPrice.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      <span className={`font-semibold ${delivery === 0 ? "text-green-600" : ""}`}>
                        {delivery === 0 ? "Бесплатно" : `${delivery} ₽`}
                      </span>
                    </div>
                    {delivery > 0 && (
                      <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                        Добавьте товаров ещё на {(5000 - totalPrice).toLocaleString("ru-RU")} ₽ для бесплатной доставки
                      </p>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-black text-lg">К оплате</span>
                      <span className="font-black text-2xl text-primary">{total.toLocaleString("ru-RU")} ₽</span>
                    </div>

                    {payMethod === "cert" && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700 font-semibold text-center">
                        ✓ Оплата электронным сертификатом
                      </div>
                    )}
                    {payMethod === "card" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-primary font-semibold text-center">
                        ✓ Оплата банковской картой
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-brand-blue-dark text-white py-4 rounded-xl font-black text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2"
                    >
                      {payMethod === "cert" ? "Оформить заказ с сертификатом" : "Оформить заказ"}
                    </button>

                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь с условиями оферты и обработкой персональных данных
                    </p>
                  </div>
                </div>

                {/* Help block */}
                <div className="bg-primary/8 rounded-2xl p-5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5">Нужна помощь?</div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Специалист поможет оформить заказ и сертификат
                      </p>
                      <a href="tel:88005550000" className="text-sm font-black text-primary hover:underline">
                        8-800-555-00-00
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
