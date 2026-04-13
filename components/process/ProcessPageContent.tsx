"use client";

// ─── Roadmap Steps Data ───────────────────────────────────────────────────────

const roadmapSteps = [
  {
    id: "01",
    title: "Discover",
    description: "Tailored research and background for your big ideas",
  },
  {
    id: "02",
    title: "Create",
    description: "Validate design through a mix of models, renders and component testing.",
  },
  {
    id: "03",
    title: "Refine",
    description:
      "Finalize design for manufacturing, making minor adjustments to optimize cost, quality, and assembly.",
  },
  {
    id: "04",
    title: "Launch",
    description:
      "Mass manufacturing and ongoing product updates, including potential future upgrades.",
  },
];

// ─── Roadmap / Timeline Section ───────────────────────────────────────────────

function RoadmapSection() {
  return (
    <section className="bg-white px-6 lg:px-16 pt-16 pb-20">
      {/* Label + heading */}
      <p className="text-sm text-zinc-400 font-medium mb-3">The roadmap</p>
      <h2 className="text-4xl lg:text-5xl font-black leading-tight max-w-sm mb-20">
        Timelines that are tailored to you.
      </h2>

      {/* Timeline track */}
      <div className="relative mb-8">
        {/* Labels above the line */}
        <div className="flex justify-between mb-3">
          <span className="text-sm text-zinc-500">Kickoff</span>
          <span className="text-sm text-zinc-500">Finished product</span>
        </div>

        {/* Line with dots */}
        <div className="relative flex items-center">
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-px bg-zinc-300 w-full" />
          <div className="relative w-full flex justify-between">
            {roadmapSteps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-zinc-950 z-10" />
              </div>
            ))}
            {/* Extra dot for "Finished product" */}
            <div className="relative flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-zinc-950 z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Step labels below the line */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
        {roadmapSteps.map((step) => (
          <div key={step.id} className="flex flex-col gap-2">
            <h3 className="text-2xl font-black text-zinc-950">{step.title}</h3>
            <p className="text-sm leading-6 text-zinc-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ProcessPageContent() {
  return (
    <main className="w-full font-sans bg-white text-zinc-950">

      {/* ─────────────────────────────────────────
          SECTION 1 – Hero heading + red dot
      ───────────────────────────────────────── */}
      <section className="px-6 lg:px-16 pt-10 pb-0 relative">
        <h1 className="text-[clamp(3rem,9vw,5.5rem)] font-black leading-none tracking-tight mb-4">
          Our Process
        </h1>
        <p className="text-base text-zinc-500 mb-0">
          From inception straight through to production, we'll get you there.
        </p>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 2 – Full-width hero image (B&W hands with PCB)
      ───────────────────────────────────────── */}
      <div className="w-full mt-8">
        <img
          src="https://placehold.co/1600x520/1a1a1a/888888?text=Process+Hero+%E2%80%93+Hands+with+PCB"
          alt="Process hero"
          className="w-full object-cover"
          style={{ maxHeight: "520px", objectFit: "cover" }}
        />
      </div>

      {/* ─────────────────────────────────────────
          SECTION 3 – "Start-up to enterprise" two-col text + red card
      ───────────────────────────────────────── */}
      <section className="px-6 lg:px-16 pt-16 pb-10 bg-white">
        {/* Two-column heading + paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-start">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight">
            Start-up to enterprise,<br />we have seen it all.
          </h2>
          <p className="text-base leading-7 text-zinc-500 max-w-xl lg:pt-2">
            At Brash, we believe in working collaboratively with our clients every step of the way.
            Through ongoing communication, we ensure your vision remains the driving force behind
            the entire process. Whether you are looking for full development or just one of the four
            steps our process, we can help you create something remarkable.
          </p>
        </div>

        {/* Red card with product image */}
        <div
          className="w-full rounded-2xl overflow-hidden relative flex items-stretch"
          style={{ backgroundColor: "#f03a2e", minHeight: "340px" }}
        >
          {/* Left: empty red space */}
          <div className="flex-1" />

          {/* Right: product image anchored to right edge */}
          <div className="w-1/2 lg:w-2/5 flex-shrink-0 relative">
            <img
              src="https://placehold.co/700x380/ffffff/cccccc?text=Product+Image"
              alt="Product"
              className="absolute bottom-0 right-0 w-full object-contain"
              style={{ maxHeight: "380px" }}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 4 – Roadmap / Timeline
      ───────────────────────────────────────── */}
      <RoadmapSection />

    </main>
  );
}