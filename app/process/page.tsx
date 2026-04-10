import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";

const steps = [
  {
    title: "Discover",
    description: "We uncover opportunities through research, partnerships, and rapid alignment sessions.",
  },
  {
    title: "Create",
    description: "Design and engineering teams collaborate to iterate quickly and refine the experience.",
  },
  {
    title: "Deliver",
    description: "We move from prototype to product with a tight launch timeline and quality-first execution.",
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Process" />

      <main className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
        <section className="mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-red-500">Process</p>
          <h1 className="mt-6 text-6xl font-black tracking-tight sm:text-7xl">
            A process built for speed, clarity, and impact.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            Our work follows a clear rhythm that keeps teams aligned and delivers meaningful products on schedule.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-4xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-zinc-950">{step.title}</h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">{step.description}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer activeLink="Process" />
    </div>
  );
}
