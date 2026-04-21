export function RecipeSection() {
  const cards = [
    {
      title: "Hardware Dev Guide",
      subtitle: "Product",
      accent: "bg-slate-950 text-white",
    },
     {
      title: "Software Brochure",
      subtitle: "Software",
      accent: "bg-amber-50 text-slate-950",
    },
    {
      title: "Product Dev Guide",
      subtitle: "Design",
      accent: "bg-slate-900 text-white",
    },
   
    {
      title: "GTM Playbook",
      subtitle: "Medical",
      accent: "bg-slate-200 text-slate-950",
    },
  ];

  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] bg-[#f4f4f4] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] sm:rounded-[3rem] sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Our build philosophy.
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600 sm:mt-4 sm:text-lg sm:leading-8">
              Learn how we approach product development — from first schematic to global launch.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-4 lg:gap-8">
            {cards.map((card) => (
              <div key={card.title} className="space-y-3 sm:space-y-4">
                <div className={`relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] ${card.accent} p-4 sm:p-6`}>
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white sm:right-6 sm:top-6 sm:h-10 sm:w-10 sm:text-sm">
                    BRASH
                  </div>
                  <div className="h-36 rounded-[1.25rem] bg-white/5 sm:h-52 sm:rounded-[1.75rem]" />
                </div>
                <div className="text-center">
                  {/* <p className="text-base font-semibold uppercase tracking-[0.35em] text-zinc-500">
                    {card.subtitle}
                  </p> */}
                  <h3 className="mt-2 text-sm font-semibold text-slate-950 sm:mt-3 sm:text-lg">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
