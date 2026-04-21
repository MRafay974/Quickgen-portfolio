export function StatsSection() {
  const logos = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="space-y-16 text-center">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 justify-items-center">
            {[
              { value: "150+", label: "Clients" },
              { value: "300+", label: "Projects" },
                            { value: "5", label: "Continents" },

                            { value: "Zero", label: "Missed Deadlines" },

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

         
        </div>
      </div>
    </section>
  );
}
