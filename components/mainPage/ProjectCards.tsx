export function ProjectCards() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="space-y-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group overflow-hidden rounded-[2rem] bg-[#ff3a3a] p-6 shadow-[0_40px_100px_-40px_rgba(255,58,58,0.6)] transition hover:-translate-y-1">
              <div className="flex h-72 items-center justify-center rounded-[1.75rem] bg-black/10">
                <div className="h-full w-full rounded-[1.75rem] border border-white/10 bg-white/5" />
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] bg-[#2e9c2e] p-6 shadow-[0_40px_100px_-40px_rgba(46,156,46,0.45)] transition hover:-translate-y-1">
              <div className="flex h-72 items-center justify-center rounded-[1.75rem] bg-black/10">
                <div className="h-full w-full rounded-[1.75rem] border border-white/10 bg-white/5" />
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] bg-[#2f61f0] p-6 shadow-[0_40px_100px_-40px_rgba(47,97,240,0.55)] transition hover:-translate-y-1">
              <div className="flex h-72 items-center justify-center rounded-[1.75rem] bg-black/10">
                <div className="h-full w-full rounded-[1.75rem] border border-white/10 bg-white/5" />
              </div>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="self-start">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                We make sure our projects pack a punch.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-8 text-zinc-400">
                Our team is structured to deliver top-tier expertise without the barriers of a large agency. You work directly with seasoned designers, engineers, and researchers who stay involved from kickoff to launch.
              </p>
              <button className="inline-flex rounded-full border border-white/10 bg-white/5 px-10 py-3 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
                View all work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
