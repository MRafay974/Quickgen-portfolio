import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ServicesPageContent from "@/components/services/ServicesPageContent";


export default function ServicesPage() {
  return (
    <div>
      <Navbar currentPage="Services" />
      <div data-animate="fade-up"><ServicesPageContent /></div>
      <div data-animate="fade-up"><RecipeSection /></div>
      <div data-animate="fade-up"><Footer activeLink="Services" /></div>
    </div>
  );
}


