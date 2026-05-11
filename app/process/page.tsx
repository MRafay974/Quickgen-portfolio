import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ProcessPageContent from "@/components/process/ProcessPageContent";
import ProcessScrollSections from "@/components/process/ProcessScrollSections";

export const metadata = {
  title: "Process",
  description:
    "Discover how Quickgen takes product ideas from initial concept through design, engineering, and manufacturing to global launch.",
  alternates: { canonical: "https://quickgentech.com/process" },
  openGraph: {
    title: "Our Process | Quickgen",
    description: "From napkin sketch to production — how Quickgen brings products to life.",
    url: "https://quickgentech.com/process",
  },
};



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