import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ProcessPageContent from "@/components/process/ProcessPageContent";
import ProcessScrollSections from "@/components/process/ProcessScrollSections";



export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Process" />
      <div data-animate="fade-up"><ProcessPageContent /></div>
      <div data-animate="fade-up"><ProcessScrollSections /></div>
      <div data-animate="fade-up"><RecipeSection /></div>
      <div data-animate="fade-up"><Footer activeLink="Process" /></div>
    </div>
  );
}