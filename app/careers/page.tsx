import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import CareersPageContent from "@/components/careers/CareersPageContent";

export const metadata = {
  title: "Careers | Quickgen",
  description: "Join the Quickgen team — we're hiring engineers, designers, and builders.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar currentPage="Careers" />
      <CareersPageContent />
      <RecipeSection />
      <Footer activeLink="Careers" />
    </div>
  );
}
