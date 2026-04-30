"use client";

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
          From inception straight through to production, we&apos;ll get you there.
        </p>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 2 – Full-width hero image (B&W hands with PCB)
      ───────────────────────────────────────── */}
      <div className="w-full mt-8">
        <img
          src="/images/process/top.png"
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
          className="w-full rounded-2xl overflow-hidden relative flex items-stretch min-h-[180px] lg:min-h-[350px]"
          style={{ backgroundColor: "#FC3732" }}
        >
          {/* Left: empty red space */}
          <div className="flex-1" />

          {/* Right: product image anchored to right edge */}
          <div className="w-1/2 lg:w-2/5 shrink-0 relative">
            <img
              src="/images/process/drone.png"
              alt="Product"
              className="absolute right-[-5] w-full object-contain max-h-[175px] lg:max-h-[380px]"
            />
          </div>
        </div>
      </section>

    </main>
  );
}