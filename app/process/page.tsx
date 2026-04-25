import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ProcessPageContent from "@/components/process/ProcessPageContent";
import ProcessScrollSections from "@/components/process/ProcessScrollSections";



export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Process" />
      <div ><ProcessPageContent /></div>
      <div ><ProcessScrollSections /></div>
      <div ><RecipeSection /></div>
      <div ><Footer activeLink="Process" /></div>
    </div>
  );
}