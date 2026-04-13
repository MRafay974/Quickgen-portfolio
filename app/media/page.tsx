import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import MediaPageContent from "@/components/media/MediaPageContent";

export default function MediaPage() {
  return (
    <div>
      <Navbar currentPage="Media" />
      <MediaPageContent />
      <RecipeSection />
      <Footer activeLink="Media" />
    </div>
  );
}