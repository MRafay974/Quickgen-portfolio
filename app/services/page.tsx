import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ServicesPageContent from "@/components/services/ServicesPageContent";





export default function ServicesPage() {
  return (
    <div>
      <Navbar currentPage="Services" />
      <ServicesPageContent />
      <RecipeSection />
      <Footer activeLink="Services" />
    </div>
  );
}


