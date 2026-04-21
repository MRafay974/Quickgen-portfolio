export function Featured() {
  return (
    <section className="bg-white text-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-center">

          {/* Left: Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative overflow-hidden rounded-[3rem] ">
              <img
                src="/images/landingPage/scentix.png"
                alt="Featured project"
                className="h-[30rem] w-full object-contain"
              />
            </div>
          </div>

          {/* Right: Text */}
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
              Our team has helped entrepreneurs, startups and established
              companies develop meaningful solutions for over a decade. From
              concept to launch, we craft intuitive, scalable, and market-ready
              products.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}