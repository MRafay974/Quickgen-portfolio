import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ContactPageContent from "@/components/contact/ContactPageContent";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar currentPage="Contact" />
      <div data-animate="fade-up"><ContactPageContent /></div>
      <div data-animate="fade-up"><RecipeSection /></div>
      <div data-animate="fade-up"><Footer activeLink="Contact" /></div>
    </div>
  );
}
