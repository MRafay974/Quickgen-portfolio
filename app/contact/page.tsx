import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ContactPageContent from "@/components/contact/ContactPageContent";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar currentPage="Contact" />
      <div ><ContactPageContent /></div>
      <div ><RecipeSection /></div>
      <div ><Footer activeLink="Contact" /></div>
    </div>
  );
}
