"use client";

const slides = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
}));

export function ImpactCarousel() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-zinc-100 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.15)] sm:p-8">
          <div className="relative overflow-hidden">
            <div className="flex w-[200%] animate-marquee gap-6">
              {[...slides, ...slides].map((slide, index) => (
                <div
                  key={`${slide.id}-${index}`}
                  className="min-w-[24%] flex-shrink-0 rounded-[2rem] bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
                >
                  <div className="h-72 rounded-[2rem] bg-zinc-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:items-start">
          <div className="flex items-start">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff1d1d]">
              The Brash Impact
            </span>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
              We are the Goldilocks team for real collaboration.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-zinc-600">
              Our team is structured to deliver top-tier expertise without the barriers of a large agency. You work directly with seasoned designers, engineers, and researchers who stay involved from kickoff to launch. The result is a focused, professional partnership, responsive, efficient, and strategically aligned, at a cost that keeps innovation within reach.
            </p>
            <button className="inline-flex rounded-full bg-black px-8 py-3 text-base font-semibold text-white transition hover:bg-zinc-900">
              View services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
