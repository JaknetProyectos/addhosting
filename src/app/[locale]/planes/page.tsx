import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlansSection } from "@/components/PlansSection";
import { FAQSection } from "@/components/FAQSection";
import { AdditionalServicesSection } from "@/components/AdditionalServicesSection";
import { useLocale } from "next-intl";
import { plansEnglish, plansSpanish } from "@/lib/data/plans";


export default function PlanesPage() {
  const locale = useLocale()
  const plans = locale == "es" ? plansSpanish : plansEnglish;
  return (
    <main className="min-h-screen bg-[#0a0e1a]">
      <Header />

      <PlansSection plans={plans} />
      <AdditionalServicesSection />

      <Footer />
    </main>
  );
}
