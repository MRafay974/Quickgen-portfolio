import { notFound } from "next/navigation";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import { WorkDetailContent } from "@/components/work/WorkDetailContent";
import { workCards } from "@/constants/work/workCards";


type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return workCards.map((project) => ({ slug: project.slug }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = workCards.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = project as any;
  const detailedFeatures: Record<string, string> | null =
    p.detailedFeatures && typeof p.detailedFeatures === "object" && !Array.isArray(p.detailedFeatures)
      ? p.detailedFeatures
      : null;
  const highlights: string | null = typeof p.highlights === "string" ? p.highlights : null;

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Work" />

      <main className="max-w-6xl mx-auto px-6 py-12 lg:px-8 lg:py-16">
        <WorkDetailContent
          project={{
            slug: project.slug,
            title: project.title,
            category: project.category,
            image: project.image ?? undefined,
            overview: project.overview,
            details: project.details,
            techStack: project.techStack,
            tagline: p.tagline,
            detailedFeatures,
            highlights,
          }}
        />
      </main>

      <RecipeSection />
      <Footer activeLink="Work" />
    </div>
  );
}