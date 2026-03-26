import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ConsultationSectionProps {
  fullPage?: boolean;
}

export default function ConsultationSection({ fullPage = false }: ConsultationSectionProps) {
  const [form, setForm] = useState({ name: "", phone: "", question: "", cert: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={`py-20 ${fullPage ? "bg-gray-50 min-h-screen" : "bg-white"}`}>
      <div className="container">
        <div className={`${fullPage ? "max-w-3xl mx-auto" : "max-w-5xl mx-auto"}`}>
          {!fullPage && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Icon name="MessageCircle" size={14} />
                Бесплатная консультация
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Поможем подобрать нужный товар
              </h2>
              <p className="text-muted-foreground text-lg">
                Наши специалисты с медицинским образованием помогут выбрать изделие по рекомендации врача
              </p>
            </div>
          )}

          {fullPage && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Icon name="MessageCircle" size={14} />
                Консультация специалиста
              </div>
              <h1 className="text-4xl font-black text-foreground mb-4">Задайте вопрос эксперту</h1>
              <p className="text-muted-foreground text-lg">
                Специалист с медицинским образованием ответит на ваши вопросы и поможет подобрать товар
              </p>
            </div>
          )}

          <div className={`grid ${fullPage ? "grid-cols-1" : "lg:grid-cols-2"} gap-12 items-start`}>
            {/* Benefits */}
            {!fullPage && (
              <div className="space-y-6">
                {[
                  {
                    icon: "UserCheck",
                    title: "Специалисты с медицинским образованием",
                    desc: "Наши консультанты понимают медицинские рекомендации и подберут нужное изделие",
                  },
                  {
                    icon: "FileCheck",
                    title: "Помощь с электронным сертификатом",
                    desc: "Расскажем, как получить и использовать сертификат ФСС для оплаты товаров",
                  },
                  {
                    icon: "Phone",
                    title: "Звонок в течение 30 минут",
                    desc: "Работаем с 9:00 до 18:00 по московскому времени. Оставьте заявку — перезвоним",
                  },
                  {
                    icon: "ThumbsUp",
                    title: "Консультация полностью бесплатна",
                    desc: "Мы не навязываем лишнего — помогаем найти именно то, что нужно",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon as "UserCheck"} size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-black mb-2">Заявка принята!</h3>
                  <p className="text-muted-foreground">
                    Наш специалист свяжется с вами в течение 30 минут в рабочее время
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary text-sm font-semibold hover:underline"
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-black text-xl mb-6">Оставить заявку на консультацию</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (000) 000-00-00"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">
                        Номер электронного сертификата (если есть)
                      </label>
                      <input
                        type="text"
                        placeholder="XXXXXXXX-XXXX-XXXX"
                        value={form.cert}
                        onChange={(e) => setForm({ ...form, cert: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">
                        Что вас интересует?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Опишите, что нужно подобрать или какой у вас вопрос..."
                        value={form.question}
                        onChange={(e) => setForm({ ...form, question: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-brand-blue-dark text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Получить бесплатную консультацию
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
