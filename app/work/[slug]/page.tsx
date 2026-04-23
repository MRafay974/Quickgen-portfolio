import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import { workCards, CATEGORY_DISPLAY_NAMES } from "@/constants/work/workCards";

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
  }else{
    console.log(project)
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Work" />

      <main className="max-w-7xl mx-auto px-6 py-10 lg:px-8 lg:py-16">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
              {CATEGORY_DISPLAY_NAMES[project.category] ?? project.category}
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 text-xl leading-9 text-zinc-600">
              {project.description}
            </p>
          </div>
         
        </div>

        
             

     
            
      </main>

      <RecipeSection />
      <Footer activeLink="Work" />
    </div>
  );
}