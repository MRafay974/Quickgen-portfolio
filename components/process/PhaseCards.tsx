"use client";

import ScrollRevealCard from "./ScrollRevealCard";

// ─── Card Content Components ──────────────────────────────────────────────

export function DiscoverCard() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-emerald-50 rounded-2xl p-8 md:p-12 lg:p-16">
        {/* Title */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-950 leading-tight text-center">
            Strong starts with{" "}
            <span className="text-emerald-500">research and exploration</span>
          </h3>
        </div>

        {/* Image Placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-emerald-100 to-emerald-50 rounded-xl border-2 border-emerald-200 flex items-center justify-center">
            <span className="text-emerald-400 text-sm font-semibold">
              [Research Mood Board & References]
            </span>
          </div>
        </div>

        {/* Bullet Points */}
        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {["Trends", "Market research", "Competitor analysis", "Patents"].map(
            (item) => (
              <span
                key={item}
                className="text-sm md:text-base font-semibold text-zinc-700"
              >
                {item}
              </span>
            )
          )}
        </div>

        {/* Description */}
        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          We begin with a consultation to define your vision, target customer,
          and key requirements, followed by research into market trends,
          patents, and emerging technologies. We then explore and present
          different concepts and/or wireframes to meet your unique needs.
        </p>
      </div>
    </ScrollRevealCard>
  );
}

export function CreateCard1() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-orange-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-950 leading-tight">
            Grounded <span className="text-orange-500">concept proposals</span>
          </h3>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-orange-100 to-orange-50 rounded-xl border-2 border-orange-200 flex items-center justify-center">
            <span className="text-orange-400 text-sm font-semibold">
              [Concept Sketches & Wireframes]
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {[
            "Design concepts",
            "Technology integrations",
            "Wireframes",
          ].map((item) => (
            <span
              key={item}
              className="text-sm md:text-base font-semibold text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          After exploring the market, competition and customer landscape we work
          with you to propose a variety of concepts. From these we are able to
          choose what resonates best to move forward with development.
        </p>
      </div>
    </ScrollRevealCard>
  );
}

export function CreateCard2() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-orange-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-950 leading-tight">
            Testing brilliance with{" "}
            <span className="text-orange-500">prototyping and proof of concept</span>
          </h3>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-orange-100 to-orange-50 rounded-xl border-2 border-orange-200 flex items-center justify-center">
            <span className="text-orange-400 text-sm font-semibold">
              [Prototype Testing Components]
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {[
            "Component testing",
            "3D printing",
            "In-house mockups",
            "Initial renders",
          ].map((item) => (
            <span
              key={item}
              className="text-sm md:text-base font-semibold text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          Through a combination of rapid prototyping methods such as 3D printing
          and off-the-shelf sourced components, we iterate a large variety of
          low fidelity models. This allows us to quickly and cost effectively
          weed out what ideas won&apos;t work before moving on.
        </p>
      </div>
    </ScrollRevealCard>
  );
}

export function CreateCard3() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-orange-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-950 leading-tight">
            Polished with{" "}
            <span className="text-orange-500">models, testing and renders</span>
          </h3>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-orange-100 to-orange-50 rounded-xl border-2 border-orange-200 flex items-center justify-center">
            <span className="text-orange-400 text-sm font-semibold">
              [Product Models & Renders]
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {[
            "High quality models/renders",
            "Low volume PCBs",
            "Product testing",
          ].map((item) => (
            <span
              key={item}
              className="text-sm md:text-base font-semibold text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          Once we have vetted a few preliminary concepts we create higher
          fidelity prototypes to test the fit, function, size and aesthetics of
          the design. By the end of this stage you will have a working, near
          production looking model and polished renders.
        </p>
      </div>
    </ScrollRevealCard>
  );
}

export function RefineCard1() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-blue-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-950 leading-tight">
            Optimizing your{" "}
            <span className="text-blue-500">final design, certifications and patents</span>
          </h3>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-blue-100 to-blue-50 rounded-xl border-2 border-blue-200 flex items-center justify-center">
            <span className="text-blue-400 text-sm font-semibold">
              [Design Optimization & Documentation]
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {["CMS", "Final design tweaks", "Patent applications", "Industry certifications"].map(
            (item) => (
              <span
                key={item}
                className="text-sm md:text-base font-semibold text-zinc-700"
              >
                {item}
              </span>
            )
          )}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          Before we go to manufacturing there is often one last round of tweaks
          and adjustments. This may include material, colour ways and finishes,
          small aesthetic changes, and hardware/software optimizing. At this
          phase we also assist in applying for any relevant patents and
          certifications.
        </p>
      </div>
    </ScrollRevealCard>
  );
}

export function RefineCard2() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-blue-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-950 leading-tight">
            Precision <span className="text-blue-500">design for manufacturing (DFM)</span>
          </h3>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-blue-100 to-blue-50 rounded-xl border-2 border-blue-200 flex items-center justify-center">
            <span className="text-blue-400 text-sm font-semibold">
              [Manufacturing Specifications]
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {[
            "Cost optimization",
            "Assembly analysis",
            "Final PCB",
            "Code updates",
          ].map((item) => (
            <span
              key={item}
              className="text-sm md:text-base font-semibold text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          The final step refines the design and prepares it for manufacturing
          (DFM). Our design and engineering teams work together to consider
          additional costs such as assembly, software and PCB construction to
          find the best final outcome.
        </p>
      </div>
    </ScrollRevealCard>
  );
}

export function LaunchCard1() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-cyan-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-950 leading-tight">
            Cross the finish with{" "}
            <span className="text-cyan-500">sourcing and manufacturing</span>
          </h3>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-cyan-100 to-cyan-50 rounded-xl border-2 border-cyan-200 flex items-center justify-center">
            <span className="text-cyan-400 text-sm font-semibold">
              [Manufacturing & Assembly Line]
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {["Quotes", "Final samples/models", "Component sourcing", "Logistics"].map(
            (item) => (
              <span
                key={item}
                className="text-sm md:text-base font-semibold text-zinc-700"
              >
                {item}
              </span>
            )
          )}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          We source and receive multiple quotes and samples from trusted,
          pre-vetted manufacturers, making adjustments until the product meets
          your requirements. After samples are approved, we then move to mass
          production.
        </p>
      </div>
    </ScrollRevealCard>
  );
}

export function LaunchCard2() {
  return (
    <ScrollRevealCard className="w-full">
      <div className="bg-cyan-50 rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-950 leading-tight">
            Always here for{" "}
            <span className="text-cyan-500">ongoing support</span>
          </h3>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl aspect-video bg-linear-to-br from-cyan-100 to-cyan-50 rounded-xl border-2 border-cyan-200 flex items-center justify-center">
            <span className="text-cyan-400 text-sm font-semibold">
              [Product Support & Updates]
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center md:justify-start">
          {[
            "New technology integration",
            "Marketing material",
            "V2 Design",
          ].map((item) => (
            <span
              key={item}
              className="text-sm md:text-base font-semibold text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          Core development is complete, but we continue to provide ongoing
          support, including engineering and design services throughout the
          product&apos;s lifecycle. Additionally this V2 development may start once
          the initial product is on the market and creating cash flow.
        </p>
      </div>
    </ScrollRevealCard>
  );
}
