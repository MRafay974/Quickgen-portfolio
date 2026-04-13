import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
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

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Work" />

      <main className="max-w-7xl mx-auto px-6 py-10 lg:px-8 lg:py-16">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
              {project.category}
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 text-xl leading-9 text-zinc-600">
              {project.description}
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            Back to work
          </Link>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="rounded-[2.5rem] bg-zinc-100 p-8 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.12)]">
              <p className="text-lg leading-8 text-zinc-700">{project.overview}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[2rem] bg-zinc-950 p-8 text-white shadow-lg">
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">
                    {metric.label}
                  </p>
                  <p className="mt-4 text-3xl font-black">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-10 text-white shadow-[0_40px_120px_-60px_rgba(15,23,42,0.4)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_56%)]" />
            <div className="relative grid gap-6">
              <div className="rounded-[2.5rem] bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Featured asset</p>
                <div className="mt-6 h-[420px] rounded-[2rem] bg-zinc-900" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Gallery</p>
                  <p className="mt-3 text-lg font-semibold">{project.galleryCaptions[0]}</p>
                </div>
                <div className="rounded-[2rem] bg-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">Gallery</p>
                  <p className="mt-3 text-lg font-semibold">{project.galleryCaptions[1]}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-10">
          <div className="rounded-[3rem] bg-zinc-50 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.12)]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                  It&apos;s all about the details.
                </h2>
                <p className="mt-6 text-lg leading-8 text-zinc-600">
                  {project.details.join(" ")}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-200" />
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-200" />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Behind the scenes</p>
                <h3 className="mt-4 text-3xl font-bold text-zinc-950">Engineering the experience.</h3>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  We built the product from the inside out, defining every connection between hardware and software to create a cohesive platform. Every decision was informed by usability, durability, and brand clarity.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-zinc-100 p-6">
                  <p className="font-semibold text-zinc-950">Component detail</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">A precise system built for modular assembly and serviceability.</p>
                </div>
                <div className="rounded-[2rem] bg-zinc-100 p-6">
                  <p className="font-semibold text-zinc-950">Interaction focus</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">Designed controls and feedback so users always feel in command.</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[3rem] bg-zinc-950 px-6 py-8 text-white">
              <div className="h-[480px] rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_35%)]" />
            </div>
          </div>
        </section>
      </main>

      <RecipeSection />
      <Footer activeLink="Work" />
    </div>
  );
}
