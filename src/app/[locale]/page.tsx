import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { PlansSection } from "@/components/PlansSection";
import { AdditionalServicesSection } from "@/components/AdditionalServicesSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { plansEnglish, plansSpanish } from "@/lib/data/plans";
import { useLocale } from "next-intl";




export default function Home() {
  const locale = useLocale()
  const plans = locale == "es" ? plansSpanish : plansEnglish;

  return (
    <main className="min-h-screen bg-[#0a0e1a]">
      <Header />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PlansSection plans={plans} />
      <AdditionalServicesSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
