"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import { workCards } from "@/constants/work/workCards";

const FILTERS = [
  "All",
  ...Array.from(new Set(workCards.map((card) => card.category))),
] as const;
type Filter = (typeof FILTERS)[number];

function formatCategoryLabel(category: string) {
  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ProjectCardImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src?: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center border border-dashed border-zinc-300">
        <span className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Image placeholder
        </span>
      </div>

      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : null}
    </>
  );
}

const PAGE_SIZE = 6;

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredCards =
    activeFilter === "All"
      ? workCards
      : workCards.filter((c) => c.category === activeFilter);

  const visibleCards = filteredCards.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCards.length;

  function handleFilterChange(filter: Filter) {
    setActiveFilter(filter);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Work" />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:px-8 lg:py-16">
        <section className="border-b border-zinc-200 pb-10">
          <div className="mb-8 max-w-3xl">
            <h1 className="text-6xl font-black tracking-tight sm:text-7xl">Work</h1>
            <p className="mt-4 max-w-2xl text-xl leading-8 text-zinc-600">
              We love what we do, and it shows.
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={
                    activeFilter === filter
                      ? "rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white"
                      : "rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50"
                  }
                >
                  {filter === "All" ? filter : formatCategoryLabel(filter)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
              <span>Sort by</span>
              <span className="inline-flex h-10 items-center rounded-full border border-zinc-200 px-4 text-zinc-700">
                Latest
              </span>
            </div>
          </div>
        </section>

  <section className="mt-12">
  {visibleCards.length === 0 ? (
    <p className="py-16 text-center text-zinc-500">No projects found.</p>
  ) : (
    <>
      {/* Featured full-width card */}
      <Link href={`/work/${visibleCards[0].slug}`} className="group block mb-6">
        <article className="relative overflow-hidden rounded-3xl cursor-pointer">
          <div className="relative h-[500px] w-full overflow-hidden bg-zinc-200">
            <ProjectCardImage
              src={visibleCards[0].image}
              alt={visibleCards[0].title}
              sizes="(min-width: 1024px) 1200px, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h2 className="text-3xl font-bold text-white">{visibleCards[0].title}</h2>
              <p className="mt-1 text-sm font-semibold text-white/80">{formatCategoryLabel(visibleCards[0].category)}</p>
            </div>
          </div>
        </article>
      </Link>

      {/* Masonry grid */}
      {visibleCards.length > 1 && (
        <div className="columns-1 gap-6 sm:columns-2">
          {visibleCards.slice(1).map((project, index) => {
            const aspectRatios = ["4/5", "1/1", "3/4", "4/5", "3/4", "1/1"];
            const aspectRatio = aspectRatios[index % aspectRatios.length];
            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group mb-6 block break-inside-avoid cursor-pointer"
              >
                <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:shadow-lg">
                  <div
                    className="relative overflow-hidden bg-zinc-200"
                    style={{ aspectRatio }}
                  >
                    <ProjectCardImage
                      src={project.image}
                      alt={project.title}
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                      <p className="mt-1 text-sm font-semibold text-white/80">{formatCategoryLabel(project.category)}</p>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="rounded-full border border-zinc-200 bg-white px-8 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            Load more
          </button>
        </div>
      )}
    </>
  )}
</section>
      </main>
      <RecipeSection />
      <Footer activeLink="Work" />
    </div>
  );
}
