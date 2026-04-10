export function Process() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16">
          <div className="relative">
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.03),_transparent_25%)]" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-950 px-6 py-8 shadow-[0_60px_120px_-60px_rgba(0,0,0,0.8)] sm:px-8 sm:py-10">
              <div className="relative mx-auto h-[28rem] w-full max-w-[44rem] rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white/10 blur-sm" />
                <div className="absolute left-16 top-20 h-32 w-32 rounded-full bg-slate-700/70" />
                <div className="absolute left-24 top-[7rem] h-24 w-24 rounded-[2.5rem] border border-white/10 bg-zinc-800/90 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]" />
                <div className="absolute left-[12rem] top-[3.5rem] h-16 w-16 rounded-full bg-zinc-700/80" />
                <div className="absolute left-[18rem] top-[5.5rem] h-44 w-44 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_30px_70px_-30px_rgba(255,255,255,0.1)]" />
                <div className="absolute left-[26rem] top-[7rem] h-16 w-24 rounded-[2rem] bg-white/10" />
                <div className="absolute right-12 top-[3.5rem] h-28 w-40 rounded-[2.5rem] border border-white/10 bg-zinc-700/80" />
                <div className="absolute right-12 bottom-12 h-20 w-20 rounded-full bg-slate-500/20" />
              </div>
            </div>
          </div>

          <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our part, in every part.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">
              Great products are meticulously designed and engineered from the inside out. We do both.
            </p>
            <div>
              <button className="inline-flex rounded-full border border-white/10 bg-white/5 px-8 py-3 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
                View process
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
