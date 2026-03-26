import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CatalogSection from "@/components/CatalogSection";
import PaymentSection from "@/components/PaymentSection";
import AboutSection from "@/components/AboutSection";
import DeliverySection from "@/components/DeliverySection";
import ConsultationSection from "@/components/ConsultationSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";
import CatalogPage from "@/components/CatalogPage";

export type Section = "home" | "catalog" | "about" | "delivery" | "consultation" | "contacts";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");

  const navigate = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-golos">
      <Header activeSection={activeSection} onNavigate={navigate} />

      {activeSection === "home" && (
        <>
          <Hero onNavigate={navigate} />
          <CatalogSection onNavigate={navigate} />
          <PaymentSection />
          <AboutSection fullPage={false} />
          <ConsultationSection fullPage={false} />
        </>
      )}

      {activeSection === "catalog" && <CatalogPage />}
      {activeSection === "about" && <AboutSection fullPage />}
      {activeSection === "delivery" && <DeliverySection />}
      {activeSection === "consultation" && <ConsultationSection fullPage />}
      {activeSection === "contacts" && <ContactsSection />}

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default Index;
