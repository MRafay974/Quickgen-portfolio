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

        {/* ── Back link ─────────────────────────────────────────────────── */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-zinc-950 transition mb-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Work
        </Link>

        {/* ── Title + Image row ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 mb-16">
          {/* Left: category, title, tagline, overview */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-500 mb-3">
              {CATEGORY_DISPLAY_NAMES[project.category] ?? project.category}
            </p>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl mb-4">
              {project.title}
            </h1>
            {p.tagline && (
              <p className="text-xl text-zinc-500 font-medium mb-8">{p.tagline}</p>
            )}
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Overview</h2>
            <p className="text-lg leading-8 text-zinc-600">{project.overview}</p>
          </div>

          {/* Right: image */}
          {project.image && (
            <div className="w-full lg:w-[45%] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-3xl"
                style={{ maxHeight: "420px", objectFit: "contain" }}
              />
            </div>
          )}
        </div>

        {/* ── Features ──────────────────────────────────────────────────── */}
        {project.details && project.details.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.details.map((feat: string, i: number) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-zinc-50 border border-zinc-100 px-5 py-4">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm leading-6 text-zinc-700">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tech Stack ────────────────────────────────────────────────── */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Detailed Features ─────────────────────────────────────────── */}
        {detailedFeatures && Object.keys(detailedFeatures).length > 0 && (
          <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Deep Dive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(detailedFeatures).map(([title, desc]) =>
                typeof desc === "string" ? (
                  <div key={title} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
                    <h3 className="text-base font-black text-zinc-950 mb-2">{title}</h3>
                    <p className="text-sm leading-6 text-zinc-500">{desc}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* ── Highlights ────────────────────────────────────────────────── */}
        {highlights && (
          <div className="rounded-2xl bg-zinc-950 px-8 py-10 mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Highlights</p>
            <p className="text-lg leading-8 text-white">{highlights}</p>
          </div>
        )}

      </main>

      <RecipeSection />
      <Footer activeLink="Work" />
    </div>
  );
}