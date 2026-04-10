export function Featured() {
  return (
    <section className="bg-white text-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-center">
          <div className="relative flex items-center justify-center">
            <div className="relative overflow-hidden rounded-[3rem] border border-zinc-200 bg-zinc-50 p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.35)] sm:p-10">
              <div className="relative mx-auto h-[28rem] w-[18rem] rounded-[2.6rem] bg-gradient-to-b from-sky-600 via-sky-700 to-slate-950 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-x-0 top-6 flex justify-center">
                  <div className="h-14 w-14 rounded-full bg-sky-900 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.8)]" />
                </div>
                <div className="absolute inset-x-0 top-20 flex justify-center">
                  <div className="h-[22rem] w-[11rem] rounded-[2rem] border-4 border-sky-500 bg-zinc-950 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.9)]">
                    <div className="h-16 rounded-t-[1.75rem] bg-sky-700" />
                    <div className="flex h-full flex-col items-center justify-center text-white">
                      <span className="text-3xl font-semibold">velavu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Featured project
              </p>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                We transform your big ideas into a reality.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-zinc-600">
              Our team has helped entrepreneurs, startups and established companies develop meaningful solutions for over a decade. From concept to launch, we craft intuitive, scalable, and market-ready products.
            </p>
            <div className="space-y-4">
              <p className="uppercase tracking-[0.35em] text-sm text-zinc-400">
                Projects featured in
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-10 w-24 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-semibold text-zinc-500">
                  USA TODAY
                </div>
                <div className="flex h-10 w-24 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-semibold text-zinc-500">
                  CBS NEWS
                </div>
                <div className="flex h-10 w-24 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-semibold text-zinc-500">
                  AP
                </div>
                <div className="flex h-10 w-24 items-center justify-center rounded-2xl bg-zinc-100 text-sm font-semibold text-zinc-500">
                  Trend
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
