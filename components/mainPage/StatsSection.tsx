export function StatsSection() {
  const logos = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="space-y-16 text-center">
          <div className="grid gap-8 sm:grid-cols-3 justify-items-center">
            {[
              { value: "35+", label: "Awards" },
              { value: "40+", label: "Patents" },
              { value: "100+", label: "Projects" },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="text-5xl font-black tracking-tight text-black sm:text-7xl">
                  {item.value}
                </div>
                <div className="text-lg font-medium text-zinc-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Numbers talk. We let them.
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-zinc-600">
              We’re proud to have partnered with visionary startups and organizations, helping them achieve success with award-winning designs and patented innovations. Our clients span a range of industries, and our work has been recognized for pushing the boundaries of engineering and design excellence.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-zinc-100 p-4">
            <div className="flex w-[200%] animate-marquee gap-6" style={{ animationDuration: "18s" }}>
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="min-w-[18rem] flex-shrink-0 rounded-[1.75rem] bg-zinc-200/80 p-5"
                >
                  <div className="h-20 rounded-[1.25rem] bg-white/80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
