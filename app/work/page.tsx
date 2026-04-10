import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";

const workCards = [
  {
    title: "Oculus Drive",
    category: "Industrial Design",
    description:
      "A premium product platform for mobility hardware and software, designed for bold real-world impact.",
  },
  {
    title: "Nova One",
    category: "Software + UI/UX",
    description:
      "A polished digital experience that brings enterprise workflows to life with clarity and punch.",
  },
  {
    title: "Pulse Reactor",
    category: "Hardware Engineering",
    description:
      "An advanced platform that merges electronics, interaction, and future-facing brand direction.",
  },
  {
    title: "Vertex Vision",
    category: "Product Strategy",
    description:
      "A product roadmap that balances feasibility, desirability, and market momentum.",
  },
];

export default function WorkPage() {
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
              <span className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
                All
              </span>
              {[
                "Design",
                "Software + UI/UX",
                "Engineering",
                "Manufacturing",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {item}
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
  {/* Featured full-width card */}
  <article className="group relative mb-6 overflow-hidden rounded-3xl cursor-pointer">
    <div className="relative h-[520px] w-full overflow-hidden bg-zinc-200">
      {/* Image placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Image placeholder
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Red dot top-left */}
      <div className="absolute top-5 left-5 h-3 w-3 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Center arrow button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Bottom-left title & category on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h2 className="text-3xl font-bold text-white">{workCards[0].title}</h2>
        <p className="mt-1 text-sm font-semibold text-white/80">{workCards[0].category}</p>
      </div>
    </div>
  </article>

  {/* Masonry grid for remaining cards */}
  <div className="columns-1 gap-6 sm:columns-2">
    {workCards.slice(1).map((project) => (
      <article
        key={project.title}
        className="group break-inside-avoid mb-6 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:shadow-lg cursor-pointer"
      >
        <div
          className="relative overflow-hidden bg-zinc-200"
          style={{
            aspectRatio:
              project.title === "Nova One" ? "1/1" :
              project.title === "Pulse Reactor" ? "16/9" : "4/5",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-zinc-300">
            <span className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Image placeholder
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    
          {/* Arrow button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Title & category */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <p className="mt-1 text-sm font-semibold text-white/80">{project.category}</p>
          </div>
        </div>
      </article>
    ))}
  </div>
</section>
      </main>

      <RecipeSection />
      <Footer activeLink="Work" />
    </div>
  );
}
