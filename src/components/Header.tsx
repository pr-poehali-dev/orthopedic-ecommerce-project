import { useState } from "react";
import { Section } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const navItems: { label: string; section: Section }[] = [
  { label: "Главная", section: "home" },
  { label: "Каталог", section: "catalog" },
  { label: "О компании", section: "about" },
  { label: "Доставка", section: "delivery" },
  { label: "Консультация", section: "consultation" },
  { label: "Контакты", section: "contacts" },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-1.5">
            <Icon name="Phone" size={13} />
            8-800-555-00-00 (бесплатно)
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Icon name="Clock" size={13} />
            Пн–Пт: 9:00 – 18:00
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="MapPin" size={13} />
            Москва
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Icon name="HeartPulse" size={22} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-black text-lg leading-tight text-foreground tracking-tight">
                МедРеабилитация
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                товары для здоровья и реабилитации
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.section
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("catalog")}
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-brand-blue-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              <Icon name="ShoppingCart" size={16} />
              Корзина
            </button>

            {/* Mobile menu */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-blue-50 pt-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    onNavigate(item.section);
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                    activeSection === item.section
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
