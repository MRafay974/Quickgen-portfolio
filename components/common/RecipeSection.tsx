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
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[3rem] bg-[#f4f4f4] p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
Our build philosophy.
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
Learn how we approach product development — from first schematic to global launch.

            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {cards.map((card) => (
              <div key={card.title} className="space-y-4">
                <div className={`relative overflow-hidden rounded-[2rem] ${card.accent} p-6`}>
                  <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                    BRASH
                  </div>
                  <div className="h-52 rounded-[1.75rem] bg-white/5" />
                </div>
                <div className="text-center">
                  {/* <p className="text-base font-semibold uppercase tracking-[0.35em] text-zinc-500">
                    {card.subtitle}
                  </p> */}
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
