import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";

const services = [
  {
    title: "Product Design",
    description: "From strategy to system-level design, we build experiences that feel effortless.",
  },
  {
    title: "Engineering",
    description: "End-to-end hardware and software execution with a sharp focus on detail and quality.",
  },
  {
    title: "Brand Strategy",
    description: "We help companies shape positioning, storytelling, and product-market fit.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Services" />

      <main className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
        <section className="mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-red-500">Services</p>
          <h1 className="mt-6 text-6xl font-black tracking-tight sm:text-7xl">
            Strategy, design, and engineering for products that move.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            We guide companies through every stage of product development, from high-level strategy to execution-ready solutions.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          {services.map((item) => (
            <div key={item.title} className="rounded-4xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-zinc-950">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">{item.description}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer activeLink="Services" />
    </div>
  );
}
