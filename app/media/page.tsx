import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";


const mediaItems = [
  {
    title: "Featured Stories",
    description: "High-impact launch content and editorial media for modern product brands.",
  },
  {
    title: "Campaign Support",
    description: "Visual systems and messaging designed to drive awareness and engagement.",
  },
  {
    title: "Showcase Design",
    description: "Presentations and digital experiences that elevate product storytelling.",
  },
];

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Media" />

      <main className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
        <section className="mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-red-500">Media</p>
          <h1 className="mt-6 text-6xl font-black tracking-tight sm:text-7xl">
            Media built to tell your story with precision.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            We create visual systems and supporting media that make product launches feel polished and memorable.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          {mediaItems.map((item) => (
            <div key={item.title} className="rounded-4xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-zinc-950">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">{item.description}</p>
            </div>
          ))}
        </section>
      </main>
<RecipeSection/>
      <Footer activeLink="Media" />
    </div>
  );
}
