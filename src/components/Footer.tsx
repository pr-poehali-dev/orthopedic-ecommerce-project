import { Section } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface FooterProps {
  onNavigate: (section: Section) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const navLinks: { label: string; section: Section }[] = [
    { label: "Каталог", section: "catalog" },
    { label: "О компании", section: "about" },
    { label: "Доставка", section: "delivery" },
    { label: "Консультация", section: "consultation" },
    { label: "Контакты", section: "contacts" },
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 mb-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="HeartPulse" size={20} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-black text-base">МедРеабилитация</div>
                <div className="text-xs text-white/50">товары для здоровья</div>
              </div>
            </button>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Официальный поставщик ортопедических и реабилитационных товаров. Работаем с 2009 года.
            </p>
            <div className="flex gap-3">
              {["MessageCircle", "Send", "MessageSquare"].map((icon) => (
                <button
                  key={icon}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon name={icon as "MessageCircle"} size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-bold mb-4 text-white">Разделы</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => onNavigate(link.section)}
                    className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-1 inline-flex items-center gap-1.5"
                  >
                    <Icon name="ChevronRight" size={12} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="font-bold mb-4 text-white">Оплата</h4>
            <ul className="space-y-2.5">
              {[
                "Электронный сертификат ФСС",
                "Банковская карта Visa / МИР",
                "Система быстрых платежей",
                "SberPay и T-Pay",
                "Безналичный расчёт",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Icon name="Check" size={12} className="text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold mb-4 text-white">Контакты</h4>
            <ul className="space-y-3">
              {[
                { icon: "Phone", text: "8-800-555-00-00" },
                { icon: "Mail", text: "info@medrehab.ru" },
                { icon: "MapPin", text: "г. Москва, ул. Примерная, 1" },
                { icon: "Clock", text: "Пн–Пт: 9:00–18:00" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2 text-white/60 text-sm">
                  <Icon name={item.icon as "Phone"} size={14} className="text-primary flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© 2024 МедРеабилитация. Все права защищены.</span>
          <div className="flex gap-6">
            <button className="hover:text-white/70 transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-white/70 transition-colors">Пользовательское соглашение</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
