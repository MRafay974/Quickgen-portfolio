import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import MediaPageContent from "@/components/media/MediaPageContent";

export const metadata = {
  title: "Media",
  description:
    "Explore the latest news, press coverage, and media resources from Quickgen — a global product design and engineering studio.",
  alternates: { canonical: "https://quickgentech.com/media" },
  openGraph: {
    title: "Media | Quickgen",
    description: "Latest news, press coverage, and media resources from Quickgen.",
    url: "https://quickgentech.com/media",
  },
};

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